import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {TouchableWithoutFeedback, View} from "react-native";
import {Paper, TextField, Typography} from "material-ui";
import donationStyles from './styles'
import {Tenge} from 'utils/Common'
import ServerComms from "utils/ServerComms";
import Error from 'templates/ErrorTemplates'

const styles = {
  view: {paddingTop: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'row'},
  button: {width: '4em'}
};

class Dash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      highestBid: null,
      hba: 0,
      hbb: null,
      hbbi: null,
      minBid: 1,
      accountBalance: null,
      daysToExpiry: null
    };

    ServerComms.getHighestBid(props.id).then(b => {
      console.log("highest bid", b);
      if (b) {
        let hba = b.bid.amount;
        let hbb = b.info.name;
        this.setState({highestBid: b, hba: hba, hbb: hbb, hbbi: b.bid.by, minBid: hba + 1})
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
                                       highestBidById={this.state.hbbi}
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
      userBid: null,
      error: null,
      buttonDisabled: false
    };

    this.onBidPress = this.onBidPress.bind(this);
    this.onBidChange = this.onBidChange.bind(this);
    this.getUserBid = this.getUserBid.bind(this)
  }

  onBidPress() {
    this.verifyBid(this.getUserBid());
    {
      ServerComms.sendBidToServer(this.props.id, this.getUserBid()).catch(e => {
        this.setState({error: "oops... something went wrong"})
      })
    }
  };

  onBidChange(e) {
    // console.log("bid change", e, e.target, e.target.value)
    let newBid = e.target.value;
    this.setState({userBid: newBid});
    this.verifyBid(newBid)
  }

  verifyBid(value) {
    let aboveMin = (value >= this.props.minBid);
    let belowBalance = (value <= this.props.balance);
    let whole = value % 1 === 0;
    // let notSelf = this.props.highestBidById !== FbUtils.userId

    this.setState({error: "", buttonDisabled: false});
    if (!aboveMin) {
      this.setState({error: "Bid must be higher than minimum", buttonDisabled: true})
    }
    if (!belowBalance) {
      this.setState({error: "Not enough funds", buttonDisabled: true})
    }
    if (!whole) {
      this.setState({error: "Has to be a round number", buttonDisabled: true})
    }

    return (aboveMin && belowBalance && whole)
  }

  getUserBid() {
    if (this.state.userBid !== null) {
      return this.state.userBid
    } else {
      return this.props.minBid
    }
  }

  render() {
    console.log("panel render", this.state);
    return (
      <Paper className={this.props.classes.outerBidPanel}>
        <Error error={this.state.error}/>
        <View className={this.props.classes.innerBidPanel}>

          <Typography>You have {this.props.balance} {Tenge}hanks</Typography>
          <Typography>1{Tenge} expires in {this.props.expiry} days </Typography>
          {this.props.highestBidBy &&
          <Typography>Highest bid is {this.props.highestBidAmount} by {this.props.highestBidBy} </Typography>}
          <TextField type='number' value={this.getUserBid()} onChange={this.onBidChange}
                     helperText="no decimals" label={"how many do you bid?"}
                     className={this.props.classes.bidField} autoFocus={true}/>
          <BidButton onPress={this.onBidPress} disabled={this.state.buttonDisabled}/>
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
        <Button color="primary" raised className={props.classes.button} disabled={props.disabled}>Bid</Button>
      </View>
    </TouchableWithoutFeedback>
  )
}

const BidButton = withStyles(styles)(BidButtonComp);

export default withStyles(styles)(Dash)