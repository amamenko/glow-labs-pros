export const filterContextDefaults = {
  currentSelectedFilters: {
    productLine: [],
    backbarRetail: [],
    typeOfProduct: [],
    recommended: [],
    contraindications: [],
  },
  setCurrentSelectedFilters: () => {},
  productData: [],
  changeProductData: () => {},
  searchLoading: false,
  changeSearchLoading: () => {},
  debouncedAllergen: "",
  setDebouncedAllergen: () => {},
};
