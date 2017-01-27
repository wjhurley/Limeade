require('chromedriver');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var input = require('./node_modules/selenium-webdriver/lib/input'),
    Key = input.Key;

var destinationURL = process.argv[2];
var userName = process.argv[3];
var userPassword = process.argv[4];
var promoBox = process.argv[5];

var randomPromo = [
  Math.floor(Math.random() * promoBox.length),
  Math.floor(Math.random() * promoBox.length),
  Math.floor(Math.random() * promoBox.length)
];

var defaultTimeOut = 30000;

function xGonGiveItToYa(x) {
  driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div[4]/span")).then( function(editButton) {
    if(promoBox[x - 1]) {
      driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div[4]/span")), defaultTimeOut);
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div[4]/span")).click();
      driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div/textarea")), defaultTimeOut);
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div/textarea")).getText().then( function(text) {
        driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div/textarea")).clear();
        for(let i = 0; i < promoBox[randomPromo[x - 1]].length; i += 64) {
          driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div/textarea")).sendKeys(promoBox[randomPromo[x - 1]].substr(i, Math.min(64, promoBox[randomPromo[x - 1]].length - i)));
        };
        driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + x + "]/div[4]/span[2]")).click();
      });
    }
  })
}

function checkLink(a) {
  var promise = driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[" + a + "]/div[4]/span")).getText().then( function(link) {
    if (link === 'Edit' ) {
      console.log('success');
      return true;
    } else {
      console.log('fail -- ' + link);
    }
  });
  return promise;
}

//set timeout for waiting on DOM element
driver.manage().timeouts().implicitlyWait(defaultTimeOut);
driver.manage().timeouts().pageLoadTimeout(defaultTimeOut);

driver.manage().window().setSize(1920, 1080);
driver.get(destinationURL);
driver.findElement(By.id('ctl00_content_SiteThemeContentFragmentPage1_fragment_3526_ctl01_ctl00_LoginForm1_ctl06_username')).sendKeys(userName);
driver.findElement(By.id('ctl00_content_SiteThemeContentFragmentPage1_fragment_3526_ctl01_ctl00_LoginForm1_ctl06_password')).sendKeys(userPassword);
driver.findElement(By.id('ctl00_content_SiteThemeContentFragmentPage1_fragment_3526_ctl01_ctl00_LoginForm1_ctl06_loginButton')).click();
driver.get(destinationURL + '/controlpanel/roleadmin/settings.aspx');
driver.findElement(By.linkText('Branding')).click();
driver.executeScript('window.scrollTo(0, 800);');
driver.switchTo().frame(driver.findElement(By.id('ctl00_OuterTaskRegion_TaskRegion_ScheduledPromoBarIframe')));
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span")).then(xGonGiveItToYa(1));
driver.sleep(2000);
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")).then(xGonGiveItToYa(2));
driver.sleep(2000);
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")).then(xGonGiveItToYa(3)); //function(editButton) {
//   if(promoBox[0]) {
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span")).click();
//     driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")), defaultTimeOut);
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).getText().then( function(text) {
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).clear();
//       for(let i = 0; i < promoBox[randomPromo1].length; i += 64) {
//         driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).sendKeys(promoBox[randomPromo1].substr(i, Math.min(64, promoBox[randomPromo1].length - i)));
//       };
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span[2]")).click();
//     });
//   }
// });
// driver.wait(checkLink(1), 1000);
// driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")).then( function(editButton) {
//   if(promoBox[1]) {
//     driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")), defaultTimeOut);
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")).click();
//     driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")), defaultTimeOut);
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).getText().then( function(text) {
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).clear();
//       for(let i = 0; i < promoBox[randomPromo2].length; i += 64) {
//         driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).sendKeys(promoBox[randomPromo2].substr(i, Math.min(64, promoBox[randomPromo2].length - i)));
//       };
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span[2]")).click();
//     });
//   }
// });
// driver.wait(checkLink(2), 1000);
// driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")).then( function(editButton) {
//   if(promoBox[2]) {
//     driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")), defaultTimeOut);
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")).click();
//     driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")), defaultTimeOut);
//     driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).getText().then( function(text) {
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).clear();
//       for(let i = 0; i < promoBox[randomPromo3].length; i += 64) {
//         driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).sendKeys(promoBox[randomPromo3].substr(i, Math.min(64, promoBox[randomPromo3].length - i)));
//       };
//       driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span[2]")).click();
//     });
//   }
// });
