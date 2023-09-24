import { test, expect } from "@playwright/test";
import DriverSteps from "../../driver/DriverSteps";
import { BrowsersEnum } from "../../enums/BrowsersEnum";
import UrlProvider from "../../providers/UrlProvider";
import { driver } from "../../driver/Driver";
import SearchSteps from "../../steps/SearchSteps";
import Button from "../../identifiers/Button";
import Image from "../../identifiers/Image";
import ProductSteps from "../../steps/ProductSteps";
import waitUntil from "../../utils/WaitUtil";

const textForSearch = "iPhone 14 Pro";
const secondTextForSearch = "iPhone 13 Pro"

test.beforeEach(async () => {
    await DriverSteps.createNewBrowser(BrowsersEnum.Browser_1);
    await DriverSteps.goToUrl(UrlProvider.vodafoneStore());
})

test("Check that user can add products to compare list @desktop", async () => {
    await SearchSteps.doSearch(textForSearch);
    await SearchSteps.openProductByName(textForSearch);

    await ProductSteps.addProductToCompare();

    await SearchSteps.doSearch(secondTextForSearch);
    await SearchSteps.openProductByName(secondTextForSearch);
    await ProductSteps.addProductToCompare();

    await driver.locator(Button.compareButton).click();

    await waitUntil.waitForTimeout(3500, "Wait for open compare list");

    expect(await driver.locator(Image.productImage).all(), 'Two products should be present on compare list').toHaveLength(2);
})

test.afterEach(async () => {
    await driver.closeDrivers();
});