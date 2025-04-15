import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager'; 


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

test.only('e2e test', async ({page})=>
    {
        const poManager = new POManager(page);

        const loginPage = poManager.getLogInPage();
        const dashboardPage = poManager.getDashBoardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();
        const ordersPage = poManager.getOrdersPage();


        const productName = "ADIDAS ORIGINAL";
        const email = "lokryd@gmail.com";
        const pass = "Test1234";
    
        await loginPage.goToLoginPage();
        await loginPage.validLogin(email,pass);
        await dashboardPage.searchForProduct(productName);
        await dashboardPage.navigateToCart();
        await cartPage.validateProduct();
        await cartPage.navigateToCheckout();
        await checkoutPage.fillShippingInfo(email);
        await checkoutPage.fillPersonalInfo();
        await checkoutPage.enterAndValidateCoupon();
        await checkoutPage.submitOrder();
        await checkoutPage.validateSuccessMessage();
        const orderNumber = await ordersPage.getOrderNumberFromSuccessMessage();
        await ordersPage.goToOrdersPage();
        await ordersPage.findOrderInList(orderNumber);
        await ordersPage.validateOrderDetails(orderNumber);


    });
