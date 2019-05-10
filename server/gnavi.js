const request = require("request");

/**
 * Gnavi API
 */
function gnavi(keyid, conditions, cb) {
  request.get(
    {
      uri: "https://api.gnavi.co.jp/RestSearchAPI/v3/",
      headers: { "Content-Type": "application/json" },
      qs: {
        keyid: keyid,
        ...conditions
      }
    },
    function(error, response, body) {
      if (error) throw error;
      else cb(body);
    }
  );
}

module.exports = gnavi;
