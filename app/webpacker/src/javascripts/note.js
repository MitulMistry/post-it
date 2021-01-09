function Note(data) { //Note class
  this.id = data.id;
  this.title = data.title;
  this.content = data.content;
  this.tags = data.tags;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
}
//response data-- {"id":789,"title":"Omnis quidem blanditiis in asperiores perspiciatis fugiat.","content":"Et nisi excepturi. Quam vel quisquam. Est error impedit tenetur consequatur illum dignissimos quis. Ea doloribus aut amet rerum. Ut velit odio.","created_at":"2016-05-30T16:04:44.957Z","updated_at":"2016-05-30T16:04:44.957Z","tags":[{"id":80,"name":"id22"},{"id":101,"name":"omnis2"}]}

Note.prototype.readableCreationDate = function() { //dateTime = 2016-05-26T16:24:19.457Z
  var date = this.created_at.slice(0, 10).split('-'); //get first 10 characters, split into array based on dashes
  return date[1] + '/' + date[2] + '/' + date[0]; //reorder with slashes - 05/26/2016
};

Note.prototype.capitalizedTitle = function() {
  var words = [];
  words = this.title.toLowerCase().split(' '); //turn string into lowercase then split into array of words based on spaces
  for (var i = 0; i < words.length; i++) { //loop through whole array of words
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //for each word, get the first character and set to uppercase, then add rest of the word with slice(1) - which gets second character to end of string
  }
  return words.join(' '); //join the array of words, add spaces, and return the new string
};
