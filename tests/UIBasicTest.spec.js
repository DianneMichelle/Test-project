import { test, expect } from '@playwright/test';

test('Browser Context PlayWright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");
});

test('First PlayWright Test', async ({page})=>
{
    const userName = page.locator("[placeholder='E-Mail-Adresse']");
    const passWord = page.locator("[placeholder='Passwort']");
    const logIn = page.locator('#flyMenuFakeButton');
    const messageTitles = await page.locator(".messageTitle");


    await page.goto("https://www.meinfoto.de/");
    await page.locator('//span[contains(text(),"Alle akzeptieren")]').click();
    await page.locator('#headIcon').click();

    //bad login
    await userName.fill("diana.bors@picanova.com");
    await passWord.fill("Test903");
    await logIn.click();
    //validate error message
    console.log(await page.locator("[class*='-loginError']").textContent());
    await expect(page.locator("[class*='-loginError']")).toContainText('Login nicht');
    //good login
    await userName.fill("diana.bors@picanova.com");
    await passWord.fill("Test9033");
    await logIn.click();
    //go to acct details
    await page.locator("[href='/accountoverview.jsf']").click();
    // print 1st and 2nd title
    console.log(await messageTitles.first().textContent());
    console.log(await messageTitles.nth(1).textContent());
    //print all titles
    const allTitles = await messageTitles.allTextContents();
    console.log(allTitles);
});

test('task 2', async ({page})=>
    {
        const userName = page.locator("#username");
        const passWord = page.locator("#password");
        const dropDown = page.locator("select.form-control");
        const docLink = page.locator("[href*=documents-request]")
        const SignIn = page.locator('#signInBtn');
        const email = "lokryd@gmail.com";
        const pass = "Test1234";
    
    
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     
        await userName.fill(email);
        await passWord.fill(pass);
        await dropDown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        //assertion, wait for the radiobutton is checked
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        //assertion, wait for the checkbox is checked
        await page.locator("#terms").click();
        await expect (page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
    
        expect (await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(docLink).toHaveAttribute("class","blinkingText");
    });
    
    test('task 3', async ({browser})=>
        {
            
            const context = await browser.newContext();
            const page = await context.newPage();
            const userName = page.locator("#username");
            const passWord = page.locator("#password");
            const docLink = page.locator("[href*=documents-request]")
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            
            const [newPage] = await Promise.all(  //makes sure both steps inside array are fulfilled, and assign variable to new page "newPage"
            [ 
                context.waitForEvent('page'), //wait for new page to open in bg
                docLink.click(),
            ])
    
            const text = await newPage.locator(".red").textContent(); //gets red text from the newPage
            //console.log(text);
            const arrayText= text.split("@") //splints text into 2, before and after "@"
            //console.log(arrayText);
            const domain = arrayText[1].split(" ")[0] //from the second string, splits at the first space and saves the first string
            //console.log(domain);
    
            await userName.fill(domain);
        });