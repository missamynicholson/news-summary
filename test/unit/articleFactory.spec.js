describe("ArticleFactory", function() {
  var article;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleFactory) {
    article = new ArticleFactory("First Article");
  }));

  it("returns an article", function() {
    expect(article.title).toEqual("First Article");
  });

});
