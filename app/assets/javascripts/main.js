'use strict';

$(document).ready(function(){
  attachListeners();
  loadTags();
  loadNotes();
});

function attachListeners(){

    //create new tag
    //createTag();
  $('form#new_tag').submit(function(event) {
    event.preventDefault(); //prevent form from submitting the default way

    var values = $(this).serialize();
    //console.log(values);

    var posting = $.post('/tags', values);

    posting.done(function(data) {
      console.log(data);
      //var post = data["post"];
      //$("#tag_name").text(post["name"]);
    });
  });

  $('form#new_note').submit(function(event) {
    event.preventDefault(); //prevent form from submitting the default way

    var values = $(this).serialize();
    //console.log(values);

    var posting = $.post('/notes', values);

    posting.done(function(data) {
      console.log(data);
      //var post = data["post"];
      //$("#tag_name").text(post["name"]);
    });
  });

}

function loadTags(){

}

function loadNotes(){
  
}
