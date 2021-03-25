const min = 10;
const max = 100;
const arraySize = 20;

$(document).ready(function() {

  var sortObject = new Sort("Bubble Sort", bubbleSortStep, bubbleSortStop, 100);

  $("#nextStep").click(function() {
    ReactDOM.render(
      React.createElement(Items, {array: sortObject.array, index: sortObject.j}, null),
      document.getElementById('algorithmDiv')
    );
    sortObject.next();
    // var element = <Items array=sortObject.array />;

    console.log(sortObject);
    sortObject.stop();
  });

  $("#start").click(function() {
    sortObject.intervalId = setInterval(function() {
      $("#nextStep").click();
    }, sortObject.interval);
  });

  $("#reset").click(function() {
    clearInterval(sortObject.intervalId);
    sortObject = new Sort("Bubble Sort", bubbleSortStep, bubbleSortStop, 100);
    ReactDOM.render(
      React.createElement(Items, {array: sortObject.array}, null),
      document.getElementById('algorithmDiv')
    );
  });

  function Sort(name, next, stop, interval) {
    this.i = 0;
    this.j = 0;
    this.name = name;
    this.array = getRandomArray();
    this.next = next;
    this.first = this.array[0];
    this.second = this.array[1];
    this.stop = stop;
    this.interval = interval;
    this.intervalId = 0;
  }


  ReactDOM.render(
    React.createElement(Items, {array: sortObject.array}, null),
    document.getElementById('algorithmDiv')
  );
});

// returns an array containing random numbers
function getRandomArray() {
  var a = [];
  for (var i = 0; i < arraySize; i++) {
    a.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return a;
}

function bubbleSortStep() {
  if (this.j == arraySize - 1 - this.i) {
    this.i = this.i + 1;
    this.j = 0;
  }
  this.first = this.array[this.j];
  this.second = this.array[this.j + 1]
  if (this.first > this.second) {
    this.array[this.j + 1] = this.first;
    this.array[this.j] = this.second;
  }
  this.j++;
}

function bubbleSortStop() {
  if (this.i == arraySize - 2) {
    clearInterval(this.intervalId);
  }
}

class Items extends React.Component {
  render() {
    var list = [];
    for (var i = 0; i < arraySize; i++) {
      var className = "item";
      if (i == this.props.index || i == this.props.index - 1) {
        className = "currentItem";
      }
      list.push(React.createElement('li', {key: i + " " + this.props.array[i], className: className}, this.props.array[i]));
    }
    return list;
  }
}
