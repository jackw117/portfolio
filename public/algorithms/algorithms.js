const min = 5;
const max = 100;
const arraySize = 32;
const bucketNum = 5;

var interval = 20;

$(document).ready(function() {

  // default sort object
  var sortObject = new BubbleSort(interval);
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
    sortObject.reset();
  });

  $("#stop").click(function() {
    sortObject.stop();
  });

  $(".sortButton").click(function() {
    sortObject.stop();
  });

  $("#bubbleSort").click(function() {
    sortObject = new BubbleSort(interval);
  });

  $("#bucketSort").click(function() {
    sortObject = new BucketSort(interval);
  });

  $("#insertionSort").click(function() {
    sortObject = new InsertionSort(interval);
  });

  $("#mergeSort").click(function() {
    sortObject = new MergeSort(interval);
  });

  $("#quickSort").click(function() {
    sortObject = new QuickSort(interval);
  });

  $("#selectionSort").click(function() {
    sortObject = new SelectionSort(interval);
  });

  $("#shellSort").click(function() {
    sortObject = new ShellSort(interval);
  });
});

class Sort {
  constructor(name, interval, array) {
    this.name = name;
    this.array = this.getArray(array);
    this.interval = interval;
    this.display();
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

  next(left, right, id) {
    this.display(left, right, id)
  }

  reset() {
    this.stop();
    this.array = this.getArray();
    this.interval = interval;
    this.display();
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

// TODO: optimize to stop once it detects no changes
class BubbleSort extends Sort {
  constructor(interval) {
    super("Bubble Sort", interval);
    this.setFields();
  }

  display() {
    super.display(this.j, this.j - 1);
  }

  next() {
    this.count++;
    if (this.i == arraySize - 1) {
      this.stop();
    } else {
      if (this.j == this.right) {
        if (this.max == 0) {
          this.stop();
          this.i = arraySize - 1;
        } else {
          this.right = this.max;
          this.max = 0;
          this.i = this.i + 1;
          this.j = -1;
        }
      } else if (this.array[this.j] > this.array[this.j + 1]) {
        this.swap(this.j, this.j + 1);
        this.max = this.j + 1;
      }
      this.j++;
    }
    super.next(this.left, this.right);
  }

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.i = 0;
    this.j = 0;
    this.max = 0;
    this.right = this.array.length - 1;
    this.count = 0;
  }
}

class BucketSort extends Sort {
  constructor(interval) {
    super("Bucket Sort", interval);
    this.setFields();
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

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.insertion = null;
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
  constructor(interval, array, gap, start) {
    super("Insertion Sort", interval, array);
    this.setFields(start, gap);
  }

  display(id) {
    super.display(this.left, this.currentRight, id);
  }

  next() {
    this.count++;
    if (this.array[this.left] > this.array[this.currentRight]) {
      this.swap(this.left, this.currentRight);
      this.left -= this.gap;
      this.currentRight -= this.gap;
    } else {
      this.right += this.gap;
      this.currentRight = this.right;
      this.left = this.right - this.gap;
    }

    // TODO: check if this insertion belongs to another object, and DON'T display if it does
    // this.display();
    if (this.right >= this.array.length) {
      return this.stop();
    }
  }

  reset() {
    this.setFields();
    super.reset();
  }

  setFields(start, gap) {
    this.left = start || 0;
    this.gap = gap || 1;
    this.right = this.gap + this.left;
    this.currentRight = this.gap + this.left;
    this.count = 0;
  }
}

// TODO: work on display
class MergeSort extends Sort {
  constructor(interval) {
    super("Merge Sort", interval);
    this.setFields();
  }

  next() {
    // split
    this.count++;
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

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.combined = [];
    this.count = 0;
    this.i = 0;
    this.left = 0;
    this.lists = [];
    this.lp = 0;
    this.middle = 0;
    this.newLists = [];
    this.right = this.array.length;
    this.rp = 0;
    this.size = 1;
    this.split = true;
  }
}

class SelectionSort extends Sort {
  constructor(interval) {
    super("Selection Sort", interval);
    this.setFields();
  }

  display() {
    super.display(this.minPos, this.right);
  }

  next() {
    this.count++;
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
    this.display();
  }

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.count = 0;
    this.left = 0;
    this.minPos = 0;
    this.right = 1;
  }
}

// TODO: work on display
class QuickSort extends Sort {
  constructor(interval, array) {
    super("Quick Sort", interval, array);
    this.setFields();
  }

  display() {
    super.display();
  }

  next() {
    this.count++;
    var queue = this.current.next();
    if (queue) {
      this.queue.splice(this.index, 1, ...queue);
      while (this.index < this.array.length && !this.queue[this.index].name) {
        this.index++;
      }
      if (this.queue.length == this.array.length) {
        this.array = this.queue;
        this.stop();
        this.display();
      } else {
        this.current = this.queue[this.index];
      }
    }
  }

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.count = 0;
    this.current = new QuickSortStep(this.interval, this.array);
    this.index = 0;
    this.queue = [];
  }
}

class QuickSortStep extends Sort {
  constructor(interval, array) {
    super("Quick Sort Step", interval, array);
    this.left = 1;
    this.pivot = 0;
    this.lists = [[], [this.array[this.pivot]], []];
  }

  display() {
    super.display(this.left, this.pivot);
  }

  next() {
    if (this.left == this.array.length) {
      this.stop();
      var queue = [];
      if (this.lists[0].length > 0) {
        if (this.lists[0].length == 1) {
          queue.push(this.lists[0][0]);
        } else {
          queue.push(new QuickSortStep(this.interval, this.lists[0]));
        }
      }
      queue.push(this.array[this.pivot]);
      if (this.lists[2].length > 0) {
        if (this.lists[2].length == 1) {
          queue.push(this.lists[2][0]);
        } else {
          queue.push(new QuickSortStep(this.interval, this.lists[2]));
        }
      }
      return queue;
    } else {
      if (this.array[this.left] <= this.array[this.pivot]) {
        this.lists[0].push(this.array[this.left]);
      } else {
        this.lists[2].push(this.array[this.left]);
      }
      this.left++;
    }
    super.next(this.left, this.pivot);
  }
}

// TODO: display all elements being compared (only displays 2 currently)
class ShellSort extends Sort {
  constructor(interval) {
    super("Shell Sort", interval);
    this.setFields();
  }

  display() {
    super.display(this.left, this.right + this.left);
  }

  next() {
    this.count++;
    this.display()

    if (!this.insertion) {
      console.log("left: " + this.array[this.left] + " right: " + this.array[this.left + this.gap])
      this.insertion = new InsertionSort(this.interval, this.array, this.gap, this.left);
    }

    var flag = this.insertion.next();
    if (flag) {
      this.insertion = null;
      this.left++;
      if (this.left == this.gap) {
        this.left = 0;
        this.gap /= 2;
      }
    }

    if (this.gap < 1) {
      this.stop();
    }
  }

  reset() {
    this.setFields();
    super.reset();
  }

  setFields() {
    this.count = 0;
    this.gap = this.array.length / 2;
    this.insertion = null;
    this.left = 0;
    this.right = this.gap;
  }
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

// TODO: call display at the start of next (put it in super class), then call again after the last step of the algorithm
// fix blue on reset click (doesn't happen on sort click)
