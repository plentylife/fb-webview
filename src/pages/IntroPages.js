import {Tenge} from 'utils/Common'
import React, {Component} from 'react'
import {Text, View} from "react-native";
import {Button, Typography} from "material-ui";
import {withStyles} from 'material-ui/styles';
import cn from 'classnames'

class IntroPages extends Component {
  static lastScreenIndex = 2;

  constructor(props) {
    super(props);
    this.state = {
      screenIndex: 0,
    };

    console.log("intro", props);
    props.onIntro();
    this.onNext = this.onNext.bind(this)
  }

  getScreen() {
    if (this.state.screenIndex === 0) {
      let n = this.props.info ? this.props.info.name : null;
      return (<FirstScreen name={n}/>)
    } else if (this.state.screenIndex === 1) {
      return (<SecondScreen/>)
    } else if (this.state.screenIndex === 2) {
      return (<ThirdScreen/>)
    } else if (this.state.screenIndex > IntroPages.lastScreenIndex) {
      this.props.history.goBack()
    }
  }

  onNext() {
    this.setState({screenIndex: this.state.screenIndex + 1})
  }

  render() {
    let c = this.props.classes;
    return (
      <View className={c.container}>
        {this.getScreen()}
        <Button className={c.button} raised color="primary" onClick={this.onNext}>Next</Button>
        <Typography type="caption" className={c.counter}>{this.state.screenIndex + 1}
          / {IntroPages.lastScreenIndex + 1} </Typography>
      </View>
    )
  }
}

function FirstScreenComp(props) {
  let c = props.classes;
  return <View>
    <img src={viewPath('/resources/logo-400.png')} style={{width: '40%', alignSelf: 'center'}}/>
    <Typography component={Text} style={{textAlign: 'center'}} className={cn(c.text, c.heavyBottomGutter)}>
      {props.name ? props.name + ", y" : "Y"}ou found a gem! You found
      <Plenty/>
    </Typography>
    <Typography component={Text} className={props.classes.text}>
      <Plenty noMargin/> is an auction with a kick: money that you earn expires</Typography>
    <Typography component={Text} className={props.classes.text}>Don't worry though, you can't set a price on your offers
      anyways</Typography>
    <Typography component={Text} className={cn(c.text, c.heavyBottomGutter)}>Use
      <Plenty/> to get rid of good stuff you don't use</Typography>
  </View>
}

function PlentyComp(props) {
  let c = props.classes;
  return <Typography className={cn(c.plenty, props.noMargin ? c.noMargin : null)}>
    {props.lower ? 'p' : 'P'}lenty</Typography>
}

function SecondScreenComp(props) {
  let c = props.classes;
  return <View>
    <Typography component={Text} className={props.classes.text}>
      Ultimately, <Plenty/> is much more than that
    </Typography>
    <Typography component={Text} className={props.classes.text}>
      It is a virtual currency that is designed to give us back our humanity, it is designed to change what profit means
      forever
    </Typography>
    <Typography component={Text} style={{width: '80%'}} className={cn(props.classes.text)}>
      The currency is called
      <span className={c.thanks}>{Tenge}hanks</span>
    </Typography>
    <Typography component={Text} className={cn(props.classes.text, c.heavyBottomGutter)}>
      Its mathematical model guarantees that profit and goodwill are one and the same
    </Typography>
  </View>
}

function ThirdScreenComp(props) {
  let c = props.classes;
  return <View>
    <Typography component={Text} className={props.classes.text}>
      This app is very simple to use
    </Typography>
    <Typography component={Text} className={props.classes.text}>
      There are only two screens: posting an offer and viewing an offer
    </Typography>
    <Typography component={Text} className={cn(props.classes.text, c.heavyBottomGutter)}>
      We are blessed that you found this project; with every user we breathe humanity into our corporate world
    </Typography>
    <Typography component={Text} className={props.classes.text}>There is <Plenty lower/> to save the world</Typography>
  </View>
}

const styles = (theme) => {
  let base = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      height: '100%',
      alignItems: 'center',
    },
    button: {
      marginTop: theme.spacing.unit * 1,
      maxWidth: '40%'
    },
    text: {
      maxWidth: '80%',
      textAlign: 'justify',
      fontSize: '1.1em',
      alignSelf: 'center',
      marginTop: theme.spacing.unit
    },
    plenty: {
      fontWeight: 700,
      fontFamily: "'Comfortaa', sans-serif",
      fontSize: '1.1em',
      display: 'inline',
      color: '#255467ff',
      marginLeft: '0.2em'
    },
    counter: {
      marginTop: theme.spacing.unit,
    },
    heavyBottomGutter: {
      marginBottom: theme.spacing.unit * 3
    },
    noMargin: {
      margin: 0
    }
  };
  return Object.assign(base, {
    thanks: Object.assign({}, base.plenty, {
      // fontSize: '1em'
    })
  })
};

const FirstScreen = withStyles(styles)(FirstScreenComp);
const SecondScreen = withStyles(styles)(SecondScreenComp);
const ThirdScreen = withStyles(styles)(ThirdScreenComp);
const Plenty = withStyles(styles)(PlentyComp);

export default withStyles(styles)(IntroPages)