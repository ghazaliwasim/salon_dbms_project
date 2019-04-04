import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
  render () {
    return (
      <div>
        <Link to="/salon">Salons</Link>
      </div>
    );
  }
}

export default HomePage;
