import React from 'react'
import axios from 'axios';
import {DetailDialogues} from './DetailDialogues.jsx'
import Introduction from './Introduction.jsx'
import FamilyInfo from './FamilyInfo.jsx'
import HomeInfo from './HomeInfo.jsx'
import Spending from './Spending.jsx'
import Results from './Results.jsx'
import BasicInfoData from './BasicInfoData.jsx'
import Menu from './Menu.jsx'
import numeral from 'numeral/min/numeral.min.js';
import {nextSection, nextAndHide, toCurrency, numberOptionList} from '../lib/Utility.jsx'
import {} from '../lib/Utility.jsx';
//import {callAPI} from '../lib/ImpactStudyAPI.js'
require('../images/favicon.ico')

const impact_study_url = 'https://ummel.ocpu.io/exampleR/R/predictModel/json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { div_pre: 0, mrate: 0.15, elec: 100, gas: 75, heat: 50, cost: '', net_impact: 0, moe: 0, gas_upr: 200, elec_upr: 200,
                  heat_upr: 300, carbon_cost: 0, div_post: 0, initial_heat: 0, initial_gas: 0, initial_elec: 0, div_month: 0, cost_month: 0, impact_month: 0,
                  adults: 1, children: 0, loading: false, heating_type: 'Natural gas', vehicles: 2, zip: '', dwelling_type: 'Stand-alone house'}
    //this.calculate = callAPI.bind(this);
  }

  //calculate = callAPI.bind(this);
  setAttribute = (event) => { this.setState({ [event.target.name]: event.target.value }); }
  setLoading = (loading) => { this.setState({ loading: loading }) }

  handleSlide = (prop, value) => {
    this.setState({[prop]: value})
    this.calculateCost()
  }

  setResults = (e) => {
    //console.log(e)
    this.setState(e)
    this.setState({initial_gas: e.gas, initial_elec: e.elec, initial_heat: e.heat})
    this.calculateCost()
    this.setLoading(false);
  }

  calculate = (e) => {
    if (this.state.zip) {
      $('.pre_calculate').removeClass('pre_calculate').addClass('post_calculate')
      $('.spending_panel, .search_failed').hide();
      this.nextAndRename(e, '#spending');

      var data = {input: [{
        zip: this.state.zip,
        na: Number(this.state.adults),
        nc: Number(this.state.children),
        hinc: this.state.income,
        hfuel: this.state.heating_type,
        veh: Number(this.state.vehicles),
        htype: String(this.state.dwelling_type)
      }]};

      const setLoading = this.state.setLoading;
      const setResults = this.setResults

      this.setLoading(true);
      $('.calculating').fadeIn('slow');
      const zip = this.state.zip
      const basic_questions = this.state;

      axios.post(impact_study_url, JSON.stringify(data), {responseType: 'json', headers: {'Content-Type': 'application/json'}}).
        then(function(response) {
          $('.calculating').fadeOut('slow', function() {
            $('.spending_panel, .btn_results').fadeIn('slow', function() {
              setResults({...response.data[0]})
            });
          });
        }).catch(function(error) {
          nextSection(e, '#home_questions')
          $('.search_failed').fadeIn('slow');

          $('.calculating').fadeOut('slow', function() {
            $('.post_calculate').addClass('pre_calculate').removeClass('post_calculate');
            setLoading(false);
          });

          zip.select();
          console.log(error);
        })
    }
  }

  basicInfoUpdated = (e) => {
    // if we already have a cost formula and we have a valid zip
    // call API, swap out cost presets
    // TODO: global indicator for API call?
  }

  calculateCost = () => {
    const elec = this.state.elec
    const gas = this.state.gas
    const heat = this.state.heat
    const cost = eval(this.state.cost)
    const div_post = numeral(this.state.div_pre).value() * (1.0 - numeral(this.state.mrate).value())
    const carbon_cost = Math.round(cost / 12)
    const div = Math.round(div_post / 12)

    this.setState({
      net_impact: div - carbon_cost,
      carbon_cost: toCurrency(carbon_cost),
      div_post: toCurrency(div)
    })
  }

  valid = () => { this.state.zip }
  validZip = (e) => {
    e.persist();
    const re = /^[0-9]{0,5}$/
    const newval = e.target.value + e.key
    const highlighted = window.getSelection().toString()
    if (!re.test(newval) && !highlighted) { e.preventDefault(); }
  }

  
  nextAndRename = (e) => {
    e.persist();
    nextSection(e, '#spending', function() {
      $(e.target).html('RECALCULATE');
    })
  }

  setIncome = (income) => { this.setState({income: income}) }

  render() {
    return (
      <div id="impact_calculator">
        {process.env['SHOW_MENU'] &&
          <Menu/>
        }
        <Introduction/>
        <FamilyInfo handleChange={this.setAttribute} income={this.state.income} setIncome={this.setIncome} />
        <HomeInfo setResults={this.setResults} validZip={this.validZip} setLoading={this.setLoading} 
          calculate={this.calculate} valid={this.valid} zip={this.state.zip} setAttribute={this.setAttribute} />
        <Spending {...this.state} handleSlide={this.handleSlide} setResults={this.setResults} />
        <BasicInfoData {...this.state}/>
        <Results results={this.state}/>
        <DetailDialogues />
      </div>
    )
  }
}

export default App
