(function($) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var api = function (url) {
    return {
      signup: function (email, password, fn) {
        var data = {
          email: email,
          password: password
        };

        $.post(url, data)
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      }
    };
  };

  return api;

})(window.jQuery);