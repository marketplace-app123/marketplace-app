import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://marketplace.eventiefiere.com",
  consumerKey: "ck_a19ea35df8cc285ac7c867c200c290f16a006a64",
  consumerSecret: "cs_ff824a43210567a567c22d2dc808f0206bc73965",
  version: "wc/v3"
});

export default api;
