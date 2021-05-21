The Alexandria skin is based on the design for OpenLibrary.org by the Internet Archive. It is built in Vue.js with a Mustache compatibility layer to allow server-side rendering.

If there is something you'd like me to fix please raise an issue.

# Lazy loading

Alexandria supports lazy loading. To benefit from this feature you have two options

1) Use SkinJSON

Install SkinJSON and add this to LocalSettings.php:
```
$wgAlexandriaSearchApi = "/w/index.php/$1?useskin=alexandria&useformat=json";
```

2) Use service that returns raw HTML of article content (excludes title):

```
$wgAlexandriaSearchApi = "https://en.wikipedia.org/api/rest_v1/page/html/$1?redirect=true";
```
