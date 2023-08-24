import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

export function getProducts() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getProductById(id: string) {
  return axios.get(`${api}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function addProduct(newProduct: Product) {
  return axios.post(api, newProduct, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function updateProduct(updatedProduct: Product, id: string) {
  return axios.put(`${api}/${id}`, updatedProduct, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function deleteProduct(id: string) {
  return axios.delete(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}
