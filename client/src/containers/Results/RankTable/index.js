import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '0',
    overflowX: 'auto',
    boxShadow: 'none',
  },
  table: {
    minWidth: 300,
    boxShadow: 'none',
  },
  tableRoot: {
    boxShadow: 'none',
  },
});

let id = 0;
function createData(name, rank) {
  id += 1;
  return { id, name, rank };
}

const rows = [
  createData('Bonelwa Ngqawana', 77),
  createData('Cameron Rogers', 79),
  createData('Denice Ekdahl', 80),
  createData('Ingo Schimpff', 81),
  createData('Jagat Shahidullah', 82),
  createData('Loni Bowcher', 83),
  createData('Freddy Kauschke', 83),
];

function SimpleTable(props) {
  const { classes, isCheck } = props;

  return (
    <Paper className={classes.root}>
      <Table className={{ table: classes.table, root: classes.tableRoot }}>
        <TableHead>
          <TableRow>
            {isCheck && <TableCell padding="checkbox" />}
            <TableCell>{this.context.t('name')}</TableCell>
            <TableCell align="right">{this.context.t('rank')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {isCheck && (
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
              )}
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
