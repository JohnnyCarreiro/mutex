import { browserPool } from "@/lib/BrowserPool";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

// type RenderRequest = {
//   url: string,
//   width: number,
//   height: number
// }

// /usr/lib64/chromium-browser/headless_shell
export async function POST(request: Request): Promise<NextResponse> {
  const { url, width, height, deviceScaleFactor } = await request.json();

  const page = await browserPool.requirePage();
  let screenshot: Uint8Array;

  try {
    page.setViewport({
      width,
      height,
      deviceScaleFactor,
    });

    await page.goto(url);
    await page.waitForNetworkIdle();

    screenshot = await page.screenshot({ encoding: "binary" });
  } finally {
    await browserPool.releasePage(page);
    // await browser.close();
  }
  // return NextResponse.json({ ok: true });
  return new NextResponse(screenshot, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  });
}
