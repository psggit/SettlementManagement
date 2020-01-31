import React, { useState, useEffect } from "react"
import Table from "Components/table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import CrossIcon from "@material-ui/icons/HighlightOff"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles } from "@material-ui/core/styles"
import { fetchRefundHistory } from "../api"
import TableLoadingShell from "Components/tableLoadingShell"
import Pagination from "Components/pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Notification from "Components/notification"
import Moment from "moment"

const tableHeaders = [
  { label: "Refund ID", value: "refund_id" },
  {label: "Date & Time", value: "date_time" },
  { label: "Initial Transaction ID", value: "transaction_id" },
  { label: "Bank Account Number", value: "account_no" },
  { label: "Retailer ID", value: "retailer_id" },
  { label: "Transaction Amount", value: "amount" }
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
    justifyContent: "center"
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
    color: "inherit",
  },
  inputInput: {
    height: "34px",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width")
  }
}))

function refundHistoryList() {
  const pageLimit = 10
  const activePage = getQueryParamByName("activePage") || 1
  const [refundHistory, setRefundHistory] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)
  const [offset, setOffset] = useState(getOffsetUsingPageNo(activePage, pageLimit))
  const [refundHistoryCount, setRefundHistoryCount] = useState(0)
  const [filterField, setFilterField] = useState("retailer_id")
  const [filterValue, setFieldValue] = useState("2222")
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const classes = useStyles()

  const searchOptions = [
    { title: "Refund ID", value: "refund_id" },
    { title: "Initial Transaction ID", value: "initial_txn_id" },
    { title: "Bank Account Number", value: "bank_acc_no" },
    { title: "Retailer ID", value: "retailer_id" }
  ]

  useEffect(() => {
    fetchRetailerRefundHistory()
  }, [pageNo])

  const fetchRetailerRefundHistory = () => {
    const payload = {
      limit: pageLimit.toString(),
      offset: offset.toString(),
      search_by: filterField,
      search_attribute: filterValue
    }
    setLoading(true)
    fetchRefundHistory(payload)
      .then((response) => {
        setLoading(false)
        setRefundHistory(response.refund_list)
        setRefundHistoryCount(response.Count)
      })
      .catch((json) => {
        setLoading(false)
        setError(true)
        setErrorMessage(json.error)
      })
  }
  const handleSearchChange = (event, option) => {
    console.log("select change", option)
    setFilterField(option.value)
    setFieldValue("")
  }

  const handleTextChange = (event) => {
    setFieldValue(event.target.value)
    console.log("text change", event.target.value)
  }

  const resetFilterValue = (event) => {
    setFieldValue("")
  }

  const handleChangePage = (pageObj) => {
    setOffset(pageObj.offset)
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage
    }
    history.pushState(queryParamsObj, "refund history listing", `/home/refund-history${getQueryUri(queryParamsObj)}`)
  }

  const handlePress = (event) => {
    if (event.keyCode === 13) {
      const queryParamsObj = {
        activePage: 1
      }
      history.pushState(queryParamsObj, "refund history listing", `/home/refund-history${getQueryUri(queryParamsObj)}`)
      fetchRetailerRefundHistory()
    }
  }

  const handleClose = () => {
    setError(false)
  }

  return (
    <div id="RefundHistory">
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
                refundHistory && refundHistory.map((data, index) => {
                  return (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {data.refund_id}
                      </TableCell>
                      <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell>
                      <TableCell align="left">{data.initial_txn_id}</TableCell>
                      <TableCell align="left">{data.bank_acc_no}</TableCell>
                      <TableCell align="left">{data.retailer_id}</TableCell>
                      <TableCell align="left">{data.txn_amount}</TableCell>
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
            !isLoading && refundHistory.length === 0 &&
            <tr>
              <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='6'>
                <p style={{ fontWeight: "16px" }}>No records  found</p>
              </td>
            </tr>
          }
        </Table>
        {
          !isLoading && refundHistory.length > 0 &&
          <Pagination
            activePage={parseInt(pageNo)}
            itemsCountPerPage={parseInt(pageLimit)}
            totalItemsCount={refundHistoryCount}
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

export default refundHistoryList