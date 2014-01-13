describe("HandlebaRss", function(){
  var rss;
  var feedUrl = "http://www.octolabs.com/blogs/octoblog/feed.xml";
  var template = '#feed-template';
  var destination = '#destination';

  beforeEach(function(){
    rss = new HandlebaRss(feedUrl,template,destination);
  });

  it("should execute a callback after retrieving a feedUrl",function(){
    spyOn($, "ajax").and.callFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy('callback');
    rss.retrieveUrl(callback);
    expect(callback).toHaveBeenCalled();
  });

  it("should pull the feed out of the response",function(){
    rss.captureFeed(mockResponse); // defined in mock_response.js
    expect(rss.feed).not.toBe(null);
    expect(rss.feed).not.toBe(undefined);
    expect(rss.feed.title).toBe("OctoBlog");
  });

  it("should render into the destination",function(){
    rss.feed = mockResponse.responseData.feed;
    rss.render();
    expect($('#destination').text()).toMatch(/OctoBlog/);
    expect($('#destination').text()).toMatch(/Techlahoma/);
  });

});
