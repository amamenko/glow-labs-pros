import express, { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { logProductSearch } from "./logProductSearch";
import "dotenv/config";

export const searchProducts = async (
  req: Request,
  res: Response,
  doc: GoogleSpreadsheet
) => {
  const ingredient = req.params?.ingredient;
  if (!ingredient) {
    res.status(400).send("Ingredient is a required parameter!");
    return false;
  }
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const prodsArr = rows.map((row) => {
    return {
      productLine: row["Product Line"] as string,
      productName: row["Product Name"] as string,
      ingredients: row["Ingredients"] as string,
    };
  });
  const ingredientRegex = new RegExp(ingredient.toLowerCase());
  const hitProds = prodsArr.flatMap((prod) => {
    const hit = ingredientRegex.test(prod.ingredients.toLowerCase());
    if (hit) {
      const ingredientsArr = prod.ingredients.split(/(?<!1),/gim);
      const trimmedArr = ingredientsArr.map((ingredient: string) =>
        ingredient.trim()
      );
      const highlightedIngredients = trimmedArr.map((ingredient) => {
        const highlighted = ingredientRegex.test(ingredient.toLowerCase());
        return {
          name: ingredient,
          highlighted,
        };
      });
      return {
        productLine: prod.productLine,
        productName: prod.productName,
        ingredients: highlightedIngredients,
      };
    } else {
      return [];
    }
  });
  if (hitProds.length > 0 && process.env.NODE_ENV === "production")
    await logProductSearch(ingredient.toLowerCase());
  res.send(hitProds);
  return true;
};
