(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "1741":
/***/ (function(module, exports) {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ "6962":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "WithTooltipPure", function() { return /* binding */ WithTooltip_WithTooltipPure; });
__webpack_require__.d(__webpack_exports__, "WithToolTipState", function() { return /* binding */ WithTooltip_WithToolTipState; });
__webpack_require__.d(__webpack_exports__, "WithTooltip", function() { return /* binding */ WithTooltip_WithToolTipState; });

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("33ef");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.object.freeze.js
var es_object_freeze = __webpack_require__("c87f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("f8a5");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("d6de");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("2007");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("8d0f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("ef1f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("68b8");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("9531");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("918c");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("868d");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("8423");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("f3b8");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("fa8c");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react/index.js
var react = __webpack_require__("1119");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@storybook/theming/dist/esm/index.js
var esm = __webpack_require__("3ca7");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/global/window.js
var global_window = __webpack_require__("3723");
var window_default = /*#__PURE__*/__webpack_require__.n(global_window);

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__("fb03");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("7316");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__("0457");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-dom/index.js
var react_dom = __webpack_require__("ee799");

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper/lib/esm/Manager.js

var ManagerReferenceNodeContext = react["createContext"]();
var ManagerReferenceNodeSetterContext = react["createContext"]();
function Manager(_ref) {
  var children = _ref.children;

  var _React$useState = react["useState"](null),
      referenceNode = _React$useState[0],
      setReferenceNode = _React$useState[1];

  var hasUnmounted = react["useRef"](false);
  react["useEffect"](function () {
    return function () {
      hasUnmounted.current = true;
    };
  }, []);
  var handleSetReferenceNode = react["useCallback"](function (node) {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);
  return /*#__PURE__*/react["createElement"](ManagerReferenceNodeContext.Provider, {
    value: referenceNode
  }, /*#__PURE__*/react["createElement"](ManagerReferenceNodeSetterContext.Provider, {
    value: handleSetReferenceNode
  }, children));
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper/lib/esm/utils.js


/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === 'function') {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};
/**
 * Simple ponyfill for Object.fromEntries
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
        value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? react["useLayoutEffect"] : react["useEffect"];
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js


function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}


// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js


function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js




function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js







function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/enums.js
var enums = __webpack_require__("4697");

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/orderModifiers.js
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return enums["g" /* modifierPhases */].reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/createPopper.js














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper_createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules


// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var eventListeners = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getBasePlacement.js

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/computeOffsets.js




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case enums["m" /* top */]:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case enums["c" /* bottom */]:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case enums["k" /* right */]:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case enums["f" /* left */]:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case enums["l" /* start */]:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case enums["e" /* end */]:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js


function popperOffsets_popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_popperOffsets = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets_popperOffsets,
  data: {}
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/computeStyles.js







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = enums["f" /* left */];
  var sideY = enums["m" /* top */];
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === enums["m" /* top */] || (placement === enums["f" /* left */] || placement === enums["k" /* right */]) && variation === enums["e" /* end */]) {
      sideY = enums["c" /* bottom */];
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === enums["f" /* left */] || (placement === enums["m" /* top */] || placement === enums["c" /* bottom */]) && variation === enums["e" /* end */]) {
      sideX = enums["k" /* right */];
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_computeStyles = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/applyStyles.js

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function applyStyles_effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_applyStyles = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: applyStyles_effect,
  requires: ['computeStyles']
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/offset.js

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [enums["f" /* left */], enums["m" /* top */]].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [enums["f" /* left */], enums["k" /* right */]].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset_offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = enums["h" /* placements */].reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_offset = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset_offset
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var getOppositeVariationPlacement_hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return getOppositeVariationPlacement_hash[matched];
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js



function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/contains.js

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js















function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === enums["o" /* viewport */] ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/detectOverflow.js








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? enums["d" /* clippingParents */] : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? enums["o" /* viewport */] : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? enums["i" /* popper */] : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, enums["b" /* basePlacements */]));
  var altContext = elementContext === enums["i" /* popper */] ? enums["j" /* reference */] : enums["i" /* popper */];
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === enums["i" /* popper */] ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === enums["i" /* popper */] && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [enums["k" /* right */], enums["c" /* bottom */]].indexOf(key) >= 0 ? 1 : -1;
      var axis = [enums["m" /* top */], enums["c" /* bottom */]].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums["h" /* placements */] : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? enums["n" /* variationPlacements */] : enums["n" /* variationPlacements */].filter(function (placement) {
    return getVariation(placement) === variation;
  }) : enums["b" /* basePlacements */];
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (false) {}
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/flip.js






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === enums["a" /* auto */]) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === enums["a" /* auto */] ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === enums["l" /* start */];
    var isVertical = [enums["m" /* top */], enums["c" /* bottom */]].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? enums["k" /* right */] : enums["f" /* left */] : isStartVariation ? enums["c" /* bottom */] : enums["m" /* top */];

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_flip = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? enums["m" /* top */] : enums["f" /* left */];
    var altSide = mainAxis === 'y' ? enums["c" /* bottom */] : enums["k" /* right */];
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === enums["l" /* start */] ? referenceRect[len] : popperRect[len];
    var maxLen = variation === enums["l" /* start */] ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? enums["m" /* top */] : enums["f" /* left */];

    var _altSide = mainAxis === 'x' ? enums["c" /* bottom */] : enums["k" /* right */];

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [enums["m" /* top */], enums["f" /* left */]].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_preventOverflow = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/arrow.js









 // eslint-disable-next-line import/no-unused-modules

var arrow_toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, enums["b" /* basePlacements */]));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [enums["f" /* left */], enums["k" /* right */]].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = arrow_toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? enums["m" /* top */] : enums["f" /* left */];
  var maxProp = axis === 'y' ? enums["c" /* bottom */] : enums["k" /* right */];
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function arrow_effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (false) {}

  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {}

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_arrow = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: arrow_effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/modifiers/hide.js



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [enums["m" /* top */], enums["k" /* right */], enums["c" /* bottom */], enums["f" /* left */]].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ var modifiers_hide = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@popperjs/core/lib/popper.js










