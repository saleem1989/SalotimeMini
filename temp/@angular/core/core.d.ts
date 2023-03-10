/**
 * @license Angular v8.0.3
 * (c) 2010-2019 Google LLC. https://angular.io/
 * License: MIT
 */

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

/**
 * @description
 *
 * Represents an abstract class `T`, if applied to a concrete class it would stop being
 * instantiatable.
 *
 * @publicApi
 */
export declare interface AbstractType<T> extends Function {
    prototype: T;
}

/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
declare const ACTIVE_INDEX = 2;

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking all content of a directive.
 *
 * @see `AfterViewChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * @publicApi
 */
export declare interface AfterContentChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed checking all of the directive's
     * content.
     */
    ngAfterContentChecked(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * all content of a directive.
 * Define an `ngAfterContentInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterViewInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own content initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * @publicApi
 */
export declare interface AfterContentInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    ngAfterContentInit(): void;
}

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking a component's view for changes.
 *
 * @see `AfterContentChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * @publicApi
 */
export declare interface AfterViewChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed one change-check cycle
     * for a component's view.
     */
    ngAfterViewChecked(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * a component's view.
 * Define an `ngAfterViewInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own view initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * @publicApi
 */
export declare interface AfterViewInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     *
     */
    ngAfterViewInit(): void;
}

/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * @usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @publicApi
 */
export declare const ANALYZE_FOR_ENTRY_COMPONENTS: InjectionToken<any>;

/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @publicApi
 */
export declare const APP_BOOTSTRAP_LISTENER: InjectionToken<((compRef: ComponentRef<any>) => void)[]>;

/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated ViewEncapsulation.Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @publicApi
 */
export declare const APP_ID: InjectionToken<string>;

/**
 * A function that will be executed when an application is initialized.
 *
 * @publicApi
 */
export declare const APP_INITIALIZER: InjectionToken<(() => void)[]>;

/**
 * A class that reflects the state of running {@link APP_INITIALIZER}s.
 *
 * @publicApi
 */
export declare class ApplicationInitStatus {
    private appInits;
    private resolve;
    private reject;
    private initialized;
    readonly donePromise: Promise<any>;
    readonly done = false;
    constructor(appInits: (() => any)[]);
}

/**
 * Configures the root injector for an app with
 * providers of `@angular/core` dependencies that `ApplicationRef` needs
 * to bootstrap components.
 *
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * @publicApi
 */
export declare class ApplicationModule {
    constructor(appRef: ApplicationRef);
}

/**
 * A reference to an Angular application running on a page.
 *
 * @usageNotes
 *
 * {@a is-stable-examples}
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * @publicApi
 */
export declare class ApplicationRef {
    private _zone;
    private _console;
    private _injector;
    private _exceptionHandler;
    private _componentFactoryResolver;
    private _initStatus;
    private _bootstrapListeners;
    private _views;
    private _runningTick;
    private _enforceNoNewChanges;
    private _stable;
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     */
    readonly componentTypes: Type<any>[];
    /**
     * Get a list of components registered to this application.
     */
    readonly components: ComponentRef<any>[];
    /**
     * Returns an Observable that indicates when the application is stable or unstable.
     *
     * @see  [Usage notes](#is-stable-examples) for examples and caveats when using this API.
     */
    readonly isStable: Observable<boolean>;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * @usageNotes
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the componentType's
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * Optionally, a component can be mounted onto a DOM element that does not match the
     * componentType's selector.
     *
     * ### Example
     * {@example core/ts/platform/platform.ts region='longform'}
     */
    bootstrap<C>(componentOrFactory: ComponentFactory<C> | Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C>;
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    tick(): void;
    /**
     * Attaches a view so that it will be dirty checked.
     * The view will be automatically detached when it is destroyed.
     * This will throw if the view is already attached to a ViewContainer.
     */
    attachView(viewRef: ViewRef): void;
    /**
     * Detaches a view from dirty checking again.
     */
    detachView(viewRef: ViewRef): void;
    private _loadComponent;
    private _unloadComponent;
    /**
     * Returns the number of attached views.
     */
    readonly viewCount: number;
}

/**
 * @publicApi
 */
export declare function asNativeElements(debugEls: DebugElement[]): any;

/**
 * Checks that there currently is a platform which contains the given token as a provider.
 *
 * @publicApi
 */
export declare function assertPlatform(requiredToken: any): PlatformRef;

/**
 * Type of the Attribute metadata.
 *
 * @publicApi
 */
export declare interface Attribute {
    /**
     * The name of the attribute whose value can be injected.
     */
    attributeName?: string;
}

/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Attribute: AttributeDecorator;

/**
 * Type of the Attribute decorator / constructor function.
 *
 * @publicApi
 */
export declare interface AttributeDecorator {
    /**
     * A parameter decorator for a directive constructor that designates
     * a host-element attribute whose value is injected as a constant string literal.
     *
     * @usageNotes
     *
     * Suppose we have an `<input>` element and want to know its `type`.
     *
     * ```html
     * <input type="text">
     * ```
     *
     * The following example uses the decorator to inject the string literal `text`.
     *
     * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
     *
     * ### Example as TypeScript Decorator
     *
     * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
     *
     */
    (name: string): any;
    new (name: string): Attribute;
}

declare const BINDING_INDEX = 7;

declare interface BindingDef {
    flags: ??BindingFlags;
    ns: string | null;
    name: string | null;
    nonMinifiedName: string | null;
    securityContext: SecurityContext | null;
    suffix: string | null;
}

declare interface BindingStore {
    setValue(prop: string, value: any): void;
}

declare const enum BindingType {
    Unset = 0,
    Class = 1,
    Style = 2
}

/**
 * Provides additional options to the bootstraping process.
 *
 *
 */
declare interface BootstrapOptions {
    /**
     * Optionally specify which `NgZone` should be used.
     *
     * - Provide your own `NgZone` instance.
     * - `zone.js` - Use default `NgZone` which requires `Zone.js`.
     * - `noop` - Use `NoopNgZone` which does nothing.
     */
    ngZone?: NgZone | 'zone.js' | 'noop';
}


declare const BRAND = "__SANITIZER_TRUSTED_BRAND__";

declare const enum BypassType {
    Url = "Url",
    Html = "Html",
    ResourceUrl = "ResourceUrl",
    Script = "Script",
    Style = "Style"
}


/**
 * The strategy that the default change detector uses to detect changes.
 * When set, takes effect the next time change detection is triggered.
 *
 * @publicApi
 */
export declare enum ChangeDetectionStrategy {
    /**
     * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
     * until reactivated by setting the strategy to `Default` (`CheckAlways`).
     * Change detection can still be explicitly invoked.
     * This strategy applies to all child directives and cannot be overridden.
     */
    OnPush = 0,
    /**
     * Use the default `CheckAlways` strategy, in which change detection is automatic until
     * explicitly deactivated.
     */
    Default = 1
}

/**
 * Base class for Angular Views, provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be rerendered.
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](http://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="reattach"></code-example>
 *
 * @publicApi
 */
export declare abstract class ChangeDetectorRef {
    /**
     * When a view uses the {@link ChangeDetectionStrategy#OnPush OnPush} (checkOnce)
     * change detection strategy, explicitly marks the view as changed so that
     * it can be checked again.
     *
     * Components are normally marked as dirty (in need of rerendering) when inputs
     * have changed or events have fired in the view. Call this method to ensure that
     * a component is checked even if these triggers have not occured.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     */
    abstract markForCheck(): void;
    /**
     * Detaches this view from the change-detection tree.
     * A detached view is  not checked until it is reattached.
     * Use in combination with `detectChanges()` to implement local change detection checks.
     *
     * Detached views are not checked during change detection runs until they are
     * re-attached, even if they are marked as dirty.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detach(): void;
    /**
     * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach
     * detach}
     * to implement local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * Use in development mode to verify that running change detection doesn't introduce
     * other changes.
     */
    abstract checkNoChanges(): void;
    /**
     * Re-attaches the previously detached view to the change detection tree.
     * Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     */
    abstract reattach(): void;
}

declare const CHILD_HEAD = 14;

declare const CHILD_TAIL = 15;

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ClassProvider extends ClassSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useClass` function.
 * Base for `ClassProvider` decorator.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @publicApi
 */
export declare interface ClassSansProvider {
    /**
     * Class to instantiate for the `token`.
     */
    useClass: Type<any>;
}

declare const CLEANUP = 8;

/**
 * @deprecated v4.0.0 - Use IterableChangeRecord instead.
 * @publicApi
 */
export declare interface CollectionChangeRecord<V> extends IterableChangeRecord<V> {
}

/**
 * Marks that the next string is for comment.
 *
 * See `I18nMutateOpCodes` documentation.
 */
declare const COMMENT_MARKER: COMMENT_MARKER;

declare interface COMMENT_MARKER {
    marker: 'comment';
}

/**
 * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
 * `ngInjectableDef` onto the injectable type.
 */
declare function compileInjectable(type: Type<any>, srcMeta?: Injectable): void;

/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 */
export declare class Compiler {
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents` have to be inlined.
     */
    compileModuleSync: <T>(moduleType: Type<T>) => NgModuleFactory<T>;
    /**
     * Compiles the given NgModule and all of its components
     */
    compileModuleAsync: <T>(moduleType: Type<T>) => Promise<NgModuleFactory<T>>;
    /**
     * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsSync: <T>(moduleType: Type<T>) => ModuleWithComponentFactories<T>;
    /**
     * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
     */
    compileModuleAndAllComponentsAsync: <T>(moduleType: Type<T>) => Promise<ModuleWithComponentFactories<T>>;
    /**
     * Clears all caches.
     */
    clearCache(): void;
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type: Type<any>): void;
    /**
     * Returns the id for a given NgModule, if one is defined and known to the compiler.
     */
    getModuleId(moduleType: Type<any>): string | undefined;
}

/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
export declare const COMPILER_OPTIONS: InjectionToken<CompilerOptions[]>;

/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
export declare abstract class CompilerFactory {
    abstract createCompiler(options?: CompilerOptions[]): Compiler;
}

/**
 * Options for creating a compiler
 *
 * @publicApi
 */
export declare type CompilerOptions = {
    useJit?: boolean;
    defaultEncapsulation?: ViewEncapsulation;
    providers?: StaticProvider[];
    missingTranslation?: MissingTranslationStrategy;
    preserveWhitespaces?: boolean;
};

/**
 * Supplies configuration metadata for an Angular component.
 *
 * @publicApi
 */
export declare interface Component extends Directive {
    /**
     * The change-detection strategy to use for this component.
     *
     * When a component is instantiated, Angular creates a change detector,
     * which is responsible for propagating the component's bindings.
     * The strategy is one of:
     * - `ChangeDetectionStrategy#OnPush` sets the strategy to `CheckOnce` (on demand).
     * - `ChangeDetectionStrategy#Default` sets the strategy to `CheckAlways`.
     */
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Defines the set of injectable objects that are visible to its view DOM children.
     * See [example](#injecting-a-class-with-a-view-provider).
     *
     */
    viewProviders?: Provider[];
    /**
     * The module ID of the module that contains the component.
     * The component must be able to resolve relative URLs for templates and styles.
     * SystemJS exposes the `__moduleName` variable within each module.
     * In CommonJS, this can  be set to `module.id`.
     *
     */
    moduleId?: string;
    /**
     * The relative path or absolute URL of a template file for an Angular component.
     * If provided, do not supply an inline template using `template`.
     *
     */
    templateUrl?: string;
    /**
     * An inline template for an Angular component. If provided,
     * do not supply a template file using `templateUrl`.
     *
     */
    template?: string;
    /**
     * One or more relative paths or absolute URLs for files containing CSS stylesheets to use
     * in this component.
     */
    styleUrls?: string[];
    /**
     * One or more inline CSS stylesheets to use
     * in this component.
     */
    styles?: string[];
    /**
     * One or more animation `trigger()` calls, containing
     * `state()` and `transition()` definitions.
     * See the [Animations guide](/guide/animations) and animations API documentation.
     *
     */
    animations?: any[];
    /**
     * An encapsulation policy for the template and CSS styles. One of:
     * - `ViewEncapsulation.Native`: Deprecated. Use `ViewEncapsulation.ShadowDom` instead.
     * - `ViewEncapsulation.Emulated`: Use shimmed CSS that
     * emulates the native behavior.
     * - `ViewEncapsulation.None`: Use global CSS without any
     * encapsulation.
     * - `ViewEncapsulation.ShadowDom`: Use Shadow DOM v1 to encapsulate styles.
     *
     * If not supplied, the value is taken from `CompilerOptions`. The default compiler option is
     * `ViewEncapsulation.Emulated`.
     *
     * If the policy is set to `ViewEncapsulation.Emulated` and the component has no `styles`
     * or `styleUrls` specified, the policy is automatically switched to `ViewEncapsulation.None`.
     */
    encapsulation?: ViewEncapsulation;
    /**
     * Overrides the default encapsulation start and end delimiters (`{{` and `}}`)
     */
    interpolation?: [string, string];
    /**
     * A set of components that should be compiled along with
     * this component. For each component listed here,
     * Angular creates a {@link ComponentFactory} and stores it in the
     * {@link ComponentFactoryResolver}.
     */
    entryComponents?: Array<Type<any> | any[]>;
    /**
     * True to preserve or false to remove potentially superfluous whitespace characters
     * from the compiled template. Whitespace characters are those matching the `\s`
     * character class in JavaScript regular expressions. Default is false, unless
     * overridden in compiler options.
     */
    preserveWhitespaces?: boolean;
}

/**
 * Component decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Component: ComponentDecorator;

/**
 * Component decorator interface
 *
 * @publicApi
 */
export declare interface ComponentDecorator {
    /**
     * Decorator that marks a class as an Angular component and provides configuration
     * metadata that determines how the component should be processed,
     * instantiated, and used at runtime.
     *
     * Components are the most basic UI building block of an Angular app.
     * An Angular app contains a tree of Angular components.
     *
     * Angular components are a subset of directives, always associated with a template.
     * Unlike other directives, only one component can be instantiated per an element in a template.
     *
     * A component must belong to an NgModule in order for it to be available
     * to another component or application. To make it a member of an NgModule,
     * list it in the `declarations` field of the `NgModule` metadata.
     *
     * Note that, in addition to these options for configuring a directive,
     * you can control a component's runtime behavior by implementing
     * life-cycle hooks. For more information, see the
     * [Lifecycle Hooks](guide/lifecycle-hooks) guide.
     *
     * @usageNotes
     *
     * ### Setting component inputs
     *
     * The following example creates a component with two data-bound properties,
     * specified by the `inputs` value.
     *
     * <code-example path="core/ts/metadata/directives.ts" region="component-input">
     * </code-example>
     *
     *
     * ### Setting component outputs
     *
     * The following example shows two event emitters that emit on an interval. One
     * emits an output every second, while the other emits every five seconds.
     *
     * {@example core/ts/metadata/directives.ts region='component-output-interval'}
     *
     * ### Injecting a class with a view provider
     *
     * The following simple example injects a class into a component
     * using the view provider specified in component metadata:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'needs-greeter'
     * })
     * class NeedsGreeter {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     *
     * @Component({
     *   selector: 'greet',
     *   viewProviders: [
     *     Greeter
     *   ],
     *   template: `<needs-greeter></needs-greeter>`
     * })
     * class HelloWorld {
     * }
     *
     * ```
     *
     * ### Preserving whitespace
     *
     * Removing whitespace can greatly reduce AOT-generated code size and speed up view creation.
     * As of Angular 6, the default for `preserveWhitespaces` is false (whitespace is removed).
     * To change the default setting for all components in your application, set
     * the `preserveWhitespaces` option of the AOT compiler.
     *
     * By default, the AOT compiler removes whitespace characters as follows:
     * * Trims all whitespaces at the beginning and the end of a template.
     * * Removes whitespace-only text nodes. For example,
     *
     * ```
     * <button>Action 1</button>  <button>Action 2</button>
     * ```
     *
     * becomes:
     *
     * ```
     * <button>Action 1</button><button>Action 2</button>
     * ```
     *
     * * Replaces a series of whitespace characters in text nodes with a single space.
     * For example, `<span>\n some text\n</span>` becomes `<span> some text </span>`.
     * * Does NOT alter text nodes inside HTML tags such as `<pre>` or `<textarea>`,
     * where whitespace characters are significant.
     *
     * Note that these transformations can influence DOM nodes layout, although impact
     * should be minimal.
     *
     * You can override the default behavior to preserve whitespace characters
     * in certain fragments of a template. For example, you can exclude an entire
     * DOM sub-tree by using the `ngPreserveWhitespaces` attribute:
     *
     * ```html
     * <div ngPreserveWhitespaces>
     *     whitespaces are preserved here
     *     <span>    and here </span>
     * </div>
     * ```
     *
     * You can force a single space to be preserved in a text node by using `&ngsp;`,
     * which is replaced with a space character by Angular's template
     * compiler:
     *
     * ```html
     * <a>Spaces</a>&ngsp;<a>between</a>&ngsp;<a>links.</a>
     * <!-->compiled to be equivalent to:</>
     *  <a>Spaces</a> <a>between</a> <a>links.</a>
     * ```
     *
     * Note that sequences of `&ngsp;` are still collapsed to just one space character when
     * the `preserveWhitespaces` option is set to `false`.
     *
     * ```html
     * <a>before</a>&ngsp;&ngsp;&ngsp;<a>after</a>
     * <!-->compiled to be equivalent to:</>
     *  <a>Spaces</a> <a>between</a> <a>links.</a>
     * ```
     *
     * To preserve sequences of whitespace characters, use the
     * `ngPreserveWhitespaces` attribute.
     *
     * @Annotation
     */
    (obj: Component): TypeDecorator;
    /**
     * See the `Component` decorator.
     */
    new (obj: Component): Component;
}

declare interface ComponentDefFeature {
    <T>(componentDef: ??ComponentDef<T>): void;
    /**
     * Marks a feature as something that {@link InheritDefinitionFeature} will execute
     * during inheritance.
     *
     * NOTE: DO NOT SET IN ROOT OF MODULE! Doing so will result in tree-shakers/bundlers
     * identifying the change as a side effect, and the feature will be included in
     * every bundle.
     */
    ngInherit?: true;
}

/**
 * @publicApi
 */
declare abstract class ComponentFactory<C> {
    /**
     * The component's HTML selector.
     */
    abstract readonly selector: string;
    /**
     * The component's type
     */
    abstract readonly componentType: Type<any>;
    /**
     * Selector for all <ng-content> elements in the component.
     */
    abstract readonly ngContentSelectors: string[];
    /**
     * The inputs of the component.
     */
    abstract readonly inputs: {
        propName: string;
        templateName: string;
    }[];
    /**
     * The outputs of the component.
     */
    abstract readonly outputs: {
        propName: string;
        templateName: string;
    }[];
    /**
     * Creates a new component.
     */
    abstract create(injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string | any, ngModule?: NgModuleRef<any>): ComponentRef<C>;
}
export { ComponentFactory }
export { ComponentFactory as ??ComponentFactory }

/**
 * @publicApi
 */
export declare abstract class ComponentFactoryResolver {
    static NULL: ComponentFactoryResolver;
    abstract resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
}

declare type ComponentInstance = {};

/**
 * Represents a component created by a `ComponentFactory`.
 * Provides access to the component instance and related objects,
 * and provides the means of destroying the instance.
 *
 * @publicApi
 */
export declare abstract class ComponentRef<C> {
    /**
     * The host or anchor [element](guide/glossary#element) for this component instance.
     */
    abstract readonly location: ElementRef;
    /**
     * The [dependency injector](guide/glossary#injector) for this component instance.
     */
    abstract readonly injector: Injector;
    /**
     * This component instance.
     */
    abstract readonly instance: C;
    /**
     * The [host view](guide/glossary#view-tree) defined by the template
     * for this component instance.
     */
    abstract readonly hostView: ViewRef;
    /**
     * The change detector for this component instance.
     */
    abstract readonly changeDetectorRef: ChangeDetectorRef;
    /**
     * The component type.
     */
    abstract readonly componentType: Type<any>;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for the component.
     * @param callback A handler function that cleans up developer-defined data
     * associated with this component. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): void;
}

/**
 * Definition of what a template rendering function should look like for a component.
 */
declare type ComponentTemplate<T> = {
    <U extends T>(rf: ??RenderFlags, ctx: T | U): void;
    ngPrivateData?: never;
};

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface ConstructorProvider extends ConstructorSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: Type<any>;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * ```
 * @Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * @publicApi
 */
export declare interface ConstructorSansProvider {
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     */
    deps?: any[];
}

declare const CONTENT_QUERIES = 16;

/**
 * Type of the ContentChild metadata.
 *
 * @publicApi
 */
export declare type ContentChild = Query;

/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
export declare const ContentChild: ContentChildDecorator;

/**
 * Type of the ContentChild decorator / constructor function.
 *
 * @publicApi
 */
export declare interface ContentChildDecorator {
    /**
     * Configures a content query.
     *
     * You can use ContentChild to get the first element or the directive matching the selector from
     * the content DOM. If the content DOM changes, and a new child matches the selector,
     * the property will be updated.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - the directive type or the name used for querying.
     * * **read** - read a different token from the queried element.
     * * **static** - whether or not to resolve query results before change detection runs (i.e.
     * return static results only). If this option is not provided, the compiler will fall back
     * to its default behavior, which is to use query results to determine the timing of query
     * resolution. If any query results are inside a nested view (e.g. *ngIf), the query will be
     * resolved after change detection runs. Otherwise, it will be resolved before change detection
     * runs.
     *
     * @usageNotes
     * ### Example
     *
     * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
     *
     * ### Example
     *
     * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): any;
    new (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): ContentChild;
}

/**
 * Type of the ContentChildren metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare type ContentChildren = Query;

/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare const ContentChildren: ContentChildrenDecorator;

/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see `ContentChildren`.
 * @publicApi
 */
export declare interface ContentChildrenDecorator {
    /**
     * Configures a content query.
     *
     * You can use ContentChildren to get the `QueryList` of elements or directives from the
     * content DOM. Any time a child element is added, removed, or moved, the query list will be
     * updated, and the changes observable of the query list will emit a new value.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - the directive type or the name used for querying.
     * * **descendants** - include only direct children or all descendants.
     * * **read** - read a different token from the queried elements.
     *
     * @usageNotes
     * ### Basic Example
     *
     * Here is a simple demonstration of how the `ContentChildren` decorator can be used.
     *
     * {@example core/di/ts/contentChildren/content_children_howto.ts region='HowTo'}
     *
     * ### Tab-pane Example
     *
     * Here is a slightly more realistic example that shows how `ContentChildren` decorators
     * can be used to implement a tab pane component.
     *
     * {@example core/di/ts/contentChildren/content_children_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
    }): any;
    new (selector: Type<any> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
    }): Query;
}

/**
 * Definition of what a content queries function should look like.
 */
declare type ContentQueriesFunction<T> = <U extends T>(rf: ??RenderFlags, ctx: U, directiveIndex: number) => void;

declare const CONTEXT = 9;

/** Options that control how the component should be bootstrapped. */
declare interface CreateComponentOptions {
    /** Which renderer factory to use. */
    rendererFactory?: RendererFactory3;
    /** A custom sanitizer instance */
    sanitizer?: Sanitizer;
    /** A custom animation player handler */
    playerHandler?: ??PlayerHandler;
    /**
     * Host element on which the component will be bootstrapped. If not specified,
     * the component definition's `tag` is used to query the existing DOM for the
     * element to bootstrap.
     */
    host?: RElement | string;
    /** Module injector for the component. If unspecified, the injector will be NULL_INJECTOR. */
    injector?: Injector;
    /**
     * List of features to be applied to the created component. Features are simply
     * functions that decorate a component with a certain behavior.
     *
     * Typically, the features in this list are features that cannot be added to the
     * other features list in the component definition because they rely on other factors.
     *
     * Example: `RootLifecycleHooks` is a function that adds lifecycle hook capabilities
     * to root components in a tree-shakable way. It cannot be added to the component
     * features list because there's no way of knowing when the component will be used as
     * a root component.
     */
    hostFeatures?: HostFeature[];
    /**
     * A function which is used to schedule change detection work in the future.
     *
     * When marking components as dirty, it is necessary to schedule the work of
     * change detection in the future. This is done to coalesce multiple
     * {@link markDirty} calls into a single changed detection processing.
     *
     * The default value of the scheduler is the `requestAnimationFrame` function.
     *
     * It is also useful to override this function for testing purposes.
     */
    scheduler?: (work: () => void) => void;
}

/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @publicApi
 */
export declare function createPlatform(injector: Injector): PlatformRef;

/**
 * Creates a factory for a platform
 *
 * @publicApi
 */
export declare function createPlatformFactory(parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null, name: string, providers?: StaticProvider[]): (extraProviders?: StaticProvider[]) => PlatformRef;


/**
 * Expresses a single CSS Selector.
 *
 * Beginning of array
 * - First index: element name
 * - Subsequent odd indices: attr keys
 * - Subsequent even indices: attr values
 *
 * After SelectorFlags.CLASS flag
 * - Class name values
 *
 * SelectorFlags.NOT flag
 * - Changes the mode to NOT
 * - Can be combined with other flags to set the element / attr / class mode
 *
 * e.g. SelectorFlags.NOT | SelectorFlags.ELEMENT
 *
 * Example:
 * Original: `div.foo.bar[attr1=val1][attr2]`
 * Parsed: ['div', 'attr1', 'val1', 'attr2', '', SelectorFlags.CLASS, 'foo', 'bar']
 *
 * Original: 'div[attr1]:not(.foo[attr2])
 * Parsed: [
 *  'div', 'attr1', '',
 *  SelectorFlags.NOT | SelectorFlags.ATTRIBUTE 'attr2', '', SelectorFlags.CLASS, 'foo'
 * ]
 *
 * See more examples in node_selector_matcher_spec.ts
 */
declare type CssSelector = (string | SelectorFlags)[];

/**
 * Defines a schema that allows an NgModule to contain the following:
 * - Non-Angular elements named with dash case (`-`).
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 * @publicApi
 */
export declare const CUSTOM_ELEMENTS_SCHEMA: SchemaMetadata;

/**
 * @publicApi
 */
export declare interface DebugElement extends DebugNode {
    readonly name: string;
    readonly properties: {
        [key: string]: any;
    };
    readonly attributes: {
        [key: string]: string | null;
    };
    readonly classes: {
        [key: string]: boolean;
    };
    readonly styles: {
        [key: string]: string | null;
    };
    readonly childNodes: DebugNode[];
    readonly nativeElement: any;
    readonly children: DebugElement[];
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    triggerEventHandler(eventName: string, eventObj: any): void;
}

/**
 * @publicApi
 */
export declare const DebugElement: {
    new (...args: any[]): DebugElement;
};

declare class DebugElement__POST_R3__ extends DebugNode__POST_R3__ implements DebugElement {
    constructor(nativeNode: Element);
    readonly nativeElement: Element | null;
    readonly name: string;
    /**
     *  Gets a map of property names to property values for an element.
     *
     *  This map includes:
     *  - Regular property bindings (e.g. `[id]="id"`)
     *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
     *  - Interpolated property bindings (e.g. `id="{{ value }}")
     *
     *  It does not include:
     *  - input property bindings (e.g. `[myCustomInput]="value"`)
     *  - attribute bindings (e.g. `[attr.role]="menu"`)
     */
    readonly properties: {
        [key: string]: any;
    };
    readonly attributes: {
        [key: string]: string | null;
    };
    readonly classes: {
        [key: string]: boolean;
    };
    readonly styles: {
        [key: string]: string | null;
    };
    readonly childNodes: DebugNode[];
    readonly children: DebugElement[];
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    triggerEventHandler(eventName: string, eventObj: any): void;
}

/**
 * @publicApi
 */
export declare class DebugEventListener {
    name: string;
    callback: Function;
    constructor(name: string, callback: Function);
}

/**
 * @publicApi
 */
export declare interface DebugNode {
    readonly listeners: DebugEventListener[];
    readonly parent: DebugElement | null;
    readonly nativeNode: any;
    readonly injector: Injector;
    readonly componentInstance: any;
    readonly context: any;
    readonly references: {
        [key: string]: any;
    };
    readonly providerTokens: any[];
}

/**
 * @publicApi
 */
export declare const DebugNode: {
    new (...args: any[]): DebugNode;
};

declare class DebugNode__POST_R3__ implements DebugNode {
    readonly nativeNode: Node;
    constructor(nativeNode: Node);
    readonly parent: DebugElement | null;
    readonly injector: Injector;
    readonly componentInstance: any;
    readonly context: any;
    readonly listeners: DebugEventListener[];
    readonly references: {
        [key: string]: any;
    };
    readonly providerTokens: any[];
}

declare const DECLARATION_VIEW = 17;

/**
 * @deprecated v4.0.0 - Should not be part of public API.
 * @publicApi
 */
export declare class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
    readonly length: number;
    readonly collection: V[] | Iterable<V> | null;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    private _identityChangesHead;
    private _identityChangesTail;
    private _trackByFn;
    constructor(trackByFn?: TrackByFunction<V>);
    forEachItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachOperation(fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
    forEachPreviousItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachAddedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachMovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachRemovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
    forEachIdentityChange(fn: (record: IterableChangeRecord_<V>) => void): void;
    diff(collection: NgIterable<V>): DefaultIterableDiffer<V> | null;
    onDestroy(): void;
    check(collection: NgIterable<V>): boolean;
    readonly isDirty: boolean;
    private _addToRemovals;
}

/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ????defineInjectable instead.
 * @publicApi
 */
export declare const defineInjectable: typeof ????defineInjectable;

declare interface Definition<DF extends DefinitionFactory<any>> {
    factory: DF | null;
}

/**
 * Factory for ViewDefinitions/NgModuleDefinitions.
 * We use a function so we can reexeute it in case an error happens and use the given logger
 * function to log the error from the definition of the node, which is shown in all browser
 * logs.
 */
declare interface DefinitionFactory<D extends Definition<any>> {
    (logger: NodeLogger): D;
}

declare interface DepDef {
    flags: ??DepFlags;
    token: any;
    tokenKey: string;
}

/**
 * Destroy the existing platform.
 *
 * @publicApi
 */
export declare function destroyPlatform(): void;

