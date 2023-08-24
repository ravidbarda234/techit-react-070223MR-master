import axios from "axios";
import Product from "../interfaces/Product";
import Cart from "../interfaces/Cart";
import { log } from "console";
import _ from "lodash";

let api: string = `${process.env.REACT_APP_API}/carts`;

// get cart by userId
export function getCart() {
  return axios.get(`${api}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

// create cart
export function createCart(userId: number) {
  return axios.post(api, { userId: userId, products: [], active: true });
}

// add to cart / update cart
export async function addToCart(productToAdd: Product) {
  try {
    let product = _.pick(productToAdd, [
      "_id",
      "name",
      "category",
      "description",
      "price",
      "image",
    ]);
    return axios.post(api, product, {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token") as string)
          .token,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
