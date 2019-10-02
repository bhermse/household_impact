import React from 'react';
import { nextAndInvisible } from '../lib/Utility.js';

class Introduction extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="intro" className="ccl_card intro_container">
        <div></div>
        <div>
          <div className="calculator_title">Personal Carbon Dividend Calculator</div>

          <div className="explanation text-muted">
            Estimate your monthly financial impact from the Energy Innovation Act, based on your household and lifestyle
            factors.
          </div>
        </div>
        <div className="footer text-center">
          <button
            href="#living_situation"
            className="btn btn-default btn-intro"
            id="btn_intro_next"
            onClick={e => {
              nextAndInvisible(e, '#living_situation');
            }}
          >
            Get Started
          </button>
          <div className="cf_and_d_explanation text-muted">
            The{' '}
            <a href="https://energyinnovationact.org" target="_blank">
              Energy Innovation and Carbon Dividend Act
            </a>{' '}
            will reduce emissions by making it more expensive to pollute. To help offset higher prices for consumers,
            revenue generated by the carbon fee would be returned to families as a monthly dividend.
            <br />
            <br />
            This calculator estimates the impact of both the carbon fee and dividend for your specific family for the
            first year's fee of $15/ton.
          </div>
        </div>
      </div>
    );
  }
}

export default Introduction;
