import { test, expect } from '@playwright/test';

test('hidden elements', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('alert pop-ups & hover', async ({page})=>
    {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        await page.locator('#alertbtn').click();
        page.on('dialog', dialog => dialog.accept());    

        await page.locator('#mousehover').hover();
    });

test('iFrame', async ({page})=>
    {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        const framePage = page.frameLocator('#courses-iframe');
        await framePage.locator('li a[href="lifetime-access"]:visible').click();
        const nrSubscribers = await framePage.locator('.text h2 span').textContent();
        console.log(nrSubscribers); 
    });