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
      loadTags();
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
      loadNotes();
    });
  });

}

function loadTags(){
  $.getJSON('/tags').success(function(response){
    var tags = response;

    $('div#tags').html('');
    //$('div#tags').append('<ul>');

    for(var i = 0; i < tags.length; i++){
      $('div#tags').append(generateTagLink(tags[i]));
    }

    //$('div#tags').append('</ul>');
  });
}

function generateTagLink(tag){
  //return $('<li>', {'data-state': game.state, 'data-gameid': game.id, text: game.id});
  return $('<li>', { text: tag.name });
}

function loadNotes(){
  $.getJSON('/notes').success(function(response){
    var notes = response;
    //console.log(notes);

    $('div#notes').html('');

    for(var i = 0; i < notes.length; i++){
      $('div#notes').append(generateNote(notes[i]));
    }
  });
}

function generateNote(note){
  return '<div class="col-sm-6 col-md-3"><div class="thumbnail note"><div class="caption"><h3>' + note.title + '</h3><p>' + note.content + '</p></div></div></div>';
}
