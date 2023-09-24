import { driver } from "../driver/Driver";
import Input from "../identifiers/Input";
import Text from "../identifiers/Text";

export default class SearchSteps {

    public static async doSearch(textForSearch: string) {
        await driver.getByTestId(Input.searchInput).fill(textForSearch);
        await driver.Page.keyboard.press("Enter");

        await driver.locator(Text.resultText).waitFor({state: 'visible'});
    }

    public static async openProductByName(productName: string) {
       (await driver.locator(Text.productNames).all()).find(async pr => await pr.textContent() === productName)?.click();
    }
}