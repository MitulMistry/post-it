var noteFormatter = new Formatter();

$(document).ready(function() { //doesn't trigger using turbolinks - fixed by using jquery-turbolinks gem
  if ($("#note-show-page").length === 0) return; //breaks out of function if not show page, makes this page specific
  var id = getId();
  getNote(id);
});

function getId(){ //get id from path: site.com/notes/792
  var url = window.location.pathname;
  return url.substring(url.lastIndexOf('/') + 1); //lastIndexOf gets location of last string '/', add one and substring gets that till end
}

function getNote(id) {
  $.getJSON('/notes/' + id).success(function(response) {
    loadNote(response);
  });
}

function loadNote(note) {
  var noteBody = $('#note-show-div');
  noteBody.append('<h2>' + noteFormatter.titleCase(note.title) + '</h2>');
  noteBody.append('<h4>' + noteFormatter.readableDate(note.created_at) + '</h4><br>');
  noteBody.append('<p>' + note.content + '</p><br>');

  noteBody.append('<p><strong>Tags:</strong>');
  var tags = note.tags;

  for(var i = 0; i < tags.length; i++) {
    noteBody.append('<span class="label label-warning tag-label-show">' + tags[i].name + '</span>');
  }
  noteBody.append('</p>');

  var noteButtons = $('#note-show-buttons');
  noteButtons.append('<a class="btn btn-primary btn-sm tag-btn-show" role="button" href="/notes/' + note.id + '/edit">Edit</a>');
  noteButtons.append('<button type="button" class="btn btn-primary btn-sm tag-btn-show" id="note-show-delete">Delete</button>');

  $('button#note-show-delete').on('click', function(event) {
    if (confirm('Are you sure?')) {
      $.ajax({
        url: '/notes/' + note.id,
        type: 'DELETE',
        success: function(result) {
          window.location = '/'; //redirect to root
        }
      });
    }
  });

}
