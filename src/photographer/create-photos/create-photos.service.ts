import * as puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePhotosService {
  takePhotos() {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({
        path: './photographer_photos/screenshot-new.png',
      });
      await browser.close();
    })();
  }
}
