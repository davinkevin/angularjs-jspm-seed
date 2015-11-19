
import angular from 'angular';

export function Module({name, inject, modules = []}) {
  return Target => {

    if (angular.isDefined(name) && angular.isDefined(inject))
      throw new TypeError ("Name and Inject can't be define in the same @Module");

    if (!Target.component && !Target.routeConfig && !Target.$serviceName)
      throw new TypeError ("A @Component or @RouteConfig should be defined first");

    Target.$angularModule = angular.isUndefined(inject) ? angular.module(name, modules) : inject;

    if (Target.component) {
      Target.$angularModule.directive(Target.$directiveName, Target.component);
      return;
    }

    if (Target.routeConfig) {
    Target.$angularModule.config(Target.routeConfig);
    }

    Target.$angularModule.service(Target.$serviceName, Target);
  };
}

export function RouteConfig({ path, as = 'vm' }) {
  return Target => {
    if (!Target.$template) throw new TypeError("Template should be defined");
    if (!path) throw new TypeError("A path should be Defined");

    Target.routeConfig = ($routeProvider) => {
      "ngInject";
      $routeProvider.when(path, {
        template: Target.$template,
        controller: Target,
        controllerAs : as
      });
    };
  };
}

export function Component({restrict = 'E', scope = true, as = 'vm', bindToController = true, selector = ""}) {
  return Target => {
    if (!Target.$template) throw new TypeError("A Template should be defined with the annotation @View");
    if (!selector) throw new TypeError("A selector should be defined in the current annotation @Component");

    Target.$directiveName = snakeCaseToCamelCase(selector);

    Target.component = () => {
      let ddo = {
        restrict : restrict,
        template: Target.$template,
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

export function View({template}) {
  return Target => {
    Target.$template = template;
  };
}

export function Service(name) {
  return Target => {
    Target.$serviceName = name;
  };
}

function snakeCaseToCamelCase(string) {
  return string.replace( /-([a-z])/ig, (_,letter) => letter.toUpperCase());
}