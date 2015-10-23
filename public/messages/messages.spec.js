import angular from 'angular';
import MessageCtrl from './messages.controller';
import routeConfig from './messages.route';
import messagesModule from './messages';

describe("Message Component", () => {

  describe('Message Controller', () => {

    let mc, $http;

    beforeEach(() => {
      $http = {};
      mc = new MessageCtrl($http);
    });

    it('should have been inisialized', () => {
      expect(mc).toBeDefined();
      expect(mc.$http).toEqual($http);
      expect(mc.pageName).toEqual('An Angular Seed Project :D');
      expect(mc.messages).toBeArrayOfSize(0);
    });

    it('should push 4 value in array', () => {
      mc.populate();
      expect(mc.messages).toBeArrayOfSize(4);
    });
  });

  describe('Message Route', () => {

    let $routeProvider, route, param;

    beforeEach(() => {
      $routeProvider = {
        when : function when(_route, _param) {
          route = _route;
          param = _param;
        }
      };
    });

    it('should publish route', () => {
      routeConfig($routeProvider);
      expect(route).toBe('/messages');
      expect(param.controller).toBe('Func1Ctrl');
      expect(param.controllerAs).toBe('mc');
      expect(param.controllerAs).toBeDefined();
    });

  });

  describe('Message Module', () => {
    it("should be named like", () => {
      expect(messagesModule.name).toBe('app.func1');
    });
  });

});
