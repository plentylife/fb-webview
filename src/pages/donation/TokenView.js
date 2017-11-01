import React, {Component, PureComponent} from 'react';
import {withStyles} from 'material-ui/styles';
import {Button, Typography} from "material-ui";
import {Text, View} from 'react-native';
import styles from "./styles";
import classNames from 'classnames'

function TokenView(props) {
  let classes = props.classes;
  let i = 0;
  let l = props.tokens.length;
  let buttonIndex = Math.ceil(l / 2);
  let buttonPlaced = false;

  let tokenArray = [];
  while (i < l) {
    let t = props.tokens[i];
    // console.log(t)
    if (!buttonPlaced && i === buttonIndex) {
      buttonPlaced = true;
      tokenArray.push(<ReqPics/>)
    }

    i += 1;
    if (t.isSelectable) {
      tokenArray.push(<Typography key={i}
                                  className={[classes.token, classes.selectable, t.isTagged ? classes.selected : ""].join(' ')}
                                  component={Text}>
        {t.token}
      </Typography>)
    } else {
      tokenArray.push(<Typography type="body1" key={i} className={classes.token}
                                  component={Text}>{t.token}</Typography>)
    }
  }

  return (<View className={[classes.tokenContainer, classes.rowFlex].join(' ')}>
    {tokenArray}
  </View>)
}

class RequestPicturesButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
  }

  render() {
    let c = this.props.classes;
    return <View className={c.rpContainer}>
      <Button raised color='primary'
              className={classNames(c.rpButton, this.state.success ? c.successBackground : null)}>
        {this.state.success ? 'Owner was notified' : 'Request pictures'}
      </Button>
    </View>
  }
}

const ReqPics = withStyles(styles)(RequestPicturesButton);

export default withStyles(styles)(TokenView)