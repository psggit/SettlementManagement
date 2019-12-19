import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 498,
    textAlign: "center",
    marginBottom: 28
  },
  cardContent: {
    padding: "14px !important",
    //paddingBottom: "0 !important"
  },
  title: {
    fontSize: "16px",
    lineHeight: "19px",
    marginBottom: 8
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px"
  }
})

function card (props) {
  const classes = useStyles();
  return (
    <Card className={classes.card} style={{width: props.width, marginRight: props.marginRight}}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} variant="h5" component="h2">{props.title}</Typography>
        <Typography className={classes.subtitle} component="p">{props.value}</Typography>
      </CardContent>
    </Card>
  )
}

export default card