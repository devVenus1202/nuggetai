import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/icons';
import ColorPicker from 'material-ui-color-picker';
import 'rc-color-picker/assets/index.css';
import {
  Typography,
  Modal,
  Button,
  TextField,
  Switch,
} from '@material-ui/core';
import './AddPipelineModal.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class AddPipelineModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pipName: '',
      benchmark: true,
      color: '#000',
    };
  }

  handleAdd = () => {
    const { pipName, benchmark, color } = this.state;
    this.props.onAdd(pipName, benchmark, color);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  handleChangeSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  changeHandler(color) {
    this.setState({ color: color });
  }
  render() {
    const { show } = this.props;
    return (
      <Modal
        className="AddPipeline"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <div className="pipeline_header">
            <Typography variant="title" id="modal-title">
              Create New Pipeline
            </Typography>
            {/* <Button variant="contained" size="small" className="copy-link">
              Copy Link
              <Link />
            </Button> */}
          </div>

          <div className="pipeline_data">
            <div className="pipeline_name">
              <div className="data_label">Pipeline Name</div>
              <TextField
                id="pip_name"
                className="input_name"
                label="Input Name"
                variant="outlined"
                value={this.state.pipName}
                onChange={this.handleChange('pipName')}
                margin="normal"
              />
            </div>
            <div className="pipeline_color">
              <div className="data_label">Color</div>
              <div
                className="color-picker"
                style={{ backgroundColor: this.state.color }}
              >
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  value={this.state.color}
                  onChange={color => {
                    this.changeHandler(color);
                  }}
                  TextFieldProps={{ disabled: 'true' }}
                />
              </div>
            </div>
          </div>
          <div className="form">
            <Button
              className="start_but"
              variant="contained"
              onClick={this.handleAdd}
              color="primary"
              size="large"
            >
              Done
            </Button>

            <Button
              className="cancel_but"
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

AddPipelineModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default AddPipelineModal;
