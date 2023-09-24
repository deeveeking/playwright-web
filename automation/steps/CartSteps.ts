import { driver } from "../driver/Driver";
import Button from "../identifiers/Button";
import Input from "../identifiers/Input";
import Text from "../identifiers/Text";
import WaitUtil from "../utils/WaitUtil";

export default class CartSteps {
    
    public static async getTotalPrice() {
        
        await driver.locator(Text.totalPrice).waitFor({state: "visible"});

        const  priceText = await driver.locator(Text.totalPrice).textContent();
        const priceReplaced = priceText?.replace(/\s/g, '');
        const priceToParse = priceReplaced?.match(/(\d+)/)?.[0];

        return parseInt(priceToParse === undefined ? "0" : priceToParse);
    }

    public static async removeProductFromCart() {
        try {
            await WaitUtil.waitForTimeout(5000, "Wait because site so slowly");

            await driver.locator(Button.deleteProductFromCartButton).click();
        } catch (e) {
            WaitUtil.waitForTimeout(5000, "Wait because site so slowly");

            await driver.locator(Button.deleteProductFromCartButton).click();
        }
    }

    public static async getTotalProductCount() {
        await driver.locator(Input.productNumberInput).waitFor({state: "visible"});

        const productNumber = await driver.locator(Input.productNumberInput).getAttribute("value");
        
        return parseInt(productNumber == null ? "0" : productNumber);
    }
}