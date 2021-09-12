CON_KEY = "XIIUXESKP989BVUXA5TTX0AQZRUZZNQB";

CURR_CHART = null;


function getSelectedRadioBtn(){

var buttons = document.getElementsByTagName( 'input' );
    for( i = 0; i < buttons.length; i++ ) {
        if(buttons[i].type == 'radio' && buttons[i].checked ) {
            return buttons[i].value;
        }
    }

return 'day';

}


function sendGet(url, params, callback){
	conn = new XMLHttpRequest();
    
    paramsEncoded = "?" + Object.keys(params).map(
	function(key){
          return key+"="+encodeURIComponent(params[key])
        }).join("&");
		
	conn.open( "GET", url + paramsEncoded, true ); 
	
	
	prevValue = "";
	
     conn.onreadystatechange = (e) => {
		if(conn.responseText != ''){
			
		if(conn.responseText != prevValue){
			callback(conn.responseText);
			prevValue = conn.responseText;
		}
			
		
		}
		 
	 }
	 conn.send();
	
}

function getHistoricalQuote(symbol, rangeBack){
	switch(rangeBack) {
  case 'day':
    
	params = {
		
		'apikey': CON_KEY,
		'periodType': 'day',
		'period': '1',
		'frequencyType': 'minute',
		'frequency': '5'
		
	};
	
	sendGet("https://api.tdameritrade.com/v1/marketdata/" + symbol.toUpperCase() +"/pricehistory", params, loadChart)
	
    break;
	
  case 'week':
  
  params = {
		
		'apikey': CON_KEY,
		'periodType': 'day',
		'period': '5',
		'frequencyType': 'minute',
		'frequency': '60'
		
	};
    
	sendGet("https://api.tdameritrade.com/v1/marketdata/" + symbol.toUpperCase() +"/pricehistory", params, loadChart)
	
    break;
	
  case 'month':
  params = {
		
		'apikey': CON_KEY,
		'periodType': 'month',
		'period': '1',
		'frequencyType': 'daily',
		'frequency': '1'
		
	};
	
	sendGet("https://api.tdameritrade.com/v1/marketdata/" + symbol.toUpperCase() +"/pricehistory", params, loadChart)
	
    break;
	
  case 'year':
  params = {
		
		'apikey': CON_KEY,
		'periodType': 'year',
		'period': '1',
		'frequencyType': 'weekly',
		'frequency': '1'
		
	};
	
	sendGet("https://api.tdameritrade.com/v1/marketdata/" + symbol.toUpperCase() +"/pricehistory", params, loadChart)
	
    break;
  default:
    params = {
		
		'apikey': CON_KEY,
		'periodType': 'ytd',
		'period': '1',
		'frequencyType': 'weekly',
		'frequency': '1'
		
	};
	
	sendGet("https://api.tdameritrade.com/v1/marketdata/" + symbol.toUpperCase() +"/pricehistory", params, loadChart)
	
}
	
}

function loadChart(data){
	
	rawJSONObject=JSON.parse(data);
	
	candles = rawJSONObject['candles'];
	
	dataArr = [];
	labelArr = [];
	
	for(i = 0; i < candles.length; i++){
		
		dataArr.push(candles[i].open);
		labelArr.push(candles[i].datetime);
		
	}
	
	if(CURR_CHART !== null){
		CURR_CHART.destroy();
	}
	
var graphElement = document.getElementById("stockGraph");
CURR_CHART = new Chart(graphElement, {
type: 'line',
data: {
    labels: labelArr,
  datasets: [{
    axis: 'y',
    label: rawJSONObject.symbol,
    data: dataArr,
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
}
});
	
}