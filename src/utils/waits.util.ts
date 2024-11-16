export default class Wait {
  /**
   * Waits for an element to be visible on the page.
   *
   * @param selector - The selector of the element to wait for.
   */
  async waitForElementVisible(selector: string) {
    await $(selector).waitForDisplayed();
  }

  /**
   * Wait for the page to be completely loaded.
   * This checks the browser's document.readyState and waits until it's "complete".
   */
  async waitForPageToLoad(timeout: number = 10000) {
    await browser.waitUntil(
      async () => {
        const readyState = await browser.execute(() => document.readyState);
        return readyState === 'complete';
      },
      {
        timeout,
        timeoutMsg: `Page did not load completely within ${timeout} ms.`
      }
    );
    console.log('Page loaded completely.');
  }
}
