newsSummaryApp.controller("NewsSummaryController", ["ArticleService", "SummaryService", function(ArticleService, SummaryService) {
  var self = this;

    ArticleService.getAll().then(function(response) {
      self.articles = response;
     });

    this.getSummary = function(article) {
      if (typeof article.articleSummary === "undefined") {
        SummaryService.getSummary(article).then(function(response) {
          article.articleSummary = response;
        });
      }
    };

}]);
