import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";
import { Collapse } from "react-collapse";
import { FilterContext } from "../context/FilterContext";
import { MatchResults } from "./MatchResults";

const ResultsOuterContainer = styled.div`
  width: 75%;
  margin: 0 auto 10rem auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StyledResultsContainer = styled.div`
  position: relative;
`;

const ColumnNamesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media only screen and (min-width: 640px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const ColumnName = styled.p`
  font-size: 1rem;
  border-bottom: 1px solid #fff;
  padding-bottom: 1rem;
  &.hide {
    display: none;
    @media only screen and (min-width: 640px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ResultText = styled.p`
  font-size: 1rem;
  @media only screen and (max-width: 768px) {
    font-size: 0.75rem;
    margin: 0 0.25rem;
  }
  &.hide {
    display: none;
    @media only screen and (min-width: 640px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ResultRow = styled.div`
  display: grid;
  margin-top: 1rem;
  grid-template-columns: repeat(3, 1fr);
  @media only screen and (min-width: 640px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const IngredientsCollapseContainer = styled.div`
  width: 100%;
  background: rgb(65, 65, 65);
  margin-top: 1rem;
  p {
    font-size: 0.85rem;
    margin: 0.25rem 0;
    &.highlighted {
      background: orange;
      color: #000;
      font-weight: bold;
    }
  }
`;

const IngredientsButton = styled(Button)`
  max-height: 40px;
  width: 75%;
  max-width: 75%;
  margin: 0 auto;
  margin-top: -0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  @media only screen and (max-width: 375px) {
    font-size: 0.7rem;
  }
  @media only screen and (min-width: 376px) and (max-width: 900px) {
    font-size: 0.75rem;
  }
`;

export const ProductList = () => {
  const { productData } = useContext(FilterContext);
  const [ingredientsShown, changeIngredientsShown] = useState("");
  const handleIngredientsClick = (e: React.SyntheticEvent, index: number) => {
    e.preventDefault();
    if (ingredientsShown === index.toString()) {
      changeIngredientsShown("");
    } else {
      changeIngredientsShown(index.toString());
    }
  };

  return (
    <ResultsOuterContainer>
      <MatchResults />
      <StyledResultsContainer>
        <ColumnNamesContainer>
          <ColumnName>Product Line</ColumnName>
          <ColumnName>Product Name</ColumnName>
          <ColumnName className="hide">Backbar/Retail</ColumnName>
          <ColumnName className="hide">Recommended</ColumnName>
          <ColumnName className="hide">Type Of Product</ColumnName>
          <ColumnName className="hide">Contraindications</ColumnName>
          <ColumnName>Ingredients</ColumnName>
        </ColumnNamesContainer>
        {productData ? (
          productData.map((product, i) => {
            return (
              <React.Fragment key={i}>
                <ResultRow>
                  <ResultText>{product.productLine}</ResultText>
                  <ResultText>{product.productName}</ResultText>
                  <ResultText className="hide">
                    {product.backbarRetail}
                  </ResultText>
                  <ResultText className="hide">
                    {product.recommended}
                  </ResultText>
                  <ResultText className="hide">
                    {product.typeOfProduct}
                  </ResultText>
                  <ResultText className="hide">
                    {product.contraindications}
                  </ResultText>
                  <IngredientsButton
                    color="primary"
                    onClick={(e: React.SyntheticEvent) =>
                      handleIngredientsClick(e, i)
                    }
                  >
                    {ingredientsShown === i.toString() ? "Hide" : "Show"}{" "}
                    Ingredients
                  </IngredientsButton>
                </ResultRow>
                <Collapse isOpened={ingredientsShown === i.toString()}>
                  <IngredientsCollapseContainer>
                    {product.ingredients.map((ingredient, i) => {
                      return (
                        <p
                          key={i}
                          className={
                            ingredient.highlighted ? "highlighted" : ""
                          }
                        >
                          {ingredient.name}
                        </p>
                      );
                    })}
                  </IngredientsCollapseContainer>
                </Collapse>
              </React.Fragment>
            );
          })
        ) : (
          <></>
        )}
      </StyledResultsContainer>
    </ResultsOuterContainer>
  );
};
