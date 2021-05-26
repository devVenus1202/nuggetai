import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  InputBase,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  MoreHoriz,
  CloudDownloadOutlined,
  ArchiveOutlined,
  DeleteOutline,
} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import './TestCard.scss';

const dummyKeywords = [
  'Digital banking',
  'Payment Gateway',
  'Credit cards',
  'Credit history',
];

const CustomInput = withStyles(theme => ({
  root: {
    width: '95%',
  },
  input: {
    border: 'solid 2px transparent',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: '1.25rem',
    width: '90%',
    height: 38,
    padding: 5,
    lineHeight: '1.43',
    letterSpacing: 'normal',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      color: '#424242',
    },
  },
}))(InputBase);

class TestCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardOptionOpen: null,
    };

    this.openCardOption = this.openCardOption.bind(this);
    this.handleCloseCardOption = this.handleCloseCardOption.bind(this);
  }
  handleClickTitle = event => {
    event.stopPropagation();
  };

  handleDeleteClick = () => {
    const { testId, handleDeleteClick } = this.props;
    handleDeleteClick(testId);
  };

  openCardOption(event) {
    event.stopPropagation();
    this.setState({ cardOptionOpen: event.currentTarget });
  }

  handleCloseCardOption(event) {
    event.stopPropagation();
    this.setState({ cardOptionOpen: null });
  }

  render() {
    const {
      image,
      title,
      time,
      keywords = dummyKeywords,
      removable,
      readOnly,
      onChangeTitle,
      editable = true,
      description,
      handleClickCard,
      testId,
      listMode,
    } = this.props;

    const { cardOptionOpen } = this.state;

    const cardOptions = [
      {
        text: 'export',
        action: event => {
          event.stopPropagation();
        },
        disabled: true,
        icon: <CloudDownloadOutlined />,
      },
      {
        text: 'archieve',
        action: event => {
          event.stopPropagation();
        },
        disabled: true,
        icon: <ArchiveOutlined />,
      },
      {
        text: 'delete',
        action: event => {
          event.stopPropagation();
          this.handleDeleteClick();
        },
        icon: <DeleteOutline />,
      },
    ];

    return (
      <div>
        <Card
          className={`card__wrapper ${listMode && 'list-mode'}`}
          onClick={() => handleClickCard(testId)}
        >
          <CardMedia
            className={'media'}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent className="card__content">
            <Grid
              className="title-wrapper"
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid xs={12}>
                <CustomInput
                  className="card__title"
                  onClick={this.handleClickTitle}
                  defaultValue={title}
                  onBlur={onChangeTitle}
                  readOnly={readOnly}
                />
                <IconButton
                  className="icon-options"
                  aria-label="More"
                  aria-owns={cardOptionOpen ? 'card-options' : undefined}
                  aria-haspopup="true"
                  onClick={this.openCardOption}
                >
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="card-options"
                  anchorEl={cardOptionOpen}
                  open={Boolean(cardOptionOpen)}
                  onClose={this.handleCloseCardOption}
                  className="card-options"
                  MenuListProps={{
                    disablePadding: true,
                  }}
                  PaperProps={{
                    style: {
                      padding: 0,
                      width: 197,
                      height: 'auto',
                      borderRadius: 5,
                      border: 'solid 1px #f4f4f4',
                      boxShadow: '5px 5px 30px 0 rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  disableAutoFocusItem
                >
                  {cardOptions.map(option => (
                    <MenuItem
                      className="option-item"
                      key={option.text}
                      onClick={!option.disabled ? option.action : () => {}}
                      disabled={option.disabled}
                    >
                      <ListItemIcon className="text-icon">
                        {option.icon}
                      </ListItemIcon>
                      <ListItemText
                        className="text-item"
                        inset
                        primary={this.context.t(option.text)}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>

              <Grid xs={12} className="chip_wrapper">
                {removable &&
                  keywords.map((val, index) => {
                    return (
                      <Chip
                        className="chip_style"
                        label={this.context.t(val)}
                        clickable
                        size="small"
                        key={index}
                      />
                    );
                  })}
              </Grid>
              <Grid xs={12}>
                <Typography component="p" className="timestamp">
                  {time}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TestCard.contextTypes = {
  t: PropTypes.func,
};

TestCard.propTypes = {
  testId: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  removable: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChangeTitle: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleClickCard: PropTypes.func,
  handleArchiveCard: PropTypes.func,
  handleExportCard: PropTypes.func,
  description: PropTypes.string.isRequired,
  listMode: PropTypes.bool,
};

export default TestCard;
