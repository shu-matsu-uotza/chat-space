$(function() {

var search_list = $("#user-search-result");
var add_member = $("#chat-group-user-add");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${ user.name }
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${ user }
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
              </div>`
  search_list.append(html);
}

function appendNewUser(val) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${ val.id }'>
                <p class='chat-group-user__name'>
                  ${ val }
                </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  add_member.append(html);
  search_list.remove(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーは見つかりませんでした");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".user-search-add", function(){
    var user = $('.user-search-add');
    var val = user.attr('data-user-name');
    appendNewUser(val);
  });

  $(document).on("click", ".user-search-remove", function(){
    $('#chat-group-user-8').remove();
  });

});
