describe("ArticleFactory", function() {
  var article;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleFactory) {
    article = new ArticleFactory("First Article", "pic1Url");
  }));

  it("returns an article with title", function() {
    expect(article.title).toEqual("First Article");
  });

  it("returns an article with photo Url", function() {
    expect(article.photo).toEqual("pic1Url");
  });

});
