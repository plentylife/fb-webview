import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import ContentTemplate from '../../templates/ContentTemplate'
import {connect} from 'react-redux'
import {
  mapViewOfferToProps,
  selectTokensBasedOnContext,
  splitStrIntoTokens,
  stripNonBodyFromPost
} from '../../controllers/donationDataController'
import Paper from 'material-ui/Paper';
import Error from 'templates/ErrorTemplates'
import styles from './styles'
import ServerComms from 'utils/ServerComms'
import TokenView from './TokenView'
import Comments from "./Comments";
import BidDash from "./BidDash";
// fixme mobile will fail
import {Link} from "react-router-dom";
import {viewPath} from "../../utils/Common";
import {Button, Typography} from "material-ui";
import {Tenge} from 'utils/Common'
import FbUtils from "../../utils/FbUtils";
import cn from 'classnames'

class ViewPage extends Component {
  constructor(props) {
    super(props);

    console.log("view page const", props);
    this.state = {
      error: "",
      tokens: [],
      comments: [],
      userInfo: null,
      commentsLink: "https://facebook.com/" + this.getId(props),
      shareSuccess: false,
      shareError: false,
      displayEarnOptions: false
    };

    this.getData(this.props);
    this.onShare = this.onShare.bind(this);
    this.onEarnPress = this.onEarnPress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.getId(nextProps) !== this.getId(this.props)) {
      this.getData(nextProps)
    }
  }

  getId(props) {
    return props.id ? props.id : props.match.params.id
  }

  static getRef(props) {
    if (props.location) {
      let q = props.location.search.replace("?ref=", "");
      return decodeURI(q)
    } else {
      return null
    }
  }

  getData(props) {
    if (this.getId(props)) {
      console.log("view mount");
      ServerComms.getPost(this.getId(props)).then(contents => {
        let body = stripNonBodyFromPost(contents.body);
        let tokens = splitStrIntoTokens(body);
        tokens = selectTokensBasedOnContext(tokens);
        console.log("view", tokens, body);
        this.setState({tokens: tokens, comments: contents.comments})
      }).catch(e => {
        console.log("Could not display offer:", e);
        this.setState({error: "oops, we're not able to show you this offer..."})
      });
      ServerComms.getDonationUser(this.getId(props)).then(ui => {
        console.log("user info", ui);
        this.setState({userInfo: ui})
      })
    } else {
      this.setState({error: "oops, we're not able to show you this offer..."})
    }
  }

  onShare(success) {
    if (success) {
      this.setState({shareSuccess: true, shareError: false})
    } else {
      this.setState({shareSuccess: false, shareError: true})
    }
  }

  onEarnPress() {
    this.setState({displayEarnOptions: true})
  }

  render() {
    let classes = this.props.classes;
    return (
      <Container title="Viewing an offer" inline={this.props.inline} history={this.props.history}>
        <View className={classes.controlPanelContainer}>
          <BidDash id={this.getId(this.props)} referrer={ViewPage.getRef(this.props)}/>
          <View className={cn(classes.centerItems, classes.earnContainer)}>
            {!this.state.displayEarnOptions &&
            <TouchableWithoutFeedback onPress={this.onEarnPress}>
              <View>
                <Button className={cn(classes.secondaryButton, classes.keepLowercase)}>Earn {Tenge}hanks</Button>
              </View>
            </TouchableWithoutFeedback>
            }
            {this.state.displayEarnOptions && <Link className={classes.noUnderline} to={viewPath("/donation/create")}>
              <Button className={cn(classes.secondaryButton, classes.noUnderline)}>by Getting Rid of
                Stuff</Button></Link>}

            {this.state.displayEarnOptions && <TouchableWithoutFeedback onPress={() =>
              FbUtils.share(this.getId(this.props), this.state.tokens, this.onShare)}>
              <View
                className={cn(this.state.shareSuccess ? classes.successBackground : null,
                  this.state.shareError ? classes.failureBackground : null,
                  classes.withNormalTopMargin)}>
                <Button className={cn(classes.secondaryButton)}>by Sharing this
                  Post</Button>
                {this.state.shareSuccess && <Typography className={classes.shareSuccess}>
                  You will be rewarded {Tenge}hanks once your friends place bids
                </Typography>}
                {this.state.shareError && <Typography className={classes.shareSuccess}>
                  oops... some error occurred
                </Typography>}
              </View>
            </TouchableWithoutFeedback>}

          </View>
        </View>
        <Paper component={View} elevation={2} className={classes.adPaper}>
          <Error error={this.state.error}/>
          {this.state.userInfo && <View className={classes.flexRow}>
            <img src={this.state.userInfo.profilePic} className={classes.profilePic}/>
            <Typography className={classes.adTitle} component={Text}>
              {this.state.userInfo.name} {this.state.userInfo.lastName} is offering:
            </Typography>
          </View>}
          <TokenView tokens={this.state.tokens} commentsLink={this.state.commentsLink}/>
        </Paper>
        <Paper component={View} elevation={2} className={classes.paper}>
          <View className={classes.commentLinksContainer}>
            {/* fixme will fail on mobile */}
            <a target="_blank" href={this.state.commentsLink} className={classes.noUnderline}>
              <Button raised color="primary">Ask for Details</Button>
            </a>
          </View>
          {this.state.comments.length > 0 && <Comments comments={this.state.comments}/>}
          {this.state.comments.length === 0 && <Typography>No comments yet... leave one</Typography>}
        </Paper>
      </Container>
    );
  }
}

function Container(props) {
  if (props.inline) {
    return (<View>
      {props.children}
    </View>)
  } else {
    return (<ContentTemplate title={props.title} history={props.history}>
      {props.children}
    </ContentTemplate>)
  }
}

export default connect(mapViewOfferToProps)(withStyles(styles)(ViewPage))

