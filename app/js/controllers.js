newsSummaryApp.controller("NewsSummaryController", ["ArticleFactory", "ArticleService", function(ArticleFactory, ArticleService) {
  var self = this;

    ArticleService.getAll().then(function(response) {
      self.articles = response;
     });

    this.selectArticle = function(webUrl) {
      ArticleService.getSummary(webUrl).then(function(response) {
        self.articleSummary = response;
      });
    };

}]);
