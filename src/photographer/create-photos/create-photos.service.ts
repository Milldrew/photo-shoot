import * as puppeteer from 'puppeteer';
import { HttpException, Injectable } from '@nestjs/common';
import { ChosenDevice } from './devices';
import { DevicesService } from './devices/devices.service';

type PptrRes = { selectorStatus?: string };
@Injectable()
export class CreatePhotosService {
  response: PptrRes = {};
  constructor(private devices: DevicesService) {}
  async takePhotos(url: string, elementSelector: string) {
    await (async () => {
      const browser = await puppeteer.launch({
        args: ['--disable-dev-shm-usage'],
      });
      try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        for (
          let deviceIndex = 0;
          deviceIndex < this.devices.devices.length;
          deviceIndex += 1
        ) {
          const deviceTags = this.devices.devices[deviceIndex];
          console.log({ deviceTags });
          await page.emulate(puppeteer.devices[deviceTags.key]);
          await this.takeShot(deviceTags.fileName, page, elementSelector);
        }
        await page.emulate({
          viewport: { width: 1920, height: 1080 },
          userAgent: 'Desktop Computer 2',
        });

        await this.takeShot('1929x1080', page, elementSelector);

        await page.emulate({
          viewport: { width: 1366, height: 768 },
          userAgent: 'Desktop Computer',
        });
        await this.takeShot('1366x768', page, elementSelector);
      } catch (error) {
        console.error(error);
      }
      await browser.close();
    })();
    console.log(this.response);
    return this.response;
  }
  async takeShot(
    fileName: string,
    page: puppeteer.Page,
    elementSelector: string,
  ) {
    this.response = { selectorStatus: 'success' };
    try {
      await page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView();
      }, elementSelector);
    } catch (error) {
      if (elementSelector !== '')
        this.response.selectorStatus = `invalid selector ${elementSelector}`;
      console.error('selector error');
    }

    await page.screenshot({
      path: `./photographer_photos/${fileName}.png`,
      captureBeyondViewport: false,
    });
  }
}
