var entryString = '';
var answer;
var current = '';
var decimal = false;
var entry;
var operatorCount = 0;
var log = '';

var views = {
  displayText: function(input) {
    var mainScreenText = document.getElementById('main-text');
    mainScreenText.innerHTML = input;
  },
  displaySubText: function(input) {
    var subScreenText = document.getElementById('sub-text');
    subScreenText.innerHTML = input;
  },
  displayConsolText: function() {
    console.log('entry: ' + entry);
    console.log('decimal: ' + decimal);
    console.log('current: ' + current);
    console.log('answer: ' + answer);
  }
};

var handlers = Object.create(views);

handlers.calculate = function(input) {
  entryString += input;
  entry = input;
  current += input;
  answer = entryString;
  log +=input;
  operatorCount=0;
  if (String(current).length > 8 || String(log).length > 18) {
    this.displayText('#');
    this.displaySubText('Max digits reached');
  } else {
    this.displayText(current);
    this.displaySubText(log);
    this.displayConsolText(); 
  }
};
  
handlers.allClear = function() {
  entryString = '';
  count = 0;
  entry = 'ac';
  current = '';
  answer = '';
  log = '';
  operatorCount = 0;
  decimal = false;
  this.displayText('0');
  this.displaySubText(log);
  this.displayConsolText();
};
  
handlers.clearEntry = function(input) {
  var re = /[^\+\-\*\/]*$/;
  var answerLength = entryString.match(re)[0].length + 1 ;
  answer = entryString.substring(0, (entryString.length - answerLength));
  current = entryString.substring(0, (entryString.length - answerLength));
  log = log.substring(0, (entryString.length - answerLength));
  entryString = entryString.substring(0, (entryString.length - answerLength));
  entry = 'ce';
  operatorCount=0;
  this.displayText('0');
  this.displaySubText(log);
  this.displayConsolText();
};

handlers.decimal = function() {
  if (decimal === false) {
    this.calculate('.');
    decimal = true;
  } else {
    this.displaySubText('invalid input');
  }
};
  
handlers.evaluate = function() {
  var result = (eval(entryString));
  var re = /\./;
  if (re.test(result)) {
    result = result.toFixed(2);
  }
  entry = '=';
  current = log;
  answer = result;
  operatorCount=0;
  this.displayText(result);
  this.displaySubText(log + entry + result); 
  this.displayConsolText();
};

handlers.arithmetic = function(input) {
  operatorCount++;
  if (operatorCount > 1) {
    this.displaySubText('invalid input');
    return;
  } else {
    answer=eval(entryString) + input;
    current = eval(entryString) + input;
    entryString += input;
    log += input;
    decimal = false;
  }
  this.displayText(input);
  this.displaySubText(current);
  this.displayConsolText();
  current = '';
};












