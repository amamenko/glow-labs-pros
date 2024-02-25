import React, { Dispatch, SetStateAction } from "react";
import { Product } from "./Product.interface";

export interface FilterContextProps {
  currentSelectedFilters: {
    [key: string]: string[];
  };
  setCurrentSelectedFilters: Dispatch<
    SetStateAction<{
      [key: string]: string[];
    }>
  >;

  productData: Product[] | undefined;
  changeProductData: Dispatch<SetStateAction<Product[] | undefined>>;
  searchLoading: boolean;
  changeSearchLoading: Dispatch<SetStateAction<boolean>>;
  debouncedAllergen: string;
  setDebouncedAllergen: Dispatch<SetStateAction<string>>;
}
