import { chromium } from 'k6/x/browser';
import { sleep } from 'k6';

export default function () {
    const browser = chromium.launch({ headless: false });
    const page = browser.newPage();

    // 01. Go to the homepage
    page
        .goto('https://mywebsite.com', { waitUntil: 'networkidle' })
        .then(() => {
            page.waitForSelector('p[class="woocommerce-result-count"]"]');
            page.screenshot({ path: 'screenshots/01_homepage.png' });

            sleep(4);

            // 02. View products
            const element = page.$(
                'a[class="woocommerce-LoopProduct-link woocommerce-loop-product__link"]'
            );
            element.click();
            page.waitForSelector('button[name="add-to-cart"]');
            page.screenshot({ path: 'screenshots/02_view-product.png' });

            sleep(1);
        })
        .finally(() => {
            page.close();
            browser.close();
        });
}
