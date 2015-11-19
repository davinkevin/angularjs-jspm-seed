import MessageCtrl from './messages';
import template from './messages.html!text';
import 'angular-mocks';


describe("Message Component", () => {

  describe('Message Controller', () => {

    let mc, cls;

    beforeEach(() => {
      cls = { print : () => true };
      mc = new MessageCtrl(cls);
    });

    it('should have been inisialized', () => {
      expect(mc).toBeDefined();
      expect(mc.customeLogService).toEqual(cls);
      expect(mc.pageName).toEqual('An Angular Seed Project :D');
      expect(mc.messages).toBeArrayOfSize(0);
    });

    it('should push 4 value in array', () => {
      mc.populate();
      expect(mc.messages).toBeArrayOfSize(4);
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
        MessageCtrl.routeConfig($routeProvider);
        expect(route).toBe('/messages');
        expect(param.controllerAs).toBe('mc');
        expect(param.template).toBe(template);
      });
    });

  });
});
