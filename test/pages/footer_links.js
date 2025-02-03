class FooterLinks{
get twitterButton(){
  return $('a[data-test="social-twitter"]')
}
get facebookButton(){
  return $('a[data-test="social-facebook"]')
}
get linkedinButton(){
  return $('a[data-test="social-linkedin"]')
}

async TwitterPageOpen(){
  const initialWindowHandles = await browser.getWindowHandles();

    // Кликаем по ссылке на Twitter
    await this.twitterButton.click()

    // Ждем, пока откроется новое окно
    await browser.waitUntil(
      async () => {
        const currentHandles = await browser.getWindowHandles();
        return currentHandles.length > initialWindowHandles.length;
      },
      {
        timeout: 5000,
        timeoutMsg: 'New window did not open after clicking Twitter link'
      }
    );

    // Переключаемся на новое окно
    const windows = await browser.getWindowHandles();
    await browser.switchToWindow(windows[1]);

    // Проверяем, что открылся Twitter
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('https://x.com/saucelabs');
    await browser.pause(3000)

    // Закрываем новое окно
    await browser.closeWindow();

    // Возвращаемся в исходное окно
    await browser.switchToWindow(windows[0]);
  }


 async FaceBookPageOpen() {
   
   const initialWindowHandles = await browser.getWindowHandles();

   // Кликаем по ссылке на Twitter
   await this.facebookButton.click()

   // Ждем, пока откроется новое окно
   await browser.waitUntil(
     async () => {
       const currentHandles = await browser.getWindowHandles();
       return currentHandles.length > initialWindowHandles.length;
     },
     {
       timeout: 5000,
       timeoutMsg: 'New window did not open after clicking Twitter link'
     }
   );

   // Переключаемся на новое окно
   const windows = await browser.getWindowHandles();
   await browser.switchToWindow(windows[1]);

   // Проверяем, что открылся Twitter
   const currentUrl = await browser.getUrl();
   expect(currentUrl).toContain('https://www.facebook.com/saucelabs');
   await browser.pause(3000)

   // Закрываем новое окно
   await browser.closeWindow();

   // Возвращаемся в исходное окно
   await browser.switchToWindow(windows[0]);
  }
 
 
 async LinkedinPageOpen() {
   
   const initialWindowHandles = await browser.getWindowHandles();

    // Кликаем по ссылке на лінкедін
    await this.linkedinButton.click()

    // Ждем, пока откроется новое окно
    await browser.waitUntil(
      async () => {
        const currentHandles = await browser.getWindowHandles();
        return currentHandles.length > initialWindowHandles.length;
      },
      {
        timeout: 5000,
        timeoutMsg: 'New window did not open after clicking Twitter link'
      }
    );

    // Переключаемся на новое окно
    const windows = await browser.getWindowHandles();
    await browser.switchToWindow(windows[1]);

    // Проверяем, что открылся Twitter
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('https://www.linkedin.com/company/sauce-labs/');
    await browser.pause(3000)

    // Закрываем новое окно
    await browser.closeWindow();

    // Возвращаемся в исходное окно
    await browser.switchToWindow(windows[0]);

 }
}
module.exports = new FooterLinks()