import { Browser, BrowserContext, Locator, Page } from '@playwright/test';
import { BrowsersEnum } from '../../enums/BrowsersEnum';

export default class BaseDriver {
    private _driverContext: BrowserContext;
    private _page: Page;
    private _listOfPages: Page[] = [];
    private _driverName: BrowsersEnum;

    public browser: Browser;

    public static focusedDriver: BaseDriver;
    public static listOfDrivers: BaseDriver[] = [];

    public get DriverContext(): BrowserContext {
        return BaseDriver.focusedDriver._driverContext;
    }

    public set DriverContext(value: BrowserContext) {
        BaseDriver.focusedDriver._driverContext = value;
    }

    public get Page(): Page {
        return BaseDriver.focusedDriver._page;
    }

    public set Page(value: Page) {
        BaseDriver.focusedDriver._page = value;
    }

    public get ListOfPages(): Page[] {
        return BaseDriver.focusedDriver._listOfPages;
    }

    public set ListOfPages(value: Page[]) {
        BaseDriver.focusedDriver._listOfPages = value;
    }

    public get DriverName(): any {
        return this._driverName;
    }

    public set DriverName(value: BrowsersEnum) {
        this._driverName = value;
    }

    // All permissions https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions
    private _permissions: string[] = ['camera', 'microphone', 'clipboard-read', 'clipboard-write'];

    // All args https://peter.sh/experiments/chromium-command-line-switches/
    private _args: string[] = ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'];

    public get Permissions(): string[] {
        return BaseDriver.focusedDriver._permissions;
    }

    public set Permissions(permissions: string[]) {
        BaseDriver.focusedDriver._permissions = permissions;
    }

    public get Args(): string[] {
        return BaseDriver.focusedDriver._args;
    }

    public set Args(args: string[]) {
        BaseDriver.focusedDriver._args = args;
    }

    public async close() {
        await BaseDriver.focusedDriver.browser.close();
    }

    public locator(selector: string, baseElement?: Locator): Locator {
        if (baseElement) {
            return baseElement.locator(selector);
        } else {
            return BaseDriver.focusedDriver.Page.locator(selector);
        }
    }

    public getByTestId(testId: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByTestId(testId);
    }

    public getByAltText(altText: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByAltText(altText);
    }

    public getByLabel(label: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByLabel(label);
    }

    public getByRole(role: "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem", options?: {
        checked?: boolean;
        disabled?: boolean;
        exact?: boolean;
        expanded?: boolean;
        includeHidden?: boolean;
        level?: number;
        name?: string | RegExp;
        pressed?: boolean;
        selected?: boolean;
    }, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByRole(role, options);
    }

    public getByText(text: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByText(text);
    }

    public getByTitle(title: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByTitle(title);
    }

    public getByPlaceholder(placeholder: string | RegExp, parent?: Locator): Locator {
        return (parent ? parent : this.Page).getByPlaceholder(placeholder);
    }

    public async getPage<T>(type: { new (page: Page): T }) {
        return await new type(BaseDriver.focusedDriver.Page);
    }

    public async executeFunc(func: any, attepmts: number) {
        let message = '';
        for (let i = 0; i < attepmts; i++) {
            try {
                await func();
                return;
            } catch (e: any) {
                console.log(`${i + 1} attempt to execute ${func.name}`);
                message = e;
            }
        }
        if (!(message === '')) {
            throw new Error(message);
        }
    }
 }