var popper_defaultModifiers = [eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide];
var popper_createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: popper_defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules


// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-fast-compare/index.js
var react_fast_compare = __webpack_require__("1741");
var react_fast_compare_default = /*#__PURE__*/__webpack_require__.n(react_fast_compare);

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper/lib/esm/usePopper.js





var EMPTY_MODIFIERS = [];
var usePopper_usePopper = function usePopper(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }

  var prevOptions = react["useRef"](null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || 'bottom',
    strategy: options.strategy || 'absolute',
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };

  var _React$useState = react["useState"]({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var updateStateModifier = react["useMemo"](function () {
    return {
      name: 'updateState',
      enabled: true,
      phase: 'write',
      fn: function fn(_ref) {
        var state = _ref.state;
        var elements = Object.keys(state.elements);
        react_dom["flushSync"](function () {
          setState({
            styles: fromEntries(elements.map(function (element) {
              return [element, state.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function (element) {
              return [element, state.attributes[element]];
            }))
          });
        });
      },
      requires: ['computeStyles']
    };
  }, []);
  var popperOptions = react["useMemo"](function () {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: 'applyStyles',
        enabled: false
      }])
    };

    if (react_fast_compare_default()(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = react["useRef"]();
  useIsomorphicLayoutEffect(function () {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function () {
    if (referenceElement == null || popperElement == null) {
      return;
    }

    var createPopper = options.createPopper || popper_createPopper;
    var popperInstance = createPopper(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function () {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper/lib/esm/Popper.js





var NOOP = function NOOP() {
  return void 0;
};

var NOOP_PROMISE = function NOOP_PROMISE() {
  return Promise.resolve(null);
};

var Popper_EMPTY_MODIFIERS = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === void 0 ? 'absolute' : _ref$strategy,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? Popper_EMPTY_MODIFIERS : _ref$modifiers,
      referenceElement = _ref.referenceElement,
      onFirstUpdate = _ref.onFirstUpdate,
      innerRef = _ref.innerRef,
      children = _ref.children;
  var referenceNode = react["useContext"](ManagerReferenceNodeContext);

  var _React$useState = react["useState"](null),
      popperElement = _React$useState[0],
      setPopperElement = _React$useState[1];

  var _React$useState2 = react["useState"](null),
      arrowElement = _React$useState2[0],
      setArrowElement = _React$useState2[1];

  react["useEffect"](function () {
    setRef(innerRef, popperElement);
  }, [innerRef, popperElement]);
  var options = react["useMemo"](function () {
    return {
      placement: placement,
      strategy: strategy,
      onFirstUpdate: onFirstUpdate,
      modifiers: [].concat(modifiers, [{
        name: 'arrow',
        enabled: arrowElement != null,
        options: {
          element: arrowElement
        }
      }])
    };
  }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);

  var _usePopper = usePopper_usePopper(referenceElement || referenceNode, popperElement, options),
      state = _usePopper.state,
      styles = _usePopper.styles,
      forceUpdate = _usePopper.forceUpdate,
      update = _usePopper.update;

  var childrenProps = react["useMemo"](function () {
    return {
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE
    };
  }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
  return unwrapArray(children)(childrenProps);
}
// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/warning/warning.js
var warning = __webpack_require__("9446");
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper/lib/esm/Reference.js




function Reference(_ref) {
  var children = _ref.children,
      innerRef = _ref.innerRef;
  var setReferenceNode = react["useContext"](ManagerReferenceNodeSetterContext);
  var refHandler = react["useCallback"](function (node) {
    setRef(innerRef, node);
    safeInvoke(setReferenceNode, node);
  }, [innerRef, setReferenceNode]); // ran on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps

  react["useEffect"](function () {
    return function () {
      return setRef(innerRef, null);
    };
  }, []);
  react["useEffect"](function () {
    warning_default()(Boolean(setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
  }, [setReferenceNode]);
  return unwrapArray(children)({
    ref: refHandler
  });
}
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/react-popper-tooltip/dist/esm/react-popper-tooltip.js







var TooltipContext = /*#__PURE__*/react_default.a.createContext({}); // eslint-disable-next-line @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var callAll = function callAll() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.forEach(function (fn) {
      return fn && fn.apply(void 0, args);
    });
  };
};
var noop = function noop() {// do nothing
};
var canUseDOM = function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
var react_popper_tooltip_setRef = function setRef(ref, node) {
  if (typeof ref === 'function') {
    return ref(node);
  } else if (ref != null) {
    ref.current = node;
  }
};

var react_popper_tooltip_Tooltip = /*#__PURE__*/function (_Component) {
  Object(inheritsLoose["a" /* default */])(Tooltip, _Component);

  function Tooltip() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.observer = void 0;
    _this.tooltipRef = void 0;

    _this.handleOutsideClick = function (event) {
      if (_this.tooltipRef && !_this.tooltipRef.contains(event.target)) {
        var parentOutsideClickHandler = _this.context.parentOutsideClickHandler;
        var _this$props = _this.props,
            hideTooltip = _this$props.hideTooltip,
            clearScheduled = _this$props.clearScheduled;
        clearScheduled();
        hideTooltip();

        if (parentOutsideClickHandler) {
          parentOutsideClickHandler(event);
        }
      }
    };

    _this.handleOutsideRightClick = function (event) {
      if (_this.tooltipRef && !_this.tooltipRef.contains(event.target)) {
        var parentOutsideRightClickHandler = _this.context.parentOutsideRightClickHandler;
        var _this$props2 = _this.props,
            hideTooltip = _this$props2.hideTooltip,
            clearScheduled = _this$props2.clearScheduled;
        clearScheduled();
        hideTooltip();

        if (parentOutsideRightClickHandler) {
          parentOutsideRightClickHandler(event);
        }
      }
    };

    _this.addOutsideClickHandler = function () {
      document.body.addEventListener('touchend', _this.handleOutsideClick);
      document.body.addEventListener('click', _this.handleOutsideClick);
    };

    _this.removeOutsideClickHandler = function () {
      document.body.removeEventListener('touchend', _this.handleOutsideClick);
      document.body.removeEventListener('click', _this.handleOutsideClick);
    };

    _this.addOutsideRightClickHandler = function () {
      return document.body.addEventListener('contextmenu', _this.handleOutsideRightClick);
    };

    _this.removeOutsideRightClickHandler = function () {
      return document.body.removeEventListener('contextmenu', _this.handleOutsideRightClick);
    };

    _this.getTooltipRef = function (node) {
      _this.tooltipRef = node;
      react_popper_tooltip_setRef(_this.props.innerRef, node);
    };

    _this.getArrowProps = function (props) {
      if (props === void 0) {
        props = {};
      }

      return Object(esm_extends["a" /* default */])({}, props, {
        style: Object(esm_extends["a" /* default */])({}, props.style, _this.props.arrowProps.style)
      });
    };

    _this.getTooltipProps = function (props) {
      if (props === void 0) {
        props = {};
      }

      return Object(esm_extends["a" /* default */])({}, props, _this.isTriggeredBy('hover') && {
        onMouseEnter: callAll(_this.props.clearScheduled, props.onMouseEnter),
        onMouseLeave: callAll(_this.props.hideTooltip, props.onMouseLeave)
      }, {
        style: Object(esm_extends["a" /* default */])({}, props.style, _this.props.style)
      });
    };

    _this.contextValue = {
      isParentNoneTriggered: _this.props.trigger === 'none',
      addParentOutsideClickHandler: _this.addOutsideClickHandler,
      addParentOutsideRightClickHandler: _this.addOutsideRightClickHandler,
      parentOutsideClickHandler: _this.handleOutsideClick,
      parentOutsideRightClickHandler: _this.handleOutsideRightClick,
      removeParentOutsideClickHandler: _this.removeOutsideClickHandler,
      removeParentOutsideRightClickHandler: _this.removeOutsideRightClickHandler
    };
    return _this;
  }

  var _proto = Tooltip.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var observer = this.observer = new MutationObserver(function () {
      _this2.props.update();
    });
    observer.observe(this.tooltipRef, this.props.mutationObserverOptions);

    if (this.isTriggeredBy('hover') || this.isTriggeredBy('click') || this.isTriggeredBy('right-click')) {
      var _this$context = this.context,
          removeParentOutsideClickHandler = _this$context.removeParentOutsideClickHandler,
          removeParentOutsideRightClickHandler = _this$context.removeParentOutsideRightClickHandler;
      this.addOutsideClickHandler();
      this.addOutsideRightClickHandler();

      if (removeParentOutsideClickHandler) {
        removeParentOutsideClickHandler();
      }

      if (removeParentOutsideRightClickHandler) {
        removeParentOutsideRightClickHandler();
      }
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.closeOnReferenceHidden && this.props.isReferenceHidden) {
      this.props.hideTooltip();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.isTriggeredBy('hover') || this.isTriggeredBy('click') || this.isTriggeredBy('right-click')) {
      var _this$context2 = this.context,
          isParentNoneTriggered = _this$context2.isParentNoneTriggered,
          addParentOutsideClickHandler = _this$context2.addParentOutsideClickHandler,
          addParentOutsideRightClickHandler = _this$context2.addParentOutsideRightClickHandler;
      this.removeOutsideClickHandler();
      this.removeOutsideRightClickHandler();
      this.handleOutsideClick = undefined;
      this.handleOutsideRightClick = undefined;

      if (!isParentNoneTriggered && addParentOutsideClickHandler) {
        addParentOutsideClickHandler();
      }

      if (!isParentNoneTriggered && addParentOutsideRightClickHandler) {
        addParentOutsideRightClickHandler();
      }
    }
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        arrowProps = _this$props3.arrowProps,
        placement = _this$props3.placement,
        tooltip = _this$props3.tooltip;
    return /*#__PURE__*/react_default.a.createElement(TooltipContext.Provider, {
      value: this.contextValue
    }, tooltip({
      arrowRef: arrowProps.ref,
      getArrowProps: this.getArrowProps,
      getTooltipProps: this.getTooltipProps,
      placement: placement,
      tooltipRef: this.getTooltipRef
    }));
  };

  _proto.isTriggeredBy = function isTriggeredBy(event) {
    var trigger = this.props.trigger;
    return trigger === event || Array.isArray(trigger) && trigger.includes(event);
  };

  return Tooltip;
}(react["Component"]);

react_popper_tooltip_Tooltip.contextType = TooltipContext;

var DEFAULT_MUTATION_OBSERVER_CONFIG = {
  childList: true,
  subtree: true
};

var react_popper_tooltip_TooltipTrigger = /*#__PURE__*/function (_Component) {
  Object(inheritsLoose["a" /* default */])(TooltipTrigger, _Component);

  function TooltipTrigger() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      tooltipShown: _this.props.defaultTooltipShown
    };
    _this.hideTimeout = void 0;
    _this.showTimeout = void 0;
    _this.popperOffset = void 0;

    _this.setTooltipState = function (state) {
      var cb = function cb() {
        return _this.props.onVisibilityChange(state.tooltipShown);
      };

      _this.isControlled() ? cb() : _this.setState(state, cb);
    };

    _this.clearScheduled = function () {
      clearTimeout(_this.hideTimeout);
      clearTimeout(_this.showTimeout);
    };

    _this.showTooltip = function (_ref) {
      var pageX = _ref.pageX,
          pageY = _ref.pageY;

      _this.clearScheduled();

      var state = {
        tooltipShown: true
      };

      if (_this.props.followCursor) {
        state = Object(esm_extends["a" /* default */])({}, state, {
          pageX: pageX,
          pageY: pageY
        });
      }

      _this.showTimeout = window.setTimeout(function () {
        return _this.setTooltipState(state);
      }, _this.props.delayShow);
    };

    _this.hideTooltip = function () {
      _this.clearScheduled();

      _this.hideTimeout = window.setTimeout(function () {
        return _this.setTooltipState({
          tooltipShown: false
        });
      }, _this.props.delayHide);
    };

    _this.toggleTooltip = function (_ref2) {
      var pageX = _ref2.pageX,
          pageY = _ref2.pageY;
      var action = _this.getState() ? 'hideTooltip' : 'showTooltip';

      _this[action]({
        pageX: pageX,
        pageY: pageY
      });
    };

    _this.clickToggle = function (event) {
      event.preventDefault();
      var pageX = event.pageX,
          pageY = event.pageY;
      var action = _this.props.followCursor ? 'showTooltip' : 'toggleTooltip';

      _this[action]({
        pageX: pageX,
        pageY: pageY
      });
    };

    _this.contextMenuToggle = function (event) {
      event.preventDefault();
      var pageX = event.pageX,
          pageY = event.pageY;
      var action = _this.props.followCursor ? 'showTooltip' : 'toggleTooltip';

      _this[action]({
        pageX: pageX,
        pageY: pageY
      });
    };

    _this.getTriggerProps = function (props) {
      if (props === void 0) {
        props = {};
      }

      return Object(esm_extends["a" /* default */])({}, props, _this.isTriggeredBy('click') && {
        onClick: callAll(_this.clickToggle, props.onClick),
        onTouchEnd: callAll(_this.clickToggle, props.onTouchEnd)
      }, _this.isTriggeredBy('right-click') && {
        onContextMenu: callAll(_this.contextMenuToggle, props.onContextMenu)
      }, _this.isTriggeredBy('hover') && Object(esm_extends["a" /* default */])({
        onMouseEnter: callAll(_this.showTooltip, props.onMouseEnter),
        onMouseLeave: callAll(_this.hideTooltip, props.onMouseLeave)
      }, _this.props.followCursor && {
        onMouseMove: callAll(_this.showTooltip, props.onMouseMove)
      }), _this.isTriggeredBy('focus') && {
        onFocus: callAll(_this.showTooltip, props.onFocus),
        onBlur: callAll(_this.hideTooltip, props.onBlur)
      });
    };

    return _this;
  }

  var _proto = TooltipTrigger.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearScheduled();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        tooltip = _this$props.tooltip,
        placement = _this$props.placement,
        trigger = _this$props.trigger,
        getTriggerRef = _this$props.getTriggerRef,
        modifiers = _this$props.modifiers,
        closeOnReferenceHidden = _this$props.closeOnReferenceHidden,
        usePortal = _this$props.usePortal,
        portalContainer = _this$props.portalContainer,
        followCursor = _this$props.followCursor,
        getTooltipRef = _this$props.getTooltipRef,
        mutationObserverOptions = _this$props.mutationObserverOptions,
        restProps = Object(objectWithoutPropertiesLoose["a" /* default */])(_this$props, ["children", "tooltip", "placement", "trigger", "getTriggerRef", "modifiers", "closeOnReferenceHidden", "usePortal", "portalContainer", "followCursor", "getTooltipRef", "mutationObserverOptions"]);

    var popper = /*#__PURE__*/react_default.a.createElement(Popper, Object(esm_extends["a" /* default */])({
      innerRef: getTooltipRef,
      placement: placement,
      modifiers: [{
        name: 'followCursor',
        enabled: followCursor,
        phase: 'main',
        fn: function fn(data) {
          _this2.popperOffset = data.state.rects.popper;
        }
      }].concat(modifiers)
    }, restProps), function (_ref3) {
      var ref = _ref3.ref,
          style = _ref3.style,
          placement = _ref3.placement,
          arrowProps = _ref3.arrowProps,
          isReferenceHidden = _ref3.isReferenceHidden,
          update = _ref3.update;

      if (followCursor && _this2.popperOffset) {
        var _this2$state = _this2.state,
            pageX = _this2$state.pageX,
            pageY = _this2$state.pageY;
        var _this2$popperOffset = _this2.popperOffset,
            width = _this2$popperOffset.width,
            height = _this2$popperOffset.height;
        var x = pageX + width > window.pageXOffset + document.body.offsetWidth ? pageX - width : pageX;
        var y = pageY + height > window.pageYOffset + document.body.offsetHeight ? pageY - height : pageY;
        style.transform = "translate3d(" + x + "px, " + y + "px, 0";
      }

      return /*#__PURE__*/react_default.a.createElement(react_popper_tooltip_Tooltip, Object(esm_extends["a" /* default */])({
        arrowProps: arrowProps,
        closeOnReferenceHidden: closeOnReferenceHidden,
        isReferenceHidden: isReferenceHidden,
        placement: placement,
        update: update,
        style: style,
        tooltip: tooltip,
        trigger: trigger,
        mutationObserverOptions: mutationObserverOptions
      }, {
        clearScheduled: _this2.clearScheduled,
        hideTooltip: _this2.hideTooltip,
        innerRef: ref
      }));
    });
    return /*#__PURE__*/react_default.a.createElement(Manager, null, /*#__PURE__*/react_default.a.createElement(Reference, {
      innerRef: getTriggerRef
    }, function (_ref4) {
      var ref = _ref4.ref;
      return children({
        getTriggerProps: _this2.getTriggerProps,
        triggerRef: ref
      });
    }), this.getState() && (usePortal ? /*#__PURE__*/Object(react_dom["createPortal"])(popper, portalContainer) : popper));
  };

  _proto.isControlled = function isControlled() {
    return this.props.tooltipShown !== undefined;
  };

  _proto.getState = function getState() {
    return this.isControlled() ? this.props.tooltipShown : this.state.tooltipShown;
  };

  _proto.isTriggeredBy = function isTriggeredBy(event) {
    var trigger = this.props.trigger;
    return trigger === event || Array.isArray(trigger) && trigger.includes(event);
  };

  return TooltipTrigger;
}(react["Component"]);

react_popper_tooltip_TooltipTrigger.defaultProps = {
  closeOnReferenceHidden: true,
  defaultTooltipShown: false,
  delayHide: 0,
  delayShow: 0,
  followCursor: false,
  onVisibilityChange: noop,
  placement: 'right',
  portalContainer: canUseDOM() ? document.body : null,
  trigger: 'hover',
  usePortal: canUseDOM(),
  mutationObserverOptions: DEFAULT_MUTATION_OBSERVER_CONFIG,
  modifiers: []
};

/* harmony default export */ var react_popper_tooltip = (react_popper_tooltip_TooltipTrigger);
//# sourceMappingURL=react-popper-tooltip.js.map

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("62c8");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("2aa5");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("defa");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("d86f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/memoizerific/memoizerific.js
var memoizerific = __webpack_require__("bdb0");
var memoizerific_default = /*#__PURE__*/__webpack_require__.n(memoizerific);

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@storybook/theming/dist/esm/utils.js
var utils = __webpack_require__("9526");

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@storybook/components/dist/esm/tooltip/Tooltip.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











var match = memoizerific_default()(1000)(function (requests, actual, value) {
  var fallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return actual.split('-')[0] === requests ? value : fallback;
});
var ArrowSpacing = 8;
var Arrow = esm["styled"].div({
  position: 'absolute',
  borderStyle: 'solid'
}, function (_ref) {
  var placement = _ref.placement;
  var x = 0;
  var y = 0;

  switch (true) {
    case placement.startsWith('left') || placement.startsWith('right'):
      {
        y = 8;
        break;
      }

    case placement.startsWith('top') || placement.startsWith('bottom'):
      {
        x = 8;
        break;
      }

    default:
      {//
      }
  }

  var transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0px)");
  return {
    transform: transform
  };
}, function (_ref2) {
  var theme = _ref2.theme,
      color = _ref2.color,
      placement = _ref2.placement;
  return {
    bottom: "".concat(match('top', placement, ArrowSpacing * -1, 'auto'), "px"),
    top: "".concat(match('bottom', placement, ArrowSpacing * -1, 'auto'), "px"),
    right: "".concat(match('left', placement, ArrowSpacing * -1, 'auto'), "px"),
    left: "".concat(match('right', placement, ArrowSpacing * -1, 'auto'), "px"),
    borderBottomWidth: "".concat(match('top', placement, '0', ArrowSpacing), "px"),
    borderTopWidth: "".concat(match('bottom', placement, '0', ArrowSpacing), "px"),
    borderRightWidth: "".concat(match('left', placement, '0', ArrowSpacing), "px"),
    borderLeftWidth: "".concat(match('right', placement, '0', ArrowSpacing), "px"),
    borderTopColor: match('top', placement, theme.color[color] || color || theme.base === 'light' ? Object(utils["c" /* lightenColor */])(theme.background.app) : Object(utils["a" /* darkenColor */])(theme.background.app), 'transparent'),
    borderBottomColor: match('bottom', placement, theme.color[color] || color || theme.base === 'light' ? Object(utils["c" /* lightenColor */])(theme.background.app) : Object(utils["a" /* darkenColor */])(theme.background.app), 'transparent'),
    borderLeftColor: match('left', placement, theme.color[color] || color || theme.base === 'light' ? Object(utils["c" /* lightenColor */])(theme.background.app) : Object(utils["a" /* darkenColor */])(theme.background.app), 'transparent'),
    borderRightColor: match('right', placement, theme.color[color] || color || theme.base === 'light' ? Object(utils["c" /* lightenColor */])(theme.background.app) : Object(utils["a" /* darkenColor */])(theme.background.app), 'transparent')
  };
});
var Wrapper = esm["styled"].div(function (_ref3) {
  var hidden = _ref3.hidden;
  return {
    display: hidden ? 'none' : 'inline-block',
    zIndex: 2147483647
  };
}, function (_ref4) {
  var theme = _ref4.theme,
      color = _ref4.color,
      hasChrome = _ref4.hasChrome;
  return hasChrome ? {
    background: theme.color[color] || color || theme.base === 'light' ? Object(utils["c" /* lightenColor */])(theme.background.app) : Object(utils["a" /* darkenColor */])(theme.background.app),
    filter: "\n            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))\n            drop-shadow(0 1px 3px rgba(0,0,0,0.1))\n          ",
    borderRadius: theme.appBorderRadius * 2,
    fontSize: theme.typography.size.s1
  } : {};
});
var Tooltip_Tooltip = function Tooltip(_ref5) {
  var placement = _ref5.placement,
      hasChrome = _ref5.hasChrome,
      children = _ref5.children,
      arrowProps = _ref5.arrowProps,
      tooltipRef = _ref5.tooltipRef,
      arrowRef = _ref5.arrowRef,
      color = _ref5.color,
      props = _objectWithoutProperties(_ref5, ["placement", "hasChrome", "children", "arrowProps", "tooltipRef", "arrowRef", "color"]);

  return /*#__PURE__*/react_default.a.createElement(Wrapper, _extends({
    hasChrome: hasChrome,
    placement: placement,
    ref: tooltipRef
  }, props, {
    color: color
  }), hasChrome && /*#__PURE__*/react_default.a.createElement(Arrow, _extends({
    placement: placement,
    ref: arrowRef
  }, arrowProps, {
    color: color
  })), children);
};
Tooltip_Tooltip.displayName = "Tooltip";
Tooltip_Tooltip.defaultProps = {
  color: undefined,
  arrowRef: undefined,
  tooltipRef: undefined,
  hasChrome: true,
  placement: 'top',
  arrowProps: {}
};
// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@storybook/components/dist/esm/tooltip/WithTooltip.js












var _templateObject, _templateObject2;





function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function WithTooltip_extends() { WithTooltip_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return WithTooltip_extends.apply(this, arguments); }

function WithTooltip_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = WithTooltip_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function WithTooltip_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var WithTooltip_document = window_default.a.document; // A target that doesn't speak popper

var TargetContainer = esm["styled"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  cursor: ", ";\n"])), function (props) {
  return props.mode === 'hover' ? 'default' : 'pointer';
});
var TargetSvgContainer = esm["styled"].g(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: ", ";\n"])), function (props) {
  return props.mode === 'hover' ? 'default' : 'pointer';
});

