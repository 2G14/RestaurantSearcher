/**
 * geolocation API
 * latitudeとlongitudeだけ取得してcallbackに渡す
 */
export default function geolocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        cb(position.coords.latitude, position.coords.longitude);
      },
      error => {
        const errorMessage = [
          "原因不明のエラーが発生しました",
          "位置情報の取得が許可されていません",
          "位置情報が取得できませんでした",
          "位置情報の取得がタイムアウトしました"
        ];
        alert(errorMessage[error.code]);
      },
      {
        timeout: 100000, // タイムアウト
        maximumAge: 200000, // 位置情報のキャッシュ期限
        enableHighAccuracy: true // 精度を高くする
      }
    );
  } else alert("位置情報を利用できません");
}
