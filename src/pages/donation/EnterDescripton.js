import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux'
import * as ctr from '../../controllers/donationDataController'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styles from './styles'

class EnterDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      charsMax: 150,
      charsLeft: 150 - this.props.description.length,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onNext = this.onNext.bind(this)
  }

  static helperText(chars) {
    return "You have " + chars + " characters left to type"
  }

  onNext() {
    this.props.onNext(this.state.description)
  }

  onTextChange(event) {
    let description = event.target.value;
    let charsLeft = this.state.charsMax - description.length;
    if (charsLeft >= 0) {
      this.setState({description: description, charsLeft: charsLeft})
    }
  }

  render() {
    console.log("EnterDescription render");

    let classes = this.props.classes;
    return (
      <View className={classes.fullWidth}>
        <TextField
          autoFocus={true}
          onChange={this.onTextChange}
          label={EnterDescription.helperText(this.state.charsLeft)}
          placeholder="What are you offering? Be concise."
          multiline
          margin="normal"
          value={this.state.description}
        />
        <TouchableWithoutFeedback onPress={this.onNext}>
          <View>
            <Button color="primary" className={classes.button} style={{width: '5em'}} raised dense>Next</Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default connect(ctr.mapNewOfferToProps, ctr.mapDispatchToProps)(withStyles(styles)(EnterDescription));