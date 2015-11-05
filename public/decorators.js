
import angular from 'angular';

export function RouteConfig({ path, as }) {
  return Target => {

    if (!Target.$template) throw new TypeError("Template should be defined");
    if (!path) throw new TypeError("A path should be Defined");

    Target.routeConfig = ($routeProvider) => {
      "ngInject";
      $routeProvider.when(path, {
        template: Target.$template,
        controller: Target.name,
        controllerAs : as || 'vm'
      });
    };
  };
}

export function Component({restrict, scope, as, bindToController, selector}) {
  return Target => {
    if (!Target.$template) throw new TypeError("A Template should be defined with the annotation @View");
    if (!selector) throw new TypeError("A selector should be defined in the current annotation @Component");

    Target.$directiveName = snakeCaseToCamelCase(selector);

    Target.component = () => {
      return {
        restrict : restrict || 'E',
        template: Target.$template,
        scope : angular.isDefined(scope) ? scope : true,
        controller : Target.name,
        controllerAs : as || 'vm',
        bindToController : angular.isDefined(bindToController) ? bindToController : true,
        link : Target.link || angular.noop
      };
    };
  };
}


export function View({template}) {
  return Target => {
    Target.$template = template;
  };
}

function snakeCaseToCamelCase(string) {
  return string.replace( /-([a-z])/ig, (_,letter) => letter.toUpperCase());
}