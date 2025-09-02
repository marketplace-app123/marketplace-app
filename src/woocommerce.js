import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const api = new WooCommerceRestApi({
    url: "https://marketplace.eventiefiere.com",
    consumerKey: "ck_34355d9bdef0c511ff37467233658fb0c1fd7293",
    consumerSecret: "cs_37ead00d22185f0beb7910dd00831df0818f1337",
    version: "wc/v3",
    queryStringAuth: true
});
export default api;
