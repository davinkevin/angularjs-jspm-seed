import angular from 'angular';
import {Module} from './decorators';
import Func1 from './messages/messages';
import Config from './config/config';

@Module({name : 'app', modules : [
  Func1.$angularModule.name,
  Config.$angularModule.name
]})
class App {

  constructor () {
    angular.element(document).ready(() =>  angular.bootstrap(document, [ App.$angularModule.name ], { strictDi: false }));
  }

}

export default new App();