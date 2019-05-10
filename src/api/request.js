/**
 * fetch API
 * latitude, longitude, rangeを使い
 * responseをjsonでcallbackに渡す
 */
export default function request(conditions, cb) {
  fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      ...conditions
    })
  })
    .then(response => {
      if (!response.ok) throw new Error("request not ok.");
      else return response.json();
    })
    .then(json => cb(json))
    .catch(err => {
      console.log(err);
      alert(
        "ネットワークエラーが発生しました。\nしばらく経ってからもう一度試してください。"
      );
    });
}