// Pure, does not bind to the body
var WithTooltip_WithTooltipPure = function WithTooltipPure(_ref) {
  var svg = _ref.svg,
      trigger = _ref.trigger,
      closeOnClick = _ref.closeOnClick,
      placement = _ref.placement,
      modifiers = _ref.modifiers,
      hasChrome = _ref.hasChrome,
      _tooltip = _ref.tooltip,
      children = _ref.children,
      tooltipShown = _ref.tooltipShown,
      onVisibilityChange = _ref.onVisibilityChange,
      props = WithTooltip_objectWithoutProperties(_ref, ["svg", "trigger", "closeOnClick", "placement", "modifiers", "hasChrome", "tooltip", "children", "tooltipShown", "onVisibilityChange"]);

  var Container = svg ? TargetSvgContainer : TargetContainer;
  return /*#__PURE__*/react_default.a.createElement(react_popper_tooltip, {
    placement: placement,
    trigger: trigger,
    modifiers: modifiers,
    tooltipShown: tooltipShown,
    onVisibilityChange: onVisibilityChange,
    tooltip: function tooltip(_ref2) {
      var getTooltipProps = _ref2.getTooltipProps,
          getArrowProps = _ref2.getArrowProps,
          tooltipRef = _ref2.tooltipRef,
          arrowRef = _ref2.arrowRef,
          tooltipPlacement = _ref2.placement;
      return /*#__PURE__*/react_default.a.createElement(Tooltip_Tooltip, WithTooltip_extends({
        hasChrome: hasChrome,
        placement: tooltipPlacement,
        tooltipRef: tooltipRef,
        arrowRef: arrowRef,
        arrowProps: getArrowProps()
      }, getTooltipProps()), typeof _tooltip === 'function' ? _tooltip({
        onHide: function onHide() {
          return onVisibilityChange(false);
        }
      }) : _tooltip);
    }
  }, function (_ref3) {
    var getTriggerProps = _ref3.getTriggerProps,
        triggerRef = _ref3.triggerRef;
    return (
      /*#__PURE__*/
      // @ts-ignore
      react_default.a.createElement(Container, WithTooltip_extends({
        ref: triggerRef
      }, getTriggerProps(), props), children)
    );
  });
};

