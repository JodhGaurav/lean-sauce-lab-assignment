import Login from '../../pages/global/login.po';
import Cart from '../../pages/checkout/cart.po';
import Header from '../../pages/global/header.po';
import Checkout from '../../pages/checkout/checkout.info.po';
import { CREDENTIALS as CREDS } from '../../constants/login.const';
import ProductListing from '../../pages/product/product.lisiting.po';
import CheckoutOverview from '../../pages/checkout/checkout.overview.po';
import checkoutOverviewPo from '../../pages/checkout/checkout.overview.po';

describe('Sauce Labs Checkout Flow', () => {
  beforeAll(async () => {
    await Login.open('/'); // Open the login page
    await Login.login(CREDS.standardUser.username, CREDS.standardUser.password); // Log in with standard user credentials
    await Login.validateNavigation(); // Validate successful navigation to the product listing page
  });

  it('Should able complete the checkout process with 3 random items', async () => {
    // Select 3 random products from the product listing page
    const selectedProducts = await ProductListing.selectRandomProducts(3);

    // Navigate to the cart page via cart icon and validating successful navigation
    await Header.goToCart();
    await Header.validateNavigation();

    // Validate that the selected products are present in the cart
    await Cart.validateCartContent(selectedProducts);
    // Proceed to the checkout information page and validating successful navigation
    await Cart.proceedToCheckout();
    await Cart.validateNavigation();

    // Fill out checkout details (e.g., name, address)
    await Checkout.fillCheckoutDetails();
    // Continue to the checkout overview page and validating successful navigation
    await Checkout.continueCheckout();
    await Checkout.validateNavigation();

    // Validate order details like product name, number of article and order subtotal
    await CheckoutOverview.validateOrderDetails(selectedProducts);
    // Complete the checkout process and validating successful navigation
    await CheckoutOverview.completeCheckout();
    await checkoutOverviewPo.validate();
  });

  afterEach(async () => {
    // Navigate back to the product listing page for the next test
    await Header.navigateBackToProductListing();
  });
});
