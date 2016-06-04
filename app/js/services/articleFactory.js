newsSummaryApp.factory("ArticleFactory", function() {

  var article = function(title, picUrl) {
    this.title = title;
    this.photo = picUrl;
  };

  return article;

});
