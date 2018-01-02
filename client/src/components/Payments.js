import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render(){
      return (
        <StripeCheckout
          name="Emaily"
          description="Buy credits to send out surveys."
          amount={500} // in cents so in USD its would be $5
          currency="USD"
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={token => this.props.handleStripeToken(token)}
        >
        <a>
          Add Credits
        </a>
        </StripeCheckout>
      );
  };

}

export default connect(null,actions)(Payments);
