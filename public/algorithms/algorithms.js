const min = 10;
const max = 100;
const arraySize = 20;
const bucketNum = 5;

$(document).ready(function() {

  var bubbleSort = new BubbleSort(100);
  var bucketSort = new BucketSort(100);
  var insertionSort = new InsertionSort(500);
  var mergeSort = new MergeSort(200);
  var selectionSort = new SelectionSort(50);
  var sortObject = bucketSort;
  sortObject.display();
  console.log(sortObject)

  $("#nextStep").click(function() {
    sortObject.next();
    sortObject.display();
    console.log(sortObject);
  });

  $("#start").click(function() {
    sortObject.intervalId = setInterval(function() {
      $("#nextStep").click();
    }, sortObject.interval);
  });

  $("#reset").click(function() {
    sortObject.stop();
    sortObject = new BubbleSort(100);
    sortObject.display();
  });
});

// returns an array containing random numbers
function getRandomArray() {
  var a = [];
  for (var i = 0; i < arraySize; i++) {
    a.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return a;
}

class Sort {
  intervalId;

  constructor(name, interval) {
    this.name = name;
    this.array = getRandomArray();
    this.interval = interval;
  }

  display(left, right) {
    var list = [];
    for (var i = 0; i < this.array.length; i++) {
      var color = "red";
      if (i == left || i == right) {
        color = "blue";
      }
      list.push(React.createElement(Item, {num: this.array[i], key: this.array[i] + " " + i, color: color}));
    }
    ReactDOM.render(
      list,
      document.getElementById('algorithmDiv')
    );
  }

  stop() {
    clearInterval(this.intervalId);
  }

  swap(left, right) {
    var temp = this.array[left];
    this.array[left] = this.array[right];
    this.array[right] = temp;
  }
}

class BubbleSort extends Sort {
  constructor(interval) {
    super("Bubble Sort", interval);
    this.i = 0;
    this.j = 0;
    this.first = this.array[0];
    this.second = this.array[1];
  }

  display() {
    super.display(this.j, this.j - 1);
  }

  next() {
    if (this.i == arraySize - 1) {
      this.stop();
    } else {
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
  }
}

// TODO: work on bucket display
class BucketSort extends Sort {
  constructor(next, interval) {
    super("Bucket Sort", interval);
    this.i = 0;
    this.j = 0;
    this.buckets = [];
    this.maxVal = Math.max.apply(null, this.array);
    for (var i = 0; i < bucketNum; i++) {
      this.buckets.push([]);
    }
  }

  display() {
    super.display(-1, -1);
  }

  next() {
    if (this.j >= bucketNum) {
      this.stop();
    } else {
      if (this.i < this.array.length) {
        var index = Math.floor(bucketNum * this.array[this.i] / (max + 1));
        this.buckets[index].push(this.array[this.i]);
        this.i++;
      } else if (this.j < bucketNum) {
        // TODO: call insertion sort on each bucket
        this.buckets[this.j].sort();
        this.j++;
      }
    }
  }
}

class InsertionSort extends Sort {
  constructor(interval) {
    super("Insertion Sort", interval);
    this.left = 0;
    this.right = 1;
    this.currentRight = 1;
  }

  display() {
    super.display(this.left, this.currentRight);
  }

  next() {
    if (this.right == arraySize) {
      this.stop();
    } else {
      if (this.array[this.left] > this.array[this.currentRight]) {
        this.swap(this.left, this.currentRight);
        this.left--;
        this.currentRight--;
      } else {
        this.right++;
        this.currentRight = this.right;
        this.left = this.right - 1;
      }
    }
  }
}

// TODO:
class MergeSort extends Sort {
  middle;

  constructor(interval) {
    super("Merge Sort", interval);
    this.left = 0;
    this.right = this.array.length - 1;
  }

  next() {
    if (this.right > this.left) {
      this.middle = Math.floor(this.left + (this.right - this.left) / 2);
    }
  }
}

class SelectionSort extends Sort {
  constructor(interval) {
    super("Selection Sort", interval);
    this.left = 0;
    this.right = 1;
    this.minPos = 0;
  }

  display() {
    super.display(this.minPos, this.right);
  }

  next() {
    if (this.left == this.array.length - 1) {
      this.stop();
    } else {
      if (this.right == this.array.length) {
        this.swap(this.left, this.minPos);
        this.left++;
        this.right = this.left + 1;
        this.minPos = this.left;
      } else {
        if (this.array[this.minPos] > this.array[this.right]) {
          this.minPos = this.right;
        }
        this.right++;
      }
    }
  }
}

// TODO:
class QuickSort extends Sort {
  constructor(interval) {
    super("Quick Sort", interval);
    this.left = 0;
    this.right = this.array.length - 1;
    this.pivot = 0;
  }

  // display() {
  //   super.display(this.current, this.right);
  // }
  //
  // next() {
  //   if (this.array[this.current] > this.array[this.right]) {
  //     var tmp = this.array[this.current];
  //     this.array[this.current] = this.array[this.right];
  //     this.array[this.right] = tmp;
  //     this.current = this.right;
  //   }
  // }
}


class Item extends React.Component {
  render() {
    return (
      React.createElement('div', {style: {width: (this.props.num / max * 100) + "%", backgroundColor: this.props.color}},
        React.createElement('span', {}, this.props.num)
      )
    );
  }
}
