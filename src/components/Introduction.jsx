import React from 'react';
import {nextAndInvisible} from '../lib/Utility.jsx';

class Introduction extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="intro" className="card intro_container">
        <div></div>
        <div>
          <div className="calculator_title">
            Carbon Fee and Dividend Calculator
          </div>

          <div className="explanation text-muted">
            Tell us a little bit about your U.S. household and get a personalized estimate of the impact on your budget.
          </div>
        </div>
        <div className="footer text-center">
         <div className="cf_and_d_explanation text-muted">
            Carbon fee and dividend will reduce emissions by making it more expensive to pollute. To help offset higher prices for consumers, revenue generated by the carbon fee would be returned to households as a monthly dividend.
            <br /><br />
            This calculator estimates the impact of both the carbon fee and dividend for your specific household for the first year's fee of $15/ton.
          </div>

          <button href="#basic_questions" className="btn btn-default btn-intro" 
            id="btn_intro_next" onClick={(e) =>{nextAndInvisible(e, '#basic_questions')}}>Get Started</button>
        </div>
      </div>
    )
  }
}

export default Introduction;
