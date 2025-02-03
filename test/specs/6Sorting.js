

const LoginPage = require('../pages/login_page');
const InventoryPage = require('../pages/inventory_page');
const Sorting = require('../pages/sorting');

describe("Sorting", () =>{
  it("Should sorting in apopriate way", async () => {
    browser.url("https://www.saucedemo.com/");
    LoginPage.login("standard_user", "secret_sauce");   
    await browser.pause(3000);
    await Sorting.sortProducts('az');

        
        const isSortedAZ = await Sorting.areNamesSortedAZ();
        expect(isSortedAZ).toBe(true);
    });

    it('should sort products by name Z to A', async () => {
        
        await Sorting.sortProducts('za');

        
        const isSortedZA = await Sorting.areNamesSortedZA();
        expect(isSortedZA).toBe(true);
    });

    it('should sort products by price low to high', async () => {
        
        await Sorting.sortProducts('lohi');

        
        const isSortedLowToHigh = await Sorting.arePricesSortedLowToHigh();
        expect(isSortedLowToHigh).toBe(true);
    });

    it('should sort products by price high to low', async () => {
        await Sorting.sortProducts('hilo');
        const isSortedHighToLow = await Sorting.arePricesSortedHighToLow();
        expect(isSortedHighToLow).toBe(true);
    });


  });
