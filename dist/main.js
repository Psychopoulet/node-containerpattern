
"use strict";

// private

// methods

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _checkData(that, key, value) {

	// check existance
	if ("undefined" === typeof value) {
		throw new Error("The \"" + key + "\" value is undefined");
	}

	// check limits
	else if (that.limits[key] && -1 >= that.limits[key].indexOf(value)) {
			throw new Error("The \"" + key + "\" data does not correspond to the limits (" + JSON.stringify(that.limits[key]) + ")");
		} else {

			// check skeleton
			if (that.skeletons[key]) {

				if ("object" === that.skeletons[key]) {

					if (!(value instanceof Object)) {

						if ("string" !== typeof value) {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						} else if ("{" === value[0] && "}" === value[value.length - 1]) {
							value = JSON.parse(value);
						} else {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}
					}
				} else if ("array" === that.skeletons[key]) {

					if (!(value instanceof Array)) {

						if ("string" !== typeof value) {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						} else if ("[" === value[0] && "]" === value[value.length - 1]) {
							value = JSON.parse(value);
						} else {
							throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
						}
					}
				} else if (-1 < ["string", "boolean", "number", "float", "integer"].indexOf(that.skeletons[key])) {

					if (that.skeletons[key] !== (typeof value === "undefined" ? "undefined" : _typeof(value))) {

						switch (that.skeletons[key]) {

							case "string":
								value = value + "";
								break;

							case "boolean":
								value = "true" === value || "yes" === value || "y" === value || "1" === value || 1 === value || true === value;
								break;

							case "float":case "number":

								if (isNaN(parseFloat(value))) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								} else {
									value = parseFloat(value);
								}

								break;
							case "integer":

								if (isNaN(parseInt(value))) {
									throw new Error("The \"" + key + "\" data does not correspond to the skeleton");
								} else {
									value = parseInt(value);
								}

								break;

						}
					}
				}
			}
		}

	return value;
}

function _checkDataRecursive(that, key, value) {

	for (var i in value) {

		value[i] = _checkData(that, key + that.recursionSeparator + i, value[i]);

		if ("object" === _typeof(value[i]) && !(value[i] instanceof Array)) {
			value[i] = _checkDataRecursive(that, key + that.recursionSeparator + i, value[i]);
		}
	}

	return value;
}

function _createBaseObject(that, parentKey, parentValue, keys, i, value) {

	parentValue = _checkData(that, parentKey, parentValue);

	if (i < keys.length - 1) {
		parentValue[keys[i]] = _createBaseObject(that, parentKey + that.recursionSeparator + keys[i], !parentValue[keys[i]] ? {} : parentValue[keys[i]], keys, i + 1, value);
	} else {
		parentValue[keys[i]] = _checkData(that, parentKey + that.recursionSeparator + keys[i], value);
	}

	return parentValue;
}

function _extractDocumentation(that, previousKeys, object) {

	var result = {};

	if (!(object instanceof Array) && !(object instanceof Map)) {

		for (var key in object) {

			var value = object[key],
			    fullKey = "" !== previousKeys ? previousKeys + that.recursionSeparator + key : key,
			    documentation = that.documentations[fullKey] ? that.documentations[fullKey] : "";

			if ("object" === (typeof value === "undefined" ? "undefined" : _typeof(value))) {

				result[key] = {
					fullkey: fullKey,
					documentation: documentation
				};

				if (value instanceof Array) {
					result[key].type = "array";
					result[key].content = 0 === value.length ? [] : _extractDocumentation(that, fullKey, value);
				} else {
					result[key].type = "object";
					result[key].content = 0 === Object.keys(value).length ? {} : _extractDocumentation(that, fullKey, value);
				}
			} else if ("number" === typeof value) {

				if (Number.isInteger(value)) {
					result[key] = { fullkey: fullKey, type: "integer", documentation: documentation };
				} else {
					result[key] = { fullkey: fullKey, type: "float", documentation: documentation };
				}
			} else {
				result[key] = { fullkey: fullKey, type: typeof value === "undefined" ? "undefined" : _typeof(value), documentation: documentation };
			}
		}
	} else {

		object.forEach(function (value, key) {

			var fullKey = "" !== previousKeys ? previousKeys + that.recursionSeparator + key : key,
			    documentation = that.documentations[fullKey] ? that.documentations[fullKey] : "";

			if ("object" === (typeof value === "undefined" ? "undefined" : _typeof(value))) {

				result[key] = {
					fullkey: fullKey,
					documentation: documentation
				};

				if (value instanceof Array) {
					result[key].type = "array";
					result[key].content = 0 === value.length ? [] : _extractDocumentation(that, fullKey, value);
				} else {
					result[key].type = "object";
					result[key].content = 0 === Object.keys(value).length ? {} : _extractDocumentation(that, fullKey, value);
				}
			} else if ("number" === typeof value) {

				if (Number.isInteger(value)) {
					result[key] = { fullkey: fullKey, type: "integer", documentation: documentation };
				} else {
					result[key] = { fullkey: fullKey, type: "float", documentation: documentation };
				}
			} else {
				result[key] = { fullkey: fullKey, type: typeof value === "undefined" ? "undefined" : _typeof(value), documentation: documentation };
			}
		});
	}

	return result;
}

function _formateKey(key) {

	if ("string" !== typeof key) {
		throw new Error("The key is not a string");
	} else {

		key = key.trim();

		if ("" === key) {
			throw new Error("The key is empty");
		} else {
			return key;
		}
	}
}

// module

