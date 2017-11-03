import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {TouchableWithoutFeedback, View} from 'react-native';
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

class ViewPage extends Component {
  constructor(props) {
    super(props);

    console.log("view page const", props);
    this.state = {
      error: "",
      tokens: [],
      comments: [],
      commentsLink: "https://facebook.com/" + this.getId(props),
      shareSuccess: false
    };

    this.getData(this.props);
    this.onShare = this.onShare.bind(this)
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
    let q = props.location.search.replace("?ref=", "");
    return decodeURI(q)
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
      })
    } else {
      this.setState({error: "oops, we're not able to show you this offer..."})
    }
  }

  onShare() {
    this.setState({shareSuccess: true})
  }

  render() {
    let classes = this.props.classes;
    return (
      <Container title="Viewing an offer" inline={this.props.inline} history={this.props.history}>
        <View className={classes.controlPanelContainer}>
          <BidDash id={this.getId(this.props)} referrer={ViewPage.getRef(this.props)}/>
          <View className={classes.centerItems}>
            <Typography>Earn {Tenge}hanks by </Typography>
            <Link to={viewPath("/donation/create")}>
              <Button>getting rid of stuff</Button></Link>

            <TouchableWithoutFeedback onPress={() =>
              FbUtils.share(this.getId(this.props), this.state.tokens, this.onShare)}>
              <View className={this.state.shareSuccess ? classes.successBackground : null}>
                <Button className={classes.withUnderline}>sharing</Button>
                {this.state.shareSuccess && <Typography className={classes.shareSuccess}>
                  You will be rewarded {Tenge}hanks once your friends place bids
                </Typography>}
              </View>
            </TouchableWithoutFeedback>

          </View>
        </View>
        <Paper component={View} elevation={2} className={classes.paper}>
          <Error error={this.state.error}/>
          <TokenView tokens={this.state.tokens} commentsLink={this.state.commentsLink}/>
        </Paper>
        <Paper component={View} elevation={2} className={classes.paper}>
          <View className={classes.commentLinksContainer}>
            {/* fixme will fail on mobile */}
            <a target="_blank" href={this.state.commentsLink} className={classes.noUnderline}>
              <Button raised color="primary">Add Comment or Picture</Button>
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

