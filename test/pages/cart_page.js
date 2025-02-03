class CartPage{
  get cartBadge(){
    return $("span.shopping_cart_badge")
  }
  get cartItems(){
    return $$('div.cart_item');
  }
  get cartButton(){
    return $('#shopping_cart_container')
  }
  get cartContentsContainer() {
    return $('#cart_contents_container');
  }
  
  get errorMessage(){
    return $('//*[contains(text(), "Cart is empty")]')
  }
  
  async CartButtonClick(){
    await this.cartButton.click()
    
  }
  
  async ProductInTheCart(){
    await this.cartBadge.click()
  
    // get all the products from the basket
    const cartItems = await this.cartItems;
  
    // Check that the cart has at least 1 product
    expect(cartItems.length).toBeGreaterThan(0); 
  
    // For each product in the cart, we check its quantity and description
    for (let item of cartItems) {
      // Checking the quantity of goods
      const quantityText = await item.$('div.cart_quantity').getText();
      expect(quantityText).toBe('1');  // We expect that the number =1
  }
  }
  
  
  // Method for checking that the cart is empty (that is, there are no .cart_item elements)
  async isCartEmpty() {
  // We are waiting for the basket container to be displayed on the page
  await this.cartContentsContainer.waitForDisplayed({ timeout: 5000 });

  // We check that there are no .cart_item elements in the cart
  const cartItemsCount = await this.cartItems.length;

  // We use expect to check that the number of elements is 0

  expect(cartItemsCount).toBe(0); // Если товаров нет, корзина пуста
}


// A function to check the appearance of the message "Cart empty" on the entire cart page
async checkEmptyCartErrorMessage() {

  // We are waiting for the element with an error to be displayed
  await this.errorMessage.waitForDisplayed({ timeout: 5000 });

  // We check that the found element really contains the expected text
  const errorText = await errorMessage.getText();
  expect(errorText).toContain('Cart is empty'); // Make sure the text contains "Cart is empty"
}



}
module.exports = new CartPage