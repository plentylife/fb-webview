import React, {Component, PureComponent} from 'react';
import {withStyles} from 'material-ui/styles';
import {Button, Typography} from "material-ui";
import {Text, View} from 'react-native';
import styles from "./styles";
import classNames from 'classnames'

function TokenView(props) {
  let classes = props.classes;
  if (props.tokens.length === 0) return <Typography>Loading...</Typography>;


  let i = 0;
  let l = props.tokens.length;
  let lastTagged = 0;

  let tokenArray = [];
  while (i < l) {
    let t = props.tokens[i];

    i += 1;
    if (t.isTagged) {
      lastTagged = i
    }
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

  tokenArray.splice(lastTagged + 1, 0, <ReqPics key="rpbutton"/>);

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