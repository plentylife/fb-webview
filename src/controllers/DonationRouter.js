import Create from '../pages/CreateDonationPages'
import {path} from '../utils/Common'
import {View} from 'react-native';
import React from 'react';
import {Route} from 'react-router-dom'

const router = () => {
  return (
    <View>
      <Route exact path={path("/donation/create")} component={Create}/>
    </View>
  )
};

export default router