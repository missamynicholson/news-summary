newsSummaryApp.service("SummaryService", ["$http", function($http) {

  this.getSummary = function(article) {
    aylienUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";
    return $http.get(aylienUrl + article.webUrl).then(_summarize);
  };

  function _summarize(response) {
    return response.data.sentences.join(" ");
  }

}]);
