/**
 * angularjs-jspm-seed
 * Created by kdavin on 09/11/2015.
 */
import AppRouteConfig from './route';

describe('app.config.route', () => {

  let $routeProvider, $locationProvider;

  beforeEach(() => {
    $routeProvider = jasmine.createSpyObj('$routeProvider', ['otherwise']);
    $locationProvider = jasmine.createSpyObj('$locationProvider', ['html5Mode']);
  });

  it('should define the default route', () => {
    AppRouteConfig.$config[1]($routeProvider);
    expect($routeProvider.otherwise).toHaveBeenCalledWith({redirectTo: '/'});
  });

  it('should enable the html5mode', () => {
    AppRouteConfig.$config[0]($locationProvider);
    expect($locationProvider.html5Mode).toHaveBeenCalledWith(true);
  });

});