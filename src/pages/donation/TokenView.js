import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from "material-ui";
import {Text, View} from 'react-native';
import styles from "./styles";

function TokenView(props) {
  let classes = props.classes;
  let i = 0;

  return (<View className={[classes.tokenContainer, classes.rowFlex].join(' ')}>
    {props.tokens.map(t => {
      // console.log(t)
      i += 1;
      if (t.isSelectable) {
        return <Typography key={i}
                           className={[classes.token, classes.selectable, t.isTagged ? classes.selected : ""].join(' ')}
                           component={Text}>
          {t.token}
        </Typography>
      } else {
        return <Typography type="body1" key={i} className={classes.token} component={Text}>{t.token}</Typography>
      }
    })}
  </View>)
}

export default withStyles(styles)(TokenView)