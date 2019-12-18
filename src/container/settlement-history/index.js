import React, { useState } from "react"
import Table from "Components/table"
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CrossIcon from '@material-ui/icons/HighlightOff';
import Moment from "moment"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const data = [
  {
    settlement_id: "135246",
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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "20px",
  },
  tableRow: {
    cursor: "pointer",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 0px"
    //justifyContent: "space-between",
  },
  autocomplete: {
    marginRight: "50px"
  },
  search: {
    width: "300px",
    //height: "38px",
    //backgroundColor: theme.palette.primary.light,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.15),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: "pointer",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    height: "38px",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
  }
}))

function settlementHistory(props) {

  const [offset, setOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterField, setFilterField] = useState("")
  const [filterValue, setFieldValue] = useState("")

  const classes = useStyles();

  const searchOptions = [
    { title: 'Settlement ID', value: 'settlement_id' },
    { title: 'Retailer ID', value: 'retailer_id' },
    { title: 'Account Number', value: 'account_no' },
    { title: 'Settlement Type', value: 'settlement_type' }
  ]

  const handleSearchChange = (event, option) => {
    console.log("select change", option)
    setFilterField(option.value)
  }

  const handleTextChange = (event) => {
    setFieldValue(event.target.value)
    console.log("text change", event.target.value)
  }

  const resetFilterValue = (event) => {
    setFieldValue("")
  }

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

  const handleRowClick = (event, data) => {
    props.history.push(`/home/settlement-breakup/${data.settlement_id}`, data)
  }

  const handlePress = (event) => {
    if(event.keyCode === 13) {
      console.log("Do search")
    }
  }

  return (
    <div id="SettlementHistory">
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Autocomplete
            id="combo-box-demo"
            options={searchOptions}
            className={classes.autocomplete}
            onChange={handleSearchChange}
            getOptionLabel={option => option.title}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Search By" variant="outlined" fullWidth />
            )}
          />
          {
            filterField.length > 0 &&
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
                value={filterValue}
                onChange={handleTextChange}
                onKeyDown={handlePress}
                inputProps={{ 'aria-label': 'search' }}
              />
              {
                filterValue.length > 0 &&
                <div className={classes.crossIcon} onClick={resetFilterValue}>
                  <CrossIcon />
                </div>
              }
            </div>
          }
        </div>
        <Table tableHeaders={tableHeaders}>
          {data.map((data, index) => {
            return (
              <TableRow hover className={classes.tableRow} key={index} onClick={(event) => handleRowClick(event, data)}>
                <TableCell component="th" scope="row" align="left">
                  <u>{data.settlement_id}</u>
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