/**
 * Directive decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare interface Directive {
    /**
     * The CSS selector that identifies this directive in a template
     * and triggers instantiation of the directive.
     *
     * Declare as one of the following:
     *
     * - `element-name`: Select by element name.
     * - `.class`: Select by class name.
     * - `[attribute]`: Select by attribute name.
     * - `[attribute=value]`: Select by attribute name and value.
     * - `:not(sub_selector)`: Select only if the element does not match the `sub_selector`.
     * - `selector1, selector2`: Select if either `selector1` or `selector2` matches.
     *
     * Angular only allows directives to apply on CSS selectors that do not cross
     * element boundaries.
     *
     * For the following template HTML, a directive with an `input[type=text]` selector,
     * would be instantiated only on the `<input type="text">` element.
     *
     * ```html
     * <form>
     *   <input type="text">
     *   <input type="radio">
     * <form>
     * ```
     *
     */
    selector?: string;
    /**
     * Enumerates the set of data-bound input properties for a directive
     *
     * Angular automatically updates input properties during change detection.
     * The `inputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property where the value is written.
     * - `bindingProperty` specifies the DOM property where the value is read from.
     *
     * When `bindingProperty` is not provided, it is assumed to be equal to `directiveProperty`.
     * @usageNotes
     *
     * ### Example
     *
     * The following example creates a component with two data-bound properties.
     *
     * ```typescript
     * @Component({
     *   selector: 'bank-account',
     *   inputs: ['bankName', 'id: account-id'],
     *   template: `
     *     Bank Name: {{bankName}}
     *     Account Id: {{id}}
     *   `
     * })
     * class BankAccount {
     *   bankName: string;
     *   id: string;
     *
     * ```
     *
     */
    inputs?: string[];
    /**
     * Enumerates the set of event-bound output properties.
     *
     * When an output property emits an event, an event handler attached to that event
     * in the template is invoked.
     *
     * The `outputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property that emits events.
     * - `bindingProperty` specifies the DOM property the event handler is attached to.
     *
     * @usageNotes
     *
     * ### Example
     *
     * ```typescript
     * @Component({
     *   selector: 'child-dir',
     *   outputs: [ 'bankNameChange' ]
     *   template: `<input (input)="bankNameChange.emit($event.target.value)" />`
     * })
     * class ChildDir {
     *  bankNameChange: EventEmitter<string> = new EventEmitter<string>();
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: ` {{ bankName }} <child-dir (bankNameChange)="onBankNameChange($event)"></child-dir>`
     * })
     * class MainComponent {
     *  bankName: string;
     *
     *   onBankNameChange(bankName: string) {
     *     this.bankName = bankName;
     *   }
     * }
     * ```
     *
     */
    outputs?: string[];
    /**
     * Configures the [injector](guide/glossary#injector) of this
     * directive or component with a [token](guide/glossary#di-token)
     * that maps to a [provider](guide/glossary#provider) of a dependency.
     */
    providers?: Provider[];
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * @usageNotes
     *
     * ### Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'child-dir',
     *   exportAs: 'child'
     * })
     * class ChildDir {
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: `<child-dir #c="child"></child-dir>`
     * })
     * class MainComponent {
     * }
     * ```
     *
     */
    exportAs?: string;
    /**
     * Configures the queries that will be injected into the directive.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * @usageNotes
     *
     * ### Example
     *
     * The following example shows how queries are defined
     * and when their results are available in lifecycle hooks:
     *
     * ```
     * @Component({
     *   selector: 'someDir',
     *   queries: {
     *     contentChildren: new ContentChildren(ChildDirective),
     *     viewChildren: new ViewChildren(ChildDirective)
     *   },
     *   template: '<child-directive></child-directive>'
     * })
     * class SomeDir {
     *   contentChildren: QueryList<ChildDirective>,
     *   viewChildren: QueryList<ChildDirective>
     *
     *   ngAfterContentInit() {
     *     // contentChildren is set
     *   }
     *
     *   ngAfterViewInit() {
     *     // viewChildren is set
     *   }
     * }
     * ```
     *
     * @Annotation
     */
    queries?: {
        [key: string]: any;
    };
    /**
     * Maps class properties to host element bindings for properties,
     * attributes, and events, using a set of key-value pairs.
     *
     * Angular automatically checks host property bindings during change detection.
     * If a binding changes, Angular updates the directive's host element.
     *
     * When the key is a property of the host element, the property value is
     * the propagated to the specified DOM property.
     *
     * When the key is a static attribute in the DOM, the attribute value
     * is propagated to the specified property in the host element.
     *
     * For event handling:
     * - The key is the DOM event that the directive listens to.
     * To listen to global events, add the target to the event name.
     * The target can be `window`, `document` or `body`.
     * - The value is the statement to execute when the event occurs. If the
     * statement evaluates to `false`, then `preventDefault` is applied on the DOM
     * event. A handler method can refer to the `$event` local variable.
     *
     */
    host?: {
        [key: string]: string;
    };
    /**
     * If true, this directive/component will be skipped by the AOT compiler and so will always be
     * compiled using JIT.
     *
     * This exists to support future Ivy work and has no effect currently.
     */
    jit?: true;
}

/**
 * Type of the Directive metadata.
 *
 * @publicApi
 */
export declare const Directive: DirectiveDecorator;

/**
 * Type of the Directive decorator / constructor function.
 * @publicApi
 */
export declare interface DirectiveDecorator {
    /**
     * Marks a class as an Angular directive. You can define your own
     * directives to attach custom behavior to elements in the DOM.
     * The options provide configuration metadata that determines
     * how the directive should be processed, instantiated and used at
     * runtime.
     *
     * Directive classes, like component classes, can implement
     * [life-cycle hooks](guide/lifecycle-hooks) to influence their configuration and behavior.
     *
     *
     * @usageNotes
     * To define a directive, mark the class with the decorator and provide metadata.
     *
     * ```
     * import {Directive} from '@angular/core';
     *
     * @Directive({
     *   selector: 'my-directive',
     * })
     * export class MyDirective {
     * ...
     * }
     * ```
     *
     * ### Declaring directives
     *
     * Directives are [declarables](guide/glossary#declarable).
     * They must be declared by an NgModule
     * in order to be usable in an app.
     *
     * A directive must belong to exactly one NgModule. Do not re-declare
     * a directive imported from another module.
     * List the directive class in the `declarations` field of an NgModule.
     *
     * ```
     * declarations: [
     *  AppComponent,
     *  MyDirective
     * ],
     * ```
     *
     * @Annotation
     */
    (obj: Directive): TypeDecorator;
    /**
     * See the `Directive` decorator.
     */
    new (obj: Directive): Directive;
}

declare interface DirectiveDefFeature {
    <T>(directiveDef: ??DirectiveDef<T>): void;
    /**
     * Marks a feature as something that {@link InheritDefinitionFeature} will execute
     * during inheritance.
     *
     * NOTE: DO NOT SET IN ROOT OF MODULE! Doing so will result in tree-shakers/bundlers
     * identifying the change as a side effect, and the feature will be included in
     * every bundle.
     */
    ngInherit?: true;
}

declare type DirectiveDefList = (??DirectiveDef<any> | ??ComponentDef<any>)[];

/**
 * Type used for directiveDefs on component definition.
 *
 * The function is necessary to be able to support forward declarations.
 */
declare type DirectiveDefListOrFactory = (() => DirectiveDefList) | DirectiveDefList;

declare type DirectiveInstance = {};

/**
 * An array located in the StylingContext that houses all directive instances and additional
 * data about them.
 *
 * Each entry in this array represents a source of where style/class binding values could
 * come from. By default, there is always at least one directive here with a null value and
 * that represents bindings that live directly on an element in the template (not host bindings).
 *
 * Each successive entry in the array is an actual instance of a directive as well as some
 * additional info about that entry.
 *
 * An entry within this array has the following values:
 * [0] = The instance of the directive (the first entry is null because its reserved for the
 *       template)
 * [1] = The pointer that tells where the single styling (stuff like [class.foo] and [style.prop])
 *       offset values are located. This value will allow for a binding instruction to find exactly
 *       where a style is located.
 * [2] = Whether or not the directive has any styling values that are dirty. This is used as
 *       reference within the `renderStyling` function to decide whether to skip iterating
 *       through the context when rendering is executed.
 * [3] = The styleSanitizer instance that is assigned to the directive. Although it's unlikely,
 *       a directive could introduce its own special style sanitizer and for this reach each
 *       directive will get its own space for it (if null then the very first sanitizer is used).
 *
 * Each time a new directive is added it will insert these four values at the end of the array.
 * When this array is examined then the resulting directiveIndex will be resolved by dividing the
 * index value by the size of the array entries (so if DirA is at spot 8 then its index will be 2).
 */
declare interface DirectiveRegistryValues extends Array<null | {} | boolean | number | StyleSanitizeFn> {
    [DirectiveRegistryValuesIndex.SinglePropValuesIndexOffset]: number;
    [DirectiveRegistryValuesIndex.StyleSanitizerOffset]: StyleSanitizeFn | null;
}

/**
 * An enum that outlines the offset/position values for each directive entry and its data
 * that are housed inside of [DirectiveRegistryValues].
 */
declare const enum DirectiveRegistryValuesIndex {
    SinglePropValuesIndexOffset = 0,
    StyleSanitizerOffset = 1,
    Size = 2
}

declare type DirectiveTypeList = (??DirectiveDef<any> | ??ComponentDef<any> | Type<any>)[];

declare type DirectiveTypesOrFactory = (() => DirectiveTypeList) | DirectiveTypeList;

declare interface DisposableFn {
    (): void;
}

/**
 * @description
 * Hook for manual bootstrapping of the application instead of using bootstrap array in @NgModule
 * annotation.
 *
 * Reference to the current application is provided as a parameter.
 *
 * See ["Bootstrapping"](guide/bootstrapping) and ["Entry components"](guide/entry-components).
 *
 * @usageNotes
 * ```typescript
 * class AppModule implements DoBootstrap {
 *   ngDoBootstrap(appRef: ApplicationRef) {
 *     appRef.bootstrap(AppComponent); // Or some other component
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare interface DoBootstrap {
    ngDoBootstrap(appRef: ApplicationRef): void;
}

/**
 * A lifecycle hook that invokes a custom change-detection function for a directive,
 * in addition to the check performed by the default change-detector.
 *
 * The default change-detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs. You can use this
 * hook to check for and respond to changes by some other means.
 *
 * When the default change detector detects changes, it invokes `ngOnChanges()` if supplied,
 * regardless of whether you perform additional change detection.
 * Typically, you should not use both `DoCheck` and `OnChanges` to respond to
 * changes on the same input.
 *
 * @see `OnChanges`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to invoke it own change-detection cycle.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * @publicApi
 */
export declare interface DoCheck {
    /**
       * A callback method that performs change-detection, invoked
       * after the default change-detector runs.
       * See `KeyValueDiffers` and `IterableDiffers` for implementing
       * custom change checking for collections.
       *
       */
    ngDoCheck(): void;
}

/**
 * Marks that the next string is for element.
 *
 * See `I18nMutateOpCodes` documentation.
 */
declare const ELEMENT_MARKER: ELEMENT_MARKER;

declare interface ELEMENT_MARKER {
    marker: 'element';
}

declare interface ElementDef {
    name: string | null;
    ns: string | null;
    /** ns, name, value */
    attrs: [string, string, string][] | null;
    template: ??ViewDefinition | null;
    componentProvider: NodeDef | null;
    componentRendererType: RendererType2 | null;
    componentView: ViewDefinitionFactory | null;
    /**
     * visible public providers for DI in the view,
     * as see from this element. This does not include private providers.
     */
    publicProviders: {
        [tokenKey: string]: NodeDef;
    } | null;
    /**
     * same as visiblePublicProviders, but also includes private providers
     * that are located on this element.
     */
    allProviders: {
        [tokenKey: string]: NodeDef;
    } | null;
    handleEvent: ElementHandleEventFn | null;
}

declare interface ElementHandleEventFn {
    (view: ViewData, eventName: string, event: any): boolean;
}

/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
export declare class ElementRef<T = any> {
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you can take a look at {@link
     * Renderer2}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     *
     */
    nativeElement: T;
    constructor(nativeElement: T);
}

/**
 * Represents an Angular [view](guide/glossary#view) in a view container.
 * An [embedded view](guide/glossary#view-tree) can be referenced from a component
 * other than the hosting component whose template defines it, or it can be defined
 * independently by a `TemplateRef`.
 *
 * Properties of elements in a view can change, but the structure (number and order) of elements in
 * a view cannot. Change the structure of elements by inserting, moving, or
 * removing nested views in a view container.
 *
 * @see `ViewContainerRef`
 *
 * @usageNotes
 *
 * The following template breaks down into two separate `TemplateRef` instances,
 * an outer one and an inner one.
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * This is the outer `TemplateRef`:
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * This is the inner `TemplateRef`:
 *
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * The outer and inner `TemplateRef` instances are assembled into views as follows:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @publicApi
 */
export declare abstract class EmbeddedViewRef<C> extends ViewRef {
    /**
     * The context for this view, inherited from the anchor element.
     */
    abstract readonly context: C;
    /**
     * The root nodes for this embedded view.
     */
    abstract readonly rootNodes: any[];
}

/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * @publicApi
 */
export declare function enableProdMode(): void;


/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 * @publicApi
 */
export declare class ErrorHandler {
    handleError(error: any): void;
}

/**
 * Use in directives and components to emit custom events synchronously
 * or asynchronously, and register handlers for those events by subscribing
 * to an instance.
 *
 * @usageNotes
 *
 * In the following example, a component defines two output properties
 * that create event emitters. When the title is clicked, the emitter
 * emits an open or close event to toggle the current visibility state.
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Access the event object with the `$event` argument passed to the output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * ### Notes
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 *
 * @publicApi
 */
export declare class EventEmitter<T> extends Subject<T> {
    /**
     * Internal
     */
    __isAsync: boolean;
    /**
     * Creates an instance of this class that can
     * deliver events synchronously or asynchronously.
     *
     * @param isAsync When true, deliver events asynchronously.
     *
     */
    constructor(isAsync?: boolean);
    /**
     * Emits an event containing a given value.
     * @param value The value to emit.
     */
    emit(value?: T): void;
    /**
     * Registers handlers for events emitted by this instance.
     * @param generatorOrNext When supplied, a custom handler for emitted events.
     * @param error When supplied, a custom handler for an error notification
     * from this emitter.
     * @param complete When supplied, a custom handler for a completion
     * notification from this emitter.
     */
    subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ExistingProvider extends ExistingSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ExistingSansProvider'}
 *
 * @publicApi
 */
declare interface ExistingSansProvider {
    /**
     * Existing `token` to return. (equivalent to `injector.get(useExisting)`)
     */
    useExisting: any;
}

/**
 * Set of instructions used to process host bindings efficiently.
 *
 * See VIEW_DATA.md for more information.
 */
declare interface ExpandoInstructions extends Array<number | HostBindingsFunction<any> | null> {
}

/**
 * Definition of what a factory function should look like.
 */
declare type FactoryFn<T> = {
    /**
     * Subclasses without an explicit constructor call through to the factory of their base
     * definition, providing it with their own constructor to instantiate.
     */
    <U extends T>(t: Type<U>): U;
    /**
     * If no constructor to instantiate is provided, an instance of type T itself is created.
     */
    (t: null): T;
};

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface FactoryProvider extends FactorySansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='FactorySansProvider'}
 *
 * @publicApi
 */
declare interface FactorySansProvider {
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    useFactory: Function;
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
}

declare const FLAGS = 2;

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
 * a query is not yet defined.
 *
 * @usageNotes
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @publicApi
 */
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type<any>;

/**
 * An interface that a function passed into {@link forwardRef} has to implement.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref_fn'}
 * @publicApi
 */
export declare interface ForwardRefFn {
    (): any;
}

/**
 * @publicApi
 */
export declare const getDebugNode: (nativeNode: any) => DebugNode | null;

/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * @publicApi
 */
export declare const getModuleFactory: (id: string) => NgModuleFactory<any>;

/**
 * Returns the current platform.
 *
 * @publicApi
 */
export declare function getPlatform(): PlatformRef | null;

/**
 * Adapter interface for retrieving the `Testability` service associated for a
 * particular context.
 *
 * @publicApi
 */
export declare interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability | null;
}

declare type GlobalTargetName = 'document' | 'window' | 'body';

declare type GlobalTargetResolver = (element: any) => {
    name: GlobalTargetName;
    target: EventTarget;
};

/**
 * Array of hooks that should be executed for a view and their directive indices.
 *
 * For each node of the view, the following data is stored:
 * 1) Node index (optional)
 * 2) A series of number/function pairs where:
 *  - even indices are directive indices
 *  - odd indices are hook functions
 *
 * Special cases:
 *  - a negative directive index flags an init hook (ngOnInit, ngAfterContentInit, ngAfterViewInit)
 */
declare type HookData = (number | (() => void))[];

declare const HOST = 0;

/**
 * Type of the Host metadata.
 *
 * @publicApi
 */
export declare interface Host {
}

/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Host: HostDecorator;

/**
 * Type of the HostBinding metadata.
 *
 * @publicApi
 */
export declare interface HostBinding {
    /**
     * The DOM property that is bound to a data property.
     */
    hostPropertyName?: string;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const HostBinding: HostBindingDecorator;

/**
 * Type of the HostBinding decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostBindingDecorator {
    /**
     * Decorator that marks a DOM property as a host-binding property and supplies configuration
     * metadata.
     * Angular automatically checks host property bindings during change detection, and
     * if a binding changes it updates the host element of the directive.
     *
     * @usageNotes
     *
     * The following example creates a directive that sets the `valid` and `invalid`
     * properties on the DOM element that has an `ngModel` directive on it.
     *
     * ```typescript
     * @Directive({selector: '[ngModel]'})
     * class NgModelStatus {
     *   constructor(public control: NgModel) {}
     *   @HostBinding('class.valid') get valid() { return this.control.valid; }
     *   @HostBinding('class.invalid') get invalid() { return this.control.invalid; }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<input [(ngModel)]="prop">`,
     * })
     * class App {
     *   prop;
     * }
     * ```
     *
     */
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
}

declare type HostBindingsFunction<T> = <U extends T>(rf: ??RenderFlags, ctx: U, elementIndex: number) => void;

/**
 * Type of the Host decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostDecorator {
    /**
     * A parameter decorator on a view-provider parameter of a class constructor
     * that tells the DI framework to resolve the view by checking injectors of child
     * elements, and stop when reaching the host element of the current component.
     *
     * For an extended example, see
     * ["Dependency Injection Guide"](guide/dependency-injection-in-action#optional).
     *
     * @usageNotes
     *
     * The following shows use with the `@Optional` decorator, and allows for a null result.
     *
     * <code-example path="core/di/ts/metadata_spec.ts" region="Host"></code-example>
     */
    (): any;
    new (): Host;
}

/** See CreateComponentOptions.hostFeatures */
declare type HostFeature = (<T>(component: T, componentDef: ??ComponentDef<T>) => void);

/**
 * A queue of all host-related styling instructions (these are buffered and evaluated just before
 * the styling is applied).
 *
 * This queue is used when any `hostStyling` instructions are executed from the `hostBindings`
 * function. Template-level styling functions (e.g. `elementStylingMap` and `elementClassProp`)
 * do not make use of this queue (they are applied to the styling context immediately).
 *
 * Due to the nature of how components/directives are evaluated, directives (both parent and
 * subclass directives) may not apply their styling at the right time for the styling
 * algorithm code to prioritize them. Therefore, all host-styling instructions are queued up
 * (buffered) into the array below and are automatically sorted in terms of priority. The
 * priority for host-styling is as follows:
 *
 * 1. The template (this doesn't get queued, but gets evaluated immediately)
 * 2. Any directives present on the host
 *   2a) first child directive styling bindings are updated
 *   2b) then any parent directives
 * 3. Component host bindings
 *
 * Angular runs change detection for each of these cases in a different order. Because of this
 * the array below is populated with each of the host styling functions + their arguments.
 *
 * context[HostInstructionsQueue] = [
 *   directiveIndex,
 *   hostStylingFn,
 *   [argumentsForFn],
 *   ...
 *   anotherDirectiveIndex, <-- this has a lower priority (a higher directive index)
 *   anotherHostStylingFn,
 *   [argumentsForFn],
 * ]
 *
 * When `renderStyling` is called (within `class_and_host_bindings.ts`) then the queue is
 * drained and each of the instructions are executed. Once complete the queue is empty then
 * the style/class binding code is rendered on the element (which is what happens normally
 * inside of `renderStyling`).
 *
 * Right now each directive's hostBindings function, as well the template function, both
 * call `elementStylingApply()` and `hostStylingApply()`. The fact that this is called
 * multiple times for the same element (b/c of change detection) causes some issues. To avoid
 * having styling code be rendered on an element multiple times, the `HostInstructionsQueue`
 * reserves a slot for a reference pointing to the very last directive that was registered and
 * only allows for styling to be applied once that directive is encountered (which will happen
 * as the last update for that element).
 */
declare interface HostInstructionsQueue extends Array<number | Function | any[]> {
    [0]: number;
}

/**
 * Type of the HostListener metadata.
 *
 * @publicApi
 */
export declare interface HostListener {
    /**
     * The DOM event to listen for.
     */
    eventName?: string;
    /**
     * A set of arguments to pass to the handler method when the event occurs.
     */
    args?: string[];
}

/**
 * Binds a DOM event to a host listener and supplies configuration metadata.
 * Angular invokes the supplied handler method when the host element emits the specified event,
 * and updates the bound element with the result.
 * If the handler method returns false, applies `preventDefault` on the bound element.
 *
 * @usageNotes
 *
 * The following example declares a directive
 * that attaches a click listener to a button and counts clicks.
 *
 * ```
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
 *  }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: '<button counting>Increment</button>',
 * })
 * class App {}
 * ```
 *
 * @Annotation
 * @publicApi
 */
export declare const HostListener: HostListenerDecorator;

/**
 * Type of the HostListener decorator / constructor function.
 *
 * @publicApi
 */
export declare interface HostListenerDecorator {
    /**
     * Decorator that declares a DOM event to listen for,
     * and provides a handler method to run when that event occurs.
     */
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
}

declare interface I18nLocalizeOptions {
    translations: {
        [key: string]: string;
    };
}

/**
 * Array storing OpCode for dynamically creating `i18n` blocks.
 *
 * Example:
 * ```ts
 * <I18nCreateOpCode>[
 *   // For adding text nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createTextNode('abc');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   'abc', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createTextNode('xyz');
 *   //   lView[1].appendChild(node);
 *   'xyz', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding element nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createElement('div');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createElement('div');
 *   //   lView[1].appendChild(node);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding comment nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createComment('');
 *   //   lView[1].insertBefore(node, lView[2]);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[index++] = document.createComment('');
 *   //   lView[1].appendChild(node);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For moving existing nodes to a different location
 *   // --------------------------------------------------
 *   // Equivalent to:
 *   //   const node = lView[1];
 *   //   lView[2].insertBefore(node, lView[3]);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | 3 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lView[1];
 *   //   lView[2].appendChild(node);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | AppendChild,
 *
 *   // For removing existing nodes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   removeChild(tView.data(1), node, lView);
 *   1 << SHIFT_REF | Remove,
 *
 *   // For writing attributes
 *   // --------------------------------------------------
 *   //   const node = lView[1];
 *   //   node.setAttribute('attr', 'value');
 *   1 << SHIFT_REF | Select, 'attr', 'value'
 *            // NOTE: Select followed by two string (vs select followed by OpCode)
 * ];
 * ```
 * NOTE:
 *   - `index` is initial location where the extra nodes should be stored in the EXPANDO section of
 * `LVIewData`.
 *
 * See: `applyI18nCreateOpCodes`;
 */
declare interface I18nMutateOpCodes extends Array<number | string | ELEMENT_MARKER | COMMENT_MARKER | null> {
}

/**
 * Stores DOM operations which need to be applied to update DOM render tree due to changes in
 * expressions.
 *
 * The basic idea is that `i18nExp` OpCodes capture expression changes and update a change
 * mask bit. (Bit 1 for expression 1, bit 2 for expression 2 etc..., bit 32 for expression 32 and
 * higher.) The OpCodes then compare its own change mask against the expression change mask to
 * determine if the OpCodes should execute.
 *
 * These OpCodes can be used by both the i18n block as well as ICU sub-block.
 *
 * ## Example
 *
 * Assume
 * ```ts
 *   if (rf & RenderFlags.Update) {
 *    i18nExp(bind(ctx.exp1)); // If changed set mask bit 1
 *    i18nExp(bind(ctx.exp2)); // If changed set mask bit 2
 *    i18nExp(bind(ctx.exp3)); // If changed set mask bit 3
 *    i18nExp(bind(ctx.exp4)); // If changed set mask bit 4
 *    i18nApply(0);            // Apply all changes by executing the OpCodes.
 *  }
 * ```
 * We can assume that each call to `i18nExp` sets an internal `changeMask` bit depending on the
 * index of `i18nExp`.
 *
 * ### OpCodes
 * ```ts
 * <I18nUpdateOpCodes>[
 *   // The following OpCodes represent: `<div i18n-title="pre{{exp1}}in{{exp2}}post">`
 *   // If `changeMask & 0b11`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `7` values and start processing next OpCodes.
 *   0b11, 7,
 *   // Concatenate `newValue = 'pre'+lView[bindIndex-4]+'in'+lView[bindIndex-3]+'post';`.
 *   'pre', -4, 'in', -3, 'post',
 *   // Update attribute: `elementAttribute(1, 'title', sanitizerFn(newValue));`
 *   1 << SHIFT_REF | Attr, 'title', sanitizerFn,
 *
 *   // The following OpCodes represent: `<div i18n>Hello {{exp3}}!">`
 *   // If `changeMask & 0b100`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b100, 4,
 *   // Concatenate `newValue = 'Hello ' + lView[bindIndex -2] + '!';`.
 *   'Hello ', -2, '!',
 *   // Update text: `lView[1].textContent = newValue;`
 *   1 << SHIFT_REF | Text,
 *
 *   // The following OpCodes represent: `<div i18n>{exp4, plural, ... }">`
 *   // If `changeMask & 0b1000`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b1000, 4,
 *   // Concatenate `newValue = lView[bindIndex -1];`.
 *   -1,
 *   // Switch ICU: `icuSwitchCase(lView[1], 0, newValue);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuSwitch,
 *
 *   // Note `changeMask & -1` is always true, so the IcuUpdate will always execute.
 *   -1, 1,
 *   // Update ICU: `icuUpdateCase(lView[1], 0);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuUpdate,
 *
 * ];
 * ```
 *
 */
declare interface I18nUpdateOpCodes extends Array<string | number | SanitizerFn | null> {
}

/**
 * Defines the ICU type of `select` or `plural`
 */
declare const enum IcuType {
    select = 0,
    plural = 1
}

/**
 * This array contains information about input properties that
 * need to be set once from attribute data. It's ordered by
 * directive index (relative to element) so it's simple to
 * look up a specific directive's initial input data.
 *
 * Within each sub-array:
 *
 * i+0: attribute name
 * i+1: minified/internal input name
 * i+2: initial value
 *
 * If a directive on a node does not have any input properties
 * that should be set from attributes, its index is set to null
 * to avoid a sparse array.
 *
 * e.g. [null, ['role-min', 'minified-input', 'button']]
 */
declare type InitialInputData = (InitialInputs | null)[];

/**
 * Used by InitialInputData to store input properties
 * that should be set once from attributes.
 *
 * i+0: attribute name
 * i+1: minified/internal input name
 * i+2: initial value
 *
 * e.g. ['role-min', 'minified-input', 'button']
 */
declare type InitialInputs = string[];

/**
 * Used as a styling array to house static class and style values that were extracted
 * by the compiler and placed in the animation context via `elementStart` and
 * `elementHostAttrs`.
 *
 * See [InitialStylingValuesIndex] for a breakdown of how all this works.
 */
declare interface InitialStylingValues extends Array<string | boolean | number | null> {
    [InitialStylingValuesIndex.DefaultNullValuePosition]: null;
    [InitialStylingValuesIndex.CachedStringValuePosition]: string | null;
}

/**
 * Used as an offset/position index to figure out where initial styling
 * values are located.
 *
 * Used as a reference point to provide markers to all static styling
 * values (the initial style and class values on an element) within an
 * array within the `StylingContext`. This array contains key/value pairs
 * where the key is the style property name or className and the value is
 * the style value or whether or not a class is present on the elment.
 *
 * The first value is always null so that a initial index value of
 * `0` will always point to a null value.
 *
 * The second value is also always null unless a string-based representation
 * of the styling data was constructed (it gets cached in this slot).
 *
 * If a <div> elements contains a list of static styling values like so:
 *
 * <div class="foo bar baz" style="width:100px; height:200px;">
 *
 * Then the initial styles for that will look like so:
 *
 * Styles:
 * ```
 * StylingContext[InitialStylesIndex] = [
 *   null, null, 'width', '100px', height, '200px'
 * ]
 * ```
 *
 * Classes:
 * ```
 * StylingContext[InitialClassesIndex] = [
 *   null, null, 'foo', true, 'bar', true, 'baz', true
 * ]
 * ```
 *
 * Initial style and class entries have their own arrays. This is because
 * it's easier to add to the end of one array and not then have to update
 * every context entries' pointer index to the newly offseted values.
 *
 * When property bindinds are added to a context then initial style/class
 * values will also be inserted into the array. This is to create a space
 * in the situation when a follow-up directive inserts static styling into
 * the array. By default, style values are `null` and class values are
 * `false` when inserted by property bindings.
 *
 * For example:
 * ```
 * <div class="foo bar baz"
 *      [class.car]="myCarExp"
 *      style="width:100px; height:200px;"
 *      [style.opacity]="myOpacityExp">
 * ```
 *
 * Will construct initial styling values that look like:
 *
 * Styles:
 * ```
 * StylingContext[InitialStylesIndex] = [
 *   null, null, 'width', '100px', height, '200px', 'opacity', null
 * ]
 * ```
 *
 * Classes:
 * ```
 * StylingContext[InitialClassesIndex] = [
 *   null, null, 'foo', true, 'bar', true, 'baz', true, 'car', false
 * ]
 * ```
 *
 * Now if a directive comes along and introduces `car` as a static
 * class value or `opacity` then those values will be filled into
 * the initial styles array.
 *
 * For example:
 *
 * ```
 * @Directive({
 *   selector: 'opacity-car-directive',
 *   host: {
 *     'style': 'opacity:0.5',
 *     'class': 'car'
 *   }
 * })
 * class OpacityCarDirective {}
 * ```
 *
 * This will render itself as:
 *
 * Styles:
 * ```
 * StylingContext[InitialStylesIndex] = [
 *   null, null, 'width', '100px', height, '200px', 'opacity', '0.5'
 * ]
 * ```
 *
 * Classes:
 * ```
 * StylingContext[InitialClassesIndex] = [
 *   null, null, 'foo', true, 'bar', true, 'baz', true, 'car', true
 * ]
 * ```
 */
declare const enum InitialStylingValuesIndex {
    /**
     * The first value is always `null` so that `styles[0] == null` for unassigned values
     */
    DefaultNullValuePosition = 0,
    /**
     * Used for non-styling code to examine what the style or className string is:
     * styles: ['width', '100px', 0, 'opacity', null, 0, 'height', '200px', 0]
     *    => initialStyles[CachedStringValuePosition] = 'width:100px;height:200px';
     * classes: ['foo', true, 0, 'bar', false, 0, 'baz', true, 0]
     *    => initialClasses[CachedStringValuePosition] = 'foo bar';
     *
     * Note that this value is `null` by default and it will only be populated
     * once `getInitialStyleStringValue` or `getInitialClassNameValue` is executed.
     */
    CachedStringValuePosition = 1,
    /**
     * Where the style or class values start in the tuple
     */
    KeyValueStartPosition = 2,
    /**
     * The offset value (index + offset) for the property value for each style/class entry
     */
    PropOffset = 0,
    /**
     * The offset value (index + offset) for the style/class value for each style/class entry
     */
    ValueOffset = 1,
    /**
     * The offset value (index + offset) for the style/class directive owner for each style/class
       entry
     */
    DirectiveOwnerOffset = 2,
    /**
     * The first bit set aside to mark if the initial style was already rendere
     */
    AppliedFlagBitPosition = 0,
    AppliedFlagBitLength = 1,
    /**
     * The total size for each style/class entry (prop + value + directiveOwner)
     */
    Size = 3
}

/**
 * Type of the Inject metadata.
 *
 * @publicApi
 */
export declare interface Inject {
    /**
     * A [DI token](guide/glossary#di-token) that maps to the dependency to be injected.
     */
    token: any;
}

/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Inject: InjectDecorator;

/**
 * Injects a token from the currently active injector.
 *
 * Must be used in the context of a factory function such as one defined for an
 * `InjectionToken`. Throws an error if not called from such a context.
 *
 * Within such a factory function, using this function to request injection of a dependency
 * is faster and more type-safe than providing an additional array of dependencies
 * (as has been common with `useFactory` providers).
 *
 * @param token The injection token for the dependency to be injected.
 * @param flags Optional flags that control how injection is executed.
 * The flags correspond to injection strategies that can be specified with
 * parameter decorators `@Host`, `@Self`, `@SkipSef`, and `@Optional`.
 * @returns True if injection is successful, null otherwise.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 * @publicApi
 */
export declare const inject: typeof ????inject;

/**
 * Type of the Injectable metadata.
 *
 * @publicApi
 */
export declare interface Injectable {
    /**
     * Determines which injectors will provide the injectable,
     * by either associating it with an @NgModule or other `InjectorType`,
     * or by specifying that this injectable should be provided in the
     * 'root' injector, which will be the application-level injector in most apps.
     */
    providedIn?: Type<any> | 'root' | null;
}

/**
 * Injectable decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Injectable: InjectableDecorator;

/**
 * Type of the Injectable decorator / constructor function.
 *
 * @publicApi
 */
export declare interface InjectableDecorator {
    /**
     * Marks a class as available to `Injector` for creation.
     *
     * @see [Introduction to Services and DI](guide/architecture-services)
     * @see [Dependency Injection Guide](guide/dependency-injection)
     *
     * @usageNotes
     *
     * The following example shows how service classes are properly marked as
     * injectable.
     *
     * <code-example path="core/di/ts/metadata_spec.ts" region="Injectable"></code-example>
     *
     */
    (): TypeDecorator;
    (options?: {
        providedIn: Type<any> | 'root' | null;
    } & InjectableProvider): TypeDecorator;
    new (): Injectable;
    new (options?: {
        providedIn: Type<any> | 'root' | null;
    } & InjectableProvider): Injectable;
}

/**
 * Injectable providers used in `@Injectable` decorator.
 *
 * @publicApi
 */
export declare type InjectableProvider = ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider;

/**
 * A `Type` which has an `InjectableDef` static field.
 *
 * `InjectableDefType`s contain their own Dependency Injection metadata and are usable in an
 * `InjectorDef`-based `StaticInjector.
 *
 * @publicApi
 */
export declare interface InjectableType<T> extends Type<T> {
    /**
     * Opaque type whose structure is highly version dependent. Do not rely on any properties.
     */
    ngInjectableDef: never;
}

/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
declare function injectChangeDetectorRef(): ChangeDetectorRef;


/**
 * Type of the Inject decorator / constructor function.
 *
 * @publicApi
 */
export declare interface InjectDecorator {
    /**
     * A parameter decorator on a dependency parameter of a class constructor
     * that specifies a custom provider of the dependency.
     *
     * Learn more in the ["Dependency Injection Guide"](guide/dependency-injection).
     *
     * @usageNotes
     * The following example shows a class constructor that specifies a
     * custom provider of a dependency using the parameter decorator.
     *
     * When `@Inject()` is not present, the injector uses the type annotation of the
     * parameter as the provider.
     *
     * <code-example path="core/di/ts/metadata_spec.ts"
     * region="InjectWithoutDecorator"></code-example>
     */
    (token: any): any;
    new (token: any): Inject;
}

/**
 * Creates an ElementRef from the most recent node.
 *
 * @returns The ElementRef instance to use
 */
declare function injectElementRef(ElementRefToken: typeof ElementRef): ElementRef;


/**
 * Injection flags for DI.
 *
 * @publicApi
 */
export declare enum InjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
}

/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parameterized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the `inject` function. See below for an example.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule`. As
 * mentioned above, `'root'` is the default value for `providedIn`.
 *
 * @usageNotes
 * ### Basic Example
 *
 * ### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * ### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 *
 * @publicApi
 */
export declare class InjectionToken<T> {
    protected _desc: string;
    readonly ngInjectableDef: never | undefined;
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    });
    toString(): string;
}

/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * @publicApi
 */
export declare const INJECTOR: InjectionToken<Injector>;

/**
 * Concrete injectors implement this interface.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
export declare abstract class Injector {
    static THROW_IF_NOT_FOUND: Object;
    static NULL: Injector;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectionToken<T>
     * @suppress {duplicate}
     */
    abstract get(token: any, notFoundValue?: any): any;
    /**
     * @deprecated from v5 use the new signature Injector.create(options)
     */
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    /** @nocollapse */
    static ngInjectableDef: never;
}

declare const INJECTOR_2 = 10;

/**
 * A type which has an `InjectorDef` static field.
 *
 * `InjectorDefTypes` can be used to configure a `StaticInjector`.
 *
 * @publicApi
 */
export declare interface InjectorType<T> extends Type<T> {
    /**
     * Opaque type whose structure is highly version dependent. Do not rely on any properties.
     */
    ngInjectorDef: never;
}

/**
 * Describes the `InjectorDef` equivalent of a `ModuleWithProviders`, an `InjectorDefType` with an
 * associated array of providers.
 *
 * Objects of this type can be listed in the imports section of an `InjectorDef`.
 *
 * NOTE: This is a private type and should not be exported
 */
declare interface InjectorTypeWithProviders<T> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
}

/** Returns a Renderer2 (or throws when application was bootstrapped with Renderer3) */
declare function injectRenderer2(): Renderer2;

/**
 * Creates a TemplateRef given a node.
 *
 * @returns The TemplateRef instance to use
 */
declare function injectTemplateRef<T>(TemplateRefToken: typeof TemplateRef, ElementRefToken: typeof ElementRef): TemplateRef<T> | null;

/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @returns The ViewContainerRef instance to use
 */
declare function injectViewContainerRef(ViewContainerRefToken: typeof ViewContainerRef, ElementRefToken: typeof ElementRef): ViewContainerRef;

/**
 * Type of metadata for an `Input` property.
 *
 * @publicApi
 */
export declare interface Input {
    /**
     * The name of the DOM property to which the input property is bound.
     */
    bindingPropertyName?: string;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Input: InputDecorator;

/**
 * @publicApi
 */
export declare interface InputDecorator {
    /**
    * Decorator that marks a class field as an input property and supplies configuration metadata.
    * The input property is bound to a DOM property in the template. During change detection,
    * Angular automatically updates the data property with the DOM property's value.
    *
    * @usageNotes
    *
    * You can supply an optional name to use in templates when the
    * component is instantiated, that maps to the
    * name of the bound property. By default, the original
    * name of the bound property is used for input binding.
    *
    * The following example creates a component with two input properties,
    * one of which is given a special binding name.
    *
    * ```typescript
    * @Component({
    *   selector: 'bank-account',
    *   template: `
    *     Bank Name: {{bankName}}
    *     Account Id: {{id}}
    *   `
    * })
    * class BankAccount {
    *   // This property is bound using its original name.
    *   @Input() bankName: string;
    *   // this property value is bound to a different property name
    *   // when this component is instantiated in a template.
    *   @Input('account-id') id: string;
    *
    *   // this property is not bound, and is not automatically updated by Angular
    *   normalizedBankName: string;
    * }
    *
    * @Component({
    *   selector: 'app',
    *   template: `
    *     <bank-account bankName="RBC" account-id="4747"></bank-account>
    *   `
    * })
    * class App {}
    * ```
    */
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}

declare interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
}

declare interface InternalViewRef extends ViewRef {
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
}


/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @publicApi
 */
export declare function isDevMode(): boolean;

/**
 * Record representing the item change information.
 *
 * @publicApi
 */
export declare interface IterableChangeRecord<V> {
    /** Current index of the item in `Iterable` or null if removed. */
    readonly currentIndex: number | null;
    /** Previous index of the item in `Iterable` or null if added. */
    readonly previousIndex: number | null;
    /** The item. */
    readonly item: V;
    /** Track by identity as computed by the `TrackByFunction`. */
    readonly trackById: any;
}

declare class IterableChangeRecord_<V> implements IterableChangeRecord<V> {
    item: V;
    trackById: any;
    currentIndex: number | null;
    previousIndex: number | null;
    constructor(item: V, trackById: any);
}

/**
 * An object describing the changes in the `Iterable` collection since last time
 * `IterableDiffer#diff()` was invoked.
 *
 * @publicApi
 */
export declare interface IterableChanges<V> {
    /**
     * Iterate over all changes. `IterableChangeRecord` will contain information about changes
     * to each item.
     */
    forEachItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /**
     * Iterate over a set of operations which when applied to the original `Iterable` will produce the
     * new `Iterable`.
     *
     * NOTE: These are not necessarily the actual operations which were applied to the original
     * `Iterable`, rather these are a set of computed operations which may not be the same as the
     * ones applied.
     *
     * @param record A change which needs to be applied
     * @param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
     *        original `Iterable` location, where as `previousIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     * @param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
     *        original `Iterable` location, where as `currentIndex` refers to the transient location
     *        of the item, after applying the operations up to this point.
     */
    forEachOperation(fn: (record: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
    /**
     * Iterate over changes in the order of original `Iterable` showing where the original items
     * have moved.
     */
    forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all added items. */
    forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all moved items. */
    forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all removed items. */
    forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
    /** Iterate over all items which had their identity (as computed by the `TrackByFunction`)
     * changed. */
    forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void): void;
}

/**
 * A strategy for tracking changes over time to an iterable. Used by {@link NgForOf} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 *
 * @publicApi
 */
export declare interface IterableDiffer<V> {
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: NgIterable<V>): IterableChanges<V> | null;
}

/**
 * Provides a factory for {@link IterableDiffer}.
 *
 * @publicApi
 */
export declare interface IterableDifferFactory {
    supports(objects: any): boolean;
    create<V>(trackByFn?: TrackByFunction<V>): IterableDiffer<V>;
}

/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
export declare class IterableDiffers {
    /** @nocollapse */
    static ngInjectableDef: never;
    /**
     * @deprecated v4.0.0 - Should be private
     */
    factories: IterableDifferFactory[];
    constructor(factories: IterableDifferFactory[]);
    static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: IterableDifferFactory[]): StaticProvider;
    find(iterable: any): IterableDifferFactory;
}

/**
 * Record representing the item change information.
 *
 * @publicApi
 */
export declare interface KeyValueChangeRecord<K, V> {
    /**
     * Current key in the Map.
     */
    readonly key: K;
    /**
     * Current value for the key or `null` if removed.
     */
    readonly currentValue: V | null;
    /**
     * Previous value for the key or `null` if added.
     */
    readonly previousValue: V | null;
}

/**
 * An object describing the changes in the `Map` or `{[k:string]: string}` since last time
 * `KeyValueDiffer#diff()` was invoked.
 *
 * @publicApi
 */
export declare interface KeyValueChanges<K, V> {
    /**
     * Iterate over all changes. `KeyValueChangeRecord` will contain information about changes
     * to each item.
     */
    forEachItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over changes in the order of original Map showing where the original items
     * have moved.
     */
    forEachPreviousItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all keys for which values have changed.
     */
    forEachChangedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all added items.
     */
    forEachAddedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
    /**
     * Iterate over all removed items.
     */
    forEachRemovedItem(fn: (r: KeyValueChangeRecord<K, V>) => void): void;
}

/**
 * A differ that tracks changes made to an object over time.
 *
 * @publicApi
 */
export declare interface KeyValueDiffer<K, V> {
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: Map<K, V>): KeyValueChanges<K, V> | null;
    /**
     * Compute a difference between the previous state and the new `object` state.
     *
     * @param object containing the new value.
     * @returns an object describing the difference. The return value is only valid until the next
     * `diff()` invocation.
     */
    diff(object: {
        [key: string]: V;
    }): KeyValueChanges<string, V> | null;
}

/**
 * Provides a factory for {@link KeyValueDiffer}.
 *
 * @publicApi
 */
export declare interface KeyValueDifferFactory {
    /**
     * Test to see if the differ knows how to diff this kind of object.
     */
    supports(objects: any): boolean;
    /**
     * Create a `KeyValueDiffer`.
     */
    create<K, V>(): KeyValueDiffer<K, V>;
}

/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 *
 * @publicApi
 */
