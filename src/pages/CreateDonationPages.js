import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { AppRegistry, ScrollView, Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import ContentTemplate from '../templates/ContentTemplate'
import Button from 'material-ui/Button';
import { connect } from 'react-redux'
import * as ctr from '../controllers/donation-controller'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  button: {
    width: "5em",
    alignSelf: "center"
  },
  paper: theme.mixins.gutters({
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    alignSelf: "center",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: '95%',
    display: 'flex',
    flexDirection: 'row'
  }),
  token: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
  },
  selectable: {
    marginLeft: '0.5em',
    fontSize: "1.5em"
  },
  selected: {
    marginLeft: '1em',
    marginRight: '0.5em',
    color: theme.palette.secondary["900"]
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  fullWidth: {
    width: '100%'
  }
});

class CreateDonationPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagSelectionMode: false
    };

    this.onNext = this.onNext.bind(this)
  }

  onNext() {
    this.setState({tagSelectionMode: true})
  }

  render() {
    console.log("CreateDonationPages render");
    let classes = this.props.classes;
    return (
      <ContentTemplate title="Creating an offer">
        <Paper component={View} elevation={2} className={classes.paper}>
          {(!this.state.tagSelectionMode) && <EnterDescriptionComponent onNext={this.onNext}/>}
          {(this.state.tagSelectionMode) && <SelectTagsComponent/>}
        </Paper>
      </ContentTemplate>
    );
  }
}

class SelectTags extends Component {
  render() {
    console.log("SelectTags render ", this.props);
    let classes = this.props.classes;
    let i = -1;
    return (<View className={classes.rowFlex}>
      {this.props.tokens.map(t => {
        i += 1;
        if (t.isSelectable) {
          return <SelectableTokenComponent key={i} index={i} token={t.token} isSelected={t.isSelected} onSelect={() => {this.props.onTokenSelect(i)}}/>
        } else {
          return <Typography type="headline" key={i} className={classes.token} component={Text}>{t.token}</Typography>
        }
      })}
    </View>)
  }
}
const SelectTagsComponent = connect(ctr.mapNewOfferToProps, ctr.mapDispatchToProps)(withStyles(styles)(SelectTags));

const SelectableToken = (props) => {
  let classes = props.classes;
  console.log("Selectable token", props)

  return (<TouchableWithoutFeedback onPress={props.onSelect}>
    <View>
      <Typography className={[classes.token, classes.selectable, props.isSelected ? classes.selected : ""].join(' ')} component={Text}>{props.token}</Typography>
    </View>
  </TouchableWithoutFeedback>)
};

const SelectableTokenComponent = withStyles(styles)(SelectableToken);


class EnterDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      charsMax: 150,
      charsLeft: 150,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onNext = this.onNext.bind(this)
  }

  onNext() {
    this.props.onDescriptionChange(this.state.description);
    this.props.onNext()
  }

  static helperText(chars) {
    return "You have " + chars + " characters left to type"
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
            <Button color="primary" className={classes.button} raised dense>Next</Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const EnterDescriptionComponent = connect(ctr.mapNewOfferToProps, ctr.mapDispatchToProps)(withStyles(styles)(EnterDescription));

export default connect(ctr.mapNewOfferToProps, ctr.mapDispatchToProps)(withStyles(styles)(CreateDonationPages))