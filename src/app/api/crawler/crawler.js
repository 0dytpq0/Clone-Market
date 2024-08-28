const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

async function crawlKurly() {
  const chromedriverPath = process.env.CHROMEDRIVER_PATH;

  const options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--disable-gpu");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(new chrome.ServiceBuilder(chromedriverPath))
    .build();

  try {
    await driver.get("https://www.kurly.com/main");

    let lastHeight = await driver.executeScript(
      "return document.body.scrollHeight"
    );

    while (true) {
      // 페이지를 끝까지 스크롤
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );

      // 스크롤 후 로딩 대기
      await driver.sleep(2000);

      // 새로운 높이 확인
      let newHeight = await driver.executeScript(
        "return document.body.scrollHeight"
      );

      if (newHeight === lastHeight) {
        // 더 이상 스크롤할 수 없으면 루프 종료
        break;
      }

      lastHeight = newHeight;
    }

    const items = new Set();
    const links = await driver.findElements(By.css("a"));

    for (let link of links) {
      const images = [];
      const imageElements = await link.findElements(By.css("img"));
      for (let imageElement of imageElements) {
        const src = await imageElement.getAttribute("src");
        if (!src.startsWith("data:image/")) {
          images.push(src);
        }
      }

      if (images.length > 0) {
        const pTexts = [];
        const spanTexts = [];
        const h1Texts = [];
        const h2Texts = [];
        const h3Texts = [];

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

    // JSON 형식으로 결과 출력
    console.log(JSON.stringify({ main: Array.from(items) }));
  } finally {
    await driver.quit();
  }
}

crawlKurly().catch(console.error);
