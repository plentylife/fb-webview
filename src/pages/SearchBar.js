import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';


function SearchBar(props) {
  return (
    <TextField placeholder="search" InputClassName={props.classes.bar} style={{backgroundColor: 'white'}}/>
  )
}

const styles = {
  bar: {margin: 5}
};

export default withStyles(styles)(SearchBar)