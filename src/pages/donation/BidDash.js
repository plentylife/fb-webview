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
      highestBid: null,
      hba: 0,
      hbb: null,
      minBid: 1,
      accountBalance: null,
      daysToExpiry: null
    };

    ServerComms.getHighestBid(props.id).then(b => {
      console.log("highest bid", b);
      if (b) {
        let hba = b.bid.amount;
        let hbb = b.info.name;
        this.setState({highestBid: b, hba: hba, hbb: hbb, minBid: hba + 1})
      }
    });

    ServerComms.getAccountStatus().then(b => {
      let dte = Math.round(b.timeUntilNextDemurrage / 1000 / 60 / 60 / 24);
      console.log("account status", b, dte);
      this.setState({accountBalance: b.balance, daysToExpiry: dte})
    });

    this.onBidPress = this.onBidPress.bind(this)
  }

  onBidPress() {
    this.setState({expanded: true})
  }

  render() {
    console.log("dash render", this.state);
    return (
      <View className={this.props.classes.view}>
        {this.state.expanded && <Panel highestBidAmount={this.state.hba}
                                       highestBidBy={this.state.hbb}
                                       minBid={this.state.minBid}
                                       balance={this.state.accountBalance} expiry={this.state.daysToExpiry}
                                       id={this.props.id}/>}
        {!this.state.expanded && <BidButton onPress={this.onBidPress}/>}
      </View>
    )
  }
}

class PanelComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBid: null
    };

    this.onBidPress = this.onBidPress.bind(this);
    this.onBidChange = this.onBidChange.bind(this)
  }

  onBidPress() {
    this.verifyBid(this.state.userBid);
    {
      ServerComms.sendBidToServer(this.props.id, this.state.userBid ? this.state.userBid : this.props.minBid)
    }
  };

  onBidChange(e) {
    let newBid = e.target.value();
    if (this.verifyBid(newBid)) {
      this.setState({userBid: newBid})
    }
  }

  verifyBid(value) {
    return true
  }

  render() {
    console.log("panel render", this.props);
    return (
      <Paper className={this.props.classes.outerBidPanel}>
        <View className={this.props.classes.innerBidPanel}>
          <Typography>You have {this.props.balance} {Tenge}hanks</Typography>
          <Typography>1{Tenge} expires in {this.props.expiry} days </Typography>
          {this.props.highestBidBy &&
          <Typography>Highest bid is {this.props.highestBidAmount} by {this.props.highestBidBy} </Typography>}
          <TextField type='number' value={this.state.userBid ? this.state.userBid : this.props.minBid}
                     helperText="no decimals" label={"how" +
          " many " + Tenge + "hanks would you" +
          " like to bid?"}/>
          <BidButton onPress={this.onBidPress} onChange={this.onBidChange}/>
        </View>
      </Paper>
    )
  }
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