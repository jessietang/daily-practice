/**
 * Created by jessietang on 11/4/2016.
 */
$(function(){
    var questions = [
        {
            id: 1,
            title: 'is it a question?',
            content: 'yes, it is.',
            voteCount: 20
        }
    ];

    function questionSort(questions){
        questions.sort(function(a,b){
            return b.voteCount - a.voteCount;
        });
    }

    function showQuestions(questions){
        questionSort(questions);
        if(questions.length >= 1){
            for(var i in questions){
                /* // 传统输出模板这样写
                 $("#result").append('there are <b>'+ len + '</b> books in your desktop,' +
                 '<em>'+ newNum + '</em> are new book.');
                 * */
                //用es6
                /*模板字符串（template string）是增强版的字符串，用反引号（`）标识。
                 它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。*/
                /*模板字符串中嵌入变量，需要将变量名写在${}之中。*/
                var questionItem = `<div class="media">
                <div class="media-left">
                <button class="btn btn-default voteUp" data-id="${questions[i].id}">
                <span class="glyphicon glyphicon-chevron-up"></span>
                <span class="vote-count">${questions[i].voteCount}</span>
                </button>
                <button class="btn btn-default voteDown" data-id="${questions[i].id}">
                <span class="glyphicon glyphicon-chevron-down"></span>
                </button>
                </div>
                <div class="media-body">
                <h4 class="media-heading">${questions[i].title}</h4>
                <p>${questions[i].content}</p>
                </div>
                </div>`;
                $('.questionList').append(questionItem);
            }
        }
    }
    showQuestions(questions);

    $(document).on('click', '.add-question,.cancel-btn', function(){
        $('.question-box').slideToggle();
    }).on('click', '.save-btn', function(e){
        e.preventDefault();
        var title = $('.qa_title').val();
        var content = $('.qa_content').val();
        console.log(title+content);
        var arr = {};
        arr.id = questions.length + 1;
        arr.title = title;
        arr.content = content;
        arr.voteCount = 0;
        questions.push(arr);
        console.log(questions);
        $('.qa_title').val("");
        $('.qa_content').val("");
        //$('.question-box').slideToggle();
        $('.questionList').empty(); /*清空之前的，重新渲染整个questions*/
        showQuestions(questions);
    }).on('click', '.voteUp', function(){
        var nowId = $(this).attr("data-id");
        for(var i in questions){
            if(questions[i].id == nowId){
                questions[i].voteCount += 1;
                break;
            }
        }
        $('.questionList').empty(); /*清空之前的，重新渲染整个questions*/
        showQuestions(questions);
    }).on('click', '.voteDown', function(){
        var nowId = $(this).attr("data-id");
        for(var i in questions){
            if(questions[i].id == nowId){
                questions[i].voteCount -= 1;
                break;
            }
        }
        $('.questionList').empty(); /*清空之前的，重新渲染整个questions*/
        showQuestions(questions);
    });
});