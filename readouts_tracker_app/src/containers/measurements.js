import React from 'react'
import {Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis} from 'recharts';


const data = [
    { subject: 'books', A: 120, B: 110, fullMark: 20 },
    { subject: 'audiobooks', A: 98, B: 130, fullMark: 150 },
    { subject: 'articles', A: 86, B: 130, fullMark: 150 },
    { subject: 'manga', A: 99, B: 100, fullMark: 150 },
    { subject: 'comics', A: 85, B: 90, fullMark: 150 },
    
];

class Measure extends React.Component {
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

export default Measure