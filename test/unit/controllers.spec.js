describe("NewsSummaryController", function() {
  var controller, articleFactory, httpMock;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function($controller, ArticleFactory, $httpBackend) {
    controller = $controller("NewsSummaryController");
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;

    url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics";
    mockedResponse = {response:{results:[{webTitle: "First article"}, {webTitle: "Second article"}]}};
    httpMock.expect("GET", url).respond(mockedResponse);
    httpMock.flush();
  }));

  it("has two articles upon initialisation", function() {
    article1 = new articleFactory("First article");
    article2 = new articleFactory("Second article");
    expect(controller.articles).toEqual([article1, article2]);
  });

});
