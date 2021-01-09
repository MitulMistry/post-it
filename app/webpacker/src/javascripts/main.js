'use strict';

var currentTagId = 0,
totalNotes,
currentPage = 0,
totalPages;

var NOTES_PER_PAGE = 10;

// var formatter = new Formatter(); //create formatter instance
// var validator = new Validator(); //create validator instance

$(document).on('turbolinks:load', function() {
  if ($('#home-index-page').length === 0) return; //breaks out of function if not home page, makes this page specific
  attachListeners();
  loadTags();
  getAllNotes();
  clearMessages();
});

function clearMessages() {
  $('.alert').delay(2000).fadeOut(500);
}

function createMessage(text) {
  $('#messages').append('<div id="flash_alert" class="alert alert-warning" role="alert">' + text + '</div>');
  clearMessages();
}

function parseError(response) {
  if (response.responseText) {
    createMessage(response.responseText);
  }
}

function attachListeners() {
  //create new tag
  $('form#new_tag').submit(function(event) {
    event.preventDefault(); //prevent form from submitting the default way and reloading page

    var name = $('#tag_name').val();

    if (validator.validateTag(name)) {
      var values = $(this).serialize();
      var posting = $.post('/tags', values);

      posting.done(function(data) {
        $('form #tag_name').val(''); //clear form input
        loadTags();
        createMessage('Tag created');
      });

      posting.fail(function(data) {
        parseError(data);
      });
    }
  });

  //create new note
  $('form#new_note').submit(function(event) {
    event.preventDefault(); //prevent form from submitting the default way and reloading page

    var title = $('#note_title').val();
    var content = $('#note_content').val();

    if (validator.validateNote(title, content)) {
      var values = $(this).serialize();
      var posting = $.post('/notes', values);

      posting.done(function(data) {
        $('form #note_title').val(''); //clear form input
        $('form #note_content').val(''); //clear form input
        getAllNotes();
        //createMessage('Note created');
      });

      posting.fail(function(data) {
        parseError(data);
      });
    }
  });

}

function loadTags() {
  $.getJSON('/tags').success(function(response) {
    var tags = response;

    $('div#tags').html(''); //clear tags

    for(var i = 0; i < tags.length; i++) {
      $('div#tags').append(generateTagLink(tags[i]));
    }

    addTagListeners();
  });
}

function generateTagLink(tag) {
  return $('<button>', {type: 'button', class: 'btn btn-outline-dark btn-sm tag-btn', 'data-id': tag.id, text: tag.name}); //btn-block
}

function generateTagLabel(tag) {
  //return $('<span>', {class: 'label label-pill label-default', 'data-id': tag.id, text: tag.name});
  return '<span class="badge bg-warning text-dark tag-badge" data-id=' + tag.id + '>' + tag.name + '</span>';
}

function addTagListeners() {
  $('button.tag-btn').each(function(index, item) {
    attachTagListeners(item);
  });
}

function addTagLabelListeners() {
  $('.tag-badge').each(function(index, item) { //array of all tag labels
    attachTagListeners(item);
  });
}

function attachTagListeners(item) {
  $(item).on('click', function(event) {
    currentTagId = $(item).data('id'); //get the data-id attribute
    getTagNotes(currentTagId);
    addViewAllButton();
    addEditTagButton();
    addDeleteTagButton();
    removeEditTagForm();
  });
}

function getAllNotes() {
  $.getJSON('/notes').success(function(response) {
    totalNotes = response;
    totalPages = Math.ceil(totalNotes.length / NOTES_PER_PAGE); //calculates total number of pages needed, rounds up
    paginateNotes();
  });
}

function getTagNotes(tagId) {
  $.getJSON('/tags/' + tagId).success(function(response) {
    totalNotes = response;
    totalPages = Math.ceil(totalNotes.length / NOTES_PER_PAGE); //calculates total number of pages needed, rounds up
    paginateNotes();
  });
}

function loadNotes(notes) {
  //$('div#notes').html(''); //clear html
  $('div#notes .note').remove(); //remove all notes

  for(var i = 0; i < notes.length; i++) {
    $('div#notes').append(generateNote(notes[i]));
  }
  addNoteListeners();
}

function paginateNotes() {
  if (totalNotes.length <= NOTES_PER_PAGE) {
    loadNotes(totalNotes);
    removePaginateButtons();
  } else {
    var notes = totalNotes.slice(currentPage * NOTES_PER_PAGE, (currentPage + 1) * NOTES_PER_PAGE); //selects the range of notes to display based on current page
    loadNotes(notes);
    addPaginateButtons();
  }
}

