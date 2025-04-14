export class DashboardPage {

constructor(page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.addToCart = page.locator("[routerlink*='cart']");
}

async searchForProduct(productName)
{
    const allTitles = await this.productsText.allTextContents();
    console.log(allTitles); //print all titles

    const count = await this.products.count();

    for(let i=0; i < count; ++i)
    {
        if( await this.products.nth(i).locator("b").textContent() === productName)
        {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
        }
    }
}

async navigateToCart()
{
    await this.addToCart.click();
}

}

//module.exports = {DashboardPage};