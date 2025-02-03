
const LoginPage = require('../pages/login_page')
const InventoryPage = require('../pages/inventory_page')
const CartPage = require('../pages/cart_page')
const checkoutPage  = require('../pages/checkoutpage')

describe("Valid checkout", () =>{
  it("Should checkout with products in the cart", async () => {
    await browser.url("https://www.saucedemo.com/")
    await LoginPage.login("standard_user", "secret_sauce")
    await browser.pause(2000) 
    await InventoryPage.AddToCartProduct(1)
    await CartPage.ProductInTheCart()
    await browser.pause(2000)
    await CartPage.CartButtonClick()
    await browser.pause(2000)
    await checkoutPage.CheckOutButtonClick()
    await browser.pause(2000)


  })
})

describe('Checkout Flow', () => {
  it('should complete the checkout flow and redirect correctly', async () => {
    // 1. Вводим данные в поля
    await checkoutPage.inputFirstName('Jon')
    await checkoutPage.inputLastName('Doe')
    await checkoutPage.inputPostalCode('12345')

    // 2. Кликаем по кнопке Continue
    await checkoutPage.clickContinue()
    await browser.pause(3000)

    // 3. Проверяем, что пользователь перенаправлен на страницу "Overview"
    const productPrices = await checkoutPage.getProductList() // Получаем список продуктов на странице
    


    // 4. Кликаем на кнопку "Finish"
    await checkoutPage.clickFinish()

    // 5. Проверяем, что пользователь перенаправлен на страницу "Checkout Complete"
    const thankYouMessage = await checkoutPage.getCheckoutCompleteMessage()
    expect(thankYouMessage).toHaveText('Thank you for your order!')
    
    // 9. Кликаем на кнопку "Back Home"
    await checkoutPage.clickBackHome()
    await browser.pause(2000)
    // 10. Проверяем, что мы вернулись на страницу Inventory
    expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html')


    // Проверка, что корзина пуста
    const cartBadge = await checkoutPage.getCartBadge();
    await expect(cartBadge).toBe('');
    
  })
})


 