export declare class KeyValueDiffers {
    /** @nocollapse */
    static ngInjectableDef: never;
    /**
     * @deprecated v4.0.0 - Should be private.
     */
    factories: KeyValueDifferFactory[];
    constructor(factories: KeyValueDifferFactory[]);
    static create<S>(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers;
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    static extend<S>(factories: KeyValueDifferFactory[]): StaticProvider;
    find(kv: any): KeyValueDifferFactory;
}

/**
 * The state associated with a container.
 *
 * This is an array so that its structure is closer to LView. This helps
 * when traversing the view tree (which is a mix of containers and component
 * views), so we can jump to viewOrContainer[NEXT] in the same way regardless
 * of type.
 */
declare interface LContainer extends Array<any> {
    /**
     * The host element of this LContainer.
     *
     * The host could be an LView if this container is on a component node.
     * In that case, the component LView is its HOST.
     *
     * It could also be a styling context if this is a node with a style/class
     * binding.
     */
    readonly [HOST]: RElement | RComment | StylingContext | ??angular_packages_core_core_bm;
    /**
     * This is a type field which allows us to differentiate `LContainer` from `StylingContext` in an
     * efficient way. The value is always set to `true`
     */
    [TYPE]: true;
    /**
     * The next active index in the views array to read or write to. This helps us
     * keep track of where we are in the views array.
     * In the case the LContainer is created for a ViewContainerRef,
     * it is set to null to identify this scenario, as indices are "absolute" in that case,
     * i.e. provided directly by the user of the ViewContainerRef API.
     */
    [ACTIVE_INDEX]: number;
    /**
     * Access to the parent view is necessary so we can propagate back
     * up from inside a container to parent[NEXT].
     */
    [PARENT]: ??angular_packages_core_core_bm;
    /**
     * This allows us to jump from a container to a sibling container or component
     * view with the same parent, so we can remove listeners efficiently.
     */
    [NEXT]: ??angular_packages_core_core_bm | LContainer | null;
    /**
     * Queries active for this container - all the views inserted to / removed from
     * this container are reported to queries referenced here.
     */
    [QUERIES]: LQueries | null;
    /**
     * Pointer to the `TNode` which represents the host of the container.
     */
    [T_HOST]: TNode;
    /** The comment element that serves as an anchor for this LContainer. */
    readonly [NATIVE]: RComment;
    /**
  *A list of the container's currently active child views. Views will be inserted
  *here as they are added and spliced from here when they are removed. We need
  *to keep a record of current views so we know which views are already in the DOM
  *(and don't need to be re-added) and so we can remove views from the DOM when they
  *are no longer required.
  */
    [VIEWS]: ??angular_packages_core_core_bm[];
}

/**
 * Provide this token to set the locale of your application.
 * It is used for i18n extraction, by i18n pipes (DatePipe, I18nPluralPipe, CurrencyPipe,
 * DecimalPipe and PercentPipe) and by ICU expressions.
 *
 * See the [i18n guide](guide/i18n#setting-up-locale) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { LOCALE_ID } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const LOCALE_ID: InjectionToken<string>;

/**
 * Type for a function that extracts a value for a local refs.
 * Example:
 * - `<div #nativeDivEl>` - `nativeDivEl` should point to the native `<div>` element;
 * - `<ng-template #tplRef>` - `tplRef` should point to the `TemplateRef` instance;
 */
declare type LocalRefExtractor = (tNode: TNodeWithLocalRefs, currentView: ??angular_packages_core_core_bm) => any;

/** Used for tracking queries (e.g. ViewChild, ContentChild). */
declare interface LQueries {
    /**
     * The parent LQueries instance.
     *
     * When there is a content query, a new LQueries instance is created to avoid mutating any
     * existing LQueries. After we are done searching content children, the parent property allows
     * us to traverse back up to the original LQueries instance to continue to search for matches
     * in the main view.
     */
    parent: LQueries | null;
    /**
     * Ask queries to prepare copy of itself. This assures that tracking new queries on content nodes
     * doesn't mutate list of queries tracked on a parent node. We will clone LQueries before
     * constructing content queries.
     */
    clone(): LQueries;
    /**
     * Notify `LQueries` that a new `TNode` has been created and needs to be added to query results
     * if matching query predicate.
     */
    addNode(tNode: ??angular_packages_core_core_bg | TContainerNode | TElementContainerNode): void;
    /**
     * Notify `LQueries` that a new `TNode` has been created and needs to be added to query results
     * if matching query predicate. This is a special mode invoked if the query container has to
     * be created out of order (e.g. view created in the constructor of a directive).
     */
    insertNodeBeforeViews(tNode: ??angular_packages_core_core_bg | TContainerNode | TElementContainerNode): void;
    /**
     * Notify `LQueries` that a new LContainer was added to ivy data structures. As a result we need
     * to prepare room for views that might be inserted into this container.
     */
    container(): LQueries | null;
    /**
     * Notify `LQueries` that a new `LView` has been created. As a result we need to prepare room
     * and collect nodes that match query predicate.
     */
    createView(): LQueries | null;
    /**
     * Notify `LQueries` that a new `LView` has been added to `LContainer`. As a result all
     * the matching nodes from this view should be added to container's queries.
     */
    insertView(newViewIndex: number): void;
    /**
     * Notify `LQueries` that an `LView` has been removed from `LContainer`. As a result all
     * the matching nodes from this view should be removed from container's queries.
     */
    removeView(): void;
    /**
     * Add additional `QueryList` to track.
     *
     * @param queryList `QueryList` to update with changes.
     * @param predicate Either `Type` or selector array of [key, value] predicates.
     * @param descend If true the query will recursively apply to the children.
     * @param read Indicates which token should be read from DI for this query.
     */
    track<T>(queryList: QueryList<T>, predicate: Type<any> | string[], descend?: boolean, read?: Type<T>): void;
}

/** Flags associated with an LView (saved in LView[FLAGS]) */
declare const enum LViewFlags {
    /** The state of the init phase on the first 2 bits */
    InitPhaseStateIncrementer = 1,
    InitPhaseStateMask = 3,
    /**
     * Whether or not the view is in creationMode.
     *
     * This must be stored in the view rather than using `data` as a marker so that
     * we can properly support embedded views. Otherwise, when exiting a child view
     * back into the parent view, `data` will be defined and `creationMode` will be
     * improperly reported as false.
     */
    CreationMode = 4,
    /**
     * Whether or not this LView instance is on its first processing pass.
     *
     * An LView instance is considered to be on its "first pass" until it
     * has completed one creation mode run and one update mode run. At this
     * time, the flag is turned off.
     */
    FirstLViewPass = 8,
    /** Whether this view has default change detection strategy (checks always) or onPush */
    CheckAlways = 16,
    /**
     * Whether or not manual change detection is turned on for onPush components.
     *
     * This is a special mode that only marks components dirty in two cases:
     * 1) There has been a change to an @Input property
     * 2) `markDirty()` has been called manually by the user
     *
     * Note that in this mode, the firing of events does NOT mark components
     * dirty automatically.
     *
     * Manual mode is turned off by default for backwards compatibility, as events
     * automatically mark OnPush components dirty in View Engine.
     *
     * TODO: Add a public API to ChangeDetectionStrategy to turn this mode on
     */
    ManualOnPush = 32,
    /** Whether or not this view is currently dirty (needing check) */
    Dirty = 64,
    /** Whether or not this view is currently attached to change detection tree. */
    Attached = 128,
    /** Whether or not this view is destroyed. */
    Destroyed = 256,
    /** Whether or not this view is the root view */
    IsRoot = 512,
    /**
     * Index of the current init phase on last 22 bits
     */
    IndexWithinInitPhaseIncrementer = 1024,
    IndexWithinInitPhaseShift = 10,
    IndexWithinInitPhaseReset = 1023
}

/**
 * Used a reference for all multi styling values (values that are assigned via the
 * `[style]` and `[class]` bindings).
 *
 * Single-styling properties (things set via `[style.prop]` and `[class.name]` bindings)
 * are not handled using the same approach as multi-styling bindings (such as `[style]`
 * `[class]` bindings).
 *
 * Multi-styling bindings rely on a diffing algorithm to figure out what properties have been added,
 * removed and modified. Multi-styling properties are also evaluated across directives--which means
 * that Angular supports having multiple directives all write to the same `[style]` and `[class]`
 * bindings (using host bindings) even if the `[style]` and/or `[class]` bindings are being written
 * to on the template element.
 *
 * All multi-styling values that are written to an element (whether it be from the template or any
 * directives attached to the element) are all written into the `MapBasedOffsetValues` array. (Note
 * that there are two arrays: one for styles and another for classes.)
 *
 * This array is shaped in the following way:
 *
 * [0]  = The total amount of unique multi-style or multi-class entries that exist currently in the
 *        context.
 * [1+] = Contains an entry of four values ... Each entry is a value assigned by a
 * `[style]`/`[class]`
 *        binding (we call this a **source**).
 *
 *        An example entry looks like so (at a given `i` index):
 *        [i + 0] = Whether or not the value is dirty
 *
 *        [i + 1] = The index of where the map-based values
 *                  (for this **source**) start within the context
 *
 *        [i + 2] = The untouched, last set value of the binding
 *
 *        [i + 3] = The total amount of unqiue binding values that were
 *                  extracted and set into the context. (Note that this value does
 *                  not reflect the total amount of values within the binding
 *                  value (since it's a map), but instead reflects the total values
 *                  that were not used by another directive).
 *
 * Each time a directive (or template) writes a value to a `[class]`/`[style]` binding then the
 * styling diffing algorithm code will decide whether or not to update the value based on the
 * following rules:
 *
 * 1. If a more important directive (either the template or a directive that was registered
 *    beforehand) has written a specific styling value into the context then any follow-up styling
 *    values (set by another directive via its `[style]` and/or `[class]` host binding) will not be
 *    able to set it. This is because the former directive has priorty.
 * 2. Only if a former directive has set a specific styling value to null (whether by actually
 *    setting it to null or not including it in is map value) then a less imporatant directive can
 *    set its own value.
 *
 * ## How the map-based styling algorithm updates itself
 */
declare interface MapBasedOffsetValues extends Array<any> {
    [MapBasedOffsetValuesIndex.EntriesCountPosition]: number;
}

declare const enum MapBasedOffsetValuesIndex {
    EntriesCountPosition = 0,
    ValuesStartPosition = 1,
    DirtyFlagOffset = 0,
    PositionStartOffset = 1,
    ValueOffset = 2,
    ValueCountOffset = 3,
    Size = 4
}

/**
 * Use this enum at bootstrap as an option of `bootstrapModule` to define the strategy
 * that the compiler should use in case of missing translations:
 * - Error: throw if you have missing translations.
 * - Warning (default): show a warning in the console and/or shell.
 * - Ignore: do nothing.
 *
 * See the [i18n guide](guide/i18n#missing-translation) for more information.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * import { MissingTranslationStrategy } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   missingTranslation: MissingTranslationStrategy.Error
 * });
 * ```
 *
 * @publicApi
 */
export declare enum MissingTranslationStrategy {
    Error = 0,
    Warning = 1,
    Ignore = 2
}

/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @publicApi
 */
export declare class ModuleWithComponentFactories<T> {
    ngModuleFactory: NgModuleFactory<T>;
    componentFactories: ComponentFactory<any>[];
    constructor(ngModuleFactory: NgModuleFactory<T>, componentFactories: ComponentFactory<any>[]);
}

/**
 * A wrapper around an NgModule that associates it with the providers.
 *
 * @param T the module type. In Ivy applications, this must be explicitly
 * provided.
 *
 * @publicApi
 */
export declare interface ModuleWithProviders<T = any /** TODO(alxhub): remove default when callers pass explicit type param */> {
    ngModule: Type<T>;
    providers?: Provider[];
}

declare const NATIVE = 7;

declare const NEXT = 4;

declare interface NgContentDef {
    /**
     * this index is checked against NodeDef.ngContentIndex to find the nodes
     * that are matched by this ng-content.
     * Note that a NodeDef with an ng-content can be reprojected, i.e.
     * have a ngContentIndex on its own.
     */
    index: number;
}

/**
 * A type describing supported iterable types.
 *
 * @publicApi
 */
export declare type NgIterable<T> = Array<T> | Iterable<T>;

/**
 * Type of the NgModule metadata.
 *
 * @publicApi
 */
export declare interface NgModule {
    /**
     * The set of injectable objects that are available in the injector
     * of this module.
     *
     * @see [Dependency Injection guide](guide/dependency-injection)
     * @see [NgModule guide](guide/providers)
     *
     * @usageNotes
     *
     * Dependencies whose providers are listed here become available for injection
     * into any component, directive, pipe or service that is a child of this injector.
     * The NgModule used for bootstrapping uses the root injector, and can provide dependencies
     * to any part of the app.
     *
     * A lazy-loaded module has its own injector, typically a child of the app root injector.
     * Lazy-loaded services are scoped to the lazy-loaded module's injector.
     * If a lazy-loaded module also provides the `UserService`, any component created
     * within that module's context (such as by router navigation) gets the local instance
     * of the service, not the instance in the root injector.
     * Components in external modules continue to receive the instance provided by their injectors.
     *
     * ### Example
     *
     * The following example defines a class that is injected in
     * the HelloWorld NgModule:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @NgModule({
     *   providers: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
    providers?: Provider[];
    /**
     * The set of components, directives, and pipes ([declarables](guide/glossary#declarable))
     * that belong to this module.
     *
     * @usageNotes
     *
     * The set of selectors that are available to a template include those declared here, and
     * those that are exported from imported NgModules.
     *
     * Declarables must belong to exactly one module.
     * The compiler emits an error if you try to declare the same class in more than one module.
     * Be careful not to declare a class that is imported from another module.
     *
     * ### Example
     *
     * The following example allows the CommonModule to use the `NgFor`
     * directive.
     *
     * ```javascript
     * @NgModule({
     *   declarations: [NgFor]
     * })
     * class CommonModule {
     * }
     * ```
     */
    declarations?: Array<Type<any> | any[]>;
    /**
     * The set of NgModules whose exported [declarables](guide/glossary#declarable)
     * are available to templates in this module.
     *
     * @usageNotes
     *
     * A template can use exported declarables from any
     * imported module, including those from modules that are imported indirectly
     * and re-exported.
     * For example, `ModuleA` imports `ModuleB`, and also exports
     * it, which makes the declarables from `ModuleB` available
     * wherever `ModuleA` is imported.
     *
     * ### Example
     *
     * The following example allows MainModule to use anything exported by
     * `CommonModule`:
     *
     * ```javascript
     * @NgModule({
     *   imports: [CommonModule]
     * })
     * class MainModule {
     * }
     * ```
     *
     */
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    /**
     * The set of components, directives, and pipes declared in this
     * NgModule that can be used in the template of any component that is part of an
     * NgModule that imports this NgModule. Exported declarations are the module's public API.
     *
     * A declarable belongs to one and only one NgModule.
     * A module can list another module among its exports, in which case all of that module's
     * public declaration are exported.
     *
     * @usageNotes
     *
     * Declarations are private by default.
     * If this ModuleA does not export UserComponent, then only the components within this
     * ModuleA can use UserComponent.
     *
     * ModuleA can import ModuleB and also export it, making exports from ModuleB
     * available to an NgModule that imports ModuleA.
     *
     * ### Example
     *
     * The following example exports the `NgFor` directive from CommonModule.
     *
     * ```javascript
     * @NgModule({
     *   exports: [NgFor]
     * })
     * class CommonModule {
     * }
     * ```
     */
    exports?: Array<Type<any> | any[]>;
    /**
     * The set of components to compile when this NgModule is defined,
     * so that they can be dynamically loaded into the view.
     *
     * For each component listed here, Angular creates a `ComponentFactory`
     * and stores it in the `ComponentFactoryResolver`.
     *
     * Angular automatically adds components in the module's bootstrap
     * and route definitions into the `entryComponents` list. Use this
     * option to add components that are bootstrapped
     * using one of the imperative techniques, such as `ViewContainerRef.createComponent()`.
     *
     * @see [Entry Components](guide/entry-components)
     */
    entryComponents?: Array<Type<any> | any[]>;
    /**
     * The set of components that are bootstrapped when
     * this module is bootstrapped. The components listed here
     * are automatically added to `entryComponents`.
     */
    bootstrap?: Array<Type<any> | any[]>;
    /**
     * The set of schemas that declare elements to be allowed in the NgModule.
     * Elements and properties that are neither Angular components nor directives
     * must be declared in a schema.
     *
     * Allowed value are `NO_ERRORS_SCHEMA` and `CUSTOM_ELEMENTS_SCHEMA`.
     *
     * @security When using one of `NO_ERRORS_SCHEMA` or `CUSTOM_ELEMENTS_SCHEMA`
     * you must ensure that allowed elements and properties securely escape inputs.
     */
    schemas?: Array<SchemaMetadata | any[]>;
    /**
     * A name or path that uniquely identifies this NgModule in `getModuleFactory`.
     * If left `undefined`, the NgModule is not registered with
     * `getModuleFactory`.
     */
    id?: string;
    /**
     * If true, this module will be skipped by the AOT compiler and so will always be compiled
     * using JIT.
     *
     * This exists to support future Ivy work and has no effect currently.
     */
    jit?: true;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const NgModule: NgModuleDecorator;

/**
 * Type of the NgModule decorator / constructor function.
 *
 * @publicApi
 */
export declare interface NgModuleDecorator {
    /**
     * Decorator that marks a class as an NgModule and supplies configuration metadata.
     */
    (obj?: NgModule): TypeDecorator;
    new (obj?: NgModule): NgModule;
}

declare interface NgModuleDefinition extends Definition<NgModuleDefinitionFactory> {
    providers: NgModuleProviderDef[];
    providersByKey: {
        [tokenKey: string]: NgModuleProviderDef;
    };
    modules: any[];
    isRoot: boolean;
}

declare interface NgModuleDefinitionFactory extends DefinitionFactory<NgModuleDefinition> {
}

/**
 * @publicApi
 */
export declare abstract class NgModuleFactory<T> {
    abstract readonly moduleType: Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * Used to load ng module factories.
 *
 * @publicApi
 * @deprecated the `string` form of `loadChildren` is deprecated, and `NgModuleFactoryLoader` is
 * part of its implementation. See `LoadChildren` for more details.
 */
export declare abstract class NgModuleFactoryLoader {
    abstract load(path: string): Promise<NgModuleFactory<any>>;
}

declare interface NgModuleProviderDef {
    flags: ??NodeFlags;
    index: number;
    token: any;
    value: any;
    deps: DepDef[];
}

/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @publicApi
 */
export declare abstract class NgModuleRef<T> {
    /**
     * The injector that contains all of the providers of the NgModule.
     */
    abstract readonly injector: Injector;
    /**
     * The ComponentFactoryResolver to get hold of the ComponentFactories
     * declared in the `entryComponents` property of the module.
     */
    abstract readonly componentFactoryResolver: ComponentFactoryResolver;
    /**
     * The NgModule instance.
     */
    abstract readonly instance: T;
    /**
     * Destroys the module instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Allows to register a callback that will be called when the module is destroyed.
     */
    abstract onDestroy(callback: () => void): void;
}

/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * @publicApi
 */
export declare class NgProbeToken {
    name: string;
    token: any;
    constructor(name: string, token: any);
}

/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * import {Component, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo',
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *         // reenter the Angular zone and display done
 *         this._ngZone.run(() => { console.log('Outside Done!'); });
 *       });
 *     });
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback), 10);
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export declare class NgZone {
    readonly hasPendingMicrotasks: boolean;
    readonly hasPendingMacrotasks: boolean;
    /**
     * Whether there are no outstanding microtasks or macrotasks.
     */
    readonly isStable: boolean;
    /**
     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
     */
    readonly onUnstable: EventEmitter<any>;
    /**
     * Notifies when there is no more microtasks enqueued in the current VM Turn.
     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
     * For this reason this event can fire multiple times per VM Turn.
     */
    readonly onMicrotaskEmpty: EventEmitter<any>;
    /**
     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
     * implies we are about to relinquish VM turn.
     * This event gets called just once.
     */
    readonly onStable: EventEmitter<any>;
    /**
     * Notifies that an error has been delivered.
     */
    readonly onError: EventEmitter<any>;
    constructor({ enableLongStackTrace }: {
        enableLongStackTrace?: boolean | undefined;
    });
    static isInAngularZone(): boolean;
    static assertInAngularZone(): void;
    static assertNotInAngularZone(): void;
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
    /**
     * Executes the `fn` function synchronously within the Angular zone as a task and returns value
     * returned by the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T;
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
     * work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    runOutsideAngular<T>(fn: (...args: any[]) => T): T;
}

/**
 * Defines a schema that allows any property on any element.
 *
 * @publicApi
 */
export declare const NO_ERRORS_SCHEMA: SchemaMetadata;

declare interface NodeCheckFn {
    (view: ViewData, nodeIndex: number, argStyle: ??ArgumentType.Dynamic, values: any[]): any;
    (view: ViewData, nodeIndex: number, argStyle: ??ArgumentType.Inline, v0?: any, v1?: any, v2?: any, v3?: any, v4?: any, v5?: any, v6?: any, v7?: any, v8?: any, v9?: any): any;
}

/**
 * Node instance data.
 *
 * We have a separate type per NodeType to save memory
 * (TextData | ElementData | ProviderData | PureExpressionData | QueryList<any>)
 *
 * To keep our code monomorphic,
 * we prohibit using `NodeData` directly but enforce the use of accessors (`asElementData`, ...).
 * This way, no usage site can get a `NodeData` from view.nodes and then use it for different
 * purposes.
 */
declare class NodeData {
    private __brand;
}

/**
 * A node definition in the view.
 *
 * Note: We use one type for all nodes so that loops that loop over all nodes
 * of a ViewDefinition stay monomorphic!
 */
declare interface NodeDef {
    flags: ??NodeFlags;
    nodeIndex: number;
    checkIndex: number;
    parent: NodeDef | null;
    renderParent: NodeDef | null;
    /** this is checked against NgContentDef.index to find matched nodes */
    ngContentIndex: number | null;
    /** number of transitive children */
    childCount: number;
    /** aggregated NodeFlags for all transitive children (does not include self) **/
    childFlags: ??NodeFlags;
    /** aggregated NodeFlags for all direct children (does not include self) **/
    directChildFlags: ??NodeFlags;
    bindingIndex: number;
    bindings: BindingDef[];
    bindingFlags: ??BindingFlags;
    outputIndex: number;
    outputs: OutputDef[];
    /**
     * references that the user placed on the element
     */
    references: {
        [refId: string]: ??QueryValueType;
    };
    /**
     * ids and value types of all queries that are matched by this node.
     */
    matchedQueries: {
        [queryId: number]: ??QueryValueType;
    };
    /** Binary or of all matched query ids of this node. */
    matchedQueryIds: number;
    /**
     * Binary or of all query ids that are matched by one of the children.
     * This includes query ids from templates as well.
     * Used as a bloom filter.
     */
    childMatchedQueries: number;
    element: ElementDef | null;
    provider: ProviderDef | null;
    text: TextDef | null;
    query: QueryDef | null;
    ngContent: NgContentDef | null;
}

/**
 * Function to call console.error at the right source location. This is an indirection
 * via another function as browser will log the location that actually called
 * `console.error`.
 */
declare interface NodeLogger {
    (): () => void;
}

/**
 * Object Oriented style of API needed to create elements and text nodes.
 *
 * This is the native browser API style, e.g. operations are methods on individual objects
 * like HTMLElement. With this style, no additional code is needed as a facade
 * (reducing payload size).
 * */
declare interface ObjectOrientedRenderer3 {
    createComment(data: string): RComment;
    createElement(tagName: string): RElement;
    createElementNS(namespace: string, tagName: string): RElement;
    createTextNode(data: string): RText;
    querySelector(selectors: string): RElement | null;
}

/**
 * @description
 * A lifecycle hook that is called when any data-bound property of a directive changes.
 * Define an `ngOnChanges()` method to handle the changes.
 *
 * @see `DoCheck`
 * @see `OnInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define an on-changes handler for an input property.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * @publicApi
 */
export declare interface OnChanges {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     * @param changes The changed properties.
     */
    ngOnChanges(changes: SimpleChanges): void;
}

/**
 * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
 * Use for any custom cleanup that needs to occur when the
 * instance is destroyed.
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to define its own custom clean-up method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * @publicApi
 */
export declare interface OnDestroy {
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * after a directive, pipe, or service instance is destroyed.
     */
    ngOnDestroy(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `ngOnInit()` method to handle any additional initialization tasks.
 *
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * @publicApi
 */
export declare interface OnInit {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void;
}

declare interface OpaqueViewState {
    '__brand__': 'Brand for OpaqueViewState that nothing will match';
}

/**
 * Type of the Optional metadata.
 *
 * @publicApi
 */
export declare interface Optional {
}

/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Optional: OptionalDecorator;

/**
 * Type of the Optional decorator / constructor function.
 *
 * @publicApi
 */
export declare interface OptionalDecorator {
    /**
     * A parameter decorator to be used on constructor parameters,
     * which marks the parameter as being an optional dependency.
     * The DI framework provides null if the dependency is not found.
     *
     * Can be used together with other parameter decorators
     * that modify how dependency injection operates.
     *
     * Learn more in the ["Dependency Injection Guide"](guide/dependency-injection).
     *
     * @usageNotes
     *
     * The following code allows the possibility of a null result:
     *
     * <code-example path="core/di/ts/metadata_spec.ts" region="Optional"></code-example>
     *
     */
    (): any;
    new (): Optional;
}

/**
 * Type of the Output metadata.
 *
 * @publicApi
 */
export declare interface Output {
    /**
    * The name of the DOM property to which the output property is bound.
    */
    bindingPropertyName?: string;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Output: OutputDecorator;

/**
 * Type of the Output decorator / constructor function.
 *
 * @publicApi
 */
export declare interface OutputDecorator {
    /**
    * Decorator that marks a class field as an output property and supplies configuration metadata.
    * The DOM property bound to the output property is automatically updated during change detection.
    *
    * @usageNotes
    *
    * You can supply an optional name to use in templates when the
    * component is instantiated, that maps to the
    * name of the bound property. By default, the original
    * name of the bound property is used for output binding.
    *
    * See `Input` decorator for an example of providing a binding name.
    *
    */
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}

declare interface OutputDef {
    type: OutputType;
    target: 'window' | 'document' | 'body' | 'component' | null;
    eventName: string;
    propName: string | null;
}

declare const enum OutputType {
    ElementOutput = 0,
    DirectiveOutput = 1
}

/**
 * A token which indicates the root directory of the application
 * @publicApi
 */
export declare const PACKAGE_ROOT_URL: InjectionToken<string>;

declare const PARENT = 3;

/**
 * Type of the Pipe metadata.
 *
 * @publicApi
 */
export declare interface Pipe {
    /**
     * The pipe name to use in template bindings.
     *
     */
    name: string;
    /**
     * When true, the pipe is pure, meaning that the
     * `transform()` method is invoked only when its input arguments
     * change. Pipes are pure by default.
     *
     * If the pipe has internal state (that is, the result
     * depends on state other than its arguments), set `pure` to false.
     * In this case, the pipe is invoked on each change-detection cycle,
     * even if the arguments have not changed.
     */
    pure?: boolean;
}

/**
 * @Annotation
 * @publicApi
 */
export declare const Pipe: PipeDecorator;

/**
 * Type of the Pipe decorator / constructor function.
 *
 * @publicApi
 */
export declare interface PipeDecorator {
    /**
     *
     * Decorator that marks a class as pipe and supplies configuration metadata.
     *
     * A pipe class must implement the `PipeTransform` interface.
     * For example, if the name is "myPipe", use a template binding expression
     * such as the following:
     *
     * ```
     * {{ exp | myPipe }}
     * ```
     *
     * The result of the expression is passed to the pipe's `transform()` method.
     *
     * A pipe must belong to an NgModule in order for it to be available
     * to a template. To make it a member of an NgModule,
     * list it in the `declarations` field of the `NgModule` metadata.
     *
     */
    (obj: Pipe): TypeDecorator;
    /**
     * See the `Pipe` decorator.
     */
    new (obj: Pipe): Pipe;
}

declare type PipeDefList = ??PipeDef<any>[];

/**
 * Type used for PipeDefs on component definition.
 *
 * The function is necessary to be able to support forward declarations.
 */
declare type PipeDefListOrFactory = (() => PipeDefList) | PipeDefList;


/**
 * To create a Pipe, you must implement this interface.
 *
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * @usageNotes
 * ### Example
 *
 * The `RepeatPipe` below repeats the value as many times as indicated by the first argument:
 *
 * ```
 * import {Pipe, PipeTransform} from '@angular/core';
 *
 * @Pipe({name: 'repeat'})
 * export class RepeatPipe implements PipeTransform {
 *   transform(value: any, times: number) {
 *     return value.repeat(times);
 *   }
 * }
 * ```
 *
 * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
 *
 * @publicApi
 */
export declare interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

declare type PipeTypesOrFactory = (() => DirectiveTypeList) | DirectiveTypeList;

/**
 * A token that indicates an opaque platform id.
 * @publicApi
 */
export declare const PLATFORM_ID: InjectionToken<Object>;

/**
 * A function that will be executed when a platform is initialized.
 * @publicApi
 */
export declare const PLATFORM_INITIALIZER: InjectionToken<(() => void)[]>;

/**
 * This platform has to be included in any other platform
 *
 * @publicApi
 */
export declare const platformCore: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when a platform is created via a platform factory
 * (e.g. {@link platformBrowser}), or explicitly by calling the {@link createPlatform} function.
 *
 * @publicApi
 */
export declare class PlatformRef {
    private _injector;
    private _modules;
    private _destroyListeners;
    private _destroyed;
    /**
     * Creates an instance of an `@NgModule` for the given platform
     * for offline compilation.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {platformBrowser} from '@angular/platform-browser';
     *
     * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     */
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>>;
    /**
     * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
     *
     * @usageNotes
     * ### Simple Example
     *
     * ```typescript
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     *
     */
    bootstrapModule<M>(moduleType: Type<M>, compilerOptions?: (CompilerOptions & BootstrapOptions) | Array<CompilerOptions & BootstrapOptions>): Promise<NgModuleRef<M>>;
    private _moduleDoBootstrap;
    /**
     * Register a listener to be called when the platform is disposed.
     */
    onDestroy(callback: () => void): void;
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    readonly injector: Injector;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    destroy(): void;
    readonly destroyed: boolean;
}

declare interface PlatformReflectionCapabilities {
    isReflectionEnabled(): boolean;
    factory(type: Type<any>): Function;
    hasLifecycleHook(type: any, lcProperty: string): boolean;
    guards(type: any): {
        [key: string]: any;
    };
    /**
     * Return a list of annotations/types for constructor parameters
     */
    parameters(type: Type<any>): any[][];
    /**
     * Return a list of annotations declared on the class
     */
    annotations(type: Type<any>): any[];
    /**
     * Return a object literal which describes the annotations on Class fields/properties.
     */
    propMetadata(typeOrFunc: Type<any>): {
        [key: string]: any[];
    };
    getter(name: string): ??GetterFn;
    setter(name: string): ??SetterFn;
    method(name: string): ??MethodFn;
    importUri(type: Type<any>): string;
    resourceUri(type: Type<any>): string;
    resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any;
    resolveEnum(enumIdentifier: any, name: string): any;
}

declare interface PlayerBuilder extends BindingStore {
    buildPlayer(currentPlayer: ??Player | null, isFirstRender: boolean): ??Player | undefined | null;
}

/**
 * The context that stores all the active players and queued player factories present on an element.
 */
declare interface PlayerContext extends Array<null | number | ??Player | PlayerBuilder> {
    [PlayerIndex.NonBuilderPlayersStart]: number;
    [PlayerIndex.ClassMapPlayerBuilderPosition]: PlayerBuilder | null;
    [PlayerIndex.ClassMapPlayerPosition]: ??Player | null;
    [PlayerIndex.StyleMapPlayerBuilderPosition]: PlayerBuilder | null;
    [PlayerIndex.StyleMapPlayerPosition]: ??Player | null;
}

declare const enum PlayerIndex {
    NonBuilderPlayersStart = 0,
    ClassMapPlayerBuilderPosition = 1,
    ClassMapPlayerPosition = 2,
    StyleMapPlayerBuilderPosition = 3,
    StyleMapPlayerPosition = 4,
    PlayerBuildersStartPosition = 1,
    SinglePlayerBuildersStartPosition = 5,
    PlayerAndPlayerBuildersTupleSize = 2,
    PlayerOffsetPosition = 1
}

/**
 * A boolean-valued function over a value, possibly including context information
 * regarding that value's position in an array.
 *
 * @publicApi
 */
export declare interface Predicate<T> {
    (value: T): boolean;
}

declare const PREORDER_HOOK_FLAGS = 18;

/** More flags associated with an LView (saved in LView[FLAGS_MORE]) */
declare const enum PreOrderHookFlags {
    /** The index of the next pre-order hook to be called in the hooks array, on the first 16
       bits */
    IndexOfTheNextPreOrderHookMaskMask = 65535,
    /**
     * The number of init hooks that have already been called, on the last 16 bits
     */
    NumberOfInitHooksCalledIncrementer = 65536,
    NumberOfInitHooksCalledShift = 16,
    NumberOfInitHooksCalledMask = 4294901760
}

/**
 * Procedural style of API needed to create elements and text nodes.
 *
 * In non-native browser environments (e.g. platforms such as web-workers), this is the
 * facade that enables element manipulation. This also facilitates backwards compatibility
 * with Renderer2.
 */
declare interface ProceduralRenderer3 {
    destroy(): void;
    createComment(value: string): RComment;
    createElement(name: string, namespace?: string | null): RElement;
    createText(value: string): RText;
    /**
     * This property is allowed to be null / undefined,
     * in which case the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode?: ((node: RNode) => void) | null;
    appendChild(parent: RElement, newChild: RNode): void;
    insertBefore(parent: RNode, newChild: RNode, refChild: RNode | null): void;
    removeChild(parent: RElement, oldChild: RNode, isHostElement?: boolean): void;
    selectRootElement(selectorOrNode: string | any): RElement;
    parentNode(node: RNode): RElement | null;
    nextSibling(node: RNode): RNode | null;
    setAttribute(el: RElement, name: string, value: string, namespace?: string | null): void;
    removeAttribute(el: RElement, name: string, namespace?: string | null): void;
    addClass(el: RElement, name: string): void;
    removeClass(el: RElement, name: string): void;
    setStyle(el: RElement, style: string, value: any, flags?: RendererStyleFlags2 | RendererStyleFlags3): void;
    removeStyle(el: RElement, style: string, flags?: RendererStyleFlags2 | RendererStyleFlags3): void;
    setProperty(el: RElement, name: string, value: any): void;
    setValue(node: RText | RComment, value: string): void;
    listen(target: GlobalTargetName | RNode, eventName: string, callback: (event: any) => boolean | void): () => void;
}

/**
 * Describes a function that is used to process provider list (for example in case of provider
 * overrides).
 */
declare type ProcessProvidersFunction = (providers: Provider[]) => Provider[];

/**
 * List of slots for a projection. A slot can be either based on a parsed CSS selector
 * which will be used to determine nodes which are projected into that slot.
 *
 * When set to "*", the slot is reserved and can be used for multi-slot projection
 * using {@link ViewContainerRef#createComponent}. The last slot that specifies the
 * wildcard selector will retrieve all projectable nodes which do not match any selector.
 */
declare type ProjectionSlots = (??CssSelectorList | '*')[];

/**
 * This mapping is necessary so we can set input properties and output listeners
 * properly at runtime when property names are minified or aliased.
 *
 * Key: unminified / public input or output name
 * Value: array containing minified / internal name and related directive index
 *
 * The value must be an array to support inputs and outputs with the same name
 * on the same node.
 */
declare type PropertyAliases = {
    [key: string]: PropertyAliasValue;
};

/**
 * Store the runtime input or output names for all the directives.
 *
 * i+0: directive instance index
 * i+1: publicName
 * i+2: privateName
 *
 * e.g. [0, 'change', 'change-minified']
 */
declare type PropertyAliasValue = (number | string)[];

/**
 * Describes how the `Injector` should be configured.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @see `TypeProvider`
 * @see `ClassProvider`
 * @see `StaticProvider`
 *
 * @publicApi
 */
export declare type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];

declare interface ProviderDef {
    token: any;
    value: any;
    deps: DepDef[];
}

declare interface ProviderOverride {
    token: any;
    flags: ??NodeFlags;
    value: any;
    deps: ([??DepFlags, any] | any)[];
    deprecatedBehavior: boolean;
}

/**
 * Testability API.
 * `declare` keyword causes tsickle to generate externs, so these methods are
 * not renamed by Closure Compiler.
 * @publicApi
 */
declare interface PublicTestability {
    isStable(): boolean;
    whenStable(callback: Function, timeout?: number, updateCallback?: Function): void;
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}

declare const QUERIES = 5;

/**
 * Type of the Query metadata.
 *
 * @publicApi
 */
export declare interface Query {
    descendants: boolean;
    first: boolean;
    read: any;
    isViewQuery: boolean;
    selector: any;
    static: boolean;
}

/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * @publicApi
 */
export declare abstract class Query {
}

declare interface QueryBindingDef {
    propName: string;
    bindingType: ??QueryBindingType;
}

declare interface QueryDef {
    id: number;
    filterId: number;
    bindings: QueryBindingDef[];
}

/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link ViewChildren}, {@link ContentChildren}, and {@link QueryList}
 * provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * @Component({...})
 * class Container {
 *   @ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 *
 * @publicApi
 */
export declare class QueryList<T> {
    readonly dirty = true;
    private _results;
    readonly changes: Observable<any>;
    readonly length: number;
    readonly first: T;
    readonly last: T;
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    map<U>(fn: (item: T, index: number, array: T[]) => U): U[];
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    filter(fn: (item: T, index: number, array: T[]) => boolean): T[];
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    find(fn: (item: T, index: number, array: T[]) => boolean): T | undefined;
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[]) => U, init: U): U;
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    forEach(fn: (item: T, index: number, array: T[]) => void): void;
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    some(fn: (value: T, index: number, array: T[]) => boolean): boolean;
    /**
     * Returns a copy of the internal results list as an Array.
     */
    toArray(): T[];
    toString(): string;
    /**
     * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
     * on change detection, it will not notify of changes to the queries, unless a new change
     * occurs.
     *
     * @param resultsTree The results tree to store
     */
    reset(resultsTree: Array<T | any[]>): void;
    /**
     * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
     */
    notifyOnChanges(): void;
    /** internal */
    setDirty(): void;
    /** internal */
    destroy(): void;
}

declare class R3Injector {
    readonly parent: Injector;
    /**
     * Map of tokens to records which contain the instances of those tokens.
     */
    private records;
    /**
     * The transitive set of `InjectorType`s which define this injector.
     */
    private injectorDefTypes;
    /**
     * Set of values instantiated by this injector which contain `ngOnDestroy` lifecycle hooks.
     */
    private onDestroy;
    /**
     * Flag indicating this injector provides the APP_ROOT_SCOPE token, and thus counts as the
     * root scope.
     */
    private readonly isRootInjector;
    readonly source: string | null;
    /**
     * Flag indicating that this injector was previously destroyed.
     */
    readonly destroyed: boolean;
    private _destroyed;
    constructor(def: InjectorType<any>, additionalProviders: StaticProvider[] | null, parent: Injector, source?: string | null);
    /**
     * Destroy the injector and release references to every instance or provider associated with it.
     *
     * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
     * hook was found.
     */
    destroy(): void;
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: any, flags?: InjectFlags): T;
    private assertNotDestroyed;
    /**
     * Add an `InjectorType` or `InjectorDefTypeWithProviders` and all of its transitive providers
     * to this injector.
     */
    private processInjectorType;
    /**
     * Process a `SingleProvider` and add it.
     */
    private processProvider;
    private hydrate;
    private injectableDefInScope;
}

declare interface Range {
}

declare interface RComment extends RNode {
    textContent: string | null;
}

declare interface RCssStyleDeclaration {
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string): void;
}

