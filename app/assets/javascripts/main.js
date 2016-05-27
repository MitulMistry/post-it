'use strict';

$(document).ready(function(){
  attachListeners();
  loadTags();
  getAllNotes();
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
      getAllNotes();
    });
  });

}

function loadTags(){
  $.getJSON('/tags').success(function(response){
    var tags = response;

    $('div#tags').html('');

    for(var i = 0; i < tags.length; i++){
      $('div#tags').append(generateTagLink(tags[i]));
    }

    addTagListeners();
  });
}

function generateTagLink(tag){
  //return $('<li>', {'data-state': game.state, 'data-gameid': game.id, text: game.id});
  //return $('<li>', { text: tag.name });
  return $('<button>', {type: 'button', class: 'btn btn-secondary btn-sm tag-btn', 'data-id': tag.id, text: tag.name});//btn-block
}

function addTagListeners(){
  $('button.tag-btn').each(function(index, item){

    $(item).on('click', function(event){
      getTagNotes($(item).data('id'));
    });
  });
}

function getAllNotes(){
  $.getJSON('/notes').success(function(response){
    var notes = response;
    loadNotes(notes);
  });
}

function getTagNotes(tag_id){
  $.getJSON('/tags/' + tag_id).success(function(response){
    var notes = response;
    loadNotes(notes);
  });
}

function loadNotes(notes){
  $('div#notes').html(''); //clear html

  for(var i = 0; i < notes.length; i++){
    $('div#notes').append(generateNote(notes[i]));
  }
}

function generateNote(note){
  //return '<div class="col-sm-6 col-md-3"><div class="thumbnail note"><div class="caption"><h3>' + note.title + '</h3><p>' + note.content + '</p></div></div></div>';
  return '<div class="col-sm-6 col-md-4"><div class="card card-block note"><h5 class="card-title">' + note.title + '</h5><p class="card-text">' + note.content + '</p><a href="#" class="card-link">Edit</a><a href="#" class="card-link">Delete</a></div></div>';
}
