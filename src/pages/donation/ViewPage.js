import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {View} from 'react-native';
import ContentTemplate from '../../templates/ContentTemplate'
import {connect} from 'react-redux'
import {mapViewOfferToProps} from '../../controllers/donationDataController'
import Paper from 'material-ui/Paper';
import Error from 'templates/ErrorTemplates'
import styles from './styles'
import ServerComms from 'utils/ServerComms'

class ViewPage extends Component {
  constructor(props) {
    super(props);

    console.log("view page const", props);
    this.state = {
      error: "",
      rawMessage: ""
    };

    this.getData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps)
  }

  getData(props) {
    if (props.match.params.id) {
      console.log("view mount");
      ServerComms.getPost(props.match.params.id).then(contents => {
        console.log("gont contents", contents);
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
        <Paper component={View} elevation={2} className={classes.paper}>
          <Error error={this.state.error}/>
        </Paper>
      </ContentTemplate>
    );
  }
}

export default connect(mapViewOfferToProps)(withStyles(styles)(ViewPage))
