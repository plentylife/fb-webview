const styles = theme => {
  return {
    button: {
      alignSelf: "center",
      marginLeft: "1em",
      marginRight: '1em'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    paper: theme.mixins.gutters({
      paddingBottom: theme.spacing.unit,
      paddingTop: theme.spacing.unit,
      alignSelf: "center",
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      width: '95%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }),
    token: {
      display: 'flex',
      flexGrow: 0,
      flexShrink: 1,
      color: theme.palette.text.secondary
    },
    tokenContainer: Object.assign({
      flexWrap: 'wrap'
    }, theme.fullWidth),
    selectable: {
      marginLeft: '0.5em',
      fontSize: "1.5em"
    },
    selected: {
      marginLeft: '1em',
      marginRight: '0.5em',
      fontSize: "2em",
      fontWeight: 600,
      color: theme.palette.secondary["900"]
    },
    rowFlex: {
      display: 'flex',
      flexDirection: 'row'
    },
    fullWidth: {
      width: '100%'
    }
  }
};

export default styles;