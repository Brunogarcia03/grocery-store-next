const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

export const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

export const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

export const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

export const getProductsById = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

export const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", { username, email, password });

export const signIn = (email, password) =>
  axiosClient.post("/auth/local", { identifier: email, password });

export const addToCardApi = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;

      const cartItemsList = data.map((item) => {
        return {
          name: item.attributes?.products?.data[0].attributes.name,
          quantity: item.attributes?.quantity,
          amount: item.attributes?.amount,
          image:
            item.attributes.products?.data[0].attributes?.images?.data[0]
              .attributes?.url,
          actual: item.attributes?.products?.data[0].attributes.mrp,
          id: item.id,
          product: item.attributes?.products?.data[0].id,
        };
      });
      return cartItemsList;
    });

export const deleteCartItems = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[OrderItemList][populate][product][populate][images]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalAmount,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.OrderItemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.status,
      }));

      return orderList;
    });
