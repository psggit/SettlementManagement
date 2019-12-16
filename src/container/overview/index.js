import React, { useState } from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from 'Components/card';
import "./overview.scss"

function overview () {

  const [value, setValue] = useState(0)

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div id="overview">
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Yesterday" />
        <Tab label="Last Week" />
        <Tab label="Last Month" />
      </Tabs> 
      <div className="settlement-details">
        <div className="transaction-details">
          <Card 
            title="Total Settlements" 
            value={"₹ 2,46,975"} 
            width={"498px"} 
            marginRight={"71px"} 
          />
          <Card 
            title="Total Transactions" 
            value={"531"} 
            width={"498px"} 
            marginRight={"71px"} 
          />
        </div>
        <div className="amount-details">
          <Card 
            title="Total UPI Amount" 
            value={"₹ 1,35,790"} 
            width={"318px"} 
            marginRight={"56px"} 
          />
          <Card 
            title="Total Wallet Amount" 
            value={"₹ 1,11,185"} 
            width={"318px"} 
            marginRight={"56px"} 
          />
          <Card 
            title="Store Active" 
            value={"15"} 
            width={"318px"} 
            marginRight={"56px"} 
          />
        </div>
      </div>
    </div>
  )
}

export default overview