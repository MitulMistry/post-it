function Formatter(){ //formatter class

}

Formatter.prototype.readableDate = function(dateTime){ //dateTime = 2016-05-26T16:24:19.457Z
  var date = dateTime.slice(0, 9).split('-'); //get first 10 characters, split into array based on dashes
  return date[1] + '/' + date[2] + '/' + date[0] 
}

Formatter.prototype.titleCase = function(string){
  string = string.toLowerCase().split(' ');
  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
  }
  return string.join(' ');
}
