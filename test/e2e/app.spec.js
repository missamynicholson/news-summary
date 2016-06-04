describe("app", function() {
  var mock = require('protractor-http-mock');

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics',
        method: 'get'
      },
      response: {
        data: {response:{results:[{webTitle: "First article"}, {webTitle: "Second article"}]}}
      }
    }]);
  });

  afterEach(function(){
    mock.teardown();
  });

  it("should mock the http request", function() {
    browser.get('/');
    expect(mock.requestsMade()).toEqual([
       { url : 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics', method : 'GET' }
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


});
