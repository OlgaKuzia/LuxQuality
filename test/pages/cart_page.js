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
  
    // отримаємо усі товари із корзини
    const cartItems = await this.cartItems;
  
    // Перевіряємо, що корзина має хоча б 1 товар
    expect(cartItems.length).toBeGreaterThan(0); 
  
    // Для кожного товару у корзині перевіряємо його кількість та опис
    for (let item of cartItems) {
      // Перевіряємо кількість товару
      const quantityText = await item.$('div.cart_quantity').getText();
      expect(quantityText).toBe('1');  // Очікуємо, що кількість =1 
  }
  }
  
  
  // Метод для проверки, что корзина пуста (то есть нет элементов .cart_item)
  async isCartEmpty() {
  // Ждем, что контейнер корзины отображается на странице
  await this.cartContentsContainer.waitForDisplayed({ timeout: 5000 });

  // Проверяем, что в корзине нет элементов .cart_item
  const cartItemsCount = await this.cartItems.length;

  // Используем expect для проверки, что количество элементов равно 0
  expect(cartItemsCount).toBe(0); // Если товаров нет, корзина пуста
}


// Функция для проверки появления сообщения "Корзина пуста" по всей странице корзины
async checkEmptyCartErrorMessage() {

  // Ждем, что элемент с ошибкой будет отображен
  await this.errorMessage.waitForDisplayed({ timeout: 5000 });

  // Проверяем, что найденный элемент действительно содержит ожидаемый текст
  const errorText = await errorMessage.getText();
  expect(errorText).toContain('Cart is empty'); // Убедитесь, что текст содержит "Корзина пуста"
}



}
module.exports = new CartPage