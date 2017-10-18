import Create from '../pages/donation/CreateDonationPage'
import ViewPage from '../pages/donation/ViewPage'
import {viewPath} from '../utils/Common'
import {View} from 'react-native';
import React from 'react';
import {Route} from 'react-router-dom'

const router = () => {
  return (
    <View>
      <Route exact path={viewPath("/donation/create")} component={Create}/>
      <Route exact path={viewPath("/donation/:id")} component={ViewPage}/>
    </View>
  )
};

export default router