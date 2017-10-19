import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Image} from 'react-native';
import styles from "./styles";
import List, {ListItem, ListItemText} from 'material-ui/List';

function Comments(props) {
  let classes = props.classes;
  if (props.comments.length === 0) {
    return null;
  }
  let comments = props.comments.sort((a, b) => ((a.date - b.date) * -1));

  return (
    <List>
      {comments.map(function (c, i) {
        console.log(c);
        let date = new Date(c.date);
        return (
          [<ListItem key="parent" className={props.isNested ? props.classes.nested : ""}>
            {!c.attachments ? null : <ImageComponent src={c.attachments}/>}
            <ListItemText primary={c.body} secondary={"by " + c.from + " at " + date}/>
          </ListItem>,
            <Comments key="children" comments={c.comments} isNested={true} classes={classes}/>]
        )
      })
      }
    </List>
  )
}

function ImageComponent(props) {
  let source = {uri: props.src, width: 100, height: 100};
  return (
    <Image source={source} resizeMode="contain"/>
  )
}


export default withStyles(styles)(Comments)