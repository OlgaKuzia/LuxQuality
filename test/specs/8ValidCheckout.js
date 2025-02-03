
const LoginPage = require('../pages/login_page');
const InventoryPage = require('../pages/inventory_page');
const CartPage = require('../pages/cart_page');
const checkoutPage  = require('../pages/checkoutpage');

describe("Valid checkout", () =>{
  it("Should checkout with products in the cart", async () => {
    await browser.url("https://www.saucedemo.com/");
    await LoginPage.login("standard_user", "secret_sauce"); 
    await InventoryPage.AddToCartProduct(1);
    await CartPage.ProductInTheCart();
    await CartPage.CartButtonClick();
    await checkoutPage.CheckOutButtonClick();

  });
});

describe('Checkout Flow', () => {
  it('should complete the checkout flow and redirect correctly', async () => {
    
    await checkoutPage.inputFirstName('Jon');
    await checkoutPage.inputLastName('Doe');
    await checkoutPage.inputPostalCode('12345');

 
    await checkoutPage.clickContinue();
  
    const productPrices = await checkoutPage.getProductList(); 
  
    await checkoutPage.clickFinish();

    const thankYouMessage = await checkoutPage.getCheckoutCompleteMessage();
    expect(thankYouMessage).toHaveText('Thank you for your order!');
    
    await checkoutPage.clickBackHome();
    
    expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');

    const cartBadge = await checkoutPage.getCartBadge();
    await expect(cartBadge).toBe('');
    
  });
});



 
