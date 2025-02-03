class InventoryPage{
  get burgerButton(){
    return $("#react-burger-menu-btn")
  }
  get burgerMenu(){
    return $('.bm-item-list')
  }
  get menuItem() {
    return $$('nav.bm-item-list .menu-item');
  }
  get LogoutButton(){
    return $("#logout_sidebar_link")
  }
  get userNameTextBox(){
    return $("#user-name")
  }
  get passwordTextBox(){
    return $("#password")
  }
  get addToCartButton(){
    return $('button[data-test="add-to-cart-sauce-labs-backpack"]')
  }
  get cartBadge(){
    return $("span.shopping_cart_badge")
  }
  get cartItems(){
    return $$('div.cart_item');
  }

  async BurgerButtonClick(){
    await this.burgerButton.click()
    await this.burgerMenu.waitForDisplayed({timeout: 5000})
    expect (await this.burgerMenu.isDisplayed()).toBe(true)
    expect (await this.menuItem.length).toBe(4)

    await browser.pause(5000)
  }

  async Logout(){
    await this.LogoutButton.click();
    // We expect the URL to change to the desired one after logout.
    await browser.waitUntil(
      async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
      {
        timeout: 10000,  
        timeoutMsg: 'Страница инвентаря не загрузилась за 10 секунд'
      }
    )
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toBe('https://www.saucedemo.com/') 
  expect(await this.userNameTextBox.getValue()).toBe('');
  expect(await this.passwordTextBox.getValue()).toBe('');
}
async AddToCartProduct(expectedValue){
  await this.addToCartButton.click()
  await this.cartBadge.waitForDisplayed({ timeout: 5000 }); 
  expect (await this.cartBadge.getText()).toBe(expectedValue.toString())
}
// Obtaining a list of products
async InventoryItemsIsShown() {
  const products = await $$('.cart_item');  
  const productPrices = [];
  for (const product of products) {
    const price = await product.$('.inventory_item_price').getText();  
    productPrices.push({ price: parseFloat(price.replace('$', '').trim()) });
  }
  return productPrices;
}

}
module.exports = new InventoryPage()
