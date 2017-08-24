import React from 'react'
import '../css/FallbackPage.css'

const FallbackPage = () => {
  return (
    <div id="fp-container">
      <p>Due to inherit limitations of Facebook, we are not able to provide you an experience of <i>Plenty</i></p>
      <p>The reasons might be one of the following</p>
      <ul>
        <li><b>You are using the web version of FB</b><br/> FB is working on bringing mobile
          capabilities to their web platform, and as soon as they do, you will be able to use <i>Plenty</i></li>
        <li>
          <b>You are using the mobile version of FB messenger</b><br/> Sorry, but you are out of luck. There is nothing we can do.
        </li>
      </ul>
    </div>
  )
};

export default FallbackPage