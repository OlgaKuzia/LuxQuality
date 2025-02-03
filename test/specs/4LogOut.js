
const LoginPage = require('../pages/login_page');
const InventoryPage = require('../pages/inventory_page');

describe("Logout", () =>{
  it("Should successfully logout", async () => {
    browser.url("https://www.saucedemo.com/");
    await LoginPage.login("standard_user", "secret_sauce");  
    await InventoryPage.BurgerButtonClick();
    await browser.pause(3000);
    await InventoryPage.Logout();
    await browser.pause(3000);

  });
});
