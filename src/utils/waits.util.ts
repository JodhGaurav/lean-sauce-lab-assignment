export default class Wait {
  static forElement(selector: string) {
    $(selector).waitForDisplayed();
  }
}
