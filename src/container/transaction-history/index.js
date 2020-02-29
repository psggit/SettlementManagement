import React, { useState, useEffect } from "react"
import Table from "Components/table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import CrossIcon from "@material-ui/icons/HighlightOff"
import Moment from "moment"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles } from "@material-ui/core/styles"
import { fetchTransactionHistory } from "../api"
import TableLoadingShell from "Components/tableLoadingShell"
import Pagination from "Components/pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Notification from "Components/notification"

const tableHeaders = [
  { label: "UTR", value: "utr"},
  { label: "Date & Time", value: "date_time" },
  { label: "Bank Account Number", value: "account_no" },
  { label: "Retailer ID", value: "retailer_id" },
  { label: "Transaction Amount", value: "payer_amount" }
]

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "24px 24px 36px 24px"
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 0px"
  },
  autocomplete: {
    marginRight: "50px"
  },
  search: {
    width: "300px",
    backgroundColor: "#fafafa",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    height: "34px",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width")
  }
}))

function transactionHistoryList(props) {

  const pageLimit = 10
  const activePage = getQueryParamByName("activePage") || 1
  const [transactionHistory, setTransactionHistory] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)
  const [isResetted, setIsResetted] = useState(false)
  const [offset, setOffset] = useState(getOffsetUsingPageNo(activePage, pageLimit))
  const [transactionHistoryCount, seTransactionHistoryCount] = useState(0)
  const [filterField, setFilterField] = useState("")
  const [filterValue, setFieldValue] = useState("")
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
 
  const classes = useStyles()

  const searchOptions = [
    { title: "UTR", value: "order_id" },
    { title: "Bank Account Number", value: "bank_acc_no" },
    { title: "Retailer ID", value: "retailer_id" }
  ]

  useEffect(() => {
    fetchRetailerTransactionHistory()
  }, [pageNo, isResetted])

  useEffect(() => {
    if (isResetted) {
      fetchRetailerTransactionHistory()
    }
  }, [isResetted])

  const fetchRetailerTransactionHistory = () => {
    const payload = {
      limit: pageLimit.toString(),
      offset: ((pageNo - 1) * parseInt(pageLimit)).toString(),
      search_by: filterValue && filterValue.trim().length > 0 ? filterField : "",
      search_attribute: filterValue
    }
    setLoading(true)
    fetchTransactionHistory(payload)
      .then((response) => {
        setIsResetted(false)
        if (response.data && Object.keys(response.data).length >= 0) {
          setLoading(false)
          setTransactionHistory(response.data)
          seTransactionHistoryCount(response.count)
        }
      })
      .catch((json) => {
        console.log("json", json)
        setLoading(false)
        setError(true)
        setIsResetted(false)
        setErrorMessage("Error in fetching transaction history")
      })
  }

  const handleSearchChange = (event, option) => {
    setIsResetted(false)
    setFilterField(option.value)
    setFieldValue("")
  }

  const handleTextChange = (event) => {
    setFieldValue(event.target.value)
  }

  const resetFilterValue = (event) => {
    setFieldValue("")
    setIsResetted(true)
  }

  const handleChangePage = (pageObj) => {
    setOffset(pageObj.offset)
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage,
      //itemsPerPage: rowsPerPage,
      // SearchTerm: filterField,
      // SearchValue: filterValue
    }
    history.pushState(queryParamsObj, "transaction history listing", `/home/transaction-history${getQueryUri(queryParamsObj)}`)
  }

  // const handleChangeRowsPerPage = event => {
  //   setRowsPerPage(event.target.value)
  //   setPageNo(0);
  //   const queryParamsObj = {
  //     activePage: 0,
  //     itemsPerPage: event.target.value
  //   }
  //   history.pushState(queryParamsObj, "transaction history listing", `/home/transaction-history${getQueryUri(queryParamsObj)}`)
  // };

  const handlePress = (event) => {
    if(event.keyCode === 13) {
      setPageNo(1)
      const queryParamsObj = {
        activePage: 1,
        //itemsPerPage: event.target.value,
        // SearchTerm: filterField,
        // SearchValue: filterValue
      }
      history.pushState(queryParamsObj, "transaction history listing", `/home/transaction-history${getQueryUri(queryParamsObj)}`)
      pageNo !== 1 ? setPageNo(1) : setIsResetted(true)
    }
  }

  const handleClose = () => {
    setError(false)
  }

  return (
    <div id="TransactionHistory">
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
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={filterValue}
                onChange={handleTextChange}
                onKeyDown={handlePress}
                inputProps={{ "aria-label": "search" }}
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
          {
            !isLoading 
              ? (
                transactionHistory && transactionHistory.map((data, index) => {
                  return (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {data.order_id}
                      </TableCell>
                      <TableCell align="left">{Moment(data.txn_complete_date).format("DD/MM/YYYY h:mm a")}</TableCell>
                      <TableCell align="left">{data.bank_acc_no}</TableCell>
                      <TableCell align="left">{data.retailer_id}</TableCell>
                      <TableCell align="left">{data.payer_amount}</TableCell>
                    </TableRow>
                  )
                }))
              : (
                [1, 2, 3, 4, 5].map((item, i) => (
                  <TableLoadingShell key={i} />
                ))
              )
          }
          {
            !isLoading && transactionHistory.length === 0 &&
            <tr>
              <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='5'>
                <p style={{ fontWeight: "16px" }}>No records  found</p>
              </td>
            </tr>
          }
        </Table>
        {/* {
          !isLoading &&
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactionHistoryCount}
            rowsPerPage={parseInt(rowsPerPage)}
            page={parseInt(pageNo)}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        } */}
        {
          transactionHistory.length > 0 && !isLoading &&
          <Pagination
            activePage={parseInt(pageNo)}
            itemsCountPerPage={parseInt(pageLimit)}
            totalItemsCount={transactionHistoryCount}
            pageRangeDisplayed={5}
            setPage={handleChangePage}
          />
        }
        {
          isError &&
          <Notification 
            message={errorMessage} 
            messageType="error"
            open={isError}
            handleClose={handleClose}
          />
        }
      </Paper>
    </div>
  )
}

export default transactionHistoryList