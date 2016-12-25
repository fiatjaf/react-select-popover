var React = require("react");

var HiddenSelectField = React.createClass({displayName: "HiddenSelectField",
  render: function() {
    var options = [];
    
    this.props.options.map(function(option) {
      var label = option.label,
          value = option.value;

        options.push(React.createElement("option", {key: value, value: value}, label));
    });

    var values = this.props.selectedValues

    return (
      React.createElement("select", {ref: "hiddenSelectBox", defaultValue: values, name: this.props.name, className: "hidden-select-box", multiple: "true"}, 
        options
      )
    )
  }
});

module.exports = HiddenSelectField;
