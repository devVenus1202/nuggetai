import React from 'react';
import Avatar from 'react-avatar-edit';
import { Grid } from '@material-ui/core';

class AvatarUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultPreview: null,
    };
    this.onCropDefault = this.onCropDefault.bind(this);
    this.onCloseDefault = this.onCloseDefault.bind(this);
  }

  onCropDefault(defaultPreview) {
    const { onChange } = this.props;

    this.setState({defaultPreview});
    onChange(defaultPreview);
  }

  onCloseDefault() {
    this.setState({defaultPreview: null});
  }

  render() {
    const { value } = this.props;

    return (
      <div className="container-fluid">
        <h5>Add/Update your Avatar</h5>
        <Grid container>
          <Grid item md={4}>
            <Avatar
              width={200}
              height={200}
              cropRadius={200}
              onCrop={this.onCropDefault}
              onClose={this.onCloseDefault}
            />
          </Grid>
          <Grid item md={3}>
            <h5>Preview</h5>
            <img alt="" style={{width: '100px', height: '100px'}}
            src={value}  
          />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AvatarUpload;