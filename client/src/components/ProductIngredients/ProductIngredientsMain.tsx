import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import { ClipLoader } from "react-spinners";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import { Product } from "../../interfaces/Product.interface";
import { Form, FormGroup, FormText, Input } from "reactstrap";
import { AllFilters } from "./Filters/AllFilters";
import { SearchResults } from "./SearchResults";
import "../../App.css";

const ProductIngredientsMain = () => {
  const [search, setSearch] = useState("");
  const [debouncedAllergen, setDebouncedAllergen] = useState("");
  const [productData, changeProductData] = useState<Product[] | undefined>(
    undefined
  );
  const [searchLoading, changeSearchLoading] = useState(false);
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    productLine: [],
    backbarRetail: [],
    typeOfProduct: [],
    recommended: [],
    contraindications: [],
  });
  const [filters, setFilters] = useState<{
    productLine: {
      name: string;
      options: string[];
    };
    backbarRetail: {
      name: string;
      options: string[];
    };
    typeOfProduct: {
      name: string;
      options: string[];
    };
    recommended: {
      name: string;
      options: string[];
    };
    contraindications: {
      name: string;
      options: string[];
    };
  }>({
    productLine: {
      name: "",
      options: [],
    },
    backbarRetail: {
      name: "",
      options: [],
    },
    typeOfProduct: {
      name: "",
      options: [],
    },
    recommended: {
      name: "",
      options: [],
    },
    contraindications: {
      name: "",
      options: [],
    },
  });
  const [filtersLoading, setFiltersLoading] = useState(false);

  useDebounce(
    () => {
      setDebouncedAllergen(search);
    },
    [search],
    500
  );

  const queryAllFilters = useCallback(async () => {
    setFiltersLoading(true);
    const filterData = await axios
      .get(
        `${
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://glow-labs-pros.onrender.com"
            : "http://localhost:4000"
        }/filters`
      )
      .then((res) => res.data)
      .catch((e) => console.error(e));
    if (filterData) setFilters(filterData);
    setFiltersLoading(false);
  }, []);

  useEffect(() => {
    queryAllFilters();
  }, [queryAllFilters]);

  const handleSearch = (e: ChangeEvent) =>
    setSearch((e.target as HTMLInputElement).value);

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <FilterContext.Provider
      value={{
        currentSelectedFilters,
        setCurrentSelectedFilters,
        productData,
        changeProductData,
        searchLoading,
        changeSearchLoading,
        debouncedAllergen,
        setDebouncedAllergen,
      }}
    >
      {filtersLoading ? (
        <div
          className="w-full mb-4 flex justify-start items-center"
          style={{
            maxWidth: "75%",
          }}
        >
          <ClipLoader color={"#FFF"} loading={true} size={40} />
        </div>
      ) : (
        <AllFilters filters={filters} />
      )}
      <Form
        className="ingredient_search_form"
        onSubmit={handleFormSubmit}
        autoComplete={"false"}
      >
        <FormGroup>
          <Input
            className="ingredient_search_bar"
            autoFocus
            autoComplete={"false"}
            type="text"
            spellCheck="false"
            value={search || ""}
            onChange={handleSearch}
          />
          <FormText>
            {debouncedAllergen ? <></> : "Search for an ingredient here."}
          </FormText>
        </FormGroup>
        <SearchResults />
      </Form>
    </FilterContext.Provider>
  );
};

export default ProductIngredientsMain;
