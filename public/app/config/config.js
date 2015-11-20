import {Module} from '../decorators';
import Bootstrap from './bootstrap/bootstrap';
import RouteConfig from './route/route';

@Module({ name : 'app.config', modules : [Bootstrap.$angularModule.name, RouteConfig.$angularModule.name]})
class Config{}

export default Config;