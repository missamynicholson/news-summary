newsSummaryApp.controller("NewsSummaryController", ["ArticleFactory", "ArticleService", function(ArticleFactory, ArticleService) {
    var self = this;

    ArticleService.getAll().then(function(response) {
      self.articles = response;
    });

}]);
