import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "dotenv/config";

export const searchFilters = async (
  req: Request,
  res: Response,
  doc: GoogleSpreadsheet
) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const filtersArr = rows.map((row) => {
    return {
      productLine: row["Product Line"] as string,
      backbarRetail: row["Backbar/Retail"] as string,
      typeOfProduct: row["Type Of Product"] as string,
      recommended: row["Recommended"] as string,
      contraindications: row["Contraindications"] as string,
    };
  });

  const uniqueFilterChoices = {
    productLine: {
      name: "Product Line",
      options: [],
    },
    backbarRetail: {
      name: "Backbar/Retail",
      options: [],
    },
    typeOfProduct: {
      name: "Type Of Product",
      options: [],
    },
    recommended: {
      name: "Recommended",
      options: [],
    },
    contraindications: {
      name: "Contraindications",
      options: [],
    },
  };

  for (const filter of filtersArr) {
    for (const key in filter) {
      const currentFilterChoice = filter[key].trim();
      if (
        uniqueFilterChoices[key].options.indexOf(currentFilterChoice) === -1
      ) {
        if (currentFilterChoice)
          uniqueFilterChoices[key].options.push(currentFilterChoice);
      }
    }
  }

  res.send(uniqueFilterChoices);
  return true;
};
