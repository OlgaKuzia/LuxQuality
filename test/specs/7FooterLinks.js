
const LoginPage = require('../pages/login_page')
const InventoryPage = require('../pages/inventory_page')
const FooterLinks = require('../pages/footer_links')

describe("Openings links in the footer", () =>{
  it("Should open links in the footer", async () => {
    browser.url("https://www.saucedemo.com/")
    
    LoginPage.login("standard_user", "secret_sauce")
    await browser.pause(2000)
    await FooterLinks.TwitterPageOpen()
    await browser.pause(2000)
    await FooterLinks.FaceBookPageOpen()
    await browser.pause(2000)
    await FooterLinks.LinkedinPageOpen()
    await browser.pause(2000)
  
  
  })
})
