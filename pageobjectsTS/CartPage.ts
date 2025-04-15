import { test, expect, Locator, Page } from '@playwright/test';

export class CartPage {

page: Page;
cartProducts: Locator;
checkoutButton: Locator;

constructor(page: Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.checkoutButton = page.locator("text=Checkout");

}

async validateProduct(productName: string)
{
    await this.cartProducts.waitFor(); //waiting for cart page to load before checking isVisible, because it doesn't have an automatic wait
    const bool = this.page.locator("h3:has-text('{"+productName+"}')").isVisible();
    expect(bool).toBeTruthy();
}

async navigateToCheckout()
{
    await this.checkoutButton.click(); //go to checkout
}

}

//module.exports = {CartPage};