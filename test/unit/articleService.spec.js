describe("ArticleService", function() {
  var service, articleFactory, httpMock, article1;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(ArticleService, ArticleFactory, $httpBackend) {
    service = ArticleService;
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;

    guardianUrl = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all";
    article1Result = {webTitle: "First article",
                      webUrl: "http://article1WebUrl",
                      fields: {thumbnail: "pic1Url.jpg"}};
    article2Result = {webTitle: "Second article",
                      webUrl: "http://article2WebUrl",
                      fields: {thumbnail: "pic2Url.jpg"}};
    mockedResponseFromGuardian = {response:{results:[article1Result, article2Result]}};
    httpMock.expect("GET", guardianUrl).respond(mockedResponseFromGuardian);

    article1 = new articleFactory("First article", "pic1Url.jpg", "http://article1WebUrl");
    aylienUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";
    mockedResponseFromAylien = {sentences:["First sentence.", "Second sentence.", "Third sentence.", "Fourth sentence.", "Fifth sentence."]};
    httpMock.when("GET", aylienUrl + article1.webUrl).respond(mockedResponseFromAylien);
  }));

  it("returns an array of articles", function() {
    article2 = new articleFactory("Second article", "pic2Url.jpg", "http://article2WebUrl");
    articles = [article1, article2];
    service.getAll().then(function(response) {
      httpMock.flush();
      expect(response).toEqual(articles);
    });
  });


  it("returns a summary", function() {
    summary = "First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.";
    service.getSummary(article1.webUrl).then(function(response) {
      httpMock.flush();
      expect(response).toEqual(summary);
    });
  });
});
