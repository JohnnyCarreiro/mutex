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

  const chromiumPath =
    process.platform === "linux"
      ? "/usr/lib64/chromium-browser/headless_shell"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  // FIXME: Put it onto a environment config file
  // FIXME: Crete only one instance of browser and reuse it for entire live cicle
  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  page.setViewport({
    width,
    height,
    deviceScaleFactor,
  });

  await page.goto(url);
  await page.waitForNetworkIdle();

  const screenshot = await page.screenshot({ encoding: "binary" });
  await browser.close();

  // return NextResponse.json({ ok: true });
  return new NextResponse(screenshot, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  });
}
