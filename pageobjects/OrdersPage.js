import { test, expect } from '@playwright/test';

export class OrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.ordersPageButton = page.locator('button[routerlink*="myorders"]');
        this.ordersPageBody = page.locator('tbody');
        this.ordersPageRows = page.locator("tbody tr");


    }

async getOrderNumberFromSuccessMessage()
{
    this.orderNumber = await(this.page.locator('.em-spacer-1 .ng-star-inserted')).textContent();
    console.log(this.orderNumber);
    return this.orderNumber;
}

async goToOrdersPage()
{
    await this.ordersPageButton.click();
    await this.ordersPageBody.waitFor();
}

async findOrderInList()
{
    const rows = this.ordersPageRows;

        for(let i=0; i < await rows.count(); ++i)
            {
                const OrderIDRowText = await rows.nth(i).locator("th").textContent();
                if(this.orderNumber.includes(OrderIDRowText))
                    {
                        await rows.nth(i).locator("button").first().click();
                        break;
                    }
            } 
}

async validateOrderDetails()
{
    const OrderIDDetailsPage = await this.page.locator(".col-text").textContent();
    expect (this.orderNumber.includes(OrderIDDetailsPage)).toBeTruthy;
}

}