describe("ArticleService", function() {
  var service, articleFactory, httpMock;
  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleService, ArticleFactory, $httpBackend) {
    service = ArticleService;
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;
  }));

  it("returns an array of articles", function() {
    url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics";
    mockedResponse = {response:{results:[{webTitle: "First article"}, {webTitle: "Second article"}]}};
    httpMock.expect("GET", url).respond(mockedResponse);

    articles = [new articleFactory("First article"), new articleFactory("Second article")];
    service.getAll().then(function(response) {
      expect(response).toEqual(articles);
    });

    httpMock.flush();
  });
});
