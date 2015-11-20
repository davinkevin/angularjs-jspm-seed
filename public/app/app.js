import {Module, Boot} from './decorators';
import Func1 from './messages/messages';
import Config from './config/config';

@Boot({ element : document})
@Module({name : 'app', modules : [
  Func1, Config
]})
class App {}
export default App;