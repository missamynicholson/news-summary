newsSummaryApp.controller("NewsSummaryController", ["ArticleFactory", function(ArticleFactory) {
    var self = this;

    self.articles = [new ArticleFactory("First article"), new ArticleFactory("Second article")];

}]);
