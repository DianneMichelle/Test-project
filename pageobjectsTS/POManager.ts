import {Locator, Page } from '@playwright/test';
import { LoginPage } from '../pageobjectsTS/LoginPage.ts'
import { DashboardPage } from '../pageobjectsTS/DashboardPage.ts';
import { CartPage } from '../pageobjectsTS/CartPage.ts';
import { CheckoutPage } from '../pageobjectsTS/CheckoutPage.ts';
import { OrdersPage } from '../pageobjectsTS/OrdersPage.ts';

export class POManager
{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    ordersPage: OrdersPage;
    
constructor(page: Page)
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