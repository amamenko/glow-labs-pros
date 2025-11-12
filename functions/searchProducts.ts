import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { logProductSearch } from "./logProductSearch";
import "dotenv/config";

export const searchProducts = async (
  req: Request,
  res: Response,
  doc: GoogleSpreadsheet
) => {
  try {
    const ingredient = req.params?.ingredient;
    const filters = req.query?.filters;
    const parsedFilters = filters ? JSON.parse(filters as string) : {};
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const prodsArr = rows.map((row) => {
      return {
        backbarRetail: row["Backbar/Retail"] as string,
        typeOfProduct: row["Type Of Product"] as string,
        recommended: row["Recommended"] as string,
        contraindications: row["Contraindications"] as string,
        productLine: row["Product Line"] as string,
        productName: row["Product Name"] as string,
        ingredients: row["Ingredients"] as string,
      };
    });
    const ingredientRegex = ingredient
      ? new RegExp(ingredient.toLowerCase())
      : null;
    const hitProds = prodsArr.flatMap((prod) => {
      let hit = ingredient
        ? ingredientRegex.test(prod.ingredients.toLowerCase()) ||
          ingredientRegex.test(prod.productName.toLowerCase())
        : true;
      for (const filter in parsedFilters) {
        if (hit && parsedFilters[filter].length > 0) {
          const filterRegex = new RegExp(
            parsedFilters[filter].join("|"),
            "gim"
          );
          hit = filterRegex.test(prod[filter].toLowerCase().trim());
        }
      }
      if (hit) {
        const ingredientsArr = prod.ingredients.split(/(?<!1),/gim);
        const trimmedArr = ingredientsArr.map((ingredient: string) =>
          ingredient.trim()
        );
        const highlightedIngredients = trimmedArr.map((trimmedIngredient) => {
          const highlighted = ingredient
            ? ingredientRegex.test(trimmedIngredient.toLowerCase())
            : false;
          return {
            name: trimmedIngredient,
            highlighted,
          };
        });
        return {
          backbarRetail: prod.backbarRetail,
          typeOfProduct: prod.typeOfProduct,
          recommended: prod.recommended,
          contraindications: prod.contraindications,
          productLine: prod.productLine,
          productName: prod.productName,
          ingredients: highlightedIngredients,
        };
      } else {
        return [];
      }
    });

    if (
      ingredient &&
      hitProds.length > 0 &&
      process.env.NODE_ENV === "production"
    )
      await logProductSearch(ingredient.toLowerCase());
    res.send(hitProds);
    return true;
  } catch (e) {
    console.error(e);
    res.send(e);
    return false;
  }
};
