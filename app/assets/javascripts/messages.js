$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<div class="message" data-message-id = "${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                  ${image}
               `
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset()
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $(".form__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('内容を入力してください')
    })
  });

  $(function() {
    $(function() {
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }
    });
    function update(){
      if($('.message')[0]){
        var message_id = $('.message:last').data('message-id');
      } else {
        return false
      }

      $.ajax({
        url: location.href,
        type: 'GET',
        data: { id : message_id },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length){
        $.each(data, function(i, data){
          var html = buildHTML(data);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    }
  })
});
