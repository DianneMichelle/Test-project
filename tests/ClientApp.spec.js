import { test, expect } from '@playwright/test';

test('task 1', async ({page})=>
{
    const userName = page.locator("#userEmail");
    const passWord = page.locator("#userPassword");
    const logIn = page.locator('#login');
    const productTitles = page.locator(".card-body b");
    const email = "lokryd@gmail.com";
    const pass = "Test1234";


    await page.goto("https://rahulshettyacademy.com/client");
 
    await userName.fill(email);
    await passWord.fill(pass);
    await logIn.click();
    
    //await page.waitForLoadState('networkidle');  //wait for network idle state, when all API calls are made
    
    await productTitles.first().waitFor(); // or wait for the first element to be loaded

    //print all titles
    const allTitles = await productTitles.allTextContents();
    console.log(allTitles);
});

test('e2e test', async ({page})=>
    {
        const userName = page.locator("#userEmail");
        const passWord = page.locator("#userPassword");
        const logIn = page.locator('#login');
        const products = page.locator(".card-body");
        const productName = "ADIDAS ORIGINAL";
        const email = "lokryd@gmail.com";
        const pass = "Test1234";
    
    
        await page.goto("https://rahulshettyacademy.com/client");
     
        await userName.fill(email);
        await passWord.fill(pass);
        await logIn.click();
        await page.locator(".card-body b").first().waitFor(); // or wait for the first element to be loaded
        const allTitles = await page.locator(".card-body b").allTextContents();
        console.log(allTitles); //print all titles

        const count = await products.count();

        for(let i=0; i < count; ++i)
        {
            if( await products.nth(i).locator("b").textContent() === productName)
            {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor(); //waiting for cart page to load before checking isVisible, because it doesn't have an automatic wait
        const bool = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("text=Checkout").click(); //go to checkout

        await page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropDown = page.locator(".ta-results");
        await dropDown.waitFor();
        const optionsCount = await dropDown.locator("button").count();

        for(let i=0; i < optionsCount; ++i)
        {
            const text = await dropDown.locator("button").nth(i).textContent();
            if(text === " India")
                {
                    await dropDown.locator("button").nth(i).click();
                    break;
                }
        } // get INDIA
        

        //fill personal info
        await page.locator('input[type="text"]').nth(0).fill("4111 1111 1111 1111");
        await page.locator('select').nth(0).selectOption("11");
        await page.locator('select').nth(1).selectOption("29");
        await page.locator('input[type="text"]').nth(1).fill("373");
        await page.locator('input[type="text"]').nth(2).fill("Test Name");
        await page.locator('input[type="text"]').nth(3).fill("testcoupon");
        //await page.locator("getByRole('button', { name: 'Apply Coupon' })").click();
        await page.locator("//button[contains(text(),'Apply Coupon')]").click();
        console.log(await page.locator("[style='color: red;']").textContent());
        await expect(page.locator("[style='color: red;']")).toContainText('Invalid Coupon');
    
        //fill shipping info
        const shippingemail = await page.locator(".user__name [type='text']").first().textContent();
        expect(shippingemail).toEqual(email);
        await page.locator(".action__submit").click();

        await expect(page.locator('.hero-primary')).toContainText("Thankyou for the order");
        
        const orderNumber = await(page.locator('.em-spacer-1 .ng-star-inserted')).textContent();
        console.log(orderNumber);



        //go to orders
        await page.locator('button[routerlink*="myorders"]').click();
        await page.locator('tbody').waitFor();
        const rows = page.locator("tbody tr");

        for(let i=0; i < await rows.count(); ++i)
            {
                const OrderIDRowText = await rows.nth(i).locator("th").textContent();
                if(orderNumber.includes(OrderIDRowText))
                    {
                        await rows.nth(i).locator("button").first().click();
                        break;
                    }
            } 
            
        const OrderIDDetailsPage = await page.locator(".col-text").textContent();
        expect (orderNumber.includes(OrderIDDetailsPage)).toBeTruthy;



       // await page.pause();






    });
