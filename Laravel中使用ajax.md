
## 路由设置

```
Route::get('/admin/result/{questionId}', 'Admin\ResultController@index');

Route::match(['get', 'post'], '/admin/result/ajax/{questionId}', 'Admin\ResultController@ajax');

```



## Controllerの中で閲覧画面を表示

/Controllers/admin/ResultController.php

```
public function index(Request $request, $questionId){

    $questionInfo = Question::where('id', $questionId)->first();

		return view('/admin/result', [

        	'questionId' => $questionId,

        	'questionInfo' => $questionInfo

    ]);

}

// コメントリストを取得してJSON形式で返す

public function ajax(Request $request, $questionId){

    $commentData = Comment::where('question_id', $questionId)->orderBy('created_at', 'desc')->get();



    $json = ["commentData" => $commentData];

    return response()->json($json);

}
```



## View

/views/admin/result/index.blade.php

```
@extends('layouts.parent')
@include('layouts.head')
@section('content')
@section('header')

<header>

<!--省略-->

</header>

@endsection

@include('layouts.error')

<!--コメントリストを表示-->

<main id="contents">

    <div>

        <h2>{{$questionInfo->question}}</h2>

    </div>

    <div>

        <ul id="comment-data">

            <li id="comment-list" style="display: none;">

                <text id="name"></text>

                <text id="comment"></text>

            </li>

        </ul>

    </div>

@section('pageJs')

    <script src="/js/admin/result/comment.js"></script>

@endsection

</main>
@endsection
@include('layouts.footer')
```


## JavaScriptロジック

/js/admin/result/comment.js

```
$(function(){

    get_data()

})

// コメントを取得

function get_data(){    

    $.ajaxSetup({

        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}

    });

    $.get({

        url: "/admin/result/ajax/" + questionId,

        method: 'POST',

        dataType: 'json'

    })

    .done(function(data){

        // 前のコメントリストを削除

        $('#comment-data').find('.comment-visible').remove();



        // コメントリストをクローンして表示

        for(var i = 0; i < data.commentData.length; i++){

            var commentClone = $('#comment-list').clone(true).removeAttr('style').addClass('comment-visible');

            commentClone.children('#name').first().append(data.commentData[i].name);

            commentClone.children('#comment').first().append(data.commentData[i].answer);

            $('#comment-data').append(commentClone);

        }

    })

    .fail(function(){
    }) 

    // 5秒ごとに更新
    setTimeout("get_data()", 5000);
}

```
