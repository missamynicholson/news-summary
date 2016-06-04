describe("ArticleService", function() {
  var service, articleFactory, httpMock;
  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleService, ArticleFactory, $httpBackend) {
    service = ArticleService;
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;
  }));

  it("returns an array of articles", function() {
    url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all";
    mockedResponse = {response:{results:[{webTitle: "First article", fields: {thumbnail: "pic1Url.jpg"}}, {webTitle: "Second article", fields: {thumbnail: "pic2Url.jpg"}}]}};
    httpMock.expect("GET", url).respond(mockedResponse);

    articles = [new articleFactory("First article", "pic1Url.jpg"), new articleFactory("Second article", "pic2Url.jpg")];
    service.getAll().then(function(response) {
      expect(response).toEqual(articles);
    });

    httpMock.flush();
  });
});
