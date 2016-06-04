describe("NewsSummaryController", function() {
  var controller, factory;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function($controller, _ArticleFactory_) {
    controller = $controller("NewsSummaryController");
    factory = _ArticleFactory_;
  }));

  it("has two articles upon initialisation", function() {
    article1 = new factory("First article");
    article2 = new factory("Second article");
    expect(controller.articles).toEqual([article1, article2]);
  });

});
