import { config } from '../../config/wdio.conf';
import BasePage from '../base.po';
import Logger from '../../utils/logger.util';
import { CK_INFO, CK_INFO_VALIDATION_POINTS, CK_OVERVIEW_VALIDATION_POINTS } from '../../constants/checkout.const';

/**
 * Represents the Checkout Info page.
 * Provides methods to interact with elements present on the Checkout page.
 * @class
 * @extends BasePage
 */
class Checkout extends BasePage {
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private zipCodeInput = '#postal-code';
  private continueButton = '#continue';
  private cancelButton = '#cancel';
  private finishButton = '#finish';

  /**
   * Fills in the checkout details on the checkout Info page.
   *
   * This method performs the following actions:
   * - Enters the first name into the first name input field.
   * - Enters the last name into the last name input field.
   * - Enters the zip code into the zip code input field.
   *
   * @returns {Promise<void>} A promise that resolves when the checkout details have been filled.
   */
  async fillCheckoutDetails() {
    Logger.info('On Checkout page');
    Logger.startStep('Filling up checkout form.');
    await this.actions.enterText(this.firstNameInput, CK_INFO.FIRST_NAME);
    await this.actions.enterText(this.lastNameInput, CK_INFO.LAST_NAME);
    await this.actions.enterText(this.zipCodeInput, CK_INFO.ZIPCODE);
    Logger.endStep();
  }

  /**
   * Cancels the checkout process by clicking the cancel button.
   *
   * @returns {Promise<void>} A promise that resolves when the cancel action is complete.
   */
  async cancelCheckout() {
    await this.actions.clickElement(this.cancelButton);
  }

  /**
   * Proceeds to the Checkout Overview Page by clicking the continue button.
   * Waits for the finish button to become visible before ending the step.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async continueCheckout() {
    Logger.startStep('Navigating to Checkout Overview Page');
    await this.actions.clickElement(this.continueButton);
    await this.waitForElementVisible(this.finishButton);
    Logger.endStep();
  }

  /**
   * Validates the navigation after clicking on the Continue button.
   *
   * This method performs the following checks:
   * - Verifies that the current URL matches the expected checkout step two URL.
   * - Verifies that the page title is 'Swag Labs'.
   * - Verifies that the next page title text is 'Checkout: Overview'.
   *
   * It uses soft assertions to collect all errors and assert them at the end.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is complete.
   */
  async validateNavigation() {
    Logger.startStep('Verifying navigation after clicking on Continue button.');
    this.soft.expect(await browser.getUrl()).toEqual(`${config.baseUrl}/${CK_OVERVIEW_VALIDATION_POINTS.URL}`);
    this.soft.expect(await browser.getTitle()).toEqual(CK_OVERVIEW_VALIDATION_POINTS.TITLE);
    const pageTitle = await this.actions.getText(this.nextPageTitle);
    this.soft.expect(pageTitle).toEqual(CK_OVERVIEW_VALIDATION_POINTS.LAYOUT_TITLE);

    this.soft.assertAll();
    Logger.endStep();
  }
}

export default new Checkout();
