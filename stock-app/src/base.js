REF_TOKEN = "2%2FyVE2EABr31acF1wOVnowP9X9rdHMWDUO8CN1fweapvyy%2FOLQHNqgwqJbceCbuQOwdR1EUfbRuAwN0INzEFv06KoHtW%2BpXkj7MmRLJeeb%2FAMGkcVs7HxIZtH4Uphrwh0IR8ICkB6fAN17ybuD7OA%2FHYuvzAAtSZI9t3HBa5xjSsTSfH%2BnoMz0PjrMp3wz54e3kPTB5%2Bvq2cZ36Ad7gzzCdZqWapZV3dE63YkhZgdOTIafSGP9rbNE6xhJ2dOJJ%2BCW4H5Q3DVaeztusIaqLj2Kqsz6X2CVUWl%2F36mSgX0cwus2TdmkLdh2yc5eB9CDjb19A%2BTB9n4nh%2FAT%2FrcKKXeheHnsYRuAk%2FTME0CJRWec6jLpvQSQeQSE5%2FFVrWbGzPrSR7Lr4BV60dYTcIuPG%2B4e%2BPHlZm2UjmkykznBsRRK55xd0z3lrBarx2iVp100MQuG4LYrgoVi%2FJHHvlULBFLyndU%2BQnUJMZXd4xa7lBFXBxLvEWSiXipaqYsLoXmIsP04tQXhMITifQY%2BmebM0%2FJX4eZFvrPGeDXtYMLnxpyH2JOZawGGNBS7XP0u1o56g1vDRbf7RE13BGKr4AmEhGttnuzAwdF12kig9lP6cmHvjxqzKIszM3s%2FwRXwdC88fZM%2FmCwMLvZc%2BGePmdA4i9Jo%2BVuclycAIEbkuwBuGIaZPmQRmuGZpBybyToTNpq%2FhNsiAnMTEqTrJ%2F9vs15%2Fo%2F%2B8%2BCQELxAcLsQnVXoIO2SwE0Nsy%2BjXMa%2FCaA%2FxR%2FL5kCrmMrjq2nYGFveol1WPnun3Zzs0TYZ6np8i4IujlliVb14R%2BoMSEOX1zSC%2F%2FNfI%2BqXubElWT6wx94HAaQ3apcJd3M0dKq6nZI16EQ4pV1iJ4Sr844%2Bdi6d2SkEAerwaO3kzMw4ZZrz5E%3D212FD3x19z9sWBHDJACbC00B75E";
ACCESS_TOKEN = "";
ACCESS_TOKEN_DATE = 0;


function init(){
    
    if(Date.now() - ACCESS_TOKEN_DATE >= 1800000){
        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://api.tdameritrade.com/v1/oauth2/token", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      
    
      
      ACCESS_TOKEN_DATE = Date.now();
      ACCESS_TOKEN = JSON.parse(this.responseText)['access_token'];
      
    console.log("upgraded access token");
    console.log(ACCESS_TOKEN);
  }
};

xhttp.send("grant_type=refresh_token&refresh_token=" + REF_TOKEN + "&access_type=&code=&client_id=XIIUXESKP989BVUXA5TTX0AQZRUZZNQB&redirect_uri=");



    }
    
}

function sub() {
  console.log('test');
    
  pricehistory('AMZN', 'month', '2', 'daily', '1', 'false');
  
  
}


function quote(symbol){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.tdameritrade.com/v1/marketdata/" + symbol + "/quotes", false ); 
    xmlHttp.setRequestHeader("Authorization",CON);
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
}



function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

function pricehistory(symbol, periodType, period, frequencyType, frequency, needExtendedHoursData){
    init();
    
    var xmlHttp = new XMLHttpRequest();
    
    var params = {
        
        'periodType': periodType,
        'period': period,
        'frequencyType': frequencyType,
        'frequency': frequency,
        'needExtendedHoursData': needExtendedHoursData
        
    }
    
    formattedarr = [];
    
    xmlHttp.open( "GET", "https://api.tdameritrade.com/v1/marketdata/" + symbol + "/pricehistory" + formatParams(params), true ); 
    xmlHttp.setRequestHeader("Authorization","Bearer " + ACCESS_TOKEN);

    
    xmlHttp.onreadystatechange = (e) => {
        
        console.log(xmlHttp.responseText);
    
    
    candles = JSON.parse(xmlHttp.responseText)['candles']
    for(i = 0; i < candles.length; i++){
        datapoint = candles[i];
        
        tempArr = [datapoint['datetime'], datapoint['close']]
        formattedarr.push(tempArr);
        
    }
    
    
    
}
    xmlHttp.send();
j = formattedarr.length / 2;
    
    for(k = 0; k < j; k++){
        formattedarr.pop();
    }
console.log(formattedarr);
    
    
}