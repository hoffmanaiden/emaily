import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className='fixed-action-btn'>
        <Link to="/surveys/new" className='btn-floating btn-large blue'>
          <i className='large material-icons'>create</i>
        </Link>
      </div>
    </div>
  );
}


export default Dashboard;