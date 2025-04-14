import { LoginPage } from '../pageobjects/LoginPage'
import { DashboardPage } from '../pageobjects/DashboardPage';
import { CartPage } from '../pageobjects/CartPage.js';
import { CheckoutPage } from '../pageobjects/CheckoutPage.js';
import { OrdersPage } from '../pageobjects/OrdersPage.js';

export class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
}

getLogInPage()
{
    return this.loginPage;
}

getDashBoardPage()
{
    return this.dashboardPage;
}

getCartPage()
{
    return this.cartPage;
}

getCheckoutPage()
{
    return this.checkoutPage;
}

getOrdersPage()
{
    return this.ordersPage;
}

}