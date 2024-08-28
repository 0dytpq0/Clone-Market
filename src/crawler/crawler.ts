import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

// Define types for the data you are collecting
interface CrawledItem {
  images: string[];
  pTexts: string[];
  spanTexts: string[];
  h1Texts: string[];
  h2Texts: string[];
  h3Texts: string[];
}

async function crawlKurly(): Promise<void> {
  const chromedriverPath = process.env.CHROMEDRIVER_PATH;

  const options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(new chrome.ServiceBuilder(chromedriverPath!))
    .build();

  try {
    await driver.get("https://www.kurly.com/main");

    let lastHeight = await driver.executeScript(
      "return document.body.scrollHeight"
    );

    while (true) {
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );

      await driver.sleep(2000);

      let newHeight = await driver.executeScript(
        "return document.body.scrollHeight"
      );

      if (newHeight === lastHeight) {
        break;
      }

      lastHeight = newHeight;
    }

    const items = new Set<CrawledItem>();
    const links = await driver.findElements(By.css("a"));

    for (let link of links) {
      const images: string[] = [];
      const imageElements = await link.findElements(By.css("img"));
      for (let imageElement of imageElements) {
        const src = await imageElement.getAttribute("src");
        if (src && !src.startsWith("data:image/")) {
          images.push(src);
        }
      }

      if (images.length > 0) {
        const pTexts: string[] = [];
        const spanTexts: string[] = [];
        const h1Texts: string[] = [];
        const h2Texts: string[] = [];
        const h3Texts: string[] = [];

        const pTags = await link.findElements(By.css("p"));
        for (let pTag of pTags) {
          const pText = await pTag.getText();
          pTexts.push(pText.trim());
        }

        const spanTags = await link.findElements(By.css("span"));
        for (let spanTag of spanTags) {
          const spanText = await spanTag.getText();
          spanTexts.push(spanText.trim());
        }

        const h1Tags = await link.findElements(By.css("h1"));
        for (let h1Tag of h1Tags) {
          const h1Text = await h1Tag.getText();
          h1Texts.push(h1Text.trim());
        }

        const h2Tags = await link.findElements(By.css("h2"));
        for (let h2Tag of h2Tags) {
          const h2Text = await h2Tag.getText();
          h2Texts.push(h2Text.trim());
        }

        const h3Tags = await link.findElements(By.css("h3"));
        for (let h3Tag of h3Tags) {
          const h3Text = await h3Tag.getText();
          h3Texts.push(h3Text.trim());
        }

        items.add({
          images,
          pTexts,
          spanTexts,
          h1Texts,
          h2Texts,
          h3Texts,
        });
      }
    }

    console.log(JSON.stringify({ main: Array.from(items) }));
  } finally {
    await driver.quit();
  }
}

crawlKurly().catch(console.error);
