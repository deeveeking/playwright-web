export default class Input {
    // Autorization by ID
    static searchInput: string = "search";


    // Autorization by xpath

    // Cart page elements
    static productNumberInput: string = "//input[contains(@class,'input-text qty')]";

    // Order page elements
    static emptyInputError: string = "//input[contains(@class,'mage-error')]";
}