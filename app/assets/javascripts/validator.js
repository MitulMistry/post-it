var TAG_NAME_LENGTH = 30,
NOTE_TITLE_LENGTH = 100,
NOTE_CONTENT_LENGTH = 1000;

function Validator(){ //validator class

}

Validator.prototype.validateTag = function(name){
  if (name.length === 0){
    alert('Tag must have a name');
    return false;
  } else if (name.length > TAG_NAME_LENGTH){
    alert('Tag name too long');
    return false;
  } else {
    return true;
  }
};

Validator.prototype.validateNote = function(title, content){
  if (title.length > NOTE_TITLE_LENGTH){
    alert('Note title too long');
    return false;
  } else if (content.length === 0){
    alert('Note must have content');
    return false;
  } else if (content.length > NOTE_CONTENT_LENGTH){
    alert('Note content too long');
    return false;
  } else {
    return true;
  }
};
