module.exports.locator = {
  addToCartButton: '//span[text()="Add to cart"]',
  crossButton: ".cross",
  viewCartButton: '//a[@title="View my shopping cart"]',
  productName: '//p[@class="product-name"]/a',
  unitPrice: '//*[@data-title="Unit price"]/span[@class="price"]',
  specialPrice: '//*[@class="price special-price"]',
  discountProductName:
    '//*[@class="old-price"]/../../..//p[@class="product-name"]/a',
  specialPriceDiscount: '//*[@class="price special-price"]',
  discount: '//*[@class="price-percent-reduction small"]',
  oldPrice: '//*[@class="old-price"]',
  totalPrice: "#total_price",
  tShirtSectionTab: '//a[text()="T-shirts"]',
  catalogInputBoxLarge: '//p[text()="Catalog"]/..//input',
  globalSearch: "#search_query_top",
  searchButton: '[name="submit_search"]',
  searchedProductName:
    '//ul[@class="product_list grid row"]//a[@class="product-name"]',
};
