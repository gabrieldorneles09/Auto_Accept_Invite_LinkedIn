const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  // Entrar no linkedin
  
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/');
  
  // Fazer login no linkedin
  
  await page.click('a.nav__button-secondary');
  
  await page.focus('#username');
  await page.keyboard.type('');

  await page.focus('#password');
  await page.keyboard.type('');

  const form = await page.$('form.login__form');
  await form.evaluate(form => form.submit());

  await page.waitForNavigation({ waitUntil: 'load' });
  
  // Ir até meus invites

  await page.goto(`https://www.linkedin.com/mynetwork/invitation-manager/`);

  // Aceitar os invites

  const acceptButtons = await page.$$('.invitation-card__action-btn.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view');

  acceptButtons.forEach(async (acceptButton) => {
    await page.evaluate((acceptButton) =>  acceptButton.click());
  });

  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();