declare interface RDomTokenList {
    add(token: string): void;
    remove(token: string): void;
}

/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * @usageNotes
 * ### Example
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * @deprecated from v5 - slow and brings in a lot of code, Use `Injector.create` instead.
 * @publicApi
 */
export declare abstract class ReflectiveInjector implements Injector {
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of `ResolvedReflectiveProvider`s.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     */
    static resolve(providers: Provider[]): ResolvedReflectiveProvider[];
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, `Provider`,
     * or a recursive array of more providers.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    static resolveAndCreate(providers: Provider[], parent?: Injector): ReflectiveInjector;
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    static fromResolvedProviders(providers: ResolvedReflectiveProvider[], parent?: Injector): ReflectiveInjector;
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     */
    abstract readonly parent: Injector | null;
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, `Provider`,
     * or a recursive array of more providers.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     */
    abstract resolveAndCreateChild(providers: Provider[]): ReflectiveInjector;
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     */
    abstract createChildFromResolved(providers: ResolvedReflectiveProvider[]): ReflectiveInjector;
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    abstract resolveAndInstantiate(provider: Provider): any;
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     */
    abstract instantiateResolved(provider: ResolvedReflectiveProvider): any;
    abstract get(token: any, notFoundValue?: any): any;
}


/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 *
 * @deprecated No replacement
 * @publicApi
 */
export declare class ReflectiveKey {
    token: Object;
    id: number;
    readonly displayName: string;
    /**
     * Private
     */
    constructor(token: Object, id: number);
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token: Object): ReflectiveKey;
    /**
     * @returns the number of keys registered in the system.
     */
    static readonly numberOfKeys: number;
}

/**
 * Subset of API needed for writing attributes, properties, and setting up
 * listeners on Element.
 */
declare interface RElement extends RNode {
    style: RCssStyleDeclaration;
    classList: RDomTokenList;
    className: string;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    removeEventListener(type: string, listener?: EventListener, options?: boolean): void;
    setProperty?(name: string, value: any): void;
}

/**
 * @deprecated Use `RendererType2` (and `Renderer2`) instead.
 * @publicApi
 */
export declare class RenderComponentType {
    id: string;
    templateUrl: string;
    slotCount: number;
    encapsulation: ViewEncapsulation;
    styles: Array<string | any[]>;
    animations: any;
    constructor(id: string, templateUrl: string, slotCount: number, encapsulation: ViewEncapsulation, styles: Array<string | any[]>, animations: any);
}

declare const RENDERER = 12;

/**
 * @deprecated Use the `Renderer2` instead.
 * @publicApi
 */
export declare abstract class Renderer {
    abstract selectRootElement(selectorOrNode: string | any, debugInfo?: ??RenderDebugInfo): any;
    abstract createElement(parentElement: any, name: string, debugInfo?: ??RenderDebugInfo): any;
    abstract createViewRoot(hostElement: any): any;
    abstract createTemplateAnchor(parentElement: any, debugInfo?: ??RenderDebugInfo): any;
    abstract createText(parentElement: any, value: string, debugInfo?: ??RenderDebugInfo): any;
    abstract projectNodes(parentElement: any, nodes: any[]): void;
    abstract attachViewAfter(node: any, viewRootNodes: any[]): void;
    abstract detachView(viewRootNodes: any[]): void;
    abstract destroyView(hostElement: any, viewAllNodes: any[]): void;
    abstract listen(renderElement: any, name: string, callback: Function): Function;
    abstract listenGlobal(target: string, name: string, callback: Function): Function;
    abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    abstract setElementAttribute(renderElement: any, attributeName: string, attributeValue?: string): void;
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     */
    abstract setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void;
    abstract setElementClass(renderElement: any, className: string, isAdd: boolean): void;
    abstract setElementStyle(renderElement: any, styleName: string, styleValue?: string): void;
    abstract invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void;
    abstract setText(renderNode: any, text: string): void;
    abstract animate(element: any, startingStyles: any, keyframes: any[], duration: number, delay: number, easing: string, previousPlayers?: any[]): any;
}

/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * @publicApi
 */
export declare abstract class Renderer2 {
    /**
     * Use to store arbitrary developer-defined data on a renderer instance,
     * as an object containing key-value pairs.
     * This is useful for renderers that delegate to other renderers.
     */
    abstract readonly data: {
        [key: string]: any;
    };
    /**
     * Implement this callback to destroy the renderer or the host element.
     */
    abstract destroy(): void;
    /**
     * Implement this callback to create an instance of the host element.
     * @param name An identifying name for the new element, unique within the namespace.
     * @param namespace The namespace for the new element.
     * @returns The new element.
     */
    abstract createElement(name: string, namespace?: string | null): any;
    /**
     * Implement this callback to add a comment to the DOM of the host element.
     * @param value The comment text.
     * @returns The modified element.
     */
    abstract createComment(value: string): any;
    /**
     * Implement this callback to add text to the DOM of the host element.
     * @param value The text string.
     * @returns The modified element.
     */
    abstract createText(value: string): any;
    /**
     * If null or undefined, the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode: ((node: any) => void) | null;
    /**
     * Appends a child to a given parent node in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child node.
     */
    abstract appendChild(parent: any, newChild: any): void;
    /**
     * Implement this callback to insert a child node at a given position in a parent node
     * in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child nodes.
     * @param refChild The existing child node that should precede the new node.
     */
    abstract insertBefore(parent: any, newChild: any, refChild: any): void;
    /**
     * Implement this callback to remove a child node from the host element's DOM.
     * @param parent The parent node.
     * @param oldChild The child node to remove.
     * @param isHostElement Optionally signal to the renderer whether this element is a host element
     * or not
     */
    abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void;
    /**
     * Implement this callback to prepare an element to be bootstrapped
     * as a root element, and return the element instance.
     * @param selectorOrNode The DOM element.
     * @param preserveContent Whether the contents of the root element
     * should be preserved, or cleared upon bootstrap (default behavior).
     * Use with `ViewEncapsulation.ShadowDom` to allow simple native
     * content projection via `<slot>` elements.
     * @returns The root element.
     */
    abstract selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any;
    /**
     * Implement this callback to get the parent of a given node
     * in the host element's DOM.
     * @param node The child node to query.
     * @returns The parent node, or null if there is no parent.
     * For WebWorkers, always returns true.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract parentNode(node: any): any;
    /**
     * Implement this callback to get the next sibling node of a given node
     * in the host element's DOM.
     * @returns The sibling node, or null if there is no sibling.
     * For WebWorkers, always returns a value.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract nextSibling(node: any): any;
    /**
     * Implement this callback to set an attribute value for an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param value The new value.
     * @param namespace The namespace.
     */
    abstract setAttribute(el: any, name: string, value: string, namespace?: string | null): void;
    /**
     * Implement this callback to remove an attribute from an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param namespace The namespace.
     */
    abstract removeAttribute(el: any, name: string, namespace?: string | null): void;
    /**
     * Implement this callback to add a class to an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract addClass(el: any, name: string): void;
    /**
     * Implement this callback to remove a class from an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract removeClass(el: any, name: string): void;
    /**
     * Implement this callback to set a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param value The new value.
     * @param flags Flags for style variations. No flags are set by default.
     */
    abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to remove the value from a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param flags Flags for style variations to remove, if set. ???
     */
    abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to set the value of a property of an element in the DOM.
     * @param el The element.
     * @param name The property name.
     * @param value The new value.
     */
    abstract setProperty(el: any, name: string, value: any): void;
    /**
     * Implement this callback to set the value of a node in the host element.
     * @param node The node.
     * @param value The new value.
     */
    abstract setValue(node: any, value: string): void;
    /**
     * Implement this callback to start an event listener.
     * @param target The context in which to listen for events. Can be
     * the entire window or document, the body of the document, or a specific
     * DOM element.
     * @param eventName The event to listen for.
     * @param callback A handler function to invoke when the event occurs.
     * @returns An "unlisten" function for disposing of this handler.
     */
    abstract listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void): () => void;
}

declare type Renderer3 = ObjectOrientedRenderer3 | ProceduralRenderer3;

declare const RENDERER_FACTORY = 11;

/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * @publicApi
 */
export declare abstract class RendererFactory2 {
    /**
     * Creates and initializes a custom renderer for a host DOM element.
     * @param hostElement The element to render.
     * @param type The base class to implement.
     * @returns The new custom renderer instance.
     */
    abstract createRenderer(hostElement: any, type: RendererType2 | null): Renderer2;
    /**
     * A callback invoked when rendering has begun.
     */
    abstract begin?(): void;
    /**
     * A callback invoked when rendering has completed.
     */
    abstract end?(): void;
    /**
     * Use with animations test-only mode. Notifies the test when rendering has completed.
     * @returns The asynchronous result of the developer-defined function.
     */
    abstract whenRenderingDone?(): Promise<any>;
}

declare interface RendererFactory3 {
    createRenderer(hostElement: RElement | null, rendererType: RendererType2 | null): Renderer3;
    begin?(): void;
    end?(): void;
}

/**
 * Flags for renderer-specific style modifiers.
 * @publicApi
 */
export declare enum RendererStyleFlags2 {
    /**
     * Marks a style as important.
     */
    Important = 1,
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    DashCase = 2
}

declare enum RendererStyleFlags3 {
    Important = 1,
    DashCase = 2
}

/**
 * Used by `RendererFactory2` to associate custom rendering data and styles
 * with a rendering implementation.
 *  @publicApi
 */
export declare interface RendererType2 {
    /**
     * A unique identifying string for the new renderer, used when creating
     * unique styles for encapsulation.
     */
    id: string;
    /**
     * The view encapsulation type, which determines how styles are applied to
     * DOM elements. One of
     * - `Emulated` (default): Emulate native scoping of styles.
     * - `Native`: Use the native encapsulation mechanism of the renderer.
     * - `ShadowDom`: Use modern [Shadow
     * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * create a ShadowRoot for component's host element.
     * - `None`: Do not provide any template or style encapsulation.
     */
    encapsulation: ViewEncapsulation;
    /**
     * Defines CSS styles to be stored on a renderer instance.
     */
    styles: (string | any[])[];
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     */
    data: {
        [kind: string]: any;
    };
}

/**
 * An internal resolved representation of a factory function created by resolving `Provider`.
 * @publicApi
 */
export declare class ResolvedReflectiveFactory {
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function;
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: ??angular_packages_core_core_d[];
    constructor(
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function, 
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: ??angular_packages_core_core_d[]);
}

/**
 * An internal resolved representation of a `Provider` used by the `Injector`.
 *
 * @usageNotes
 * This is usually created automatically by `Injector.resolveAndCreate`.
 *
 * It can be created manually, as follows:
 *
 * ### Example
 *
 * ```typescript
 * var resolvedProviders = Injector.resolve([{ provide: 'message', useValue: 'Hello' }]);
 * var injector = Injector.fromResolvedProviders(resolvedProviders);
 *
 * expect(injector.get('message')).toEqual('Hello');
 * ```
 *
 * @publicApi
 */
export declare interface ResolvedReflectiveProvider {
    /**
     * A key, usually a `Type<any>`.
     */
    key: ReflectiveKey;
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    resolvedFactories: ResolvedReflectiveFactory[];
    /**
     * Indicates if the provider is a multi-provider or a regular provider.
     */
    multiProvider: boolean;
}

/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * @see `forwardRef`
 * @publicApi
 */
export declare function resolveForwardRef<T>(type: T): T;

/** Subset of API needed for appending elements and text nodes. */
declare interface RNode {
    /**
     * Returns the parent Element, Document, or DocumentFragment
     */
    parentNode: RNode | null;
    /**
     * Returns the parent Element if there is one
     */
    parentElement: RElement | null;
    /**
     * Gets the Node immediately following this one in the parent's childNodes
     */
    nextSibling: RNode | null;
    /**
     * Removes a child from the current node and returns the removed node
     * @param oldChild the child node to remove
     */
    removeChild(oldChild: RNode): RNode;
    /**
     * Insert a child node.
     *
     * Used exclusively for adding View root nodes into ViewAnchor location.
     */
    insertBefore(newChild: RNode, refChild: RNode | null, isViewRoot: boolean): void;
    /**
     * Append a child node.
     *
     * Used exclusively for building up DOM which are static (ie not View roots)
     */
    appendChild(newChild: RNode): RNode;
}

/**
 * RootContext contains information which is shared for all components which
 * were bootstrapped with {@link renderComponent}.
 */
declare interface RootContext {
    /**
     * A function used for scheduling change detection in the future. Usually
     * this is `requestAnimationFrame`.
     */
    scheduler: (workFn: () => void) => void;
    /**
     * A promise which is resolved when all components are considered clean (not dirty).
     *
     * This promise is overwritten every time a first call to {@link markDirty} is invoked.
     */
    clean: Promise<null>;
    /**
     * RootComponents - The components that were instantiated by the call to
     * {@link renderComponent}.
     */
    components: {}[];
    /**
     * The player flushing handler to kick off all animations
     */
    playerHandler: ??PlayerHandler | null;
    /**
     * What render-related operations to run once a scheduler has been set
     */
    flags: RootContextFlags;
}

declare const enum RootContextFlags {
    Empty = 0,
    DetectChanges = 1,
    FlushPlayers = 2
}

declare interface RootData {
    injector: Injector;
    ngModule: NgModuleRef<any>;
    projectableNodes: any[][];
    selectorOrNode: any;
    renderer: Renderer2;
    rendererFactory: RendererFactory2;
    errorHandler: ErrorHandler;
    sanitizer: Sanitizer;
}

/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link Renderer#setElementProperty setElementProperty} or
 * {@link Renderer#setElementAttribute setElementAttribute} respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactory2` instead.
 * @publicApi
 */
export declare abstract class RootRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
}

declare interface RText extends RNode {
    textContent: string | null;
}

declare const SANITIZER = 13;

/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * @publicApi
 */
export declare abstract class Sanitizer {
    abstract sanitize(context: SecurityContext, value: {} | string | null): string | null;
}


/**
 * Function used to sanitize the value before writing it into the renderer.
 */
declare type SanitizerFn = (value: any, tagName?: string, propName?: string) => string;


/**
 * A schema definition associated with an NgModule.
 *
 * @see `@NgModule`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
 *
 * @param name The name of a defined schema.
 *
 * @publicApi
 */
export declare interface SchemaMetadata {
    name: string;
}

declare interface Scope {
    (...args: any[] /** TODO #9100 */): any;
}


/**
 * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
 * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
 * handled.
 *
 * See DomSanitizer for more details on security in Angular applications.
 *
 * @publicApi
 */
export declare enum SecurityContext {
    NONE = 0,
    HTML = 1,
    STYLE = 2,
    SCRIPT = 3,
    URL = 4,
    RESOURCE_URL = 5
}

/** Flags used to build up CssSelectors */
declare const enum SelectorFlags {
    /** Indicates this is the beginning of a new negative selector */
    NOT = 1,
    /** Mode for matching attributes */
    ATTRIBUTE = 2,
    /** Mode for matching tag names */
    ELEMENT = 4,
    /** Mode for matching class names */
    CLASS = 8
}

/**
 * Type of the Self metadata.
 *
 * @publicApi
 */
export declare interface Self {
}

/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const Self: SelfDecorator;

/**
 * Type of the Self decorator / constructor function.
 *
 * @publicApi
 */
export declare interface SelfDecorator {
    /**
     * A parameter decorator to be used on constructor parameters,
     * which tells the DI framework to start dependency resolution from the local injector.
     *
     * Resolution works upward through the injector hierarchy, so the children
     * of this class must configure their own providers or be prepared for a null result.
     *
     * @usageNotes
     *
     * In the following example, the dependency can be resolved
     * by the local injector when instantiating the class itself, but not
     * when instantiating a child.
     *
     * <code-example path="core/di/ts/metadata_spec.ts" region="Self"></code-example>
     *
     *
     * @see `SkipSelf`
     * @see `Optional`
     *
     */
    (): any;
    new (): Self;
}

/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @publicApi
 */
export declare function setTestabilityGetter(getter: GetTestability): void;


/**
 * Represents a basic change from a previous to a new value for a single
 * property on a directive instance. Passed as a value in a
 * {@link SimpleChanges} object to the `ngOnChanges` hook.
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
export declare class SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;
    constructor(previousValue: any, currentValue: any, firstChange: boolean);
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange(): boolean;
}

/**
 * A hashtable of changes represented by {@link SimpleChange} objects stored
 * at the declared property name they belong to on a Directive or Component. This is
 * the type passed to the `ngOnChanges` hook.
 *
 * @see `OnChanges`
 *
 * @publicApi
 */
export declare interface SimpleChanges {
    [propName: string]: SimpleChange;
}

/**
 * An array that contains the index pointer values for every single styling property
 * that exists in the context and for every directive. It also contains the total
 * single styles and single classes that exists in the context as the first two values.
 *
 * Let's say we have the following template code:
 *
 * <div [style.width]="myWidth"
 *      [style.height]="myHeight"
 *      [class.flipped]="flipClass"
 *      directive-with-opacity>
 *      directive-with-foo-bar-classes>
 *
 * We have two directive and template-binding sources,
 * 2 + 1 styles and 1 + 1 classes. When the bindings are
 * registered the SinglePropOffsets array will look like so:
 *
 * s_0/c_0 = template directive value
 * s_1/c_1 = directive one (directive-with-opacity)
 * s_2/c_2 = directive two (directive-with-foo-bar-classes)
 *
 * [3, 2, 2, 1, s_00, s01, c_01, 1, 0, s_10, 0, 1, c_20
 */
declare interface SinglePropOffsetValues extends Array<number> {
    [SinglePropOffsetValuesIndex.StylesCountPosition]: number;
    [SinglePropOffsetValuesIndex.ClassesCountPosition]: number;
}

/**
 * An enum that outlines the offset/position values for each single prop/class entry
 * that are housed inside of [SinglePropOffsetValues].
 */
declare const enum SinglePropOffsetValuesIndex {
    StylesCountPosition = 0,
    ClassesCountPosition = 1,
    ValueStartPosition = 2
}

/**
 * Type of the SkipSelf metadata.
 *
 * @publicApi
 */
export declare interface SkipSelf {
}

/**
 * SkipSelf decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const SkipSelf: SkipSelfDecorator;

/**
 * Type of the SkipSelf decorator / constructor function.
 *
 * @publicApi
 */