module.exports = function (_Map) {
	_inherits(NodeContainerPattern, _Map);

	function NodeContainerPattern(recursionSeparator) {
		_classCallCheck(this, NodeContainerPattern);

		var _this = _possibleConstructorReturn(this, (NodeContainerPattern.__proto__ || Object.getPrototypeOf(NodeContainerPattern)).call(this));

		_this.recursionSeparator = "string" === typeof recursionSeparator ? recursionSeparator : ".";
		_this.skeletons = {};
		_this.documentations = {};
		_this.limits = {};

		return _this;
	}

	_createClass(NodeContainerPattern, [{
		key: "bindSkeleton",
		value: function bindSkeleton(key, skeleton) {

			key = _formateKey(key);

			if ("string" !== typeof skeleton) {
				throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
			} else {

				skeleton = skeleton.trim().toLowerCase();

				if (-1 >= ["string", "object", "array", "boolean", "integer", "float", "number"].indexOf(skeleton)) {
					throw new Error("The \"" + key + "\" data has an invalid \"skeleton\" attribute");
				} else {
					this.skeletons[key] = skeleton;
				}
			}

			return this;
		}
	}, {
		key: "clear",
		value: function clear() {
			return this.clearData().clearDocumentation().clearLimits().clearSkeleton();
		}
	}, {
		key: "clearData",
		value: function clearData() {
			_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "clear", this).call(this);
			return this;
		}
	}, {
		key: "clearDocumentation",
		value: function clearDocumentation() {
			this.documentations = {};
			return this;
		}
	}, {
		key: "clearLimits",
		value: function clearLimits() {
			this.limits = {};
			return this;
		}
	}, {
		key: "clearSkeleton",
		value: function clearSkeleton() {
			this.skeletons = {};
			return this;
		}
	}, {
		key: "delete",
		value: function _delete(key) {
			_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "delete", this).call(this, _formateKey(key));
			return this;
		}
	}, {
		key: "document",
		value: function document(key, documentation) {

			key = _formateKey(key);

			if ("undefined" === typeof documentation) {
				throw new Error("The \"" + key + "\" documentation is undefined");
			} else if ("string" !== typeof documentation) {
				throw new Error("The \"" + key + "\" documentation is not a string");
			} else {
				this.documentations[key] = documentation;
			}

			return this;
		}
	}, {
		key: "documentation",
		value: function documentation() {
			return _extractDocumentation(this, "", this);
		}
	}, {
		key: "get",
		value: function get(key) {

			key = _formateKey(key);

			if (!this.has(key)) {
				throw new Error("Unknown key \"" + key + "\"");
			} else if (-1 < key.indexOf(this.recursionSeparator)) {

				var keys = key.split(this.recursionSeparator),
				    value = this.get(keys[0]);

				for (var i = 1; i < keys.length; ++i) {
					value = value[keys[i]];
				}

				return value;
			} else {
				return _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "get", this).call(this, key);
			}
		}
	}, {
		key: "has",
		value: function has(key) {

			key = _formateKey(key);

			if (-1 >= key.indexOf(this.recursionSeparator)) {
				return _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "has", this).call(this, key);
			} else {

				var keys = key.split(this.recursionSeparator);

				if (!_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "has", this).call(this, keys[0])) {
					return false;
				} else {

					var exists = false;

					for (var i = 1, value = _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "get", this).call(this, keys[0]); i < keys.length; ++i) {

						if ("object" !== (typeof value === "undefined" ? "undefined" : _typeof(value)) || "undefined" === typeof value[keys[i]]) {
							break;
						} else if (i === keys.length - 1) {
							exists = true;
							break;
						} else {
							value = value[keys[i]];
						}
					}

					return exists;
				}
			}
		}
	}, {
		key: "limit",
		value: function limit(key, _limit) {

			key = _formateKey(key);

			if (!(_limit instanceof Array)) {
				throw new Error("The \"" + key + "\" data has an invalid \"limit\" attribute");
			} else {
				this.limits[key] = _limit;
			}

			return this;
		}
	}, {
		key: "set",
		value: function set(key, value) {

			key = _formateKey(key);
			value = _checkData(this, key, value);

			// check key recursivity
			if (-1 < key.indexOf(this.recursionSeparator)) {

				var keys = key.split(this.recursionSeparator);

				// if no more constraints, set
				if ("object" !== (typeof value === "undefined" ? "undefined" : _typeof(value)) || value instanceof Array || 1 > Object.keys(value).length) {

					var firstKey = keys.shift();

					_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "set", this).call(this, firstKey, _createBaseObject(this, firstKey, _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "has", this).call(this, firstKey) ? _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "get", this).call(this, firstKey) : {}, keys, 0, value));
				}

				// check content recursivity
				else {

						var _firstKey = keys.shift();

						_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "set", this).call(this, _firstKey, _createBaseObject(this, _firstKey, _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "has", this).call(this, _firstKey) ? _get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "get", this).call(this, _firstKey) : {}, keys, 0, _checkDataRecursive(this, key, value)));
					}
			} else {

				if ("object" !== (typeof value === "undefined" ? "undefined" : _typeof(value)) || value instanceof Array) {
					_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "set", this).call(this, key, value);
				} else if (1 > Object.keys(value).length) {
					_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "set", this).call(this, key, {});
				}

				// check content recursivity
				else {
						_get(NodeContainerPattern.prototype.__proto__ || Object.getPrototypeOf(NodeContainerPattern.prototype), "set", this).call(this, key, _checkDataRecursive(this, key, value));
					}
			}

			return this;
		}
	}]);

	return NodeContainerPattern;
}(Map);