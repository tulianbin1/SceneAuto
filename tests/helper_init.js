const helper = require('./helper');
const { chromium } = require("playwright");
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch')
const path = require('path');
const { expect } = require("chai");
const { theClass,openNewPage, saveButton, saveButton1 } = require('./utils');
const { PUBLIC_FORM} = require('./const');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
/*
const loginDemo = async () => {

  //await helper.page.click(`.sign-in-right-container .bi-v .bi-h-o:nth-child(1) .bi-text:text("密码登录")`);
  //await helper.page.fill('.sign-in-right-container .bi-v .bi-tab .bi-h-o:nth-child(2) .sign-form .bi-border-bottom:nth-child(2) input', '18852703041');
  await helper.page.locator("[placeholder='请输入用户名']").fill('1');
  await helper.page.locator("[placeholder='请输入密码']").fill('1');
  await helper.page.locator("[data-testid=FR_AUTO_TEST_LOGIN]").click();
  //await helper.page.fill('.sign-in-right-container .bi-v .bi-tab .bi-h-o:nth-child(2) .sign-form .bi-border-bottom:nth-child(4) input', 'Qfx123');
  //await helper.page.click(`.sign-in-right-container .bi-v .bi-tab .bi-h-o:nth-child(2) .bi-basic-button:text("登录")`);
  await new Promise(res => setTimeout(res, 4000));
};
*/

beforeSuite(async () => {
  helper.browser = await chromium.launch({ headless});
})

beforeScenario(async () => {
  //helper.page = await helper.browser.newPage({viewport:{width: 390, height: 844,},userAgent:'Mozilla/5.0 (Linux; U; Android 7.0; zh-CN; gm1910 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.9.4.974 UWS/2.13.2.46 Mobile Safari/537.36 AliApp(DingTalk/4.6.29) com.alibaba.android.rimet/11388461 Channel/10002068 language/zh-CN'});
  //await helper.page.goto(process.env.base_url);
  //await loginDemo();
});

afterScenario(async () => {
  await helper.page.close();
});

afterSuite(async () => {
  await helper.browser.close();
});

step("等待<seconds>秒", async (seconds) => {
  await helper.page.waitForTimeout(seconds * 1000);
})

helper.blur = async function () {
  await helper.page.evaluate(() => {
    document.activeElement.blur();
  });
};

const standard_screenshots_dir = 'images/standard_screenshots/';
const diffimgs_dir = 'images/diff_imgs/';
const screenshots_dir = 'images/screenshots/'

async function removeOldImageFile(imagedir, name) {
  const imageFiles = fs.readdirSync(imagedir);
  for (const fileName of imageFiles) {
    var length = fileName.length;
    if (fileName.substr(0, length - 4) === name) {
      return fs.unlinkSync(path.join(imagedir, fileName));
    }
  }
}

helper.updateStandardScreenshots = async function (file) {
  await removeOldImageFile(standard_screenshots_dir, file);
  const screenshotPath = path.join(standard_screenshots_dir, `${file}.png`);
  const buffer = await helper.page.screenshot({ path: screenshotPath, fullPage: true });
  return buffer;
}

step("更新标准截图<pre>_<fileName>(更新标准截图后要手动确认，确认无误后在测试用例注释掉)", async (pre, fileName) => {
  await helper.updateStandardScreenshots(`${pre}_${fileName}`);
});

const screenshot = async (name) => {
  await removeOldImageFile(screenshots_dir, name);
  const screenshotPath = path.join(screenshots_dir, `${name}.png`);
  const buffer = await helper.page.screenshot({ path: screenshotPath, fullPage: true });
  return buffer;
};

helper.compareSnapshot = async (name, failureThreshold, screenshotPath) => {
  var isSame = true;

  const screenshotFile = screenshotPath ? fs.readFileSync(screenshotPath) : await screenshot(name);
  const screenshotImg = PNG.sync.read(screenshotFile);

  await removeOldImageFile(diffimgs_dir, name);

  const standard_screenshotsPath = path.join(standard_screenshots_dir, `${name}.png`)
  const standard_screenshotFile = fs.readFileSync(standard_screenshotsPath);
  const standard_screenshotImg = PNG.sync.read(standard_screenshotFile);

  const { width, height } = screenshotImg;
  const diff = new PNG({ width, height });
  const diffPixelCount = pixelmatch(screenshotImg.data, standard_screenshotImg.data, diff.data, width, height, {
    threshold: 0.1,
  });
  const diffimagePath = path.join(diffimgs_dir, `${name}.png`);
  fs.writeFileSync(diffimagePath, PNG.sync.write(diff));
  const diffRatio = diffPixelCount / (width * height);

  if (diffRatio > failureThreshold) {
    isSame = false;
  }
  return isSame;
}

step("截图对比<pre>_<fileName>,容错率<failureThreshold>", async (pre, fileName, failureThreshold) => {
  const isSame = await helper.compareSnapshot(`${pre}_${fileName}`, failureThreshold);
  expect(isSame).to.be.true;
})

step('打开新的浏览器并输入地址<url>', async (url) => {
  await openNewPage(url);
});

//保存
step('点击<isSave>', async (isSave) => {
  await saveButton1(isSave);
});
step('点击<selector><isSave>', async (selector,isSave) => {
  await saveButton(PUBLIC_FORM[selector], isSave);
});