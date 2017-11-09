import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {View} from 'react-native';
import ContentTemplate from '../../templates/ContentTemplate'
import {connect} from 'react-redux'
import * as ctr from '../../controllers/donationDataController'
import Paper from 'material-ui/Paper';
import Error from 'templates/ErrorTemplates'
import styles from './styles'
import EnterDescription from './EnterDescripton'
import SelectTags from './SelectTags'
import Server from 'utils/ServerComms'
import {Button, Typography} from "material-ui";
import cn from 'classnames'
import FbUtils from "../../utils/FbUtils";

class CreateDonationPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagSelectionMode: false,
      error: "",
      isPublishing: false
    };
    this.maxTags = 3;
    this.minTags = 1;

    this.onNext = this.onNext.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPublish = this.onPublish.bind(this);

    this.titles = ["Describe your offer", "Select hashtags"]
  }

  onNext(descr) {
    console.log("On next main", descr, !!descr);
    if (descr) {
      this.props.onDescriptionChange(descr);
      this.setState({error: "", tagSelectionMode: true});
    } else {
      this.setState({error: "The description cannot be empty"})
    }
  }

  onBack() {
    this.setState({tagSelectionMode: false, error: ""})
  }

  countSelectedTags() {
    let count = 0;
    this.props.tokens.forEach(t => {
      if (t.isTagged) {
        count += 1
      }
    });
    return count
  }

  /** @return string error message or null */
  onSelect(index) {
    let count = this.countSelectedTags();
    console.log("selecting token at index, current count", index, count);
    // reached maximum, AND selecting a tag that is not already selected
    if (count >= this.maxTags && !this.props.tokens[index].isTagged) {
      this.setState({error: "You cannot have more than " + this.maxTags + " tags"})
    } else {
      this.setState({error: ""});
      this.props.onTokenSelect(index)
    }
  }

  /** @return error message or null */
  onPublish() {
    let c = this.countSelectedTags();
    console.log("publish", c);
    if (c < this.minTags) {
      this.setState({error: "You must select at least " + this.minTags + " tag"});
    } else {
      this.setState({error: "", isPublishing: true});
      Server.postNewDonation(this.props.tokens).then(d => {
        this.setState({isPublishing: false});
        this.props.history.replace(viewPath("/donation/" + d.id))
      }).catch(e => {
        this.setState({error: "We couldn't post your donation, oops...", isPublishing: false})
      })
    }
  }

  render() {
    console.log("CreateDonationPages render");
    let classes = this.props.classes;
    return (
      <ContentTemplate title={this.titles[this.state.tagSelectionMode ? 1 : 0]} history={this.props.history}>
        {(!this.state.tagSelectionMode) && <DescriptionInstructions classes={classes}/>}
        {(this.state.tagSelectionMode) && <SelectTagsInstructions classes={classes}/>}
        <Paper component={View} elevation={2} className={classes.paper}>
          <Error error={this.state.error}/>
          {(!this.state.tagSelectionMode) && <EnterDescription onNext={this.onNext}/>}
          {(this.state.tagSelectionMode) &&
          <SelectTags onBack={this.onBack} onSelect={this.onSelect} onPublish={this.onPublish}
                      isPublishing={this.state.isPublishing}/>}
        </Paper>
        {(!this.state.tagSelectionMode) &&
        <Button className={cn(classes.secondaryButton, classes.shareCreateButton)}
                onClick={FbUtils.shareNewDonation}>Share this gem!</Button>}
      </ContentTemplate>
    );
  }
}

function DescriptionInstructions(props) {
  let c = props.classes;
  return (
    <Typography className={c.instructions}>
      So you're offering something? Describe what it is, then press <i>Next</i>
      </Typography>
  )
}

function SelectTagsInstructions(props) {
  let c = props.classes;
  return (
    <Typography className={c.instructions}>
      Click to select at least one hashtag. Then press <i>Publish</i>.
    </Typography>
  )
}

export default connect(ctr.mapNewOfferToProps, ctr.mapNewOfferDispatchToProps)(withStyles(styles)(CreateDonationPages))
