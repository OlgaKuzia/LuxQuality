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
    await this.userNameTextBox.setValue(username);
    await this.passwordTextBox.waitForDisplayed({ timeout: 5000 });
    await this.passwordTextBox.setValue(password) ;
    await this.loginButton.click();
    await browser.pause(5000);
    await browser.waitUntil(
    
    async () => (await browser.getUrl()) === 'https://www.saucedemo.com/inventory.html',
    {
      timeout: 10000,   
      timeoutMsg: 'Страница инвентаря не загрузилась за 10 секунд'
    }
  
  );

  const currentUrl = await browser.getUrl();
  expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');
  }
  async IsPasswordDots(){
    const passwordValue = await this.passwordDots.getValue(); 
    return /^[.]+$/.test(passwordValue);  // Check if the password consists only of dots
  }

  
  async cardProducts(){
    expect(this.cardProductItem.length).toBeGreaterThan(0);
   for (let card of this.cardProductItem) {
    await card.waitForDisplayed({ timeout: 5000 });  // We expect every card to be visible
    expect(await card.isDisplayed()).toBe(true);  // Check that the card is displayed
  }
  }
  async cartIsShown(){
    expect(await this.cart.isDisplayed()).toBe(true);
  }

  //check if the error message has text
  async checkMessage(){
    await expect(this.errorMessage).toHaveTextContaining(
      "Epic sadface: Username and password do not match any user in this service"
    )

}
}

module.exports = new LoginPage()