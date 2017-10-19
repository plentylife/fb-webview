import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {View} from "react-native";

const styles = {
  view: {paddingTop: 5, display: 'flex', justifyContent: 'space-around', flexDirection: 'row'},
  button: {width: '4em'}
};

function Dash(props) {
  return (
    <View className={props.classes.view}>
      <Button color="primary" raised className={props.classes.button}>Bid</Button>
    </View>
  )
}

export default withStyles(styles)(Dash)