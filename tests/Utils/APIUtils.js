class APIUtils
{
    constructor(apiContext, loginPayLoad) //constructor to initialize the API context
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() //method to get token
    {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:this.loginPayLoad,
        });
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad) //method to create order
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayLoad,
            headers:
            {
                ['Authorization']: response.token,
            },
        })
        const orderResponseJSON = await orderResponse.json();
        console.log(orderResponseJSON);
        const orderID = orderResponseJSON.orders[0];
        response.orderID = orderID;
        console.log(orderID)
        return response;
    }

}

module.exports = {APIUtils};