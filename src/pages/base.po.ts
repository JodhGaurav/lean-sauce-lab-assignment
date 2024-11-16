import Actions from '../utils/actions.util';
import Logger from '../utils/logger.util';
import { SoftAssertion } from '../utils/soft.assertion.util';

/**
 * BasePage class provides common methods for page objects.
 */
export default class BasePage {
  actions = new Actions();
  public soft = new SoftAssertion();
  protected nextPageTitle = '.title';

  /**
   * Navigates to the specified path.
   *
   * @param path - The URL path to navigate to.
   */
  async open(path: string) {
    Logger.startStep('Navigating to login page');
    await browser.url(path);
    Logger.endStep();
  }

  /**
   * Waits for an element to be visible on the page.
   *
   * @param selector - The selector of the element to wait for.
   */
  async waitForElementVisible(selector: string) {
    await $(selector).waitForDisplayed();
  }
}
