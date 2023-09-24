import { driver } from "../driver/Driver";

export default class waitUntil {
    public static async waitForTimeout(timeout: number = 1500, reason?: string) {
        await driver.Page.waitForTimeout(timeout);
    }
}