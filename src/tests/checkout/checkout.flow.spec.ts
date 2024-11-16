import Login from '../../pages/global/login.po';
import Header from '../../pages/global/header.po';
import ProductListing from '../../pages/product/product.lisiting.po';
import Cart from '../../pages/checkout/cart.po';
import Checkout from '../../pages/checkout/checkout.info.po';
import CheckoutOverview from '../../pages/checkout/checkout.overview.po';
import checkoutOverviewPo from '../../pages/checkout/checkout.overview.po';

describe('Sauce Labs Checkout Flow', () => {
  it('Should able complete the checkout process with 3 items', async () => {
    await Login.open('/');

    await Login.login('standard_user', 'secret_sauce');
    await Login.validateNavigation();

    const selectedProducts = await ProductListing.selectRandomProducts(3);

    await Header.goToCart();
    await Header.validateNavigation();

    await Cart.validateCartContent(selectedProducts);
    await Cart.proceedToCheckout();
    await Cart.validateNavigation();

    await Checkout.fillCheckoutDetails();
    await Checkout.continueCheckout();
    await Checkout.validateNavigation();

    await CheckoutOverview.validateOrderDetails(selectedProducts);
    await CheckoutOverview.completeCheckout();
    await checkoutOverviewPo.validate();
  });
});
