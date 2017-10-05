import React from 'react'
import numeral from 'numeral/min/numeral.min.js'

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="results" className="card pre_calculate">
                <div></div>
                <div>
                    <div className="row"><div className="col-xs-12 form_title">Your Results</div></div>
                    <div className="explanation">
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8"><h4>Yearly post-tax dividend</h4></div>
                        <div className="col-xs-4 dividend"><h4>{this.props.results.div_post}</h4></div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-sm-12 text-muted">Dividend checks are based on the number of people in a household, not on income or spending.</div>
                    </div>
                    <div className="row top_buffer">
                        <div className="col-xs-8"><h4>Cost of carbon fee</h4></div>
                        <div className="col-xs-4 cost"><h4>{this.props.results.carbon_cost}</h4></div>
                    </div>
                    <div className="row top_buffer bottom_buffer">
                        <div className="col-sm-12 text-muted">Calculated by looking at your location and energy usage.</div>
                    </div>
                    <div className="impact_panel">
                      <div className="row top_buffer">
                          <div className="col-xs-8 form_title">Estimated net impact per year*</div>
                          <div className="col-xs-4 form_title net_impact">{this.props.results.net_impact}</div>
                      </div>
                      <div className="row top_buffer">
                          <div className="col-sm-12 text-muted summary">
                              <span className="summary_profit">
                                {numeral(this.props.results.net_impact).value() > 0 &&
                                  "Awesome! You should end up with some extra money each year."
                                }
                              </span>
                          </div>
                      </div>
                      <div className="row top_buffer">
                          <div className="col-sm-12 text-muted">Want more money in your pocket? <a href="#">Learn how to reduce your footprint</a> and keep more of your dividend check</div>
                      </div>
                      <div className="share_row row">
                        <div className="col-sm-12 text-muted"><label>Print: </label><a href="javascript:window.print()"><i className="fa fa-print"></i></a>
                        <label>Share: </label> <i className="fa fa-twitter"></i><i className="fa fa-facebook"></i></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-muted">* In real life there are many other factors to consider. However, this estimate is expected to be accurate within a range of 75%</div>
                      </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

export default Results ;
