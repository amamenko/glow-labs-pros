import { createContext } from "react";
import { FilterContextProps } from "../interfaces/FilterContextProps.interface";
import { filterContextDefaults } from "./filterContextDefaults";

export const FilterContext = createContext<FilterContextProps>(
  filterContextDefaults
);
