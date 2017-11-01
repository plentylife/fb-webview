import {lightGreen} from 'material-ui/colors';

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
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      color: theme.palette.text.secondary,
      marginLeft: '0.5em',
      marginRight: '0.5em',
    },
    tokenContainer: Object.assign({
      flexWrap: 'wrap',
      alignItems: 'baseline',
      alignContent: "space-between"
    }, theme.fullWidth),
    selectable: {
      marginLeft: '0.5em',
      marginRight: 0,
      fontSize: "1.5em"
    },
    // nonSelectable: {
    //
    // },
    selected: {
      flexGrow: 2,
      marginLeft: '1em',
      marginRight: '0.5em',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      fontSize: "2em",
      fontWeight: 600,
      color: theme.palette.secondary["900"]
    },
    rowFlex: {
      display: 'flex',
      flexDirection: 'row',
    },
    fullWidth: {
      width: '100%'
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },

    controlPanelContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: '1em',
      alignItems: "center",
      flexWrap: 'wrap'
    },
    noUnderline: {
      textDecoration: 'none'
    },
    withUnderline: {
      textDecoration: 'underline'
    },
    centerItems: {
      alignItems: 'center'
    },
    commentLinksContainer: {
      marginBottom: '0.3em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: "center",
      width: '100%'
    },

    innerBidPanel: {
      margin: '1em'
    },
    outerBidPanel: {
      padding: '1em',
      marginBottom: '0.5em'
    },
    bidField: {
      marginTop: '0.3em',
      marginBottom: '0.3em',
    },
    successBackground: {
      backgroundColor: lightGreen['500']
    },
    waitButton: {
      backgroundColor: lightGreen['500']
    },
    successTypo: {
      width: 100
    },

    rpButton: {
      padding: 3,
      minHeight: 'auto',
      fontSize: 'small'
    }, rpContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }
};

export default styles;