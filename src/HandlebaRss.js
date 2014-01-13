function HandlebaRss(feedUrl,template,destination,multiLimit){
  if(feedUrl instanceof Array){
    this.feedUrls = feedUrl;
  }else{
    this.feedUrl = feedUrl;
  }
  this.template = template;
  this.destination = destination;
  this.multiLimit = multiLimit;
  //this.retrieveUrl();
}

HandlebaRss.prototype.init = function(){
  if(this.feedUrl){
    this.retrieveUrl(this.feedUrl, $.proxy(this.captureAndRender,this));
  }else{
    for(var i = 0; i<this.feedUrls.length; i++){
      this.retrieveUrl(this.feedUrls[i], $.proxy(this.captureMultiAndRender,this));
    }
  }
}

HandlebaRss.prototype.addFeedData = function(data){
  if(!this.feedDatas){
    this.feedDatas = [];
  }
  this.feedDatas.push(data.responseData.feed);
}

HandlebaRss.prototype.retrieveUrl = function(url,callback){
  var protocol = document.location.protocol;
  if(protocol == 'file:'){ protocol = 'http:'}
  $.ajax({
    url: protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: callback
  });
};

HandlebaRss.prototype.captureAndRender = function(data){
  this.captureFeed(data);
  this.render();
};

HandlebaRss.prototype.captureMultiAndRender = function(data){
  this.addFeedData(data);
  this.renderMulti();
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


HandlebaRss.prototype.renderMulti = function(){
  var source   = $(this.template).html();
  var template = Handlebars.compile(source);
  var entries = this.coalesseFeeds();
  var context = { entries : entries };
  
  var html    = template(context);
  $(this.destination).html(html);
};

HandlebaRss.prototype.coalesseFeeds = function(){
  var entries = [];
  for(var i = 0; i<this.feedDatas.length; i++){
    var feedData = this.feedDatas[i];
    // build a representation of the main feed data, which will be added
    // to each entry
    var feed = {
      author : feedData.author,
      description : feedData.description,
      feedUrl : feedData.feedUrl,
      link : feedData.link,
      title : feedData.title,
      type : feedData.type
    }
    for(var j = 0; j<feedData.entries.length; j++){
      if(this.multiLimit && j >= this.multiLimit){ break; }
      var entry = feedData.entries[j];
      entry.feed = feed;
      entries.push(entry);
    }
  }
  var sortedEntries = entries.sort(function(a,b){
    var aDate = Date.parse(a.publishedDate);
    var bDate = Date.parse(b.publishedDate);
    if( aDate == bDate){
      return 0;
    }else if( aDate < bDate ){
      return 1;
    }
    return -1;
  });
  return sortedEntries;
}

