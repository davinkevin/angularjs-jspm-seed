/**
 * angularjs-jspm-seed
 * Created by kdavin on 19/11/2015.
 */
import {Service, Module} from '../../decorators';

@Module({
  name : "app.common.services"
})
@Service("CustomLogService")
class CustomLogService {

  constructor ($log) {
    "ngInject";
    this.$log = $log;
  }

  print(message = "Hello World !!") {
    this.$log.info(message);
  }
}

export default CustomLogService;
