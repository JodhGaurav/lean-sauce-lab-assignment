import BasePage from '../../pages/base.po';
import Logger from '../../utils/logger.util';
import { config } from '../../config/wdio.conf';
import { CART_VALIDATION_POINTS } from '../../constants/cart.const';

/**
 * Represents the header section of the page.
 * Provides methods to interact with elements in the header.
 * @class
 * @extends BasePage
 */
class Header extends BasePage {
  private cartLogo = '.shopping_cart_link';
  private checkoutButton = 'button#checkout';

  /**
   * Navigates to the Cart Page by clicking on the cart logo and waits for the checkout button to be visible.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async goToCart() {
    Logger.info('Navigating to Cart Page');
    await this.actions.clickElement(this.cartLogo);
    await this.waitForElementVisible(this.checkoutButton);
    Logger.info('On Cart Page');
  }

  /**
   * Validates the navigation after clicking on the Cart Icon.
   *
   * This method performs the following checks:
   * - Verifies that the current URL matches the expected cart URL.
   * - Verifies that the page title is 'Swag Labs'.
   * - Verifies that the page title text is 'Your Cart'.
   *
   * It uses soft assertions to collect all errors and assert them at the end.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is complete.
   */
  async validateNavigation() {
    Logger.startStep('Verifying navigation after clicking on Cart Icon.');
    this.soft.expect(await browser.getUrl()).toEqual(`${config.baseUrl}/${CART_VALIDATION_POINTS.URL}`);
    this.soft.expect(await browser.getTitle()).toEqual(CART_VALIDATION_POINTS.TITLE);
    const pageTitle = await this.actions.getText(this.nextPageTitle);
    this.soft.expect(pageTitle).toEqual(CART_VALIDATION_POINTS.LAYOUT_TITLE);
    this.soft.assertAll();
    Logger.endStep();
  }
}

export default new Header();
