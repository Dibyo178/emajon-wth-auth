import React from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
// import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './splitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51HaE41GtSLBuT33rCe9IIwiBX6YnZeMcymEfaNLpxzTRPk2o93QjyKCnIJgBuuDVeMLqOUMykLxDCkT5PfNEbG3Z00VtUOOUnJ');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
         <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;