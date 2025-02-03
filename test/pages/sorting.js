class Sorting {
  // Элементы
  get sortDropdown() {
      return $('select.product_sort_container');
  }

  get productPrices() {
      return $$('div.inventory_item_price');
  }

  get productNames() {
      return $$('div.inventory_item_name');
  }

  async sortProducts(sortValue) {
      await this.sortDropdown.selectByAttribute('value', sortValue);
      await browser.pause(2000); 
  }

  
  async getProductPrices() {
      const productPrices = await this.productPrices; 
      const prices = await Promise.all(
          Array.from(productPrices).map(async (priceElement) => {
              const priceText = await priceElement.getText();
              return parseFloat(priceText.replace('$', '').trim()); 
          })
      );
      return prices;
  }

  
  async getProductNames() {
      const productNames = await this.productNames; 
      const names = await Promise.all(
          Array.from(productNames).map(async (nameElement) => {
              return await nameElement.getText();
          })
      );
      return names;
  }

  async arePricesSortedLowToHigh() {
      const prices = await this.getProductPrices();
      return prices.every((price, index, array) => index === 0 || price >= array[index - 1]);
  }

  async arePricesSortedHighToLow() {
      const prices = await this.getProductPrices();
      return prices.every((price, index, array) => index === 0 || price <= array[index - 1]);
  }

  async areNamesSortedAZ() {
      const names = await this.getProductNames();
      return names.every((name, index, array) => index === 0 || name.toLowerCase() >= array[index - 1].toLowerCase());
  }

  async areNamesSortedZA() {
      const names = await this.getProductNames();
      return names.every((name, index, array) => index === 0 || name.toLowerCase() <= array[index - 1].toLowerCase());
  }
}

module.exports = new Sorting();
