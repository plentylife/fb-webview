import React from 'react'
import Typography from 'material-ui/Typography';
import {View} from 'react-native';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames'

const errorColorIndex = "900";

const styles = theme => ({
  fullWidth: theme.fullWidth,
  error: Object.assign({
    color: theme.palette.getContrastText(theme.palette.error[errorColorIndex]),
    backgroundColor: theme.palette.error[errorColorIndex],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit,
  }, theme.fullWidth)
});

/**
 * @return {null|XML}
 */
function ErrorBlock(props) {
  let c = props.classes;
  console.log("Error block classes", c);

  if (props.error) {
    return (<View className={c.fullWidth}>
      <Typography className={classNames(c.error, props.addClass ? props.addClass : '')}>
        {props.error}
      </Typography>
    </View>)
  } else {
    return null
  }

}

export default withStyles(styles)(ErrorBlock)