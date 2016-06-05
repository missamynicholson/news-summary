describe("SummaryService", function() {
  var service, articleFactory, httpMock, article1;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function(SummaryService, ArticleFactory, $httpBackend) {
    service = SummaryService;
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;

    article1 = new articleFactory("First article", "pic1Url.jpg", "http://article1weburl/");
    aylienUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";
    mockedResponseFromAylien = {sentences:["First sentence.", "Second sentence.", "Third sentence.", "Fourth sentence.", "Fifth sentence."]};
    httpMock.when("GET", aylienUrl + article1.webUrl).respond(mockedResponseFromAylien);
  }));

  it("returns a summary", function() {
    summary = "First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.";
    service.getSummary(article1).then(function(response) {
      httpMock.flush();
      expect(response).toEqual(summary);
    });
  });
});
