import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {View} from 'react-native';
import ContentTemplate from 'templates/ContentTemplate'
import Paper from 'material-ui/Paper';
import Error from 'templates/ErrorTemplates'
import ServerComms from 'utils/ServerComms'
// fixme mobile will fail
import {Typography} from "material-ui";


class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: null,
      search: SearchPage.getQuery(props)
    };

    this.update(props)
  }

  // componentWillReceiveProps(nextProps) {
  // if (nextProps.match.params.q != this.props.match.params.q) {
  //
  // }
  // }

  static getQuery(props) {
    let q = props.location.search.replace("?q=", "");
    return decodeURI(q)
  }

  update(props) {
    ServerComms.search(SearchPage.getQuery(props)).then(res => {
      console.log(res)
      // items = res
    }).catch(e => {
      error = "oops... could not get results"
    })
  }

  render() {
    return (
      <ContentTemplate title="Search results" search={this.state.search}>

        <View>
          <Error error={this.state.error}/>
          <SearchItem></SearchItem>
        </View>
      </ContentTemplate>
    )
  }

}

function SearchItem(props) {
  return (
    <Paper>
      <Typography>item</Typography>
    </Paper>
  )
}

const styles = {};

export default withStyles(styles)(SearchPage)