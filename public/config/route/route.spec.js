/**
 * angularjs-jspm-seed
 * Created by kdavin on 09/11/2015.
 */
import AppRouteConfig from './route';
import 'angular-mocks';
import angularRoute from 'angular-route';

describe('app.config.route', () => {

  let $routeProvider, $locationProvider;

  beforeEach(module(angularRoute, (_$routeProvider_, _$locationProvider_) => {
    $routeProvider = _$routeProvider_;
    $locationProvider = _$locationProvider_;

    spyOn($routeProvider, 'otherwise').and.callThrough();
    spyOn($locationProvider , 'html5Mode').and.callThrough();
  }));

  /* Init the module */
  beforeEach(module(AppRouteConfig.name));

  it('should define the default route', inject(() => {
    expect($routeProvider).toBeDefined();
    expect($routeProvider.otherwise).toHaveBeenCalledWith({redirectTo: '/'});
  }));

  it('should enable the html5mode', inject(() => {
    expect($locationProvider).toBeDefined();
    expect($locationProvider.html5Mode).toHaveBeenCalledWith(true);
  }));
});