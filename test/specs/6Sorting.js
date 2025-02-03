

const LoginPage = require('../pages/login_page')
const InventoryPage = require('../pages/inventory_page')
const Sorting = require('../pages/sorting')

describe("Sorting", () =>{
  it("Should sorting in apopriate way", async () => {
    browser.url("https://www.saucedemo.com/")
    LoginPage.login("standard_user", "secret_sauce")   
    await browser.pause(3000)
    await Sorting.sortProducts('az');

        // Проверяем, что продукты отсортированы от A до Z
        const isSortedAZ = await Sorting.areNamesSortedAZ();
        expect(isSortedAZ).toBe(true);
    });

    it('should sort products by name Z to A', async () => {
        // Сортируем по имени от Z до A
        await Sorting.sortProducts('za');

        // Проверяем, что продукты отсортированы от Z до A
        const isSortedZA = await Sorting.areNamesSortedZA();
        expect(isSortedZA).toBe(true);
    });

    it('should sort products by price low to high', async () => {
        // Сортируем по цене от низкой к высокой
        await Sorting.sortProducts('lohi');

        // Проверяем, что продукты отсортированы по возрастанию цены
        const isSortedLowToHigh = await Sorting.arePricesSortedLowToHigh();
        expect(isSortedLowToHigh).toBe(true);
    });

    it('should sort products by price high to low', async () => {
        // Сортируем по цене от высокой к низкой
        await Sorting.sortProducts('hilo');

        // Проверяем, что продукты отсортированы по убыванию цены
        const isSortedHighToLow = await Sorting.arePricesSortedHighToLow();
        expect(isSortedHighToLow).toBe(true);
    });


  })
