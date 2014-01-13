# HandlebaRss

A small RSS viewer for displaying remote feeds on static sites.

## Requirements

HandlebaRss depends on `jquery` and `handlebars`.

## Getting started

~~~html
<!-- include dependencies -->
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="handlebars-v1.3.0.js"></script>

<!-- include HandlebaRss -->
<script type="text/javascript" src="src/HandlebaRss.js"></script>

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

## Running the tests

Just load `SpecRunner.html` in a browser.

## Contributing

Please!  I'm happy to accept pull requests.
