var PopoverItem = require("./popover-item"),
    React       = require("react");

var Popover = React.createClass({displayName: "Popover",
  render: function() {
    var tags = [];
    var searchTerm = this.props.searchTerm.toString().toLowerCase();

    this.props.options.forEach(function(option) {
      var label = option.label,
          value = option.value,
          labelSlug = label.toString().toLowerCase();

      if(this.props.selectedValues.indexOf(option.value) !== -1 || (searchTerm && labelSlug.indexOf(searchTerm) == -1 ) ) return;

      tags.push(React.createElement(PopoverItem, {key: value, label: label, value: value, selectValue: this.props.selectValue}));
    }, this);
    
    if(!tags.length) {
      tags.push(React.createElement("span", {key: "none", className: "empty-list"}, "No Options to show"));
    }
    
    var classNames = this.props.popoverClassNames;
    if(classNames.indexOf("ignore-react-onclickoutside") == -1) {
      classNames.push("ignore-react-onclickoutside");
    }

    var style = {
      display: (this.props.focus == "in" ? "block" : "none")
    };
    
    return (
      React.createElement("div", {className: classNames.join(" "), style: style}, 
        tags
      )
    )
  }
});

module.exports = Popover;
