import { test, expect } from '@playwright/test';

test('built-in locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Test1234");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});

test('redoing old test with builtin locators', async ({page})=>
    {
        const userName = page.getByPlaceholder("email@example.com");
        const passWord = page.getByPlaceholder("enter your passsword");
        const logIn = page.getByRole("button",{name:"Login"});
        const products = page.locator(".card-body");
        const productName = "ADIDAS ORIGINAL";
        const email = "lokryd@gmail.com";
        const pass = "Test1234";
    
    
        await page.goto("https://rahulshettyacademy.com/client");
     
        await userName.fill(email);
        await passWord.fill(pass);
        await logIn.click();
        await page.locator(".card-body b").first().waitFor(); // or wait for the first element to be loaded

        await page.locator(".card-body").filter({hasText: productName}).getByRole('button',{name:'Add To Cart'}).click();
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

test.only('handling calendars', async ({page})=>
    {
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber, date, year];
        
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

        await page.locator('.react-date-picker__inputGroup').click();
        await page.locator('.react-calendar__navigation__label__labelText--from').click();
        await page.locator('.react-calendar__navigation__label__labelText--from').click();
        await page.getByText(year).click();
        await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
        await page.locator('//abbr[text()="'+date+'"]').click();

        const fullDate = await page.locator('[type="date"]').inputValue();
        console.log(fullDate);
        expect(fullDate).toEqual(year+'-'+'0'+monthNumber+'-'+date);
        console.log(year+'-'+'0'+monthNumber+'-'+date);

    });