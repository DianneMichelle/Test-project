import { test, expect } from '@playwright/test';
let webContext;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();   

    const userName = page.getByPlaceholder("email@example.com");
    const passWord = page.getByPlaceholder("enter your passsword");
    const logIn = page.getByRole("button",{name:"Login"});


    await page.goto("https://rahulshettyacademy.com/client");
    await userName.fill("lokryd@gmail.com");
    await passWord.fill("Test1234");
    await logIn.click();
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'}); //save the state of the browser context to a file

    webContext = await browser.newContext({storageState: 'state.json'}); //create a new context with the saved state

    
})


test('test 1', async ({})=>
    {
        const page = await webContext.newPage(); //create a new page in the context with the saved state
        const products = page.locator(".card-body");
        const productName = "ADIDAS ORIGINAL";
        const email = "lokryd@gmail.com";
        
        await page.goto("https://rahulshettyacademy.com/client");
    
        await products.filter({hasText: productName}).getByRole('button',{name:'Add To Cart'}).click();
        await page.getByRole("listitem").getByRole("button",{name: "Cart"}).click();
        
        await page.locator("div li").first().waitFor(); //waiting for cart page to load before checking isVisible, because it doesn't have an automatic wait
        await expect(page.getByText(productName)).toBeVisible();

        await page.getByRole("button",{name:"Checkout"}).click(); //go to checkout

   

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
        await page.getByPlaceholder('Select Country').pressSequentially("ind");
        await page.getByRole('button',{name:'India'}).nth(1).click();
        const shippingemail = await page.locator(".user__name [type='text']").first().textContent();
        expect(shippingemail).toEqual(email);

        await page.getByText('PLACE ORDER').click();

        await expect(page.getByText("Thankyou for the order")).toBeVisible();
        
        const orderNumberText = await(page.locator('.em-spacer-1 .ng-star-inserted')).textContent();
        console.log(orderNumberText);
        const orderNumber = orderNumberText.split(" | ")[1]; 
        console.log(orderNumber);

        //go to orders
        await page.getByRole('listitem').getByRole('button',{name: 'Orders'}).click();
        await page.locator('tbody').waitFor();
        await page.locator('tbody tr').filter({hasText: orderNumber}).getByRole('button',{name:'View'}).click();

        const OrderIDDetailsPage = await page.locator(".col-text").textContent();
        expect (orderNumber.includes(OrderIDDetailsPage)).toBeTruthy;
    });

    test('test 2', async ({})=>
        {
            const page = await webContext.newPage(); //create a new page in the context with the saved state
            const productTitles = page.locator(".card-body b");
        
        
            await page.goto("https://rahulshettyacademy.com/client");
            
            await productTitles.first().waitFor(); // or wait for the first element to be loaded
        
            //print all titles
            const allTitles = await productTitles.allTextContents();
            console.log(allTitles);
        });