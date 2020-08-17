const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({ sigint: true });

function getUserInput(){
  const email = prompt('Type your e-mail: ');
  const pass = prompt.hide('Type your password: ');

  const userInput = [email, pass];

  return userInput;
}

(async () => {
  const [email, pass] = getUserInput();
  
  const browser = await puppeteer.launch();

  // Enter linkedIn website
  
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/');
  
  // Logon
  
  await page.click('a.nav__button-secondary');
  
  await page.focus('#username');
  await page.keyboard.type(email);

  await page.focus('#password');
  await page.keyboard.type(pass);

  const form = await page.$('form.login__form');
  await form.evaluate(form => form.submit());

  await page.waitForNavigation({ waitUntil: 'load' });

  // Go to invites page

  await page.goto(`https://www.linkedin.com/mynetwork/invitation-manager/`);

  // Accept Invites

  setTimeout(async () => {

    const acceptButtons = await page.$$('.invitation-card__action-btn.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view');
    
    for(let i = 0; i < acceptButtons.length; i++){
      await acceptButtons[i].click();
    }

    await browser.close();

    return;
  }, 10000);
})();
