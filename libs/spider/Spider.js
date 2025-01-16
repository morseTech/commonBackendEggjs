'use strict';
const puppeteer = require('puppeteer');


class Spider {
  static #browser = null;

  async create() {
    try {
      if (!Spider.#browser) Spider.#browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      return this;
    } catch (error) {
      return false;
    }
  }

  async destory() {
    if (Spider.#browser) {
      await Spider.#browser.close();
    }
    Spider.#browser = null;
    return true;
  }

  /**
   * 获取页面内容
   *
   * @async
   * @param {*} url 
   * @param {{}} [opt={}] 
   * @returns {unknown} 
   */
  async fetch(url, opt = {}) {
    try {
      const page = await Spider.#browser.newPage();
      if (opt.type === 'moblie') {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
        await page.setViewport({
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
        });
      } else {
        await page.setViewport({ width: 1280, height: 800 });
      }
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
      // Wait for element and click
      if (opt.action) {
        const { act, selector } = opt.action;
        await page.waitForSelector(selector, { timeout: 5000 });
        await page[act](selector);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const html = await page.content();
      page.close();
      return html;

    } catch (error) {
      return false;
    }
  }

}

module.exports = Spider;

// 使用示例
// const test = async () => {
//   try {
//     const murl = 'https://mp.weixin.qq.com/s?src=11&timestamp=1736429656&ver=5740&signature=GsXcTk0mWl2dBeax9eqcPbPQ53zXVgi8GTdLxOBXzY7JrbYNV28a9CM2EwPvSqrVhEgKWs2SvRgMKR2381YCbZyS3Z6EtZ03EZ6ZgoqQenWzC-wmsdnP80A9BLg-2XeG&new=1';
//     // Extract root URL
//     const spider = new Spider();
//     await spider.init();
//     const html = await spider.openPC(murl,{ act: 'click', selector: '#js_name' });
//     const result = spider.filter.gongzhonghaoInfo(html);
//     const html2 = await spider.openMobile(murl);
//     const avatar = spider.filter.gongzhonghaoAvatar(html2);
//     spider.destory();
//     // const result = await getWechatContent(murl);
//     const parsedUrl = url.parse(murl);
//     if (parsedUrl.host == 'mp.weixin.qq.com') result.accountQrCode = parsedUrl.protocol + '//' + parsedUrl.host + result.accountQrCode;
//     if (avatar) result.accountAvatar = avatar;
//     console.log('WeChat Article Info:', result);
//     return result;
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// };
