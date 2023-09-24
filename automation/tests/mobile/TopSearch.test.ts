import { test, expect } from "@playwright/test";
import DriverSteps from "../../driver/DriverSteps";
import { BrowsersEnum } from "../../enums/BrowsersEnum";
import UrlProvider from "../../providers/UrlProvider";
import { driver } from "../../driver/Driver";
import SearchSteps from "../../steps/SearchSteps";
import Text from "../../identifiers/Text";
import Input from "../../identifiers/Input";
import Modal from "../../identifiers/Modal";
import Button from "../../identifiers/Button";

const textForSearch = "iPhone 14 Pro";

test.beforeEach(async () => {
    await DriverSteps.createNewBrowser(BrowsersEnum.Browser_1);
    await DriverSteps.goToUrl(UrlProvider.vodafoneStore());
})

test("Check that top search work @mobile", async () => {
    await SearchSteps.doSearch(textForSearch);

    await expect(driver.locator(Text.resultText), 'Result text should contain searched text').toContainText(textForSearch);
    await expect(driver.locator(Text.productNames).nth(0), 'Correct product should be found').toContainText(textForSearch);
})

test("Check incorret search @mobile", async () => {
    const incorretTextForSearch = "12345125125";
    const expectedMessage = "Ваш пошук не дав результатів";

    await driver.getByTestId(Input.searchInput).fill(incorretTextForSearch);

    await expect(driver.locator(Text.noResultMessage), 'Correct message should be displayed').toContainText(expectedMessage);
})

test("Check that user can open product card from search list @mobile", async () => {
    await driver.getByTestId(Input.searchInput).fill(textForSearch);

    const searchModal = driver.getByTestId(Modal.searchModal);

    await driver.locator(Text.productNames, searchModal).nth(0).click();

    await expect(driver.getByTestId(Button.buyProducButton).nth(0), 'Product page should be opened').toBeVisible();
    await expect(driver.locator(Text.productNameOnProductPage), 'Correct product should be opened').toContainText(textForSearch);
})

test.afterEach(async () => {
    await driver.closeDrivers();
});