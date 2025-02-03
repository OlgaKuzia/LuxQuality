
const LoginPage = require('../pages/login_page')

describe("Login with invalid password", () =>{
  it("Should login with invalid password", async () => {
    browser.url("https://www.saucedemo.com/")
    LoginPage.login("standard_user", "secret_sauce1")
    
    // Перевіряємо наявність червоного хреста біля поля логіну
    const errorIconLogin = await $('[name="user-name"] + svg.error_icon'); // SVG іконка червоного хреста
    await errorIconLogin.waitForDisplayed({ timeout: 5000 }); // Чекаємо, поки іконка стане видимою

    // Перевіряємо, чи іконка є видимою
    expect(await errorIconLogin.isDisplayed()).toBe(true);

    // Перевіряємо колір хреста (червоний)
    const iconColorLogin = await errorIconLogin.getCSSProperty("color");
    expect(iconColorLogin.value).toBe('rgba(226,35,26,1)'); // Перевіряємо, що колір червоний

    // Перевіряємо наявність червоного хреста біля поля пароль
    const errorIconPass = await $('[name="password"] + svg.error_icon'); // SVG іконка червоного хреста
    await errorIconPass.waitForDisplayed({ timeout: 3000 }); // Чекаємо, поки іконка стане видимою

    // Перевіряємо, чи іконка є видимою
    expect(await errorIconPass.isDisplayed()).toBe(true);

    // Перевіряємо колір хреста (червоний)
    const iconColorPass = await errorIconPass.getCSSProperty("color");
    expect(iconColorPass.value).toBe('rgba(226,35,26,1)'); // Перевіряємо, що колір червоний

    //перевіряємо, чи повідомля про помилку має текст
    LoginPage.checkMessage()  
  })
})