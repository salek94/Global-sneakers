import axios from "axios";
const pk = "pk_test_525553bf900ef2f2bce0f910be638cdff27c90fee9bed";
const headers = {
  "X-Authorization": pk,
  Accept: "application/json",
  "Content-Type": "application/json",
};

class ProductService {
  static allProduct() {
    return axios.get("/products", {
      headers,
    });
  }
  static singleProduct(id) {
    return axios.get(`/products/${id}`, {
      headers,
    });
  }
}

export default ProductService;
