describe("app", function() {
  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("News Summary");
  });

  it("should display first article", function() {
    browser.get('/');
    expect($$('article').first().getText()).toContain("First article");
  });

  it("should display second article", function() {
    browser.get('/');
    expect($$('article').get(1).getText()).toContain("Second article");
  });

});
