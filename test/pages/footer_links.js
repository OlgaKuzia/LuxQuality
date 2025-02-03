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

    
    await this.twitterButton.click()

    //We are waiting for a new window to open
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

    // Switch to a new window
    const windows = await browser.getWindowHandles();
    await browser.switchToWindow(windows[1]);

  
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('https://x.com/saucelabs');
    await browser.pause(3000)
    await browser.closeWindow();

    // We return to the original window
    await browser.switchToWindow(windows[0]);
  }


 async FaceBookPageOpen() {
   
   const initialWindowHandles = await browser.getWindowHandles();

   await this.facebookButton.click()

   // We are waiting for a new window to open
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

   const windows = await browser.getWindowHandles();
   await browser.switchToWindow(windows[1]);
   const currentUrl = await browser.getUrl();
   expect(currentUrl).toContain('https://www.facebook.com/saucelabs');
   await browser.pause(2000)
   await browser.closeWindow();
   await browser.switchToWindow(windows[0]);
  }
 
 
 async LinkedinPageOpen() {
   
   const initialWindowHandles = await browser.getWindowHandles();
    await this.linkedinButton.click()
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

    const windows = await browser.getWindowHandles();
    await browser.switchToWindow(windows[1]);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('https://www.linkedin.com/company/sauce-labs/');
    await browser.pause(3000)
    await browser.closeWindow();
    await browser.switchToWindow(windows[0]);

 }
}
module.exports = new FooterLinks()