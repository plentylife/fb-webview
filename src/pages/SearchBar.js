import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import {View} from "react-native";
import {Button} from "material-ui";
import {Link} from "react-router-dom";
import {viewPath} from "../utils/Common";


class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      q: ""
    };

    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate(e) {
    this.setState({q: e.target.value})
  }

  render() {
    return (
      <View className={this.props.classes.container}>
        <TextField placeholder="search" InputClassName={this.props.classes.bar} style={{backgroundColor: 'white'}}
                   onChange={this.onUpdate} defaultValue={this.props.search ? this.props.search : ""}
        />
        {!!this.state.q &&
        <Link className={this.props.classes.link} to={viewPath("/search/" + encodeURI(this.state.q))}>
          <Button className={this.props.classes.button} raised>go</Button>
        </Link>
        }
      </View>
    )
  }
}

const styles = {
  bar: {margin: 5},
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {justifyContent: 'flex-start', minWidth: "3em"},
  link: {textDecoration: 'none'}
};

export default withStyles(styles)(SearchBar)