function addPaginateButtons() {
  if (currentPage !== 0 && $('button#page-previous').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
    $('div#paginate-previous').append('<button type="button" class="btn btn-primary btn-sm tag-mod-btn" id="page-previous">Previous</button>');

    $('button#page-previous').on('click', function(event) {
      currentPage--;
      if (currentPage === 0) {
        removePreviousPageButton();
      }
      paginateNotes();
    });
  }

  if (totalPages > 1 && currentPage !== (totalPages - 1) && $('button#page-next').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
    $('div#paginate-next').append('<button type="button" class="btn btn-primary btn-sm tag-mod-btn" id="page-next">Next</button>');

    $('button#page-next').on('click', function(event) {
      currentPage++;
      if (currentPage === (totalPages - 1)) {
        removeNextPageButton();
      }
      paginateNotes();
    });
  }
}

function removePaginateButtons() {
  currentPage = 0;
  $('button#page-previous').remove();
  $('button#page-next').remove();
}

function removePreviousPageButton() {
  $('button#page-previous').remove();
}

function removeNextPageButton() {
  $('button#page-next').remove();
}

function generateNote(note) {
  //return '<div class="col-sm-6 col-md-3"><div class="thumbnail note"><div class="caption"><h3>' + note.title + '</h3><p>' + note.content + '</p></div></div></div>';
  var html = '<div class="card note"><div class="card-body"><h5 class="card-title"><a href="/notes/' + note.id + '">' + formatter.titleCase(note.title) + '</a></h5><p class="card-text">' + note.content + '</p><p>';

  note.tags.forEach(function(tag) {
    html += generateTagLabel(tag);
  });

  html += '</p><p class="date">' + formatter.readableDate(note.created_at) + '</p>';
  html += '<a class="btn btn-link" href="/notes/' + note.id + '/edit">Edit</a><button type="button" class="btn btn-link delete-note" data-id=' + note.id + '>Delete</button></div></div>';

  return html;
}

function addNoteListeners() {
  $('button.delete-note').each(function(index, item) { //array of all delete buttons

    $(item).on('click', function(event) {
      if (confirm('Are you sure?')) {
        var id = $(item).data('id');
        $.ajax({
          url: '/notes/' + id,
          type: 'DELETE',
          success: function(result) {
            if (currentTagId === 0) { //check if there is no currently selected tag
              getAllNotes(); //then load all notes
            } else {
              getTagNotes(currentTagId); //otherwise load notes based on currently selected tag
            }
            createMessage('Note deleted.');
          }
        });
      }
    });

  });
  addTagLabelListeners();
}

function addViewAllButton() {
  if ( $('button#view-all').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
    $('div#tag-buttons').append('<button type="button" class="btn btn-info btn-sm tag-mod-btn" id="view-all">View All</button>');

    $('button#view-all').on('click', function(event) {
      getAllNotes();
      removeEditTagForm();
      removeTagButtons();
    });
  }
}

function addEditTagButton() {
  if ( $('button#edit-tag').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
    $('div#tag-buttons').append('<button type="button" class="btn btn-outline-secondary btn-sm tag-mod-btn" id="edit-tag">Edit Tag</button>');

    $('button#edit-tag').on('click', function(event) {
      if ( $('form#edit-tag-form').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
        $('div#tag-edit-div').append('<form id="edit-tag-form"></br><fieldset class="form-group"><div class="field"><input type="text" name="tag[name]" class="form-control" id="edit-tag-text-input" placeholder="Edit tag name"></div></fieldset><fieldset class="form-group"><div class="field"><button type="submit" class="btn btn-primary btn-sm">Submit</button></div></fieldset></form>');
      }
    });

    $(document).on('submit','form#edit-tag-form',function(event) { //use this for dynamic content
      event.preventDefault(); //prevent form from submitting the default way and reloading page
      var tagName = $('#edit-tag-text-input').val();

      if (validator.validateTag(tagName)) {
        var values = $(this).serialize();

        $.ajax({
          url: '/tags/' + currentTagId,
          type: 'PATCH',
          data: values,
          success: function(result) {
            removeEditTagForm();
            loadTags();
            getTagNotes(currentTagId);
            createMessage('Tag updated.');
          }
        });
      }

    });
  }
}

function removeEditTagForm() {
  $('form#edit-tag-form').remove();
}

function addDeleteTagButton() {
  if ( $('button#delete-tag').length < 1) { //check if button doesn't exist - is array of buttons less than 1?
    $('div#tag-buttons').append('<button type="button" class="btn btn-outline-secondary btn-sm tag-mod-btn" id="delete-tag">Delete Tag</button>');

    $('button#delete-tag').on('click', function(event) {
      if (confirm('Are you sure?')) {
        removeEditTagForm();

        $.ajax({
          url: '/tags/' + currentTagId,
          type: 'DELETE',
          success: function(result) {
            getAllNotes();
            loadTags();
            removeTagButtons();
            createMessage('Tag deleted.');
          }
        });
      }
    });
  }
}

function removeTagButtons() {
  currentTagId = 0; //set currently selected tag to none
  $('button#view-all').remove();
  $('button#edit-tag').remove();
  $('button#delete-tag').remove();
}