export declare interface SkipSelfDecorator {
    /**
     * A parameter decorator to be used on constructor parameters,
     * which tells the DI framework to start dependency resolution from the parent injector.
     * Resolution works upward through the injector hierarchy, so the local injector
     * is not checked for a provider.
     *
     * @usageNotes
     *
     * In the following example, the dependency can be resolved when
     * instantiating a child, but not when instantiating the class itself.
     *
     * <code-example path="core/di/ts/metadata_spec.ts" region="SkipSelf"></code-example>
     *
     * Learn more in the
     * [Dependency Injection guide](guide/dependency-injection-in-action#skip).
     *
     * @see `Self`
     * @see `Optional`
     *
     */
    (): any;
    new (): SkipSelf;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface StaticClassProvider extends StaticClassSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * Base for `StaticClassProvider` decorator.
 *
 * @publicApi
 */
declare interface StaticClassSansProvider {
    /**
     * An optional class to instantiate for the `token`. (If not provided `provide` is assumed to be a
     * class to instantiate)
     */
    useClass: Type<any>;
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     */
    deps: any[];
}

/**
 * Describes how the `Injector` should be configured in a static way (Without reflection).
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @see `ValueProvider`
 * @see `ExistingProvider`
 * @see `FactoryProvider`
 *
 * @publicApi
 */
export declare type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[];

/**
 * Used to intercept and sanitize style values before they are written to the renderer.
 *
 * This function is designed to be called in two modes. When a value is not provided
 * then the function will return a boolean whether a property will be sanitized later.
 * If a value is provided then the sanitized version of that will be returned.
 */
declare interface StyleSanitizeFn {
    /** This mode is designed to instruct whether the property will be used for sanitization
     * at a later point */
    (prop: string): boolean;
    /** This mode is designed to sanitize the provided value */
    (prop: string, value: string): string;
}

/**
 * The styling context acts as a styling manifest (shaped as an array) for determining which
 * styling properties have been assigned via the provided `updateStylingMap`, `updateStyleProp`
 * and `updateClassProp` functions. It also stores the static style/class values that were
 * extracted from the template by the compiler.
 *
 * A context is created by Angular when:
 * 1. An element contains static styling values (like style="..." or class="...")
 * 2. An element contains single property binding values (like [style.prop]="x" or
 * [class.prop]="y")
 * 3. An element contains multi property binding values (like [style]="x" or [class]="y")
 * 4. A directive contains host bindings for static, single or multi styling properties/bindings.
 * 5. An animation player is added to an element via `addPlayer`
 *
 * Note that even if an element contains static styling then this context will be created and
 * attached to it. The reason why this happens (instead of treating styles/classes as regular
 * HTML attributes) is because the style/class bindings must be able to default themselves back
 * to their respective static values when they are set to null.
 *
 * Say for example we have this:
 * ```
 * <!-- when `myWidthExp=null` then a width of `100px`
 *      will be used a default value for width -->
 * <div style="width:100px" [style.width]="myWidthExp"></div>
 * ```
 *
 * Even in the situation where there are no bindings, the static styling is still placed into the
 * context because there may be another directive on the same element that has styling.
 *
 * When Angular initializes styling data for an element then it will first register the static
 * styling values on the element using one of these two instructions:
 *
 * 1. elementStart or element (within the template function of a component)
 * 2. elementHostAttrs (for directive host bindings)
 *
 * In either case, a styling context will be created and stored within an element's `LViewData`.
 * Once the styling context is created then single and multi properties can be stored within it.
 * For this to happen, the following function needs to be called:
 *
 * `elementStyling` (called with style properties, class properties and a sanitizer + a directive
 * instance).
 *
 * When this instruction is called it will populate the styling context with the provided style
 * and class names into the context.
 *
 * The context itself looks like this:
 *
 * context = [
 *   // 0-8: header values (about 8 entries of configuration data)
 *   // 9+: this is where each entry is stored:
 * ]
 *
 * Let's say we have the following template code:
 *
 * ```
 * <div class="foo bar"
 *      style="width:200px; color:red"
 *      [style.width]="myWidthExp"
 *      [style.height]="myHeightExp"
 *      [class.baz]="myBazExp">
 * ```
 *
 * The context generated from these values will look like this (note that
 * for each binding name (the class and style bindings) the values will
 * be inserted twice into the array (once for single property entries and
 * again for multi property entries).
 *
 * context = [
 *   // 0-8: header values (about 8 entries of configuration data)
 *   // 9+: this is where each entry is stored:
 *
 *   // SINGLE PROPERTIES
 *   configForWidth,
 *   'width'
 *   myWidthExp, // the binding value not the binding itself
 *   0, // the directive owner
 *
 *   configForHeight,
 *   'height'
 *   myHeightExp, // the binding value not the binding itself
 *   0, // the directive owner
 *
 *   configForBazClass,
 *   'baz
 *   myBazClassExp, // the binding value not the binding itself
 *   0, // the directive owner
 *
 *   // MULTI PROPERTIES
 *   configForWidth,
 *   'width'
 *   myWidthExp, // the binding value not the binding itself
 *   0, // the directive owner
 *
 *   configForHeight,
 *   'height'
 *   myHeightExp, // the binding value not the binding itself
 *   0, // the directive owner
 *
 *   configForBazClass,
 *   'baz
 *   myBazClassExp, // the binding value not the binding itself
 *   0, // the directive owner
 * ]
 *
 * The configuration values are left out of the example above because
 * the ordering of them could change between code patches. Please read the
 * documentation below to get a better understand of what the configuration
 * values are and how they work.
 *
 * Each time a binding property is updated (whether it be through a single
 * property instruction like `elementStyleProp`, `elementClassProp` or
 * `elementStylingMap`) then the values in the context will be updated as
 * well.
 *
 * If for example `[style.width]` updates to `555px` then its value will be reflected
 * in the context as so:
 *
 * context = [
 *   // ...
 *   configForWidth, // this will be marked DIRTY
 *   'width'
 *   '555px',
 *   0,
 *   //..
 * ]
 *
 * The context and directive data will also be marked dirty.
 *
 * Despite the context being updated, nothing has been rendered on screen (not styles or
 * classes have been set on the element). To kick off rendering for an element the following
 * function needs to be run `elementStylingApply`.
 *
 * `elementStylingApply` will run through the context and find each dirty value and render them onto
 * the element. Once complete, all styles/classes will be set to clean. Because of this, the render
 * function will now know not to rerun itself again if called again unless new style/class values
 * have changed.
 *
 * ## Directives
 * Directive style/class values (which are provided through host bindings) are also supported and
 * housed within the same styling context as are template-level style/class properties/bindings
 * So long as they are all assigned to the same element, both directive-level and template-level
 * styling bindings share the same context.
 *
 * Each of the following instructions supports accepting a directive instance as an input parameter:
 *
 * - `elementHostAttrs`
 * - `elementStyling`
 * - `elementStyleProp`
 * - `elementClassProp`
 * - `elementStylingMap`
 * - `elementStylingApply`
 *
 * Each time a directive value is passed in, it will be converted into an index by examining the
 * directive registry (which lives in the context configuration area). The index is then used
 * to help single style properties figure out where a value is located in the context.
 *
 *
 * ## Single-level styling bindings (`[style.prop]` and `[class.name]`)
 *
 * Both `[style.prop]` and `[class.name]` bindings are run through the `updateStyleProp`
 * and `updateClassProp` functions respectively. They work by examining the provided
 * `offset` value and are able to locate the exact spot in the context where the
 * matching style is located.
 *
 * Both `[style.prop]` and `[class.name]` bindings are able to process these values
 * from directive host bindings. When evaluated (from the host binding function) the
 * `directiveRef` value is then passed in.
 *
 * If two directives or a directive + a template binding both write to the same style/class
 * binding then the styling context code will decide which one wins based on the following
 * rule:
 *
 * 1. If the template binding has a value then it always wins
 * 2. Otherwise whichever first-registered directive that has that value first will win
 *
 * The code example helps make this clear:
 *
 * ```
 * <!--
 * <div [style.width]="myWidth"
 *      [my-width-directive]="'600px'">
 * -->
 *
 * @Directive({
 *  selector: '[my-width-directive']
 * })
 * class MyWidthDirective {
 *   @Input('my-width-directive')
 *   @HostBinding('style.width')
 *   public width = null;
 * }
 * ```
 *
 * Since there is a style binding for width present on the element (`[style.width]`) then
 * it will always win over the width binding that is present as a host binding within
 * the `MyWidthDirective`. However, if `[style.width]` renders as `null` (so `myWidth=null`)
 * then the `MyWidthDirective` will be able to write to the `width` style within the context.
 * Simply put, whichever directive writes to a value first ends up having ownership of it as
 * long as the template didn't set anything.
 *
 * The way in which the ownership is facilitated is through index value. The earliest directives
 * get the smallest index values (with 0 being reserved for the template element bindings). Each
 * time a value is written from a directive or the template bindings, the value itself gets
 * assigned the directive index value in its data. If another directive writes a value again then
 * its directive index gets compared against the directive index that exists on the element. Only
 * when the new value's directive index is less than the existing directive index then the new
 * value will be written to the context. But, if the existing value is null then the new value is
 * written by the less important directive.
 *
 * Each directive also has its own sanitizer and dirty flags. These values are consumed within the
 * rendering function.
 *
 *
 * ## Multi-level styling bindings (`[style]` and `[class]`)
 *
 * Multi-level styling bindings are treated as less important (less specific) as single-level
 * bindings (things like `[style.prop]` and `[class.name]`).
 *
 * Multi-level bindings are still applied to the context in a similar way as are single level
 * bindings, but this process works by diffing the new multi-level values (which are key/value
 * maps) against the existing set of styles that live in the context. Each time a new map value
 * is detected (via identity check) then it will loop through the values and figure out what
 * has changed and reorder the context array to match the ordering of the keys. This reordering
 * of the context makes sure that follow-up traversals of the context when updated against the
 * key/value map are as close as possible to o(n) (where "n" is the size of the key/value map).
 *
 * If a `directiveRef` value is passed in then the styling algorithm code will take the directive's
 * prioritization index into account and update the values with respect to more important
 * directives. This means that if a value such as `width` is updated in two different `[style]`
 * bindings (say one on the template and another within a directive that sits on the same element)
 * then the algorithm will decide how to update the value based on the following heuristic:
 *
 * 1. If the template binding has a value then it always wins
 * 2. If not then whichever first-registered directive that has that value first will win
 *
 * It will also update the value if it was set to `null` by a previous directive (or the template).
 *
 * Each time a value is updated (or removed) then the context will change shape to better match
 * the ordering of the styling data as well as the ordering of each directive that contains styling
 * data. (See `patchStylingMapIntoContext` inside of class_and_style_bindings.ts to better
 * understand how this works.)
 *
 * ## Rendering
 * The rendering mechanism (when the styling data is applied on screen) occurs via the
 * `elementStylingApply` function and is designed to run after **all** styling functions have been
 * evaluated. The rendering algorithm will loop over the context and only apply the styles that are
 * flagged as dirty (either because they are new, updated or have been removed via multi or
 * single bindings).
 */
declare interface StylingContext extends Array<{
    [key: string]: any;
} | number | string | boolean | RElement | StyleSanitizeFn | PlayerContext | null> {
    /**
     * Location of element that is used as a target for this context.
     */
    [StylingIndex.ElementPosition]: LContainer | ??angular_packages_core_core_bm | RElement | null;
    /**
     * A numeric value representing the configuration status (whether the context is dirty or not)
     * mixed together (using bit shifting) with a index value which tells the starting index value
     * of where the multi style entries begin.
     */
    [StylingIndex.MasterFlagPosition]: number;
    /**
     * Location of the collection of directives for this context
     */
    [StylingIndex.DirectiveRegistryPosition]: DirectiveRegistryValues;
    /**
     * Location of all static styles values
     */
    [StylingIndex.InitialStyleValuesPosition]: InitialStylingValues;
    /**
     * Location of all static class values
     */
    [StylingIndex.InitialClassValuesPosition]: InitialStylingValues;
    /**
     * A numeric value representing the class index offset value. Whenever a single class is
     * applied (using `elementClassProp`) it should have an styling index value that doesn't
     * need to take into account any style values that exist in the context.
     */
    [StylingIndex.SinglePropOffsetPositions]: SinglePropOffsetValues;
    /**
     * The last class value that was interpreted by elementStylingMap. This is cached
     * So that the algorithm can exit early incase the value has not changed.
     */
    [StylingIndex.CachedMultiClasses]: any | MapBasedOffsetValues;
    /**
     * The last style value that was interpreted by elementStylingMap. This is cached
     * So that the algorithm can exit early incase the value has not changed.
     */
    [StylingIndex.CachedMultiStyles]: any | MapBasedOffsetValues;
    /**
     * A queue of all hostStyling instructions.
     *
     * This array (queue) is populated only when host-level styling instructions
     * (e.g. `hostStylingMap` and `hostClassProp`) are used to apply style and
     * class values via host bindings to the host element. Despite these being
     * standard angular instructions, they are not designed to immediately apply
     * their values to the styling context when executed. What happens instead is
     * a queue is constructed and each instruction is populated into the queue.
     * Then, once the style/class values are set to flush (via `elementStylingApply` or
     * `hostStylingApply`), the queue is flushed and the values are rendered onto
     * the host element.
     */
    [StylingIndex.HostInstructionsQueue]: HostInstructionsQueue | null;
    /**
     * Location of animation context (which contains the active players) for this element styling
     * context.
     */
    [StylingIndex.PlayerContext]: PlayerContext | null;
}

/** Used as numeric pointer values to determine what cells to update in the `StylingContext` */
declare const enum StylingIndex {
    ElementPosition = 0,
    MasterFlagPosition = 1,
    DirectiveRegistryPosition = 2,
    InitialStyleValuesPosition = 3,
    InitialClassValuesPosition = 4,
    SinglePropOffsetPositions = 5,
    CachedMultiClasses = 6,
    CachedMultiStyles = 7,
    HostInstructionsQueue = 8,
    PlayerContext = 9,
    SingleStylesStartPosition = 10,
    FlagsOffset = 0,
    PropertyOffset = 1,
    ValueOffset = 2,
    PlayerBuilderIndexOffset = 3,
    Size = 4,
    BitCountSize = 14,
    BitMask = 16383
}

/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * @publicApi
 * @deprecated the `string` form of `loadChildren` is deprecated, and `SystemJsNgModuleLoader` is
 * part of its implementation. See `LoadChildren` for more details.
 */
export declare class SystemJsNgModuleLoader implements NgModuleFactoryLoader {
    private _compiler;
    private _config;
    constructor(_compiler: Compiler, config?: SystemJsNgModuleLoaderConfig);
    load(path: string): Promise<NgModuleFactory<any>>;
    private loadAndCompile;
    private loadFactory;
}

/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * @publicApi
 * @deprecated the `string` form of `loadChildren` is deprecated, and `SystemJsNgModuleLoaderConfig`
 * is part of its implementation. See `LoadChildren` for more details.
 */
export declare abstract class SystemJsNgModuleLoaderConfig {
    /**
     * Prefix to add when computing the name of the factory module for a given module name.
     */
    factoryPathPrefix: string;
    /**
     * Suffix to add when computing the name of the factory module for a given module name.
     */
    factoryPathSuffix: string;
}

declare const T_HOST = 6;

/**
 * A combination of:
 * - Attribute names and values.
 * - Special markers acting as flags to alter attributes processing.
 * - Parsed ngProjectAs selectors.
 */
declare type TAttributes = (string | ??AttributeMarker | CssSelector)[];

/** Static data for an LContainer */
declare interface TContainerNode extends TNode {
    /**
     * Index in the data[] array.
     *
     * If it's -1, this is a dynamically created container node that isn't stored in
     * data[] (e.g. when you inject ViewContainerRef) .
     */
    index: number;
    child: null;
    /**
     * Container nodes will have parents unless:
     *
     * - They are the first node of a component or embedded view
     * - They are dynamically created
     */
    parent: ??angular_packages_core_core_bg | TElementContainerNode | null;
    tViews: TView | TView[] | null;
    projection: null;
}

/**
 * Static data that corresponds to the instance-specific data array on an LView.
 *
 * Each node's static data is stored in tData at the same index that it's stored
 * in the data array.  Any nodes that do not have static data store a null value in
 * tData to avoid a sparse array.
 *
 * Each pipe's definition is stored here at the same index as its pipe instance in
 * the data array.
 *
 * Each host property's name is stored here at the same index as its value in the
 * data array.
 *
 * Each property binding name is stored here at the same index as its value in
 * the data array. If the binding is an interpolation, the static string values
 * are stored parallel to the dynamic values. Example:
 *
 * id="prefix {{ v0 }} a {{ v1 }} b {{ v2 }} suffix"
 *
 * LView       |   TView.data
 *------------------------
 *  v0 value   |   'a'
 *  v1 value   |   'b'
 *  v2 value   |   id ??? prefix ??? suffix
 *
 * Injector bloom filters are also stored here.
 */
declare type TData = (TNode | ??PipeDef<any> | ??DirectiveDef<any> | ??ComponentDef<any> | number | Type<any> | InjectionToken<any> | TI18n | I18nUpdateOpCodes | null | string)[];

/** Static data for an <ng-container> */
declare interface TElementContainerNode extends TNode {
    /** Index in the LView[] array. */
    index: number;
    child: ??angular_packages_core_core_bg | TTextNode | TContainerNode | TElementContainerNode | TProjectionNode | null;
    parent: ??angular_packages_core_core_bg | TElementContainerNode | null;
    tViews: null;
    projection: null;
}

/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see `ViewContainerRef`
 * @see [Navigate the Component Tree with DI](guide/dependency-injection-navtree)
 *
 * @publicApi
 */
export declare abstract class TemplateRef<C> {
    /**
     * The anchor element in the parent view for this embedded view.
     *
     * The data-binding and injection contexts of embedded views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new embedded views are attached to the view container of this location, but in
     * advanced use-cases, the view can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    abstract readonly elementRef: ElementRef;
    /**
     * Instantiates an embedded view based on this template,
     * and attaches it to the view container.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @returns The new embedded view object.
     */
    abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}

/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @publicApi
 */
export declare class Testability implements PublicTestability {
    private _ngZone;
    private _pendingCount;
    private _isZoneStable;
    private _callbacks;
    private taskTrackingZone;
    constructor(_ngZone: NgZone);
    private _watchAngularEvents;
    /**
     * Increases the number of pending request
     * @deprecated pending requests are now tracked with zones.
     */
    increasePendingRequestCount(): number;
    /**
     * Decreases the number of pending request
     * @deprecated pending requests are now tracked with zones
     */
    decreasePendingRequestCount(): number;
    /**
     * Whether an associated application is stable
     */
    isStable(): boolean;
    private _runCallbacksIfReady;
    private getPendingTasks;
    private addCallback;
    /**
     * Wait for the application to be stable with a timeout. If the timeout is reached before that
     * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
     *
     * @param doneCb The callback to invoke when Angular is stable or the timeout expires
     *    whichever comes first.
     * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
     *    specified, whenStable() will wait forever.
     * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
     *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
     *    and no further updates will be issued.
     */
    whenStable(doneCb: Function, timeout?: number, updateCb?: Function): void;
    /**
     * Get the number of pending requests
     * @deprecated pending requests are now tracked with zones
     */
    getPendingRequestCount(): number;
    /**
     * Find providers by name
     * @param using The root element to search from
     * @param provider The name of binding variable
     * @param exactMatch Whether using exactMatch
     */
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}

/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
export declare class TestabilityRegistry {
    constructor();
    /**
     * Registers an application with a testability hook so that it can be tracked
     * @param token token of application, root element
     * @param testability Testability hook
     */
    registerApplication(token: any, testability: Testability): void;
    /**
     * Unregisters an application.
     * @param token token of application, root element
     */
    unregisterApplication(token: any): void;
    /**
     * Unregisters all applications
     */
    unregisterAllApplications(): void;
    /**
     * Get a testability hook associated with the application
     * @param elem root element
     */
    getTestability(elem: any): Testability | null;
    /**
     * Get all registered testabilities
     */
    getAllTestabilities(): Testability[];
    /**
     * Get all registered applications(root elements)
     */
    getAllRootElements(): any[];
    /**
     * Find testability of a node in the Tree
     * @param elem node
     * @param findInAncestors whether finding testability in ancestors if testability was not found in
     * current node
     */
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability | null;
}

declare interface TextDef {
    prefix: string;
}

/**
 * Store information for the i18n translation block.
 */
declare interface TI18n {
    /**
     * Number of slots to allocate in expando.
     *
     * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
     * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
     * write into them.
     */
    vars: number;
    /**
     * A set of OpCodes which will create the Text Nodes and ICU anchors for the translation blocks.
     *
     * NOTE: The ICU anchors are filled in with ICU Update OpCode.
     */
    create: I18nMutateOpCodes;
    /**
     * A set of OpCodes which will be executed on each change detection to determine if any changes to
     * DOM are required.
     */
    update: I18nUpdateOpCodes;
    /**
     * A list of ICUs in a translation block (or `null` if block has no ICUs).
     *
     * Example:
     * Given: `<div i18n>You have {count, plural, ...} and {state, switch, ...}</div>`
     * There would be 2 ICUs in this array.
     *   1. `{count, plural, ...}`
     *   2. `{state, switch, ...}`
     */
    icus: TIcu[] | null;
}

declare interface TIcu {
    /**
     * Defines the ICU type of `select` or `plural`
     */
    type: IcuType;
    /**
     * Number of slots to allocate in expando for each case.
     *
     * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
     * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
     * write into them.
     */
    vars: number[];
    /**
     * An optional array of child/sub ICUs.
     *
     * In case of nested ICUs such as:
     * ```
     * {???0???, plural,
     *   =0 {zero}
     *   other {???0??? {???1???, select,
     *                     cat {cats}
     *                     dog {dogs}
     *                     other {animals}
     *                   }!
     *   }
     * }
     * ```
     * When the parent ICU is changing it must clean up child ICUs as well. For this reason it needs
     * to know which child ICUs to run clean up for as well.
     *
     * In the above example this would be:
     * ```ts
     * [
     *   [],   // `=0` has no sub ICUs
     *   [1],  // `other` has one subICU at `1`st index.
     * ]
     * ```
     *
     * The reason why it is Array of Arrays is because first array represents the case, and second
     * represents the child ICUs to clean up. There may be more than one child ICUs per case.
     */
    childIcus: number[][];
    /**
     * A list of case values which the current ICU will try to match.
     *
     * The last value is `other`
     */
    cases: any[];
    /**
     * A set of OpCodes to apply in order to build up the DOM render tree for the ICU
     */
    create: I18nMutateOpCodes[];
    /**
     * A set of OpCodes to apply in order to destroy the DOM render tree for the ICU.
     */
    remove: I18nMutateOpCodes[];
    /**
     * A set of OpCodes to apply in order to update the DOM render tree for the ICU bindings.
     */
    update: I18nUpdateOpCodes[];
}

/**
 * Binding data (flyweight) for a particular node that is shared between all templates
 * of a specific type.
 *
 * If a property is:
 *    - PropertyAliases: that property's data was generated and this is it
 *    - Null: that property's data was already generated and nothing was found.
 *    - Undefined: that property's data has not yet been generated
 *
 * see: https://en.wikipedia.org/wiki/Flyweight_pattern for more on the Flyweight pattern
 */
declare interface TNode {
    /** The type of the TNode. See TNodeType. */
    type: TNodeType;
    /**
     * Index of the TNode in TView.data and corresponding native element in LView.
     *
     * This is necessary to get from any TNode to its corresponding native element when
     * traversing the node tree.
     *
     * If index is -1, this is a dynamically created container node or embedded view node.
     */
    index: number;
    /**
     * The index of the closest injector in this node's LView.
     *
     * If the index === -1, there is no injector on this node or any ancestor node in this view.
     *
     * If the index !== -1, it is the index of this node's injector OR the index of a parent injector
     * in the same view. We pass the parent injector index down the node tree of a view so it's
     * possible to find the parent injector without walking a potentially deep node tree. Injector
     * indices are not set across view boundaries because there could be multiple component hosts.
     *
     * If tNode.injectorIndex === tNode.parent.injectorIndex, then the index belongs to a parent
     * injector.
     */
    injectorIndex: number;
    /**
     * Stores starting index of the directives.
     */
    directiveStart: number;
    /**
     * Stores final exclusive index of the directives.
     */
    directiveEnd: number;
    /**
     * Stores the first index where property binding metadata is stored for
     * this node.
     */
    propertyMetadataStartIndex: number;
    /**
     * Stores the exclusive final index where property binding metadata is
     * stored for this node.
     */
    propertyMetadataEndIndex: number;
    /**
     * Stores if Node isComponent, isProjected, hasContentQuery, hasClassInput and hasStyleInput
     */
    flags: TNodeFlags;
    /**
     * This number stores two values using its bits:
     *
     * - the index of the first provider on that node (first 16 bits)
     * - the count of view providers from the component on this node (last 16 bits)
     */
    providerIndexes: TNodeProviderIndexes;
    /** The tag name associated with this node. */
    tagName: string | null;
    /**
     * Attributes associated with an element. We need to store attributes to support various use-cases
     * (attribute injection, content projection with selectors, directives matching).
     * Attributes are stored statically because reading them from the DOM would be way too slow for
     * content projection and queries.
     *
     * Since attrs will always be calculated first, they will never need to be marked undefined by
     * other instructions.
     *
     * For regular attributes a name of an attribute and its value alternate in the array.
     * e.g. ['role', 'checkbox']
     * This array can contain flags that will indicate "special attributes" (attributes with
     * namespaces, attributes extracted from bindings and outputs).
     */
    attrs: TAttributes | null;
    /**
     * A set of local names under which a given element is exported in a template and
     * visible to queries. An entry in this array can be created for different reasons:
     * - an element itself is referenced, ex.: `<div #foo>`
     * - a component is referenced, ex.: `<my-cmpt #foo>`
     * - a directive is referenced, ex.: `<my-cmpt #foo="directiveExportAs">`.
     *
     * A given element might have different local names and those names can be associated
     * with a directive. We store local names at even indexes while odd indexes are reserved
     * for directive index in a view (or `-1` if there is no associated directive).
     *
     * Some examples:
     * - `<div #foo>` => `["foo", -1]`
     * - `<my-cmpt #foo>` => `["foo", myCmptIdx]`
     * - `<my-cmpt #foo #bar="directiveExportAs">` => `["foo", myCmptIdx, "bar", directiveIdx]`
     * - `<div #foo #bar="directiveExportAs">` => `["foo", -1, "bar", directiveIdx]`
     */
    localNames: (string | number)[] | null;
    /** Information about input properties that need to be set once from attribute data. */
    initialInputs: InitialInputData | null | undefined;
    /**
     * Input data for all directives on this node.
     *
     * - `undefined` means that the prop has not been initialized yet,
     * - `null` means that the prop has been initialized but no inputs have been found.
     */
    inputs: PropertyAliases | null | undefined;
    /**
     * Output data for all directives on this node.
     *
     * - `undefined` means that the prop has not been initialized yet,
     * - `null` means that the prop has been initialized but no outputs have been found.
     */
    outputs: PropertyAliases | null | undefined;
    /**
     * The TView or TViews attached to this node.
     *
     * If this TNode corresponds to an LContainer with inline views, the container will
     * need to store separate static data for each of its view blocks (TView[]). Otherwise,
     * nodes in inline views with the same index as nodes in their parent views will overwrite
     * each other, as they are in the same template.
     *
     * Each index in this array corresponds to the static data for a certain
     * view. So if you had V(0) and V(1) in a container, you might have:
     *
     * [
     *   [{tagName: 'div', attrs: ...}, null],     // V(0) TView
     *   [{tagName: 'button', attrs ...}, null]    // V(1) TView
     *
     * If this TNode corresponds to an LContainer with a template (e.g. structural
     * directive), the template's TView will be stored here.
     *
     * If this TNode corresponds to an element, tViews will be null .
     */
    tViews: TView | TView[] | null;
    /**
     * The next sibling node. Necessary so we can propagate through the root nodes of a view
     * to insert them or remove them from the DOM.
     */
    next: TNode | null;
    /**
     * The next projected sibling. Since in Angular content projection works on the node-by-node basis
     * the act of projecting nodes might change nodes relationship at the insertion point (target
     * view). At the same time we need to keep initial relationship between nodes as expressed in
     * content view.
     */
    projectionNext: TNode | null;
    /**
     * First child of the current node.
     *
     * For component nodes, the child will always be a ContentChild (in same view).
     * For embedded view nodes, the child will be in their child view.
     */
    child: TNode | null;
    /**
     * Parent node (in the same view only).
     *
     * We need a reference to a node's parent so we can append the node to its parent's native
     * element at the appropriate time.
     *
     * If the parent would be in a different view (e.g. component host), this property will be null.
     * It's important that we don't try to cross component boundaries when retrieving the parent
     * because the parent will change (e.g. index, attrs) depending on where the component was
     * used (and thus shouldn't be stored on TNode). In these cases, we retrieve the parent through
     * LView.node instead (which will be instance-specific).
     *
     * If this is an inline view node (V), the parent will be its container.
     */
    parent: ??angular_packages_core_core_bg | TContainerNode | null;
    stylingTemplate: StylingContext | null;
    /**
     * List of projected TNodes for a given component host element OR index into the said nodes.
     *
     * For easier discussion assume this example:
     * `<parent>`'s view definition:
     * ```
     * <child id="c1">content1</child>
     * <child id="c2"><span>content2</span></child>
     * ```
     * `<child>`'s view definition:
     * ```
     * <ng-content id="cont1"></ng-content>
     * ```
     *
     * If `Array.isArray(projection)` then `TNode` is a host element:
     * - `projection` stores the content nodes which are to be projected.
     *    - The nodes represent categories defined by the selector: For example:
     *      `<ng-content/><ng-content select="abc"/>` would represent the heads for `<ng-content/>`
     *      and `<ng-content select="abc"/>` respectively.
     *    - The nodes we store in `projection` are heads only, we used `.next` to get their
     *      siblings.
     *    - The nodes `.next` is sorted/rewritten as part of the projection setup.
     *    - `projection` size is equal to the number of projections `<ng-content>`. The size of
     *      `c1` will be `1` because `<child>` has only one `<ng-content>`.
     * - we store `projection` with the host (`c1`, `c2`) rather than the `<ng-content>` (`cont1`)
     *   because the same component (`<child>`) can be used in multiple locations (`c1`, `c2`) and as
     *   a result have different set of nodes to project.
     * - without `projection` it would be difficult to efficiently traverse nodes to be projected.
     *
     * If `typeof projection == 'number'` then `TNode` is a `<ng-content>` element:
     * - `projection` is an index of the host's `projection`Nodes.
     *   - This would return the first head node to project:
     *     `getHost(currentTNode).projection[currentTNode.projection]`.
     * - When projecting nodes the parent node retrieved may be a `<ng-content>` node, in which case
     *   the process is recursive in nature (not implementation).
     *
     * If `projection` is of type `RNode[][]` than we have a collection of native nodes passed as
     * projectable nodes during dynamic component creation.
     */
    projection: (TNode | RNode[])[] | number | null;
    /**
     * A buffer of functions that will be called once `elementEnd` (or `element`) completes.
     *
     * Due to the nature of how directives work in Angular, some directive code may
     * need to fire after any template-level code runs. If present, this array will
     * be flushed (each function will be invoked) once the associated element is
     * created.
     *
     * If an element is created multiple times then this function will be populated
     * with functions each time the creation block is called.
     */
    onElementCreationFns: Function[] | null;
}

/**
 * Corresponds to the TNode.flags property.
 */
declare const enum TNodeFlags {
    /** This bit is set if the node is a component */
    isComponent = 1,
    /** This bit is set if the node has been projected */
    isProjected = 2,
    /** This bit is set if any directive on this node has content queries */
    hasContentQuery = 4,
    /** This bit is set if the node has any "class" inputs */
    hasClassInput = 8,
    /** This bit is set if the node has any "style" inputs */
    hasStyleInput = 16
}

/**
 * Corresponds to the TNode.providerIndexes property.
 */
declare const enum TNodeProviderIndexes {
    /** The index of the first provider on this node is encoded on the least significant bits */
    ProvidersStartIndexMask = 65535,
    /** The count of view providers from the component on this node is encoded on the 16 most
       significant bits */
    CptViewProvidersCountShift = 16,
    CptViewProvidersCountShifter = 65536
}

/**
 * TNodeType corresponds to the {@link TNode} `type` property.
 */
declare const enum TNodeType {
    /**
     * The TNode contains information about an {@link LContainer} for embedded views.
     */
    Container = 0,
    /**
     * The TNode contains information about an `<ng-content>` projection
     */
    Projection = 1,
    /**
     * The TNode contains information about an {@link LView}
     */
    View = 2,
    /**
     * The TNode contains information about a DOM element aka {@link RNode}.
     */
    Element = 3,
    /**
     * The TNode contains information about an `<ng-container>` element {@link RNode}.
     */
    ElementContainer = 4,
    /**
     * The TNode contains information about an ICU comment used in `i18n`.
     */
    IcuContainer = 5
}

/**
 * Type representing a set of TNodes that can have local refs (`#foo`) placed on them.
 */
declare type TNodeWithLocalRefs = TContainerNode | ??angular_packages_core_core_bg | TElementContainerNode;

/** Static data for an LProjectionNode  */
declare interface TProjectionNode extends TNode {
    /** Index in the data[] array */
    child: null;
    /**
     * Projection nodes will have parents unless they are the first node of a component
     * or embedded view (which means their parent is in a different view and must be
     * retrieved using LView.node).
     */
    parent: ??angular_packages_core_core_bg | TElementContainerNode | null;
    tViews: null;
    /** Index of the projection node. (See TNode.projection for more info.) */
    projection: number;
}

/**
 * An optional function passed into the `NgForOf` directive that defines how to track
 * changes for items in an iterable.
 * The function takes the iteration index and item ID.
 * When supplied, Angular tracks changes by the return value of the function.
 *
 * @publicApi
 */
export declare interface TrackByFunction<T> {
    (index: number, item: T): any;
}

/**
 * Use this token at bootstrap to provide the content of your translation file (`xtb`,
 * `xlf` or `xlf2`) when you want to translate your application in another language.
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * // content of your translation file
 * const translations = '....';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS, useValue: translations }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const TRANSLATIONS: InjectionToken<string>;

/**
 * Provide this token at bootstrap to set the format of your {@link TRANSLATIONS}: `xtb`,
 * `xlf` or `xlf2`.
 *
 * See the [i18n guide](guide/i18n#merge) for more information.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import { TRANSLATIONS_FORMAT } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { AppModule } from './app/app.module';
 *
 * platformBrowserDynamic().bootstrapModule(AppModule, {
 *   providers: [{provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }]
 * });
 * ```
 *
 * @publicApi
 */
export declare const TRANSLATIONS_FORMAT: InjectionToken<string>;

/**
 * A branded trusted string used with sanitization of `html` strings.
 *
 * See: {@link bypassSanitizationTrustHtml} and {@link htmlSanitizer}.
 */
declare interface TrustedHtmlString extends TrustedString {
    [BRAND]: BypassType.Html;
}

/**
 * A branded trusted string used with sanitization of `resourceUrl` strings.
 *
 * See: {@link bypassSanitizationTrustResourceUrl} and {@link resourceUrlSanitizer}.
 */
declare interface TrustedResourceUrlString extends TrustedString {
    [BRAND]: BypassType.ResourceUrl;
}

/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {@link bypassSanitizationTrustScript} and {@link scriptSanitizer}.
 */
declare interface TrustedScriptString extends TrustedString {
    [BRAND]: BypassType.Script;
}

/**
 * A branded trusted string used with sanitization.
 *
 * See: {@link TrustedHtmlString}, {@link TrustedResourceUrlString}, {@link TrustedScriptString},
 * {@link TrustedStyleString}, {@link TrustedUrlString}
 */
declare interface TrustedString extends String {
    [BRAND]: BypassType;
}

/**
 * A branded trusted string used with sanitization of `style` strings.
 *
 * See: {@link bypassSanitizationTrustStyle} and {@link styleSanitizer}.
 */
declare interface TrustedStyleString extends TrustedString {
    [BRAND]: BypassType.Style;
}

/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {@link bypassSanitizationTrustUrl} and {@link urlSanitizer}.
 */
declare interface TrustedUrlString extends TrustedString {
    [BRAND]: BypassType.Url;
}

/**
 * Tsickle has a bug where it creates an infinite loop for a function returning itself.
 * This is a temporary type that will be removed when the issue is resolved.
 * https://github.com/angular/tsickle/issues/1009)
 */
declare type TsickleIssue1009 = any;

/** Static data for a text node */
declare interface TTextNode extends TNode {
    /** Index in the data[] array */
    index: number;
    child: null;
    /**
     * Text nodes will have parents unless they are the first node of a component or
     * embedded view (which means their parent is in a different view and must be
     * retrieved using LView.node).
     */
    parent: ??angular_packages_core_core_bg | TElementContainerNode | null;
    tViews: null;
    projection: null;
}

declare const TVIEW = 1;

/**
 * The static data for an LView (shared between all templates of a
 * given type).
 *
 * Stored on the template function as ngPrivateData.
 */
declare interface TView {
    /**
     * ID for inline views to determine whether a view is the same as the previous view
     * in a certain position. If it's not, we know the new view needs to be inserted
     * and the one that exists needs to be removed (e.g. if/else statements)
     *
     * If this is -1, then this is a component view or a dynamically created view.
     */
    readonly id: number;
    /**
     * This is a blueprint used to generate LView instances for this TView. Copying this
     * blueprint is faster than creating a new LView from scratch.
     */
    blueprint: ??angular_packages_core_core_bm;
    /**
     * The template function used to refresh the view of dynamically created views
     * and components. Will be null for inline views.
     */
    template: ComponentTemplate<{}> | null;
    /**
     * A function containing query-related instructions.
     */
    viewQuery: ViewQueriesFunction<{}> | null;
    /**
     * Pointer to the `TNode` that represents the root of the view.
     *
     * If this is a `TViewNode` for an `LViewNode`, this is an embedded view of a container.
     * We need this pointer to be able to efficiently find this node when inserting the view
     * into an anchor.
     *
     * If this is a `TElementNode`, this is the view of a root component. It has exactly one
     * root TNode.
     *
     * If this is null, this is the view of a component that is not at root. We do not store
     * the host TNodes for child component views because they can potentially have several
     * different host TNodes, depending on where the component is being used. These host
     * TNodes cannot be shared (due to different indices, etc).
     */
    node: TViewNode | ??angular_packages_core_core_bg | null;
    /** Whether or not this template has been processed. */
    firstTemplatePass: boolean;
    /** Static data equivalent of LView.data[]. Contains TNodes, PipeDefInternal or TI18n. */
    data: TData;
    /**
     * The binding start index is the index at which the data array
     * starts to store bindings only. Saving this value ensures that we
     * will begin reading bindings at the correct point in the array when
     * we are in update mode.
     */
    bindingStartIndex: number;
    /**
     * The index where the "expando" section of `LView` begins. The expando
     * section contains injectors, directive instances, and host binding values.
     * Unlike the "consts" and "vars" sections of `LView`, the length of this
     * section cannot be calculated at compile-time because directives are matched
     * at runtime to preserve locality.
     *
     * We store this start index so we know where to start checking host bindings
     * in `setHostBindings`.
     */
    expandoStartIndex: number;
    /**
     * Whether or not there are any static view queries tracked on this view.
     *
     * We store this so we know whether or not we should do a view query
     * refresh after creation mode to collect static query results.
     */
    staticViewQueries: boolean;
    /**
     * Whether or not there are any static content queries tracked on this view.
     *
     * We store this so we know whether or not we should do a content query
     * refresh after creation mode to collect static query results.
     */
    staticContentQueries: boolean;
    /**
     * The index where the viewQueries section of `LView` begins. This section contains
     * view queries defined for a component/directive.
     *
     * We store this start index so we know where the list of view queries starts.
     * This is required when we invoke view queries at runtime. We invoke queries one by one and
     * increment query index after each iteration. This information helps us to reset index back to
     * the beginning of view query list before we invoke view queries again.
     */
    viewQueryStartIndex: number;
    /**
     * A reference to the first child node located in the view.
     */
    firstChild: TNode | null;
    /**
     * Set of instructions used to process host bindings efficiently.
     *
     * See VIEW_DATA.md for more information.
     */
    expandoInstructions: ExpandoInstructions | null;
    /**
     * Full registry of directives and components that may be found in this view.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     */
    directiveRegistry: DirectiveDefList | null;
    /**
     * Full registry of pipes that may be found in this view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     */
    pipeRegistry: PipeDefList | null;
    /**
     * Array of ngOnInit, ngOnChanges and ngDoCheck hooks that should be executed for this view in
     * creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    preOrderHooks: HookData | null;
    /**
     * Array of ngOnChanges and ngDoCheck hooks that should be executed for this view in update mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    preOrderCheckHooks: HookData | null;
    /**
     * Array of ngAfterContentInit and ngAfterContentChecked hooks that should be executed
     * for this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    contentHooks: HookData | null;
    /**
     * Array of ngAfterContentChecked hooks that should be executed for this view in update
     * mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    contentCheckHooks: HookData | null;
    /**
     * Array of ngAfterViewInit and ngAfterViewChecked hooks that should be executed for
     * this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    viewHooks: HookData | null;
    /**
     * Array of ngAfterViewChecked hooks that should be executed for this view in
     * update mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    viewCheckHooks: HookData | null;
    /**
     * Array of ngOnDestroy hooks that should be executed when this view is destroyed.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     */
    destroyHooks: HookData | null;
    /**
     * When a view is destroyed, listeners need to be released and outputs need to be
     * unsubscribed. This cleanup array stores both listener data (in chunks of 4)
     * and output data (in chunks of 2) for a particular view. Combining the arrays
     * saves on memory (70 bytes per array) and on a few bytes of code size (for two
     * separate for loops).
     *
     * If it's a native DOM listener or output subscription being stored:
     * 1st index is: event name  `name = tView.cleanup[i+0]`
     * 2nd index is: index of native element or a function that retrieves global target (window,
     *               document or body) reference based on the native element:
     *    `typeof idxOrTargetGetter === 'function'`: global target getter function
     *    `typeof idxOrTargetGetter === 'number'`: index of native element
     *
     * 3rd index is: index of listener function `listener = lView[CLEANUP][tView.cleanup[i+2]]`
     * 4th index is: `useCaptureOrIndx = tView.cleanup[i+3]`
     *    `typeof useCaptureOrIndx == 'boolean' : useCapture boolean
     *    `typeof useCaptureOrIndx == 'number':
     *         `useCaptureOrIndx >= 0` `removeListener = LView[CLEANUP][useCaptureOrIndx]`
     *         `useCaptureOrIndx <  0` `subscription = LView[CLEANUP][-useCaptureOrIndx]`
     *
     * If it's an output subscription or query list destroy hook:
     * 1st index is: output unsubscribe function / query list destroy function
     * 2nd index is: index of function context in LView.cleanupInstances[]
     *               `tView.cleanup[i+0].call(lView[CLEANUP][tView.cleanup[i+1]])`
     */
    cleanup: any[] | null;
    /**
     * A list of element indices for child components that will need to be
     * refreshed when the current view has finished its check. These indices have
     * already been adjusted for the HEADER_OFFSET.
     *
     */
    components: number[] | null;
    /**
     * A list of indices for child directives that have content queries.
     */
    contentQueries: number[] | null;
    /**
     * Set of schemas that declare elements to be allowed inside the view.
     */
    schemas: SchemaMetadata[] | null;
}

/** Static data for a view  */
declare interface TViewNode extends TNode {
    /** If -1, it's a dynamically created view. Otherwise, it is the view block ID. */
    index: number;
    child: ??angular_packages_core_core_bg | TTextNode | TElementContainerNode | TContainerNode | TProjectionNode | null;
    parent: TContainerNode | null;
    tViews: null;
    projection: null;
}

/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
declare const TYPE = 1;

/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
export declare const Type: FunctionConstructor;

export declare interface Type<T> extends Function {
    new (...args: any[]): T;
}

/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * ES7 syntax:
 *
 * ```
 * @ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @publicApi
 */
export declare interface TypeDecorator {
    /**
     * Invoke as ES7 decorator.
     */
    <T extends Type<any>>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
}

/**
 * Configures the `Injector` to return an instance of `Type` when `Type' is used as the token.
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='TypeProvider'}
 *
 * @publicApi
 */
export declare interface TypeProvider extends Type<any> {
}

/**
 * Configures the `Injector` to return a value for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
export declare interface ValueProvider extends ValueSansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value for a token.
 * Base for `ValueProvider` decorator.
 *
 * @publicApi
 */
export declare interface ValueSansProvider {
    /**
     * The value to inject.
     */
    useValue: any;
}

/**
 * @publicApi
 */
export declare const VERSION: Version;


/**
 * @description Represents the version of Angular
 *
 * @publicApi
 */
export declare class Version {
    full: string;
    readonly major: string;
    readonly minor: string;
    readonly patch: string;
    constructor(full: string);
}

/**
 * Type of the ViewChild metadata.
 *
 * @publicApi
 */
export declare type ViewChild = Query;

/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChild: ViewChildDecorator;

/**
 * Type of the ViewChild decorator / constructor function.
 *
 * @see `ViewChild`.
 * @publicApi
 */
export declare interface ViewChildDecorator {
    /**
     * @description
     * Property decorator that configures a view query.
     * The change detector looks for the first element or the directive matching the selector
     * in the view DOM. If the view DOM changes, and a new child matches the selector,
     * the property is updated.
     *
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - the directive type or the name used for querying.
     * * **read** - read a different token from the queried elements.
     * * **static** - whether or not to resolve query results before change detection runs (i.e.
     * return static results only). If this option is not provided, the compiler will fall back
     * to its default behavior, which is to use query results to determine the timing of query
     * resolution. If any query results are inside a nested view (e.g. *ngIf), the query will be
     * resolved after change detection runs. Otherwise, it will be resolved before change detection
     * runs.
     *
     * Supported selectors include:
     *   * any class with the `@Component` or `@Directive` decorator
     *   * a template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ViewChild('cmp')`)
     *   * any provider defined in the child component tree of the current component (e.g.
     * `@ViewChild(SomeService) someService: SomeService`)
     *   * any provider defined through a string token (e.g. `@ViewChild('someToken') someTokenVal:
     * any`)
     *   * a `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ViewChild(TemplateRef)
     * template;`)
     *
     * @usageNotes
     *
     * {@example core/di/ts/viewChild/view_child_example.ts region='Component'}
     *
     * ### Example
     *
     * {@example core/di/ts/viewChild/view_child_howto.ts region='HowTo'}
     *
     * ### Example
     *
     * {@example core/di/ts/viewChild/view_child_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): any;
    new (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): ViewChild;
}

/**
 * Type of the ViewChildren metadata.
 *
 * @publicApi
 */
export declare type ViewChildren = Query;

/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChildren: ViewChildrenDecorator;

/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see `ViewChildren`.
 *
 * @publicApi
 */
export declare interface ViewChildrenDecorator {
    /**
     * Configures a view query.
     *
     * You can use ViewChildren to get the `QueryList` of elements or directives from the
     * view DOM. Any time a child element is added, removed, or moved, the query list will be updated,
     * and the changes observable of the query list will emit a new value.
     *
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - the directive type or the name used for querying.
     * * **read** - read a different token from the queried elements.
     *
     * @usageNotes
     *
     * ### Example
     *
     * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
     *
     * ### Example
     *
     * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts?: {
        read?: any;
    }): any;
    new (selector: Type<any> | Function | string, opts?: {
        read?: any;
    }): ViewChildren;
}

/**
 * Represents a container where one or more views can be attached to a component.
 *
 * Can contain *host views* (created by instantiating a
 * component with the `createComponent()` method), and *embedded views*
 * (created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).
 *
 * A view container instance can contain other view containers,
 * creating a [view hierarchy](guide/glossary#view-tree).
 *
 * @see `ComponentRef`
 * @see `EmbeddedViewRef`
 *
 * @publicApi
 */
export declare abstract class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing view.
     * Each view container can have only one anchor element, and each anchor element
     * can have only a single view container.
     *
     * Root elements of views attached to this container become siblings of the anchor element in
     * the rendered view.
     *
     * Access the `ViewContainerRef` of an element by placing a `Directive` injected
     * with `ViewContainerRef` on the element, or use a `ViewChild` query.
     *
     * <!-- TODO: rename to anchorElement -->
     */
    abstract readonly element: ElementRef;
    /**
     * The [dependency injector](guide/glossary#injector) for this view container.
     */
    abstract readonly injector: Injector;
    /** @deprecated No replacement */
    abstract readonly parentInjector: Injector;
    /**
     * Destroys all views in this container.
     */
    abstract clear(): void;
    /**
     * Retrieves a view from this container.
     * @param index The 0-based index of the view to retrieve.
     * @returns The `ViewRef` instance, or null if the index is out of range.
     */
    abstract get(index: number): ViewRef | null;
    /**
     * Reports how many views are currently attached to this container.
     * @returns The number of views.
     */
    abstract readonly length: number;
    /**
     * Instantiates an embedded view and inserts it
     * into this container.
     * @param templateRef The HTML template that defines the view.
     * @param index The 0-based index at which to insert the new view into this container.
     * If not specified, appends the new view as the last entry.
     *
     * @returns The `ViewRef` instance for the newly created view.
     */
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
    /**
     * Instantiates a single component and inserts its host view into this container.
     *
     * @param componentFactory The factory to use.
     * @param index The index at which to insert the new component's host view into this container.
     * If not specified, appends the new view as the last entry.
     * @param injector The injector to use as the parent for the new component.
     * @param projectableNodes
     * @param ngModule
     *
     * @returns The new component instance, containing the host view.
     *
     */
    abstract createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
    /**
     * Inserts a view into this container.
     * @param viewRef The view to insert.
     * @param index The 0-based index at which to insert the view.
     * If not specified, appends the new view as the last entry.
     * @returns The inserted `ViewRef` instance.
     *
     */
    abstract insert(viewRef: ViewRef, index?: number): ViewRef;
    /**
     * Moves a view to a new location in this container.
     * @param viewRef The view to move.
     * @param index The 0-based index of the new location.
     * @returns The moved `ViewRef` instance.
     */
    abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;
    /**
     * Returns the index of a view within the current container.
     * @param viewRef The view to query.
     * @returns The 0-based index of the view's position in this container,
     * or `-1` if this container doesn't contain the view.
     */
    abstract indexOf(viewRef: ViewRef): number;
    /**
     * Destroys a view attached to this container
     * @param index The 0-based index of the view to destroy.
     * If not specified, the last view in the container is removed.
     */
    abstract remove(index?: number): void;
    /**
     * Detaches a view from this container without destroying it.
     * Use along with `insert()` to move a view within the current container.
     * @param index The 0-based index of the view to detach.
     * If not specified, the last view in the container is detached.
     */
    abstract detach(index?: number): ViewRef | null;
}

/**
 * View instance data.
 * Attention: Adding fields to this is performance sensitive!
 */
declare interface ViewData {
    def: ??ViewDefinition;
    root: RootData;
    renderer: Renderer2;
    parentNodeDef: NodeDef | null;
    parent: ViewData | null;
    viewContainerParent: ViewData | null;
    component: any;
    context: any;
    nodes: {
        [key: number]: NodeData;
    };
    state: ViewState;
    oldValues: any[];
    disposables: DisposableFn[] | null;
    initIndex: number;
}

declare interface ViewDefinitionFactory extends DefinitionFactory<??ViewDefinition> {
}


/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/ts/metadata/encapsulation.ts region='longform'}
 *
 * @publicApi
 */
