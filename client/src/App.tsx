import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import ProductIngredientsMain from "./components/ProductIngredients/ProductIngredientsMain";
import NewPricingMain from "./components/NewPricing/NewPricingMain";
import Header from "./components/Header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./App.css";

const App = () => {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<ProductIngredientsMain />} />
              <Route path="/newPricing" element={<NewPricingMain />} />
            </Routes>
          </div>
        </Router>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default App;
