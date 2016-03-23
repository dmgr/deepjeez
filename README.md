# DeepJeez - a tiny dependency manager

DeepJeez strives to handle modularized JavaScript (mostly for the browser) in an
unobtrusive way. It's a perfect fit if you're already concatenating everything
into a single file, but it can easily be integrated with script loaders if you
want to organize modules into their own files.

```javascript
DeepJeez.define('HelloWorld', function() {
  return {
    run: function() {
      console.log('hello world!');
    }
  };
});

$dj.require('HelloWorld', function(HelloWorld) {
  HelloWorld.run();
});
```

## Why?

Dependency managers bring several advantages to your JavaScript:

* You can stop worrying about the order of your code.
* Concatinating becomes a breeze (because the order doesn't matter).
* Loading scripts async becomes a breeze (because the order doesn't matter).

DeepJeez is the simplest possible dependency manager. It only does one thing:
Managing the dependencies of your code. You should find it very easy to
integrate DeepJeez into an exisiting code base, regardless of how you structure
your code on the file system or to the browser.
