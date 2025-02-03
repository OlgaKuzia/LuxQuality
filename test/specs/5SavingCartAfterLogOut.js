

const LoginPage = require('../pages/login_page');
const InventoryPage = require('../pages/inventory_page');
const CartPage = require('../pages/cart_page');

describe("Saving cart after LogOut", () =>{
  it("Should successfully save cart after Logout", async () => {
    browser.url("https://www.saucedemo.com/");
    await LoginPage.login("standard_user", "secret_sauce");    
    await InventoryPage.AddToCartProduct(1);
    await browser.pause(3000);
    await CartPage.ProductInTheCart();
    await browser.pause(3000);
    await InventoryPage.BurgerButtonClick();
    await browser.pause(3000);
    await InventoryPage.Logout();
    await browser.pause(3000);
    await LoginPage.login("standard_user", "secret_sauce");
    await CartPage.CartButtonClick();
    await browser.pause(3000);

  });
});
