(function() {
  var modules = {}, deferreds = [], slice = [].slice;

  function resolveDeferreds() {
    return deferreds = deferreds.filter(function(deferred) {
      var fulfilled = deferred.dependencies.every(function(dependency) {
        return modules.hasOwnProperty(dependency);
      });

      if (fulfilled) {
        deferred.callback.apply(null, deferred.dependencies.map(function(dependency) {
          return modules[dependency];
        }));
      }

      return !fulfilled;
    });
  }

  this.$dj = this.DeepJeez = {
    define: function(module_name, factory) {
      modules[module_name] = factory();
      return resolveDeferreds();
    },
    
    require: function() {
      var callbackOrDependency, dependencies, i;

      dependencies = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), callbackOrDependency = arguments[i++];
      
      if (dependencies.length === 0) {
        return modules[callbackOrDependency];
      } else {
        deferreds.push({
          dependencies: dependencies,
          callback: callbackOrDependency
        });

        return resolveDeferreds();
      }
    }
  };

}).call(this);
