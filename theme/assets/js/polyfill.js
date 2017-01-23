/** Polyfill for Object.keys()
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Polyfill */

if (!Object.keys) {
  console.log('Polyfill for Object.keys() is activated.')
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

/** Optional (short version)
if (!Object.keys) {
  Object.keys = function(o) {
    var p, k = [];
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        k.push(p);
      }
      return k;
    };
  }
*/

/** Polyfill for Object.assign()
    https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
if (typeof Object.assign != 'function') {
  console.log('Polyfill for Object.assign() is activated.')
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

/** Polyfill for window.localStorage
    https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage */
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}

/** Polyfill for document.ready -- support cross browser
  How to use:
    document.ready(function(){
        alert('It works!');
    });
  http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery */

if (typeof document.ready != 'function') {
  document.ready = (function(){
      var readyList,
          DOMContentLoaded,
          class2type = {};
          class2type["[object Boolean]"] = "boolean";
          class2type["[object Number]"] = "number";
          class2type["[object String]"] = "string";
          class2type["[object Function]"] = "function";
          class2type["[object Array]"] = "array";
          class2type["[object Date]"] = "date";
          class2type["[object RegExp]"] = "regexp";
          class2type["[object Object]"] = "object";

      var ReadyObj = {
          // Is the DOM ready to be used? Set to true once it occurs.
          isReady: false,
          // A counter to track how many items to wait for before
          // the ready event fires. See #6781
          readyWait: 1,
          // Hold (or release) the ready event
          holdReady: function( hold ) {
              if ( hold ) {
                  ReadyObj.readyWait++;
              } else {
                  ReadyObj.ready( true );
              }
          },
          // Handle when the DOM is ready
          ready: function( wait ) {
              // Either a released hold or an DOMready/load event and not yet ready
              if ( (wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady) ) {
                  // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                  if ( !document.body ) {
                      return setTimeout( ReadyObj.ready, 1 );
                  }

                  // Remember that the DOM is ready
                  ReadyObj.isReady = true;
                  // If a normal DOM Ready event fired, decrement, and wait if need be
                  if ( wait !== true && --ReadyObj.readyWait > 0 ) {
                      return;
                  }
                  // If there are functions bound, to execute
                  readyList.resolveWith( document, [ ReadyObj ] );

                  // Trigger any bound ready events
                  //if ( ReadyObj.fn.trigger ) {
                  //    ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                  //}
              }
          },
          bindReady: function() {
              if ( readyList ) {
                  return;
              }
              readyList = ReadyObj._Deferred();

              // Catch cases where $(document).ready() is called after the
              // browser event has already occurred.
              if ( document.readyState === "complete" ) {
                  // Handle it asynchronously to allow scripts the opportunity to delay ready
                  return setTimeout( ReadyObj.ready, 1 );
              }

              // Mozilla, Opera and webkit nightlies currently support this event
              if ( document.addEventListener ) {
                  // Use the handy event callback
                  document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                  // A fallback to window.onload, that will always work
                  window.addEventListener( "load", ReadyObj.ready, false );

              // If IE event model is used
              } else if ( document.attachEvent ) {
                  // ensure firing before onload,
                  // maybe late but safe also for iframes
                  document.attachEvent( "onreadystatechange", DOMContentLoaded );

                  // A fallback to window.onload, that will always work
                  window.attachEvent( "onload", ReadyObj.ready );

                  // If IE and not a frame
                  // continually check to see if the document is ready
                  var toplevel = false;

                  try {
                      toplevel = window.frameElement == null;
                  } catch(e) {}

                  if ( document.documentElement.doScroll && toplevel ) {
                      doScrollCheck();
                  }
              }
          },
          _Deferred: function() {
              var // callbacks list
                  callbacks = [],
                  // stored [ context , args ]
                  fired,
                  // to avoid firing when already doing so
                  firing,
                  // flag to know if the deferred has been cancelled
                  cancelled,
                  // the deferred itself
                  deferred  = {

                      // done( f1, f2, ...)
                      done: function() {
                          if ( !cancelled ) {
                              var args = arguments,
                                  i,
                                  length,
                                  elem,
                                  type,
                                  _fired;
                              if ( fired ) {
                                  _fired = fired;
                                  fired = 0;
                              }
                              for ( i = 0, length = args.length; i < length; i++ ) {
                                  elem = args[ i ];
                                  type = ReadyObj.type( elem );
                                  if ( type === "array" ) {
                                      deferred.done.apply( deferred, elem );
                                  } else if ( type === "function" ) {
                                      callbacks.push( elem );
                                  }
                              }
                              if ( _fired ) {
                                  deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
                              }
                          }
                          return this;
                      },

                      // resolve with given context and args
                      resolveWith: function( context, args ) {
                          if ( !cancelled && !fired && !firing ) {
                              // make sure args are available (#8421)
                              args = args || [];
                              firing = 1;
                              try {
                                  while( callbacks[ 0 ] ) {
                                      callbacks.shift().apply( context, args );//shifts a callback, and applies it to document
                                  }
                              }
                              finally {
                                  fired = [ context, args ];
                                  firing = 0;
                              }
                          }
                          return this;
                      },

                      // resolve with this as context and given arguments
                      resolve: function() {
                          deferred.resolveWith( this, arguments );
                          return this;
                      },

                      // Has this deferred been resolved?
                      isResolved: function() {
                          return !!( firing || fired );
                      },

                      // Cancel
                      cancel: function() {
                          cancelled = 1;
                          callbacks = [];
                          return this;
                      }
                  };

              return deferred;
          },
          type: function( obj ) {
              return obj == null ?
                  String( obj ) :
                  class2type[ Object.prototype.toString.call(obj) ] || "object";
          }
      }
      // The DOM ready check for Internet Explorer
      function doScrollCheck() {
          if ( ReadyObj.isReady ) {
              return;
          }

          try {
              // If IE is used, use the trick by Diego Perini
              // http://javascript.nwbox.com/IEContentLoaded/
              document.documentElement.doScroll("left");
          } catch(e) {
              setTimeout( doScrollCheck, 1 );
              return;
          }

          // and execute any waiting functions
          ReadyObj.ready();
      }
      // Cleanup functions for the document ready method
      if ( document.addEventListener ) {
          DOMContentLoaded = function() {
              document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
              ReadyObj.ready();
          };

      } else if ( document.attachEvent ) {
          DOMContentLoaded = function() {
              // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
              if ( document.readyState === "complete" ) {
                  document.detachEvent( "onreadystatechange", DOMContentLoaded );
                  ReadyObj.ready();
              }
          };
      }
      function ready( fn ) {
          // Attach the listeners
          ReadyObj.bindReady();

          var type = ReadyObj.type( fn );

          // Add the callback
          readyList.done( fn );//readyList is result of _Deferred()
      }
      return ready;
  })();
}
