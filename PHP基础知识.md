## PHP知識

### 1.PHPで変数を表す記号は、`＄`です。

### 2.PHPでアットマーク`@` 意味
```
<?php
echo $a;
```
 
以下のような警告が表示されます。
Notice: Undefined variable: a

```
<?php
echo @$a;
echo @file_get_contents('file not exists');

```

＠をつけるとワーニングが出力されません。

### 3.PHPでドット`.`、ドット=`.=`の意味は文字の連結です

```
<?php
$a = 'PHP 文字列';
$b = $a . "の連結";
echo $b; // 出力：PHP 文字列の連結
$a .= "の連結";
echo $a; // 出力：PHP 文字列の連結
$a .= "は" . "." ."や" . '.=' . "です";
echo $a; // 出力：PHP 文字列の連結は.や.=です

```

### 4.PHPでコロン`:`の意味

phpのソースコード中で見かける::は、クラス内で定義されている定数、クラスの静的なメンバ関数・プロパティ（変数）にアクセスするために使います。

```
<?php
class クラス {
    const 変えられない定数 = 'const';
    public static $静的な変数 = 'static value';
    static function メソッド(){
      return "method";
    }
}
echo クラス::変えられない定数 . PHP_EOL; // 出力：const
echo クラス::$静的な変数 . PHP_EOL; // 出力:static value
echo クラス::メソッド() . PHP_EOL; // 出力：method

```

### 5.`PHP_EOL`は`\n`と同じ意味の定義済み定数です。改行コードです。

```
<?php
 
echo "aaa" . PHP_EOL;
echo "bbb" . PHP_EOL . PHP_EOL;
echo "ccc" . PHP_EOL;

```

### 6.PHPで `->`の意味はクラスの変数、関数を呼び出します。

```
<?php
class クラス {
    const 変えられない定数 = 'const';
    public static $静的な変数 = 'static value';
    static function メソッド(){
      return "method";
    }
    private $プロパティ = "プロパティ";
    function __construct(){
      echo "newされました。" . PHP_EOL;
    }
    function showValue(){
      echo $this->プロパティ . PHP_EOL;
      $this->呼び出し回数++;
    }
}
echo クラス::変えられない定数 . PHP_EOL; // 出力：const
echo クラス::$静的な変数 . PHP_EOL; // 出力:static value
echo クラス::メソッド() . PHP_EOL; // 出力：method
$c = new クラス(); // 出力：newされました。
$c->showValue(); // 出力：プロパティ

```

### 7.PHPで`=>`の意味は、連想配列の値設定です。

```
例:
<?php
$array = array(
    1    => "a",
    "1"  => "b",
    1.5  => "c",
    true => "d",
);

```

### 8.ViewでSelectBoxの内容を表示する
①
```
<select>
	@foreach($prefs as $index => $name)
		<option value="{{ $index }}">$name</option>
	@endforeach
</select>
```

②ビューで直接取得+表示も可能
```
<select>
	@foreach(config('pref' as $index => $name))
		<option value="{{ $index }}">$name</option>
	@endforeach
</select>
```

③選択された値の保持
```
<select name="_pref">
	@foreach(config('pref') as $ index => $name)
		<option value="{{ $index }}" @if(old('_pref') == $index) selected @endif>$name</option>
	@endforeach
</select>
```




              
