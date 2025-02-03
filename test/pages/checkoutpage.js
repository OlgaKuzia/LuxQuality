
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
  // Метод для ввода данных в поля
  async inputFirstName(firstName) {
    await this.firstNameField.setValue(firstName);
  }

  async inputLastName(lastName) {
    await this.lastNameField.setValue(lastName);
  }

  async inputPostalCode(postalCode) {
    await this.postalCodeField.setValue(postalCode);
  }

  // Метод для клика по кнопке Continue
  async clickContinue() {
    await this.continueButton.click();
  }

  // Получение списка продуктов
  async getProductList() {
    const products = await $$('.cart_item');
    const productPrices = [];
    for (const product of products) {
      const price = await product.$('.inventory_item_price').getText();
      productPrices.push({ price: parseFloat(price.replace('$', '').trim()) });
    }
    return productPrices;
  }

  // Получить общую цену
  async getTotalPrice() {
    const totalPrice = await $('.summary_total_label').getText();
    return parseFloat(totalPrice.replace('$', '').trim());
  }

  // Клик по кнопке Finish
  async clickFinish() {
    await this.finishButton.click();
  }

  // Получить сообщение на странице "Checkout Complete"
  async getCheckoutCompleteMessage() {
    await this.checkoutCompleteMessage.getText();
  }

  // Получить badge корзины
async getCartBadge() {
  const cartBadge = await this.cartBadge;
  if (await cartBadge.isExisting()) {
    return await cartBadge.getText();  
  }
  return '';  // Если элемента нет, возвращаем пустую строку
}

  // Клик по кнопке Back Home
  async clickBackHome() {
    await this.backHomeButton.click();
  }


  // Получение списка продуктов
  async InventoryItemsIsShown() {
    const products = await this.inventoryItems;  // Получаем все товары
    console.log('products:', products);  // Логируем результат
    if (!Array.isArray(products)) {
      throw new Error('products is not an array');
    }
    const productPrices = [];
    for (const product of products) {
      const price = await product.$('.inventory_item_price').getText();  // Получаем цену продукта
      productPrices.push({ price: parseFloat(price.replace('$', '').trim()) });
    }
    return productPrices;
  }
  
}

module.exports = new CheckoutPage();
