const min = 10;
const max = 100;
const arraySize = 32;
const bucketNum = 5;

$(document).ready(function() {

  var bubbleSort = new BubbleSort(100);
  var bucketSort = new BucketSort(100);
  var insertionSort = new InsertionSort(500);
  var mergeSort = new MergeSort(20);
  var selectionSort = new SelectionSort(50);
  var sortObject = mergeSort;
  sortObject.display();
  console.log(sortObject)

  $("#nextStep").click(function() {
    sortObject.next();
    console.log(sortObject);
  });

  $("#start").click(function() {
    sortObject.intervalId = setInterval(function() {
      sortObject.next();
      console.log(sortObject);
    }, sortObject.interval);
  });

  $("#reset").click(function() {
    sortObject.stop();
    sortObject = new BubbleSort(100);
    sortObject.display();
  });
});

class Sort {
  intervalId;

  constructor(name, interval, array) {
    this.name = name;
    this.array = this.getArray(array);
    this.interval = interval;
  }

  display(left, right, id) {
    var list = [];
    for (var i = 0; i < this.array.length; i++) {
      var color = "red";
      if (i == left || i == right) {
        color = "blue";
      }
      list.push(React.createElement(Item, {num: this.array[i], key: this.array[i] + " " + i, color: color}));
    }
    if (!id) {
      id = 'algorithmDiv'
    }
    ReactDOM.render(
      list,
      document.getElementById(id)
    );
  }

  getArray(array) {
    if (array) {
      return array;
    } else {
      var a = [];
      for (var i = 0; i < arraySize; i++) {
        a.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return a;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    return true;
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

class BucketSort extends Sort {
  constructor(interval) {
    super("Bucket Sort", interval);
    this.i = 0;
    this.j = 0;
    this.buckets = [];
    this.bucketsReact = [];
    this.maxVal = Math.max.apply(null, this.array);
    for (var i = 0; i < bucketNum; i++) {
      this.buckets.push([]);
      this.bucketsReact.push([]);
    }
    this.setup();
  }

  display() {
    super.display(this.i);
  }

  displayBucket(index) {
    var elements = this.bucketsReact[index];
    // TODO: get rid of double render
    ReactDOM.render(
      null,
      document.getElementById('bucket' + index)
    );

    ReactDOM.render(
      elements,
      document.getElementById('bucket' + index)
    );
  }

  next() {
    if (this.i < this.array.length) {
      var index = Math.floor(bucketNum * this.array[this.i] / (max + 1));
      this.buckets[index].push(this.array[this.i]);
      this.bucketsReact[index].push(React.createElement(Item, {num: this.array[this.i], key: this.array[this.i] + " " + this.i, color: "red"}));
      this.i++;
      this.display();
      this.displayBucket(index);
    } else if (this.j < bucketNum) {
      if (!this.insertion) {
        this.insertion = new InsertionSort(this.interval, this.buckets[this.j]);
      }
      var flag = this.insertion.next();
      this.insertion.display('bucket' + this.j);
      if (flag) {
        this.insertion = null;
        this.j++;
      }
    } else {
      var merged = [];
      for (var a of this.buckets) {
        merged = merged.concat(a);
      }
      this.array = merged;
      this.stop();
      this.display();
    }
  }

  setup() {
    var buckets = [];
    for (var i = 0; i < bucketNum; i++) {
      buckets.push(React.createElement('div', {className: 'bucket', id: 'bucket' + i, key: i}));
    }
    ReactDOM.render(
      buckets,
      document.getElementById('bucketDiv')
    );
  }
}

class InsertionSort extends Sort {
  constructor(interval, array) {
    super("Insertion Sort", interval, array);
    this.left = 0;
    this.right = 1;
    this.currentRight = 1;
  }

  display(id) {
    super.display(this.left, this.currentRight, id);
  }

  next() {
    if (this.right >= this.array.length) {
      return this.stop();
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

// TODO: work on display
class MergeSort extends Sort {
  middle;

  constructor(interval) {
    super("Merge Sort", interval);
    this.left = 0;
    this.right = this.array.length;
    this.i = 0;
    this.size = 1;
    this.lists = [];
    this.newLists = [];
    this.split = true;
    this.combined = [];
    this.lp = 0;
    this.rp = 0;
  }

  next() {
    // split
    if (this.split) {
      if (this.i == 0) {
        this.middle = this.array.length / (this.size * 2);
      }

      this.newLists.push(this.array.slice(this.left, this.middle));
      this.newLists.push(this.array.slice(this.middle, this.right))
      var diff = this.right - this.left;
      this.left += diff;
      this.middle += diff;
      this.right += diff;
      this.i++;

      if (this.i == this.size) {
        this.i = 0;
        this.left = 0;
        this.size *= 2;
        this.right = this.array.length / this.size;
        this.lists = this.newLists;
        this.newLists = [];
        if (this.lists.length == this.array.length) {
          this.split = false;
        }
      }
    }
    // combine
    else {
      if (this.lp < this.lists[this.left].length && this.rp < this.lists[this.right].length) {
        if (this.lists[this.left][this.lp] < this.lists[this.right][this.rp]) {
          this.combined.push(this.lists[this.left][this.lp]);
          this.lp++;
        } else {
          this.combined.push(this.lists[this.right][this.rp]);
          this.rp++;
        }
      } else if (this.lp < this.lists[this.left].length) {
        this.combined.push(this.lists[this.left][this.lp]);
        this.lp++;
      } else if (this.rp < this.lists[this.right].length) {
        this.combined.push(this.lists[this.right][this.rp]);
        this.rp++;
      }

      if (this.combined.length == this.lists[this.left].length + this.lists[this.right].length) {
        this.newLists.push(this.combined);
        this.combined = [];
        this.left = this.right + 1;
        this.right += 2;
        this.lp = 0;
        this.rp = 0;
      }

      if (this.newLists.length == this.lists.length / 2) {
        this.left = 0;
        this.right = 1;
        this.lists = this.newLists;
        this.newLists = [];
      }

      if (this.lists.length == 1) {
        this.stop();
        this.array = this.lists[0];
        this.display();
      }
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
      React.createElement('div', {style: {width: (this.props.num / max * 100) + "%", backgroundColor: this.props.color, className: 'item'}},
        React.createElement('span', {}, this.props.num)
      )
    );
  }
}
