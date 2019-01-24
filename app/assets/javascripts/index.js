$(function() {
  var searchResult = $('#user-search-result');
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    searchResult.append(html);
  };

  var memberList = $('#chat-group-users');
  function addUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    memberList.append(html);
  };

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      searchResult.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
    })
    .fail(function(){
      alert('error');
    })
  });

  $(document).on('click', '.user-search-add', function() {
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    addUser(userId, userName);
    $(this).parent().remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
});
