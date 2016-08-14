(function(module) {

var zipsView = {};

zipsView.populateStatesFilter = function() {
    webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state ASC', function(rows) {
      zipsView.writeToStatesFilter(rows);
    })
  }
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here
zipsView.writeToStatesFilter = function(rows) {
  rows.forEach(function(obj) {
    var stateName = '<option value="' + obj.state + '">' + obj.state + '</option>';
    $('#state-select').append(stateName);
  })
}

zipsView.getUserState = function() {
  $('#state-select').on('change', function() {
    if ($(this).val()) {
      zipsView.populateCitiesFilter($(this).val());
    }
    $('#city-select').empty();
    $('#city-select').val('Select a City');
    $('form[name="zip"]').val('');
  })
}

zipsView.populateCitiesFilter = function(selectedState) {
  webDB.execute(
    [
      {
        sql: 'SELECT DISTINCT city FROM zips WHERE state = ? ORDER BY city ASC;',
        data: [selectedState]
      }
    ],
    function(rows) {
      zipsView.writeToCitiesFilter(rows);
    })
  }

zipsView.writeToCitiesFilter = function(rows) {
  rows.forEach(function(obj) {
    // console.log(obj);
    var cityName = '<option value="' + obj.city + '">' + obj.city + '</option>';
    $('#city-select').append(cityName);
  })
}

zipsView.createCityObjects = function(selectedCity, selectedState) {
  webDB.execute(
    [
      {
        sql: 'SELECT * FROM zips WHERE city = ? and state = ? ORDER BY city ASC;',
        data: [selectedCity, selectedState]
      }
    ],
    function(rows) {
      initMap(rows);
    })
  }

zipsView.getCityData = function() {
  $('#city-select').on('change', function() {
    console.log($('#city-select').val());
    zipsView.createCityObjects($('#city-select').val(), $('#state-select').val());
  })
}

zipsView.getUserZip = function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    if ($('input[name="zip"]').val()) {
      zipsView.searchByZip($('input[name="zip"]').val());
    } else {
      console.log('Error: enter a valid zipcode.')
    }
    $('#city-select').val('Select a City');
    $('#state-select').val('Select a State');
  })
}

zipsView.searchByZip = function(userZip) {
  webDB.execute(
    [
      {
        sql: 'SELECT * FROM zips WHERE zip = ? ORDER BY zip ASC;',
        data: [userZip]
      }
    ],
    function(rows) {
      initMap(rows);
    })
}

module.zipsView = zipsView;
})(window)
