describe("NewsSummaryController", function() {
  var controller, articleFactory, httpMock, article1;

  beforeEach(module("newsSummaryApp"));

  beforeEach(inject(function($controller, ArticleFactory, $httpBackend) {
    controller = $controller("NewsSummaryController");
    articleFactory = ArticleFactory;
    httpMock = $httpBackend;

    guardianUrl = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all";
    article1Response = {webTitle: "First article",
                        webUrl: "http://article1weburl/",
                        fields: {thumbnail: "pic1Url.jpg"}};
    article2Response = {webTitle: "Second article",
                        webUrl: "http://article2weburl/",
                        fields: {thumbnail: "pic2Url.jpg"}};
    mockedResponseFromGuardian = {response:{results:[article1Response, article2Response]}};
    httpMock.expect("GET", guardianUrl).respond(mockedResponseFromGuardian);
    httpMock.flush();

    article1 = new articleFactory("First article", "pic1Url.jpg", "http://article1weburl/");
    aylienUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";
    mockedResponseFromAylien = {sentences:["First sentence.", "Second sentence.", "Third sentence.", "Fourth sentence.", "Fifth sentence."]};
    httpMock.when("GET", aylienUrl + article1.webUrl).respond(mockedResponseFromAylien);
  }));


  it("has two articles upon initialisation", function() {
    article2 = new articleFactory("Second article", "pic2Url.jpg", "http://article2weburl/");
    expect(controller.articles).toEqual([article1, article2]);
  });


  it("returns a summary", function() {
    summary = "First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.";
    controller.getSummary(article1);
    httpMock.flush();
    expect(article1.articleSummary).toEqual(summary);
  });

});
