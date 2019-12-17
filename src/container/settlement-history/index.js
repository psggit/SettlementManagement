import React, { useState } from "react"
import Table from "Components/table"
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Moment from "moment"
import { fade, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const data = [
  {
    settlement_id: "#135246",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135247",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "Wallet"
  },
  {
    settlement_id: "#135248",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  },
  {
    settlement_id: "#135249",
    settlement_date: "2019-12-17T07:20:36.822425+05:30",
    settlement_utr: "#123456789011",
    account_no: "HDFC101240598",
    settlement_amount: "₹ 24,579",
    retailer_id: "147074",
    total_transactions: "157",
    settlement_type: "UPI"
  }
]

const tableHeaders = [
  "Settlement ID",
  "Date & Time",
  "Settlement UTR",
  "Bank Account Number",
  "Settlement Amount",
  "Retailer ID",
  "Total Transactions",
  "Settlement Type"
]

function settlementHistory () {

  const [offset, setOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    console.log("offset", newPage * rowsPerPage)
    setOffset(newPage * rowsPerPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    console.log("page", event.target.value, parseInt(event.target.value, 10))
    setRowsPerPage(event.target.value)
    setPage(0);
  };

  const handleRowClick = event => {
   // props.history.push(`/home/settlement-breakup`)
  }

  // const searchInputWidth = 200
  const useStyles = makeStyles(theme => ({
    paper: {
      //paddingBottom: 20,
    },
    // header: {
    //   display: "flex",
    //   alignItems: "center",

    //   '& p': {
    //     fontWeight: "600"
    //   }
    // },
    // search: {
    //   position: 'relative',
    //   borderRadius: theme.shape.borderRadius,
    //   backgroundColor: fade(theme.palette.secondary.light, 0.15),
    //   '&:hover': {
    //     backgroundColor: fade(theme.palette.common.white, 0.25),
    //   },
    //   marginRight: theme.spacing(2),
    //   marginLeft: 0,
    //   width: '100px',
    //   [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    //   },
    // },
    // searchIcon: {
    //   width: theme.spacing(7),
    //   height: '100%',
    //   position: 'absolute',
    //   pointerEvents: 'none',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // inputRoot: {
    //   color: 'inherit',
    // },
    // inputInput: {
    //   padding: theme.spacing(1, 1, 1, 7),
    //   transition: theme.transitions.create('width'),
    //   width: '1',
    //   [theme.breakpoints.up('md')]: {
    //     width: 200,
    //   },
    // }
  }))

  const classes = useStyles();

  return (
    <div id="SettlementHistory">
      <Paper className={classes.paper}>
        {/* <div>
          <div className={classes.header}>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <p>Apply Filter</p>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div> */}
        <Table tableHeaders={tableHeaders}>
          {data.map((data, index) => {
            return (
              <TableRow key={index} >
                <TableCell component="th" scope="row" align="left">
                  {data.settlement_id}
                </TableCell>
                <TableCell align="left">{Moment(data.settlement_date).format("DD/MM/YYYY h:mm a")}</TableCell>
                <TableCell align="left">{data.settlement_utr}</TableCell>
                <TableCell align="left">{data.account_no}</TableCell>
                <TableCell align="left">{data.settlement_amount}</TableCell>
                <TableCell align="left">{data.retailer_id}</TableCell>
                <TableCell align="left">{data.total_transactions}</TableCell>
                <TableCell align="left">{data.settlement_type}</TableCell>
              </TableRow>   
            )
          })}
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default settlementHistory