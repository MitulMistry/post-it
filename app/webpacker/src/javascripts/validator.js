const TAG_NAME_LENGTH = 30,
NOTE_TITLE_LENGTH = 120,
NOTE_CONTENT_LENGTH = 1200;

export default class Validator {
  constructor() {

  }

  validateTag(name) {
    if (name.length === 0){
      alert('Tag must have a name');
      return false;
    } else if (name.length > TAG_NAME_LENGTH){
      alert('Tag name too long');
      return false;
    } else {
      return true;
    }
  }

  validateNote(title, content) {
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
  }
}