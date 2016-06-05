describe("app", function() {
  var mock = require('protractor-http-mock');
  var article1Result = {webTitle: "First article",
                    webUrl: "http://article1weburl/",
                    fields: {thumbnail: "pic1Url.jpg"}};
  var article2Result = {webTitle: "Second article",
                    webUrl: "http://article2weburl/",
                    fields: {thumbnail: "pic2Url.jpg"}};
  beforeEach(function(){
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian',
        method: 'GET'
      },
      response: {
        data: {response:{results:[article1Result, article2Result]}}
      }
    }, {
      request: {
        path: 'http://news-summary-api.herokuapp.com/aylien',
        method: 'GET'
      },
      response: {
        data: {sentences:["First sentence.", "Second sentence.", "Third sentence.", "Fourth sentence.", "Fifth sentence."]}
      }
    }]);

  });

  afterEach(function(){
    mock.teardown();
  });

  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("News Summary");
  });

  it("should display first article", function() {
    browser.get('/');
    expect($$('article').first().$('h3').getText()).toContain("First article");
  });

  it("should display second article", function() {
    browser.get('/');
    expect($$('article').get(1).$('h3').getText()).toContain("Second article");
  });

  it("should display a photo with first article", function() {
    browser.get('/');
    expect($$('article').first().$('img').getAttribute('src')).toContain("pic1Url.jpg");
  });

  it("should display a photo with second article", function() {
    browser.get('/');
    expect($$('article').get(1).$('img').getAttribute('src')).toContain("pic2Url.jpg");
  });

  it("should show a summary of first article when click 'Read more'", function() {
    browser.get('/');
    $$('article').first().$('.summary').click();
    summary = "First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.";
    expect($$('article').first().$('.wrapper').isDisplayed()).toBeTruthy();
    expect($$('article').first().$('div p').getText()).toEqual(summary);
  });

  it("should show hide summary of first article when click 'Read less'", function() {
    browser.get('/');
    $$('article').first().$('.summary').click();
    $$('article').first().$('.hideSummary').click();
    expect($$('article').first().$('.wrapper').isDisplayed()).toBeFalsy();
  });

  it("should go to Guardian site when click 'Read full article'", function() {
    browser.get('/');
    $$('article').first().$('.summary').click();
    expect($$('article').first().$('div a').getAttribute('href')).toEqual("http://article1weburl/");
  });

});
