export default class Actions {
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

  async enterText(locator: string, inputText: string, timeout = 30) {
    try {
      inputText = inputText.toString();

      const inputElement = await $(locator);
      await inputElement.waitForExist({ timeout: timeout * 1000 });
      await inputElement.waitForDisplayed({ timeout: timeout * 1000 });
      await inputElement.scrollIntoView();
      await inputElement.click();
      await inputElement.clearValue();
      await inputElement.setValue(inputText);
    } catch (error) {
      console.log(error);
    }
  }

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
