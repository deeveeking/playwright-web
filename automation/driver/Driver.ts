import { chromium } from "@playwright/test";
import BaseDriver from "../driver/base/BaseDriver";
import { BrowsersEnum } from "../enums/BrowsersEnum";

class Driver extends BaseDriver {
    private headless: boolean = process.env.HEADLESS === "false" ? false : true;
    
    public async createBrowser(BrowsersEnum: BrowsersEnum, extensions: boolean, storageStateValue?: string) {
      BaseDriver.focusedDriver = new Driver();

      if (extensions) {
          BaseDriver.focusedDriver.browser = await chromium.launch({ headless: this.headless, args: BaseDriver.focusedDriver.Args });
          BaseDriver.focusedDriver.DriverContext = await BaseDriver.focusedDriver.browser.newContext({ permissions: BaseDriver.focusedDriver.Permissions, storageState: storageStateValue });
      } else {
          BaseDriver.focusedDriver.browser = await chromium.launch({ headless: this.headless });
          BaseDriver.focusedDriver.DriverContext = await BaseDriver.focusedDriver.browser.newContext({ permissions: [], storageState: storageStateValue });
      }

      BaseDriver.focusedDriver.DriverName = BrowsersEnum;
      BaseDriver.focusedDriver.Page = await BaseDriver.focusedDriver.DriverContext.newPage();
      BaseDriver.focusedDriver.ListOfPages.push(BaseDriver.focusedDriver.Page);
      BaseDriver.listOfDrivers.push(BaseDriver.focusedDriver);

      return this;
  }
  
  public async closeDrivers() {
    for (let driverToClose of BaseDriver.listOfDrivers) {
        BaseDriver.focusedDriver = driverToClose;

        try {
            await this.DriverContext.close();
        }
        catch (error) {
            console.error(`An error occurred while closing the browser context'${driverToClose}':`, error);
        }
        try {
            await this.close();
        } catch (error) {
            console.error(`An error occurred while closing browser'${driverToClose}':`, error);
        }
    }

    BaseDriver.listOfDrivers = [];
  }
}
const driver = new Driver();
export { driver };