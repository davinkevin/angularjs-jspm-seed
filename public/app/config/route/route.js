import {Module, Config} from '../../decorators.js';
import angularRoute from 'angular-route';

@Module({name : 'app.config.route', modules : [angularRoute]})
@Config(
    $routeProvider => { "ngInject"; $routeProvider.otherwise({redirectTo: '/'}); }
)
@Config(
    $locationProvider => { "ngInject"; $locationProvider.html5Mode(true); }
)
class RouteConfig {}
export default RouteConfig;