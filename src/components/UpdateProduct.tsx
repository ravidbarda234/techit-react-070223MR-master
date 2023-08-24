import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
import * as yup from "yup";
import { getProductById, updateProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacksService";

interface UpdateProductProps {}

const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    // get product by id
    getProductById(id as string)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);
  let [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });
  let formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      price: yup.number().required().min(0),
      category: yup.string().required().min(2),
      description: yup.string().required().min(2),
      image: yup.string().required().min(2),
    }),
    onSubmit: (values) => {
      updateProduct(values, id as string)
        .then((res) => {
          navigate("/products");
          successMsg("Product updated successfully!");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container col-md-3">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="display-3">UPDATE PRODUCT</h3>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name@example.com"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Name</label>
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger">{formik.errors.name}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Price</label>
            {formik.touched.price && formik.errors.price && (
              <small className="text-danger">{formik.errors.price}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">category</label>
            {formik.touched.category && formik.errors.category && (
              <small className="text-danger">{formik.errors.category}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">description</label>
            {formik.touched.description && formik.errors.description && (
              <small className="text-danger">{formik.errors.description}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="image"
              placeholder="image"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Image</label>
            {formik.touched.image && formik.errors.image && (
              <small className="text-danger">{formik.errors.image}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-secondary my-3 w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
