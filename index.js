(function($) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  $.clbr = $.clbr || {};

  $.clbr.authApi = function (url) {
    return {
      // Sign up by email and password
      signup: function (email, password, fn) {
        var data = {
          email: email,
          password: password
        };

        $.post(url + '/signup', data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Sets redirect url after social registrations
      setRedirect: function (redirect_url) {
        var data = {
          callbackUri: redirect_url
        };

        $.post(url + '/social', data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Registration/login via Facebook
      facebook: function () {
        window.location.href = url + '/facebook';
      }
    };
  };

})(window.jQuery);