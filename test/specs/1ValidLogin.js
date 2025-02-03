
const LoginPage = require('../pages/login_page');

describe("Login with valid data", () =>{
  it("Should login with valid data", async () => {
    browser.url("https://www.saucedemo.com/");
    LoginPage.login("standard_user", "secret_sauce");
    LoginPage.cardProducts();
    LoginPage.cartIsShown();

  })
})