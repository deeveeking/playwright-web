import { Page, expect } from "@playwright/test";
import { BrowsersEnum } from "../enums/BrowsersEnum";
import { driver } from "./Driver";
import BaseDriver from "./base/BaseDriver";

export default class DriverSteps {

    public static async createNewBrowser(BrowsersEnum: any, extensions: boolean = true, storageStateValue?: string) {
        await driver.createBrowser(BrowsersEnum, extensions, storageStateValue);
    }

    public static async createNewPage() {
        let newPage = await driver.DriverContext.newPage();
        driver.Page = newPage;
        driver.ListOfPages.push(newPage);
    }

    public static async switchToBrowser(browserName: BrowsersEnum) {
        BaseDriver.focusedDriver = BaseDriver.listOfDrivers.find((x) => x.DriverName === browserName)!;
    }

    public static async switchToBrowserTab(tabNumber: number) {
        driver.Page = driver.ListOfPages[tabNumber];
    }

    public static async closeBrowser() {
        await driver.DriverContext.close();
    }

    public static async closeBrowserTab() {
        await driver.Page.close();
    }

    public static async goToUrl(url: string) {
        await driver.executeFunc(async () => {
            await driver.Page.goto(url);
        }, 5);
    }

    public static async waitForUrl(url: string | RegExp, timeout?: number) {
        await driver.Page.waitForURL(url, { timeout, waitUntil: 'networkidle' });
    }

    public static async reloadsPage() {
        await driver.Page.reload();
    }

    public static async goBackToThePage() {
        await driver.Page.goBack();
    }

    public static async closesTab() {
        await driver.Page.close();
    }

    public static async activateMouseMove() {
        await driver.Page.mouse.move(1, 1);
    }

    public static async comparesClipboardText(expected: string) {
        let clipboardText = await driver.Page.evaluate(() => navigator.clipboard.readText());

        expect(clipboardText).toEqual(expected);
    }

    public static async performActionAndWaitForResponse(
        actionPromise: Promise<any>,
        responseUrlPattern: string,
        responseTimeoutMillis = 20000,
        ) {
        try {
          return await Promise.all([
            driver.Page.waitForResponse(response => response.url().includes(responseUrlPattern), {
              timeout: responseTimeoutMillis,
            }),
            actionPromise,
          ]);
        } catch (error) {
          return undefined;
        }
    }

    public static async waitForResponseWithPageRefresh(
        responseUrlPattern: string,
        responseTimeoutMillis: number,
        retries: number,
      ) : Promise<any> {
        try {
          return await Promise.all([
            driver.Page.waitForResponse(
              response =>
                response.url().includes(responseUrlPattern) && (response.status() === 200 || response.status() === 304),
              {
                timeout: responseTimeoutMillis,
              },
            ),
            DriverSteps.reloadsPage(),
          ]);
        } catch (error) {
          if (retries > 0) {
            return await this.waitForResponseWithPageRefresh(responseUrlPattern, responseTimeoutMillis, retries - 1);
          } else {
            throw error;
          }
        }
    }

    public static async performActionExpectingNewTab(actionPromise: Promise<any>): Promise<Page> {
        const pagePromise = driver.DriverContext.waitForEvent('page', { timeout: 20000 });
    
        const [newPage] = await Promise.all([actionPromise, driver.ListOfPages.push(await pagePromise)]);
    
        await DriverSteps.switchToBrowserTab(driver.ListOfPages.length - 1);
    
        return newPage;
    }
}