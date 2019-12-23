import React from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    fontFamily: "Cabin, sans-serif"
  },
});

function table (props) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((item, i) => (
              <TableCell align="left" key={i}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default table