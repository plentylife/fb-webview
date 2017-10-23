import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {TouchableWithoutFeedback, View} from "react-native";
import {Paper, TextField, Typography} from "material-ui";
import donationStyles from './styles'
import {Tenge} from 'utils/Common'
import ServerComms from "utils/ServerComms";

const styles = {
  view: {paddingTop: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'row'},
  button: {width: '4em'}
};

class Dash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      highestBid: 0
    };

    ServerComms.getHighestBid(props.id).then(b => {
      console.log("highest bid", b)
      // this.state.highestBid = Number(hb)
      // this.state.minBid = this.state.highestBid + 1
    });

    this.onBidPress = this.onBidPress.bind(this)
  }

  onBidPress() {
    this.setState({expanded: true})
  }

  render() {
    return (
      <View className={this.props.classes.view}>
        {this.state.expanded && <Panel highestBid={this.state.highestBid}/>}
        {!this.state.expanded && <BidButton onPress={this.onBidPress}/>}
      </View>
    )
  }
}

function PanelComp(props) {
  const onBidPress = () => {
  };
  let minBid = props.highestBid + 1 + "";

  return (
    <Paper className={props.classes.outerBidPanel}>
      <View className={props.classes.innerBidPanel}>
        <Typography>You have 0 {Tenge}hanks</Typography>
        <Typography>Highest bid is {props.highestBid} by </Typography>
        <TextField type='number' value={undefined} defaultValue={minBid} helperText="no decimals" label={"how" +
        " many " + Tenge + "hanks would you" +
        " like to bid?"}/>
        <BidButton onPress={onBidPress}/>
      </View>
    </Paper>
  )
}

const Panel = withStyles(donationStyles)(PanelComp);

function BidButtonComp(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
      <Button color="primary" raised className={props.classes.button}>Bid</Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

const BidButton = withStyles(styles)(BidButtonComp);

export default withStyles(styles)(Dash)