import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['BTC', 'ETH', 'ADA',
           'USDT', 'BNB'],
  datasets: [
    {
      label: 'Crypto Trend',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [45585, 3335.89, 2.58, 1, 404.84]
    }
  ]
}

export default class Graph extends React.Component {
    render() {
      return (
        <div>
          <Line
            data={state}
            options={{
            responsive: false,
              title:{
                display:true,
                text:'Crypto',
                fontSize:10
              },
              legend:{
                display:true,
                position:'left'
              }
            }}
          />
        </div>
      );
    }
  }