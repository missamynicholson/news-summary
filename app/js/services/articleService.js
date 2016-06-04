newsSummaryApp.service("ArticleService", ["$http", "ArticleFactory", function($http, ArticleFactory) {

  this.getAll = function() {
    url = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics";
    return $http.get(url).then(_summaryService);
  };

  function _summaryService(articlesResponse) {
    var articles = [];
    articlesResponse.data.response.results.forEach(function(article) {
      articles.push(new ArticleFactory(article.webTitle));
    });
    return articles;
  }

}]);
