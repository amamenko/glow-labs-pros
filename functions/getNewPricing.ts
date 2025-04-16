import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "dotenv/config";

export const getNewPricing = async (
  req: Request,
  res: Response,
  doc: GoogleSpreadsheet
) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const servicesArr = rows.flatMap((row) => {
      const name = row["FACIAL"] as string;

      if (!name || name === "ADD-ONS") return [];

      const standard = row["STANDARD"] as string;
      const classic110 = row["CLASSIC 110"] as string;
      const oweCreditLux = row["Owe, Credit Lux"] as string;
      const oweCreditVip = row["Owe, Credit VIP"] as string;
      const oweCreditClassic = row["Owe, Credit Classic"] as string;
      const vip300 = row["VIP 300"] as string;
      const lux200 = row["LUX 200"] as string;

      const type = vip300 ? "facial" : "add-on";

      return {
        type,
        name,
        standard: Number(standard),
        classic110: Number(classic110),
        ...(oweCreditClassic
          ? type === "facial"
            ? { oweCreditClassic: Number(oweCreditClassic) }
            : { lux200: Number(oweCreditClassic) }
          : {}),
        ...(oweCreditLux ? { oweCreditLux: Number(oweCreditLux) } : {}),
        ...(oweCreditVip ? { oweCreditVip: Number(oweCreditVip) } : {}),
        ...(type === "add-on"
          ? { vip300: Number(lux200) }
          : {
              lux200: Number(lux200),
            }),
        ...(vip300 ? { vip300: Number(vip300) } : {}),
      };
    });

    const allFacials = servicesArr.filter(
      (service) => service.type === "facial"
    );
    const allAddons = servicesArr.filter(
      (service) => service.type === "add-on"
    );

    return res.send({
      facials: allFacials,
      addOns: allAddons,
    });
  } catch (e) {
    console.error(e);
    res.send(e);
    return false;
  }
};
