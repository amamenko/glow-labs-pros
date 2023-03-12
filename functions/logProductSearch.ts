import { Ingredient } from "../models/Ingredient";

export const logProductSearch = async (searchTerm: string) => {
  const topIngredients = await Ingredient.find();
  if (topIngredients && topIngredients[0]) {
    const allSearches = topIngredients[0].searches;
    let currentSearchesClone = [...allSearches];
    const foundTermMatchIndex = allSearches.findIndex(
      (search) => search.term === searchTerm
    );

    if (foundTermMatchIndex > -1) {
      const foundEl = currentSearchesClone[foundTermMatchIndex];
      currentSearchesClone[foundTermMatchIndex].count = foundEl.count + 1;
    } else {
      currentSearchesClone.push({
        term: searchTerm,
        count: 1,
      });
    }

    const sortedSearches = currentSearchesClone.sort((a, b) => {
      // Sort by count (DESC)
      if (a.count > b.count) {
        return -1;
      } else if (a.count < b.count) {
        return 1;
      } else {
        return 0;
      }
    });

    const foundId = topIngredients[0]._id;
    const searchesUpdate = { searches: sortedSearches };
    return await Ingredient.findByIdAndUpdate(foundId, searchesUpdate);
  } else {
    return true;
  }
};
