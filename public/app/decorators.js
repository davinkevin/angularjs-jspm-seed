import angular from 'angular';

export function Module({name, inject, modules = []}) {
  return Target => {

    if (angular.isDefined(name) && angular.isDefined(inject))
      throw new TypeError ("Name and Inject can't be define in the same @Module");

    Target.$angularModule = angular.isUndefined(inject) ? angular.module(name, modules.map(extractAngularModuleName)) : extractAngularModule(inject);

    if (Target.component) Target.$angularModule.component(Target.$componentName, Target.component);
    if (Target.directive) Target.$angularModule.directive(Target.$directiveName, Target.directive);
    if (Target.routeConfig) Target.$angularModule.config(($routeProvider) => { "ngInject"; $routeProvider.when(...Target.routeConfig); });
    if (Target.$serviceName) Target.$angularModule.service(Target.$serviceName, Target);

    for (let config of Target.$config || []) {
      Target.$angularModule.config(config);
    }

    for (let run of Target.$run || []) {
      Target.$angularModule.run(run);
    }
  };
}

export function RouteConfig({ path, as = 'vm', reloadOnSearch = true, resolve = {}, template = '', ...params}) {
  return Target => {
    if (!path) throw new TypeError("Path should be Defined");

    Target.routeConfig = [path, angular.extend({}, params, {
      template: template,
      controller: Target,
      controllerAs : as,
      reloadOnSearch : reloadOnSearch,
      resolve : resolve
    })];
  };
}

export function Component({as = '$ctrl', bindings = {}, selector, template = ''}) {
  return Target => {
    if (!selector) throw new TypeError("A selector should be defined in the current annotation @Component");

    Target.$componentName = snakeCaseToCamelCase(selector);
    Target.component = {
      template: template,
      controller : Target,
      controllerAs : as,
      bindings : bindings
    };
  };
}

export function Directive({scope = true, as = 'vm', bindToController = true, selector, require = ''}) {
  return Target => {
    if (!selector) throw new TypeError("A selector should be defined in the current annotation @Component");

    Target.$directiveName = snakeCaseToCamelCase(selector);
    Target.directive = () => {
      let ddo = {
        restrict : 'A',
        require : require,
        scope : scope,
        controller : Target,
        controllerAs : as,
        bindToController : bindToController
      };

      Target.link && (ddo.link = Target.link);
      return ddo;
    };
  };
}


export function Service(name) {
  return Target => {
    Target.$serviceName = name;
  };
}

export function Config(configFunction) {
  return Target => {
    if (!Target.$config) Target.$config = [];
    Target.$config.push(configFunction);
  };
}

export function Run(runFunction) {
  return (Target, name, descriptor) => {
    if (!Target.$run) Target.$run = [];
    Target.$run.push(runFunction || descriptor.value);
  };
}

export function Boot({ element = document, strictDi = false}) {
  return Target => {
    if (!angular.isDefined(Target.$angularModule))
      throw new TypeError ("@Boot should be used only on a @Module Class");

    angular.element(document).ready(() =>  angular.bootstrap(element, [ Target.$angularModule.name ], { strictDi: strictDi }));
  };
}

function snakeCaseToCamelCase(string) {
  return string.replace( /-([a-z])/ig, (_,letter) => letter.toUpperCase());
}

function extractAngularModuleName(clazz) {
  if (clazz.default) clazz = clazz.default;

  if (clazz.$angularModule)
    return clazz.$angularModule.name;

  return clazz.name ? clazz.name : clazz;
}

function extractAngularModule(clazz) {
  return clazz.$angularModule ? clazz.$angularModule : clazz;
}