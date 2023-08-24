import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <h1>Home</h1>
      <h3>Welcome To The Techit Store!</h3>
      <h6>Here you can by all kinds of products</h6>
    </>
  );
};

export default Home;
