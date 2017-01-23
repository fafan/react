if("undefined"==typeof jQuery) throw new Error("ping.js requires jQuery");

console.log('API_HOST = ' + JSON.stringify(API_HOST));
console.log('API_ROOT = ' + JSON.stringify(API_ROOT));
console.log('API_URL = ' + JSON.stringify(API_URL));

const API_PING = false
const API_PING_INTERVAL = 30000

var API_STATUS = {
  API1      : false,
  API2      : false,
  API3      : false,
  API4      : false
}

var API_PING_TIMER = {
  API1      : null,
  API2      : null,
  API3      : null,
  API4      : null
}

var API_STATUS_TIMER = setInterval(function () {
  console.log( 'API STATUS: ' + JSON.stringify(API_STATUS) ); },
  API_PING_INTERVAL * 2
);

// Start PING TIMER
function pingApiStart() {
  Object.keys(API_URL).forEach(function(key,index) {
    setInterval(function () { API_PING_TIMER[key] = pingApiService(key, API_URL[key]); }, API_PING_INTERVAL);
  });
}

// Stop PING TIMER
function pingApiStop() {
  Object.keys(API_PING_TIMER).forEach(function(key,index) {
    clearInterval(API_PING_TIMER[key]);
  });
}

// Ping API service
function pingApiService(apiName, apiUrl) {
  jQuery(function ($) {
    $.ajax({
      url: apiUrl,
      type: 'HEAD',
      dataType: 'json',
      success: function (data) {
        API_STATUS[apiName] = true;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        API_STATUS[apiName] = false;
      }
    })
  })
}

if (API_PING) pingApiStart();
