import React from 'react';
import PropTypes, { func } from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { items } from '../../CreateTest/Steps/data';

// const activeChallenges = items.filter(i => i.active);
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelects extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      age: '',
      name: 'hai',
      labelWidth: 0,
      currentItem: 0,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({ currentItem: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(this.props.data[event.target.value]);
    }
  };

  render() {
    const { classes, data } = this.props;
    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            {this.context.t('select-pipeline')}
          </InputLabel>
          <Select
            native
            value={this.state.currentItem}
            onChange={this.handleChange('age')}
            input={
              <OutlinedInput
                name="age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            {data.map((c, key) => (
              <option key={c.title} value={key}>
                {this.context.t(c.title)}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: func,
};
NativeSelects.contextTypes = {
  t: PropTypes.func,
};
export default withStyles(styles)(NativeSelects);
