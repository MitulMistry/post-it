//var noteFormatter = new Formatter();
var currentNote;

$(document).on('turbolinks:load', function() {
  if ($('#note-show-page').length === 0) return; //breaks out of function if not show page, makes this page specific
  var id = getId();
  getNote(id);
});

function getId(){ //get id from path: site.com/notes/792
  var url = window.location.pathname;
  return url.substring(url.lastIndexOf('/') + 1); //lastIndexOf gets location of last string '/', add one and substring gets that till end
}

function getNote(id) {
  $.getJSON('/notes/' + id).success(function(response) {
    currentNote = new Note(response);
    loadNote();
  });
}

function loadNote() {
  var noteBody = $('#note-show-div');
  noteBody.append('<h2>' + currentNote.capitalizedTitle() + '</h2>');
  noteBody.append('<h4>' + currentNote.readableCreationDate() + '</h4><br>');
  noteBody.append('<p>' + currentNote.content + '</p><br>');

  noteBody.append('<p><strong>Tags:</strong>');
  var tags = currentNote.tags;

  for(var i = 0; i < tags.length; i++) {
    noteBody.append('<span class="badge bg-warning text-dark tag-badge-show">' + tags[i].name + '</span>');
  }
  noteBody.append('</p>');

  var noteButtons = $('#note-show-buttons');
  noteButtons.append('<a class="btn btn-primary btn-sm tag-btn-show" role="button" href="/notes/' + currentNote.id + '/edit">Edit</a>');
  noteButtons.append('<button type="button" class="btn btn-primary btn-sm tag-btn-show" id="note-show-delete">Delete</button>');

  $('button#note-show-delete').on('click', function(event) {
    if (confirm('Are you sure?')) {
      $.ajax({
        url: '/notes/' + currentNote.id,
        type: 'DELETE',
        success: function(result) {
          window.location = '/'; //redirect to root
        }
      });
    }
  });

}
