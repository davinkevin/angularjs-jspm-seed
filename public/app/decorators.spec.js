import {RouteConfig, Component, Module, Service, Boot, Run, Directive} from './decorators';
import angular from 'angular';
import 'angular-route';

describe('Decorators', () => {

  describe('@RouteConfig', () => {

    it('should define route configuration', () => {
      @Boot({element: angular.element('<bar/>')})
      @Module({name: 'moduleWithRoute', modules: ['ngRoute']})
      @RouteConfig({path : '/val', as : 'valc', reloadOnSearch : false, resolve : {}, template: '<foo></foo>', foo: 'bar', bar: 'foo'})
      class RouteClass{}

      expect(RouteClass.routeConfig).toEqual(['/val', { template: '<foo></foo>', controller: RouteClass, controllerAs : 'valc', reloadOnSearch : false, resolve : {}, foo: 'bar', bar: 'foo'}]);
    });

    it('should define route configuration with default attributes', () => {
      @Boot({element: angular.element('<foo/>')})
      @Module({name: 'moduleWithRouteAndDefaultParams', modules: ['ngRoute']})
      @RouteConfig({path : '/val'})
      class RouteDefaultClass{}

      expect(RouteDefaultClass.routeConfig).toEqual([ '/val', { template: '', controller: RouteDefaultClass, controllerAs : 'vm', reloadOnSearch : true, resolve : {} } ]);
    });

    describe('Error definitions', () => {
      it('should raise error if no path', () => {
        /* Given */
        let Target = {};

        /* When  */
        let wrappedRouteConfig = () => RouteConfig({as : 'Foo'})(Target);

        /* Then  */
        expect(wrappedRouteConfig).toThrow();
      });
    });

  });

  describe('@Component', () => {

    it('should have static component method with no default value', () => {
      /* Given */
      @Component({ selector : 'custom-selector', as : 'mic', bindings : {foo: 'bar'}, template: '<bar></bar>'})
      class ComponentClass{}

      /* Then */
      expect(ComponentClass.$componentName).toBeDefined();
      expect(ComponentClass.$componentName).toBe('customSelector');
      expect(ComponentClass.component).toBeDefined();
      expect(ComponentClass.component.controllerAs).toBe('mic');
      expect(ComponentClass.component.bindings).toEqual({foo: 'bar'});
    });

    it('should have static component define with default value', () => {
      /* Given */
      @Component({ selector : 'another-selector'})
      class ComponentDefaultClass{}

      /* Then */
      expect(ComponentDefaultClass.$componentName).toBeDefined();
      expect(ComponentDefaultClass.$componentName).toBe('anotherSelector');
      expect(ComponentDefaultClass.component).toBeDefined();
      expect(ComponentDefaultClass.component.controllerAs).toBe('$ctrl');
      expect(ComponentDefaultClass.component.bindings).toEqual({});
    });

    describe('Error definitions', () => {
      it('should raise error if no selector', () => {
        let object = {};
        let wrappedComponentConfig = () => Component({})(object);
        expect(wrappedComponentConfig).toThrow();
      });
    });

  });

  describe('@Directive', () => {
    it('should have static directive method with no default value', () => {
      /* Given */
      @Directive({ selector : 'custom-selector', as : 'cd', bindToController : {foo: 'bar'}, require: 'ngModel', scope : false})
      class DirectiveClass{}

      /* Then */
      expect(DirectiveClass.$directiveName).toBeDefined();
      expect(DirectiveClass.$directiveName).toBe('customSelector');
      expect(DirectiveClass.directive).toBeDefined();
      expect(DirectiveClass.directive().controllerAs).toBe('cd');
      expect(DirectiveClass.directive().bindToController).toEqual({foo: 'bar'});
      expect(DirectiveClass.directive().require).toEqual('ngModel');
      expect(DirectiveClass.directive().scope).toEqual(false);
    });

    it('should have static directive define with default value', () => {
      /* Given */
      @Directive({ selector : 'custom-selector' })
      class DirectiveDefaultClass{}
      DirectiveDefaultClass.link = x => x;

      /* Then */
      expect(DirectiveDefaultClass.$directiveName).toBeDefined();
      expect(DirectiveDefaultClass.$directiveName).toBe('customSelector');
      expect(DirectiveDefaultClass.directive).toBeDefined();
      expect(DirectiveDefaultClass.directive().controllerAs).toBe('vm');
      expect(DirectiveDefaultClass.directive().bindToController).toEqual(true);
      expect(DirectiveDefaultClass.directive().require).toEqual('');
      expect(DirectiveDefaultClass.directive().scope).toEqual(true);
    });

    describe('Error definitions', () => {
      it('should raise error if no selector', () => {
        let object = {};
        let wrappedDirectiveConfig = () => Directive({})(object);
        expect(wrappedDirectiveConfig).toThrow();
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
      @RouteConfig({path : '/val', as : 'valc', template: '<foo></foo>'})
      class RouteModuleClazz{}

      it('should create a module', () => {
        expect(RouteModuleClazz.$angularModule).toBeDefined();
        expect(RouteModuleClazz.$angularModule.name).toBe('Foo');
      });
    });

    describe('@Component', () => {
      @Module({name : 'Foo', modules : ['Val1', 'Val2']})
      @Component({ selector : 'custom-selector', as : 'mic', bindings : {}, template: '<foo></foo>'})
      class ComponentModuleClazz{}

      it('should create a module', () => {
        expect(ComponentModuleClazz.$angularModule).toBeDefined();
        expect(ComponentModuleClazz.$angularModule.name).toBe('Foo');
      });
    });

    describe('@Directive', () => {
      @Module({name : 'Foo', modules : ['Val1', 'Val2']})
      @Directive({ selector : 'custom-selector', as : 'mic' })
      class DirectiveModuleClazz{}

      it('should create a module', () => {
        expect(DirectiveModuleClazz.$angularModule).toBeDefined();
        expect(DirectiveModuleClazz.$angularModule.name).toBe('Foo');
      });
    });

    describe('@Service', () => {
      @Module({name : 'Foo', modules : ['Val1', 'Val2']})
      @Service("FooService")
      class ServiceModuleClazz{}

      it('should create a module', () => {
        expect(ServiceModuleClazz.$angularModule).toBeDefined();
        expect(ServiceModuleClazz.$angularModule.name).toBe('Foo');
      });
    });

    describe('Depends on an angularjs module defined as the default exported ES6 module class', () => {
      @Module({name: 'Foo', modules: [{default: 'myFakeDefaultES6ModuleExport'}]})
      class ModuleWithDefaultES6Dependency {}

      it('should create a module', () => {
        expect(ModuleWithDefaultES6Dependency.$angularModule).toBeDefined();
        expect(ModuleWithDefaultES6Dependency.$angularModule.name).toBe('Foo');
      });
    });

    describe('Registered inside another angular.module', () => {
      @Module({inject : angular.module('Foo', [])})
      @Component({ selector : 'custom-selector', as : 'mic', bindings : {}, template: '<foo></foo>'})
      class ComponentModuleClazz{}

      it('should create a module', () => {
        expect(ComponentModuleClazz.$angularModule).toBeDefined();
        expect(ComponentModuleClazz.$angularModule.name).toBe('Foo');
      });

      it('should create a module', () => {
        @Module({inject : ComponentModuleClazz })
        @Component({ selector : 'custom-selector', as : 'mic', bindings : {}, template: '<foo></foo>'})
        class SubComponentModuleClazz{}

        expect(SubComponentModuleClazz.$angularModule).toBeDefined();
        expect(SubComponentModuleClazz.$angularModule.name).toBe('Foo');
      });
    });

    describe('Errors on @nnotation usage', () => {
      it('should raise error if name and inject define', () => {
        let wrappedModuleAndInjectClazz = () => Module({name : 'Foo', inject : angular.module('Bar', [])})({});
        expect(wrappedModuleAndInjectClazz).toThrow();
      });

    });

    describe('@Run', () => {
      it('should invoke run fonctions', () => {
        /* Given */
        let foo;
        let bar;
        @Module({name: 'Foo'})
        @Run(() => { foo = 'foo'; })
        class ClazzWithRun{
          @Run()
          static toRun(){ bar = 'bar'; }
        }

        /* When */
        angular.bootstrap(angular.element('<bar></bar>'), ['Foo']);

        /* Then */
        expect(foo).toEqual('foo');
        expect(bar).toEqual('bar');
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