export declare enum ViewEncapsulation {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via {@link Component#styles styles} or
     * {@link Component#styleUrls styleUrls}, and adding the new Host Element attribute to all
     * selectors.
     *
     * This is the default option.
     */
    Emulated = 0,
    /**
     * @deprecated v6.1.0 - use {ViewEncapsulation.ShadowDom} instead.
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using the deprecated [Shadow DOM
     * v0](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    Native = 1,
    /**
     * Don't provide any template or style encapsulation.
     */
    None = 2,
    /**
     * Use Shadow DOM to encapsulate styles.
     *
     * For the DOM this means using modern [Shadow
     * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ShadowDom = 3
}

declare interface viewEngine_ChangeDetectorRef_interface extends ChangeDetectorRef {
}

declare interface ViewHandleEventFn {
    (view: ViewData, nodeIndex: number, eventName: string, event: any): boolean;
}

/**
 * Definition of what a view queries function should look like.
 */
declare type ViewQueriesFunction<T> = <U extends T>(rf: ??RenderFlags, ctx: U) => void;

/**
 * Represents an Angular [view](guide/glossary#view),
 * specifically the [host view](guide/glossary#view-tree) that is defined by a component.
 * Also serves as the base class
 * that adds destroy methods for [embedded views](guide/glossary#view-tree).
 *
 * @see `EmbeddedViewRef`
 *
 * @publicApi
 */
export declare abstract class ViewRef extends ChangeDetectorRef {
    /**
     * Destroys this view and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Reports whether this view has been destroyed.
     * @returns True after the `destroy()` method has been called, false otherwise.
     */
    abstract readonly destroyed: boolean;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @param callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): any /** TODO #9100 */;
}

declare class ViewRef_2<T> implements EmbeddedViewRef<T>, InternalViewRef, viewEngine_ChangeDetectorRef_interface {
    private _context;
    private _componentIndex;
    private _appRef;
    private _viewContainerRef;
    readonly rootNodes: any[];
    constructor(_lView: ??angular_packages_core_core_bm, _context: T | null, _componentIndex: number);
    readonly context: T;
    readonly destroyed: boolean;
    destroy(): void;
    onDestroy(callback: Function): void;
    /**
     * Marks a view and all of its ancestors dirty.
     *
     * It also triggers change detection by calling `scheduleTick` internally, which coalesces
     * multiple `markForCheck` calls to into one change detection run.
     *
     * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush OnPush} component is
     * checked when it needs to be re-rendered but the two normal triggers haven't marked it
     * dirty (i.e. inputs haven't changed and events haven't fired in the view).
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Component({
     *   selector: 'my-app',
     *   template: `Number of ticks: {{numberOfTicks}}`
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     * })
     * class AppComponent {
     *   numberOfTicks = 0;
     *
     *   constructor(private ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks++;
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     * ```
     */
    markForCheck(): void;
    /**
     * Detaches the view from the change detection tree.
     *
     * Detached views will not be checked during change detection runs until they are
     * re-attached, even if they are dirty. `detach` can be used in combination with
     * {@link ChangeDetectorRef#detectChanges detectChanges} to implement local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     */
    detach(): void;
    /**
     * Re-attaches a view to the change detection tree.
     *
     * This can be used to re-attach views that were previously detached from the tree
     * using {@link ChangeDetectorRef#detach detach}. Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
     *
     *   set live(value) {
     *     if (value) {
     *       this.ref.reattach();
     *     } else {
     *       this.ref.detach();
     *     }
     *   }
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class AppComponent {
     *   live = true;
     * }
     * ```
     */
    reattach(): void;
    /**
     * Checks the view and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach detach} to implement
     * local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check every five seconds.
     *
     * See {@link ChangeDetectorRef#detach detach} for more information.
     */
    detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't
     * introduce other changes.
     */
    checkNoChanges(): void;
    attachToViewContainerRef(vcRef: ViewContainerRef): void;
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
    private _lookUpContext;
}

declare const VIEWS = 8;

/**
 * Bitmask of states
 */
declare const enum ViewState {
    BeforeFirstCheck = 1,
    FirstCheck = 2,
    Attached = 4,
    ChecksEnabled = 8,
    IsProjectedView = 16,
    CheckProjectedView = 32,
    CheckProjectedViews = 64,
    Destroyed = 128,
    InitState_Mask = 1792,
    InitState_BeforeInit = 0,
    InitState_CallingOnInit = 256,
    InitState_CallingAfterContentInit = 512,
    InitState_CallingAfterViewInit = 768,
    InitState_AfterInit = 1024,
    CatDetectChanges = 12,
    CatInit = 13
}

declare interface ViewUpdateFn {
    (check: NodeCheckFn, view: ViewData): void;
}

/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the
 * reference has not changed.
 *
 * Wrapped values are unwrapped automatically during the change detection, and the unwrapped value
 * is stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 *
 * @publicApi
 */
export declare class WrappedValue {
    /** @deprecated from 5.3, use `unwrap()` instead - will switch to protected */
    wrapped: any;
    constructor(value: any);
    /** Creates a wrapped value. */
    static wrap(value: any): WrappedValue;
    /**
     * Returns the underlying value of a wrapped value.
     * Returns the given `value` when it is not wrapped.
     **/
    static unwrap(value: any): any;
    /** Returns true if `value` is a wrapped value. */
    static isWrapped(value: any): value is WrappedValue;
}

/**
 * Create trace scope.
 *
 * Scopes must be strictly nested and are analogous to stack frames, but
 * do not have to follow the stack frames. Instead it is recommended that they follow logical
 * nesting. You may want to use
 * [Event
 * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
 * as they are defined in WTF.
 *
 * Used to mark scope entry. The return value is used to leave the scope.
 *
 *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
 *
 *     someMethod() {
 *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
 *        // DO SOME WORK HERE
 *        return wtfLeave(s, 123); // Return value 123
 *     }
 *
 * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
 * negatively impact the performance of your application. For this reason we recommend that
 * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
 * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
 * exception, will produce incorrect trace, but presence of exception signifies logic error which
 * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
 * an exception is expected during normal execution while profiling.
 *
 * @publicApi
 * @deprecated the Web Tracing Framework is no longer supported in Angular
 */
export declare const wtfCreateScope: (signature: string, flags?: any) => WtfScopeFn;

/**
 * Ends a async time range operation.
 * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
 * enabled.
 * @publicApi
 * @deprecated the Web Tracing Framework is no longer supported in Angular
 */
export declare const wtfEndTimeRange: (range: any) => void;

/**
 * Used to mark end of Scope.
 *
 * - `scope` to end.
 * - `returnValue` (optional) to be passed to the WTF.
 *
 * Returns the `returnValue for easy chaining.
 * @publicApi
 * @deprecated the Web Tracing Framework is no longer supported in Angular
 */
export declare const wtfLeave: <T>(scope: any, returnValue?: T) => T;


/**
 * A scope function for the Web Tracing Framework (WTF).
 *
 * @publicApi
 * @deprecated the Web Tracing Framework is no longer supported in Angular
 */
export declare interface WtfScopeFn {
    (arg0?: any, arg1?: any): any;
}

/**
 * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
 * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
 * enabled.
 *
 *     someMethod() {
 *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
 *        var future = new Future.delay(5).then((_) {
 *          wtfEndTimeRange(s);
 *        });
 *     }
 * @publicApi
 * @deprecated the Web Tracing Framework is no longer supported in Angular
 */
export declare const wtfStartTimeRange: (rangeType: string, action: string) => any;

/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 */
export declare function ??_sanitizeHtml(defaultDoc: any, unsafeHtmlInput: string): string;


/**
 * Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single
 * value) and returns a value that is safe to use in a browser environment.
 */
export declare function ??_sanitizeStyle(value: string): string;


export declare function ??_sanitizeUrl(url: string): string;

/**
 * Adds a player to an element, directive or component instance that will later be
 * animated once change detection has passed.
 *
 * When a player is added to a reference it will stay active until `player.destroy()`
 * is called. Once called then the player will be removed from the active players
 * present on the associated ref instance.
 *
 * To get a list of all the active players on an element see [getPlayers].
 *
 * @param ref The element, directive or component that the player will be placed on.
 * @param player The player that will be triggered to play once change detection has run.
 */
export declare function ??addPlayer(ref: ComponentInstance | DirectiveInstance | HTMLElement, player: ??Player): void;

export declare const ??ALLOW_MULTIPLE_PLATFORMS: InjectionToken<boolean>;

export declare function ??and(flags: ??NodeFlags, matchedQueriesDsl: null | [string | number, ??QueryValueType][], ngContentIndex: null | number, childCount: number, handleEvent?: null | ElementHandleEventFn, templateFactory?: ViewDefinitionFactory): NodeDef;

export declare class ??angular_packages_core_core_a implements Injector {
    get(token: any, notFoundValue?: any): any;
}

export declare function ??angular_packages_core_core_b<T>(token: Type<T> | InjectionToken<T>): T;

export declare function ??angular_packages_core_core_b<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;

export declare abstract class ??angular_packages_core_core_ba {
    abstract readonly view: ViewData;
    abstract readonly nodeIndex: number | null;
    abstract readonly injector: Injector;
    abstract readonly component: any;
    abstract readonly providerTokens: any[];
    abstract readonly references: {
        [key: string]: any;
    };
    abstract readonly context: any;
    abstract readonly componentRenderElement: any;
    abstract readonly renderNode: any;
    abstract logError(console: Console, ...values: any[]): void;
}

/**
 * A change detection scheduler token for {@link RootContext}. This token is the default value used
 * for the default `RootContext` found in the {@link ROOT_CONTEXT} token.
 */
export declare const ??angular_packages_core_core_bb: InjectionToken<(fn: () => void) => void>;

/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * @Component(...)
 * class MyComponent {
 *   constructor(@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ngComponentDef = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * @publicApi
 */
export declare function ??angular_packages_core_core_bc(tNode: TNode, attrNameToInject: string): string | null;

export declare function ??angular_packages_core_core_bd(): ??angular_packages_core_core_bm;

export declare function ??angular_packages_core_core_be(): TNode;

export declare function ??angular_packages_core_core_bf<T = any>(level?: number): T;

/** Static data for an element  */
export declare interface ??angular_packages_core_core_bg extends TNode {
    /** Index in the data[] array */
    index: number;
    child: ??angular_packages_core_core_bg | TTextNode | TElementContainerNode | TContainerNode | TProjectionNode | null;
    /**
     * Element nodes will have parents unless they are the first node of a component or
     * embedded view (which means their parent is in a different view and must be
     * retrieved using viewData[HOST_NODE]).
     */
    parent: ??angular_packages_core_core_bg | TElementContainerNode | null;
    tViews: null;
    /**
     * If this is a component TNode with projection, this will be an array of projected
     * TNodes or native nodes (see TNode.projection for more info). If it's a regular element node or
     * a component without projection, it will be null.
     */
    projection: (TNode | RNode[])[] | null;
}

/**
 * Detects which sanitizer to use for URL property, based on tag name and prop name.
 *
 * The rules are based on the RESOURCE_URL context config from
 * `packages/compiler/src/schema/dom_security_schema.ts`.
 * If tag and prop names don't match Resource URL schema, use URL sanitizer.
 */
export declare function ??angular_packages_core_core_bh(tag: string, prop: string): typeof ????sanitizeResourceUrl;

/**
 * Defines the shape which produces the Player.
 *
 * Used to produce a player that will be placed on an element that contains
 * styling bindings that make use of the player. This function is designed
 * to be used with `PlayerFactory`.
 */
export declare interface ??angular_packages_core_core_bi {
    (element: HTMLElement, type: BindingType, values: {
        [key: string]: any;
    }, isFirstRender: boolean, currentPlayer: ??Player | null): ??Player | null;
}

export declare class ??angular_packages_core_core_bj<T> {
    fn: ??angular_packages_core_core_bi;
    value: T;
    '__brand__': 'Brand for PlayerFactory that nothing will match';
    constructor(fn: ??angular_packages_core_core_bi, value: T);
}

export declare function ??angular_packages_core_core_bk(name: string, props?: (...args: any[]) => any, parentClass?: any): any;

export declare function ??angular_packages_core_core_bl(name: string, props?: (...args: any[]) => any, parentClass?: any, additionalProcessing?: (target: any, name: string, ...args: any[]) => void): any;

/**
 * `LView` stores all of the information needed to process the instructions as
 * they are invoked from the template. Each embedded view and component view has its
 * own `LView`. When processing a particular view, we set the `viewData` to that
 * `LView`. When that view is done processing, the `viewData` is set back to
 * whatever the original `viewData` was before (the parent `LView`).
 *
 * Keeping separate state for each view facilities view insertion / deletion, so we
 * don't have to edit the data array based on which views are present.
 */
export declare interface ??angular_packages_core_core_bm extends Array<any> {
    /**
     * The host node for this LView instance, if this is a component view.
     *
     * If this is an embedded view, HOST will be null.
     *
     * If the component uses host bindings for styling that the `RElement` will be wrapped with
     * `StylingContext`.
     */
    [HOST]: RElement | StylingContext | null;
    /**
     * The static data for this view. We need a reference to this so we can easily walk up the
     * node tree in DI and get the TView.data array associated with a node (where the
     * directive defs are stored).
     */
    readonly [TVIEW]: TView;
    /** Flags for this view. See LViewFlags for more info. */
    [FLAGS]: LViewFlags;
    /**
     * This may store an {@link LView} or {@link LContainer}.
     *
     * `LView` - The parent view. This is needed when we exit the view and must restore the previous
     * LView. Without this, the render method would have to keep a stack of
     * views as it is recursively rendering templates.
     *
     * `LContainer` - The current view is part of a container, and is an embedded view.
     */
    [PARENT]: ??angular_packages_core_core_bm | LContainer | null;
    /**
     *
     * The next sibling LView or LContainer.
     *
     * Allows us to propagate between sibling view states that aren't in the same
     * container. Embedded views already have a node.next, but it is only set for
     * views in the same container. We need a way to link component views and views
     * across containers as well.
     */
    [NEXT]: ??angular_packages_core_core_bm | LContainer | null;
    /** Queries active for this view - nodes from a view are reported to those queries. */
    [QUERIES]: LQueries | null;
    /**
     * Pointer to the `TViewNode` or `TElementNode` which represents the root of the view.
     *
     * If `TViewNode`, this is an embedded view of a container. We need this to be able to
     * efficiently find the `LViewNode` when inserting the view into an anchor.
     *
     * If `TElementNode`, this is the LView of a component.
     *
     * If null, this is the root view of an application (root component is in this view).
     */
    [T_HOST]: TViewNode | ??angular_packages_core_core_bg | null;
    /**
     * The binding index we should access next.
     *
     * This is stored so that bindings can continue where they left off
     * if a view is left midway through processing bindings (e.g. if there is
     * a setter that creates an embedded view, like in ngIf).
     */
    [BINDING_INDEX]: number;
    /**
     * When a view is destroyed, listeners need to be released and outputs need to be
     * unsubscribed. This context array stores both listener functions wrapped with
     * their context and output subscription instances for a particular view.
     *
     * These change per LView instance, so they cannot be stored on TView. Instead,
     * TView.cleanup saves an index to the necessary context in this array.
     */
    [CLEANUP]: any[] | null;
    /**
     * - For dynamic views, this is the context with which to render the template (e.g.
     *   `NgForContext`), or `{}` if not defined explicitly.
     * - For root view of the root component the context contains change detection data.
     * - For non-root components, the context is the component instance,
     * - For inline views, the context is null.
     */
    [CONTEXT]: {} | RootContext | null;
    /** An optional Module Injector to be used as fall back after Element Injectors are consulted. */
    readonly [INJECTOR_2]: Injector | null;
    /** Renderer to be used for this view. */
    [RENDERER_FACTORY]: RendererFactory3;
    /** Renderer to be used for this view. */
    [RENDERER]: Renderer3;
    /** An optional custom sanitizer. */
    [SANITIZER]: Sanitizer | null;
    /**
     * Reference to the first LView or LContainer beneath this LView in
     * the hierarchy.
     *
     * Necessary to store this so views can traverse through their nested views
     * to remove listeners and call onDestroy callbacks.
     */
    [CHILD_HEAD]: ??angular_packages_core_core_bm | LContainer | null;
    /**
     * The last LView or LContainer beneath this LView in the hierarchy.
     *
     * The tail allows us to quickly add a new state to the end of the view list
     * without having to propagate starting from the first child.
     */
    [CHILD_TAIL]: ??angular_packages_core_core_bm | LContainer | null;
    /**
     * Stores QueryLists associated with content queries of a directive. This data structure is
     * filled-in as part of a directive creation process and is later used to retrieve a QueryList to
     * be refreshed.
     */
    [CONTENT_QUERIES]: QueryList<any>[] | null;
    /**
     * View where this view's template was declared.
     *
     * Only applicable for dynamically created views. Will be null for inline/component views.
     *
     * The template for a dynamically created view may be declared in a different view than
     * it is inserted. We already track the "insertion view" (view where the template was
     * inserted) in LView[PARENT], but we also need access to the "declaration view"
     * (view where the template was declared). Otherwise, we wouldn't be able to call the
     * view's template function with the proper contexts. Context should be inherited from
     * the declaration view tree, not the insertion view tree.
     *
     * Example (AppComponent template):
     *
     * <ng-template #foo></ng-template>       <-- declared here -->
     * <some-comp [tpl]="foo"></some-comp>    <-- inserted inside this component -->
     *
     * The <ng-template> above is declared in the AppComponent template, but it will be passed into
     * SomeComp and inserted there. In this case, the declaration view would be the AppComponent,
     * but the insertion view would be SomeComp. When we are removing views, we would want to
     * traverse through the insertion view to clean up listeners. When we are calling the
     * template function during change detection, we need the declaration view to get inherited
     * context.
     */
    [DECLARATION_VIEW]: ??angular_packages_core_core_bm | null;
    /**
     * More flags for this view. See PreOrderHookFlags for more info.
     */
    [PREORDER_HOOK_FLAGS]: PreOrderHookFlags;
}


/**
 * Convince closure compiler that the wrapped function has no side-effects.
 *
 * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
 * allow us to execute a function but have closure compiler mark the call as no-side-effects.
 * It is important that the return value for the `noSideEffects` function be assigned
 * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
 * compiler.
 */
export declare function ??angular_packages_core_core_bn(fn: () => void): string;

/** Retrieves a value from any `LView` or `TData`. */
export declare function ??angular_packages_core_core_bo<T>(view: ??angular_packages_core_core_bm | TData, index: number): T;

/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated. It does this by walking the parent views until it
 * gets to the root view, then getting the context off of that.
 *
 * @param viewOrComponent the `LView` or component to get the root context for.
 */
export declare function ??angular_packages_core_core_bp(viewOrComponent: ??angular_packages_core_core_bm | {}): RootContext;


export declare function ??angular_packages_core_core_bq<T>(objWithPropertyToExtract: T): string;

export declare class ??angular_packages_core_core_c implements ReflectiveInjector {
    private static INJECTOR_KEY;
    readonly parent: Injector | null;
    keyIds: number[];
    objs: any[];
    /**
     * Private
     */
    constructor(_providers: ResolvedReflectiveProvider[], _parent?: Injector);
    get(token: any, notFoundValue?: any): any;
    resolveAndCreateChild(providers: Provider[]): ReflectiveInjector;
    createChildFromResolved(providers: ResolvedReflectiveProvider[]): ReflectiveInjector;
    resolveAndInstantiate(provider: Provider): any;
    instantiateResolved(provider: ResolvedReflectiveProvider): any;
    getProviderAtIndex(index: number): ResolvedReflectiveProvider;
    private _getMaxNumberOfObjects;
    private _instantiateProvider;
    private _instantiate;
    private _getByReflectiveDependency;
    private _getByKey;
    private _getObjByKeyId;
    readonly displayName: string;
    toString(): string;
}

/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export declare class ??angular_packages_core_core_d {
    key: ReflectiveKey;
    optional: boolean;
    visibility: Self | SkipSelf | null;
    constructor(key: ReflectiveKey, optional: boolean, visibility: Self | SkipSelf | null);
    static fromKey(key: ReflectiveKey): ??angular_packages_core_core_d;
}

/**
 * Resolve a list of Providers.
 */
export declare function ??angular_packages_core_core_e(providers: Provider[]): ResolvedReflectiveProvider[];

export declare function ??angular_packages_core_core_f(): string;

/**
 * Creates an ElementRef given a node.
 *
 * @param ElementRefToken The ElementRef type
 * @param tNode The node for which you'd like an ElementRef
 * @param view The view to which the node belongs
 * @returns The ElementRef instance to use
 */
export declare function ??angular_packages_core_core_g(ElementRefToken: typeof ElementRef, tNode: TNode, view: ??angular_packages_core_core_bm): ElementRef;

/**
 * Creates a TemplateRef and stores it on the injector.
 *
 * @param TemplateRefToken The TemplateRef type
 * @param ElementRefToken The ElementRef type
 * @param hostTNode The node that is requesting a TemplateRef
 * @param hostView The view to which the node belongs
 * @returns The TemplateRef instance to use
 */
export declare function ??angular_packages_core_core_h<T>(TemplateRefToken: typeof TemplateRef, ElementRefToken: typeof ElementRef, hostTNode: TNode, hostView: ??angular_packages_core_core_bm): TemplateRef<T> | null;

/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 *
 * @param hostTNode The node that is requesting a ChangeDetectorRef
 * @param hostView The view to which the node belongs
 * @param context The context for this change detector ref
 * @returns The ChangeDetectorRef to use
 */
export declare function ??angular_packages_core_core_i(hostTNode: TNode, hostView: ??angular_packages_core_core_bm, context: any): ChangeDetectorRef;

export declare function ??angular_packages_core_core_j(id: string): NgModuleFactory<any>;

export declare class ??angular_packages_core_core_k {
    readonly listeners: DebugEventListener[];
    readonly parent: DebugElement | null;
    readonly nativeNode: any;
    private readonly _debugContext;
    constructor(nativeNode: any, parent: DebugNode | null, _debugContext: ??angular_packages_core_core_ba);
    readonly injector: Injector;
    readonly componentInstance: any;
    readonly context: any;
    readonly references: {
        [key: string]: any;
    };
    readonly providerTokens: any[];
}

export declare class ??angular_packages_core_core_l extends ??angular_packages_core_core_k implements DebugElement {
    readonly name: string;
    readonly properties: {
        [key: string]: any;
    };
    readonly attributes: {
        [key: string]: string | null;
    };
    readonly classes: {
        [key: string]: boolean;
    };
    readonly styles: {
        [key: string]: string | null;
    };
    readonly childNodes: DebugNode[];
    readonly nativeElement: any;
    constructor(nativeNode: any, parent: any, _debugContext: ??angular_packages_core_core_ba);
    addChild(child: DebugNode): void;
    removeChild(child: DebugNode): void;
    insertChildrenAfter(child: DebugNode, newChildren: DebugNode[]): void;
    insertBefore(refChild: DebugNode, newChild: DebugNode): void;
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    readonly children: DebugElement[];
    triggerEventHandler(eventName: string, eventObj: any): void;
}

export declare class ??angular_packages_core_core_m implements IterableDifferFactory {
    constructor();
    supports(obj: Object | null | undefined): boolean;
    create<V>(trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V>;
}

export declare class ??angular_packages_core_core_n<K, V> implements KeyValueDifferFactory {
    constructor();
    supports(obj: any): boolean;
    create<K, V>(): KeyValueDiffer<K, V>;
}

export declare function ??angular_packages_core_core_o(): IterableDiffers;

export declare function ??angular_packages_core_core_p(): KeyValueDiffers;

export declare function ??angular_packages_core_core_q(locale?: string): string;

/**
 * A built-in [dependency injection token](guide/glossary#di-token)
 * that is used to configure the root injector for bootstrapping.
 */
export declare const ??angular_packages_core_core_r: StaticProvider[];

/**
 * Schedule work at next available slot.
 *
 * In Ivy this is just `requestAnimationFrame`. For compatibility reasons when bootstrapped
 * using `platformRef.bootstrap` we need to use `NgZone.onStable` as the scheduling mechanism.
 * This overrides the scheduling mechanism in Ivy to `NgZone.onStable`.
 *
 * @param ngZone NgZone to use for scheduling.
 */
export declare function ??angular_packages_core_core_s(ngZone: NgZone): (fn: () => void) => void;

/**
 * True if WTF is enabled.
 */
export declare const ??angular_packages_core_core_t: boolean;

export declare function ??angular_packages_core_core_u(): boolean;

export declare function ??angular_packages_core_core_v(signature: string, flags?: any): any;

export declare function ??angular_packages_core_core_w<T>(scope: Scope): void;

export declare function ??angular_packages_core_core_w<T>(scope: Scope, returnValue?: T): T;

export declare function ??angular_packages_core_core_x(rangeType: string, action: string): Range;

export declare function ??angular_packages_core_core_y(range: Range): void;

export declare function ??angular_packages_core_core_z(checkIndex: number, flags: ??NodeFlags, matchedQueriesDsl: [string | number, ??QueryValueType][] | null, childCount: number, token: any, value: any, deps: ([??DepFlags, any] | any)[], bindings?: BindingDef[], outputs?: OutputDef[]): NodeDef;

/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @publicApi
 */
export declare const ??APP_ID_RANDOM_PROVIDER: {
    provide: InjectionToken<string>;
    useFactory: typeof ??angular_packages_core_core_f;
    deps: any[];
};

/**
 * An internal token whose presence in an injector indicates that the injector should treat itself
 * as a root scoped injector when processing requests for unknown tokens which may indicate
 * they are provided in the root scope.
 */
export declare const ??APP_ROOT: InjectionToken<boolean>;

export declare const enum ??ArgumentType {
    Inline = 0,
    Dynamic = 1
}

/**
 * A set of marker values to be used in the attributes arrays. These markers indicate that some
 * items are not regular attributes and the processing should be adapted accordingly.
 */
export declare const enum ??AttributeMarker {
    /**
     * Marker indicates that the following 3 values in the attributes array are:
     * namespaceUri, attributeName, attributeValue
     * in that order.
     */
    NamespaceURI = 0,
    /**
      * Signals class declaration.
      *
      * Each value following `Classes` designates a class name to include on the element.
      * ## Example:
      *
      * Given:
      * ```
      * <div class="foo bar baz">...<d/vi>
      * ```
      *
      * the generated code is:
      * ```
      * var _c1 = [AttributeMarker.Classes, 'foo', 'bar', 'baz'];
      * ```
      */
    Classes = 1,
    /**
     * Signals style declaration.
     *
     * Each pair of values following `Styles` designates a style name and value to include on the
     * element.
     * ## Example:
     *
     * Given:
     * ```
     * <div style="width:100px; height:200px; color:red">...</div>
     * ```
     *
     * the generated code is:
     * ```
     * var _c1 = [AttributeMarker.Styles, 'width', '100px', 'height'. '200px', 'color', 'red'];
     * ```
     */
    Styles = 2,
    /**
     * Signals that the following attribute names were extracted from input or output bindings.
     *
     * For example, given the following HTML:
     *
     * ```
     * <div moo="car" [foo]="exp" (bar)="doSth()">
     * ```
     *
     * the generated code is:
     *
     * ```
     * var _c1 = ['moo', 'car', AttributeMarker.Bindings, 'foo', 'bar'];
     * ```
     */
    Bindings = 3,
    /**
     * Signals that the following attribute names were hoisted from an inline-template declaration.
     *
     * For example, given the following HTML:
     *
     * ```
     * <div *ngFor="let value of values; trackBy:trackBy" dirA [dirB]="value">
     * ```
     *
     * the generated code for the `template()` instruction would include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB', AttributeMarker.Template, 'ngFor', 'ngForOf',
     * 'ngForTrackBy', 'let-value']
     * ```
     *
     * while the generated code for the `element()` instruction inside the template function would
     * include:
     *
     * ```
     * ['dirA', '', AttributeMarker.Bindings, 'dirB']
     * ```
     */
    Template = 4,
    /**
     * Signals that the following attribute is `ngProjectAs` and its value is a parsed `CssSelector`.
     *
     * For example, given the following HTML:
     *
     * ```
     * <h1 attr="value" ngProjectAs="[title]">
     * ```
     *
     * the generated code for the `element()` instruction would include:
     *
     * ```
     * ['attr', 'value', AttributeMarker.ProjectAs, ['', 'title', '']]
     * ```
     */
    ProjectAs = 5
}

export declare const enum ??BindingFlags {
    TypeElementAttribute = 1,
    TypeElementClass = 2,
    TypeElementStyle = 4,
    TypeProperty = 8,
    SyntheticProperty = 16,
    SyntheticHostProperty = 32,
    CatSyntheticProperty = 48,
    Types = 15
}

/**
 * Combines the binding value and a factory for an animation player.
 *
 * Used to bind a player to an element template binding (currently only
 * `[style]`, `[style.prop]`, `[class]` and `[class.name]` bindings
 * supported). The provided `factoryFn` function will be run once all
 * the associated bindings have been evaluated on the element and is
 * designed to return a player which will then be placed on the element.
 *
 * @param factoryFn The function that is used to create a player
 *   once all the rendering-related (styling values) have been
 *   processed for the element binding.
 * @param value The raw value that will be exposed to the binding
 *   so that the binding can update its internal values when
 *   any changes are evaluated.
 */
export declare function ??bindPlayerFactory<T>(factoryFn: ??angular_packages_core_core_bi, value: T): ??PlayerFactory;

/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link htmlSanitizer} to be trusted implicitly.
 *
 * @param trustedHtml `html` string which needs to be implicitly trusted.
 * @returns a `html` `String` which has been branded to be implicitly trusted.
 */
export declare function ??bypassSanitizationTrustHtml(trustedHtml: string): TrustedHtmlString;

/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` `String` which has been branded to be implicitly trusted.
 */
export declare function ??bypassSanitizationTrustResourceUrl(trustedResourceUrl: string): TrustedResourceUrlString;

/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link scriptSanitizer} to be trusted implicitly.
 *
 * @param trustedScript `script` string which needs to be implicitly trusted.
 * @returns a `script` `String` which has been branded to be implicitly trusted.
 */
export declare function ??bypassSanitizationTrustScript(trustedScript: string): TrustedScriptString;

/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link styleSanitizer} to be trusted implicitly.
 *
 * @param trustedStyle `style` string which needs to be implicitly trusted.
 * @returns a `style` `String` which has been branded to be implicitly trusted.
 */
export declare function ??bypassSanitizationTrustStyle(trustedStyle: string): TrustedStyleString;

/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link urlSanitizer} to be trusted implicitly.
 *
 * @param trustedUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` `String` which has been branded to be implicitly trusted.
 */
export declare function ??bypassSanitizationTrustUrl(trustedUrl: string): TrustedUrlString;

export declare function ??ccf(selector: string, componentType: Type<any>, viewDefFactory: ViewDefinitionFactory, inputs: {
    [propName: string]: string;
} | null, outputs: {
    [propName: string]: string;
}, ngContentSelectors: string[]): ComponentFactory<any>;

/**
 * Defines the possible states of the default change detector.
 * @see `ChangeDetectorRef`
 */
export declare enum ??ChangeDetectorStatus {
    /**
     * A state in which, after calling `detectChanges()`, the change detector
     * state becomes `Checked`, and must be explicitly invoked or reactivated.
     */
    CheckOnce = 0,
    /**
     * A state in which change detection is skipped until the change detector mode
     * becomes `CheckOnce`.
     */
    Checked = 1,
    /**
     * A state in which change detection continues automatically until explicitly
     * deactivated.
     */
    CheckAlways = 2,
    /**
     * A state in which a change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    Detached = 3,
    /**
     * Indicates that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state do not detect changes.
     */
    Errored = 4,
    /**
     * Indicates that the change detector has been destroyed.
     */
    Destroyed = 5
}

export declare function ??clearOverrides(): void;

export declare function ??clearResolutionOfComponentResourcesQueue(): Map<Type<any>, Component>;

export declare function ??cmf(ngModuleType: Type<any>, bootstrapComponents: Type<any>[], defFactory: NgModuleDefinitionFactory): NgModuleFactory<any>;

export declare class ??CodegenComponentFactoryResolver implements ComponentFactoryResolver {
    private _parent;
    private _ngModule;
    private _factories;
    constructor(factories: ComponentFactory<any>[], _parent: ComponentFactoryResolver, _ngModule: NgModuleRef<any>);
    resolveComponentFactory<T>(component: {
        new (...args: any[]): T;
    }): ComponentFactory<T>;
}

/**
 * Compile an Angular component according to its decorator metadata, and patch the resulting
 * ngComponentDef onto the component type.
 *
 * Compilation may be asynchronous (due to the need to resolve URLs for the component template or
 * other resources, for example). In the event that compilation is not immediate, `compileComponent`
 * will enqueue resource resolution into a global queue and will fail to return the `ngComponentDef`
 * until the global queue has been resolved with a call to `resolveComponentResources`.
 */
export declare function ??compileComponent(type: Type<any>, metadata: Component): void;

/**
 * Compile an Angular directive according to its decorator metadata, and patch the resulting
 * ngDirectiveDef onto the component type.
 *
 * In the event that compilation is not immediate, `compileDirective` will return a `Promise` which
 * will resolve when compilation completes and the directive becomes usable.
 */
export declare function ??compileDirective(type: Type<any>, directive: Directive): void;

/**
 * Compiles a module in JIT mode.
 *
 * This function automatically gets called when a class has a `@NgModule` decorator.
 */
export declare function ??compileNgModule(moduleType: Type<any>, ngModule?: NgModule): void;

/**
 * Compiles and adds the `ngModuleDef` and `ngInjectorDef` properties to the module class.
 */
export declare function ??compileNgModuleDefs(moduleType: ??NgModuleType, ngModule: NgModule): void;

export declare function ??compileNgModuleFactory__POST_R3__<M>(injector: Injector, options: CompilerOptions, moduleType: Type<M>): Promise<NgModuleFactory<M>>;

export declare function ??compilePipe(type: Type<any>, meta: Pipe): void;

export declare const ??Compiler_compileModuleAndAllComponentsAsync__POST_R3__: <T>(moduleType: Type<T>) => Promise<ModuleWithComponentFactories<T>>;

export declare const ??Compiler_compileModuleAndAllComponentsSync__POST_R3__: <T>(moduleType: Type<T>) => ModuleWithComponentFactories<T>;

export declare const ??Compiler_compileModuleAsync__POST_R3__: <T>(moduleType: Type<T>) => Promise<NgModuleFactory<T>>;

export declare const ??Compiler_compileModuleSync__POST_R3__: <T>(moduleType: Type<T>) => NgModuleFactory<T>;

/**
 * Runtime link information for Components.
 *
 * This is internal data structure used by the render to link
 * components into templates.
 *
 * NOTE: Always use `defineComponent` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {@link defineComponent}
 */
export declare interface ??ComponentDef<T> extends ??DirectiveDef<T> {
    /**
     * Runtime unique component ID.
     */
    readonly id: string;
    /**
     * The View template of the component.
     */
    readonly template: ComponentTemplate<T>;
    /**
     * An array of `ngContent[selector]` values that were found in the template.
     */
    readonly ngContentSelectors?: string[];
    /**
     * A set of styles that the component needs to be present for component to render correctly.
     */
    readonly styles: string[];
    /**
     * The number of nodes, local refs, and pipes in this component template.
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the binding start index.
     */
    readonly consts: number;
    /**
     * The number of bindings in this component template (including pure fn bindings).
     *
     * Used to calculate the length of the component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    readonly vars: number;
    /**
     * Query-related instructions for a component.
     */
    viewQuery: ViewQueriesFunction<T> | null;
    /**
     * The view encapsulation type, which determines how styles are applied to
     * DOM elements. One of
     * - `Emulated` (default): Emulate native scoping of styles.
     * - `Native`: Use the native encapsulation mechanism of the renderer.
     * - `ShadowDom`: Use modern [ShadowDOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     *   create a ShadowRoot for component's host element.
     * - `None`: Do not provide any template or style encapsulation.
     */
    readonly encapsulation: ViewEncapsulation;
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     */
    readonly data: {
        [kind: string]: any;
    };
    /** Whether or not this component's ChangeDetectionStrategy is OnPush */
    readonly onPush: boolean;
    /**
     * Registry of directives and components that may be found in this view.
     *
     * The property is either an array of `DirectiveDef`s or a function which returns the array of
     * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
     */
    directiveDefs: DirectiveDefListOrFactory | null;
    /**
     * Registry of pipes that may be found in this view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     */
    pipeDefs: PipeDefListOrFactory | null;
    /**
     * The set of schemas that declare elements to be allowed in the component's template.
     */
    schemas: SchemaMetadata[] | null;
    /**
     * Used to store the result of `noSideEffects` function so that it is not removed by closure
     * compiler. The property should never be read.
     */
    readonly _?: never;
}

/**
 * A subclass of `Type` which has a static `ngComponentDef`:`ComponentDef` field making it
 * consumable for rendering.
 */
export declare interface ??ComponentType<T> extends Type<T> {
    ngComponentDef: never;
}


export declare class ??Console {
    log(message: string): void;
    warn(message: string): void;
}

/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 *
 * @publicApi
 */
export declare function ??createInjector(defType: any, parent?: Injector | null, additionalProviders?: StaticProvider[] | null, name?: string): Injector;

export declare function ??crt(values: {
    styles: (string | any[])[];
    encapsulation: ViewEncapsulation;
    data: {
        [kind: string]: any[];
    };
}): RendererType2;

/**
 * A list of CssSelectors.
 *
 * A directive or component can have multiple selectors. This type is used for
 * directive defs so any of the selectors in the list will match that directive.
 *
 * Original: 'form, [ngForm]'
 * Parsed: [['form'], ['', 'ngForm', '']]
 */
export declare type ??CssSelectorList = CssSelector[];

export declare const ??defaultIterableDiffers: IterableDiffers;

export declare const ??defaultKeyValueDiffers: KeyValueDiffers;

/**
 * Bitmask for DI flags
 */
export declare const enum ??DepFlags {
    None = 0,
    SkipSelf = 1,
    Optional = 2,
    Self = 4,
    Value = 8
}


/**
 * Synchronously perform change detection on a component (and possibly its sub-components).
 *
 * This function triggers change detection in a synchronous way on a component. There should
 * be very little reason to call this function directly since a preferred way to do change
 * detection is to {@link markDirty} the component and wait for the scheduler to call this method
 * at some future point in time. This is because a single user action often results in many
 * components being invalidated and calling change detection on each component synchronously
 * would be inefficient. It is better to wait until all components are marked as dirty and
 * then perform single change detection across all of the components
 *
 * @param component The component which the change detection should be performed on.
 */
export declare function ??detectChanges<T>(component: T): void;


export declare function ??devModeEqual(a: any, b: any): boolean;

export declare function ??did(checkIndex: number, flags: ??NodeFlags, matchedQueries: null | [string | number, ??QueryValueType][], childCount: number, ctor: any, deps: ([??DepFlags, any] | any)[], props?: null | {
    [name: string]: [number, string];
}, outputs?: null | {
    [name: string]: string;
}): NodeDef;

/**
 * Runtime link information for Directives.
 *
 * This is internal data structure used by the render to link
 * directives into templates.
 *
 * NOTE: Always use `defineDirective` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * @param Selector type metadata specifying the selector of the directive or component
 *
 * See: {@link defineDirective}
 */
export declare interface ??DirectiveDef<T> extends ????BaseDef<T> {
    /** Token representing the directive. Used by DI. */
    type: Type<T>;
    /** Function that resolves providers and publishes them into the DI system. */
    providersResolver: (<U extends T>(def: ??DirectiveDef<U>, processProvidersFn?: ProcessProvidersFunction) => void) | null;
    /** The selectors that will be used to match nodes to this directive. */
    readonly selectors: ??CssSelectorList;
    /**
     * Name under which the directive is exported (for use with local references in template)
     */
    readonly exportAs: string[] | null;
    /**
     * Factory function used to create a new directive instance.
     */
    factory: FactoryFn<T>;
    /**
     * Refreshes host bindings on the associated directive.
     */
    hostBindings: HostBindingsFunction<T> | null;
    onChanges: (() => void) | null;
    onInit: (() => void) | null;
    doCheck: (() => void) | null;
    afterContentInit: (() => void) | null;
    afterContentChecked: (() => void) | null;
    afterViewInit: (() => void) | null;
    afterViewChecked: (() => void) | null;
    onDestroy: (() => void) | null;
    /**
     * The features applied to this directive
     */
    readonly features: DirectiveDefFeature[] | null;
    setInput: (<U extends T>(this: ??DirectiveDef<U>, instance: U, value: any, publicName: string, privateName: string) => void) | null;
}

/**
 * A subclass of `Type` which has a static `ngDirectiveDef`:`DirectiveDef` field making it
 * consumable for rendering.
 */
export declare interface ??DirectiveType<T> extends Type<T> {
    ngDirectiveDef: never;
}

/**
 * @deprecated Use the `Renderer2` instead.
 */
export declare interface ??DirectRenderer {
    remove(node: any): void;
    appendChild(node: any, parent: any): void;
    insertBefore(node: any, refNode: any): void;
    nextSibling(node: any): any;
    parentElement(node: any): any;
}

export declare function ??eld(checkIndex: number, flags: ??NodeFlags, matchedQueriesDsl: null | [string | number, ??QueryValueType][], ngContentIndex: null | number, childCount: number, namespaceAndName: string | null, fixedAttrs?: null | [string, string][], bindings?: null | [??BindingFlags, string, string | SecurityContext | null][], outputs?: null | ([string, string])[], handleEvent?: null | ElementHandleEventFn, componentView?: null | ViewDefinitionFactory, componentRendererType?: RendererType2 | null): NodeDef;

export declare const ??EMPTY_ARRAY: any[];

export declare const ??EMPTY_MAP: {
    [key: string]: any;
};

/**
 * Loops over queued module definitions, if a given module definition has all of its
 * declarations resolved, it dequeues that module definition and sets the scope on
 * its declarations.
 */
export declare function ??flushModuleScopingQueueAsMuchAsPossible(): void;

export declare function ??getComponentViewDefinitionFactory(componentFactory: ComponentFactory<any>): ViewDefinitionFactory;

export declare function ??getDebugNode__POST_R3__(nativeNode: Element): DebugElement__POST_R3__;

export declare function ??getDebugNode__POST_R3__(nativeNode: Node): DebugNode__POST_R3__;

export declare function ??getDebugNode__POST_R3__(nativeNode: null): null;

/**
 * Retrieves directives associated with a given DOM host element.
 *
 * @param target A DOM element, component or directive instance.
 *
 * @publicApi
 */
export declare function ??getDirectives(target: {}): Array<{}>;

/**
 * Retrieve the host element of the component.
 *
 * Use this function to retrieve the host element of the component. The host
 * element is the element which the component is associated with.
 *
 * @param directive Component or Directive for which the host element should be retrieved.
 *
 * @publicApi
 */
export declare function ??getHostElement<T>(directive: T): Element;

/**
 * Read the `ngInjectableDef` type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have `ngInjectableDef`
 */
export declare function ??getInjectableDef<T>(type: any): ????InjectableDef<T> | null;

/** Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LView` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 *
 * @param target Component, Directive or DOM Node.
 */
export declare function ??getLContext(target: any): ??LContext | null;

export declare function ??getModuleFactory__POST_R3__(id: string): NgModuleFactory<any>;

/**
 * Returns a list of all the active players present on the provided ref instance (which can
 * be an instance of a directive, component or element).
 *
 * This function will only return players that have been added to the ref instance using
 * `addPlayer` or any players that are active through any template styling bindings
 * (`[style]`, `[style.prop]`, `[class]` and `[class.name]`).
 *
 * @publicApi
 */
export declare function ??getPlayers(ref: ComponentInstance | DirectiveInstance | HTMLElement): ??Player[];

export declare type ??GetterFn = (obj: any) => any;


export declare const ??global: any;

/**
 * Set the configuration for `i18nLocalize`.
 *
 * @deprecated this method is temporary & should not be used as it will be removed soon
 */
export declare function ??i18nConfigureLocalize(options?: I18nLocalizeOptions): void;

export declare function ??initServicesIfNeeded(): void;

export declare function ??inlineInterpolate(valueCount: number, c0: string, a1: any, c1: string, a2?: any, c2?: string, a3?: any, c3?: string, a4?: any, c4?: string, a5?: any, c5?: string, a6?: any, c6?: string, a7?: any, c7?: string, a8?: any, c8?: string, a9?: any, c9?: string): string;

export declare function ??interpolate(valueCount: number, constAndInterp: string[]): string;

export declare function ??isBoundToModule__POST_R3__<C>(cf: ComponentFactory<C>): boolean;

/**
 * Reports whether a given strategy is currently the default for change detection.
 * @param changeDetectionStrategy The strategy to check.
 * @returns True if the given strategy is the current default, false otherwise.
 * @see `ChangeDetectorStatus`
 * @see `ChangeDetectorRef`
 */
export declare function ??isDefaultChangeDetectionStrategy(changeDetectionStrategy: ChangeDetectionStrategy): boolean;

export declare function ??isListLikeIterable(obj: any): boolean;

/**
 * Determine if the argument is an Observable
 */
export declare function ??isObservable(obj: any | Observable<any>): obj is Observable<any>;

/**
 * Determine if the argument is shaped like a Promise
 */
export declare function ??isPromise(obj: any): obj is Promise<any>;

export declare const ??ivyEnabled = false;

/**
 * The internal view context which is specific to a given DOM element, directive or
 * component instance. Each value in here (besides the LView and element node details)
 * can be present, null or undefined. If undefined then it implies the value has not been
 * looked up yet, otherwise, if null, then a lookup was executed and nothing was found.
 *
 * Each value will get filled when the respective value is examined within the getContext
 * function. The component, element and each directive instance will share the same instance
 * of the context.
 */
export declare interface ??LContext {
    /**
     * The component's parent view data.
     */
    lView: ??angular_packages_core_core_bm;
    /**
     * The index instance of the node.
     */
    nodeIndex: number;
    /**
     * The instance of the DOM node that is attached to the lNode.
     */
    native: RNode;
    /**
     * The instance of the Component node.
     */
    component: {} | null | undefined;
    /**
     * The list of active directives that exist on this element.
     */
    directives: any[] | null | undefined;
    /**
     * The map of local references (local reference name => element or directive instance) that exist
     * on this element.
     */
    localRefs: {
        [key: string]: any;
    } | null | undefined;
}

/**
 * Used to enable lifecycle hooks on the root component.
 *
 * Include this feature when calling `renderComponent` if the root component
 * you are rendering has lifecycle hooks defined. Otherwise, the hooks won't
 * be called properly.
 *
 * Example:
 *
 * ```
 * renderComponent(AppComponent, {features: [RootLifecycleHooks]});
 * ```
 */
export declare function ??LifecycleHooksFeature(component: any, def: ??ComponentDef<any>): void;


export declare function ??looseIdentical(a: any, b: any): boolean;

/**
 * @suppress {globalThis}
 */
export declare function ??makeDecorator<T>(name: string, props?: (...args: any[]) => any, parentClass?: any, additionalProcessing?: (type: Type<T>) => void, typeFn?: (type: Type<T>, ...args: any[]) => void): {
    new (...args: any[]): any;
    (...args: any[]): any;
    (...args: any[]): (cls: any) => any;
};

/**
 * Mark the component as dirty (needing change detection).
 *
 * Marking a component dirty will schedule a change detection on this
 * component at some point in the future. Marking an already dirty
 * component as dirty is a noop. Only one outstanding change detection
 * can be scheduled per component tree. (Two components bootstrapped with
 * separate `renderComponent` will have separate schedulers)
 *
 * When the root component is bootstrapped with `renderComponent`, a scheduler
 * can be provided.
 *
 * @param component Component to mark as dirty.
 *
 * @publicApi
 */
export declare function ??markDirty<T>(component: T): void;

export declare type ??MethodFn = (obj: any, args: any[]) => any;

export declare function ??mod(providers: NgModuleProviderDef[]): NgModuleDefinition;

export declare function ??mpd(flags: ??NodeFlags, token: any, value: any, deps: ([??DepFlags, any] | any)[]): NgModuleProviderDef;

export declare function ??ncd(ngContentIndex: null | number, index: number): NodeDef;

export declare const ??NG_BASE_DEF: string;


export declare const ??NG_COMPONENT_DEF: string;

export declare const ??NG_DIRECTIVE_DEF: string;

/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
export declare const ??NG_ELEMENT_ID: string;

export declare const ??NG_INJECTABLE_DEF: string;

export declare const ??NG_INJECTOR_DEF: string;

export declare const ??NG_MODULE_DEF: string;

export declare const ??NG_PIPE_DEF: string;

/**
 * Runtime link information for NgModules.
 *
 * This is the internal data structure used by the runtime to assemble components, directives,
 * pipes, and injectors.
 *
 * NOTE: Always use `????defineNgModule` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 */
export declare interface ??NgModuleDef<T> {
    /** Token representing the module. Used by DI. */
    type: T;
    /** List of components to bootstrap. */
    bootstrap: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports: Type<any>[] | (() => Type<any>[]);
    /**
     * Cached value of computed `transitiveCompileScopes` for this module.
     *
     * This should never be read directly, but accessed via `transitiveScopesFor`.
     */
    transitiveCompileScopes: ??NgModuleTransitiveScopes | null;
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas: SchemaMetadata[] | null;
}

export declare class ??NgModuleFactory<T> extends NgModuleFactory<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>);
    create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * Represents the expansion of an `NgModule` into its scopes.
 *
 * A scope is a set of directives and pipes that are visible in a particular context. Each
 * `NgModule` has two scopes. The `compilation` scope is the set of directives and pipes that will
 * be recognized in the templates of components declared by the module. The `exported` scope is the
 * set of directives and pipes exported by a module (that is, module B's exported scope gets added
 * to module A's compilation scope when module A imports B).
 */
export declare interface ??NgModuleTransitiveScopes {
    compilation: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    exported: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    schemas: SchemaMetadata[] | null;
}

export declare interface ??NgModuleType<T = any> extends Type<T> {
    ngModuleDef: ??NgModuleDef<T>;
}


export declare interface ??NO_CHANGE {
    brand: 'NO_CHANGE';
}

/** A special value which designates that a value has not changed. */
export declare const ??NO_CHANGE: ??NO_CHANGE;

/**
 * Bitmask for NodeDef.flags.
 * Naming convention:
 * - `Type...`: flags that are mutually exclusive
 * - `Cat...`: union of multiple `Type...` (short for category).
 */
export declare const enum ??NodeFlags {
    None = 0,
    TypeElement = 1,
    TypeText = 2,
    ProjectedTemplate = 4,
    CatRenderNode = 3,
    TypeNgContent = 8,
    TypePipe = 16,
    TypePureArray = 32,
    TypePureObject = 64,
    TypePurePipe = 128,
    CatPureExpression = 224,
    TypeValueProvider = 256,
    TypeClassProvider = 512,
    TypeFactoryProvider = 1024,
    TypeUseExistingProvider = 2048,
    LazyProvider = 4096,
    PrivateProvider = 8192,
    TypeDirective = 16384,
    Component = 32768,
    CatProviderNoDirective = 3840,
    CatProvider = 20224,
    OnInit = 65536,
    OnDestroy = 131072,
    DoCheck = 262144,
    OnChanges = 524288,
    AfterContentInit = 1048576,
    AfterContentChecked = 2097152,
    AfterViewInit = 4194304,
    AfterViewChecked = 8388608,
    EmbeddedViews = 16777216,
    ComponentView = 33554432,
    TypeContentQuery = 67108864,
    TypeViewQuery = 134217728,
    StaticQuery = 268435456,
    DynamicQuery = 536870912,
    TypeNgModule = 1073741824,
    CatQuery = 201326592,
    Types = 201347067
}

/**
 * Provides a noop implementation of `NgZone` which does nothing. This zone requires explicit calls
 * to framework to perform rendering.
 */
export declare class ??NoopNgZone implements NgZone {
    readonly hasPendingMicrotasks: boolean;
    readonly hasPendingMacrotasks: boolean;
    readonly isStable: boolean;
    readonly onUnstable: EventEmitter<any>;
    readonly onMicrotaskEmpty: EventEmitter<any>;
    readonly onStable: EventEmitter<any>;
    readonly onError: EventEmitter<any>;
    run(fn: () => any): any;
    runGuarded(fn: () => any): any;
    runOutsideAngular(fn: () => any): any;
    runTask<T>(fn: () => any): any;
}

export declare const ??NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR: {};

export declare function ??nov(view: ViewData, index: number): any;

export declare function ??overrideComponentView(comp: Type<any>, componentFactory: ComponentFactory<any>): void;

export declare function ??overrideProvider(override: ProviderOverride): void;

export declare function ??pad(checkIndex: number, argCount: number): NodeDef;

/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 */
export declare function ??patchComponentDefWithScope<C>(componentDef: ??ComponentDef<C>, transitiveScopes: ??NgModuleTransitiveScopes): void;

export declare function ??pid(flags: ??NodeFlags, ctor: any, deps: ([??DepFlags, any] | any)[]): NodeDef;

/**
 * Runtime link information for Pipes.
 *
 * This is internal data structure used by the renderer to link
 * pipes into templates.
 *
 * NOTE: Always use `definePipe` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {@link definePipe}
 */
export declare interface ??PipeDef<T> {
    /**
     * Pipe name.
     *
     * Used to resolve pipe in templates.
     */
    readonly name: string;
    /**
     * Factory function used to create a new pipe instance.
     */
    factory: FactoryFn<T>;
    /**
     * Whether or not the pipe is pure.
     *
     * Pure pipes result only depends on the pipe input and not on internal
     * state of the pipe.
     */
    readonly pure: boolean;
    onDestroy: (() => void) | null;
}


/**
 * A shared interface which contains an animation player
 */
export declare interface ??Player {
    parent?: ??Player | null;
    state: ??PlayState;
    play(): void;
    pause(): void;
    finish(): void;
    destroy(): void;
    addEventListener(state: ??PlayState | string, cb: (data?: any) => any): void;
}

/**
 * Used as a reference to build a player from a styling template binding
 * (`[style]` and `[class]`).
 *
 * The `fn` function will be called once any styling-related changes are
 * evaluated on an element and is expected to return a player that will
 * be then run on the element.
 *
 * `[style]`, `[style.prop]`, `[class]` and `[class.name]` template bindings
 * all accept a `PlayerFactory` as input and this player factories.
 */
export declare interface ??PlayerFactory {
    '__brand__': 'Brand for PlayerFactory that nothing will match';
}

/**
 * Designed to be used as an injection service to capture all animation players.
 *
 * When present all animation players will be passed into the flush method below.
 * This feature is designed to service application-wide animation testing, live
 * debugging as well as custom animation choreographing tools.
 */
export declare interface ??PlayerHandler {
    /**
     * Designed to kick off the player at the end of change detection
     */
    flushPlayers(): void;
    /**
     * @param player The player that has been scheduled to run within the application.
     * @param context The context as to where the player was bound to
     */
    queuePlayer(player: ??Player, context: ComponentInstance | DirectiveInstance | HTMLElement): void;
}

/**
 * The state of a given player
 *
 * Do not change the increasing nature of the numbers since the player
 * code may compare state by checking if a number is higher or lower than
 * a certain numeric value.
 */
export declare const enum ??PlayState {
    Pending = 0,
    Running = 1,
    Paused = 2,
    Finished = 100,
    Destroyed = 200
}

export declare function ??pod(checkIndex: number, propToIndex: {
    [p: string]: number;
}): NodeDef;

export declare function ??ppd(checkIndex: number, argCount: number): NodeDef;

export declare function ??prd(flags: ??NodeFlags, matchedQueries: null | [string | number, ??QueryValueType][], token: any, value: any, deps: ([??DepFlags, any] | any)[]): NodeDef;

/**
 * Publishes a collection of default debug tools onto`window.ng`.
 *
 * These functions are available globally when Angular is in development
 * mode and are automatically stripped away from prod mode is on.
 */
export declare function ??publishDefaultGlobalUtils(): void;

/**
 * Publishes the given function to `window.ng` so that it can be
 * used from the browser console when an application is not in production.
 */
export declare function ??publishGlobalUtil(name: string, fn: Function): void;

export declare function ??qud(flags: ??NodeFlags, id: number, bindings: {
    [propName: string]: ??QueryBindingType;
}): NodeDef;

export declare const enum ??QueryBindingType {
    First = 0,
    All = 1
}

export declare const enum ??QueryValueType {
    ElementRef = 0,
    RenderElement = 1,
    TemplateRef = 2,
    ViewContainerRef = 3,
    Provider = 4
}

export declare class ??ReflectionCapabilities implements PlatformReflectionCapabilities {
    private _reflect;
    constructor(reflect?: any);
    isReflectionEnabled(): boolean;
    factory<T>(t: Type<T>): (args: any[]) => T;
    private _ownParameters;
    parameters(type: Type<any>): any[][];
    private _ownAnnotations;
    annotations(typeOrFunc: Type<any>): any[];
    private _ownPropMetadata;
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    ownPropMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    hasLifecycleHook(type: any, lcProperty: string): boolean;
    guards(type: any): {
        [key: string]: any;
    };
    getter(name: string): ??GetterFn;
    setter(name: string): ??SetterFn;
    method(name: string): ??MethodFn;
    importUri(type: any): string;
    resourceUri(type: any): string;
    resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any;
    resolveEnum(enumIdentifier: any, name: string): any;
}

/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * @publicApi
 */
export declare function ??registerModuleFactory(id: string, factory: NgModuleFactory<any>): void;

export declare function ??registerNgModuleType(id: string, ngModuleType: ??NgModuleType): void;

/**
 * Render3 implementation of {@link viewEngine_ComponentFactory}.
 */
export declare class ??Render3ComponentFactory<T> extends ComponentFactory<T> {
    private componentDef;
    private ngModule?;
    selector: string;
    componentType: Type<any>;
    ngContentSelectors: string[];
    isBoundToModule: boolean;
    readonly inputs: {
        propName: string;
        templateName: string;
    }[];
    readonly outputs: {
        propName: string;
        templateName: string;
    }[];
    /**
     * @param componentDef The component definition.
     * @param ngModule The NgModuleRef to which the factory is bound.
     */
    constructor(componentDef: ??ComponentDef<any>, ngModule?: NgModuleRef<any> | undefined);
    create(injector: Injector, projectableNodes?: any[][] | undefined, rootSelectorOrNode?: any, ngModule?: NgModuleRef<any> | undefined): ComponentRef<T>;
}

/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
export declare class ??Render3ComponentRef<T> extends ComponentRef<T> {
    location: ElementRef;
    private _rootLView;
    private _tNode;
    destroyCbs: (() => void)[] | null;
    instance: T;
    hostView: ViewRef_2<T>;
    changeDetectorRef: ChangeDetectorRef;
    componentType: Type<T>;
    constructor(componentType: Type<T>, instance: T, location: ElementRef, _rootLView: ??angular_packages_core_core_bm, _tNode: ??angular_packages_core_core_bg | TContainerNode | TElementContainerNode);
    readonly injector: Injector;
    destroy(): void;
    onDestroy(callback: () => void): void;
}

export declare class ??Render3NgModuleRef<T> extends NgModuleRef<T> implements InternalNgModuleRef<T> {
    _parent: Injector | null;
    _bootstrapComponents: Type<any>[];
    _r3Injector: R3Injector;
    injector: Injector;
    instance: T;
    destroyCbs: (() => void)[] | null;
    constructor(ngModuleType: Type<T>, _parent: Injector | null);
    get(token: any, notFoundValue?: any, injectFlags?: InjectFlags): any;
    readonly componentFactoryResolver: ComponentFactoryResolver;
    destroy(): void;
    onDestroy(callback: () => void): void;
}

/**
 * Bootstraps a Component into an existing host element and returns an instance
 * of the component.
 *
 * Use this function to bootstrap a component into the DOM tree. Each invocation
 * of this function will create a separate tree of components, injectors and
 * change detection cycles and lifetimes. To dynamically insert a new component
 * into an existing tree such that it shares the same injection, change detection
 * and object lifetime, use {@link ViewContainer#createComponent}.
 *
 * @param componentType Component to bootstrap
 * @param options Optional parameters which control bootstrapping
 */
export declare function ??renderComponent<T>(componentType: ??ComponentType<T> | Type<T>, opts?: CreateComponentOptions): T;

/**
 * @deprecated Debug info is handled internally in the view engine now.
 */
export declare abstract class ??RenderDebugInfo {
    abstract readonly injector: Injector;
    abstract readonly component: any;
    abstract readonly providerTokens: any[];
    abstract readonly references: {
        [key: string]: any;
    };
    abstract readonly context: any;
    abstract readonly source: string;
}

/**
 * Flags passed into template functions to determine which blocks (i.e. creation, update)
 * should be executed.
 *
 * Typically, a template runs both the creation block and the update block on initialization and
 * subsequent runs only execute the update block. However, dynamically created views require that
 * the creation block be executed separately from the update block (for backwards compat).
 */
export declare const enum ??RenderFlags {
    Create = 1,
    Update = 2
}

export declare function ??resetCompiledComponents(): void;

/**
 * Used to resolve resource URLs on `@Component` when used with JIT compilation.
 *
 * Example:
 * ```
 * @Component({
 *   selector: 'my-comp',
 *   templateUrl: 'my-comp.html', // This requires asynchronous resolution
 * })
 * class MyComponent{
 * }
 *
 * // Calling `renderComponent` will fail because `renderComponent` is a synchronous process
 * // and `MyComponent`'s `@Component.templateUrl` needs to be resolved asynchronously.
 *
 * // Calling `resolveComponentResources()` will resolve `@Component.templateUrl` into
 * // `@Component.template`, which allows `renderComponent` to proceed in a synchronous manner.
 *
 * // Use browser's `fetch()` function as the default resource resolution strategy.
 * resolveComponentResources(fetch).then(() => {
 *   // After resolution all URLs have been converted into `template` strings.
 *   renderComponent(MyComponent);
 * });
 *
 * ```
 *
 * NOTE: In AOT the resolution happens during compilation, and so there should be no need
 * to call this method outside JIT mode.
 *
 * @param resourceResolver a function which is responsible for returning a `Promise` to the
 * contents of the resolved URL. Browser's `fetch()` method is a good default implementation.
 */
export declare function ??resolveComponentResources(resourceResolver: (url: string) => (Promise<string | {
    text(): Promise<string>;
}>)): Promise<void>;

/**
 * Adds decorator, constructor, and property metadata to a given type via static metadata fields
 * on the type.
 *
 * These metadata fields can later be read with Angular's `ReflectionCapabilities` API.
 *
 * Calls to `setClassMetadata` can be marked as pure, resulting in the metadata assignments being
 * tree-shaken away during production builds.
 */
export declare function ??setClassMetadata(type: Type<any>, decorators: any[] | null, ctorParameters: (() => any[]) | null, propDecorators: {
    [field: string]: any;
} | null): void;

export declare function ??setCurrentInjector(injector: Injector | null | undefined): Injector | undefined | null;


export declare type ??SetterFn = (obj: any, value: any) => void;

/** Store a value in the `data` at a given `index`. */
export declare function ??store<T>(index: number, value: T): void;


export declare function ??stringify(token: any): string;

export declare const ??SWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__: typeof injectChangeDetectorRef;

export declare const ??SWITCH_COMPILE_COMPONENT__POST_R3__: typeof ??compileComponent;

export declare const ??SWITCH_COMPILE_DIRECTIVE__POST_R3__: typeof ??compileDirective;

export declare const ??SWITCH_COMPILE_INJECTABLE__POST_R3__: typeof compileInjectable;

export declare const ??SWITCH_COMPILE_NGMODULE__POST_R3__: typeof ??compileNgModule;

export declare const ??SWITCH_COMPILE_PIPE__POST_R3__: typeof ??compilePipe;

export declare const ??SWITCH_ELEMENT_REF_FACTORY__POST_R3__: typeof injectElementRef;


export declare const ??SWITCH_IVY_ENABLED__POST_R3__ = true;

export declare const ??SWITCH_RENDERER2_FACTORY__POST_R3__: typeof injectRenderer2;

export declare const ??SWITCH_TEMPLATE_REF_FACTORY__POST_R3__: typeof injectTemplateRef;

export declare const ??SWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__: typeof injectViewContainerRef;

export declare function ??ted(checkIndex: number, ngContentIndex: number | null, staticText: string[]): NodeDef;

/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 */
export declare function ??transitiveScopesFor<T>(moduleType: Type<T>, processNgModuleFn?: (ngModule: ??NgModuleType) => void): ??NgModuleTransitiveScopes;

export declare function ??unv(view: ViewData, nodeIdx: number, bindingIdx: number, value: any): any;

export declare function ??vid(flags: ??ViewFlags, nodes: NodeDef[], updateDirectives?: null | ViewUpdateFn, updateRenderer?: null | ViewUpdateFn): ??ViewDefinition;

export declare interface ??ViewDefinition extends Definition<ViewDefinitionFactory> {
    flags: ??ViewFlags;
    updateDirectives: ViewUpdateFn;
    updateRenderer: ViewUpdateFn;
    handleEvent: ViewHandleEventFn;
    /**
     * Order: Depth first.
     * Especially providers are before elements / anchors.
     */
    nodes: NodeDef[];
    /** aggregated NodeFlags for all nodes **/
    nodeFlags: ??NodeFlags;
    rootNodeFlags: ??NodeFlags;
    lastRenderRootNode: NodeDef | null;
    bindingCount: number;
    outputCount: number;
    /**
     * Binary or of all query ids that are matched by one of the nodes.
     * This includes query ids from templates as well.
     * Used as a bloom filter.
     */
    nodeMatchedQueries: number;
}

/**
 * Bitmask for ViewDefinition.flags.
 */
export declare const enum ??ViewFlags {
    None = 0,
    OnPush = 2
}

/**
 * Wait on component until it is rendered.
 *
 * This function returns a `Promise` which is resolved when the component's
 * change detection is executed. This is determined by finding the scheduler
 * associated with the `component`'s render tree and waiting until the scheduler
 * flushes. If nothing is scheduled, the function returns a resolved promise.
 *
 * Example:
 * ```
 * await whenRendered(myComponent);
 * ```
 *
 * @param component Component to wait upon
 * @returns Promise which resolves when the component is rendered.
 */
export declare function ??whenRendered(component: any): Promise<null>;


/**
 * Allocates the necessary amount of slots for host vars.
 *
 * @param count Amount of vars to be allocated
 *
 * @codeGenApi
 */
export declare function ????allocHostVars(count: number): void;

/**
 * Runtime information for classes that are inherited by components or directives
 * that aren't defined as components or directives.
 *
 * This is an internal data structure used by the renderer to determine what inputs
 * and outputs should be inherited.
 *
 * See: {@link defineBase}
 *
 * @codeGenApi
 */
export declare interface ????BaseDef<T> {
    /**
     * A dictionary mapping the inputs' minified property names to their public API names, which
     * are their aliases if any, or their original unminified property names
     * (as in `@Input('alias') propertyName: any;`).
     */
    readonly inputs: {
        [P in keyof T]: string;
    };
    /**
     * @deprecated This is only here because `NgOnChanges` incorrectly uses declared name instead of
     * public or minified name.
     */
    readonly declaredInputs: {
        [P in keyof T]: string;
    };
    /**
     * A dictionary mapping the outputs' minified property names to their public API names, which
     * are their aliases if any, or their original unminified property names
     * (as in `@Output('alias') propertyName: any;`).
     */
    readonly outputs: {
        [P in keyof T]: string;
    };
    /**
     * Function to create and refresh content queries associated with a given directive.
     */
    contentQueries: ContentQueriesFunction<T> | null;
    /**
     * Query-related instructions for a directive. Note that while directives don't have a
     * view and as such view queries won't necessarily do anything, there might be
     * components that extend the directive.
     */
    viewQuery: ViewQueriesFunction<T> | null;
}

/**
 * Creates a single value binding.
 *
 * @param value Value to diff
 *
 * @codeGenApi
 */
export declare function ????bind<T>(value: T): T | ??NO_CHANGE;

/**
 * @codeGenApi
 */
export declare type ????ComponentDefWithMeta<T, Selector extends String, ExportAs extends string[], InputMap extends {
    [key: string]: string;
}, OutputMap extends {
    [key: string]: string;
}, QueryFields extends string[]> = ??ComponentDef<T>;

/**
* Registers a synthetic host listener (e.g. `(@foo.start)`) on a component.
*
* This instruction is for compatibility purposes and is designed to ensure that a
* synthetic host listener (e.g. `@HostListener('@foo.start')`) properly gets rendered
* in the component's renderer. Normally all host listeners are evaluated with the
* parent component's renderer, but, in the case of animation @triggers, they need
* to be evaluated with the sub component's renderer (because that's where the
* animation triggers are defined).
*
* Do not use this instruction as a replacement for `listener`. This instruction
* only exists to ensure compatibility with the ViewEngine's host binding behavior.
*
* @param eventName Name of the event
* @param listenerFn The function to be called when event emits
* @param useCapture Whether or not to use capture in event listener
* @param eventTargetResolver Function that returns global target information in case this listener
* should be attached to a global object like window, document or body
 *
 * @codeGenApi
*/
export declare function ????componentHostSyntheticListener<T>(eventName: string, listenerFn: (e?: any) => any, useCapture?: boolean, eventTargetResolver?: GlobalTargetResolver): void;

/**
 * Updates a synthetic host binding (e.g. `[@foo]`) on a component.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host binding (e.g. `@HostBinding('@foo')`) properly gets rendered in
 * the component's renderer. Normally all host bindings are evaluated with the parent
 * component's renderer, but, in the case of animation @triggers, they need to be
 * evaluated with the sub component's renderer (because that's where the animation
 * triggers are defined).
 *
 * Do not use this instruction as a replacement for `elementProperty`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param index The index of the element to update in the data array
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @param nativeOnly Whether or not we should only set native properties and skip input check
 * (this is necessary for host property bindings)
 *
 * @codeGenApi
 */
export declare function ????componentHostSyntheticProperty<T>(index: number, propName: string, value: T | ??NO_CHANGE, sanitizer?: SanitizerFn | null, nativeOnly?: boolean): void;

/**
 * Creates an LContainer for inline views, e.g.
 *
 * % if (showing) {
 *   <div></div>
 * % }
 *
 * @param index The index of the container in the data array
 *
 * @codeGenApi
 */
export declare function ????container(index: number): void;

/**
 * Marks the end of the LContainer.
 *
 * Marking the end of LContainer is the time when to child views get inserted or removed.
 *
 * @codeGenApi
 */
export declare function ????containerRefreshEnd(): void;

/**
 * Sets a container up to receive views.
 *
 * @param index The index of the container in the data array
 *
 * @codeGenApi
 */
export declare function ????containerRefreshStart(index: number): void;

/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ????contentQuery<T>(directiveIndex: number, predicate: Type<any> | string[], descend: boolean, read: any): QueryList<T>;

/**
 * The default style sanitizer will handle sanitization for style properties by
 * sanitizing any CSS property that can include a `url` value (usually image-based properties)
 *
 * @publicApi
 */
export declare const ????defaultStyleSanitizer: StyleSanitizeFn;

/**
 * Create a base definition
 *
 * # Example
 * ```ts
 * class ShouldBeInherited {
 *   static ngBaseDef = ????defineBase({
 *      ...
 *   })
 * }
 * ```
 *
 * @param baseDefinition The base definition parameters
 *
 * @codeGenApi
 */
export declare function ????defineBase<T>(baseDefinition: {
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: [ 'declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['declared', 'public']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `outputs`.
     */
    inputs?: {
        [P in keyof T]?: string | [string, string];
    };
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: {
        [P in keyof T]?: string;
    };
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ContentQueriesFunction<T> | null;
    /**
     * Additional set of instructions specific to view query processing. This could be seen as a
     * set of instructions to be inserted into the template function.
     */
    viewQuery?: ViewQueriesFunction<T> | null;
}): ????BaseDef<T>;

/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngComponentDef = defineComponent({
 *     ...
 *   });
 * }
 * ```
 * @codeGenApi
 */
export declare function ????defineComponent<T>(componentDefinition: {
    /**
     * Directive type, needed to configure the injector.
     */
    type: Type<T>;
    /** The selectors that will be used to match nodes to this component. */
    selectors: ??CssSelectorList;
    /**
     * Factory method used to create an instance of directive.
     */
    factory: FactoryFn<T>;
    /**
     * The number of nodes, local refs, and pipes in this component template.
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the binding start index.
     */
    consts: number;
    /**
     * The number of bindings in this component template (including pure fn bindings).
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    vars: number;
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: ['publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['public', 'declared']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `output`.
     */
    inputs?: {
        [P in keyof T]?: string | [string, string];
    };
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: {
        [P in keyof T]?: string;
    };
    /**
     * Function executed by the parent template to allow child directive to apply host bindings.
     */
    hostBindings?: HostBindingsFunction<T>;
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ContentQueriesFunction<T>;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * See: {@link Directive.exportAs}
     */
    exportAs?: string[];
    /**
     * Template function use for rendering DOM.
     *
     * This function has following structure.
     *
     * ```
     * function Template<T>(ctx:T, creationMode: boolean) {
     *   if (creationMode) {
     *     // Contains creation mode instructions.
     *   }
     *   // Contains binding update instructions
     * }
     * ```
     *
     * Common instructions are:
     * Creation mode instructions:
     *  - `elementStart`, `elementEnd`
     *  - `text`
     *  - `container`
     *  - `listener`
     *
     * Binding update instructions:
     * - `bind`
     * - `elementAttribute`
     * - `elementProperty`
     * - `elementClass`
     * - `elementStyle`
     *
     */
    template: ComponentTemplate<T>;
    /**
     * An array of `ngContent[selector]` values that were found in the template.
     */
    ngContentSelectors?: string[];
    /**
     * Additional set of instructions specific to view query processing. This could be seen as a
     * set of instruction to be inserted into the template function.
     *
     * Query-related instructions need to be pulled out to a specific function as a timing of
     * execution is different as compared to all other instructions (after change detection hooks but
     * before view hooks).
     */
    viewQuery?: ViewQueriesFunction<T> | null;
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}
     */
    features?: ComponentDefFeature[];
    /**
     * Defines template and style encapsulation options available for Component's {@link Component}.
     */
    encapsulation?: ViewEncapsulation;
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     *
     * see: animation
     */
    data?: {
        [kind: string]: any;
    };
    /**
     * A set of styles that the component needs to be present for component to render correctly.
     */
    styles?: string[];
    /**
     * The strategy that the default change detector uses to detect changes.
     * When set, takes effect the next time change detection is triggered.
     */
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Registry of directives and components that may be found in this component's view.
     *
     * The property is either an array of `DirectiveDef`s or a function which returns the array of
     * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
     */
    directives?: DirectiveTypesOrFactory | null;
    /**
     * Registry of pipes that may be found in this component's view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     */
    pipes?: PipeTypesOrFactory | null;
    /**
     * The set of schemas that declare elements to be allowed in the component's template.
     */
    schemas?: SchemaMetadata[] | null;
}): never;

/**
 * Create a directive definition object.
 *
 * # Example
 * ```ts
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngDirectiveDef = ????defineDirective({
 *     ...
 *   });
 * }
 * ```
 *
 * @codeGenApi
 */
export declare const ????defineDirective: <T>(directiveDefinition: {
    /**
     * Directive type, needed to configure the injector.
     */
    type: Type<T>;
    /** The selectors that will be used to match nodes to this directive. */
    selectors: (string | SelectorFlags)[][];
    /**
     * Factory method used to create an instance of directive.
     */
    factory: FactoryFn<T>;
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: [ 'publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['declared', 'public']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `output`.
     */
    inputs?: { [P in keyof T]?: string | [string, string] | undefined; } | undefined;
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: { [P in keyof T]?: string | undefined; } | undefined;
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}, {@link InheritDefinitionFeature}
     */
    features?: DirectiveDefFeature[] | undefined;
    /**
     * Function executed by the parent template to allow child directive to apply host bindings.
     */
    hostBindings?: HostBindingsFunction<T> | undefined;
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ContentQueriesFunction<T> | undefined;
    /**
     * Additional set of instructions specific to view query processing. This could be seen as a
     * set of instructions to be inserted into the template function.
     */
    viewQuery?: ViewQueriesFunction<T> | null | undefined;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * See: {@link Directive.exportAs}
     */
    exportAs?: string[] | undefined;
}) => never;

/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ngInjectableDef` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 */
export declare function ????defineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null;
    factory: () => T;
}): never;

/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static `ngInjectorDef` field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has an `ngInjectableDef` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @publicApi
 */
export declare function ????defineInjector(options: {
    factory: () => any;
    providers?: any[];
    imports?: any[];
}): never;

/**
 * @codeGenApi
 */
export declare function ????defineNgModule<T>(def: {
    /** Token representing the module. Used by DI. */
    type: T;
    /** List of components to bootstrap. */
    bootstrap?: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations?: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports?: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports?: Type<any>[] | (() => Type<any>[]);
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas?: SchemaMetadata[] | null;
}): never;

/**
 * Create a pipe definition object.
 *
 * # Example
 * ```
 * class MyPipe implements PipeTransform {
 *   // Generated by Angular Template Compiler
 *   static ngPipeDef = definePipe({
 *     ...
 *   });
 * }
 * ```
 * @param pipeDef Pipe definition generated by the compiler
 *
 * @codeGenApi
 */
export declare function ????definePipe<T>(pipeDef: {
    /** Name of the pipe. Used for matching pipes in template to pipe defs. */
    name: string;
    /** Pipe class reference. Needed to extract pipe lifecycle hooks. */
    type: Type<T>;
    /** A factory for creating a pipe instance. */
    factory: FactoryFn<T>;
    /** Whether the pipe is pure. */
    pure?: boolean;
}): never;

/**
 * @codeGenApi
 */
export declare type ????DirectiveDefWithMeta<T, Selector extends string, ExportAs extends string[], InputMap extends {
    [key: string]: string;
}, OutputMap extends {
    [key: string]: string;
}, QueryFields extends string[]> = ??DirectiveDef<T>;

/**
 * Returns the value associated to the given token from the injectors.
 *
 * `directiveInject` is intended to be used for directive, component and pipe factories.
 *  All other injection use `inject` which does not walk the node injector tree.
 *
 * Usage example (in factory function):
 *
 * ```ts
 * class SomeDirective {
 *   constructor(directive: DirectiveA) {}
 *
 *   static ngDirectiveDef = ????defineDirective({
 *     type: SomeDirective,
 *     factory: () => new SomeDirective(????directiveInject(DirectiveA))
 *   });
 * }
 * ```
 * @param token the type or token to inject
 * @param flags Injection flags
 * @returns the value from the injector or `null` when not found
 *
 * @codeGenApi
 */
export declare function ????directiveInject<T>(token: Type<T> | InjectionToken<T>): T;

export declare function ????directiveInject<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags): T;

