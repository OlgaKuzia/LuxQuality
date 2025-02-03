const LoginPage = require('../pages/login_page');

describe("Login with invalid login", () =>{
  it("Should login with invalid login", async () => {
    browser.url("https://www.saucedemo.com/");
    LoginPage.login("standard_user1", "secret_sauce");
    
    const errorIconLogin = await $('[name="user-name"] + svg.error_icon'); 
    await errorIconLogin.waitForDisplayed({ timeout: 5000 }); 

    
    expect(await errorIconLogin.isDisplayed()).toBe(true);

   
    const iconColorLogin = await errorIconLogin.getCSSProperty("color");
    expect(iconColorLogin.value).toBe('rgba(226,35,26,1)'); 
    
    const errorIconPass = await $('[name="password"] + svg.error_icon'); 
    await errorIconPass.waitForDisplayed({ timeout: 3000 }); 

    
    expect(await errorIconPass.isDisplayed()).toBe(true);

    
    const iconColorPass = await errorIconPass.getCSSProperty("color");
    expect(iconColorPass.value).toBe('rgba(226,35,26,1)'); 
   
    
    LoginPage.checkMessage();
   
  });
});