WithTooltip_WithTooltipPure.displayName = "WithTooltipPure";
WithTooltip_WithTooltipPure.defaultProps = {
  svg: false,
  trigger: 'hover',
  closeOnClick: false,
  placement: 'top',
  modifiers: [{
    name: 'preventOverflow',
    options: {
      padding: 8
    }
  }, {
    name: 'offset',
    options: {
      offset: [8, 8]
    }
  }, {
    name: 'arrow',
    options: {
      padding: 8
    }
  }],
  hasChrome: true,
  tooltipShown: false
};

var WithTooltip_WithToolTipState = function WithToolTipState(_ref4) {
  var startOpen = _ref4.startOpen,
      onChange = _ref4.onVisibilityChange,
      rest = WithTooltip_objectWithoutProperties(_ref4, ["startOpen", "onVisibilityChange"]);

  var _useState = Object(react["useState"])(startOpen || false),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipShown = _useState2[0],
      setTooltipShown = _useState2[1];

  var onVisibilityChange = Object(react["useCallback"])(function (visibility) {
    if (onChange && onChange(visibility) === false) return;
    setTooltipShown(visibility);
  }, [onChange]);
  Object(react["useEffect"])(function () {
    var hide = function hide() {
      return onVisibilityChange(false);
    };

    WithTooltip_document.addEventListener('keydown', hide, false); // Find all iframes on the screen and bind to clicks inside them (waiting until the iframe is ready)

    var iframes = Array.from(WithTooltip_document.getElementsByTagName('iframe'));
    var unbinders = [];
    iframes.forEach(function (iframe) {
      var bind = function bind() {
        try {
          if (iframe.contentWindow.document) {
            iframe.contentWindow.document.addEventListener('click', hide);
            unbinders.push(function () {
              try {
                iframe.contentWindow.document.removeEventListener('click', hide);
              } catch (e) {// logger.debug('Removing a click listener from iframe failed: ', e);
              }
            });
          }
        } catch (e) {// logger.debug('Adding a click listener to iframe failed: ', e);
        }
      };

      bind(); // I don't know how to find out if it's already loaded so I potentially will bind twice

      iframe.addEventListener('load', bind);
      unbinders.push(function () {
        iframe.removeEventListener('load', bind);
      });
    });
    return function () {
      WithTooltip_document.removeEventListener('keydown', hide);
      unbinders.forEach(function (unbind) {
        unbind();
      });
    };
  });
  return /*#__PURE__*/react_default.a.createElement(WithTooltip_WithTooltipPure, WithTooltip_extends({}, rest, {
    tooltipShown: tooltipShown,
    onVisibilityChange: onVisibilityChange
  }));
};

WithTooltip_WithToolTipState.displayName = "WithToolTipState";


/***/ }),

/***/ "9446":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ })

}]);
//# sourceMappingURL=2.914fb0c0.iframe.bundle.js.map