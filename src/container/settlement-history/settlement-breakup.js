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
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
      paddingBottom: "11px",
      '& p.title': {
        fontSize: "14px",
        lineHeight: "17px"
      },
      '& p.content': {
        fontWeight: "bold",
        fontSize: "22px",
        lineHeight: "27px"
      }
    },
    row2: {
      display: "flex",
      //justifyContent: "space-between",
      paddingTop: "11px",
      '& div': {
        maxWidth: "300px",
        width: "160px",
        marginRight: "56px"
      },
      '& p.title': {
        fontSize: "14px",
        lineHeight: "17px"
      },
      '& p.content': {
        fontWeight: "bold",
        fontSize: "15px",
        lineHeight: "18px"
      }
    },
    row3: {
      paddingTop: "50px",
      display: "flex",
      justifyContent: "space-between"
    }
  }))

  const classes = useStyles();

  const [orderDetails, setOrderDetails] = useState(props.location.state)
  
  return (
    <React.Fragment>
      <div className={classes.row1}>
        <p classname="title">Settlement ID</p>
        <p className="content">{props.match.params.SettlementId}</p>
      </div>
      <div className={classes.row2}>
        <div>
          <p classname="title">Settlement UTR</p>
          <p className="content">{orderDetails.settlement_utr}</p>
        </div>
        <div>
          <p classname="title">Date &amp; Time</p>
          <p className="content">{Moment(orderDetails.settlement_date).format("DD/MM/YYYY h:mm a")}</p>
        </div>
        <div>
          <p classname="title">Retailer ID</p>
          <p className="content">{orderDetails.retailer_id}</p>
        </div>
        <div>
          <p classname="title">Retailer Name</p>
          <p className="content">{"Sangeetha Saivam"}</p>
        </div>
        <div>
          <p classname="title">Retailer Address</p>
          <p className="content">{"Road name, Adyar, Chennai - 600020 Road name, Adyar, Chennai - 600020 Road name, Adyar, Chennai - 600020 Road name, Adyar, Chennai - 600020"}</p>
        </div>
      </div>
      <div className={classes.row3}>
          <Card
            title="Settlement Amount"
            value={"₹ 24,579"}
            width={"164px"}
            marginRight={"0px"}
          />
          <Card
            title="Credits Amount"
            value={"₹ 22,468"}
            width={"164px"}
            marginRight={"0px"}
          />
          <Card
            title="Debited Amount"
            value={"₹ 2,111"}
            width={"164px"}
            marginRight={"0px"}
          />
          <Card
            title="Total Transactions"
            value={"157"}
            width={"164px"}
            marginRight={"0px"}
          />
          <Card
            title="Credited Transactions"
            value={"139"}
            width={"164px"}
            marginRight={"0px"}
          />
          <Card
            title="Debited Transactions"
            value={"18"}
            width={"164px"}
            marginRight={"0px"}
          />
      </div>
    </React.Fragment>
  )
}

export default settlementBreakup