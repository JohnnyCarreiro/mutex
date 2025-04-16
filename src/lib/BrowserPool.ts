import type { Browser, Page } from "puppeteer-core";
import puppeteer from "puppeteer-core";

class BrowserPool {
  private browser: Browser | null = null;
  private releasedPages: Page[] = [];
  private requiredPages: Page[] = [];

  // FIXME: implement Queue for max page allocation
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor() {}

  private async getBroeser(): Promise<Browser> {
    if (this.browser) {
      return this.browser;
    }

    // FIXME: Put it onto a environment config file
    const chromiumPath =
      process.platform === "linux"
        ? "/usr/lib64/chromium-browser/headless_shell"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

    this.browser = await puppeteer.launch({
      executablePath: chromiumPath,
      headless: true,
      args: ["--no-sandbox"],
    });

    return this.browser;
  }

  public async requirePage(): Promise<Page> {
    if (this.releasedPages.length > 0) {
      const page = this.releasedPages.pop()!;
      this.requiredPages.push(page);
      return page;
    }
    const browser = await this.getBroeser();
    const page = await browser.newPage();
    this.requiredPages.push(page);
    return page;
  }

  public async releasePage(page: Page): Promise<void> {
    const requiredIndex = this.requiredPages.indexOf(page);
    if (requiredIndex === -1) {
      throw new Error("Unknown page requested to be released");
    }

    this.requiredPages.splice(requiredIndex, 1);
    await page.goto("about:blank");
    this.releasedPages.push(page);
  }
}

export const browserPool = new BrowserPool();
