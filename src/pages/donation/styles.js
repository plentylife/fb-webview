import {lightGreen} from 'material-ui/colors';
import {viewPath} from "../../utils/Common";

const styles = theme => {
  console.log("styles theme", theme);
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
    adPaper: Object.assign({}, this.paper, {
      border: '1px solid black',
      borderRadius: 0,
      background: 'url(' + viewPath('/resources/linedpaper.png') + ")"
    }),
    adTitle: {
      borderBottom: '1px solid black',
      paddingRight: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      marginTop: 3,
      display: 'inline-block',
      marginBottom: 3,
      paddingBottom: 3
    },
    profilePic: {
      maxHeight: 30
    },
    token: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      color: theme.palette.text.secondary,
      fontFamily: "'Patrick Hand', sans-serif"
      // marginLeft: '0.5em',
      // marginRight: '0.5em',
    },
    tokenContainer: Object.assign({
      flexWrap: 'wrap',
      alignItems: 'baseline',
      alignContent: "space-between"
    }, theme.fullWidth),
    selectable: {
      marginLeft: '0.3em',
      marginRight: 0,
      fontSize: "1.7em"
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
      // color: theme.palette.secondary["900"]
      color: 'black'
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
    singleCommentContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: 0,
      paddingBottom: theme.spacing.unit
    },
    commentUserName: {
      maxWidth: '9em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginRight: '3px',
      marginLeft: 3
    },
    commentInfo: {
      color: theme.palette.text.secondary,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 'smaller'
    },
    commentLinksContainer: {
      marginBottom: '0.3em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: "center",
      width: '100%'
    },

    controlPanelContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: '1em',
      alignItems: "center",
      flexWrap: 'wrap',
    },
    secondaryButton: {
      border: '1px solid black',
      padding: '3px 5px',
      minHeight: 0
    },
    shareSuccess: {
      maxWidth: '10em',
      textAlign: 'justify',
      padding: theme.spacing.unit
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


    rpButton: {
      padding: 3,
      minHeight: 'auto',
      fontSize: 'small'
    }, rpContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
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
    successBackground: {
      backgroundColor: lightGreen['500']
    },
    waitButton: {
      backgroundColor: lightGreen['500']
    },
    successTypo: {
      width: 100
    },
    inheritTextProps: {
      color: 'inherit',
      fontSize: 'inherit'
    },
    withMinimalTopMargin: {
      marginTop: 3
    },
    keepLowercase: {
      textTransform: 'none'
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row'
    }
  }
};

export default styles;