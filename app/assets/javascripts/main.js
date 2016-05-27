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
      $('form #tag_name').val(''); //clear form input
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
      $('form #note_title').val(''); //clear form input
      $('form #note_content').val(''); //clear form input
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
      addViewAllButton();
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
  //$('div#notes').html(''); //clear html
  $('div#notes .note').remove(); //remove all notes

  for(var i = 0; i < notes.length; i++){
    $('div#notes').append(generateNote(notes[i]));
  }
  addNoteListeners();
}

function generateNote(note){
  //return '<div class="col-sm-6 col-md-3"><div class="thumbnail note"><div class="caption"><h3>' + note.title + '</h3><p>' + note.content + '</p></div></div></div>';
  return '<div class="card card-block note"><h5 class="card-title">' + note.title + '</h5><p class="card-text">' + note.content + '</p><button type="button" class="btn btn-link">Edit</button><button type="button" class="btn btn-link delete-note" data-id=' + note.id + '>Delete</button></div>';
}

function addNoteListeners(){
  $('button.delete-note').each(function(index, item){

    $(item).on('click', function(event){
      var id = $(item).data('id');
      //getTagNotes($(item).data('id'));
      //addViewAllButton();
      $.ajax({
        url: '/notes/' + id,
        type: 'DELETE',
        success: function(result) {
          getAllNotes(); //actually need to find note and remove?
        }
      });

    });
  });
}

function addViewAllButton(){
  if ( $('button#view-all').length < 1){ //check if button doesn't exist
    $('div#tags').append('<button type="button" class="btn btn-info btn-sm" id="view-all">View All</button>');

    $('button#view-all').on('click', function(event){
      getAllNotes();
      $(this).remove(); //get rid of button once clicked
    });
  }
}
