export default class Actions {
  /**
   * Scrolls the browser window to ensure the specified element is in view.
   *
   * @param {string} locator - The selector for the element to scroll to.
   * @param {number} [compulsary=0] - If set to 1, forces the scroll even if the element is already in view.
   *
   * @returns {Promise<void>} A promise that resolves when the scrolling action is complete.
   */
  async scrollToElement(locator: string, compulsary = 0) {
    try {
      await browser.setTimeout({ implicit: 0 });
      let windowYmid = 150;
      let windowYpos = (await browser.execute(() => window.scrollY)) + 10;
      let windowHeight = (await browser.execute(() => window.innerHeight)) - 10;
      let windowYmax = windowYpos + windowHeight;
      let elementPosition = await $(locator).getLocation('y');

      if (windowYpos <= elementPosition && elementPosition <= windowYmax && compulsary === 0) {
        console.log(`element is already visible : ${locator}`);
      } else {
        if (elementPosition < windowYpos - windowYmid) {
          await browser.execute((x) => window.scrollBy(0, -x), windowYpos - elementPosition + windowYmid);
        }
        if (elementPosition > windowYpos - windowYmid) {
          await browser.execute((x) => window.scrollBy(0, x), elementPosition - windowYpos - windowYmid);
        }
      }
      //await browser.setTimeout({ 'implicit': defaultImplicitWait });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Enters the specified text into an input field located by the given locator.
   *
   * @param {string} locator - The selector used to locate the input element.
   * @param {string} inputText - The text to be entered into the input field.
   * @returns {Promise<void>} - A promise that resolves when the text has been entered.
   */
  async enterText(locator: string, inputText: string) {
    try {
      inputText = inputText.toString();

      const inputElement = await $(locator);
      await inputElement.waitForDisplayed();
      await inputElement.scrollIntoView();
      await inputElement.click();
      await inputElement.clearValue();
      await inputElement.setValue(inputText);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Clicks on an element specified by the locator.
   *
   * @param {string} locator - The selector used to locate the element.
   * @returns {Promise<void>} A promise that resolves when the element is clicked.
   */
  async clickElement(locator: string) {
    try {
      const buttonElement = await $(locator);
      await buttonElement.waitForExist();
      await buttonElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      await buttonElement.click();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieves the text content of an element specified by the locator.
   *
   * @param {string} locator - The selector used to locate the element.
   * @returns {Promise<string>} A promise that resolves to the trimmed text content of the element.
   */
  async getText(locator: string): Promise<string> {
    try {
      const element = await $(locator);
      await element.waitForExist();
      await element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      const text = (await element.getText()).trim();
      return text;
    } catch (error) {
      console.log(error);
    }
  }
}
