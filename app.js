window.addEventListener('load', function () {
    
    var toFahr = function (celcius) { // convert celius to fahrenheit
        return (celcius * 9/5) + 32;
    }
    
    /* Does your browser support geolocation? */
    if ("geolocation" in navigator) {
      $('.js-geolocation').show(); 
    } else {
      $('.js-geolocation').hide();
    }

    /* Where in the world are you? */
    $('.js-geolocation').on('click', function() {
      console.log('clicked get loc button');
      navigator.geolocation.getCurrentPosition(function(position) {
          var crds = position.coords;
          loadWeather(crds.latitude + ',' + crds.longitude); //load weather using your lat/long coordinates
      });
    });

      loadWeather('New York',''); //@params location

    function loadWeather(location) {
      $.simpleWeather({
        location: location,
        success: function(weather) {
          html = '<h2>it\'s ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
          html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
          html += '<li class="currently">' + weather.currently + '</li>';
          html += '<li>' + Math.round(toFahr(weather.alt.temp)) + '&deg;F</li></ul>';  

          $("#weather").html(html);
        },
        error: function(error) {
          $("#weather").html('<p>' + error + '</p>');
        }
      });
    }

    function startTime () {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            var ampm = h >= 12 ? 'pm' : 'am'; // am/pm depending on current time
            h = h % 12;
            h = h ? h : 12; // ensures 12-hour format, not 24-hour
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('clock').innerHTML = h + ":" + m + ":" + s + ' ' + ampm + ' EST.';
//            window.setTimeout(startTime, 500);
        }
        function checkTime(i) {
//            if (i < 10) {i = "0" + i}; // this conditional works too
            i = (i < 10) ? "0" + i : i; // add zero in front of numbers < 10
            return i;
        }
        window.setInterval(startTime, 1000);

});