/**
 * Disables directive matching on element.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ????disableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ????enableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export declare function ????disableBindings(): void;

/**
 * Creates an empty element using {@link elementStart} and {@link elementEnd}
 *
 * @param index Index of the element in the data array
 * @param name Name of the DOM Node
 * @param attrs Statically bound set of attributes, classes, and styles to be written into the DOM
 *              element on creation. Use [AttributeMarker] to denote the meaning of this array.
 * @param localRefs A set of local reference bindings on the element.
 *
 * @codeGenApi
 */
export declare function ????element(index: number, name: string, attrs?: TAttributes | null, localRefs?: string[] | null): void;

/**
 * Updates the value of removes an attribute on an Element.
 *
 * @param number index The index of the element in the data array
 * @param name name The name of the attribute.
 * @param value value The attribute is removed when value is `null` or `undefined`.
 *                  Otherwise the attribute value is set to the stringified value.
 * @param sanitizer An optional function used to sanitize the value.
 * @param namespace Optional namespace to use when setting the attribute.
 *
 * @codeGenApi
 */
export declare function ????elementAttribute(index: number, name: string, value: any, sanitizer?: SanitizerFn | null, namespace?: string): void;

/**
 * Update a class binding on an element with the provided value.
 *
 * This instruction is meant to handle the `[class.foo]="exp"` case and,
 * therefore, the class binding itself must already be allocated using
 * `elementStyling` within the creation block.
 *
 * @param index Index of the element's with which styling is associated.
 * @param classIndex Index of class to toggle. This index value refers to the
 *        index of the class in the class bindings array that was passed into
 *        `elementStyling` (which is meant to be called before this
 *        function is).
 * @param value A true/false value which will turn the class on or off.
 * @param forceOverride Whether or not this value will be applied regardless
 *        of where it is being set within the styling priority structure.
 *
 * @codeGenApi
 */
export declare function ????elementClassProp(index: number, classIndex: number, value: boolean | ??PlayerFactory, forceOverride?: boolean): void;

/**
 * Mark the end of the <ng-container>.
 *
 * @codeGenApi
 */
export declare function ????elementContainerEnd(): void;

/**
 * Creates a logical container for other nodes (<ng-container>) backed by a comment node in the DOM.
 * The instruction must later be followed by `elementContainerEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param attrs Set of attributes to be used when matching directives.
 * @param localRefs A set of local reference bindings on the element.
 *
 * Even if this instruction accepts a set of attributes no actual attribute values are propagated to
 * the DOM (as a comment node can't have attributes). Attributes are here only for directive
 * matching purposes and setting initial inputs of directives.
 *
 * @codeGenApi
 */
export declare function ????elementContainerStart(index: number, attrs?: TAttributes | null, localRefs?: string[] | null): void;

/**
 * Mark the end of the element.
 *
 * @codeGenApi
 */
export declare function ????elementEnd(): void;

/**
 * Assign static attribute values to a host element.
 *
 * This instruction will assign static attribute values as well as class and style
 * values to an element within the host bindings function. Since attribute values
 * can consist of different types of values, the `attrs` array must include the values in
 * the following format:
 *
 * attrs = [
 *   // static attributes (like `title`, `name`, `id`...)
 *   attr1, value1, attr2, value,
 *
 *   // a single namespace value (like `x:id`)
 *   NAMESPACE_MARKER, namespaceUri1, name1, value1,
 *
 *   // another single namespace value (like `x:name`)
 *   NAMESPACE_MARKER, namespaceUri2, name2, value2,
 *
 *   // a series of CSS classes that will be applied to the element (no spaces)
 *   CLASSES_MARKER, class1, class2, class3,
 *
 *   // a series of CSS styles (property + value) that will be applied to the element
 *   STYLES_MARKER, prop1, value1, prop2, value2
 * ]
 *
 * All non-class and non-style attributes must be defined at the start of the list
 * first before all class and style values are set. When there is a change in value
 * type (like when classes and styles are introduced) a marker must be used to separate
 * the entries. The marker values themselves are set via entries found in the
 * [AttributeMarker] enum.
 *
 * NOTE: This instruction is meant to used from `hostBindings` function only.
 *
 * @param directive A directive instance the styling is associated with.
 * @param attrs An array of static values (attributes, classes and styles) with the correct marker
 * values.
 *
 * @codeGenApi
 */
