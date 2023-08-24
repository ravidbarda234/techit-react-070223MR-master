import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getCart } from "../services/cartsService";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  let [productsInCart, setProductsInCart] = useState<Product[]>([]);
  useEffect(() => {
    getCart()
      .then((res) => setProductsInCart(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>Cart</h1>
      {productsInCart.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {productsInCart.map((product: Product) => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products in cart</p>
      )}
    </>
  );
};

export default Cart;
