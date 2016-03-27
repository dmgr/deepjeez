modules = {}
deferreds = []

resolveDeferreds = ->
  deferreds = deferreds.filter (deferred) ->
    fulfilled = deferred.dependencies.every (dependency) -> modules.hasOwnProperty(dependency)

    if fulfilled # call deferred callback with dependency injection
      deferred.callback.apply null, deferred.dependencies.map (dependency) -> modules[dependency]

    !fulfilled

@$dj =
  define: (module_name, dependencies, factory) ->
    modules[module_name] = factory()
    resolveDeferreds()

  require: (dependencies..., callbackOrDependency) ->
    if dependencies.length == 0
      modules[callbackOrDependency] # callback is dependency in this case
    else
      deferreds.push dependencies: dependencies, callback: callbackOrDependency
      resolveDeferreds()