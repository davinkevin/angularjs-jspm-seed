import {RouteConfig, View, Component, Module, Service, Boot} from './decorators';
import angular from 'angular';

describe('Decorators', () => {

  describe('@View', () => {

    @View({ template : '<foo></foo>'})
    class ViewClass{}

    it('should have a view defined', () => {
      expect(ViewClass.$template).toBeDefined();
      expect(ViewClass.$template).toBe('<foo></foo>');
    });

  });

  describe('@RouteConfig', () => {
    @RouteConfig({path : '/val', as : 'valc'})
    @View({ template : '<foo></foo>'})
    class RouteClass{}

    it('should have static function to define route', () => {
      /* Given */
      let $routeProvider = jasmine.createSpyObj('$routeProvider', ['when']);

      /* When  */
      RouteClass.routeConfig($routeProvider);

      /* Then  */
      expect($routeProvider.when).toHaveBeenCalledWith('/val', { template: RouteClass.$template, controller: RouteClass, controllerAs : 'valc'});
    });

    @RouteConfig({path : '/val'})
    @View({ template : '<foo></foo>'})
    class RouteDefaultClass{}

    it('should have static function to define route with default attributes', () => {
      /* Given */
      let $routeProvider = jasmine.createSpyObj('$routeProvider', ['when']);

      /* When  */
      RouteDefaultClass.routeConfig($routeProvider);

      /* Then  */
      expect($routeProvider.when).toHaveBeenCalledWith('/val', { template: RouteDefaultClass.$template, controller: RouteDefaultClass, controllerAs : 'vm'});
    });

    describe('Error definitions', () => {
      it('should raise error if no template', () => {
        let wrappedRouteConfig = () => RouteConfig({path : '/val', as : 'valc'})({});
        expect(wrappedRouteConfig).toThrow();
      });
      it('should raise error if no path', () => {
        /* Given */
        let Target = {
          $template : '<div></div>'
        };

        /* When  */
        let wrappedRouteConfig = () => RouteConfig({as : 'Foo'})(Target);

        /* Then  */
        expect(wrappedRouteConfig).toThrow();
      });
    });

  });

  describe('@Component', () => {

    @Component({ selector : 'custom-selector', as : 'mic', restrict : 'AE', scope : false, bindToController : false})
    @View({ template : '<bar></bar>'})
    class ComponentClass{
      static link() {}
    }

    it('should have static component method with no default value', () => {
      expect(ComponentClass.component).toBeDefined();
      expect(ComponentClass.$directiveName).toBeDefined();
      expect(ComponentClass.$directiveName).toBe('customSelector');

      var componentDefinition = ComponentClass.component();
      expect(componentDefinition.restrict).toBe('AE');
      expect(componentDefinition.controllerAs).toBe('mic');
      expect(componentDefinition.scope).toBeFalsy();
      expect(componentDefinition.bindToController).toBeFalsy();
      expect(componentDefinition.link === angular.noop).toBeFalsy();
    });

    @Component({ selector : 'another-selector'})
    @View({ template : '<mop></mop>'})
    class ComponentDefaultClass{}

    it('should have static component define with default value', () => {
      expect(ComponentDefaultClass.component).toBeDefined();
      expect(ComponentDefaultClass.$directiveName).toBeDefined();
      expect(ComponentDefaultClass.$directiveName).toBe('anotherSelector');

      var componentDefinition = ComponentDefaultClass.component();
      expect(componentDefinition.restrict).toBe('E');
      expect(componentDefinition.controllerAs).toBe('vm');
      expect(componentDefinition.scope).toBeTruthy();
      expect(componentDefinition.bindToController).toBeTruthy();
      expect(componentDefinition.link).toBeUndefined();
    });

    describe('Error definitions', () => {
      it('should raise error if no template', () => {
        let wrappedRouteConfig = () => Component({})({});
        expect(wrappedRouteConfig).toThrow();
      });
      it('should raise error if no selector', () => {
        let object = { $template : '<div></div>' };
        let wrappedRouteConfig = () => Component({})(object);
        expect(wrappedRouteConfig).toThrow();
      });
    });

  });

  describe('@Service', () => {

    @Service('serviceName')
    class ServiceClazz{}

    it('should has name', () => {
      expect(ServiceClazz.$serviceName).toBe('serviceName');
    });

  });

  describe('@Module', () => {

    describe('@RouteConfig', () => {
      @Module({name : 'Foo', modules : ['Val1', {name : 'foo'}]})
      @RouteConfig({path : '/val', as : 'valc'})
      @View({ template : '<foo></foo>'})
      class RouteModuleClazz{}

      it('should create a module', () => {
        expect(RouteModuleClazz.$angularModule).toBeDefined();
        expect(RouteModuleClazz.$angularModule.name).toBe('Foo');
      });

    });
    describe('@Component', () => {
      @Module({name : 'Foo', modules : ['Val1', 'Val2']})
      @Component({ selector : 'custom-selector', as : 'mic', restrict : 'AE', scope : false, bindToController : false})
      @View({ template : '<foo></foo>'})
      class ComponentModuleClazz{}

      it('should create a module', () => {
        expect(ComponentModuleClazz.$angularModule).toBeDefined();
        expect(ComponentModuleClazz.$angularModule.name).toBe('Foo');
      });

    });
    describe('@Service', () => {
      @Module({name : 'Foo', modules : ['Val1', 'Val2']})
      @Service("FooService")
      class ComponentModuleClazz{}

      it('should create a module', () => {
        expect(ComponentModuleClazz.$angularModule).toBeDefined();
        expect(ComponentModuleClazz.$angularModule.name).toBe('Foo');
      });

    });
    describe('Registered inside another angular.module', () => {
      @Module({inject : angular.module('Foo', [])})
      @Component({ selector : 'custom-selector', as : 'mic', restrict : 'AE', scope : false, bindToController : false})
      @View({ template : '<foo></foo>'})
      class ComponentModuleClazz{}

      it('should create a module', () => {
        expect(ComponentModuleClazz.$angularModule).toBeDefined();
        expect(ComponentModuleClazz.$angularModule.name).toBe('Foo');
      });

    });
    describe('Errors on @nnotation usage', () => {
      it('should raise error if name and inject define', () => {
        let wrappedModuleAndInjectClazz = () => Module({name : 'Foo', inject : angular.module('Bar', [])})({});
        expect(wrappedModuleAndInjectClazz).toThrow();
      });

    });

  });

  describe('@Boot', () => {

    it('should produce on error on loack of @Module', () => {
      let wrappedApp = () => Boot({})({});
      expect(wrappedApp).toThrow();
    });
    @Boot({ element : angular.element('<foo></foo>'), strictDi : true})
    @Module({name : 'app'})
    class AppClazz {}

    it('should bootstrap the app', () => {
      expect(AppClazz).toBeDefined();
    });

  });

});