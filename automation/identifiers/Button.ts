export default class Button {
    // Autorization by ID

    // Cart pop-up elements
    static checkOutButton: string = "top-cart-btn-checkout";

    // Product page elements
    static buyProducButton: string = "product-addtocart-button";




    // Autorization by xpath

    // Product page elements
    static addToCompareButton: string = "//a[contains(@class,'tocompare')]";

    // Header page elements
    static cartButton: string = "//a[contains(@class,'showcart')]";
    static compareButton: string = "//li[contains(@class,'link compare')]";

    // Cart pop-up elements
    static continueShoppingButton: string = "//button[contains(@class,'close-popup-cart')]";
    static deleteProductFromCartButton: string = "//a[contains(@class,'delete')]";

    // Cart page elements
    static makeOrderButton: string = "//button[contains(@class,'checkout ripple')]";
    static increaseProduct: string = "//span[contains(@class,'decriment')]";

    // Order page elements
    static continueOrderButton: string = "//div[@class='license']/following-sibling::div/button";

    // Top search elements
    static searchButton : string = "//button[contains(@class,'action search')]";
    static moreProductButton: string = "//div[contains(@class,'more-results')]";
}