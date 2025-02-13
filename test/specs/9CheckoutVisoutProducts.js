const LoginPage = require('../pages/login_page');
const InventoryPage = require('../pages/inventory_page');
const CartPage = require('../pages/cart_page');
const CheckoutPage = require('../pages/checkoutpage');

describe("Checkout without products", () =>{
  it("Error message should displayed, after clickinh on checkout button with empty cart", async () => {
    browser.url("https://www.saucedemo.com/");
    await LoginPage.login("standard_user", "secret_sauce"); 
    await CartPage.CartButtonClick();
    await CartPage.isCartEmpty();
    await CheckoutPage.CheckOutButtonClick();
    await CartPage.checkEmptyCartErrorMessage(); 

  });
});
