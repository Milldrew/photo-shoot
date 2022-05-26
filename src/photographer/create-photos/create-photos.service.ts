import * as puppeteer from 'puppeteer';
import { HttpException, Injectable } from '@nestjs/common';
import { ChosenDevice } from './devices';
import { DevicesService } from './devices/devices.service';

@Injectable()
export class CreatePhotosService {
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
          await this.takeShot(
            this.devices.devices[deviceIndex],
            page,
            elementSelector,
          );
        }
        await page.emulate({
          viewport: { width: 1920, height: 1080 },
          userAgent: 'Desktop Computer 2',
        });

        await page.evaluate((selector) => {
          document.querySelector(selector).scrollIntoView();
        }, elementSelector);

        await page.screenshot({
          path: `./photographer_photos/1929x1080.png`,
          captureBeyondViewport: false,
        });

        await page.emulate({
          viewport: { width: 1366, height: 768 },
          userAgent: 'Desktop Computer',
        });
        await page.evaluate((selector) => {
          document.querySelector(selector).scrollIntoView();
        }, elementSelector);

        await page.screenshot({
          path: `./photographer_photos/1366x768.png`,
          captureBeyondViewport: false,
        });
      } catch (error) {
        console.error(error);
      }
      await browser.close();
    })();
    return { status: 'photoshoot finished' };
  }
  async takeShot(
    device: ChosenDevice,
    page: puppeteer.Page,
    elementSelector: string,
  ) {
    const deviceOptions = puppeteer.devices[device.key];

    await page.emulate(deviceOptions);

    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, elementSelector);
    await page.screenshot({
      path: `./photographer_photos/${device.fileName}.png`,
      captureBeyondViewport: false,
    });
  }
}
