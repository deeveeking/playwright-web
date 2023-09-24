export default class Text {
    // Autorization by ID

    // Autorization by xpath


    // Cart elements
    static totalPrice: string = "//tr[contains(@class,'grand totals')]//span";
    static noProductInCartMessage: string = "//div[contains(@class,'cart-empty')]";

    // Top search elements
    static resultText: string = "//div[contains(@class,'title-has-result')]";
    static productNames: string = "//a[contains(@class,'product-item-link')]";
    static noResultMessage: string = "//div[contains(@class,'waste')]";
    static productNameOnProductPage: string = "//div[contains(@class,'page-title')]//span";
}