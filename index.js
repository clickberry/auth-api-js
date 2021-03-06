(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.authApi = function (url) {
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

      // Sign in by email and password
      signin: function (email, password, fn) {
        var data = {
          email: email,
          password: password
        };

        $.post(url + '/signin', data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Sets redirect url after social registrations
      setRedirect: function (redirect_url, fn) {
        var data = {
          callbackUri: redirect_url
        };

        $.ajax({
            url: url + '/social',
            type: 'POST',
            data: data,
            xhrFields: {
              withCredentials: true
           }
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Registration/login via Facebook
      facebook: function () {
        window.location.href = url + '/facebook';
      },

      // Registration/login via Twitter
      twitter: function () {
        window.location.href = url + '/twitter';
      },

      // Registration/login via Google
      google: function () {
        window.location.href = url + '/google';
      },

      // Registration/login via Vk
      vk: function () {
        window.location.href = url + '/vk';
      },

      // Updates access & refresh tokens
      refresh: function (refreshToken, fn) {
        $.ajax({
            url: url + '/refresh',
            type: 'GET',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Signs out current user
      signout: function (refreshToken, fn) {
        $.ajax({
            url: url + '/signout',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Deletes all sessions for current user
      signoutall: function (refreshToken, fn) {
        $.ajax({
            url: url + '/signoutall',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + refreshToken}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Merges two accaunts
      merge: function (access_token1, access_token2, fn) {
        var data = {
          token1: access_token1,
          token2: access_token2
        };

        $.ajax({
            url: url + '/merge',
            type: 'POST'
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Unmerges social account
      unmerge: function (access_token, provider, id, fn) {
        var data = {
          provider: provider,
          id: id
        };

        $.ajax({
            url: url + '/unmerge',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Gets user info
      get: function (access_token, fn) {
        $.ajax({
            url: url + '/account',
            type: 'GET',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Deletes user account
      del: function (access_token, fn) {
        $.ajax({
            url: url + '/account',
            type: 'DELETE',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function() {
            fn();
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Get exchange token
      exchange: function (refreshToken, fn) {
        $.ajax({
          url: url + '/exchange',
          type: 'POST',
          headers: {'Authorization': 'JWT ' + refreshToken}
        })
            .done(function(result) {
              fn(null, result);
            })
            .fail(function(jqXHR, textStatus, err) {
              fn(err);
            });
      },

      // Get new refresh & access tokens
      createTokens: function (exchangeToken, fn) {
        $.ajax({
          url: url + '/exchange',
          type: 'GET',
          headers: {'Authorization': 'JWT ' + exchangeToken}
        })
            .done(function(result) {
              fn(null, result);
            })
            .fail(function(jqXHR, textStatus, err) {
              fn(err);
            });
      }
    };
  };

})(window, window.jQuery);