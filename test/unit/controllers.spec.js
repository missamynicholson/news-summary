describe("NewsSummaryController", function() {
  var controller, articleFactory, httpMock;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function($controller, ArticleFactory, $httpBackend) {
    controller = $controller("NewsSummaryController");
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;

    url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all";
    mockedResponse = {response:{results:[{webTitle: "First article", fields: {thumbnail: "pic1Url.jpg"}}, {webTitle: "Second article", fields: {thumbnail: "pic2Url.jpg"}}]}};
    httpMock.expect("GET", url).respond(mockedResponse);
    httpMock.flush();
  }));

  it("has two articles upon initialisation", function() {
    article1 = new articleFactory("First article", "pic1Url.jpg");
    article2 = new articleFactory("Second article", "pic2Url.jpg");
    expect(controller.articles).toEqual([article1, article2]);
  });

});
