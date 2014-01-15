# HandlebaRss

A small RSS viewer for displaying remote feeds on static sites.

[http://octo-labs.github.io/HandlebaRss/](http://octo-labs.github.io/HandlebaRss/)

## Requirements

HandlebaRss depends on `jquery` and `handlebars`.

## Getting started

### Installation

First include the dependncies on your page.

~~~html
<!-- include dependencies -->
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="handlebars-v1.3.0.js"></script>

<!-- include HandlebaRss -->
<script type="text/javascript" src="src/HandlebaRss.js"></script>
~~~

### Single feeds

~~~html
<!-- the place where the feed should be rendered -->
<div id="destination"></div>

<!-- the handlebars template for the feed -->
<script id="feed-template" type="text/x-handlebars-template">
  <h1>{{title}}</h1>
  {{#each entries}}
    <h2><a href="{{link}}">{{title}}</a></h2>
    <p>{{contentSnippet}}</p>
  {{/each}}
</script>

<!-- now create a HandlebaRss instance and call init() -->
<script type="text/javascript" charset="utf-8">
  rss = new HandlebaRss("http://www.octolabs.com/blogs/octoblog/feed.xml","#feed-template","#destination");
  rss.init();
</script>
~~~

For single feeds the context of the handlebars template is a JSON
representation of a feed object.

~~~json
{
  "author" : "Jeremy Green",
  "description" : "",
  "feedUrl" : "http://www.octolabs.com/blogs/octoblog/feed.xml",
  "link" : "http://www.octolabs.com/blogs/octoblog",
  "title" : "OctoBlog",
  "type" : "atom10",
  "entries" : [{...},{...}]
}
~~~

### Multiple feeds

For multiple feeds, just pass an array of URLs as the first argument.
You can optionally pass an integer as the last argument to limit the
number of articles per feed.

~~~html
<!-- the place where the feed should be rendered -->
<div id="destination"></div>

<!-- the handlebars template for the feed -->
<script id="feed-template" type="text/x-handlebars-template">
  {{#each entries}}
    <h2><a href="{{link}}">{{title}}</a></h2>
    <p>From {{feed.title}}</p>
  {{/each}}
</script>

<!-- now create a HandlebaRss instance and call init() -->
<script type="text/javascript" charset="utf-8">
  rss = new HandlebaRss([
    "http://www.octolabs.com/blogs/octoblog/feed.xml",
    "http://datachomp.com/atom.xml",
    "http://geekindulgence.com/feed/"
  ],"#feed-template","#destination",5);
  rss.init();
</script>
~~~
gv
For multiple feeds the context of the handlebars template is a JSON
object that contains an `entries` array of the combined and sorted
entries from all of the feeds. Each `entry` has a `feed` property that
contains the data from the top level feed that the entry belongs to
(`author`,`description`,`feedUrl`, etc...).  In the template you can
access these with something like `{{feed.author}}`.

~~~json
{
  "entries" : [{...},{...},...]
}
~~~


## Running the tests

Just load `SpecRunner.html` in a browser.

## Contributing

Please!  I'm happy to accept pull requests.
