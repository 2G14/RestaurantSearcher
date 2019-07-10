/**
 * fetch API
 * latitude, longitude, rangeを使い
 * responseをjsonでcallbackに渡す
 */
export default function request(conditions, cb) {
  let url = new URL("https://api.gnavi.co.jp/RestSearchAPI/v3/");
  const params = {
    keyid: process.env.REACT_APP_GNAVI_ACCESS_KEY,
    ...conditions
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  fetch(url)
    .then(response => {
      // if (!response.ok)
      //   throw new Error("request not ok.");
      // else
      return response.json();
    })
    .then(json => {
      if (json.error) {
        throw new Error(json.error[0].message);
      }
      return cb(json);
    })
    .catch(err => {
      alert(err.message);
    });
}
