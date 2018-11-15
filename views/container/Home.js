"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactBootstrap = require("react-bootstrap");

var _Alarm = _interopRequireDefault(require("./Alarm"));

var _commonfunctions = _interopRequireDefault(require("../helpers/commonfunctions"));

require("isomorphic-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultAlarmObject = {
  id: Math.round(Math.random(10).toFixed()),
  hrs: 0,
  mins: 0,
  repeatOn: 'AllDays',
  setForDays: [],
  optedForSnooze: true,
  snoozeDelay: '',
  isActive: true
};

var Home =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Home)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      data: null,
      disableSave: false,
      currentTime: new Date(),
      showAlarmsFlag: false,
      addItemToAlarmList: defaultAlarmObject
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showAlarms", function () {
      _this.setState({
        showAlarmsFlag: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listAlarms", function () {
      if (_this.state.data && _this.state.data.alarms.length > 0) {
        return _this.state.data.alarms.map(function (alarm) {
          return _react.default.createElement(_Alarm.default, {
            key: alarm.id,
            setActiveFlag: _this.setActiveFlag,
            data: alarm
          });
        });
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setProp", function (event, prop) {
      var addItemToAlarmList = _objectSpread({}, _this.state.addItemToAlarmList);

      addItemToAlarmList[prop] = event.target.value;

      _this.setState({
        addItemToAlarmList: addItemToAlarmList
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddAlarm", function (event) {
      var data = _this.state.data;

      var addItemToAlarmList = _objectSpread({}, _this.state.addItemToAlarmList);

      var snoozeEle = _reactDom.default.findDOMNode(_this.refs.snooze).getElementsByClassName('snooze');

      addItemToAlarmList['optedForSnooze'] = snoozeEle ? snoozeEle[0].checked : false;

      if (_this.state.addItemToAlarmList.repeatOn !== 'Specific') {
        addItemToAlarmList['setForDays'] = daysEnums[_this.state.addItemToAlarmList.repeatOn];
      } else {
        var elements = _reactDom.default.findDOMNode(_this.refs.specificdays).getElementsByClassName('checkbox2');

        addItemToAlarmList['setForDays'] = [];

        for (var i = 0; i < elements.length; i++) {
          if (elements[i].checked) {
            addItemToAlarmList['setForDays'].push(elements[i].value);
          }
        }
      }

      data.alarms.push(addItemToAlarmList);

      _this.setState({
        data: data,
        disableSave: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setActiveFlag", function (id, value) {
      var data = _this.state.data;
      data.alarms.forEach(function (alarm) {
        if (alarm.id === id) {
          alarm.isActive = value;
        }
      });

      _this.setState({
        data: data
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addAlarmToList", function () {
      return _react.default.createElement(_reactBootstrap.Grid, {
        frameBorder: "true"
      }, _react.default.createElement(_reactBootstrap.Row, null, _react.default.createElement(_reactBootstrap.Col, {
        xs: 3
      }, "Alarm Time hours: ", _react.default.createElement("select", {
        value: _this.state.addItemToAlarmList.hrs,
        onChange: function onChange(event) {
          return _this.setProp(event, 'hrs');
        }
      }, _toConsumableArray(Array(24).keys()).map(function (x, y) {
        return _react.default.createElement("option", {
          key: y
        }, x);
      })), "minutes : ", _react.default.createElement("select", {
        value: _this.state.addItemToAlarmList.mins,
        onChange: function onChange(event) {
          return _this.setProp(event, 'mins');
        }
      }, _toConsumableArray(Array(60).keys()).map(function (x, y) {
        return _react.default.createElement("option", {
          key: y
        }, x);
      })))), _react.default.createElement(_reactBootstrap.Row, null, _react.default.createElement(_reactBootstrap.Col, {
        ref: "snooze",
        xs: 3
      }, "snooze : ", _react.default.createElement("input", {
        className: "snooze",
        value: _this.state.addItemToAlarmList.optedForSnooze,
        type: "checkbox",
        onChange: function onChange(event) {
          return _this.setProp(event, 'optedForSnooze');
        }
      })), _react.default.createElement(_reactBootstrap.Col, {
        xs: 3
      }, "repeat on :", _react.default.createElement("select", {
        value: _this.state.addItemToAlarmList.repeatOn,
        onChange: function onChange(event) {
          return _this.setProp(event, 'repeatOn');
        }
      }, Object.keys(daysEnums).map(function (x) {
        return _react.default.createElement("option", {
          key: x
        }, x);
      })))), _react.default.createElement(_reactBootstrap.Row, {
        ref: "specificdays"
      }, _react.default.createElement(_reactBootstrap.Col, {
        xs: 3
      }, days.map(function (day, index) {
        var alarmDays = daysEnums[_this.state.addItemToAlarmList.repeatOn] || 'AllDays';

        if (_this.state.addItemToAlarmList.repeatOn !== 'Specific') {
          return _react.default.createElement("div", {
            key: index
          }, _react.default.createElement("input", {
            type: "checkbox",
            value: day,
            checked: alarmDays.includes(day),
            disabled: true
          }), " ", day, " ");
        } else {
          return _react.default.createElement("div", {
            key: index
          }, _react.default.createElement("input", {
            type: "checkbox",
            className: "checkbox2"
          }), " ", day, " ");
        }
      }))), _react.default.createElement(_reactBootstrap.Row, null, _react.default.createElement(_reactBootstrap.Col, {
        xs: 3
      }, _react.default.createElement("input", {
        value: "Save",
        disabled: _this.state.disableSave,
        type: "submit",
        onClick: function onClick(event) {
          return _this.handleAddAlarm(event);
        }
      }))));
    });

    return _this;
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.state.data) {
        this.loadAlarms();
      }

      setInterval(function () {
        return _this2.setState({
          currentTime: new Date()
        });
      }, 1000);
    }
  }, {
    key: "loadAlarms",
    value: function loadAlarms() {
      var _this3 = this;

      fetch('http://localhost:3000/getAlarms').then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json) {
          _this3.setState({
            data: json
          });
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "renderTime",
    value: function renderTime() {
      return _react.default.createElement("div", null, _commonfunctions.default.formattedTime(this.state.currentTime));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement(_reactBootstrap.Grid, null, _react.default.createElement(_reactBootstrap.Row, null, _react.default.createElement(_reactBootstrap.Col, null, _react.default.createElement(_reactBootstrap.Col, null, _react.default.createElement("h1", null, this.renderTime())), _react.default.createElement(_reactBootstrap.Col, null, _react.default.createElement("button", {
        className: this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised',
        onClick: function onClick() {
          return _this4.showAlarms();
        }
      }, " Show Alarms "), _react.default.createElement("button", {
        className: !this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised',
        onClick: function onClick() {
          return _this4.setState({
            showAlarmsFlag: false,
            addItemToAlarmList: defaultAlarmObject,
            disableSave: false
          });
        }
      }, " Set Alarm ")), this.state.showAlarmsFlag && _react.default.createElement(_reactBootstrap.Col, null, this.listAlarms()), !this.state.showAlarmsFlag && _react.default.createElement(_reactBootstrap.Col, null, this.addAlarmToList()))));
    }
  }]);

  return Home;
}(_react.Component);

var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var daysEnums = {
  WeekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  WeekEnds: ['Saturday', 'Sunday'],
  AllDays: days,
  Specific: []
};
var _default = Home;
exports.default = _default;