/**
  * angularjs-jspm-seed
  * Created by kdavin on 19/11/2015.
  */
import CustomLogService from './customLogService';

describe('CustomeLogService', () => {

  let $log, cls;

  beforeEach(() => {
    $log = jasmine.createSpyObj('$log', ['info']);
    cls = new CustomLogService($log);
  });

  it('should be init', () => {
      expect(cls.$log).toBeDefined();
  });

  it('should print', () => {
    cls.print("Foo");
    expect($log.info).toHaveBeenCalledWith("Foo");
  });

  it('should default print', () => {
    cls.print();
    expect($log.info).toHaveBeenCalledWith("Hello World !!");
  });

});
