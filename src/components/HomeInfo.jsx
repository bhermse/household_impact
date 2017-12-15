import React from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import NumericInput from 'react-numeric-input';
import {nextSection, toCurrency, numberOptionList} from '../lib/Utility.jsx';

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class HomeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {heating_type: 'Natural gas', vehicles: 2, zip: '', dwelling_type: 'Stand-alone house'}
  }

  valid = () => { return (this.props.income && this.state.zip) }
  handleChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }

  validZip = (e) => {
    const re = /^[0-9]{0,5}$/
    const newval = e.target.value + e.key
    const highlighted = window.getSelection().toString()
    if (!re.test(newval) && !highlighted) { e.preventDefault(); }
  }

  calculate(e) {
    if (this.valid()) {
      $('.pre_calculate').removeClass('pre_calculate').addClass('post_calculate')
      $('.spending_panel, .search_failed').hide();
      nextSection(e, '#spending');

      var data = {input: [{
        zip: this.state.zip,
        na: Number(this.props.adults),
        nc: Number(this.props.children),
        hinc: this.props.income,
        hfuel: this.state.heating_type,
        veh: Number(this.state.vehicles),
        htype: String(this.state.dwelling_type)
      }]};

      const respond = this.props.setResults;

      $('.calculating').fadeIn('slow');
      const zip = this.refs.zip
      const basic_questions = this.state;

      axios.post(impact_study_url, JSON.stringify(data), {responseType: 'json', headers: {'Content-Type': 'application/json'}}).
        then(function(response) {
          $('.calculating').fadeOut('slow', function() {
            $('.spending_panel, .btn_results').fadeIn('slow', function() {
              respond({...response.data[0], ...basic_questions})
            });
          });
        }).catch(function(error) {
          nextSection(e, '#home_questions')
          $('.search_failed').fadeIn('slow');

          $('.calculating').fadeOut('slow', function() {
            $('.post_calculate').addClass('pre_calculate').removeClass('post_calculate');
          });

          zip.select();
          console.log(error);
        })
    }
  }


  render() {
    return (
      <div id="home_questions" className="card input initially_hidden">
        <div className="basic_info_panel">
          <div className="home_info_panel section">
            <div className="search_failed">
              <div className="alert alert-info" role="alert">
                Sorry, we couldn't find information for this search. Please double-check your zip code
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="zip">What's your zip code?</label>
              <input size="8" className="form-control input-lg number_select" id="zip" name="zip" placeholder="Zip Code" ref="zip"
                value={this.state.zip} onChange={this.handleChange} onKeyPress={(e) => this.validZip(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="dwelling_type">What type of home do you live in?</label>
              <select className="form-control input-lg" id="dwelling_type" name="dwelling_type" value={this.state.dwelling_type}
                onChange={this.handleChange}>
                <option>Stand-alone house</option>
                <option>Apartment building</option>
                <option value='Townhouse or other attached housing'>Townhouse/Condo</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vehicles">How many vehicles does your household use regularly?</label>
              <select className="form-control input-lg number_select" id="vehicles" name="vehicles" value={this.state.vehicles}
                onChange={this.handleChange}>
                {numberOptionList(0, 4)}
                <option value='5'>5+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="heating_type">What kind of fuel heats your home?</label>
              <select className="form-control input-lg" id="heating_type" name="heating_type" value={this.state.heating_type}
                onChange={this.handleChange}>
                <option>Natural gas</option>
                <option>Electricity</option>
                <option>LPG/Propane</option>
                <option>Heating oil</option>
                <option>Other or none</option>
                <option>Do not know</option>
              </select>
            </div>
          </div>
        </div>
        <div className="footer">
          <button className={"btn btn-default " + (this.valid() ? '' : 'disabled')} href="#spending" id="calculate_button"
            onClick={(e)=>{this.calculate(e)}}>
            NEXT
          </button>
        </div>
      </div>
    )
  }
}

export default HomeInfo;
