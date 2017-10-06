import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux'
import * as ctr from '../../controllers/donationDataController'
import classNames from 'classnames'
import styles from './styles'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class SelectTags extends Component {
  render() {
    console.log("SelectTags render ", this.props);
    let classes = this.props.classes;
    let i = -1;
    return (<View className={classes.fullWidth}>
      <View className={[classes.tokenContainer, classes.rowFlex].join(' ')}>
        {this.props.tokens.map(t => {
          i += 1;
          if (t.isSelectable) {
            return <SelectableTokenComponent key={i} index={i} token={t.token} isSelected={t.isSelected}
                                             onSelect={this.props.onSelect}/>
          } else {
            return <Typography type="headline" key={i} className={classes.token} component={Text}>{t.token}</Typography>
          }
        })}
      </View>
      <View className={classNames(classes.fullWidth, classes.buttonContainer)}>
        <TouchableWithoutFeedback onPress={this.props.onBack}>
          <View>
            <Button className={classes.button} style={{width: '5em'}} raised dense>Back</Button>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.onPublish}>
          <View>
            <Button color="primary" className={classes.button} raised dense>Publish</Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>)
  }
}

class SelectableToken extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect() {
    this.props.onSelect(this.props.index)
  }

  render() {
    let classes = this.props.classes;
    console.log("Selectable token", this.props);

    return (<TouchableWithoutFeedback onPress={this.onSelect}>
      <View>

        <Typography
          className={[classes.token, classes.selectable, this.props.isSelected ? classes.selected : ""].join(' ')}
          component={Text} ref={(t) => this.typography = t}>
          {this.props.token}
        </Typography>
      </View>

    </TouchableWithoutFeedback>)
  }
}

const SelectableTokenComponent = withStyles(styles)(SelectableToken);

export default connect(ctr.mapNewOfferToProps, ctr.mapDispatchToProps)(withStyles(styles)(SelectTags));