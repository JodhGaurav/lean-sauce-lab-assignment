import Actions from '../utils/actions.util';
import Logger from '../utils/logger.util';
import { SoftAssertion } from '../utils/soft.assertion.util';
import Wait from '../utils/waits.util';

/**
 * BasePage class provides common methods for page objects.
 */
export default class BasePage {
  actions = new Actions();
  waits = new Wait();
  public soft = new SoftAssertion();
  protected nextPageTitle = '.title';

  /**
   * Navigates to the specified path.
   *
   * @param path - The URL path to navigate to.
   */
  async open(path: string) {
    Logger.startStep('Navigating to login page');
    await browser.maximizeWindow();
    await browser.url(path);
    await this.waits.waitForPageToLoad();
    Logger.endStep();
  }
}
