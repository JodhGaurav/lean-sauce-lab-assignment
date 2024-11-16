import BasePage from '../../pages/base.po';
import Logger from '../../utils/logger.util';
import { config } from '../../config/wdio.conf';
import { CK_COMPLETE_VALIDATION_POINTS } from '../../constants/checkout.const';

/**
 * Represents the Checkout Overview page.
 * Provides methods to interact with elements present on the Checkout Overview  page.
 * @class
 * @extends BasePage
 */
class CheckoutOverview extends BasePage {
  private cartItems = '.cart_item'; // Selector for each item in the cart
  private continueButton = '#finish';
  private cancelButton = '#cancel';
  private successfullyCompletedOrder = '#checkout_complete_container';

  /**
   * Cancels the checkout process by clicking the cancel button.
   *
   * @returns {Promise<void>} A promise that resolves when the cancel button is clicked.
   */
  async cancelCheckout() {
    await this.actions.clickElement(this.cancelButton);
  }

  /**
   * Completes the checkout process by clicking the continue button.
   *
   * @returns {Promise<void>} A promise that resolves when the checkout is complete.
   */
  async completeCheckout() {
    Logger.info('Placing final order');
    await this.actions.clickElement(this.continueButton);
  }

  /**
   * Validates the details of the order against the expected product names.
   *
   * @param expectedProductNames - An array of expected product names to be validated against the order content.
   * @throws Will throw an error if the number of products in the order does not match the expected number.
   * @throws Will throw an error if any of the expected product names are not found in the order.
   *
   */
  async validateOrderDetails(expectedProductNames: string[]) {
    try {
      Logger.startStep('Checkout Overview/Order Details Validation: Started');
      const products = await this.getCartProductNames();

      // Check if the cart contains exactly 3 products
      if (products.length !== expectedProductNames.length) {
        throw new Error(`Expected ${expectedProductNames.length} products in the final order page, but found ${products.length}`);
      }

      // Check if all product names in the cart match the expected product names
      for (const name of expectedProductNames) {
        if (!products.includes(name)) {
          throw new Error(`Product "${name}" was expected in the order but was not found.`);
        }
      }
    } catch (error) {
      Logger.error(`Error occured while validating final order details: \n${error}`);
    }
    Logger.info('Order details validation successful: All products are correct.');
    Logger.endStep();
  }

  /**
   * Validates the checkout completion process.
   *
   * This method performs the following validations:
   * - Verifies that the checkout process is complete.
   * - Checks that the current URL matches the expected checkout completion URL.
   * - Ensures that the page title is 'Swag Labs'.
   * - Confirms that the next page title is 'Checkout: Complete!'.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is complete.
   */
  async validate() {
    Logger.startStep('Verifying checkout completion');
    expect(await this.isCheckoutComplete()).toBe(true);

    this.soft.expect(await browser.getUrl()).toEqual(`${config.baseUrl}/${CK_COMPLETE_VALIDATION_POINTS.URL}`);
    this.soft.expect(await browser.getTitle()).toEqual(CK_COMPLETE_VALIDATION_POINTS.TITLE);
    const pageTitle = await this.actions.getText(this.nextPageTitle);
    this.soft.expect(pageTitle).toEqual(CK_COMPLETE_VALIDATION_POINTS.LAYOUT_TITLE);
    this.soft.assertAll();
    Logger.endStep();
  }

  /**
   * Checks if the checkout process is complete by verifying the display status of the success message.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the checkout is complete.
   */
  private async isCheckoutComplete() {
    return await $(this.successfullyCompletedOrder).isDisplayed();
  }

  /**
   * Retrieves the names of the products in the cart.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of product names in the cart.
   */
  private async getCartProductNames(): Promise<string[]> {
    await this.waitForElementVisible(this.cartItems);

    const cartItems = await $$(this.cartItems);
    const cartProductNames = [];

    for (const item of cartItems) {
      const name = await item.$('.inventory_item_name').getText();
      cartProductNames.push(name);
    }

    Logger.info(`Final Order contains below products: \n ${cartProductNames}`);
    return cartProductNames;
  }
}

export default new CheckoutOverview();