export declare function ????elementHostAttrs(attrs: TAttributes): void;

/**
 * Update a class host binding for a directive's/component's host element within
 * the host bindings function.
 *
 * This instruction is meant to handle the `@HostBinding('class.foo')` case and,
 * therefore, the class binding itself must already be allocated using
 * `elementHostStyling` within the creation block.
 *
 * @param classIndex Index of class to toggle. This index value refers to the
 *        index of the class in the class bindings array that was passed into
 *        `elementHostStlying` (which is meant to be called before this
 *        function is).
 * @param value A true/false value which will turn the class on or off.
 * @param forceOverride Whether or not this value will be applied regardless
 *        of where it is being set within the stylings priority structure.
 *
 * @codeGenApi
 */
export declare function ????elementHostClassProp(classIndex: number, value: boolean | ??PlayerFactory, forceOverride?: boolean): void;

/**
 * Update a host style binding value on the host element within a component/directive.
 *
 * If the style value is falsy then it will be removed from the host element
 * (or assigned a different value depending if there are any styles placed
 * on the same element with `elementHostStylingMap` or any static styles that
 * are present from when the element was patched with `elementHostStyling`).
 *
 * Note that the styling applied to the host element once
 * `elementHostStylingApply` is called.
 *
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `elementHostStyling`.
 * @param value New value to write (falsy to remove). The value may or may not
 *        be applied to the element depending on the template/component/directive
 *        prioritization (see `interfaces/styling.ts`)
 * @param suffix Optional suffix. Used with scalar values to add unit such as `px`.
 *        Note that when a suffix is provided then the underlying sanitizer will
 *        be ignored.
 * @param forceOverride Whether or not to update the styling value immediately
 *        (despite the other bindings possibly having priority)
 *
 * @codeGenApi
 */
export declare function ????elementHostStyleProp(styleIndex: number, value: string | number | String | ??PlayerFactory | null, suffix?: string | null, forceOverride?: boolean): void;

/**
 * Allocates style and class binding properties on the host element during creation mode
 * within the host bindings function of a directive or component.
 *
 * This instruction is meant to be called during creation mode to register all
 * dynamic style and class host bindings on the host element of a directive or
 * component. Note that this is only used for binding values (see `elementHostAttrs`
 * to learn how to assign static styling values to the host element).
 *
 * @param classBindingNames An array containing bindable class names.
 *        The `elementHostClassProp` instruction refers to the class name by index in
 *        this array (i.e. `['foo', 'bar']` means `foo=0` and `bar=1`).
 * @param styleBindingNames An array containing bindable style properties.
 *        The `elementHostStyleProp` instruction refers to the class name by index in
 *        this array (i.e. `['width', 'height']` means `width=0` and `height=1`).
 * @param styleSanitizer An optional sanitizer function that will be used to sanitize any CSS
 *        style values that are applied to the element (during rendering).
 *        Note that the sanitizer instance itself is tied to the provided `directive` and
 *        will not be used if the same property is assigned in another directive or
 *        on the element directly.
 *
 * @codeGenApi
 */
export declare function ????elementHostStyling(classBindingNames?: string[] | null, styleBindingNames?: string[] | null, styleSanitizer?: StyleSanitizeFn | null): void;

/**
 * Apply all style and class host binding values to the element.
 *
 * This instruction is meant to be run after `elementHostStylingMap`,
 * `elementHostStyleProp` or `elementHostClassProp` instructions have
 * been run and will only apply styling to the host element if any
 * styling bindings have been updated.
 *
 * @codeGenApi
 */
export declare function ????elementHostStylingApply(): void;

/**
 * Update style and/or class host bindings using object literals on an element within the host
 * bindings function for a directive/component.
 *
 * This instruction is meant to apply styling via the `@HostBinding('style')` and
 * `@HostBinding('class')` bindings for a component's or directive's host element.
 * When styles/classes are applied to the host element they will then be updated
 * with respect to any styles/classes set with `elementHostStyleProp` or
 * `elementHostClassProp`. If any styles or classes are set to falsy then they
 * will be removed from the element.
 *
 * Note that the styling instruction will not be applied until
 * `elementHostStylingApply` is called.
 *
 * @param classes A key/value map or string of CSS classes that will be added to the
 *        given element. Any missing classes (that have already been applied to the element
 *        beforehand) will be removed (unset) from the element's list of CSS classes.
 * @param styles A key/value style map of the styles that will be applied to the given element.
 *        Any missing styles (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's styling.
 *
 * @codeGenApi
 */
export declare function ????elementHostStylingMap(classes: {
    [key: string]: any;
} | string | ??NO_CHANGE | null, styles?: {
    [styleName: string]: any;
} | ??NO_CHANGE | null): void;

/**
* **TODO: Remove this function after `property` is in use**
* Update a property on an element.
*
* If the property name also exists as an input property on one of the element's directives,
* the component property will be set instead of the element property. This check must
* be conducted at runtime so child components that add new @Inputs don't have to be re-compiled.
*
* @param index The index of the element to update in the data array
* @param propName Name of property. Because it is going to DOM, this is not subject to
*        renaming as part of minification.
* @param value New value to write.
* @param sanitizer An optional function used to sanitize the value.
* @param nativeOnly Whether or not we should only set native properties and skip input check
* (this is necessary for host property bindings)
 *
 * @codeGenApi
*/
export declare function ????elementProperty<T>(index: number, propName: string, value: T | ??NO_CHANGE, sanitizer?: SanitizerFn | null, nativeOnly?: boolean): void;

/**
 * Create DOM element. The instruction must later be followed by `elementEnd()` call.
 *
 * @param index Index of the element in the LView array
 * @param name Name of the DOM Node
 * @param attrs Statically bound set of attributes, classes, and styles to be written into the DOM
 *              element on creation. Use [AttributeMarker] to denote the meaning of this array.
 * @param localRefs A set of local reference bindings on the element.
 *
 * Attributes and localRefs are passed as an array of strings where elements with an even index
 * hold an attribute name and elements with an odd index hold an attribute value, ex.:
 * ['id', 'warning5', 'class', 'alert']
 *
 * @codeGenApi
 */
export declare function ????elementStart(index: number, name: string, attrs?: TAttributes | null, localRefs?: string[] | null): void;

/**
 * Update a style binding on an element with the provided value.
 *
 * If the style value is falsy then it will be removed from the element
 * (or assigned a different value depending if there are any styles placed
 * on the element with `elementStylingMap` or any static styles that are
 * present from when the element was created with `elementStyling`).
 *
 * Note that the styling element is updated as part of `elementStylingApply`.
 *
 * @param index Index of the element's with which styling is associated.
 * @param styleIndex Index of style to update. This index value refers to the
 *        index of the style in the style bindings array that was passed into
 *        `elementStyling`.
 * @param value New value to write (falsy to remove). Note that if a directive also
 *        attempts to write to the same binding value (via `elementHostStyleProp`)
 *        then it will only be able to do so if the binding value assigned via
 *        `elementStyleProp` is falsy (or doesn't exist at all).
 * @param suffix Optional suffix. Used with scalar values to add unit such as `px`.
 *        Note that when a suffix is provided then the underlying sanitizer will
 *        be ignored.
 * @param forceOverride Whether or not to update the styling value immediately
 *        (despite the other bindings possibly having priority)
 *
 * @codeGenApi
 */
export declare function ????elementStyleProp(index: number, styleIndex: number, value: string | number | String | ??PlayerFactory | null, suffix?: string | null, forceOverride?: boolean): void;

/**
 * Allocates style and class binding properties on the element during creation mode.
 *
 * This instruction is meant to be called during creation mode to register all
 * dynamic style and class bindings on the element. Note that this is only used
 * for binding values (see `elementStart` to learn how to assign static styling
 * values to an element).
 *
 * @param classBindingNames An array containing bindable class names.
 *        The `elementClassProp` instruction refers to the class name by index in
 *        this array (i.e. `['foo', 'bar']` means `foo=0` and `bar=1`).
 * @param styleBindingNames An array containing bindable style properties.
 *        The `elementStyleProp` instruction refers to the class name by index in
 *        this array (i.e. `['width', 'height']` means `width=0` and `height=1`).
 * @param styleSanitizer An optional sanitizer function that will be used to sanitize any CSS
 *        style values that are applied to the element (during rendering).
 *
 * @codeGenApi
 */
export declare function ????elementStyling(classBindingNames?: string[] | null, styleBindingNames?: string[] | null, styleSanitizer?: StyleSanitizeFn | null): void;

/**
 * Apply all style and class binding values to the element.
 *
 * This instruction is meant to be run after `elementStylingMap`, `elementStyleProp`
 * or `elementClassProp` instructions have been run and will only apply styling to
 * the element if any styling bindings have been updated.
 *
 * @param index Index of the element's with which styling is associated.
 *
 * @codeGenApi
 */
export declare function ????elementStylingApply(index: number): void;

/**
 * Update style and/or class bindings using object literals on an element.
 *
 * This instruction is meant to apply styling via the `[style]="exp"` and `[class]="exp"` template
 * bindings. When styles/classes are applied to the element they will then be updated with
 * respect to any styles/classes set with `elementStyleProp` or `elementClassProp`. If any
 * styles or classes are set to falsy then they will be removed from the element.
 *
 * Note that the styling instruction will not be applied until `elementStylingApply` is called.
 *
 * @param index Index of the element's with which styling is associated.
 * @param classes A key/value map or string of CSS classes that will be added to the
 *        given element. Any missing classes (that have already been applied to the element
 *        beforehand) will be removed (unset) from the element's list of CSS classes.
 * @param styles A key/value style map of the styles that will be applied to the given element.
 *        Any missing styles (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's styling.
 *
 * @codeGenApi
 */
export declare function ????elementStylingMap(index: number, classes: {
    [key: string]: any;
} | string | ??NO_CHANGE | null, styles?: {
    [styleName: string]: any;
} | ??NO_CHANGE | null): void;

/**
 * Marks the end of an embedded view.
 *
 * @codeGenApi
 */
export declare function ????embeddedViewEnd(): void;

/**
 * Marks the start of an embedded view.
 *
 * @param viewBlockId The ID of this view
 * @return boolean Whether or not this view is in creation mode
 *
 * @codeGenApi
 */
export declare function ????embeddedViewStart(viewBlockId: number, consts: number, vars: number): ??RenderFlags;

/**
 * Enables directive matching on elements.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ????disableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ????enableBindings() -->
 * </div>
 * ```
 *
 * @codeGenApi
 */
export declare function ????enableBindings(): void;

/**
 * Returns the current OpaqueViewState instance.
 *
 * Used in conjunction with the restoreView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @codeGenApi
 */
export declare function ????getCurrentView(): OpaqueViewState;

/**
 * @codeGenApi
 */
export declare function ????getFactoryOf<T>(type: Type<any>): ((type: Type<T> | null) => T) | null;

/**
 * @codeGenApi
 */
export declare function ????getInheritedFactory<T>(type: Type<any>): (type: Type<T>) => T;

/**
 *
 * Use this instruction to create a translation block that doesn't contain any placeholder.
 * It calls both {@link i18nStart} and {@link i18nEnd} in one instruction.
 *
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `???{index}(:{block})???`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `???#{index}(:{block})???`/`???/#{index}(:{block})???`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `???*{index}:{block}???`/`???/*{index}:{block}???`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param message The translation message.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export declare function ????i18n(index: number, message: string, subTemplateIndex?: number): void;

/**
 * Updates a translation block or an i18n attribute when the bindings have changed.
 *
 * @param index Index of either {@link i18nStart} (translation block) or {@link i18nAttributes}
 * (i18n attribute) on which it should update the content.
 *
 * @codeGenApi
 */
export declare function ????i18nApply(index: number): void;

/**
 * Marks a list of attributes as translatable.
 *
 * @param index A unique index in the static block
 * @param values
 *
 * @codeGenApi
 */
export declare function ????i18nAttributes(index: number, values: string[]): void;

/**
 * Translates a translation block marked by `i18nStart` and `i18nEnd`. It inserts the text/ICU nodes
 * into the render tree, moves the placeholder nodes and removes the deleted nodes.
 *
 * @codeGenApi
 */
export declare function ????i18nEnd(): void;

/**
 * Stores the values of the bindings during each update cycle in order to determine if we need to
 * update the translated nodes.
 *
 * @param expression The binding's new value or NO_CHANGE
 *
 * @codeGenApi
 */
export declare function ????i18nExp<T>(expression: T | ??NO_CHANGE): void;

/**
 * A goog.getMsg-like function for users that do not use Closure.
 *
 * This method is required as a *temporary* measure to prevent i18n tests from being blocked while
 * running outside of Closure Compiler. This method will not be needed once runtime translation
 * service support is introduced.
 *
 * @publicApi
 * @deprecated this method is temporary & should not be used as it will be removed soon
 */
export declare function ????i18nLocalize(input: string, placeholders?: {
    [key: string]: string;
}): string;

/**
 * Handles message string post-processing for internationalization.
 *
 * Handles message string post-processing by transforming it from intermediate
 * format (that might contain some markers that we need to replace) to the final
 * form, consumable by i18nStart instruction. Post processing steps include:
 *
 * 1. Resolve all multi-value cases (like [???*1:1??????#2:1???|???#4:1???|???5???])
 * 2. Replace all ICU vars (like "VAR_PLURAL")
 * 3. Replace all ICU references with corresponding values (like ???ICU_EXP_ICU_1???)
 *    in case multiple ICUs have the same placeholder name
 *
 * @param message Raw translation string for post processing
 * @param replacements Set of replacements that should be applied
 *
 * @returns Transformed string that can be consumed by i18nStart instruction
 *
 * @codeGenApi
 */
export declare function ????i18nPostprocess(message: string, replacements?: {
    [key: string]: (string | string[]);
}): string;

/**
 * Marks a block of text as translatable.
 *
 * The instructions `i18nStart` and `i18nEnd` mark the translation block in the template.
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `???{index}(:{block})???`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `???#{index}(:{block})???`/`???/#{index}(:{block})???`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `???*{index}:{block}???`/`???/*{index}:{block}???`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param message The translation message.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export declare function ????i18nStart(index: number, message: string, subTemplateIndex?: number): void;

/**
 * Merges the definition from a super class to a sub class.
 * @param definition The definition that is a SubClass of another directive of component
 *
 * @codeGenApi
 */
export declare function ????InheritDefinitionFeature(definition: ??DirectiveDef<any> | ??ComponentDef<any>): void;

/**
 * Generated instruction: Injects a token from the currently active injector.
 *
 * Must be used in the context of a factory function such as one defined for an
 * `InjectionToken`. Throws an error if not called from such a context.
 *
 * (Additional documentation moved to `inject`, as it is the public API, and an alias for this instruction)
 *
 * @see inject
 * @codeGenApi
 */
export declare function ????inject<T>(token: Type<T> | InjectionToken<T>): T;

export declare function ????inject<T>(token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;

/**
 * Information about how a type or `InjectionToken` interfaces with the DI system.
 *
 * At a minimum, this includes a `factory` which defines how to create the given type `T`, possibly
 * requesting injection of other types if necessary.
 *
 * Optionally, a `providedIn` parameter specifies that the given type belongs to a particular
 * `InjectorDef`, `NgModule`, or a special scope (e.g. `'root'`). A value of `null` indicates
 * that the injectable does not belong to any scope.
 *
 * NOTE: This is a private type and should not be exported
 *
 * @publicApi
 */
export declare interface ????InjectableDef<T> {
    /**
     * Specifies that the given type belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * - `null`, does not belong to any injector. Must be explicitly listed in the injector
     *   `providers`.
     */
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    /**
     * Factory method to execute to create an instance of the injectable.
     */
    factory: () => T;
    /**
     * In a case of no explicit injector, a location where the instance of the injectable is stored.
     */
    value: T | undefined;
}

/**
 * Facade for the attribute injection from DI.
 *
 * @codeGenApi
 */
export declare function ????injectAttribute(attrNameToInject: string): string | null;

/**
 * Information about the providers to be included in an `Injector` as well as how the given type
 * which carries the information should be created by the DI system.
 *
 * An `InjectorDef` can import other types which have `InjectorDefs`, forming a deep nested
 * structure of providers with a defined priority (identically to how `NgModule`s also have
 * an import/dependency structure).
 *
 * NOTE: This is a private type and should not be exported
 *
 * @publicApi
 */
export declare interface ????InjectorDef<T> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}

/**
 * Creates an interpolation binding with 1 expression.
 *
 * @param prefix static value used for concatenation only.
 * @param v0 value checked for change.
 * @param suffix static value used for concatenation only.
 *
 * @codeGenApi
 */
export declare function ????interpolation1(prefix: string, v0: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 2 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation2(prefix: string, v0: any, i0: string, v1: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 3 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation3(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string): string | ??NO_CHANGE;

/**
 * Create an interpolation binding with 4 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation4(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 5 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation5(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 6 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation6(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 7 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation7(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string): string | ??NO_CHANGE;

/**
 * Creates an interpolation binding with 8 expressions.
 *
 * @codeGenApi
 */
export declare function ????interpolation8(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string): string | ??NO_CHANGE;

/**
 * Create interpolation bindings with a variable number of expressions.
 *
 * If there are 1 to 8 expressions `interpolation1()` to `interpolation8()` should be used instead.
 * Those are faster because there is no need to create an array of expressions and iterate over it.
 *
 * `values`:
 * - has static text at even indexes,
 * - has evaluated expressions at odd indexes.
 *
 * Returns the concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 *
 * @codeGenApi
 */
export declare function ????interpolationV(values: any[]): string | ??NO_CHANGE;

/**
 * Adds an event listener to the current node.
 *
 * If an output exists on one of the node's directives, it also subscribes to the output
 * and saves the subscription for later cleanup.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener
 * @param eventTargetResolver Function that returns global target information in case this listener
 * should be attached to a global object like window, document or body
 *
 * @codeGenApi
 */
export declare function ????listener(eventName: string, listenerFn: (e?: any) => any, useCapture?: boolean, eventTargetResolver?: GlobalTargetResolver): void;

/**
 * Retrieves a value from current `viewData`.
 *
 * @codeGenApi
 */
export declare function ????load<T>(index: number): T;

/**
 *
 * @codeGenApi
 */
export declare function ????loadContentQuery<T>(): QueryList<T>;

/**
 * Loads current View Query and moves the pointer/index to the next View Query in LView.
 *
 * @codeGenApi
 */
export declare function ????loadViewQuery<T>(): T;

/**
 * Sets the namespace used to create elements no `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 *
 * @codeGenApi
 */
export declare function ????namespaceHTML(): void;

/**
 * Sets the namespace used to create elements to `'http://www.w3.org/1998/MathML/'` in global state.
 *
 * @codeGenApi
 */
export declare function ????namespaceMathML(): void;

/**
 * Sets the namespace used to create elements to `'http://www.w3.org/2000/svg'` in global state.
 *
 * @codeGenApi
 */
export declare function ????namespaceSVG(): void;

/**
 * Retrieves a context at the level specified and saves it as the global, contextViewData.
 * Will get the next level up if level is not specified.
 *
 * This is used to save contexts of parent views so they can be bound in embedded views, or
 * in conjunction with reference() to bind a ref from a parent view.
 *
 * @param level The relative level of the view from which to grab context compared to contextVewData
 * @returns context
 *
 * @codeGenApi
 */
export declare function ????nextContext<T = any>(level?: number): T;

/**
 * @publicApi
 */
export declare type ????NgModuleDefWithMeta<T, Declarations, Imports, Exports> = ??NgModuleDef<T>;

/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```
 * static ngComponentDef = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature()]
 * });
 * ```
 *
 * @codeGenApi
 */
export declare function ????NgOnChangesFeature<T>(): DirectiveDefFeature;


/**
 * Create a pipe.
 *
 * @param index Pipe index where the pipe will be stored.
 * @param pipeName The name of the pipe
 * @returns T the instance of the pipe.
 *
 * @codeGenApi
 */
export declare function ????pipe(index: number, pipeName: string): any;

/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ????pipeBind1(index: number, slotOffset: number, v1: any): any;

/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ????pipeBind2(index: number, slotOffset: number, v1: any, v2: any): any;

/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 4rd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ????pipeBind3(index: number, slotOffset: number, v1: any, v2: any, v3: any): any;

/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 3rd argument to {@link PipeTransform#transform}.
 * @param v4 4th argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export declare function ????pipeBind4(index: number, slotOffset: number, v1: any, v2: any, v3: any, v4: any): any;

/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param values Array of arguments to pass to {@link PipeTransform#transform} method.
 *
 * @codeGenApi
 */
export declare function ????pipeBindV(index: number, slotOffset: number, values: any[]): any;

/**
 * @codeGenApi
 */
export declare type ????PipeDefWithMeta<T, Name extends string> = ??PipeDef<T>;

/**
 * Inserts previously re-distributed projected nodes. This instruction must be preceded by a call
 * to the projectionDef instruction.
 *
 * @param nodeIndex
 * @param selectorIndex:
 *        - 0 when the selector is `*` (or unspecified as this is the default value),
 *        - 1 based index of the selector from the {@link projectionDef}
 *
 * @codeGenApi
*/
export declare function ????projection(nodeIndex: number, selectorIndex?: number, attrs?: TAttributes): void;

/**
 * Instruction to distribute projectable nodes among <ng-content> occurrences in a given template.
 * It takes all the selectors from the entire component's template and decides where
 * each projected node belongs (it re-distributes nodes among "buckets" where each "bucket" is
 * backed by a selector).
 *
 * This function requires CSS selectors to be provided in 2 forms: parsed (by a compiler) and text,
 * un-parsed form.
 *
 * The parsed form is needed for efficient matching of a node against a given CSS selector.
 * The un-parsed, textual form is needed for support of the ngProjectAs attribute.
 *
 * Having a CSS selector in 2 different formats is not ideal, but alternatives have even more
 * drawbacks:
 * - having only a textual form would require runtime parsing of CSS selectors;
 * - we can't have only a parsed as we can't re-construct textual form from it (as entered by a
 * template author).
 *
 * @param projectionSlots? A collection of projection slots. A projection slot can be based
 *        on a parsed CSS selectors or set to the wildcard selector ("*") in order to match
 *        all nodes which do not match any selector. If not specified, a single wildcard
 *        selector projection slot will be defined.
 *
 * @codeGenApi
 */
export declare function ????projectionDef(projectionSlots?: ProjectionSlots): void;

/**
 * Update a property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled
 *
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @param nativeOnly Whether or not we should only set native properties and skip input check
 * (this is necessary for host property bindings)
 * @returns This function returns itself so that it may be chained
 * (e.g. `property('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ????property<T>(propName: string, value: T, sanitizer?: SanitizerFn | null, nativeOnly?: boolean): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with a lone bound value
 *
 * Used when the value passed to a property has 1 interpolated value in it, an no additional text
 * surrounds that interpolated value:
 *
 * ```html
 * <div title="{{v0}}"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate('title', v0);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate(propName: string, v0: any, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with single bound value surrounded by text.
 *
 * Used when the value passed to a property has 1 interpolated value in it:
 *
 * ```html
 * <div title="prefix{{v0}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate1('title', 'prefix', v0, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate1(propName: string, prefix: string, v0: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 2 bound values surrounded by text.
 *
 * Used when the value passed to a property has 2 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate2('title', 'prefix', v0, '-', v1, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate2(propName: string, prefix: string, v0: any, i0: string, v1: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 3 bound values surrounded by text.
 *
 * Used when the value passed to a property has 3 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate3(
 * 'title', 'prefix', v0, '-', v1, '-', v2, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate3(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 4 bound values surrounded by text.
 *
 * Used when the value passed to a property has 4 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate4(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate4(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 5 bound values surrounded by text.
 *
 * Used when the value passed to a property has 5 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate5(
 * 'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate5(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 6 bound values surrounded by text.
 *
 * Used when the value passed to a property has 6 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate6(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate6(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 7 bound values surrounded by text.
 *
 * Used when the value passed to a property has 7 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate7(
 *    'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate7(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 *
 * Update an interpolated property on an element with 8 bound values surrounded by text.
 *
 * Used when the value passed to a property has 8 interpolated values in it:
 *
 * ```html
 * <div title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolate8(
 *  'title', 'prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, 'suffix');
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update
 * @param prefix Static value used for concatenation only.
 * @param v0 Value checked for change.
 * @param i0 Static value used for concatenation only.
 * @param v1 Value checked for change.
 * @param i1 Static value used for concatenation only.
 * @param v2 Value checked for change.
 * @param i2 Static value used for concatenation only.
 * @param v3 Value checked for change.
 * @param i3 Static value used for concatenation only.
 * @param v4 Value checked for change.
 * @param i4 Static value used for concatenation only.
 * @param v5 Value checked for change.
 * @param i5 Static value used for concatenation only.
 * @param v6 Value checked for change.
 * @param i6 Static value used for concatenation only.
 * @param v7 Value checked for change.
 * @param suffix Static value used for concatenation only.
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolate8(propName: string, prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string, sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 * Update an interpolated property on an element with 8 or more bound values surrounded by text.
 *
 * Used when the number of interpolated values exceeds 7.
 *
 * ```html
 * <div
 *  title="prefix{{v0}}-{{v1}}-{{v2}}-{{v3}}-{{v4}}-{{v5}}-{{v6}}-{{v7}}-{{v8}}-{{v9}}suffix"></div>
 * ```
 *
 * Its compiled representation is::
 *
 * ```ts
 * ????propertyInterpolateV(
 *  'title', ['prefix', v0, '-', v1, '-', v2, '-', v3, '-', v4, '-', v5, '-', v6, '-', v7, '-', v9,
 *  'suffix']);
 * ```
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled.
 *
 * @param propName The name of the property to update.
 * @param values The a collection of values and the strings inbetween those values, beginning with a
 * string prefix and ending with a string suffix.
 * (e.g. `['prefix', value0, '-', value1, '-', value2, ..., value99, 'suffix']`)
 * @param sanitizer An optional sanitizer function
 * @returns itself, so that it may be chained.
 * @codeGenApi
 */
export declare function ????propertyInterpolateV(propName: string, values: any[], sanitizer?: SanitizerFn): TsickleIssue1009;

/**
 * This feature resolves the providers of a directive (or component),
 * and publish them into the DI system, making it visible to others for injection.
 *
 * For example:
 * class ComponentWithProviders {
 *   constructor(private greeter: GreeterDE) {}
 *
 *   static ngComponentDef = defineComponent({
 *     type: ComponentWithProviders,
 *     selectors: [['component-with-providers']],
 *    factory: () => new ComponentWithProviders(directiveInject(GreeterDE as any)),
 *    consts: 1,
 *    vars: 1,
 *    template: function(fs: RenderFlags, ctx: ComponentWithProviders) {
 *      if (fs & RenderFlags.Create) {
 *        text(0);
 *      }
 *      if (fs & RenderFlags.Update) {
 *        textBinding(0, bind(ctx.greeter.greet()));
 *      }
 *    },
 *    features: [ProvidersFeature([GreeterDE])]
 *  });
 * }
 *
 * @param definition
 *
 * @codeGenApi
 */
export declare function ????ProvidersFeature<T>(providers: Provider[], viewProviders?: Provider[]): (definition: ??DirectiveDef<T>) => void;


/**
 * Bindings for pure functions are stored after regular bindings.
 *
 * |------consts------|---------vars---------|                 |----- hostVars (dir1) ------|
 * ------------------------------------------------------------------------------------------
 * | nodes/refs/pipes | bindings | fn slots  | injector | dir1 | host bindings | host slots |
 * ------------------------------------------------------------------------------------------
 *                    ^                      ^
 *      TView.bindingStartIndex      TView.expandoStartIndex
 *
 * Pure function instructions are given an offset from the binding root. Adding the offset to the
 * binding root gives the first index where the bindings are stored. In component views, the binding
 * root is the bindingStartIndex. In host bindings, the binding root is the expandoStartIndex +
 * any directive instances + any hostVars in directives evaluated before it.
 *
 * See VIEW_DATA.md for more information about host binding resolution.
 */
/**
 * If the value hasn't been saved, calls the pure function to store and return the
 * value. If it has been saved, returns the saved value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns a value
 * @param thisArg Optional calling context of pureFn
 * @returns value
 *
 * @codeGenApi
 */
export declare function ????pureFunction0<T>(slotOffset: number, pureFn: () => T, thisArg?: any): T;

/**
 * If the value of the provided exp has changed, calls the pure function to return
 * an updated value. Or if the value has not changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn Function that returns an updated value
 * @param exp Updated expression value
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction1(slotOffset: number, pureFn: (v: any) => any, exp: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction2(slotOffset: number, pureFn: (v1: any, v2: any) => any, exp1: any, exp2: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction3(slotOffset: number, pureFn: (v1: any, v2: any, v3: any) => any, exp1: any, exp2: any, exp3: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction4(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction5(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction6(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction7(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, exp7: any, thisArg?: any): any;

/**
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn
 * @param exp1
 * @param exp2
 * @param exp3
 * @param exp4
 * @param exp5
 * @param exp6
 * @param exp7
 * @param exp8
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunction8(slotOffset: number, pureFn: (v1: any, v2: any, v3: any, v4: any, v5: any, v6: any, v7: any, v8: any) => any, exp1: any, exp2: any, exp3: any, exp4: any, exp5: any, exp6: any, exp7: any, exp8: any, thisArg?: any): any;

/**
 * pureFunction instruction that can support any number of bindings.
 *
 * If the value of any provided exp has changed, calls the pure function to return
 * an updated value. Or if no values have changed, returns cached value.
 *
 * @param slotOffset the offset from binding root to the reserved slot
 * @param pureFn A pure function that takes binding values and builds an object or array
 * containing those values.
 * @param exps An array of binding values
 * @param thisArg Optional calling context of pureFn
 * @returns Updated or cached value
 *
 * @codeGenApi
 */
export declare function ????pureFunctionV(slotOffset: number, pureFn: (...v: any[]) => any, exps: any[], thisArg?: any): any;

/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 *
 * @returns `true` if a query got dirty during change detection or if this is a static query
 * resolving in creation mode, `false` otherwise.
 *
 * @codeGenApi
 */
export declare function ????queryRefresh(queryList: QueryList<any>): boolean;

/**
 * Retrieves a local reference from the current contextViewData.
 *
 * If the reference to retrieve is in a parent view, this instruction is used in conjunction
 * with a nextContext() call, which walks up the tree and updates the contextViewData instance.
 *
 * @param index The index of the local ref in contextViewData.
 *
 * @codeGenApi
 */
export declare function ????reference<T>(index: number): T;

/**
 *
 * @codeGenApi
 */
export declare function ????resolveBody(element: RElement & {
    ownerDocument: Document;
}): {
    name: string;
    target: HTMLElement;
};

/**
 *
 * @codeGenApi
 */
export declare function ????resolveDocument(element: RElement & {
    ownerDocument: Document;
}): {
    name: string;
    target: Document;
};

/**
 *
 * @codeGenApi
 */
export declare function ????resolveWindow(element: RElement & {
    ownerDocument: Document;
}): {
    name: string;
    target: Window | null;
};

/**
 * Restores `contextViewData` to the given OpaqueViewState instance.
 *
 * Used in conjunction with the getCurrentView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * @param viewToRestore The OpaqueViewState instance to restore.
 *
 * @codeGenApi
 */
export declare function ????restoreView(viewToRestore: OpaqueViewState): void;

/**
 * An `html` sanitizer which converts untrusted `html` **string** into trusted string by removing
 * dangerous content.
 *
 * This method parses the `html` and locates potentially dangerous content (such as urls and
 * javascript) and removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustHtml}.
 *
 * @param unsafeHtml untrusted `html`, typically from the user.
 * @returns `html` string which is safe to display to user, because all of the dangerous javascript
 * and urls have been removed.
 *
 * @publicApi
 */
export declare function ????sanitizeHtml(unsafeHtml: any): string;

/**
 * A `url` sanitizer which only lets trusted `url`s through.
 *
 * This passes only `url`s marked trusted by calling {@link bypassSanitizationTrustResourceUrl}.
 *
 * @param unsafeResourceUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * only trusted `url`s have been allowed to pass.
 *
 * @publicApi
 */
export declare function ????sanitizeResourceUrl(unsafeResourceUrl: any): string;

/**
 * A `script` sanitizer which only lets trusted javascript through.
 *
 * This passes only `script`s marked trusted by calling {@link
 * bypassSanitizationTrustScript}.
 *
 * @param unsafeScript untrusted `script`, typically from the user.
 * @returns `url` string which is safe to bind to the `<script>` element such as `<img src>`,
 * because only trusted `scripts` have been allowed to pass.
 *
 * @publicApi
 */
export declare function ????sanitizeScript(unsafeScript: any): string;

/**
 * A `style` sanitizer which converts untrusted `style` **string** into trusted string by removing
 * dangerous content.
 *
 * This method parses the `style` and locates potentially dangerous content (such as urls and
 * javascript) and removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustStyle}.
 *
 * @param unsafeStyle untrusted `style`, typically from the user.
 * @returns `style` string which is safe to bind to the `style` properties, because all of the
 * dangerous javascript and urls have been removed.
 *
 * @publicApi
 */
export declare function ????sanitizeStyle(unsafeStyle: any): string;

/**
 * A `url` sanitizer which converts untrusted `url` **string** into trusted string by removing
 * dangerous
 * content.
 *
 * This method parses the `url` and locates potentially dangerous content (such as javascript) and
 * removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustUrl}.
 *
 * @param unsafeUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * all of the dangerous javascript has been removed.
 *
 * @publicApi
 */
export declare function ????sanitizeUrl(unsafeUrl: any): string;

/**
 * Sanitizes URL, selecting sanitizer function based on tag and property names.
 *
 * This function is used in case we can't define security context at compile time, when only prop
 * name is available. This happens when we generate host bindings for Directives/Components. The
 * host element is unknown at compile time, so we defer calculation of specific sanitizer to
 * runtime.
 *
 * @param unsafeUrl untrusted `url`, typically from the user.
 * @param tag target element tag name.
 * @param prop name of the property that contains the value.
 * @returns `url` string which is safe to bind.
 *
 * @publicApi
 */
export declare function ????sanitizeUrlOrResourceUrl(unsafeUrl: any, tag: string, prop: string): any;

/**
 * Selects an element for later binding instructions.
 *
 * Used in conjunction with instructions like {@link property} to act on elements with specified
 * indices, for example those created with {@link element} or {@link elementStart}.
 *
 * ```ts
 * (rf: RenderFlags, ctx: any) => {
 *   if (rf & 1) {
 *     element(0, 'div');
 *   }
 *   if (rf & 2) {
 *     select(0); // Select the <div/> created above.
 *     property('title', 'test');
 *   }
 *  }
 * ```
 * @param index the index of the item to act on with the following instructions
 *
 * @codeGenApi
 */
export declare function ????select(index: number): void;

/**
 * @codeGenApi
 */
export declare function ????setComponentScope(type: ??ComponentType<any>, directives: Type<any>[], pipes: Type<any>[]): void;

/**
 * Adds the module metadata that is necessary to compute the module's transitive scope to an
 * existing module definition.
 *
 * Scope metadata of modules is not used in production builds, so calls to this function can be
 * marked pure to tree-shake it from the bundle, allowing for all referenced declarations
 * to become eligible for tree-shaking as well.
 *
 * @codeGenApi
 */
export declare function ????setNgModuleScope(type: any, scope: {
    /** List of components, directives, and pipes declared by this module. */
    declarations?: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports?: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports?: Type<any>[] | (() => Type<any>[]);
}): void;

/**
 * Registers a QueryList, associated with a static content query, for later refresh
 * (part of a view refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ????staticContentQuery<T>(directiveIndex: number, predicate: Type<any> | string[], descend: boolean, read: any): void;

/**
 * Creates new QueryList for a static view query.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export declare function ????staticViewQuery<T>(predicate: Type<any> | string[], descend: boolean, read: any): void;

/**
 * Creates an LContainer for an ng-template (dynamically-inserted view), e.g.
 *
 * <ng-template #foo>
 *    <div></div>
 * </ng-template>
 *
 * @param index The index of the container in the data array
 * @param templateFn Inline template
 * @param consts The number of nodes, local refs, and pipes for this template
 * @param vars The number of bindings for this template
 * @param tagName The name of the container element, if applicable
 * @param attrs The attrs attached to the container, if applicable
 * @param localRefs A set of local reference bindings on the element.
 * @param localRefExtractor A function which extracts local-refs values from the template.
 *        Defaults to the current element associated with the local-ref.
 *
 * @codeGenApi
 */
export declare function ????template(index: number, templateFn: ComponentTemplate<any> | null, consts: number, vars: number, tagName?: string | null, attrs?: TAttributes | null, localRefs?: string[] | null, localRefExtractor?: LocalRefExtractor): void;

/**
 * Retrieves `TemplateRef` instance from `Injector` when a local reference is placed on the
 * `<ng-template>` element.
 *
 * @codeGenApi
 */
export declare function ????templateRefExtractor(tNode: TNode, currentView: ??angular_packages_core_core_bm): TemplateRef<{}> | null;

/**
 * Create static text node
 *
 * @param index Index of the node in the data array
 * @param value Value to write. This value will be stringified.
 *
 * @codeGenApi
 */
export declare function ????text(index: number, value?: any): void;

/**
 * Create text node with binding
 * Bindings should be handled externally with the proper interpolation(1-8) method
 *
 * @param index Index of the node in the data array.
 * @param value Stringified value to write.
 *
 * @codeGenApi
 */
export declare function ????textBinding<T>(index: number, value: T | ??NO_CHANGE): void;

/**
 * Creates new QueryList, stores the reference in LView and returns QueryList.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ????viewQuery<T>(predicate: Type<any> | string[], descend: boolean, read: any): QueryList<T>;

export { }
