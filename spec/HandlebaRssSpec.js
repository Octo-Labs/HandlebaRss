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
        options.success(mockResponse);
    });
    var callback = jasmine.createSpy('callback');
    rss.retrieveUrl(feedUrl,callback);
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



describe("HandlebaRss with multiple feeds", function(){
  var rss;
  var feedUrls = [
    "http://www.octolabs.com/blogs/octoblog/feed.xml", 
    "http://datachomp.com/atom.xml", 
    "http://geekindulgence.com/feed/"
  ];
  var template = '#multi-feed-template';
  var destination = '#multiple-destination';
  var limit = 3;

  beforeEach(function(){
    rss = new HandlebaRss(feedUrls,template,destination,limit);
    var responses = [mockResponse,dataChompMock,geekIndulgenceMock];
    var currentResponse = 0;
    spyOn($, "ajax").and.callFake(function(options) {
        options.success(responses[currentResponse]);
        currentResponse++;
    });
    rss.init();
  });

  it("should retrieve the feeds, sort the articles, and render the template",function(){
    

    

    expect($(destination).text()).toMatch(/Techlahoma - Omniauth Local Setup/);
    expect($(destination).text()).toMatch(/I am A bad blogger/);
    expect($(destination).text()).toMatch(/Blogging Goals for 2014/);

    expect($(destination).text()).toMatch(/OctoBlog/);
    expect($(destination).text()).toMatch(/DataChomp/);
    expect($(destination).text()).toMatch(/Geek Induldence/);

  });

});

