import { devices } from './devices';
import * as puppeteer from 'puppeteer';
import { HttpException, Injectable } from '@nestjs/common';
import { ChosenDevice } from './devices';

@Injectable()
export class CreatePhotosService {
  async takePhotos(url: string, elementSelector: string) {
    await (async () => {
      console.log('AM I WORKING');
      const browser = await puppeteer.launch({
        args: ['--disable-dev-shm-usage'],
      });
      try {
        const browser = await puppeteer.launch({
          args: ['--disable-dev-shm-usage'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        for (
          let deviceIndex = 0;
          deviceIndex < devices.length;
          deviceIndex += 1
        ) {
          console.log('for loop');
          await this.takeShot(devices[deviceIndex], page);
        }
        /*
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
        */
        console.log('before first desktop');
        await page.emulate({
          viewport: { width: 1920, height: 1080 },
          userAgent: 'Desktop Computer 2',
        });
        //await page.waitForNetworkIdle();

        await this.scrollToElement(page, 'footer');

        await page.screenshot({
          path: `./photographer_photos/1929x1080.png`,
        });

        console.log('before second deskto');
        await page.emulate({
          viewport: { width: 1366, height: 768 },
          userAgent: 'Desktop Computer',
        });
        console.log('after emulate first desktip before scroll');
        //await page.waitForNetworkIdle();
        await this.scrollToElement(page, 'footer');
        console.log('after first desktop scro');

        await page.screenshot({
          path: `./photographer_photos/1366x768.png`,
        });
        console.log('puppeteer finished');
      } catch (error) {
        console.log('PUPPETEER ERROR');
        console.error(error);
        throw new HttpException(error.message, 400);
      }
      await browser.close();
    })();
    return { status: 'photoshoot finished' };
  }
  async scrollToElement(page: puppeteer.Page, elementSelector: string) {
    try {
      console.log(`scroll to element: ${elementSelector}`);
      try {
        await page.waitForTimeout(200);
        console.log('1');
        const selectedElement = await page.$('footer');
        console.log('2');
        await page.evaluate(
          (selectedElement) => selectedElement.scrollIntoView(),
          selectedElement,
        );
        console.log('3');
        await page.waitForTimeout(200);
      } catch (error) {
        console.error('selector error');
        console.error(error, 'actuall error log');
      }
    } catch (error) {
      console.error(error);
    }
  }
  async takeShot(device: ChosenDevice, page: puppeteer.Page) {
    const deviceOptions = puppeteer.devices[device.key];
    await page.emulate(deviceOptions);
    await page.waitForNetworkIdle();
    await page.waitForSelector('footer');
    console.log('before scroll');
    await this.scrollToElement(page, 'footer');
    console.log('after scroll before screen shot');
    await page.screenshot({
      path: `./photographer_photos/${device.fileName}.png`,
    });
    console.log('after screen shot');
  }
}
