$(document).on('turbolinks:load', function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${ user.name }
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add"
                    data-user-id="${ user.id }"
                    data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(fail_comment) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${ fail_comment }
                  </p>
                </div>`
    search_list.append(html);
  }

  var $input = $("#user-search-field");

  $input.on("keyup", function() {
    var input = $input.val();
    if(input.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        search_list.empty();
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
    }
  });

  var search_list_add = $("#chat-group-users");

  function appendNewUser(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>
                    ${ user_name }
                  </p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    search_list_add.append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    $(this).parent().remove();
    appendNewUser(user_name, user_id);
  });

  $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
  });

});
