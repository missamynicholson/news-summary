describe("NewsSummaryController", function() {
  var controller;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function($controller) {
    controller = $controller("NewsSummaryController");
  }));

  it("has two articles upon initialisation", function() {
    expect(controller.articles).toEqual(["First article", "Second article"]);
  });

});
