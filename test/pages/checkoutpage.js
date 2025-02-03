
class CheckoutPage {

 
  get cartBadge() {
    return $('[data-test="shopping-cart-badge"]');
  }
  get checkoutCompleteMessage(){
    return $('[data-test="complete-header"]')
  }
  get finishButton(){
    return $('#finish')
  }
  get totalPrice(){
    return $('.summary-total-label')
  }
  get productList(){
    return $$('.cart_item')
  }
  get continueButton(){
    return $('#continue')
  }
  get postalCodeField(){
    return $('#postal-code')
  }
  get lastNameField(){
    return $('#last-name')
  }
  get firstNameField(){
    return $('#first-name')
  }
  get backHomeButton(){
    return $('#back-to-products')
  }
  
  get checkOutButton(){
    return $("#checkout")
  }
  get inventoryItem() {
    return $$('[data-test="inventory-item"]');
  }

  async CheckOutButtonClick(){
    await this.checkOutButton.click()
  }
  // A method for entering data into fields
  async inputFirstName(firstName) {
    await this.firstNameField.setValue(firstName);
  }

  async inputLastName(lastName) {
    await this.lastNameField.setValue(lastName);
  }

  async inputPostalCode(postalCode) {
    await this.postalCodeField.setValue(postalCode);
  }

  // Method for clicking the Continue button
  async clickContinue() {
    await this.continueButton.click();
  }

  // Obtaining a list of products
  async getProductList() {
    const products = await $$('.cart_item');
    const productPrices = [];
    for (const product of products) {
      const price = await product.$('.inventory_item_price').getText();
      productPrices.push({ price: parseFloat(price.replace('$', '').trim()) });
    }
    return productPrices;
  }

  // Get the total price
  async getTotalPrice() {
    const totalPrice = await $('.summary_total_label').getText();
    return parseFloat(totalPrice.replace('$', '').trim());
  }

  // Click the Finish button
  async clickFinish() {
    await this.finishButton.click();
  }

  // Receive a message on the "Checkout Complete" page
  async getCheckoutCompleteMessage() {
    await this.checkoutCompleteMessage.getText();
  }

  // Get a basket badge
async getCartBadge() {
  const cartBadge = await this.cartBadge;
  if (await cartBadge.isExisting()) {
    return await cartBadge.getText();  
  }
  return '';  
}

  
  async clickBackHome() {
    await this.backHomeButton.click();
  }


  // Obtaining a list of products
  async InventoryItemsIsShown() {
    const products = await this.inventoryItems;  
    console.log('products:', products); 
    if (!Array.isArray(products)) {
      throw new Error('products is not an array');
    }
    const productPrices = [];
    for (const product of products) {
      const price = await product.$('.inventory_item_price').getText();  
      productPrices.push({ price: parseFloat(price.replace('$', '').trim()) });
    }
    return productPrices;
  }
  
}

module.exports = new CheckoutPage();
