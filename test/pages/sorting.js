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

  // Метод для выбора сортировки
  async sortProducts(sortValue) {
      await this.sortDropdown.selectByAttribute('value', sortValue);
      await browser.pause(2000); // Пауза для обновления страницы
  }

  // Метод для получения цен продуктов
  async getProductPrices() {
      const productPrices = await this.productPrices; // Получаем элементы с ценами
      const prices = await Promise.all(
          Array.from(productPrices).map(async (priceElement) => {
              const priceText = await priceElement.getText();
              return parseFloat(priceText.replace('$', '').trim()); // Извлекаем цену и преобразуем в число
          })
      );
      return prices;
  }

  // Метод для получения названий продуктов
  async getProductNames() {
      const productNames = await this.productNames; // Получаем элементы с названиями
      const names = await Promise.all(
          Array.from(productNames).map(async (nameElement) => {
              return await nameElement.getText();
          })
      );
      return names;
  }

  // Проверка сортировки цен по возрастанию
  async arePricesSortedLowToHigh() {
      const prices = await this.getProductPrices();
      return prices.every((price, index, array) => index === 0 || price >= array[index - 1]);
  }

  // Проверка сортировки цен по убыванию
  async arePricesSortedHighToLow() {
      const prices = await this.getProductPrices();
      return prices.every((price, index, array) => index === 0 || price <= array[index - 1]);
  }

  // Проверка сортировки по имени от A до Z
  async areNamesSortedAZ() {
      const names = await this.getProductNames();
      return names.every((name, index, array) => index === 0 || name.toLowerCase() >= array[index - 1].toLowerCase());
  }

  // Проверка сортировки по имени от Z до A
  async areNamesSortedZA() {
      const names = await this.getProductNames();
      return names.every((name, index, array) => index === 0 || name.toLowerCase() <= array[index - 1].toLowerCase());
  }
}

module.exports = new Sorting();
