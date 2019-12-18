import React, {useEffect, useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from 'Components/card';
import Moment from "moment";

function settlementBreakup (props) {
 
  useEffect(() => {
    console.log("props", props)
  }, [])

  const useStyles = makeStyles(theme => ({
    row1: {
      borderBottom: "1px solid red"
    },
    row2: {
      display: "flex"
    },
    row3: {
      display: "flex"
    }
  }))

  const classes = useStyles();

  const [orderDetails, setOrderDetails] = useState(props.location.state)
  
  return (
    <React.Fragment>
      <div className={classes.row1}>
        <p>Settlement ID</p>
        <p>{props.match.params.SettlementId}</p>
      </div>
      <div className={classes.row2}>
        <div>
          <p>Settlement UTR</p>
          <p>{orderDetails.settlement_utr}</p>
        </div>
        <div>
          <p>Date &amp; Time</p>
            <p>{Moment(orderDetails.settlement_date).format("DD/MM/YYYY h:mm a")}</p>
        </div>
        <div>
          <p>Retailer ID</p>
            <p>{orderDetails.retailer_id}</p>
        </div>
        <div>
          <p>Retailer Name</p>
          <p>{"Sangeetha Saivam"}</p>
        </div>
        <div>
          <p>Retailer Address</p>
          <p>{"Road name, Adyar, Chennai - 600020"}</p>
        </div>
      </div>
      <div className={classes.row3}>
          <Card
            title="Settlement Amount"
            value={"₹ 24,579"}
            width={"164px"}
            marginRight={"25px"}
          />
          <Card
            title="Credits Amount"
            value={"₹ 22,468"}
            width={"164px"}
            marginRight={"25px"}
          />
          <Card
            title="Debited Amount"
            value={"₹ 2,111"}
            width={"164px"}
            marginRight={"25px"}
          />
          <Card
            title="Total Transactions"
            value={"157"}
            width={"164px"}
            marginRight={"25px"}
          />
          <Card
            title="Credited Transactions"
            value={"139"}
            width={"164px"}
            marginRight={"25px"}
          />
          <Card
            title="Debited Transactions"
            value={"18"}
            width={"164px"}
            marginRight={"25px"}
          />
      </div>
    </React.Fragment>
  )
}

export default settlementBreakup