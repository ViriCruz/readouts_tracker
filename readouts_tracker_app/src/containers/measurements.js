import React from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import 'moment-timezone';
import Measurements from '../api/fetchMeasurements';
import { getMeasurements, getMeasurementsError, getMeasurementsPending } from '../reducers/measurementReducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4f456b'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, _index }) => {
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

export class Measure extends React.Component {

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
    const today = new Date();
    const day = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    fetchMeasurements(token, day)
  }
  
  render () {
    const { data } = this.props.measurements
    const categories = []
    
    if(data.length > 0){
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="mt-3 date">
            <Moment format="D MMM YYYY" withTitle>{data.day}</Moment>
          </div>
          
          <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data} 
              cx={400} 
              cy={200} 
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80} 
              fill="#8884d8"
              dataKey="value"
            >
              {
                data.map((_entry, index) => {
                  categories[index] = { name: _entry.name, fill: COLORS[index % COLORS.length]}
                  return <Cell fill={COLORS[index % COLORS.length]} key={index % COLORS.length} />
                })
              }
            </Pie>
          </PieChart>
          <div className="align-self-between">
            <ul>
              {
                categories.map(cat => {
                  return <li 
                    className="d-flex"
                    key={cat.fill}
                    >
                    <span style={{ backgroundColor: cat.fill, width:"20px", height:"20px", display: 'inline-block' }}></span>
                    <span className="ml-2 cat-name">{cat.name}</span>
                    </li>
                }) 
              }
            </ul>
          </div>
          <div className="p-3 btn btn-secondary">
            <Link to="/categories" className="text-decoration-none text-white">Go back</Link>
          </div>
        </div>
      );
    }else {
      return(
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>You haven't read nothing today.</p>
          <p>Start measure <Link to="/categories">a reading.</Link></p>
        </div>
      )
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Measure)