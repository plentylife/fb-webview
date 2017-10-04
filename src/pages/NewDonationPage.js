import React from "react"
import TextField from 'material-ui/TextField';
import { AppRegistry, ScrollView, Image, Text, View } from 'react-native';
import ContentTemplate from '../templates/ContentTemplate'

const NewDonationPage = (props) => {

  return (
    <ContentTemplate title="Posting a donation">
      <Text>donation page</Text>
      <TextField
        label="With placeholder multiline"
        placeholder="Placeholder"
        multiline
        margin="normal"
        helperText="Please select your currency"
      />
    </ContentTemplate>
  );
};

export default NewDonationPage