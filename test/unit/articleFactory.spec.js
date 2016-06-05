describe("ArticleFactory", function() {
  var article;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleFactory) {
    article = new ArticleFactory("First Article", "pic1Url", "http://article1weburl/");
  }));

  it("returns an article with title", function() {
    expect(article.title).toEqual("First Article");
  });

  it("returns an article with photo Url", function() {
    expect(article.photo).toEqual("pic1Url");
  });

  it("returns an article with a webUrl", function() {
    expect(article.webUrl).toEqual("http://article1weburl/");
  });

});
