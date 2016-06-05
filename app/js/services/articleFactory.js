newsSummaryApp.factory("ArticleFactory", function() {

  var article = function(title, picUrl, summaryUrl) {
    this.title = title;
    this.photo = picUrl;
    this.webUrl = summaryUrl;
  };

  return article;

});
