var SelectBoxItem       = require("./select-box-item"),
    SelectInput         = require("./select-input"),
    detectOutsideClicks = require('react-click-outside'),
    React               = require("react");

var SelectBox = detectOutsideClicks(React.createClass({
  handleClickOutside: function(evt) {
    this.props.focusOut();
  },

  handleClick: function() {
    this.props.focusIn();
  },

  
  render: function() {
    var selectedItems = this.props.selectedValues.map(function(value) {
      var label = this.props.labelsByValue[value],
          value = value;

      return (
        React.createElement(SelectBoxItem, {label: label, value: value, key: value, unselectValue: this.props.unselectValue})
      )
    }, this);
    
    var classNames = this.props.selectBoxClassNames;

    if(!selectedItems.length && this.props.focus != "in") {
        selectedItems = React.createElement("p", {className: "empty-list"}, this.props.selectPlaceholder)
    }
    
    return (
      React.createElement("div", {className: classNames.join(" ") + (this.props.focus == "in" ? " active" : ""), onClick: this.handleClick}, 

        selectedItems, 
        
        React.createElement(SelectInput, {
            focus: this.props.focus, 
            searchTerm: this.props.searchTerm, 
            handleSearch: this.props.handleSearch, 
            unselectValue: this.props.unselectValue}
        )
        
      )
    )
  }
}));


module.exports = SelectBox;
