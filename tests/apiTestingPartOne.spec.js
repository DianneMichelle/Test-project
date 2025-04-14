const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils.js'); // Import APIUtils class
const loginPayLoad = {userEmail: "lokryd@gmail.com", userPassword: "Test1234"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
let response;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad); // Create an instance of APIUtils
    response = await apiUtils.createOrder(orderPayLoad); // Call createOrder method to create an order

});

test('Place order', async ({page}) =>
    {
        
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token); // Set token in local storage

        await page.goto("https://rahulshettyacademy.com/client");

        //go to orders
        await page.getByRole('listitem').getByRole('button',{name: 'ORDERS'}).click();
        await page.locator('tbody tr').first().waitFor();
        const rows = page.locator('tbody tr');

        for (let i = 0; i < await rows.count(); i++) 
        {
            const rowOrderID = await rows.nth(i).locator('th').textContent();
            if (response.orderID.includes(rowOrderID)) 
            {
                await rows.nth(i).locator('button').first().click();
                break;
            }
        }

        // await page.locator('tbody tr').filter({hasText: orderID}).getByRole('button',{name:'View'}).click();

        const OrderIDDetailsPage = await page.locator(".col-text").textContent();
        expect (response.orderID.includes(OrderIDDetailsPage)).toBeTruthy;
    });

    test('Check message for no orders', async ({page}) =>
        {
            
            page.addInitScript(value => {
                window.localStorage.setItem('token', value);
            }, response.token); // Set token in local storage
    
            await page.goto("https://rahulshettyacademy.com/client");

            page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
            async route=>
            {
                //intercepting the response 
                const response = await page.request.fetch(route.request());
                let body = JSON.stringify(fakePayLoadOrders);
                route.fulfill(
                    {
                        response,
                        body,
                    }
                )

            }
        )
       
    
            //go to orders
            await page.getByRole('listitem').getByRole('button',{name: 'ORDERS'}).click();
            await page.getByText("Go Back to Cart").waitFor();
            //await page.pause();
            const noOrdersText = await page.locator('.mt-4').textContent();
            console.log(noOrdersText);
            expect(noOrdersText).toContain("You have No Orders");
        });