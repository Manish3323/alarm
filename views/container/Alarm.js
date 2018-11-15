"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _commonfunctions = _interopRequireDefault(require("../helpers/commonfunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Alarm =
/*#__PURE__*/
function (_Component) {
  _inherits(Alarm, _Component);

  function Alarm() {
    _classCallCheck(this, Alarm);

    return _possibleConstructorReturn(this, _getPrototypeOf(Alarm).apply(this, arguments));
  }

  _createClass(Alarm, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props$data = this.props.data,
          id = _this$props$data.id,
          mins = _this$props$data.mins,
          hrs = _this$props$data.hrs,
          optedForSnooze = _this$props$data.optedForSnooze,
          setForDays = _this$props$data.setForDays,
          isActive = _this$props$data.isActive,
          alarmPassedForToday = _this$props$data.alarmPassedForToday;
      return _react.default.createElement(_reactBootstrap.Grid, null, _react.default.createElement(_reactBootstrap.Row, null, _react.default.createElement(_reactBootstrap.Col, {
        xs: 4,
        style: {
          border: '1px solid black',
          borderRadius: '0.5'
        }
      }, _react.default.createElement("div", {
        className: alarmPassedForToday ? 'red-background' : '',
        style: {
          color: 'black',
          paddingTop: '20px',
          paddingBottom: '20px'
        }
      }, _react.default.createElement("div", null, _react.default.createElement("input", {
        style: {
          paddingRight: '5px'
        },
        type: "checkbox",
        onChange: function onChange(event) {
          return _this.props.setActiveFlag(id, event.target.checked);
        },
        defaultChecked: isActive
      }), _react.default.createElement("h2", null, _commonfunctions.default.appendZero(hrs), " : ", _commonfunctions.default.appendZero(mins)), alarmPassedForToday && _react.default.createElement("div", {
        className: "pull-right"
      }, _react.default.createElement("h6", null, "Passed for today"))), _react.default.createElement("div", {
        className: "card-body"
      }, _react.default.createElement("div", null, "snooze ", optedForSnooze ? 'active' : 'inactive'), _react.default.createElement("div", null, "repeats on :", setForDays && setForDays.length > 0 && setForDays.map(function (each, index) {
        return _react.default.createElement("h6", {
          style: {
            display: 'inline-block',
            paddingLeft: '5px',
            paddingRight: '5px'
          },
          key: index
        }, " ", each.charAt(0));
      })))))));
    }
  }]);

  return Alarm;
}(_react.Component);

var _default = Alarm;
exports.default = _default;