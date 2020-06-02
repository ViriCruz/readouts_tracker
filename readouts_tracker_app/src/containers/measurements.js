import React from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts';

import Measurements from '../api/fetchMeasurements';
import { getMeasurements, getMeasurementsError, getMeasurementsPending } from '../reducers/measurementReducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const data = [{name: 'Group A', value: 1.4}, {name: 'Group B', value: 1.59},
                  {name: 'Group C', value: .6}, {name: 'Group D', value: 2.05}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x  = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy  + radius * Math.sin(-midAngle * RADIAN);

return (
  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
);
};              


const mapStateToProps = state => ({
  measurements: {
    data: getMeasurements(state.measurements),
    error: getMeasurementsError(state.measurements),
    pending: getMeasurementsPending(state.measurements)
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMeasurements : Measurements.fetchMeasurements
}, dispatch)

class Measure extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0
    }

    this.onPieEnter = this.onPieEnter.bind(this)
  }

  onPieEnter(index){
    this.setState({
      activeIndex: index
    })
  }

  componentDidMount(){
    const { fetchMeasurements } = this.props
    const token = localStorage.getItem('__token__')
    fetchMeasurements(token)
  }
  
  render () {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data} 
          cx={400} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((_entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
       </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Measure)