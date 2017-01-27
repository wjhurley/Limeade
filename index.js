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
var promoBox = [
  '<a href="https://mywellnessnumbers.com/aduro/docs/Goal-vs-Challenge-OnePager.pdf" target="_new"><img src="https://challenges.mywellnessnumbers.com/images/HPP_goals-vs-challanges-300x150.png" alt="HPP_goals-vs-challanges" width="200px"></a>',
  '<a href="http://www.mywellnessnumbers.com/IgniteCoaching/2017/HotTopics_Schedule-of-Events_2017.pdf" target="_new"><img src="http://thelibrary.adurolife.com/wp-content/uploads/2016/11/IYL_HotTopics_Promo_2017_HPP-2.png" alt="Click here to download your 2017 Hot Topics Schedule" width="324" height="188"></a>',
  '<a href="URL"><img src="https://challenges.mywellnessnumbers.com/images/IYL_CoachingTestamonials-01.jpg" alt="Coaching Testamonials" width="100%"></a>',
  '<a href="###" target="_blank"><img src="http://thelibrary.adurolife.com/wp-content/uploads/2017/01/roadmap-promo-yellow.jpg" alt="Roadmap to Success" style="width:100%; height:auto;"></a>',
  '<a href="?cid=1390"><img src="https://mywellnessnumbers.com/aduro/images/RtS-HPP_1.png" style="width:100%; height: auto"></a>',
  '<a href="?cid=1390"><img src="https://mywellnessnumbers.com/aduro/images/RtS-HPP_2.png" style="width:100%; height: auto"></a>',
  '<a href="?cid=1390"><img src="https://mywellnessnumbers.com/aduro/images/RtS-HPP_3.png" style="width:100%; height: auto"></a>',
  '<a href="/Home/?cid=1370"><img src="https://challenges.mywellnessnumbers.com/images/HPPrograms_HPP_Promo.gif" alt="hpprograms_hpp_promo" style="width:100%; height: auto"></a>',
  '<a href="URL"><img src="https://challenges.mywellnessnumbers.com/images/Device_Sync_HP_Promo.jpg" alt="Device_Sync" style="width:100%; height: auto"></a>',
  '<a href="#"><img src="https://challenges.mywellnessnumbers.com/images/SHS_PromoBoxes3-300x150.jpg" alt="Health Screening" style="width: 100%; height: auto"></a>'
];

var randomPromo1 = Math.floor(Math.random() * promoBox.length),
    randomPromo2 = Math.floor(Math.random() * promoBox.length),
    randomPromo3 = Math.floor(Math.random() * promoBox.length);

var defaultTimeOut = 30000;

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
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span")).then( function(editButton) {
  if(promoBox[0]) {
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")), defaultTimeOut);
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).getText().then( function(text) {
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).clear();
      for(let i = 0; i < promoBox[randomPromo1].length; i += 64) {
        driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div/textarea")).sendKeys(promoBox[randomPromo1].substr(i, Math.min(64, promoBox[randomPromo1].length - i)));
      };
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div/div[4]/span[2]")).click();
    });
  }
});
driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")), defaultTimeOut);
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")).then( function(editButton) {
  if(promoBox[1]) {
    driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")), defaultTimeOut);
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")), defaultTimeOut);
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).getText().then( function(text) {
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).clear();
      for(let i = 0; i < promoBox[randomPromo2].length; i += 64) {
        driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/textarea")).sendKeys(promoBox[randomPromo2].substr(i, Math.min(64, promoBox[randomPromo2].length - i)));
      };
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div[4]/span[2]")).click();
    });
  }
});
driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span"))), defaultTimeOut;
driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")).then( function(editButton) {
  if(promoBox[2]) {
    driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")), defaultTimeOut);
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")), defaultTimeOut);
    driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).getText().then( function(text) {
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).clear();
      for(let i = 0; i < promoBox[randomPromo3].length; i += 64) {
        driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div/textarea")).sendKeys(promoBox[randomPromo3].substr(i, Math.min(64, promoBox[randomPromo3].length - i)));
      };
      driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div/div[2]/div[3]/div[4]/span[2]")).click();
    });
  }
});
