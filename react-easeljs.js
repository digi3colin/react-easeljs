(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "easeljs"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("easeljs"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.easeljs);
    global.ReactEaselJS = mod.exports;
  }
})(this, function (_exports, _react, _easeljs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.REBitmap = _exports.REText = _exports.REShape = _exports.REContainer = _exports.REDisplayObject = _exports.REStage = void 0;
  _react = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var REStage =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(REStage, _React$Component);

    function REStage(props) {
      var _this;

      _classCallCheck(this, REStage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(REStage).call(this, props));
      _this.state = {
        stageId: "stage".concat(Date.now()),
        view: new _easeljs.Container()
      };
      return _this;
    }

    _createClass(REStage, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.stage = new _easeljs.Stage(this.state.stageId);
        this.stage.scaleX = this.stage.scaleY = this.props.devicePixelRatio;
        this.stage.addChild(this.state.view);

        if (this.props.enableMouseOver) {
          this.stage.enableMouseOver();
        }

        if (this.props.autoUpdate) {
          _easeljs.Ticker.framerate = this.props.frameRate;
          _easeljs.Ticker.timingMode = _easeljs.Ticker.RAF_SYNCHED;

          _easeljs.Ticker.on('tick', function () {
            return _this2.stage.update();
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var canvasWidth = this.props.width * this.props.devicePixelRatio;
        var canvasHeight = this.props.height * this.props.devicePixelRatio;
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
          style: {
            width: "".concat(this.props.width, "px"),
            height: "".concat(this.props.height, "px"),
            pointerEvents: "none",
            position: 'absolute'
          }
        }, _react.default.Children.map(this.props.children, function (item) {
          return _react.default.cloneElement(item, {
            view: _this3.state.view
          });
        })), _react.default.createElement("canvas", {
          id: this.state.stageId,
          style: {
            width: "".concat(this.props.width, "px"),
            height: "".concat(this.props.height, "px")
          },
          width: canvasWidth,
          height: canvasHeight
        }));
      }
    }]);

    return REStage;
  }(_react.default.Component);

  _exports.REStage = REStage;

  _defineProperty(REStage, "defaultProps", {
    width: 100,
    height: 100,
    enableMouseOver: true,
    autoUpdate: true,
    frameRate: 30,
    devicePixelRatio: 1
  });

  var REDisplayObject =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(REDisplayObject, _React$Component2);

    function REDisplayObject(props) {
      var _this4;

      _classCallCheck(this, REDisplayObject);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(REDisplayObject).call(this, props));
      _this4.ref = _react.default.createRef();
      return _this4;
    }

    _createClass(REDisplayObject, [{
      key: "assignPropsToView",
      value: function assignPropsToView() {
        for (var name in this.props) {
          //skip this.props.children and this.props.view
          if (name === 'children') continue;

          if (this.props.hasOwnProperty(name) && this.state.view.hasOwnProperty(name)) {
            this.state.view[name] = this.props[name];
          }
        }
      }
    }, {
      key: "onRender",
      value: function onRender() {}
    }, {
      key: "onParentUpdate",
      value: function onParentUpdate() {}
    }, {
      key: "update",
      value: function update() {
        this.assignPropsToView();
        this.onRender();
        this.state.view.dispatchEvent('update');
        var style = this.getDebugStyle();

        for (var name in style) {
          this.ref.current.style[name] = style[name];
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.update();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.onParentUpdate = this.onParentUpdate.bind(this);
        this.props.view.addChild(this.state.view);
        this.props.view.on('update', this.onParentUpdate);
        this.update();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.view.removeChild(this.state.view);
        this.props.view.off('update', this.onParentUpdate);
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        for (var name in nextProps) {
          if (!nextProps.hasOwnProperty(name)) continue;

          if (name === 'children') {
            if (Array.isArray(nextProps.children) && nextProps.children.length !== this.props.children.length) {
              console.log('length diff');
              return true;
            }

            for (var n in nextProps.children.props) {
              if (!nextProps.children.props.hasOwnProperty(n)) continue;
              if (n === 'children') continue;

              if (nextProps.children.props[n] !== this.props.children.props[n]) {
                return true;
              }
            }

            continue;
          }

          if (nextProps[name] !== this.props[name]) {
            return true;
          }
        }

        for (var _name in nextState) {
          if (nextState.hasOwnProperty(_name) && nextState[_name] !== this.state[_name]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "childrenWithView",
      value: function childrenWithView() {
        var _this5 = this;

        return _react.default.Children.map(this.props.children, function (item) {
          return _react.default.cloneElement(item, {
            view: _this5.state.view
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement("div", {
          ref: this.ref
        }, this.childrenWithView());
      }
    }, {
      key: "getDebugStyle",
      value: function getDebugStyle() {
        var rect = this.state.view.getBounds();
        if (rect === null) return {};

        if (this.props.children !== undefined) {
          return {
            left: this.state.view.x + 'px',
            top: this.state.view.y + 'px',
            position: 'absolute'
          };
        }

        return {
          left: this.state.view.x + 'px',
          top: this.state.view.y + 'px',
          position: 'absolute',
          transform: "translate(".concat(rect.x, "px, ").concat(rect.y, "px)"),
          width: rect.width + 'px',
          height: rect.height + 'px'
        };
      }
    }]);

    return REDisplayObject;
  }(_react.default.Component);

  _exports.REDisplayObject = REDisplayObject;

  _defineProperty(REDisplayObject, "defaultProps", {
    view: new _easeljs.Container()
  });

  var REContainer =
  /*#__PURE__*/
  function (_REDisplayObject) {
    _inherits(REContainer, _REDisplayObject);

    function REContainer(props) {
      var _this6;

      _classCallCheck(this, REContainer);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(REContainer).call(this, props));
      _this6.state = {
        view: new _easeljs.Container()
      };
      return _this6;
    }

    return REContainer;
  }(REDisplayObject);

  _exports.REContainer = REContainer;

  var REShape =
  /*#__PURE__*/
  function (_REDisplayObject2) {
    _inherits(REShape, _REDisplayObject2);

    function REShape(props) {
      var _this7;

      _classCallCheck(this, REShape);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(REShape).call(this, props));
      _this7.state = {
        view: new _easeljs.Shape()
      };
      return _this7;
    }

    return REShape;
  }(REDisplayObject);

  _exports.REShape = REShape;

  var REText =
  /*#__PURE__*/
  function (_REDisplayObject3) {
    _inherits(REText, _REDisplayObject3);

    function REText(props) {
      var _this8;

      _classCallCheck(this, REText);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(REText).call(this, props));
      _this8.state = {
        view: new _easeljs.Text()
      };
      return _this8;
    }

    return REText;
  }(REDisplayObject);

  _exports.REText = REText;

  var REBitmap =
  /*#__PURE__*/
  function (_REDisplayObject4) {
    _inherits(REBitmap, _REDisplayObject4);

    function REBitmap(props) {
      var _this9;

      _classCallCheck(this, REBitmap);

      _this9 = _possibleConstructorReturn(this, _getPrototypeOf(REBitmap).call(this, props));
      _this9.state = {
        view: new _easeljs.Bitmap(_this9.props.src || null)
      };
      return _this9;
    }

    return REBitmap;
  }(REDisplayObject);

  _exports.REBitmap = REBitmap;
});

//# sourceMappingURL=ReactEaselJS.js.map