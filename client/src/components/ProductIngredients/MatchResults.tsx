import React, { useContext } from "react";
import styled from "styled-components";
import { Chip } from "@nextui-org/react";
import { FilterContext } from "../../context/FilterContext";

const AllergenMatchStatement = styled.div`
  text-align: left;
  font-size: 1rem;
  color: orange;
  margin-bottom: 2rem;
  @media only screen and (max-width: 768px) {
    margin: 0 12%;
    margin-bottom: 2rem;
  }
  .match_container {
    flex-direction: column;
    .chip_container {
      margin-top: 0.5rem;
    }
    @media only screen and (min-width: 640px) {
      flex-direction: row;
      .chip_container {
        margin-top: 0;
        margin-left: 0.5rem;
      }
    }
  }
`;

export const MatchResults = () => {
  const { productData, debouncedAllergen, currentSelectedFilters } =
    useContext(FilterContext);
  return (
    <AllergenMatchStatement>
      <div className="match_container flex">
        <span>
          Showing <b>{productData?.length || 0}</b> product match result
          {productData?.length === 1 ? "" : "s"}
        </span>
        {debouncedAllergen && (
          <span className="ml-1">
            for search term "<b>{debouncedAllergen}</b>".
          </span>
        )}
        <div className="chip_container flex gap-2 flex-wrap">
          {currentSelectedFilters?.productLine?.[0] && (
            <Chip color="warning" variant="bordered">
              {currentSelectedFilters?.productLine[0]}
            </Chip>
          )}
          {currentSelectedFilters?.backbarRetail?.[0] && (
            <Chip color="warning" variant="bordered">
              {currentSelectedFilters?.backbarRetail[0]}
            </Chip>
          )}
          {currentSelectedFilters?.typeOfProduct?.[0] && (
            <Chip color="warning" variant="bordered">
              {currentSelectedFilters?.typeOfProduct[0]}
            </Chip>
          )}
          {currentSelectedFilters?.recommended?.[0] && (
            <Chip color="warning" variant="bordered">
              {currentSelectedFilters?.recommended[0]}
            </Chip>
          )}
          {currentSelectedFilters?.contraindications?.[0] && (
            <Chip color="warning" variant="bordered">
              {currentSelectedFilters?.contraindications[0]}
            </Chip>
          )}
        </div>
      </div>
    </AllergenMatchStatement>
  );
};
