import { test, expect } from '@playwright/test';

export class CheckoutPage {

    constructor(page)
    {
        this.page = page;
        this.countryField = page.locator("[placeholder*='Country']");
        this.countryDropDown = page.locator(".ta-results");

    }

    async fillShippingInfo(email)
    {
        await this.countryField.pressSequentially("ind");
                await this.countryDropDown.waitFor();
                const optionsCount = await this.countryDropDown.locator("button").count();
        
                for(let i=0; i < optionsCount; ++i)
                {
                    const text = await this.countryDropDown.locator("button").nth(i).textContent();
                    if(text === " India")
                        {
                            await this.countryDropDown.locator("button").nth(i).click();
                            break;
                        }
                } // get INDIA

        const shippingemail = await this.page.locator(".user__name [type='text']").first().textContent();
        expect(shippingemail).toEqual(email);
    }
    
    async fillPersonalInfo()
    {
        await this.page.locator('input[type="text"]').nth(0).fill("4111 1111 1111 1111");
        await this.page.locator('select').nth(0).selectOption("11");
        await this.page.locator('select').nth(1).selectOption("29");
        await this.page.locator('input[type="text"]').nth(1).fill("373");
        await this.page.locator('input[type="text"]').nth(2).fill("Test Name");
    }

    async enterAndValidateCoupon()
    {
        await this.page.locator('input[type="text"]').nth(3).fill("testcoupon");
        await this.page.locator("//button[contains(text(),'Apply Coupon')]").click();
        console.log(await this.page.locator("[style='color: red;']").textContent());
        await expect(this.page.locator("[style='color: red;']")).toContainText('Invalid Coupon');
    }

    async submitOrder()
    {
        await this.page.locator(".action__submit").click();
    }

    async validateSuccessMessage()
    {
        await expect(this.page.locator('.hero-primary')).toContainText("Thankyou for the order");
    }
           
    }
    
    //module.exports = {CheckoutPage};