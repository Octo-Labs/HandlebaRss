function HandlebaRss(feedUrl,template,destination){
  this.feedUrl = feedUrl;
  this.template = template;
  this.destination = destination;
  //this.retrieveUrl();
}

HandlebaRss.prototype.init = function(){
  this.retrieveUrl( $.proxy(this.captureAndRender,this) );
}

HandlebaRss.prototype.retrieveUrl = function(callback){
  $.ajax({
    url: 'http:' + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(this.feedUrl),
    //url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(this.feedUrl),
    dataType: 'json',
    success: callback
  });
};

HandlebaRss.prototype.captureAndRender = function(data){
  console.log("calling captureAndRender");
  this.captureFeed(data);
  this.render();
};

HandlebaRss.prototype.captureFeed = function(data){
  this.feed = data.responseData.feed;
};

HandlebaRss.prototype.render = function(){
  var source   = $(this.template).html();
  var template = Handlebars.compile(source);
  var html    = template(this.feed);
  $(this.destination).html(html);
};
