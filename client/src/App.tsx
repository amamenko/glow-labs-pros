import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import ProductIngredientsMain from "./components/ProductIngredients/ProductIngredientsMain";
import NewPricingMain from "./components/NewPricing/NewPricingMain";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ProductIngredientsMain />} />
            <Route path="/pricing" element={<NewPricingMain />} />
          </Routes>
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
