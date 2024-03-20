import puppeteer from 'puppeteer';

export default async function pdfConfig({
    htmlContent // conteúdo HTML que vai ser convertido para pdf
}) {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: false,
            isLandscape: false
        }
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent); // Define o conteúdo HTML da página
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    });
    await browser.close();
    return pdf;
}