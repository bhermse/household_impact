import React from 'react';
import Slider from 'react-rangeslider';
import { nextAndHideFooter, tagEvent } from '../lib/Utility.js';

/**
 * Panel displaying spending sliders. These will dynamically update the net impact without re-querying
 * the API
 */
class Spending extends React.Component {
  constructor(props) {
    super(props);
    this.nextButton = React.createRef();
  }

  handleChange = event => {
    // pass to slide event
    this.setState({ [event.target.name]: event.target.value });
  };

  slideComplete = prop => tagEvent('slide', prop);

  render() {
    return (
      <div id="spending" className="ccl_card pre_calculate input">
        <div></div>
        <div>
          <div className="calculating text-center">
            <div className="spinner">
              <svg className="wait_spinner" xmlns="http//www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle className="green_circle" cx="50" cy="50" r="45" strokeDasharray="141.37" />
                <circle className="blue_circle" cx="50" cy="50" r="30" strokeDasharray="94.248" />
              </svg>
            </div>
            <h2>Crunching the numbers...</h2>
          </div>

          <div className="spending_panel">
            <div className="form_title">Almost done. Just a couple more questions about your spending.</div>

            <div className="spending sub_heading">
              Use the sliders below to tell us how much your family spends on gasoline and utilities each month. If you
              aren't sure, just leave the sliders at their initial values, which are reasonable guesses based on your
              information.
              <br />
              <br />
              <strong>
                The following values are for your family of{' '}
                {parseInt(this.props.adults) + parseInt(this.props.children)}:
              </strong>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                this.nextButton.current.click();
              }}
            >
              <div className="form-group">
                <label htmlFor="gas" className="label_lg">
                  How much is your family's average monthly gasoline expenditure? ${' '}
                </label>
                <label htmlFor="gas" className="label_sm">
                  Avg. monthly gasoline expenditure? ${' '}
                </label>
                <input
                  size="3"
                  className="form-control expense_text"
                  id="gas"
                  name="gas"
                  value={this.props.gas}
                  onChange={event => {
                    this.props.handleSlide('gas', event.target.value);
                  }}
                />
                <a data-toggle="modal" data-target="#gasExpense" className="explanation_prompt">
                  Explain this
                </a>
                <div className="slider_wrapper">
                  <Slider
                    min={0}
                    max={this.props.gas_upr}
                    step={1}
                    value={this.props.gas}
                    onChange={val => {
                      this.props.handleSlide('gas', val);
                    }}
                    onChangeComplete={e => this.slideComplete('gas')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="elec" className="label_lg">
                  How much is your family's average monthly electricity bill? ${' '}
                </label>
                <label htmlFor="elec" className="label_sm">
                  Average monthly electricity bill? ${' '}
                </label>
                <input
                  size="3"
                  className="form-control expense_text"
                  id="elec"
                  name="elec"
                  value={this.props.elec}
                  onChange={event => {
                    this.props.handleSlide('elec', event.target.value);
                  }}
                />
                <a data-toggle="modal" data-target="#multipleProperties" className="explanation_prompt">
                  Explain this
                </a>
                <div className="slider_wrapper">
                  <Slider
                    min={0}
                    max={this.props.elec_upr}
                    step={1}
                    value={this.props.elec}
                    onChange={val => {
                      this.props.handleSlide('elec', val);
                    }}
                    onChangeComplete={e => this.slideComplete('elec')}
                  />
                </div>
              </div>

              {this.props.initial_heat > 0 && (
                <div className="form-group">
                  <label htmlFor="heat" className="label_lg">
                    What is your family's average monthly {this.props.heating_type.toLowerCase()} expenditure? ${' '}
                  </label>
                  <label htmlFor="heat" className="label_sm">
                    Avg. monthly {this.props.heating_type.toLowerCase()} expenditure? ${' '}
                  </label>
                  <input
                    size="3"
                    className="form-control expense_text"
                    id="heat"
                    name="heat"
                    value={this.props.heat}
                    onChange={event => {
                      this.props.handleSlide('heat', event.target.value);
                    }}
                  />
                  <a data-toggle="modal" data-target="#multipleProperties" className="explanation_prompt">
                    Explain this
                  </a>
                  <div className="slider_wrapper">
                    <Slider
                      min={0}
                      max={this.props.heat_upr}
                      step={1}
                      value={this.props.heat}
                      onChange={val => {
                        this.props.handleSlide('heat', val);
                      }}
                      onChangeComplete={e => this.slideComplete('heat')}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="footer spending_footer">
          <button
            href="#results"
            className="btn btn-default"
            id="btn_spending_next"
            ref={this.nextButton}
            onClick={e => {
              nextAndHideFooter(e, '#results');
            }}
          >
            SHOW RESULTS
          </button>

          <a href="/personal-carbon-dividend-calculator-faq/" className="faq_link" target="_blank">
            Calculator FAQ
          </a>
        </div>
      </div>
    );
  }
}

export default Spending;
