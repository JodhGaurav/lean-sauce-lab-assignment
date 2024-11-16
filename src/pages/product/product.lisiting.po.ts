import BasePage from '../../pages/base.po';
import Logger from '../../utils/logger.util';

/**
 * Represents the Product listing page.
 * Provides methods to interact with elements present on the Product listing page.
 * @class
 * @extends BasePage
 */
class ProductListing extends BasePage {
  private productItemsList = '.inventory_item'; // Selector for each product item
  private productNameLable = '.inventory_item_name';
  private productPriceLable = '.inventory_item_price';
  private selectedProductNames: string[] = []; // Array to store names of selected products
  private selectedProducts: Map<string, number> = new Map(); // Map to store product name and price

  async selectProductByName(name: string) {
    await this.actions.clickElement(`//*[text()="${name}"]`);
  }

  /**
   * Selects a specified number of random products from the product list and adds them to the cart.
   *
   * @param {number} [count=3] - The number of products to select. Defaults to 3 if not specified.
   * @returns {Promise<Map<string, number>>} - A promise that resolves to an Map of selected product names and their respective price.
   *
   * @throws Will log an error message if an error occurs while adding products to the cart.
   */
  async selectRandomProducts(count: number = 3): Promise<Map<string, number>> {
    try {
      Logger.startStep('Selecting products');
      await this.waits.waitForElementVisible(this.productItemsList);
      const products = await $$(this.productItemsList);
      const productCount = products.length;
      // Generate 'count' unique random indices within the product array length
      const selectedIndices = this.getRandomIndices(productCount, count);

      // Loop through selected indices and add each product to the cart
      for (const index of selectedIndices) {
        const product = products[index];
        const productName = await product.$(this.productNameLable).getText(); // Get product name
        const productPriceText = await product.$(this.productPriceLable).getText(); // Get product price as text
        const productPrice = parseFloat(productPriceText.replace('$', '')); // Convert price to a number
        this.selectedProducts.set(productName, productPrice); // Store name and price in the Map

        await product.$('button').click();
        await browser.pause(5000);
      }
      Logger.endStep();
    } catch (error) {
      Logger.error(`Error occured while adding products to cart: \n${error}`);
    }
    Logger.info(`Selected ${count} products ${this.selectedProductNames}`);
    return this.selectedProducts;
  }

  /**
   * Generates an array of unique random indices.
   *
   * @param arrayLength - The length of the array from which indices are to be generated.
   * @param count - The number of unique random indices to generate.
   * @returns An array of unique random indices.
   */
  private getRandomIndices(arrayLength: number, count: number): number[] {
    const indices = new Set<number>();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  }
}

export default new ProductListing();
