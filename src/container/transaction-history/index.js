import React, { useState, useEffect } from "react"
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
import { fetchTransactionHistory } from "../api"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"

// const data = [
//   {
//     settlement_id: "135246",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135247",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "Wallet"
//   },
//   {
//     settlement_id: "#135248",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   },
//   {
//     settlement_id: "#135249",
//     settlement_date: "2019-12-17T07:20:36.822425+05:30",
//     settlement_utr: "#123456789011",
//     account_no: "HDFC101240598",
//     settlement_amount: "₹ 24,579",
//     retailer_id: "147074",
//     total_transactions: "157",
//     settlement_type: "UPI"
//   }
// ]

const tableHeaders = [
  "UPI Transaction ID",
  "Date & Time",
  "Bank Account Number",
  "Retailer ID",
  "Amount"
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

  const activePage = getQueryParamByName("activePage") || 0
  const itemsPerPage = getQueryParamByName("itemsPerPage") || 5
  const [transactionHistory, setTransactionHistory] = useState([])
  const [pageNo, setPageNo] = useState(activePage)
  const [rowsPerPage, setRowsPerPage] = React.useState(itemsPerPage);
  const [offset, setOffset] = useState(getOffsetUsingPageNo(activePage, itemsPerPage))
  const [totalCount, setTotalCount] = useState(0)
  const [filterField, setFilterField] = useState("")
  const [filterValue, setFieldValue] = useState("")
  const classes = useStyles();

  const searchOptions = [
    { title: 'UPI Transaction ID', value: 'upi_transaction_id' },
    { title: 'Retailer ID', value: 'retailer_id' },
    { title: 'Account Number', value: 'account_no' },
    { title: 'UPI Reference Number', value: 'upi_reference_no' }
  ]

  useEffect(() => {
    fetchRetailerTransactionHistory()
  }, [rowsPerPage, offset])

  const fetchRetailerTransactionHistory = () => {
    const payload = {
      Limit: rowsPerPage,
      Offset: offset,
      RetailerID: 93
    }
    fetchTransactionHistory(payload)
    .then((response) => {
      setTransactionHistory(response.transactions)
      setTotalCount(response.Count)
    })
    .catch((error) => {
      console.log("error", error)
    })
  }

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
    setOffset(newPage * rowsPerPage)
    setPageNo(newPage)
    const queryParamsObj = {
      activePage: newPage,
      itemsPerPage: rowsPerPage
    }
    history.pushState(queryParamsObj, "transaction history listing", `/home/transaction-history${getQueryUri(queryParamsObj)}`)
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    setPageNo(0);
    const queryParamsObj = {
      activePage: 0,
      itemsPerPage: event.target.value
    }
    history.pushState(queryParamsObj, "transaction history listing", `/home/transaction-history${getQueryUri(queryParamsObj)}`)
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
          {transactionHistory.map((data, index) => {
            return (
              <TableRow hover className={classes.tableRow} key={index} onClick={(event) => handleRowClick(event, data)}>
                <TableCell component="th" scope="row" align="left">
                  <u>{data.order_id}</u>
                </TableCell>
                {/* <TableCell align="left">{Moment(data.order_type).format("DD/MM/YYYY h:mm a")}</TableCell> */}
                <TableCell align="left">{data.order_type}</TableCell>
                <TableCell align="left">{data.consumer_id}</TableCell>
                <TableCell align="left">{data.cart_total}</TableCell>
                <TableCell align="left">{data.gift_wallet_amount}</TableCell>
              </TableRow>
            )
          })}
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={1000}
          rowsPerPage={parseInt(rowsPerPage)}
          page={parseInt(pageNo)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default settlementHistory