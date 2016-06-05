newsSummaryApp.service("ArticleService", ["$http", "ArticleFactory", function($http, ArticleFactory) {

  this.getAll = function() {
    guardianUrl = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics?show-fields=all";
    return $http.get(guardianUrl).then(_summaryService);
  };

  function _summaryService(articlesResponse) {
    var articles = [];
    articlesResponse.data.response.results.forEach(function(article) {
      articles.push(new ArticleFactory(article.webTitle, article.fields.thumbnail, article.webUrl));
    });
    return articles;
  }

}]);
