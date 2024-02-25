export interface Product {
  productName: string;
  productLine: SVGStringList;
  ingredients: {
    name: string;
    highlighted: boolean;
  }[];
  backbarRetail: string;
  typeOfProduct: string;
  recommended: string;
  contraindications: string;
}
