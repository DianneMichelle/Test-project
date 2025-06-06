import {Locator, Page } from '@playwright/test';

export class LoginPage {

    page: Page;
    userNameField: Locator;
    passWordField: Locator;
    logInButton: Locator;

constructor(page: Page)
{
    this.page = page;
    this.userNameField = page.locator("#userEmail");
    this.passWordField = page.locator("#userPassword");
    this.logInButton = page.locator('#login');
}

async goToLoginPage()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(email: string,pass: string)
{
    await this.userNameField.fill(email);
    await this.passWordField.fill(pass);
    await this.logInButton.click();
    await this.page.locator(".card-body b").first().waitFor(); // or wait for the first element to be loaded
}
}
