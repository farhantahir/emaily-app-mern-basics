import {connect} from 'react-redux';
import React,{Component} from 'react';

class Landing extends Component{
  render() {
    return (
      <div className="center-align">
        <h1>
          Emaily!
        </h1>
        <p>Connect with your users and get a realtime feedback.</p>
      </div>
    );
  };
}


const mapStateToProps = ({auth}) => ({ auth });
export default connect(mapStateToProps,null)(Landing);
