import BasePage from '../../pages/base.po';
import Logger from '../../utils/logger.util';
import { config } from '../../config/wdio.conf';
import { PRODUCT_VALIDATION_POINTS } from '../../constants/product.const';

/**
 * Represents the login page and provides methods to interact with it.
 * Provides methods to interact with elements present on the login page.
 * @class
 * @extends BasePage
 */
class Login extends BasePage {
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private productSortDropdown = '.product_sort_container';

  /**
   * Logs in a user with the provided username and password.
   *
   * @param {string} username - The username to log in with.
   * @param {string} password - The password to log in with.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  async login(username: string, password: string) {
    Logger.startStep(`Logging in as ${username}`);
    await this.actions.enterText(this.usernameInput, username);
    await this.actions.enterText(this.passwordInput, password);
    await this.actions.clickElement(this.loginButton);
    await this.waitForElementVisible(this.productSortDropdown);
    Logger.endStep();
    Logger.info('On Product listing page');
  }

  /**
   * Validates the navigation after logging into the account.
   *
   * This method performs the following checks:
   * - Verifies that the current URL matches the expected inventory page URL.
   * - Verifies that the page title is 'Swag Labs'.
   * - Verifies that the title of the next page is 'Products'.
   *
   * It uses soft assertions to collect all errors and assert them at the end.
   *
   * @returns {Promise<void>} A promise that resolves when the validation is complete.
   */
  async validateNavigation() {
    Logger.startStep('Verifying navigation after login into the account.');
    this.soft.expect(await browser.getUrl()).toEqual(`${config.baseUrl}/${PRODUCT_VALIDATION_POINTS.URL}`);
    this.soft.expect(await browser.getTitle()).toEqual(PRODUCT_VALIDATION_POINTS.TITLE);
    const pageTitle = await this.actions.getText(this.nextPageTitle);
    this.soft.expect(pageTitle).toEqual(PRODUCT_VALIDATION_POINTS.LAYOUT_TITLE);
    this.soft.assertAll();
    Logger.endStep();
  }
}

export default new Login();
