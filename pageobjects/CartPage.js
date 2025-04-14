import { test, expect } from '@playwright/test';

export class CartPage {

constructor(page)
{
    this.page = page;
}

async validateProduct()
{
    await this.page.locator("div li").first().waitFor(); //waiting for cart page to load before checking isVisible, because it doesn't have an automatic wait
    const bool = this.page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
}

async navigateToCheckout()
{
    await this.page.locator("text=Checkout").click(); //go to checkout
}

}

//module.exports = {CartPage};