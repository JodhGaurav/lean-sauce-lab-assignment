import allureReporter from '@wdio/allure-reporter';

export class SoftAssertion {
  private errors: Error[];
  private passed: string[];
  constructor() {
    this.errors = [];
    this.passed = [];
  }

  expect1(condition: any) {
    try {
      expect(condition);
    } catch (error) {
      this.errors.push(error);
    }
    return this;
  }

  expect(condition: any): SoftAssertMatcher {
    return new SoftAssertMatcher(condition, this.errors, this.passed);
  }

  assertAll() {
    //const passedMessages = this.passed.join('\n');
    //this.passed = []
    //console.log(`Soft assert passed:\n${passedMessages}`);
    if (this.passed.length > 0) {
      console.log(`${this.passed.length} soft assertions passed out of ${this.passed.length} + ${this.errors.length}::`);
      for (const message of this.passed) {
        console.log(`${message}`);
        allureReporter.addStep(`${message}`);
      }
      this.passed = [];
    }
    if (this.errors.length > 0) {
      const messages = this.errors.map((error) => error.message).join('\n');
      //throw new AssertionError(message);
      this.errors = [];
      throw new Error(`Soft assert failed:\n${messages}`);
    }
  }
}

class SoftAssertMatcher {
  private flag = false;
  constructor(
    private condition: any,
    private errors: Error[],
    private passed: string[]
  ) {}

  toEqual(expected: any): SoftAssertMatcher {
    try {
      expect(this.condition).toEqual(expected);
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" (actual) is found to be equal to "${expected}"`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  toNotEqual(expected: any): SoftAssertMatcher {
    try {
      expect(this.condition).not.toEqual(expected);
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" (actual) is found to be not equal to "${expected}"`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  toBeLessThanOrEqual(expected: any): SoftAssertMatcher {
    try {
      expect(this.condition).toBeLessThanOrEqual(expected);
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" (actual) is found to be less than or equal to "${expected}"`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  toBeTruthy(): SoftAssertMatcher {
    try {
      expect(this.condition).toBeTruthy();
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" is found to be truthy`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  toContain(expected: any): SoftAssertMatcher {
    try {
      expect(this.condition).toContain(expected);
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" (actual) is found to contain "${expected}"`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  toMatch(expected: any): SoftAssertMatcher {
    try {
      expect(this.condition).toMatch(expected);
      this.flag = true;
      this.passed.push(`Validation passed: "${this.condition}" (actual) is found to match the pattern "${expected}"`);
    } catch (error) {
      this.flag = false;
      this.errors.push(error);
    }
    return this;
  }

  withMessage(message: string): SoftAssertMatcher {
    if (this.flag) {
      this.passed[this.passed.length - 1] = `${this.passed[this.passed.length - 1]} ::: ${message}`;
    } else {
      const error = this.errors.pop();
      error.message = `${message}\n${error.message}`;
      this.errors.push(error);
    }
    return this;
  }
}
