/*!
 * kd-ip-input v1.0.0
 * (c) 2022 Darren Lu
 * @license ISC
 */
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var FunctionPrototype$1 = Function.prototype;
var bind$3 = FunctionPrototype$1.bind;
var call$5 = FunctionPrototype$1.call;
var uncurryThis$7 = bind$3 && bind$3.bind(call$5, call$5);

var functionUncurryThis = bind$3 ? function (fn) {
  return fn && uncurryThis$7(fn);
} : function (fn) {
  return fn && function () {
    return call$5.apply(fn, arguments);
  };
};

var uncurryThis$6 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$6({}.isPrototypeOf);

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$k =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var bind$2 = FunctionPrototype.bind;
var call$4 = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$2 ? call$4.bind(apply$1) : function () {
  return call$4.apply(apply$1, arguments);
});

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$7 = function (argument) {
  return typeof argument == 'function';
};

var objectGetOwnPropertyDescriptor = {};

var fails$7 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$6 = fails$7;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$6(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var call$3 = Function.prototype.call;

var functionCall = call$3.bind ? call$3.bind(call$3) : function () {
  return call$3.apply(call$3, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var uncurryThis$5 = functionUncurryThis;

var toString$1 = uncurryThis$5({}.toString);
var stringSlice = uncurryThis$5(''.slice);

var classofRaw = function (it) {
  return stringSlice(toString$1(it), 8, -1);
};

var global$j = global$k;
var uncurryThis$4 = functionUncurryThis;
var fails$5 = fails$7;
var classof$1 = classofRaw;

var Object$3 = global$j.Object;
var split = uncurryThis$4(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$3('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$1(it) == 'String' ? split(it, '') : Object$3(it);
} : Object$3;

var global$i = global$k;

var TypeError$6 = global$i.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$6("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$1 = function (it) {
  return IndexedObject$1(requireObjectCoercible$1(it));
};

var isCallable$6 = isCallable$7;

var isObject$4 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$6(it);
};

var path$3 = {};

var path$2 = path$3;
var global$h = global$k;
var isCallable$5 = isCallable$7;

var aFunction = function (variable) {
  return isCallable$5(variable) ? variable : undefined;
};

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path$2[namespace]) || aFunction(global$h[namespace])
    : path$2[namespace] && path$2[namespace][method] || global$h[namespace] && global$h[namespace][method];
};

var getBuiltIn$1 = getBuiltIn$2;

var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

var global$g = global$k;
var userAgent = engineUserAgent;

var process = global$g.process;
var Deno = global$g.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$4 = fails$7;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$4(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$f = global$k;
var getBuiltIn = getBuiltIn$2;
var isCallable$4 = isCallable$7;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$2 = global$f.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable$4($Symbol) && isPrototypeOf($Symbol.prototype, Object$2(it));
};

var global$e = global$k;

var String$2 = global$e.String;

var tryToString$1 = function (argument) {
  try {
    return String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$d = global$k;
var isCallable$3 = isCallable$7;
var tryToString = tryToString$1;

var TypeError$5 = global$d.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$3 = function (argument) {
  if (isCallable$3(argument)) return argument;
  throw TypeError$5(tryToString(argument) + ' is not a function');
};

var aCallable$2 = aCallable$3;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$2(func);
};

var global$c = global$k;
var call$2 = functionCall;
var isCallable$2 = isCallable$7;
var isObject$3 = isObject$4;

var TypeError$4 = global$c.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$2(fn = input.toString) && !isObject$3(val = call$2(fn, input))) return val;
  if (isCallable$2(fn = input.valueOf) && !isObject$3(val = call$2(fn, input))) return val;
  if (pref !== 'string' && isCallable$2(fn = input.toString) && !isObject$3(val = call$2(fn, input))) return val;
  throw TypeError$4("Can't convert object to primitive value");
};

var shared$1 = {exports: {}};

var global$b = global$k;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var setGlobal$1 = function (key, value) {
  try {
    defineProperty(global$b, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$b[key] = value;
  } return value;
};

var global$a = global$k;
var setGlobal = setGlobal$1;

var SHARED = '__core-js_shared__';
var store$1 = global$a[SHARED] || setGlobal(SHARED, {});

var sharedStore = store$1;

var store = sharedStore;

(shared$1.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.2',
  mode: 'pure' ,
  copyright: '© 2022 Denis Pushkarev (zloirock.ru)'
});

var global$9 = global$k;
var requireObjectCoercible = requireObjectCoercible$2;

var Object$1 = global$9.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$2 = function (argument) {
  return Object$1(requireObjectCoercible(argument));
};

var uncurryThis$3 = functionUncurryThis;
var toObject$1 = toObject$2;

