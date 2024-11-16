# WebDriverIO Automation Framework with Jasmine and TypeScript

This project is an automation testing framework built using **WebDriverIO**, **Jasmine**, and **TypeScript**. The framework is designed to test the **Sauce Labs demo application**, specifically covering the user checkout flow by selecting random products and validating the cart.

---
## Actual Task / Objective
```plaintext
You are tasked with developing an automated test suite for Sauce labs demo
website. Your automation test suite should cover the customer flow of selecting 3
random items and completing the checkout flow.
```


---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [How to Run the Tests](#how-to-run-the-tests)
- [Framework Design](#framework-design)
- [Reporting](#reporting)
- [Levels of Validations](#levels-of-validations)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

---

## Features

- **Random Product Selection**: Dynamically selects 3 random products from the product list.
- **Assertions**: Validates page navigation, cart content, and checkout completion, and price matching, with support for both hard and soft assertions.
- **TypeScript Integration**: Ensures type safety and modern JavaScript features.
- **Allure Reporting**: Generates detailed test execution with logs, steps, and screenshots for failures.
- **Scalable Design**: Built with a modular Page Object Model (POM) for easy maintenance and scalability.
- **Debug & Logging**: Provides detailed error logs for debugging using centralized logging
- **Reusable Utilities**: Includes custom wait methods and centralized logging for consistent operations.
- **Soft Assertion Utility**: Allows validation of multiple conditions in a test without stopping execution.
- **Comprehensive Test Coverage**: Covers login, product selection, cart validation, and checkout flows.
- **Browser Compatibility**: Configurable to run tests on different browsers for cross-browser compatibility.
- **Cross-Environment Execution**: Supports running tests lon various envs.


---

## Project Structure

```plaintext
root/
├── logs/                                   # Directory to store test execution logs (e.g., info, errors)
│
├── reports/                                # Directory to store test execution reports (e.g., Allure results)
│
├── src/
│   ├── config/                             # Directory to store Configuration files (e.g., WebDriverIO setup)
│   │   └── wdio.conf.ts                    # WebDriverIO configuration file
│   │
│   ├── pages/                              # Directory to store Page Object Model (POM) classes
│   │   ├── base.po.ts                      # Base class with common methods for all pages (e.g., navigation, waits)
│   │   │
│   │   ├── global/                         # Directory to store Page Object classes for common functionality (e.g., header.po.ts, footer.po.ts, login.po.ts)
│   │   │   ├── header.po.ts                # Page-specific class for the gloval header section (e.g., top level navigation)
│   │   │   └── login.po.ts                 # Page-specific class for the login page
│   │   │
│   │   ├── product/                        # Directory to store Page Object classes related to the Product functionality (e.g., product.listing.po.ts)
│   │   │   ├── product.detail.po.ts        # Page-specific class for the product details page (future scope)
│   │   │   └── product.listing.po.ts       # Page-specific class for the product listing/inventory page (e.g., product selection)
│   │   │
│   │   └── checkout/                       # Directory to store Page Object classes related to the checkout functionality (e.g., cart.po.ts, checkout.info.po.ts)
│   │       ├── cart.po.ts                  # Page-specific class for the cart page (e.g., cart validation)
│   │       ├── checkout.info.po.ts         # Page-specific class for the checkout Information page (e.g., fill-up customer details)
│   │       └── checkout.overview.po.ts     # Page-specific class for the checkout overview page (e.g., checkout flow)
│   │
│   ├── test-data/                          # Test data for parameterized tests (future scope)
│   │   └── sampleData.json                 # Sample test data for parameterized execution
│   │
│   ├── tests/                              # Test cases (as per functionality/flow create directories under it)
│   │   └── checkout/
│   │       └── checkout.flow.spec.ts       # Tests for the checkout flow
│   │
│   └── utils/                              # Utility classes and helper methods
│       ├── actions.util.ts                 # Contains reusable actions like clicking, typing, and scrolling
│       ├── logger.util.ts                  # Centralized logging with Allure integration for reporting
│       ├── soft.assertion.util.ts          # Utility for implementing soft assertions to log multiple failures without halting tests
│       └── waits.util.ts                   # Custom utility methods for dynamic waits on elements
│  
├── package.json                            # NPM configuration file containing project dependencies and scripts
├── tsconfig.json                           # TypeScript configuration file
└── .prettierrc                             # Prettier configuration file for code formatting rules
```

## Setup and Installation

1. #### Clone the Repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. #### Install Dependencies: Make sure Node.js is installed, then run:

    ```sh
    npm install
    ```
3. #### Install WebDriverIO CLI: If not already installed globally:

    ```sh
    npx wdio config
    ```
4. #### Setup Environment: Ensure your WebDriverIO configuration (wdio.conf.ts) points to the Sauce Labs demo application.

## How to Run the Tests

1. #### Run Tests: Execute all tests:
    ```sh
    npx wdio run src/config/wdio.conf.ts  #by default will run on chrome browser
    ```
    > recommended to use below mention custom scripts for executes test or achieve other objectives.
2. #### Custom Commands / Scripts:
    The following scripts are available in the `package.json` file:

    - **Run Tests on Local**: Runs tests using the local configuration.
        ```sh
        npm run wdio_local
        ```
    - **Run Tests on Local env and Safari**: Runs tests Safari browser using the local configuration.
        ```sh
        npm run wdio_local_safari
        ```

    - **Run Tests on Production**: Runs tests using the production configuration.
        ```sh
        npm run wdio_prod
        ```

    - **Generate Report**: Generates and opens an Allure report.
        ```sh
        npm run report
        ```

    - **Smoke Tests**: Runs smoke tests (future scope).
        ```sh
        npm run smoke
        ```
    - **Prettier Format**: Formats all TypeScript files using Prettier.
        ```sh
        npm run prettier-format
        ```
    - **Cleanup**: Runs the Prettier format script.
        ```sh
        npm run cleanup
        ```

## Framework Design
- **Page Object Model (POM):** Each page is encapsulated in its own class, containing specific methods and locators for that page.
- **Assertions:**
    - Page navigation assertions (e.g., URL, page title, layout title).
    - Cart validations (e.g., product count, names and order subtotal).
- **Reusable Utilities:**
    - **Actions:** Utility for common browser interactions like clicking, typing, and scrolling, ensuring reliable actions across different browsers.
    - **Soft Assertions:** Allows multiple conditions to be validated without stopping the test execution on the first failure, logging all assertion failures for better debugging. Its a custom solution.
    - **Logger:** Centralized logging with Allure step reporting, providing detailed logs for every test step.
    - **Wait:** Custom wait methods for dynamic elements and application-specific conditions.


## Reporting
The framework uses **Allure Reporting** to provide detailed insights into test execution:

- **Step-Level Logs:** Every step of the test is logged and visible in the Allure report.
- **Screenshots on Failure:** Automatically captures screenshots for failed tests or steps.
- **Interactive Reports:** Reports include execution time, passed/failed steps, and attached screenshots for debugging.

#### Steps to Generate Allure Report:

1.  Generate the Allure report:
    ```sh
    allure generate ./reports/allure-results --clean -o ./reports/allure-report
    allure open ./reports/allure-report
    ```
    OR
2.  Use custom command to generate and open allure report:
    ```sh
    npm run report
    ```

## Levels of Validations

1. #### Page Load Validation:
    -   Ensures the page is fully loaded before performing any actions using document.readyState.
    -   Prevents flakiness by verifying page readiness and resource availability.
2. #### Functional Validation:
    -   Verifies that the correct number of products are added to the cart.
    -   Validates product details, including names and prices, against the cart contents.
    -   Ensures the subtotal displayed during checkout matches the sum of selected product prices.
3. #### Page-Level Navigation Validation
    Confirms that the correct page is loaded after each navigation step by validating:
    -   **Page URL:** Matches the expected URL.
    -   **Page Title:** Matches the expected title.
    -   **Layout Title:** Key elements are present and visually confirm the intended page.

## Future Enhancements
- Refactor this into a parameterized test so that a single test can run with different sets of test data. All test data should be stored within the **test-data** package.
- Add negative test cases for:
    - Login functionality.
    - Cart and checkout flows.
- Integrate with CI/CD tools such as:
    - Jenkins
    - CircleCI
    - GitHub Actions
- Extend reporting features to include custom metrics and analytics.


## Contributors
- GauravJodh

## License
This project is licensed under the MIT License.