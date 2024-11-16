import { config } from '../../config/wdio.conf';
import { CK_INFO_VALIDATION_POINTS } from '../../constants/checkout.const';
import BasePage from '../../pages/base.po';
import Logger from '../../utils/logger.util';

/**
 * Represents the Cart page.
 * Provides methods to interact with elements present on the Cart page.
 * @class
 * @extends BasePage
 */
class Cart extends BasePage {
  private cartItems = '.cart_item'; // Selector for each item in the cart
  private checkoutButton = 'button#checkout';
  private continueShoppingButton = 'button#continue-shopping';
  private checkoutInfoForm = '.checkout_info';

  /**
   * Clicks the "Continue Shopping" button on the cart page.
   * This method uses the actions object to perform the click operation.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async continueShopping() {
    await this.actions.clickElement(this.continueShoppingButton);
  }

  /**
   * Proceeds to the checkout process by clicking the checkout button
   * and waiting for the checkout information form to become visible.
   *
   * @returns {Promise<void>} A promise that resolves when the actions are complete.
   */
  async proceedToCheckout() {
    Logger.info('Proceeding to Checkout');
    await this.actions.clickElement(this.checkoutButton);
    await this.waits.waitForPageToLoad();
    await this.waits.waitForElementVisible(this.checkoutInfoForm);
  }

  /**
   * Validates the content of the cart against the expected product names.
   *
   * @param expectedProduct - A Map of expected product names and their respective price to be validated against the cart content.
   * @throws Will throw an error if the number of products in the cart does not match the expected number.
   * @throws Will throw an error if any of the expected product names are not found in the cart.
   *
   */
  async validateCartContent(expectedProduct: Map<string, number>) {
    try {
      Logger.startStep('Cart Validation: Started');
      const cartProductNames = await this.getCartProductNames();

      const expectedProductNames = Array.from(expectedProduct.keys());

      // Check if the cart contains exactly 'n' products
      Logger.info('Validation #1: Total number of article in the cart');
      if (cartProductNames.length !== expectedProductNames.length) {
        throw new Error(`Expected ${expectedProductNames.length} products in cart, but found ${cartProductNames.length}`);
      }

      // Check if all product names in the cart match the expected product names
      Logger.info('Validation #2: Expected products present in the cart');
      for (const name of expectedProductNames) {
        if (!cartProductNames.includes(name)) {
          throw new Error(`Product "${name}" was expected in the cart but was not found.`);
        }
      }
    } catch (error) {
      Logger.error(`Error occured while validating cart content: \n${error}`);
      throw new Error(`Cart validation failed! \n${error}`);
    }
    Logger.info('Cart validation successful: All products are correct.');
    Logger.endStep();
  }

  /**
   * Retrieves the names of products in the cart.
   *
   * This method waits for the cart items to be visible, then iterates through each item
   * to extract and return the product names.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of product names in the cart.
   */
  private async getCartProductNames(): Promise<string[]> {
    await this.waits.waitForElementVisible(this.cartItems);

    const cartItems = await $$(this.cartItems);
    const cartProductNames = [];

    for (const item of cartItems) {
      const name = await item.$('.inventory_item_name').getText();
      cartProductNames.push(name);
    }
    Logger.info(`Cart contains below products: \n ${cartProductNames}`);
    return cartProductNames;
  }

  /**
   * Validates the navigation after clicking on the Checkout button.
   *
   * This method performs the following checks:
   * - Verifies that the current URL matches the expected checkout step one URL.
   * - Verifies that the page title is 'Swag Labs'.
   * - Verifies that the next page title text is 'Checkout: Your Information'.
   *
   * It uses soft assertions to collect all errors and report them at the end.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is complete.
   */
  async validateNavigation() {
    Logger.startStep('Verifying navigation after clicking on Checkout button.');
    this.soft.expect(await browser.getUrl()).toEqual(`${config.baseUrl}/${CK_INFO_VALIDATION_POINTS.URL}`);
    this.soft.expect(await browser.getTitle()).toEqual(CK_INFO_VALIDATION_POINTS.TITLE);
    const pageTitle = await this.actions.getText(this.nextPageTitle);
    this.soft.expect(pageTitle).toEqual(CK_INFO_VALIDATION_POINTS.LAYOUT_TITLE);
    this.soft.assertAll();
    Logger.endStep();
  }
}

export default new Cart();
