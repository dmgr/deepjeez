(function(exports) {

  var modules = {}, deferreds = [], slice = Array.prototype.slice;

  exports.$dj = exports.DeepJeez = {
    define: define,
    require: require,
    use: require,
    isDefined: isDefined,
    // modules: modules,
    // deferreds: deferreds,
  }

  function define(moduleName, dependencies, factory) {
    if (typeof dependencies == "function") {
      factory = dependencies;
      dependencies = null;
    }

    if (dependencies) {
      require(dependencies, function() {
        modules[moduleName] = factory && factory.apply(null, arguments);
      });
    } else {
      modules[moduleName] = factory && factory();
    }

    resolveDeferreds();
  }

  /**
    SYNOPSIS:
    var mod1 = $dj.require('mod1');
    require('mod1', 'mod2', function(mod1, mod2) {...});
    require(['mod1', 'mod2'], function(mod1, mod2) {...});
  */
  function require(dependencies, callback) {
    if (!callback) return modules[dependencies]; // returns required module immediately

    if (!(dependencies instanceof Array)) {
      dependencies = slice.call(arguments);
      callback = dependencies.pop();
    }

    deferreds.push({
      dependencies: dependencies,
      callback: callback,
    });

    resolveDeferreds();
  }

  function isDefined(dependency) {
    return modules.hasOwnProperty(dependency);
  }

  function resolveDeferreds() {
    deferreds = deferreds.filter(function(deferred) {
      var fulfilled = deferred.dependencies.every(function(dependency) {
        return isDefined(dependency);
      });

      if (fulfilled) {
        deferred.callback.apply(null, deferred.dependencies.map(function(dependency) {
          return modules[dependency];
        }));
      }

      return !fulfilled;
    });
  }

})(this);
