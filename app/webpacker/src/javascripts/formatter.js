export default class Formatter {
  constructor() {

  }

  readableDate(dateTime) { //dateTime = 2016-05-26T16:24:19.457Z
    var date = dateTime.slice(0, 10).split('-'); //get first 10 characters, split into array based on dashes
    return date[1] + '/' + date[2] + '/' + date[0] //reorder with slashes - 05/26/2016
  }

  titleCase(string) {
    var words = [];
    words = string.toLowerCase().split(' '); //turn string into lowercase then split into array of words based on spaces
    for (var i = 0; i < words.length; i++) { //loop through whole array of words
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); //for each word, get the first character and set to uppercase, then add rest of the word with slice(1) - which gets second character to end of string
    }
    return words.join(' '); //join the array of words, add spaces, and return the new string
  }
}
