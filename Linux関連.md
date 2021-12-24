Linux問題



１、inode枯渇問題

①巨大なMADファイルを探し、rmでdelete

**ディスク（disk）容量の空きスペース（free）を確認する**

> #### df 


**必要がないファイルを削除**
※転義符号が必要

> ####　rm \\#sql_25c5_3.MAD


②Linuxサーバー再起動

> ####　reboot


③mariadbサーバ再起動

> ####　sudo systemctl restart mariadb.service



2.Linux常用コマンド

①一つ上のディレクトリに移動

>  cd ..

②rootディレクトリに移動

> cd ~



3.Mysqlのbinlog

①binlog の format には以下の 3 種類ある

| **フォーマットの種類**                                       | **設定値(文字列)** | **設定値(数字)** | **備考**                                                     |
| ------------------------------------------------------------ | ------------------ | ---------------- | ------------------------------------------------------------ |
| [ステートメント](http://d.hatena.ne.jp/keyword/%A5%B9%A5%C6%A1%BC%A5%C8%A5%E1%A5%F3%A5%C8)ベース | STATEMENT          | 1                | 実際に実行された [SQL](http://d.hatena.ne.jp/keyword/SQL) を記録 |
| 行ベース                                                     | ROW                | 2                | 実際に変更された行のデータの情報を記録                       |
| ミックス                                                     | MIXED              | 0                | 基本的には[ステートメント](http://d.hatena.ne.jp/keyword/%A5%B9%A5%C6%A1%BC%A5%C8%A5%E1%A5%F3%A5%C8)ベースと同じで非決定性のクエリの際は行ベースと同じ形式のログを出力する |

②設定方法

1>centosの**/etc/my.cnf**

[mysqld]
log-bin=mysql-bin
binlog_format=statement
expire_logs_days=1

保存後、centosの再起動が必要。

2>  mysql> SET GLOBAL expire_logs_days = 7;(コマンド)

centosの再起動が必要ない

3> 出力先

/var/lib/mysql/



③常用コマンド

1>  バイナリログリストの確認

>show binary logs;

2>バイナリログをtxtファイルに変換

>mysqlbinlog --no-defaults /var/lib/mysql/mysql-bin.000006 > /tmp/binlog.txt

3>max_binlog_sizeを確認

> SHOW VARIABLES like 'max_binlog_size';

4>max_binlog_sizeを設定(再起動が必要なし)

> SET GLOBAL max_binlog_size=209715200;

5>max_binlog_sizeを確認

> SHOW VARIABLES like 'max_binlog_size';

6> 保存日数を設定(再起動が必要なし)

> SET GLOBAL expire_logs_days = 99;

7>一般ログを確認

> ex

8>一般ログを設定

> SET GLOBAL general_log = 'On';

9>ログ出力先を設定

> SET GLOBAL general_log_file = '/var/log/audit/localhost.log'; 

10>.tgzファイルを解凍する

> tar xvfz <解凍したいファイル名>

10>圧縮(.tgz)

> /bin/tar -zvcf <解凍したいファイル名>

11>実行権限を付与

> chmod +x  ******.sh

12>ファイル所有者を変更

> chown root:root file

13>権限を確認

> ls  -al

14>crontab自動処理一覧を確認

> crontab  -l

15>crontab自動処理の修正(追加、変更、削除)

> crontab  -e

※vim方式で入力、[i]で入力モード、[Esc]キーで入力モードから出る、[:wq]で保存＆vimから出る。

16>一般ログを確認

> show variables like  'general_log%';

17>コマンドの履歴を出力


> history >> history_20200401.log


systemctl restart rsyslog.service



④Linuxログ

![image-20211102132448455](C:/Users/sanoh/AppData/Roaming/Typora/typora-user-images/image-20211102132448455.png)



