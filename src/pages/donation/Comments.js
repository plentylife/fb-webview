import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Image, View} from 'react-native';
import styles from "./styles";
import List, {ListItem, ListItemText} from 'material-ui/List';
import {Typography} from "material-ui";
import cn from 'classnames'

function Comments(props) {
  let cl = props.classes;
  if (props.comments.length === 0) {
    return null;
  }
  let comments = props.comments.sort((a, b) => ((a.date - b.date) * -1));

  return (
    <List>
      {comments.map(function (c, i) {
        let date = new Date(c.date);
        let dateString = date.getDate() + "." + (date.getMonth() + 1) + " " + date.getHours() + ":" + date.getMinutes();
        let info = <View className={cl.commentInfo}><Typography className={cl.inheritTextProps}>by </Typography>
          <Typography className={cn(cl.commentUserName, cl.inheritTextProps)}>{c.from}</Typography>
          <Typography className={cl.inheritTextProps}> at {dateString} </Typography></View>;
        return (
          [<ListItem key="parent" className={cn(props.isNested ? props.classes.nested : "", cl.singleCommentContainer)}>
            {!c.attachments ? null : <ImageComponent src={c.attachments}/>}
            <ListItemText primary={c.body}/>
            {info}
          </ListItem>,
            <Comments key="children" comments={c.comments} isNested={true} classes={cl}/>]
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