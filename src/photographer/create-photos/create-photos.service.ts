import * as puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';
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
  takePhotos() {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await this.takeShot(I_PHONE_13, page);
      await browser.close();
    })();
  }
  async takeShot(device: ChosenDevice, page: puppeteer.Page) {
    const deviceOptions = puppeteer.devices[device.key];
    await page.emulate(deviceOptions);
    await page.screenshot({
      path: `./photographer_photos/${device.fileName}.png`,
    });
  }
}
