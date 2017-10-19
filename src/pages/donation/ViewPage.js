import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {View} from 'react-native';
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

'utils/Common';
class ViewPage extends Component {
  constructor(props) {
    super(props);

    console.log("view page const", props);
    this.state = {
      error: "",
      tokens: [],
      comments: []
    };

    this.getData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.getData(nextProps)
    }
  }

  getData(props) {
    if (props.match.params.id) {
      console.log("view mount");
      ServerComms.getPost(props.match.params.id).then(contents => {
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

  render() {
    let classes = this.props.classes;
    return (
      <ContentTemplate title="Viewing an offer">
        <View className={classes.controlPanelContainer}>
          <BidDash/>
          <Link to={viewPath("/donation/create")}>
            <Typography>Earn by</Typography>
            <Button>getting rid of stuff</Button></Link>
        </View>
        <Paper component={View} elevation={2} className={classes.paper}>
          <Error error={this.state.error}/>
          <TokenView tokens={this.state.tokens}/>
        </Paper>
        <Paper component={View} elevation={2} className={classes.paper}>
          <Comments comments={this.state.comments}/>
        </Paper>
      </ContentTemplate>
    );
  }
}

export default connect(mapViewOfferToProps)(withStyles(styles)(ViewPage))
