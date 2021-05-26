import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Grid,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { dummySeriesTitles } from '../Results/graphData';

export default class GraphLegends extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    filters: PropTypes.array,
    isSwitch: PropTypes.bool,
    checkedLegend: PropTypes.array,
  };

  handleChange = path => event => {
    const { onChange } = this.props;
    onChange(path);
  };

  render() {
    const { isSwitch, filters, checkedLegend } = this.props;
    return (
      <div style={{ margin: '20px 20px' }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Shape</FormLabel> */}
              <FormGroup>
                {filters.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    control={
                      isSwitch ? (
                        <Switch
                          checked={checkedLegend.includes(item.value)}
                          onChange={this.handleChange(item.value)}
                          value={item.value}
                        />
                      ) : (
                        <Checkbox
                          checked={checkedLegend.includes(item.value)}
                          onChange={this.handleChange(item.value)}
                          value={item.value}
                          color="primary"
                        />
                      )
                    }
                    label={
                      <Typography
                        component="div"
                        style={{
                          padding: '5px',
                          borderRadius: '4px',
                          borderColor: item.color,
                          borderStyle: 'solid',
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
              {/* <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.shape.circle}
                        onChange={this.handleChange('shape.circle')}
                        value="circle"
                      />
                    ) : (
                      <Checkbox
                        checked={value.shape.circle}
                        onChange={this.handleChange('shape.circle')}
                        value="circle"
                        color="primary"
                      />
                    )
                  }
                  label="Meticulousness and Assertiveness"
                />
                <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.shape.triangle}
                        onChange={this.handleChange('shape.triangle')}
                        value="triangle"
                      />
                    ) : (
                      <Checkbox
                        checked={value.shape.triangle}
                        onChange={this.handleChange('shape.triangle')}
                        value="triangle"
                        color="primary"
                      />
                    )
                  }
                  label="Creativity and passion"
                />
                <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.size.small}
                        onChange={this.handleChange('size.small')}
                        value="small"
                      />
                    ) : (
                      <Checkbox
                        checked={value.size.small}
                        onChange={this.handleChange('size.small')}
                        value="small"
                        color="primary"
                      />
                    )
                  }
                  label="Not Top Performer"
                />
                <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.size.big}
                        onChange={this.handleChange('size.big')}
                        value="big"
                      />
                    ) : (
                      <Checkbox
                        checked={value.size.big}
                        onChange={this.handleChange('size.big')}
                        value="big"
                        color="primary"
                      />
                    )
                  }
                  label="Top Performer"
                />
                <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.color[0]}
                        onChange={this.handleChange('color.0')}
                        value="0"
                      />
                    ) : (
                      <Checkbox
                        checked={value.color[0]}
                        onChange={this.handleChange('color.0')}
                        value="0"
                        color="primary"
                      />
                    )
                  }
                  label={dummySeriesTitles[0]}
                />
                <FormControlLabel
                  control={
                    isSwitch ? (
                      <Switch
                        checked={value.color[1]}
                        onChange={this.handleChange('color.1')}
                        value="1"
                      />
                    ) : (
                      <Checkbox
                        checked={value.color[0]}
                        onChange={this.handleChange('color.0')}
                        value="0"
                        color="primary"
                      />
                    )
                  }
                  label={dummySeriesTitles[1]}
                /> */}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}
GraphLegends.defaultProps = {
  filters: [],
};
