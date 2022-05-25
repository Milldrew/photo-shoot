import * as puppeteer from 'puppeteer';
import { HttpException, Injectable } from '@nestjs/common';
const I_PAD_PRO_11 = {
  key: 'iPad Pro 11',
  fileName: 'i-pad-pro-11',
};
const I_PAD_PRO_11_LANDSCAPE = {
  key: 'iPad Pro 11 landscape',
  fileName: 'i-pad-pro-11-landscape',
};
const I_PAD_GEN_7 = {
  key: 'iPad (gen 7)',
  fileName: 'i-pad-gen-7',
};
const I_PAD_GEN_7_LANDSCAPE = {
  key: 'iPad (gen 7) landscape',
  fileName: 'i-pad-gen-7-landscape',
};
const I_PAD_MINI_LANDSCAPE = {
  key: 'iPad Mini landscape',
  fileName: 'i-pad-mini-landscape',
};
const I_PAD_MINI = {
  key: 'iPad Mini',
  fileName: 'i-pad-mini',
};
const I_PHONE_SE_LANDSCAPE = {
  key: 'iPhone SE landscape',
  fileName: 'i-phone-se-landscape',
};
const I_PHONE_SE = {
  key: 'iPhone SE',
  fileName: 'i-phone-se',
};
const I_PHONE_13_MINI = {
  key: 'iPhone 13 Mini',
  fileName: 'i-phone-13-mini',
};
const I_PHONE_13_MINI_LANDSCAPE = {
  key: 'iPhone 13 Mini landscape',
  fileName: 'i-phone-13-mini-landscape',
};
const I_PHONE_13_PRO_MAX = {
  key: 'iPhone 13 Pro Max',
  fileName: 'i-phone-13-pro-max',
};
const I_PHONE_13_PRO_MAX_LANDSCAPE = {
  key: 'iPhone 13 Pro Max landscape',
  fileName: 'i-phone-13-pro-max-landscape',
};
const I_PHONE_13 = { key: 'iPhone 13', fileName: 'i-phone-13' };
const I_PHONE_13_LANDSCAPE = {
  key: 'iPhone 13 landscape',
  fileName: 'i-phone-13-landscape',
};
type ChosenDevice = { key: string; fileName: string };

@Injectable()
export class CreatePhotosService {
  async takePhotos(url: string, elementSelector: string) {
    await (async () => {
      try {
        const browser = await puppeteer.launch({
          args: ['--disable-dev-shm-usage'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        console.log('HELLO BEFORE SCROLL');
        const element = await page.$(elementSelector);
        if (element) {
          await page.waitForSelector(elementSelector);
          await page.$eval(elementSelector, (targetElement) => {
            if (targetElement) {
              console.log('HELLO FROM SCROLL');
              targetElement.scrollIntoView();
            }
          });
        }
        await this.takeShot(I_PAD_PRO_11_LANDSCAPE, page);
        await this.takeShot(I_PAD_PRO_11, page);
        await this.takeShot(I_PAD_GEN_7_LANDSCAPE, page);
        await this.takeShot(I_PAD_GEN_7, page);
        await this.takeShot(I_PAD_GEN_7_LANDSCAPE, page);
        await this.takeShot(I_PAD_GEN_7, page);
        await this.takeShot(I_PAD_MINI_LANDSCAPE, page);
        await this.takeShot(I_PAD_MINI, page);
        await this.takeShot(I_PHONE_SE_LANDSCAPE, page);
        await this.takeShot(I_PHONE_SE, page);
        await this.takeShot(I_PHONE_13_MINI_LANDSCAPE, page);
        await this.takeShot(I_PHONE_13_MINI, page);
        await this.takeShot(I_PHONE_13_PRO_MAX_LANDSCAPE, page);
        await this.takeShot(I_PHONE_13_PRO_MAX, page);
        await this.takeShot(I_PHONE_13_LANDSCAPE, page);
        await this.takeShot(I_PHONE_13, page);

        await page.emulate({
          viewport: { width: 1920, height: 1080 },
          userAgent: 'Desktop Computer 2',
        });

        await page.screenshot({
          path: `./photographer_photos/1929x1080.png`,
        });

        await page.emulate({
          viewport: { width: 1366, height: 768 },
          userAgent: 'Desktop Computer',
        });

        await page.screenshot({
          path: `./photographer_photos/1366x768.png`,
        });
        await browser.close();
        console.log('puppeteer finished');
      } catch (error) {
        console.log('PUPPETEER ERROR');
        console.error(error);
        throw new HttpException(error.message, 400);
      }
    })();
    return { status: 'photoshoot finished' };
  }
  async scrollToElement(page: puppeteer.Page, elementSelector) {
    await page.$eval(elementSelector, () => {
      if (elementSelector) {
        elementSelector.scrollIntoView();
      }
    });
  }
  async takeShot(device: ChosenDevice, page: puppeteer.Page) {
    const deviceOptions = puppeteer.devices[device.key];
    await page.emulate(deviceOptions);
    await page.screenshot({
      path: `./photographer_photos/${device.fileName}.png`,
    });
  }
}
