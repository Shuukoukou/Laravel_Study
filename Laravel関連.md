# Laravel関連



## 1.Laravelキャッシュをクリアする

参照: https://www.php.cn/phpkj/laravel/416245.html

※artisanコマンドを使うために、Laravel項目のrootディレクトリに移動する必要がある。php容器で移動

![image-20211208101029306](C:/Users/sanoh/AppData/Roaming/Typora/typora-user-images/image-20211208101029306.png)

例: cd rawmaterials/whitebase

#### ①　アプリケーションキャッシュをクリアする

> #### $ php artisan cache:clear

#### ②　ルーティングキャッシュをクリアする

> #### $ php artisan route：cache

#### ③　構成キャッシュをクリアする

> #### $ php artisan config：cache

#### ④コンパイルされたビューファイルをクリアする

> #### $ php artisan view:clear





## 2.CentOSにbcmathをインストールする

> #### ①　Tera TermでCentOsログイン

> #### ②　yum search bcmath

bcmathのパーケージ一覧を確認する

もしなければ、sudo yum install php-bcmatchでダウンロードする

> #### ③　yum install php73-php-bcmath

※自分のPHPバージョンにあったパッケージをインストールする

> #### ④　Apacheを再起動し、phpinfoで追加されているか確認します。

※`systemctl restart httpd`(Apacheを再起動コマンド)

もしでてPHPinfoでBC Mathをenabledではない場合、以下のとおり設定ファイル、モジュールを移動させる。

`cp /etc/opt/remi/php71/php.d/20-bcmath.ini /etc/php.d/`

`cp /opt/remi/php71/root/usr/lib64/php/modules/bcmath.so /usr/lib64/php/modules/`



再度Apacheを再起動します。

`systemctl restart httpd`



