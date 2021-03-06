import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {ScrollView} from 'react-native';
import ContentTemplate from 'templates/ContentTemplate'
import Paper from 'material-ui/Paper';
import Error from 'templates/ErrorTemplates'
import ServerComms from 'utils/ServerComms'
// fixme mobile will fail
import {Divider, List, ListItem, Typography} from "material-ui";
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import ViewPage from "./donation/ViewPage";

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      items: null,
      search: SearchPage.getQuery(props),
      loading: false, // because it should be set in update()
      nothingFound: false
    };

    this.update(props)
  }

  componentWillReceiveProps(nextProps) {
    if (SearchPage.getQuery(nextProps) != SearchPage.getQuery(this.props)) {
      this.update(nextProps)
    }
  }

  static getQuery(props) {
    let q = props.location.search.replace("?q=", "");
    return decodeURI(q)
  }

  static hasQuery(props) {
    return !props.location || props.location.search.includes("?q=")
  }

  update(props) {
    // this.setState({loading: true});
    // if (SearchPage.getQuery(props)) {
      new Promise((resolve, reject) => {
        this.setState({loading: true});
        ServerComms.search(SearchPage.getQuery(props)).then(res => {
          let items = res.map(d => {
            let tagged = d.description.filter(t => (t.isTagged));
            return {id: d.id, tokens: tagged}
          });
          console.log("search", res, items, items.length === 0);
          this.setState({items: items, error: "", loading: false, nothingFound: items.length === 0})
        }).catch(e => {
          this.setState({error: "oops... could not get results", loading: false})
        });

        resolve()
      })
    // }
  }

  render() {
    let c = this.props.classes;
    console.log("nothing found, loading", this.state.nothingFound, this.state.loading, SearchPage.hasQuery(this.props));
    return (
      <ContentTemplate title="Search results" search={this.state.search} history={this.props.history}>
        <Error error={this.state.error}/>
        {this.state.loading && <Loading/>}

        <ScrollView className={c.scrollView}>
          <List>
            {this.state.items && this.state.items.map(i => {
              return (<SearchItem id={i.id} key={i.id} tokens={i.tokens}/>)
            })}
            {!this.state.loading && this.state.nothingFound && <NothingFound/>}

          </List>

        </ScrollView>
      </ContentTemplate>
    )
  }

}

//{/*{!this.state.loading && this.state.nothingFound && SearchPage.hasQuery(this.props) && <NothingFound/>}*/}
//{/*{!SearchPage.hasQuery(this.props) && !this.state.loading && <SearchNotStarted/>}*/}

class SearchItemComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    let c = this.props.classes;
    let descr = this.props.tokens.map(t => (t.token)).join(' , ');

    return (
      [<ListItem key="tags" className={c.item} onClick={this.onPress}>
        <Typography>{descr}</Typography>
        {this.state.expanded ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>,
        <Collapse key="view" in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          <ViewPage id={this.props.id} inline={true}/>
          <Divider/>
        </Collapse>
      ]
    )
  }
}


function NothingFoundComp(props) {
  return (
    <Paper className={props.classes.item}>
      <Typography>nothing found :(</Typography>
    </Paper>
  )
}

function SearchNotStartedComp(props) {
  return (
    <Paper className={props.classes.item}>
      <Typography>Please enter a search tag into the search bar above</Typography>
    </Paper>
  )
}

function LoadingComp(props) {
  return (
    <Paper className={props.classes.item}>
      <Typography>Loading results...</Typography>
    </Paper>
  )
}

const styles = (t) => ({
  scrollView: {
    paddingTop: t.spacing.unit,
    paddingBottom: t.spacing.unit,
    // padding: t.spacing.unit,
    width: '100%',
  },
  item: {
    padding: t.spacing.unit
  }

});

const SearchItem = withStyles(styles)(SearchItemComp);
const NothingFound = withStyles(styles)(NothingFoundComp);
const SearchNotStarted = withStyles(styles)(SearchNotStartedComp);
const Loading = withStyles(styles)(LoadingComp);

export default withStyles(styles)(SearchPage)