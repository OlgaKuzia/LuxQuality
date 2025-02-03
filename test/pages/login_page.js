class LoginPage {

  get userNameTextBox(){
    return $("#user-name")
  }
  get passwordTextBox(){
    return $("#password")
  }
  get loginButton(){
    return $("#login-button")
  }
  get errorMessage(){
    return $('[data-test="error"]')
  }
  get passwordDots(){
    return $('[name="password"]');

  }
  
  get cardProductItem(){
    return $$('.inventory_item')
  } 
  get cart(){
    return ("#shopping_cart_container")
  }

  async login(username, password){
    await this.userNameTextBox.setValue(username)
    await this.passwordTextBox.waitForDisplayed({ timeout: 5000 });
    await this.passwordTextBox.setValue(password)
    const inputType = await this.passwordDots.getAttribute('type'); //перевіряємо, щоб пароль був точками
    expect(inputType).toBe('password');
    await browser.pause(3000)
    await this.loginButton.click()
    await browser.pause(5000)
   // // Очікуємо,що URL зміниться на потрібний, після логіну
   await browser.waitUntil(
    
    async () => (await browser.getUrl()) === 'https://www.saucedemo.com/inventory.html',
    {
      timeout: 10000,  // Чекаєм до 10 секунд
      timeoutMsg: 'Страница инвентаря не загрузилась за 10 секунд'
    }
  
  );

  // Перевірка, що URL сорінки дійсно вірний
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');
  }
  async IsPasswordDots(){
    const passwordValue = await this.passwordDots.getValue();  // Отримуємо введене значення пароля
    return /^[.]+$/.test(passwordValue);  // Перевіряємо, чи складається пароль тільки з точок
  }

  //Перевіряєм, що відображаються карточки товару
  async cardProducts(){
    expect(this.cardProductItem.length).toBeGreaterThan(0);
    // Перевіряємо, що кожна карточка відображається
   for (let card of this.cardProductItem) {
    await card.waitForDisplayed({ timeout: 5000 });  // Очікуємо, що кожна картка буде видимою
    expect(await card.isDisplayed()).toBe(true);  // Перевіряємо, що картка відображається
  }
  }
  // Перевіряємо, що на інветорі пейдж видно корзину
  async cartIsShown(){
    expect(await this.cart.isDisplayed()).toBe(true);
  }

  //перевіряємо, чи має повідомлення про помилку текст
  async checkMessage(){
    await expect(this.errorMessage).toHaveTextContaining(
      "Epic sadface: Username and password do not match any user in this service"
    )

}
}

module.exports = new LoginPage()