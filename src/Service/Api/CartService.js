import axios from "axios";
const pk = "pk_test_525553bf900ef2f2bce0f910be638cdff27c90fee9bed";
// const pk = process.env.REACT_APP_CHEC_PUBLIC_KEY;
const headers = {
  "X-Authorization": pk,
  Accept: "application/json",
  "Content-Type": "application/json",
};

class CartService {
  static createCart() {
    return axios.get("/carts", {
      headers,
    });
  }
  static getCart(id) {
    return axios.get(`/carts/${id}`, {
      headers,
    });
  }
  static addItemToCart(id, body) {
    return axios.get(`/carts/${id}`, {
      headers: headers,
      body: JSON.stringify(body),
      //radi sa get method, ne radi sa post
    });
  }

  static updateItemToCart(id, line_item_id, body) {
    return axios.post(`/carts/${id}/items/${line_item_id}`, {
      headers: headers,
      body: JSON.stringify(...body),
      // saljem quantity
    });
  }
  static emptyCart(id) {
    return axios.delete(`/carts/${id}/items`, {
      headers,
    });
  }
  static removeItemToCart(id, line_item_id) {
    return axios.delete(`/carts/${id}/items/${line_item_id}`, {
      headers,
    });
  }
}

export default CartService;
