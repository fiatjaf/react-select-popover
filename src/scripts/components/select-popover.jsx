var HiddenSelectField   = require("./hidden-select-field"),
    SelectBox           = require("./select-box"),
    Popover             = require("./popover"),
    React               = require("react");


var SelectPopover = React.createClass({
  propTypes: {
    options             : React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    value               : React.PropTypes.oneOfType([
                            React.PropTypes.string,
                            React.PropTypes.number,
                            React.PropTypes.arrayOf(React.PropTypes.oneOfType([
                              React.PropTypes.string,
                              React.PropTypes.number
                            ]))
                          ]),
    name                : React.PropTypes.string,
    selectPlaceholder   : React.PropTypes.string,
    componentClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    selectBoxClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    popoverClassNames   : React.PropTypes.arrayOf(React.PropTypes.string),
    onChange            : React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
        options             : [],
        value               : [],
        name                : "react-select-popover",
        selectPlaceholder   : "Choose some options",
        componentClassNames : ["react-select-popover"],
        selectBoxClassNames : ["select-input"],
        popoverClassNames   : ["popover", "arrow-top"],
    }
  },

  getInitialState: function() {
    return {
      searchTerm        : "",
      selectedValues    : this.valueAsArray(this.props.value),
      focus             : "out"
    }
  },

  valueAsArray: function () {
    return this.props.value
      ? (Array.isArray(this.props.value) ? this.props.value : [this.props.value])
      : []
  },

  willReceiveProps: function (nextProps) {
    this.setState({
      selectedValues: this.valueAsArray(nextProps.value)
    });
  },

  selectValue: function(selectedObj) {  
    var selectedValues = this.state.selectedValues;
    selectedValues.push(selectedObj.value);
    
    this.setState({
      selectedValues: selectedValues,
      searchTerm: ""
    });

    this.triggerOnChange({
      event: "added",
      item: selectedObj,
      value: this.state.selectedValues
    });

  },
  
  unselectValue: function(objToUnselect) {
    var selectedValues = this.state.selectedValues;

    objToUnselect = objToUnselect || selectedValues[selectedValues.length - 1] || {};
    var index = selectedValues.indexOf(objToUnselect).value;
    if (index !== -1) {
      selectedValues.splice(index, 1);
    
      this.setState({
        selectedValues: selectedValues
      });

      this.triggerOnChange({
        event: "removed",
        item: objToUnselect,
        value: this.state.selectedValues
      });
    }
  },

  handleSearch: function(term) {
    this.setState({
      searchTerm: term
    });
  },
  
  focusIn: function() {
    this.setState({
      focus: "in"
    });
  },
  
  focusOut: function() {
    this.setState({
      focus: "out",
      searchTerm: ""
    });
  },
  
  triggerOnChange: function(eventObject) {
    if(this.props.onChange) {
      this.props.onChange(eventObject);
    }
  },
  
  render: function() {
    var labelsByValue = {}
    for (var i = 0; i < this.props.options.length; i++) {
      labelsByValue[this.props.options[i].value] = this.props.options[i].label;
    }

    return (
      <div className="react-select-popover">
        <HiddenSelectField 
            selectedValues={this.state.selectedValues} 
            name={this.props.name} 
            options={this.props.options} 
        />
        
        <SelectBox 
            selectedValues={this.state.selectedValues} 
            labelsByValue={labelsByValue}
            unselectValue={this.unselectValue} 
            handleSearch={this.handleSearch} 
            searchTerm={this.state.searchTerm} 
            focusIn={this.focusIn} 
            focus={this.state.focus} 
            focusOut={this.focusOut}
            selectPlaceholder={this.props.selectPlaceholder}
            selectBoxClassNames={this.props.selectBoxClassNames}
        />
        
        <Popover 
            options={this.props.options} 
            selectedValues={this.state.selectedValues} 
            selectValue={this.selectValue} 
            searchTerm={this.state.searchTerm} 
            focus={this.state.focus} 
            popoverClassNames={this.props.popoverClassNames}
        />
        
      </div>
    )
  }
});

module.exports = SelectPopover;
