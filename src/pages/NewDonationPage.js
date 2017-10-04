import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { AppRegistry, ScrollView, Image, Text, View } from 'react-native';
import ContentTemplate from '../templates/ContentTemplate'
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    width: "5em",
    alignSelf: "center"
  },
});

class NewDonationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      charsMax: 150,
      charsLeft: 150
    }

    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(event) {
    let description = event.target.value
    let charsLeft = this.state.charsMax - description.length
    if (charsLeft >= 0) {
      this.setState({description: description, charsLeft: charsLeft})
    }
  }

  helperText(chars) {
    return "You have " + chars + " characters left to type"
  }

  render() {
    let classes = this.props.classes;
    return (
      <ContentTemplate title="new offer">
        <TextField
          autoFocus={true}
          onChange={this.onTextChange}
          label={this.helperText(this.state.charsLeft)}
          placeholder="What are you offering? Be concise."
          multiline
          margin="normal"
          value={this.state.description}
        />
        <Button color="primary" className={classes.button} raised dense>Next</Button>
      </ContentTemplate>
    );
  }
};

export default withStyles(styles)(NewDonationPage)