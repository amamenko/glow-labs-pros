import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductList } from "./ProductList";

export interface Product {
  productName: string;
  productLine: SVGStringList;
  ingredients: {
    name: string;
    highlighted: boolean;
  }[];
}

const LoadingSpinner = styled(ClipLoader)`
  margin-top: 3rem;
`;

const NoMatchStatement = styled.p`
  margin-top: 3rem;
  font-size: 1.5rem;
  @media only screen and (max-width: 768px) {
    width: 75%;
    margin: 0 auto;
  }
`;

export const SearchResults = ({ ingredient }: { ingredient: string }) => {
  const [productData, changeProductData] = useState<Product[] | undefined>(
    undefined
  );
  const [searchLoading, changeSearchLoading] = useState(false);

  useEffect(() => {
    const queryAllergens = async () => {
      if (ingredient) {
        changeSearchLoading(true);
        const allergenData = await axios
          .get(`http://localhost:4000/allergies/${ingredient}`)
          .then((res) => res.data)
          .catch((e) => console.error(e));
        if (allergenData) changeProductData(allergenData);
        changeSearchLoading(false);
      } else {
        changeProductData(undefined);
      }
    };
    queryAllergens();
  }, [ingredient]);

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
          <ProductList productData={productData} ingredient={ingredient} />
        ) : (
          <NoMatchStatement>
            No product match found for search term "<b>{ingredient}</b>".
          </NoMatchStatement>
        )
      ) : (
        <></>
      )}
    </>
  );
};
