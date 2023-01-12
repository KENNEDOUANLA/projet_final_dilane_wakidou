function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var ButtonComponent = function ButtonComponent(props) {
  var onClick = props.onClick,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    children = props.children;
  var handelClick = function handelClick(e) {
    if (onClick) onClick(e);
  };
  return React__default.createElement("button", {
    className: "component-ui-button",
    onClick: function onClick(e) {
      return handelClick(e);
    },
    style: _extends({
      backgroundColor: "#C00000",
      color: "white"
    }, style)
  }, children);
};

var RadioComponent = function RadioComponent(props) {
  var _props$name = props.name,
    name = _props$name === void 0 ? "radio" : _props$name,
    _props$label = props.label,
    label = _props$label === void 0 ? "radio description" : _props$label,
    value = props.value,
    onChange = props.onChange,
    checked = props.checked;
  var onHandleChange = function onHandleChange(e) {
    if (onChange) {
      onChange(e);
    }
  };
  return React__default.createElement("div", {
    className: "component-ui-radio"
  }, React__default.createElement("input", {
    type: "radio",
    name: name,
    className: "component-ui-radio-input",
    value: value,
    onChange: onHandleChange,
    checked: checked
  }), React__default.createElement("span", {
    className: "component-ui-radio-span"
  }, label));
};

var CheckboxComponent = function CheckboxComponent(props) {
  var _props$name = props.name,
    name = _props$name === void 0 ? "" : _props$name,
    _props$label = props.label,
    label = _props$label === void 0 ? "j’atteste que je possède un permis de conduire valide." : _props$label,
    onChange = props.onChange;
  var onHandleChange = function onHandleChange(e) {
    if (onChange) {
      onChange(e);
    }
  };
  return React__default.createElement("div", {
    className: "component-ui-checkbox"
  }, React__default.createElement("input", {
    type: "checkbox",
    name: name,
    className: "component-ui-checkbox-input",
    onChange: function onChange(e) {
      return onHandleChange(e);
    }
  }), React__default.createElement("span", {
    className: "component-ui-checkbox-span"
  }, label));
};

var InputComponent = function InputComponent(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? "text" : _props$type,
    value = props.value,
    _props$label = props.label,
    label = _props$label === void 0 ? "Name" : _props$label,
    name = props.name,
    _props$onChange = props.onChange,
    _onChange = _props$onChange === void 0 ? function (e) {
      console.log("onchange function absend", e.target.value);
    } : _props$onChange;
  var _useState = React.useState(false),
    active = _useState[0],
    setActive = _useState[1];
  return React__default.createElement("div", {
    className: active ? "component-ui-input component-ui-input-active" : "component-ui-input",
    onClick: function onClick() {
      return setActive(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setActive(false);
    }
  }, React__default.createElement("span", {
    className: "component-ui-input-span"
  }, label), React__default.createElement("input", {
    className: "component-ui-input-input",
    name: name,
    type: type,
    value: value,
    onChange: function onChange(e) {
      return _onChange(e);
    }
  }));
};

var SelectComponent = function SelectComponent(props) {
  var _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data,
    _props$label = props.label,
    label = _props$label === void 0 ? "select" : _props$label,
    onSelected = props.onSelected;
  var _useState = React.useState(""),
    selected = _useState[0],
    setSelected = _useState[1];
  var _useState2 = React.useState(false),
    showItems = _useState2[0],
    setShowItems = _useState2[1];
  var _useState3 = React.useState(data),
    datas = _useState3[0],
    setDatas = _useState3[1];
  React.useEffect(function () {
    if (data.length && onSelected) {
      setSelected(datas[0].label);
      onSelected(datas[0].value);
    }
  }, []);
  var HandleSelected = function HandleSelected(e) {
    var index = parseInt(e.target.value);
    setSelected(datas[index].label);
    setShowItems(false);
    if (onSelected) {
      onSelected(datas[index].value);
    }
  };
  var Filter = function Filter(search_value) {
    setDatas(data.filter(function (data) {
      return data.label.toString().toLowerCase().includes(search_value.toLowerCase().trim());
    }));
  };
  return React__default.createElement("div", {
    className: "component-ui-select"
  }, React__default.createElement("div", {
    className: "component-ui-select-result",
    onClick: function onClick() {
      return setShowItems(!showItems);
    }
  }, React__default.createElement("div", {
    className: "component-ui-select-result-text"
  }, React__default.createElement("span", {
    className: "component-ui-select-span"
  }, label), React__default.createElement("span", {
    className: "component-ui-select-span-value"
  }, selected)), React__default.createElement("div", null, React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    className: "bi bi-chevron-down",
    viewBox: "0 0 16 16"
  }, React__default.createElement("path", {
    fillRule: "evenodd",
    d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
  })))), React__default.createElement("div", {
    className: showItems ? "component-ui-select-items" : "hide"
  }, React__default.createElement("input", {
    type: "text",
    name: "search",
    className: "component-ui-select-items-search",
    placeholder: "Search ...",
    onChange: function onChange(e) {
      return Filter(e.target.value);
    }
  }), datas.map(function (value, index) {
    return React__default.createElement("option", {
      className: "component-ui-select-items-span",
      value: index,
      key: index,
      onClick: function onClick(e) {
        return HandleSelected(e);
      }
    }, value.label);
  })));
};

exports.ButtonComponent = ButtonComponent;
exports.CheckboxComponent = CheckboxComponent;
exports.InputComponent = InputComponent;
exports.RadioComponent = RadioComponent;
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=index.js.map
