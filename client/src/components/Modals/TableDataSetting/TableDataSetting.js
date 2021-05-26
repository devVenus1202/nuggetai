import React from 'react';
import PropTypes from 'prop-types';
import { 
  Typography,
  Modal,
  Button,
  MenuItem, 
  Select,
  FormControl
} from '@material-ui/core';
import './TableDataSetting.scss';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class TableDataSetting extends React.Component {
  constructor(props){
    super(props)
  }

  handleClose = () => {
    this.props.onCancel();
  };

  handleStart = () => {
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { show, pipelines } = this.props;
    return (
      <Modal
        className="startTest"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <div class="content_wrapper">
            <Typography variant="title" id="modal-title">
              Choose a pipeline to move
            </Typography>

            <FormControl className="pipeline__selector">
              <Select
                value={0}
                inputProps={{
                  name: 'pipeline_name',
                  id: 'pipeline_id',
                }}
              >
                {
                  pipelines.map((val, index) => {
                    return <MenuItem value={index}>{val.title}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="form">
            <Button
              className="start_but"
              variant="contained"
              color="default"
              onClick={this.handleStart}
            >
              Ok
            </Button>

            <Button
              className="cancel_but"
              variant="contained"
              color="default"
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

TableDataSetting.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default TableDataSetting;