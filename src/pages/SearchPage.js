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
      error: "",
      items: null,
      search: SearchPage.getQuery(props)
    };

    this.update(props)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.match.params.q != this.props.match.params.q) {
  //
  //   }
  // }

  static getQuery(props) {
    let q = props.location.search.replace("?q=", "");
    return decodeURI(q)
  }

  update(props) {
    ServerComms.search(SearchPage.getQuery(props)).then(res => {
      console.log(res);
      let items = res.map(d => {
        let tagged = d.description.filter(t => (t.isTagged));
        return {id: d.id, tokens: tagged}
      });
      this.setState({items: items})
    }).catch(e => {
      this.setState({error: "oops... could not get results"})
    })
  }

  render() {
    return (
      <ContentTemplate title="Search results" search={this.state.search}>

        <View>
          <Error error={this.state.error}/>
          {this.state.items && this.state.items.map(i => {
            return (<SearchItem id={i.id} key={i.id} tokens={i.tokens}></SearchItem>)
          })}

        </View>
      </ContentTemplate>
    )
  }

}

function SearchItem(props) {
  let descr = props.tokens.map(t => (t.token)).join(' , ');
  return (
    <Paper>
      <Typography>{descr}</Typography>
    </Paper>
  )
}

const styles = {};

export default withStyles(styles)(SearchPage)