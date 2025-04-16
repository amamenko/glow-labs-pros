import express, { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import cors from "cors";
import enforce from "express-sslify";
import path from "path";
import { searchProducts } from "./functions/searchProducts";
import { searchFilters } from "./functions/searchFilters";
import mongoose from "mongoose";
import { getNewPricing } from "./functions/getNewPricing";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

// Enable all cross-origin requests
app.use(cors());

if (process.env.NODE_ENV === "production")
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

const doc = new GoogleSpreadsheet(process.env.ALLERGIES_SPREADSHEET_ID);
app.get("/allergies/:ingredient?", async (req: Request, res: Response) => {
  return await searchProducts(req, res, doc);
});

app.get("/filters", async (req: Request, res: Response) => {
  return await searchFilters(req, res, doc);
});

const newPricingDoc = new GoogleSpreadsheet(
  process.env.NEW_PRICING_SPREADSHEET_ID
);
app.get("/newPricing", async (req: Request, res: Response) => {
  return await getNewPricing(req, res, newPricingDoc);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello from the Glow Labs API!");
  });
}

// Connect to MongoDB with Mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
