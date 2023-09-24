import { driver } from "../driver/Driver";
import Button from "../identifiers/Button";
import WaitUtil from "../utils/WaitUtil";

export default class ProductSteps {
    
    public static async addProductToCart(isContinueShopping: boolean = true) {
        await driver.getByTestId(Button.buyProducButton).nth(0).click();

        try {
            isContinueShopping ? await driver.locator(Button.continueShoppingButton).click() : await driver.getByTestId(Button.checkOutButton).click();
        } catch(e) {
            await driver.getByTestId(Button.buyProducButton).nth(0).click();

            isContinueShopping ? await driver.locator(Button.continueShoppingButton).click() : await driver.getByTestId(Button.checkOutButton).click();
        }
    }

    public static async addProductToCompare() {
        await driver.locator(Button.addToCompareButton).nth(0).click();

        await WaitUtil.waitForTimeout(3000, "Wait for update");
    }
}