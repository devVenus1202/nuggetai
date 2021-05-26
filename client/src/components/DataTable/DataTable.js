import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell as _TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  Checkbox,
  Tooltip,
  TextField,
  InputAdornment,
  withStyles,
} from '@material-ui/core';
import './DataTable.scss';
import getDummyProfiles from './dummyData';
// import { cloneableGenerator } from 'redux-saga/utils';

const TableCell = withStyles(theme => ({
  root: {
    padding: '5px 10px 5px 10px',
  },
}))(_TableCell);

function desc(a, b, orderBy) {
  if (isNaN(a[orderBy])) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  } else {
    if (Number(b[orderBy]) < Number(a[orderBy])) {
      return -1;
    }
    if (Number(b[orderBy]) > Number(a[orderBy])) {
      return 1;
    }
  }

  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  // {
  //   id: 'last_name',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Name',
  // },
  { id: 'icons', numeric: false, disablePadding: false, label: '' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'rank', numeric: true, disablePadding: false, label: 'Rank' },
];
const rowsNonFullScreen = [
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  // {
  //   id: newFunction(),
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Name',
  // },
  { id: 'icons', numeric: false, disablePadding: false, label: '' },
  { id: 'rank', numeric: true, disablePadding: false, label: 'Rank' },
];

const candidates_rows = [
  { id: 'fullname', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'icons', numeric: false, disablePadding: false, label: '' },
  { id: 'rank', numeric: true, disablePadding: false, label: 'Rank' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  getTableRows = (type, isFullScreenPipeline) => {
    if (type === 1) {
      if (isFullScreenPipeline) {
        return rows;
      }
      return rowsNonFullScreen;
    }
    return candidates_rows;
  };

  render() {
    const {
      order,
      orderBy,
      type,
      isFullScreenPipeline,
      showCheckbox,
    } = this.props;

    const table_row = this.getTableRows(type, isFullScreenPipeline);

    return (
      <TableHead>
        <TableRow>
          {showCheckbox && (
            <TableCell padding="checkbox">
              {/* <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              /> */}
            </TableCell>
          )}

          {table_row.map(row => {
            if (row.id === 'rank' && this.props.benchmark) {
              return '';
            }
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

let EnhancedTableToolbar = props => {
  const {
    // numSelected,
    // profileData,
    // handleSettings,
    // showCheckbox,
    showSearchBar,
  } = props;
  // const highlighted = numSelected > 0 ? 'highlight_true' : 'highlight_false';

  return (
    <Toolbar className={`toolbarRoot `}>
      <div className="toolbar_title toolbar_spacer">
        {showSearchBar && (
          <TextField
            fullWidth
            label="Search Name"
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
            className="search_input"
            variant="outlined"
            onChange={event => props.searchHandler(event)}
          />
        )}
        {/* {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className="member_toolbar"
            variant="title"
            id="tableTitle"
          >
            <PeopleIcon />
            <span className="member_count">{profileData.length}</span>
          </Typography>
        )} */}
      </div>
      {/* <div className={'toolbar_actions'}>
        <Tooltip title="Setting">
          <IconButton aria-label="Setting" disabled={numSelected === 0}>
            <SettingsApplications onClick={handleSettings} />
          </IconButton>
        </Tooltip>
      </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  showSearchBar: PropTypes.bool,
};

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    const { data: profileData = getDummyProfiles(60, 1) } = props;

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: props.selectedUsers,
      data: profileData,
      originData: profileData,
      page: 0,
      rowsPerPage: 10,
    };
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      originData: props.data,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data && prevProps.data.length !== this.props.data.length) {
      this.setState({ data: this.props.data });
    }

    // if (
    //   this.props.selectedUsers &&
    //   prevProps.selectedUsers.length !== this.props.selectedUsers.length
    // ) {
    //   this.setState({
    //     selected: this.props.selectedUsers,
    //   });
    // }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (id, selection, ind, showSlide) => {
    const { selected, data } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    const currentUser = data.find(item => item.id === id);
    if (!showSlide) currentUser.isChecked = false; //onCheckRow

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      if (!showSlide) currentUser.isChecked = true; //onCheckRow
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });

    if (this.props.onSelectUser) {
      this.props.onSelectUser(currentUser);
    }
    if (selection && showSlide) {
      const firstName = data[ind].firstname;
      const lastName =
        !data[ind].lastname || data[ind].lastname === 'null'
          ? ''
          : data[ind].lastname;

      this.props.onShowSlidePane(
        data[ind].fullname || `${firstName} ${lastName}`,
        data[ind].rank,
        [
          Number(data[ind].skill_1),
          Number(data[ind].skill_2),
          Number(data[ind].skill_3),
          Number(data[ind].skill_4),
        ],
      );
    }
  };

  handleCheckRow = (event, checked, id, ind) => {
    this.handleClick(id, checked, ind);
    event.stopPropagation();
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSettings = () => {
    const { selected } = this.state;
    const { handleSettings } = this.props;

    handleSettings(selected);
  };

  isSelected = id => {
    return this.props.selectedUsers.find(user => user.id === id) !== undefined;
  };

  renderTableCells = (type, isFullScreen, n) => {
    const { benchmark } = this.props;
    const { fullname = '', firstname = '', lastname = '', email, id } = n;
    const cid = email;
    const isCandidate = type !== 1;

    const fullName = fullname;
    const firstName = firstname;
    const lastName = !lastname || lastname === 'null' ? '' : lastname;
    if (isCandidate) {
      // TODO: implement for tablecells for  canditate here
      return (
        <Fragment>
          <TableCell>{fullName || `${firstName} ${lastName}`}</TableCell>
          <TableCell>
            <i
              className={`fas fa-fire icons  ${n.state !== 3 ? 'hidden' : ''}`}
              onClick={e => {
                e.stopPropagation();
                this.setCommendation(cid, 3);
              }}
            />
            <i
              className={`far fa-thumbs-up thumbup icons far ${
                n.state !== 1 ? 'hidden' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                this.setCommendation(cid, 1);
              }}
            />
            <i
              className={`fa-thumbs-down thumbdown icons far ${
                n.state !== 2 ? 'hidden' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                this.setCommendation(cid, 2);
              }}
            />
          </TableCell>
          {!benchmark ? (
            <TableCell numeric={true}>{Number(n.rank)}</TableCell>
          ) : (
            ''
          )}
        </Fragment>
      );
    }
    if (type === 1) {
      if (isFullScreen) {
        return (
          <Fragment className="row">
            <TableCell>{fullName || `${firstName} ${lastName}`}</TableCell>
            <TableCell>
              <i
                className={`fas fa-fire icons  ${
                  n.state !== 3 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 3);
                }}
              />
              <i
                className={`far fa-thumbs-up thumbup icons far ${
                  n.state !== 1 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 1);
                }}
              />
              <i
                className={`fa-thumbs-down thumbdown icons far ${
                  n.state !== 2 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 2);
                }}
              />
            </TableCell>
            <TableCell>{n.email}</TableCell>
            {!benchmark ? <TableCell>{Number(n.rank)}</TableCell> : ''}
          </Fragment>
        );
      }
      if (!isFullScreen) {
        return (
          <Fragment>
            <TableCell>{fullName || `${firstName} ${lastName}`}</TableCell>
            <TableCell>
              <i
                className={`fas fa-fire icons  ${
                  n.state !== 3 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 3);
                }}
              />
              <i
                className={`far fa-thumbs-up thumbup icons far ${
                  n.state !== 1 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 1);
                }}
              />
              <i
                className={`fa-thumbs-down thumbdown icons far ${
                  n.state !== 2 ? 'hidden' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  this.setCommendation(cid, 2);
                }}
              />
            </TableCell>
            {!this.props.benchmark ? (
              <TableCell>{Number(n.rank)}</TableCell>
            ) : (
              ''
            )}
          </Fragment>
        );
      }
    }
  };
  searchHandler(event) {
    const { originData } = this.state;
    const filteredData = originData.filter(item => {
      if (!item || !item.fullname) {
        return false;
      }
      return item.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({ data: filteredData });
  }
  getGroup = rank => {
    if (rank <= 25) {
      return 'rank_25';
    }
    if (rank <= 75) {
      return 'rank_75';
    }
    if (rank <= 100) {
      return 'rank_100';
    }
    if (!rank) {
      return 'rank_no';
    }
  };

  setCommendation = (cid, type) => {
    const { userAction } = this.props;
    const { data } = this.state;
    const index = data.findIndex(item => {
      return item.email === cid;
    });
    if (index >= 0) {
      data[index].state = type;
      this.setState({ data });
    }
    if (userAction) {
      userAction(cid, type);
    }
  };
  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const {
      type,
      expanded,
      isFullScreenPipeline,
      showCheckbox,
      showSearchBar,
      className,
      // selectedUsers,
      highlightRow,
    } = this.props;

    return (
      <Paper className={`${className} tableRoot`}>
        {showSearchBar && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            profileData={this.state.data}
            handleSettings={this.handleSettings}
            showCheckbox={showCheckbox}
            showSearchBar={showSearchBar}
            searchHandler={this.searchHandler.bind(this)}
          />
        )}

        {expanded && (
          <Fragment>
            <div className={'tableWrapper'}>
              <Table className={'tableMain'} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                  type={type}
                  key={type}
                  isFullScreenPipeline={isFullScreenPipeline}
                  showCheckbox={showCheckbox}
                  benchmark={this.props.benchmark}
                />

                <TableBody>
                  {data
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n, index) => {
                      const id = n.id || index;
                      const isSelected = this.isSelected(id);

                      return (
                        <TableRow
                          hover
                          onClick={event =>
                            this.handleClick(id, true, index, true)
                          }
                          className={`${this.getGroup(n.rank)} user-row `}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isSelected}
                        >
                          {showCheckbox && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isSelected}
                                onClick={e => {
                                  e.stopPropagation();
                                }}
                                onChange={(event, checked) => {
                                  this.handleCheckRow(
                                    event,
                                    checked,
                                    id,
                                    index,
                                  );
                                }}
                              />
                            </TableCell>
                          )}
                          {this.renderTableCells(type, isFullScreenPipeline, n)}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Fragment>
        )}
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  selectedUsers: PropTypes.array,
  type: PropTypes.number,
  expanded: PropTypes.bool,
  isFullScreenPipeline: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  showSearchBar: PropTypes.bool,
  className: PropTypes.string,
  highlightRow: PropTypes.bool,
  benchmark: PropTypes.bool,
  onShowSlidePane: PropTypes.func,
  handleSettings: PropTypes.func,
};

EnhancedTable.defaultProps = {
  selectedUsers: [],
};

export default EnhancedTable;
