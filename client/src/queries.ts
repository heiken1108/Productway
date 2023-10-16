import {gql} from "@apollo/client";

export const GET_DATA = gql`
query Query {
	getAllProducts {
    brand
    category
    currentPrice
    description
    ean
    image
    name
    productID
    store
    weight
    weightUnit
}
}
`;

export const GET_PRODUCT_BY_PRODUCT_ID = gql`
query GetProductByProductID($productID: Int!) {
    getProductByProductID(productID: $productID) {
        _id
        productID
        name
        brand
        ean
        image
        category
        description
        currentPrice
        weight
        weightUnit
        store
    }
}
`;


export const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($category: String!) {
    getProductsByCategory(category: $category) {
      brand
      category
      currentPrice
      description
      ean
      image
      name
      productID
      store
      weight
      weightUnit
    }
  }
`;