import React from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Measurements from '../api/fetchMeasurements';
import { getMeasurements, getMeasurementsError, getMeasurementsPending } from '../reducers/measurementReducer';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4f456b'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const mapStateToProps = state => ({
  measurements: {
    data: getMeasurements(state.measurements),
    error: getMeasurementsError(state.measurements),
    pending: getMeasurementsPending(state.measurements),
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMeasurements: Measurements.fetchMeasurements,
}, dispatch);

export class Measure extends React.Component {
  componentDidMount() {
    const { fetchMeasurements } = this.props;
    const token = localStorage.getItem('__token__');
    const today = new Date();
    const day = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    fetchMeasurements(token, day);
  }

  render() {
    const { measurements } = this.props;
    const { data } = measurements;
    const { day } = data;
    const categories = [];
    const localToken = localStorage.getItem('__token__');

    if (localToken === null) {
      return <Redirect to="/signin" />;
    }

    if (data.length > 0) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="mt-3 date">
            <Moment format="D MMM YYYY" withTitle>{day}</Moment>
          </div>

          <PieChart width={800} height={400}>
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
                  categories[index] = { name: _entry.name, fill: COLORS[index % COLORS.length] };
                  return <Cell fill={COLORS[index % COLORS.length]} key={_entry.name} />;
                })
              }
            </Pie>
          </PieChart>
          <div className="align-self-between">
            <ul>
              {
                categories.map(cat => (
                  <li
                    className="d-flex"
                    key={cat.fill}
                  >
                    <span style={{
                      backgroundColor: cat.fill, width: '20px', height: '20px', display: 'inline-block',
                    }}
                    />
                    <span className="ml-2 cat-name">{cat.name}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="p-3 btn btn-secondary">
            <Link to="/categories" className="text-decoration-none text-white">Go back</Link>
          </div>
        </div>
      );
    }
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>You haven&#39;t read nothing today.</p>
        <p>
          Start measure
          <Link to="/categories"> a reading.</Link>
        </p>
      </div>
    );
  }
}

renderCustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

Measure.defaultProps = {
  measurements: {
    data: [],
    pending: true,
    error: null
  },
};

Measure.propTypes = {
  fetchMeasurements: PropTypes.func.isRequired,
  measurements: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      day: PropTypes.string,
      value: PropTypes.number
    })),
    error: PropTypes.string,
    pending: PropTypes.bool
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(Measure);
