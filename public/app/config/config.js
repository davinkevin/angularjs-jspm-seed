import {Module} from '../decorators';
import Bootstrap from './bootstrap/bootstrap';
import RouteConfig from './route/route';

@Module({ name : 'app.config', modules : [Bootstrap, RouteConfig]})
class Config{}

export default Config;