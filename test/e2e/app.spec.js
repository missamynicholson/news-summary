describe("app", function() {
  var mock = require('protractor-http-mock');

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all',
        method: 'get'
      },
      response: {
        data: {response:{results:[{webTitle: "First article", fields: {thumbnail: "pic1Url.jpg"}}, {webTitle: "Second article", fields: {thumbnail: "pic1Url.jpg"}}]}}
    }
    }]);
  });

  afterEach(function(){
    mock.teardown();
  });

  it("should mock the http request", function() {
    browser.get('/');
    expect(mock.requestsMade()).toEqual([
       { url : 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all', method : 'GET' }
    ]);
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
    expect($$('article').first().$('img').getAttribute('src')).toEqual("pic1Url.jpg");
  });

  it("should display a photo with second article", function() {
    browser.get('/');
    expect($$('article').get(1).$('img').getAttribute('src')).toEqual("pic2Url.jpg");
  });

});