var hasOwnProperty = uncurryThis$3({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};

var uncurryThis$2 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString = uncurryThis$2(1.0.toString);

var uid$1 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

var global$8 = global$k;
var shared = shared$1.exports;
var hasOwn$2 = hasOwnProperty_1;
var uid = uid$1;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global$8.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol$1 = function (name) {
  if (!hasOwn$2(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$2(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var global$7 = global$k;
var call$1 = functionCall;
var isObject$2 = isObject$4;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol = wellKnownSymbol$1;

var TypeError$3 = global$7.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$2(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$2(result) || isSymbol$1(result)) return result;
    throw TypeError$3("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$6 = global$k;
var isObject$1 = isObject$4;

var document$1 = global$6.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$1(document$1) && isObject$1(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$4 = descriptors;
var fails$3 = fails$7;
var createElement = documentCreateElement;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$4 && !fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$3 = descriptors;
var call = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject = toIndexedObject$1;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$1 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$1(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

var fails$2 = fails$7;
var isCallable$1 = isCallable$7;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$1(detection) ? fails$2(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var uncurryThis$1 = functionUncurryThis;
var aCallable$1 = aCallable$3;

var bind$1 = uncurryThis$1(uncurryThis$1.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var objectDefineProperty = {};

var DESCRIPTORS$2 = descriptors;
var fails$1 = fails$7;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$2 && fails$1(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var global$5 = global$k;
var isObject = isObject$4;

var String$1 = global$5.String;
var TypeError$2 = global$5.TypeError;

// `Assert: Type(argument) is Object`
var anObject$1 = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError$2(String$1(argument) + ' is not an object');
};

var global$4 = global$k;
var DESCRIPTORS$1 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject = anObject$1;
var toPropertyKey = toPropertyKey$2;

var TypeError$1 = global$4.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$1 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$1('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;

var createNonEnumerableProperty$1 = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var global$3 = global$k;
var apply = functionApply;
var uncurryThis = functionUncurryThis;
var isCallable = isCallable$7;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var isForced = isForced_1;
var path$1 = path$3;
var bind = functionBindContext;
var createNonEnumerableProperty = createNonEnumerableProperty$1;
var hasOwn = hasOwnProperty_1;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global$3 : STATIC ? global$3[TARGET] : (global$3[TARGET] || {}).prototype;

  var target = GLOBAL ? path$1 : path$1[TARGET] || createNonEnumerableProperty(path$1, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global$3);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path$1, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path$1, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path$1[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$1 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity = toIntegerOrInfinity$1;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$1 = function (obj) {
  return toLength(obj.length);
};

var global$2 = global$k;
var aCallable = aCallable$3;
var toObject = toObject$2;
var IndexedObject = indexedObject;
var lengthOfArrayLike = lengthOfArrayLike$1;

var TypeError = global$2.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var fails = fails$7;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var classof = classofRaw;
var global$1 = global$k;

var engineIsNode = classof(global$1.process) == 'process';

var $ = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

var path = path$3;

var entryVirtual$1 = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var entryVirtual = entryVirtual$1;

entryVirtual('Array').reduce;

/**
 * @description: 获取input光标位置
 * @param {*} el input node
 * @return {*} 
 */
function getCursorPosition(el) {
  var cuRange;
  var tbRange;
  var headRange;
  var range;
  var dupRange;
  var ret = {};

  if (el.setSelectionRange) {
    // standard
    ret.begin = el.selectionStart;
    ret.end = el.selectionEnd;
    ret.result = el.value.substring(ret.begin, ret.end);
  } else if (document.selection) {
    // ie
    if (el.tagName.toLowerCase() === 'input') {
      cuRange = document.selection.createRange();
      tbRange = el.createTextRange();
      tbRange.collapse(true);
      tbRange.select();
      headRange = document.selection.createRange();
      headRange.setEndPoint('EndToEnd', cuRange);
      ret.begin = headRange.text.length - cuRange.text.length;
      ret.end = headRange.text.length;
      ret.result = cuRange.text;
      cuRange.select();
    } else if (el.tagName.toLowerCase() === 'textarea') {
      range = document.selection.createRange();
      dupRange = range.duplicate();
      dupRange.moveToElementText(el);
      dupRange.setEndPoint('EndToEnd', range);
      ret.begin = dupRange.text.length - range.text.length;
      ret.end = dupRange.text.length;
      ret.result = range.text;
    }
  }

  el.focus();
  return ret;
}

//

var script = {
  name: 'kd-ip-input',
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    prefix: {
      // 可选http|https|wss|ws
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['http', 'https', 'wss', 'ws'].indexOf(value) !== -1;
      },
    },
    showPrefix: {
      // 是否输出url，需同时设置prefix
      type: Boolean,
      default: false,
    },
    showPort: {
      // 是否开启端口
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ipList: this.showPort ? ['', '', '', '', ''] : ['', '', '', ''],
    };
  },
  computed: {
    liWidth() {
      return this.showPort ? '20%' : '25%';
    },
  },
  watch: {
    value(newVal) {
      this.init(newVal);
    },
    ipList(newVal) {
      if (newVal.every((segment) => segment === '')) {
        this.$emit('input', '');
        return;
      }
      let ip;
      const tempList = newVal.slice(0, 4);
      // 添加前缀
      ip =
        this.showPrefix && this.prefix
          ? this.prefix + '://' + tempList.join('.')
          : tempList.join('.');
      // 添加端口
      ip = this.showPort ? ip + ':' + newVal[4] : ip;
      this.$emit('input', ip);
    },
  },
  filters: {
    /* istanbul ignore next */
    prefixFormat(val) {
      if (val.indexOf('://') === -1) return val + '://';
      return val;
    },
  },
  mounted() {
    this.init(this.value);
  },
  methods: {
    // 回显ip
    init(ip) {
      if (!ip) {
        this.ipList = this.showPort ? ['', '', '', '', ''] : ['', '', '', ''];
        return;
      }
      // 校验格式
      if (ip.split('.').length !== 4) {
        console.error('[kd-ip-input]：ip格式不合法');
        return;
      }

      // 带前缀，分离前缀
      if (this.showPrefix) {
        if (!this.prefix) {
          console.error('[kd-ip-input]：showPrefix模式需指定prefix');
          return;
        }
        if (ip.indexOf(this.prefix) !== -1) {
          ip = ip
            .split(/(http|https|wss|ws):\/\//)
            .slice(-1)[0]
            .trim();
        }
      }
      // 带端口，分离端口
      if (this.showPort) {
        if (ip.indexOf(':') !== -1) {
          const port = ip.split(':')[1].trim();
          this.ipList[4] = port;
          ip = ip.split(':')[0].trim();
        } else {
          console.error('[kd-ip-input]：invalid ip with port(missing colon)');
          return;
        }
      }

      const tempList = ip.split('.');
      for (let i = 0, length = tempList.length; i < length; i++) {
        const segment = tempList[i].trim();
        if (isNaN(segment) || segment < 0 || segment > 255) {
          console.info(
            '%c[kd-ip-input]：输入ip范围不合法，已默认恢复至0',
            'color: red'
          );
          this.ipList.splice(i, 1, '0');
          // break;
        } else {
          this.ipList.splice(i, 1, segment);
        }
      }
    },
    genIp() {
      const ipList = this.ipList;
      let ip;
      if (ipList.every((segment) => segment !== '')) {
        const tempList = ipList.slice(0, 4);
        // 添加前缀
        ip =
          this.showPrefix && this.prefix
            ? this.prefix + '://' + tempList.join('.')
            : tempList.join('.');
        // 添加端口
        ip = this.showPort ? ip + ':' + ipList[4] : ip;
      } else {
        ip = '';
      }
      return ip;
    },
    handleInput(e, index) {
      let value = e.target.value;
      //当输入的是空格时，值赋为空
      value = value.trim();
      const segment = parseInt(value, 10);
      if (isNaN(segment)) {
        value = '';
      } else {
        // ip范围 0-255
        if (index <= 3) {
          value = segment > 255 ? '255' : '' + segment;
        } else {
          // 端口范围 0-65535
          value = segment > 65535 ? '65535' : '' + segment;
        }
      }
      this.$set(this.ipList, index, value);
      // 满三位向右跳转
      if (
        (!this.showPort && value.length === 3 && index < 3) ||
        (this.showPort && value.length === 3 && index < 4)
      ) {
        this.$refs.ipInput[index + 1].focus();
      }
    },
    handleKeyDown(e, index) {
      const keyCode = e.keyCode,
        value = e.target.value;
      // 8-删除键，37-左方向键
      // 当前input值为空或者光标在最左边，光标向左边input跳转
      if (keyCode === 8 || keyCode === 37) {
        if (
          (value.length === 0 || getCursorPosition(e.target).end === 0) &&
          index > 0
        ) {
          this.$refs.ipInput[index - 1].focus();
        }
      }
      // 39-右方向键
      // 光标在最右边，光标向右边input跳转
      if (keyCode === 39) {
        if (
          getCursorPosition(e.target).end === value.length &&
          ((!this.showPort && index < 3) || (this.showPort && index < 4))
        ) {
          this.$refs.ipInput[index + 1].focus();
        }
      }
      // 32-空格，13-回车 向右跳转
      if (
        (keyCode === 32 || keyCode === 13) &&
        ((!this.showPort && index < 3) || (this.showPort && index < 4))
      ) {
        this.$refs.ipInput[index + 1].focus();
      }
    },
    handleBlur() {
      // nextTick等待焦点跳到下一个input
      this.$nextTick(() => {
        // 整体blur
        const activeClassName = document.activeElement.className;
        if (activeClassName.indexOf('kd-ip-input-group__input-inner') === -1) {
          // 输入其中任意位，其他位补0
          if (this.ipList.some((segment) => segment || segment === '0')) {
            this.ipList.forEach((item, index) => {
              if (item === '') {
                this.$set(this.ipList, index, '0');
              }
            });
          }
          const ip = this.genIp();
          this.$emit('blur', ip);
        }
      });
    },
  },
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@charset \"UTF-8\";\n.is-disabled[data-v-67bac5c6] {\n  background-color: #f5f7fa !important;\n  border-color: #e4e7ed !important;\n  cursor: not-allowed;\n}\n.is-disabled-input[data-v-67bac5c6] {\n  cursor: not-allowed;\n  color: #c0c4cc !important;\n}\n.kd-ip-input-group[data-v-67bac5c6] {\n  line-height: normal;\n  display: inline-table;\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  position: relative;\n  font-size: 14px;\n}\n.kd-ip-input-group .kd-ip-input-group__prepend[data-v-67bac5c6] {\n  background-color: #f5f7fa;\n  color: #909399;\n  vertical-align: middle;\n  display: table-cell;\n  position: relative;\n  border: 1px solid #dcdfe6;\n  border-radius: 4px;\n  border-right: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  padding: 0 20px;\n  width: 1px;\n  white-space: nowrap;\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul[data-v-67bac5c6] {\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #dcdfe6;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  font-size: inherit;\n  outline: none;\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-li[data-v-67bac5c6] {\n  height: 32px;\n  line-height: 32px;\n  list-style: none;\n  position: relative;\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-li .kd-ip-input-group__dot[data-v-67bac5c6] {\n  width: 5px;\n  height: 5px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 0;\n  border-radius: 50%;\n  background: #dcdfe6;\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-li .kd-ip-input-group__colon[data-v-67bac5c6] {\n  width: 5px;\n  height: 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-content: center;\n  position: absolute;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-li .kd-ip-input-group__colon .dot[data-v-67bac5c6] {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: #dcdfe6;\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-inner[data-v-67bac5c6] {\n  width: 100%;\n  height: 32px;\n  border: none;\n  color: #606266;\n  text-align: center;\n  background: transparent;\n}\n.kd-ip-input-group .kd-ip-input-group__input-ul .kd-ip-input-group__input-inner[data-v-67bac5c6]:focus {\n  outline: none;\n  /*取消掉默认的input focus状态*/\n}";
styleInject(css_248z);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "kd-ip-input-group" }, [
    _vm.showPrefix
      ? _c("div", { staticClass: "kd-ip-input-group__prepend" }, [
          _vm._v(_vm._s(_vm._f("prefixFormat")(_vm.prefix))),
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "kd-ip-input-group__input-ul" },
      _vm._l(_vm.ipList, function (segment, index) {
        return _c(
          "li",
          {
            key: index,
            staticClass: "kd-ip-input-group__input-li",
            class: { "is-disabled": _vm.disabled },
            style: { width: _vm.liWidth },
          },
          [
            _c("input", {
              ref: "ipInput",
              refInFor: true,
              staticClass: "kd-ip-input-group__input-inner",
              class: { "is-disabled-input": _vm.disabled },
              attrs: {
                placeholder: "",
                autocomplete: "off",
                disabled: _vm.disabled,
              },
              domProps: { value: segment },
              on: {
                input: function ($event) {
                  return _vm.handleInput($event, index)
                },
                keydown: function ($event) {
                  return _vm.handleKeyDown($event, index)
                },
                blur: function ($event) {
                  return _vm.handleBlur($event, index)
                },
              },
            }),
            _vm._v(" "),
            index < 3
              ? _c("div", { staticClass: "kd-ip-input-group__dot" })
              : _vm._e(),
            _vm._v(" "),
            _vm.ipList.length === 5 && index === 4
              ? _c("div", { staticClass: "kd-ip-input-group__colon" }, [
                  _c("div", { staticClass: "dot" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "dot" }),
                ])
              : _vm._e(),
          ]
        )
      }),
      0
    ),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-67bac5c6";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var install = function install(Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
}; // 自动注册组件


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install as default };
//# sourceMappingURL=kd-ip-input.esm.js.map
