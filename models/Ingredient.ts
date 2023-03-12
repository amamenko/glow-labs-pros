import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  searches: [
    {
      term: String,
      count: Number,
    },
  ],
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export { Ingredient };
