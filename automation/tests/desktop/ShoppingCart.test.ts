import { test, expect } from "@playwright/test";
import DriverSteps from "../../driver/DriverSteps";
import { BrowsersEnum } from "../../enums/BrowsersEnum";
import UrlProvider from "../../providers/UrlProvider";
import { driver } from "../../driver/Driver";
import SearchSteps from "../../steps/SearchSteps";
import ProductSteps from "../../steps/ProductSteps";
import Button from "../../identifiers/Button";
import Text from "../../identifiers/Text";
import CartSteps from "../../steps/CartSteps";
import Input from "../../identifiers/Input";
import waitUntil from "../../utils/WaitUtil";

const textForSearch = "iPhone 14 Pro";

test.beforeEach(async () => {
    await DriverSteps.createNewBrowser(BrowsersEnum.Browser_1);
    await DriverSteps.goToUrl(UrlProvider.vodafoneStore());
})

test("Check that user can adds product to shopping cart @desktop", async () => {
    await SearchSteps.doSearch(textForSearch);
    await SearchSteps.openProductByName(textForSearch);

    await ProductSteps.addProductToCart();
    await driver.locator(Button.cartButton).click();

    await expect(driver.locator(Text.noProductInCartMessage), 'Cart must contain added product').not.toBeVisible();
})

test("Check that user can removes product from shopping cart @desktop", async () => {
    await SearchSteps.doSearch(textForSearch);
    await SearchSteps.openProductByName(textForSearch);

    await ProductSteps.addProductToCart();
    await driver.locator(Button.cartButton).click();
    await CartSteps.removeProductFromCart();

    await expect(driver.locator(Text.noProductInCartMessage), 'Cart must not contain product').toBeVisible();
})

test("Check that user can't makes an order with empty fields @desktop", async () => {
    await SearchSteps.doSearch(textForSearch);
    await SearchSteps.openProductByName(textForSearch);

    await ProductSteps.addProductToCart();
    await driver.locator(Button.cartButton).click();
    await driver.locator(Button.makeOrderButton).click();

    await expect(driver.locator(Input.emptyInputError), "Empty input message shouldn't be visible").not.toBeVisible();

    await driver.locator(Button.continueOrderButton).click();

    await expect(driver.locator(Input.emptyInputError).nth(0), 'Empty input message should be visible').toBeVisible();
})

test("Check that user can updates count of product @desktop", async () => {
    await SearchSteps.doSearch(textForSearch);
    await SearchSteps.openProductByName(textForSearch);

    await ProductSteps.addProductToCart();
    await driver.locator(Button.cartButton).click();

    const numberOfProductBefore = await CartSteps.getTotalProductCount();
    const totalPriceBefore = await CartSteps.getTotalPrice();

    await driver.locator(Button.increaseProduct).click();

    await waitUntil.waitForTimeout(3000, "Wait for update product count");

    // because attribute value not update
    await driver.Page.reload();

    const numberOfProductAfter = await CartSteps.getTotalProductCount();
    const totalPriceAfter = await CartSteps.getTotalPrice();

    expect(numberOfProductAfter, 'Number of product should increase').toBeGreaterThan(numberOfProductBefore);
    expect(totalPriceAfter, 'Total price should increase').toBeGreaterThan(totalPriceBefore);
})

test.afterEach(async () => {
    await driver.closeDrivers();
});