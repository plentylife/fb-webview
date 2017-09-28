import React from "react"
import TextField from 'material-ui/TextField';
import ContentTemplate from '../templates/ContentTemplate'

const NewDonationPage = () => {
  return (
    <ContentTemplate title="Posting a donation">
      <TextField
        hintText="This is the attention grabber"
        floatingLabelText="Title"
        floatingLabelFixed={true}
      />
    </ContentTemplate>
  );
};

export default NewDonationPage