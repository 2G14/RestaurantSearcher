# Restaurant Searcher

端末の位置情報を利用して、現在地付近の飲食店を検索する web アプリケーション  
[https://restaurant-searcher.web.app](https://restaurant-searcher.web.app) で公開中  

## 前提条件

- ぐるなびAPIが利用可能
- Node.jsを使用
- yarnを使用

## 実行方法

http で実行するには、
.env ファイルにぐるなび API アクセスキー, サーバポート番号  
https で実行するには、
ssl 通信に必要な key と cert へのファイルパスを記述する必要あり。

```bash
$ yarn install # ライブラリ インストール
$ yarn build # 静的コンテンツをまとめる
$ vim .env # ぐるなびAPIアクセスキー, サーバポート番号, ssl通信に必要なkeyとcertへのファイルパスを記述
$ yarn https # https サーバを起動
 # もしくは
$ yarn http # http サーバを起動
```

今回の.env ファイルの中身

```.env
GNAVI_ACCESS_KEY=[ぐるなびAPIアクセスキー]
SERVER_PORT=[サーバポート番号]
HTTPS_KEY_FILE_PATH=[証明書key]
HTTPS_CERT_FILE_PATH=[証明書cert]
```

https でサーバを実行している PC と同じネットワーク内のスマホなら、Wi-Fi の HTTP プロキシ設定で閲覧可能。  
アドレスは, https://[PCのIPアドレス]:[ポート番号]  
証明書によっては警告が出るが、iOS Safari, Google Chrome では「詳細」「このサイトを閲覧」で閲覧可能。
