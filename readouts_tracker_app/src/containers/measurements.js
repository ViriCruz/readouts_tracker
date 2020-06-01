import React from 'react'
import {Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import Measurements from '../api/fetchMeasurements';
import { getMeasurements, getMeasurementsError, getMeasurementsPending } from '../reducers/measurementReducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const data = [
    { subject: 'books', A: 120, B: 110, fullMark: 20 },
    { subject: 'audiobooks', A: 98, B: 130, fullMark: 150 },
    { subject: 'articles', A: 86, B: 130, fullMark: 150 },
    { subject: 'manga', A: 99, B: 100, fullMark: 150 },
    { subject: 'comics', A: 85, B: 90, fullMark: 150 },
    
];

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

  componentDidMount(){
    const { fetchMeasurements } = this.props
    const token = localStorage.getItem('__token__')
    fetchMeasurements(token)
  }
  
  render () {
    return (
      <RadarChart cx={150} cy={200} outerRadius={70} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="B" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Measure)