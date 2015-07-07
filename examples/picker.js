
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-calendar/assets/bootstrap.css';
import React from 'react';
import Calendar, {Picker as DatePicker} from 'rc-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/src/locale/zh-cn';

var Test = React.createClass({
  toggle: function () {
    this.refs.picker.toggle();
  },

  handleChange: function (value) {
    console.log('DatePicker change: ' + (value && this.props.formatter.format(value)));
  },

  handleCalendarSelect: function (value) {
    console.log('calendar select: ' + (value && this.props.formatter.format(value)));
    // controlled value
    this.setState({
      time: Date.now(),
      value: value
    });
  },

  getDefaultProps: function () {
    return {
      formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
    }
  },

  getInitialState: function () {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
      value: value
    };
  },

  handleShowTimeChange: function (e) {
    this.setState({
      showTime: e.target.checked
    });
  },

  render: function () {
    var state = this.state;
    var calendar = <Calendar locale={CalendarLocale}
      orient={['top', 'left']}
      showTime={this.state.showTime} onSelect={this.handleCalendarSelect} onClear={this.handleCalendarSelect.bind(this, null)} showClear={true}/>;
    return <div className="form-group" style={{width: 400, margin: 20}} data-time={this.state.time}>
      <div className="input-group">
        <span>
          <input type='checkbox' checked={this.state.showTime} onChange={this.handleShowTimeChange} />
          showTime</span>
      </div>
      <div className="input-group">
        <DatePicker ref='picker'
          formatter={this.props.formatter} calendar={calendar}
          value={state.value} onChange={this.handleChange}>
          <input
            placeholder="please select date"
            className="form-control rc-calendar-picker-input"/>
        </DatePicker>
        <span className="input-group-addon"
          style={{'-webkit-user-select': 'none'}}
          onMouseDown={prevent}
          unselectable="unselectable"
          onClick={this.toggle}>
          <span className="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
    </div>;
  }
});

function prevent(e) {
  e.preventDefault();
}

React.render(<div>
  <h2>zh-cn</h2>
  <Test />
</div>, document.getElementById('__react-content'));
