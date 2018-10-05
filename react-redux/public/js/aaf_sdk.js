(function() {
	"use strict";
	///////
	var __sdkVersion = "1.0.0";
	var __client = null;
	var __context = null;
	var __instanceId = getParameterByName("instanceId");
	var __origin = getParameterByName("origin");
	///////
	var __requestIdVsCallback = {};
	var __requestIdVsTimeout = {};
	var __eventVsCallback = {};
	///////
	var __requestTimeout = 10000; // 10 second


	function getParameterByName(name) {
		var url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex
			.exec(url);
		if (!results) {
			return null;
		}
		if (!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}


	var getUniqueID = function() {
		return Math.random().toString(10).substr(2, 12);
	};

	window.addEventListener('unload', function() {

		var requestId = getUniqueID();
		var request = {
			"requestId": requestId,
			"service": "lifeCycle",
			"method": "event",
			"requestData": {
				"eventName": "appUnload",
			}
		};
		sendRequest(request);
		var event = "lifeCycle:" + "appUnload";
		var callbacks = __eventVsCallback[event];

		if (callbacks) {
			for (var index = 0; index < callbacks.length; index++) {
				if (typeof callbacks[index] === "function") {
					try {
						callbacks[index]();
					} catch (e) {
						console.error("ameyo_aap_sdk : error in callback " + e);
					}
				}
			}

		}
	});
	window.addEventListener('load', function() {

		var requestId = getUniqueID();
		var request = {
			"requestId": requestId,
			"service": "lifeCycle",
			"method": "event",
			"requestData": {
				"eventName": "appLoad",
			}
		};
		sendRequest(request);
	});
	window.addEventListener('focus', function() {

		var requestId = getUniqueID();
		var request = {
			"requestId": requestId,
			"service": "lifeCycle",
			"method": "event",
			"requestData": {
				"eventName": "appFocus",
			}
		};
		sendRequest(request);
	});
	window.addEventListener('blur', function() {

		var requestId = getUniqueID();
		var request = {
			"requestId": requestId,
			"service": "lifeCycle",
			"method": "event",
			"requestData": {
				"eventName": "appBlur",
			}
		};
		sendRequest(request);
	});

	function setTimeoutForRequest(requestId) {
		__requestIdVsTimeout[requestId] = setTimeout(function(requestId) {
			var callback = __requestIdVsCallback[requestId]["failure"];
			if (callback) {
				callback({
					code: 100,
					message: "request timeout"
				});
			}
			delete __requestIdVsTimeout[requestId];
			delete __requestIdVsCallback[requestId];
		}, __requestTimeout, requestId);
	}


	function setRequestCallback(requestId, resolve, reject) {
		__requestIdVsCallback[requestId] = {
			success: resolve,
			failure: reject
		};
	}

	function setEventCallback(event, eventCallback) {
		__eventVsCallback[event] = __eventVsCallback[event] || [];
		__eventVsCallback[event].push(eventCallback);
	}

	function sendRequest(request) {
		request.instanceId = __instanceId;
		request.sdkVersion = __sdkVersion;
		var message = JSON.stringify(request);
		window.parent.postMessage(message, __origin);
	}

    function isValidMessage(event){
    		return __origin === event.origin;
    }
	function processPostMessage(event) {
		if(!isValidMessage(event)){
			console.error("ameyo_aap_sdk : message received from a different origin than ameyo host application");
			return;
		}
		var responseObject = event.data;
		try {
			responseObject = JSON.parse(responseObject);
			handleApplicationResponse(responseObject);
		} catch (e) {
			console.error("ameyo_aap_sdk : invalid json response returned from ameyo application " + e);
		}

	}

	function handleApplicationResponse(responseObject) {
		var service = responseObject.service;
		if (responseObject.responseType == "request") {
			var requestId = responseObject.requestId;
			var callbackObject = __requestIdVsCallback[requestId];
			if (!callbackObject) {
				console.log("ameyo_aap_sdk : ameyo application response received after request timeout. service : " + responseObject.service + ", " + "method : " + responseObject.method);
				return;
			}
			var callback = __requestIdVsCallback[responseObject.requestId][responseObject.status];
			if (typeof callback == "function") {
				callback(responseObject.data);
			}
			clearTimeout(__requestIdVsTimeout[requestId]);
			delete __requestIdVsTimeout[requestId];
			delete __requestIdVsCallback[requestId];
		} else if (responseObject.responseType == "event") {
			var event = service + ":" + responseObject.eventName;
			var callbacks = __eventVsCallback[event];
			if (callbacks) {
				for (var index = 0; index < callbacks.length; index++) {
					if (typeof callbacks[index] === "function") {
						try {
							callbacks[index](responseObject.data);
						} catch (e) {
							console.error("ameyo_aap_sdk : error in callback " + e);
						}
					}
				}
			}
		}
	}

	window.AmeyoClient = {};
	AmeyoClient.init = function() {
		if (!__client) {
			__client = new Client();
			////////////
			//register app
			////////////
			var requestId = getUniqueID();
			var request = {
				"requestId": requestId,
				"service": "lifeCycle",
				"method": "event",
				"requestData": {
					"eventName": "appRegistered"
				}
			};
			sendRequest(request);
			__client.instance.getContext().then(function(context) {
				__context = context;
			});
			////////////
		}
		return __client;
	};

	var Client = function(data) {

		if (window.attachEvent) {
			window.attachEvent('onmessage', processPostMessage);
		} else {
			window.addEventListener('message', processPostMessage, false);
		}

		this.globalData = {
			get: function(dataObject) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "globalData",
						"method": "get",
						"requestData": {
							"dataObject": dataObject
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			}
		};
		this.contextData = {
			get: function(dataObject) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "contextData",
						"method": "get",
						"requestData": {
							"dataObject": dataObject
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			update: function(dataObject, updateData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "contextData",
						"method": "update",
						"requestData": {
							"dataObject": dataObject,
							"updateData": updateData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			action: function(dataObject, actionType, actionData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "contextData",
						"method": "action",
						"requestData": {
							"dataObject": dataObject,
							"actionType": actionType,
							"actionData": actionData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			trigger: function(operation, operationData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "contextData",
						"method": "trigger",
						"requestData": {
							"operation": operation,
							"operationData": operationData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			}
		};
		this.interface = {
			trigger: function(operation, operationData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "interface",
						"method": "trigger",
						"requestData": {
							"operation": operation,
							"operationData": operationData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			}
		};
		this.globalEvent = {
			register: function(eventName, eventCallback) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "globalEvent",
						"method": "register",
						"requestData": {
							"eventName": eventName
						}
					};
					var event = "globalEvent:" + eventName;
					setEventCallback(event, eventCallback);
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			unRegister: function(eventName, eventCallback) {
				var event = "globalEvent:" + eventName;
				var eventCallbackList = __eventVsCallback[event];
				if (eventCallbackList) {
					var index = eventCallbackList.indexOf(eventCallback);
					if (index !== -1) {
						eventCallbackList.splice(index, 1);
						if (eventCallbackList.length === 0) {
							var requestId = getUniqueID();
							var request = {
								"requestId": requestId,
								"service": "globalEvent",
								"method": "unRegister",
								"requestData": {
									"eventName": eventName
								}
							};
							sendRequest(request);
						}
					}
				}
			}
		};
		this.httpRequest = {
			invokeAmeyo: function(requestData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "httpRequest",
						"method": "invokeAmeyo",
						"requestData": {
							"httpRequestData": requestData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			invoke: function(requestData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "httpRequest",
						"method": "invoke",
						"requestData": {
							"httpRequestData": requestData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			}
		};
		this.lifeCycle = {
			register: function(eventName, eventCallback) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "lifeCycle",
						"method": "register",
						"requestData": {
							"eventName": eventName
						}
					};
					var event = "lifeCycle:" + eventName;
					setEventCallback(event, eventCallback);
					if (eventName === "appUnload") {
						resolve({});
					} else {
						setRequestCallback(requestId, resolve, reject);
						sendRequest(request);
						setTimeoutForRequest(requestId);
					}
				});
			},
			unRegister: function(eventName, eventCallback) {
				var event = "lifeCycle:" + eventName;
				var eventCallbackList = __eventVsCallback[event];
				if (eventCallbackList) {
					var index = eventCallbackList.indexOf(eventCallback);
					if (index !== -1) {
						eventCallbackList.splice(index, 1);
						if (eventCallbackList.length === 0) {
							var requestId = getUniqueID();
							var request = {
								"requestId": requestId,
								"service": "lifeCycle",
								"method": "unRegister",
								"requestData": {
									"eventName": eventName
								}
							};
							sendRequest(request);
						}
					}
				}
			}
		};
		this.instance = {
			getContext: function() {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "getContext",
						"requestData": {}

					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			create: function(slotType, creationData, contextData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "create",
						"requestData": {
							"slotType": slotType,
							"creationData": creationData,
							"contextData": contextData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			getAllInfo: function() {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "getAllInfo",
						"requestData": {}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			getInfo: function(instanceId) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "getInfo",
						"requestData": {
							"instanceId": instanceId
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			sendData: function(instanceId, contextData) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "sendData",
						"requestData": {
							"receivingInstanceId": instanceId,
							"contextData": contextData
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			receiveData: function(eventCallback) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "receiveData",
						"requestData": {}
					};
					var event = "instance:" + "receiveData";
					setEventCallback(event, eventCallback);
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			close: function(instanceId) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "instance",
						"method": "close",
						"requestData": {
							"instanceId": instanceId
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);

				});
			}
		};
		this.dbData = {
			get: function(parameter) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "dbData",
						"method": "get",
						"requestData": {
							"parameter": parameter
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			set: function(parameter) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "dbData",
						"method": "set",
						"requestData": {
							"parameter": parameter
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			},
			delete: function(parameter) {
				return new Promise(function(resolve, reject) {
					var requestId = getUniqueID();
					var request = {
						"requestId": requestId,
						"service": "dbData",
						"method": "delete",
						"requestData": {
							"parameter": parameter
						}
					};
					setRequestCallback(requestId, resolve, reject);
					sendRequest(request);
					setTimeoutForRequest(requestId);
				});
			}
		};
	}
})();



/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name, context, definition) {
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module != "undefined" && module.exports) {
		module.exports = context[name];
	} else if (typeof define == "function" && define.amd) {
		define(function $AMD$() {
			return context[name];
		});
	}
})("Promise", typeof global != "undefined" ? global : this, function DEF() {
	/*jshint validthis:true */
	"use strict";

	var builtInProp, cycle, scheduling_queue,
		ToString = Object.prototype.toString,
		timer = (typeof setImmediate != "undefined") ?
		function timer(fn) {
			return setImmediate(fn);
		} :
		setTimeout;

	// dammit, IE8.
	try {
		Object.defineProperty({}, "x", {});
		builtInProp = function builtInProp(obj, name, val, config) {
			return Object.defineProperty(obj, name, {
				value: val,
				writable: true,
				configurable: config !== false
			});
		};
	} catch (err) {
		builtInProp = function builtInProp(obj, name, val) {
			obj[name] = val;
			return obj;
		};
	}

	// Note: using a queue instead of array for efficiency
	scheduling_queue = (function Queue() {
		var first, last, item;

		function Item(fn, self) {
			this.fn = fn;
			this.self = self;
			this.next = void 0;
		}

		return {
			add: function add(fn, self) {
				item = new Item(fn, self);
				if (last) {
					last.next = item;
				} else {
					first = item;
				}
				last = item;
				item = void 0;
			},
			drain: function drain() {
				var f = first;
				first = last = cycle = void 0;

				while (f) {
					f.fn.call(f.self);
					f = f.next;
				}
			}
		};
	})();

	function schedule(fn, self) {
		scheduling_queue.add(fn, self);
		if (!cycle) {
			cycle = timer(scheduling_queue.drain);
		}
	}

	// promise duck typing
	function isThenable(o) {
		var _then, o_type = typeof o;

		if (o != null &&
			(
				o_type == "object" || o_type == "function"
			)
		) {
			_then = o.then;
		}
		return typeof _then == "function" ? _then : false;
	}

	function notify() {
		for (var i = 0; i < this.chain.length; i++) {
			notifyIsolated(
				this,
				(this.state === 1) ? this.chain[i].success : this.chain[i].failure,
				this.chain[i]
			);
		}
		this.chain.length = 0;
	}

	// NOTE: This is a separate function to isolate
	// the `try..catch` so that other code can be
	// optimized better
	function notifyIsolated(self, cb, chain) {
		var ret, _then;
		try {
			if (cb === false) {
				chain.reject(self.msg);
			} else {
				if (cb === true) {
					ret = self.msg;
				} else {
					ret = cb.call(void 0, self.msg);
				}

				if (ret === chain.promise) {
					chain.reject(TypeError("Promise-chain cycle"));
				} else if (_then = isThenable(ret)) {
					_then.call(ret, chain.resolve, chain.reject);
				} else {
					chain.resolve(ret);
				}
			}
		} catch (err) {
			chain.reject(err);
		}
	}

	function resolve(msg) {
		var _then, self = this;

		// already triggered?
		if (self.triggered) {
			return;
		}

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		try {
			if (_then = isThenable(msg)) {
				schedule(function() {
					var def_wrapper = new MakeDefWrapper(self);
					try {
						_then.call(msg,
							function $resolve$() {
								resolve.apply(def_wrapper, arguments);
							},
							function $reject$() {
								reject.apply(def_wrapper, arguments);
							}
						);
					} catch (err) {
						reject.call(def_wrapper, err);
					}
				})
			} else {
				self.msg = msg;
				self.state = 1;
				if (self.chain.length > 0) {
					schedule(notify, self);
				}
			}
		} catch (err) {
			reject.call(new MakeDefWrapper(self), err);
		}
	}

	function reject(msg) {
		var self = this;

		// already triggered?
		if (self.triggered) {
			return;
		}

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		self.msg = msg;
		self.state = 2;
		if (self.chain.length > 0) {
			schedule(notify, self);
		}
	}

	function iteratePromises(Constructor, arr, resolver, rejecter) {
		for (var idx = 0; idx < arr.length; idx++) {
			(function IIFE(idx) {
				Constructor.resolve(arr[idx])
					.then(
						function $resolver$(msg) {
							resolver(idx, msg);
						},
						rejecter
					);
			})(idx);
		}
	}

	function MakeDefWrapper(self) {
		this.def = self;
		this.triggered = false;
	}

	function MakeDef(self) {
		this.promise = self;
		this.state = 0;
		this.triggered = false;
		this.chain = [];
		this.msg = void 0;
	}

	function Promise(executor) {
		if (typeof executor != "function") {
			throw TypeError("Not a function");
		}

		if (this.__NPO__ !== 0) {
			throw TypeError("Not a promise");
		}

		// instance shadowing the inherited "brand"
		// to signal an already "initialized" promise
		this.__NPO__ = 1;

		var def = new MakeDef(this);

		this["then"] = function then(success, failure) {
			var o = {
				success: typeof success == "function" ? success : true,
				failure: typeof failure == "function" ? failure : false
			};
			// Note: `then(..)` itself can be borrowed to be used against
			// a different promise constructor for making the chained promise,
			// by substituting a different `this` binding.
			o.promise = new this.constructor(function extractChain(resolve, reject) {
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}

				o.resolve = resolve;
				o.reject = reject;
			});
			def.chain.push(o);

			if (def.state !== 0) {
				schedule(notify, def);
			}

			return o.promise;
		};
		this["catch"] = function $catch$(failure) {
			return this.then(void 0, failure);
		};

		try {
			executor.call(
				void 0,
				function publicResolve(msg) {
					resolve.call(def, msg);
				},
				function publicReject(msg) {
					reject.call(def, msg);
				}
			);
		} catch (err) {
			reject.call(def, err);
		}
	}

	var PromisePrototype = builtInProp({}, "constructor", Promise,
		/*configurable=*/
		false
	);

	// Note: Android 4 cannot use `Object.defineProperty(..)` here
	Promise.prototype = PromisePrototype;

	// built-in "brand" to signal an "uninitialized" promise
	builtInProp(PromisePrototype, "__NPO__", 0,
		/*configurable=*/
		false
	);

	builtInProp(Promise, "resolve", function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
			return msg;
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			resolve(msg);
		});
	});

	builtInProp(Promise, "reject", function Promise$reject(msg) {
		return new this(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			reject(msg);
		});
	});

	builtInProp(Promise, "all", function Promise$all(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			var len = arr.length,
				msgs = Array(len),
				count = 0;

			iteratePromises(Constructor, arr, function resolver(idx, msg) {
				msgs[idx] = msg;
				if (++count === len) {
					resolve(msgs);
				}
			}, reject);
		});
	});

	builtInProp(Promise, "race", function Promise$race(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}

		return new Constructor(function executor(resolve, reject) {
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			iteratePromises(Constructor, arr, function resolver(idx, msg) {
				resolve(msg);
			}, reject);
		});
	});

	return Promise;
});