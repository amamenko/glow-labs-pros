import axios from "axios";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductList } from "./ProductList";
import { FilterContext } from "../context/FilterContext";

const LoadingSpinner = styled(ClipLoader)`
  margin-top: 3rem;
`;

const NoMatchStatement = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  font-size: 1.5rem;
  @media only screen and (max-width: 768px) {
    width: 75%;
    margin: 0 auto;
  }
`;

export const SearchResults = () => {
  const {
    currentSelectedFilters,
    debouncedAllergen,
    productData,
    changeProductData,
    searchLoading,
    changeSearchLoading,
  } = useContext(FilterContext);

  useEffect(() => {
    const queryAllergens = async () => {
      if (debouncedAllergen) {
        changeSearchLoading(true);
        const allergenData = await axios
          .get(
            `${
              process.env.REACT_APP_NODE_ENV === "production"
                ? "https://glow-labs-pros.onrender.com"
                : "http://localhost:4000"
            }/allergies/${debouncedAllergen}${
              currentSelectedFilters
                ? `?filters=${JSON.stringify(currentSelectedFilters)}`
                : ""
            }`
          )
          .then((res) => res.data)
          .catch((e) => console.error(e));
        if (allergenData) changeProductData(allergenData);
        changeSearchLoading(false);
      } else {
        changeProductData(undefined);
      }
    };
    queryAllergens();
  }, [
    debouncedAllergen,
    changeProductData,
    changeSearchLoading,
    currentSelectedFilters,
  ]);

  return (
    <>
      {searchLoading ? (
        <LoadingSpinner
          color={"#FFF"}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
        />
      ) : productData ? (
        productData.length > 0 ? (
          <ProductList />
        ) : (
          <NoMatchStatement>
            <span>No product match found</span>
            {debouncedAllergen && (
              <span>
                for search term "<b>{debouncedAllergen}</b>".
              </span>
            )}
          </NoMatchStatement>
        )
      ) : (
        <></>
      )}
    </>
  );
};
