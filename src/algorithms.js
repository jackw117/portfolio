import React from 'react';
import ReactDOM from 'react-dom';
import {Item} from './components.js'

const min = 10;             // minimum element value
const max = 100;            // maximum element value
const arraySize = 32;       // size of the array for each sorting object
const bucketNum = 5;        // number of buckets used in the 'BucketSort' object

var interval = 20;          // interval length in milliseconds

// base class extended by the specific sorting algorithms
class Sort {
  // sets the fields used by all of the specific sorting algorithms
  constructor(name, interval, array) {
    this.name = name;
    this.array = this.getArray(array);
    this.interval = interval;
  }

  // creates a React array of the current position of elements and displays them on the page, using either the 'id' parameter or '#tableBody'
  // 'left' and 'right' represent the current elements being compared in the sorting algorithm
  display(indices, id) {
    var list = [];

    for (var i = 0; i < this.array.length; i++) {
      var color = "red";
      if (indices.includes(i)) {
        color = "blue";
      }
      list.push(React.createElement(Item, {num: this.array[i], key: this.array[i] + " " + i, color: color}));
    }
    if (!id) {
      id = 'tableBody'
    }
    ReactDOM.render(
      list,
      document.getElementById(id)
    );
  }

  // sets array field either to the given parameter or a new random array
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

  // resets the fields in the sort object and gets a new random array to mimic creating a new object
  reset() {
    this.stop();
    this.array = this.getArray();
    this.interval = interval;
    this.display();
  }

  // clears the currently running interval
  stop() {
    clearInterval(this.intervalId);
    return true;
  }

  // swaps two elements in the array given their index positions
  swap(left, right) {
    var temp = this.array[left];
    this.array[left] = this.array[right];
    this.array[right] = temp;
  }
}

class BubbleSort extends Sort {
  constructor(interval) {
    super("Bubble Sort", interval);
    this.setFields();
    this.display();
  }

  // calls the super display method with the 'current' and 'current' + 1 values
  display() {
    super.display([this.current, this.current + 1]);
  }

  // represents a single step of the sorting algorithm
  next() {
    this.count++;
    // stops the algorithm on the 'arraySize - 1' iteration
    if (this.i == arraySize - 1) {
      this.stop();
    }
    // swaps two elements in the array if the element at the 'current' index is greater than the element at the 'current' + 1 index
    else if (this.array[this.current] > this.array[this.current + 1]) {
      this.swap(this.current, this.current + 1);
      this.moved = this.current + 1;
    }
    this.current++;

    // the current pointer has reached the right boundary
    if (this.current == this.rightBound) {
      // stop the algorithm if no elements have moved in the current iteration
      if (this.moved == 0) {
        this.stop();
        this.i = arraySize - 1;
      }
      // reset certain fields for the next iteration
      else {
        this.rightBound = this.moved;
        this.moved = 0;
        this.i = this.i + 1;
        this.current = 0;
      }
    }

    this.display();
  }

  // calls the setFields method, and the super reset method
  reset() {
    this.setFields();
    super.reset();
  }

  // sets the fields to their default values
  setFields() {
    this.i = 0;                                 // current iteration
    this.current = 0;                           // current index
    this.moved = 0;                             // index of last element that moved
    this.rightBound = this.array.length - 1;    // index where the values of every index >= 'rightBound' in the array are sorted
    this.count = 0;                             // number of times the next method has been called
  }
}

class BucketSort extends Sort {
  constructor(interval) {
    super("Bucket Sort", interval);
    this.setFields();
    this.display();
  }

  display() {
    super.display([this.i]);
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
    this.count++;
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
        this.count++;
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
    this.count = 0;
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
    this.display();
  }

  display(id) {
    super.display([this.left, this.currentRight], id);
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
    this.display();
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
    this.display();
  }

  // calls the super display method with the index of the current smallest element and current index in the iteration
  display() {
    super.display([this.left, this.minPos, this.right]);
  }

  // a single step of the algorithm
  next() {
    this.count++;
    // stops the algorithm when the left pointer reaches the last element
    if (this.left == this.array.length - 1) {
      this.stop();
    }
    // find smaller element between those referenced by 'minPos' and 'right'
    else if (this.array[this.minPos] > this.array[this.right]) {
      this.minPos = this.right;
    }
    this.right++;

    // swap the elements at 'minPos' and 'left' when the 'right' pointer has reached the end of the array
    // sets up next iteration by moving pointers
    if (this.right == this.array.length) {
      this.swap(this.left, this.minPos);
      this.left++;
      this.right = this.left + 1;
      this.minPos = this.left;
    }
    this.display();
  }

  // calls the setFields method, and the super reset method
  reset() {
    this.setFields();
    super.reset();
  }

  // sets the fields used by the 'SelectionSort' object
  setFields() {
    this.count = 0;       // number of times next() has been called
    this.left = 0;        // left pointer
    this.minPos = 0;      // pointer to the index of the smallest element in the array
    this.right = 1;       // right pointer
  }
}

// TODO: work on display
class QuickSort extends Sort {
  constructor(interval, array) {
    super("Quick Sort", interval, array);
    this.setFields();
    this.display();
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
    super.display([this.left, this.pivot]);
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
    this.display();
  }
}

// an implementation of the shell sort algorithm
// elements in the array are sorted with the InsertionSort algorithm, but with a smaller set of elements to compare
// each new InsertionSort object compares elements with indices given by:
// [left, left + gap, left + 2*gap, ... , left + n*gap] where 'left + n*gap' is the final index with this pattern that still fits in the array
// the gap decreases after the left index pointer becomes equal to the current gap, until it reaches a value of 1 and the final InsertionSort object runs on the entire partially sorted array
class ShellSort extends Sort {
  constructor(interval) {
    super("Shell Sort", interval);
    this.setFields();
    this.display();
  }

  // calls the super display function with the indices of the array of elements being compared
  display() {
    var indices = [];
    for (var i = this.left; i < this.array.length; i += this.gap) {
      indices.push(i);
    }
    super.display(indices);
  }

  // a single step in the sorting algorithm
  next() {
    this.count++;
    // stops the algorithm when the gap is less than 1 (this indicates all elements are sorted)
    if (this.gap < 1) {
      this.stop();
    } else {
      // creates a new InsertionSort object if one doesn't exist
      if (!this.insertion) {
        this.insertion = new InsertionSort(this.interval, this.array, this.gap, this.left);
      }

      // calls the next method on the InsertionSort object, and returns true if the sorting algorithm has finished
      var flag = this.insertion.next();

      // reset InsertionSort object and update fields for the next step
      if (flag) {
        this.insertion = null;
        this.left++;

        // lower the gap between objects once the left index pointer is equal to the gap
        if (this.left == this.gap) {
          this.left = 0;
          this.gap /= 2;
        }
      }
    }
    this.display();
  }

  // resets the necessary fields to mimic creating a new object
  reset() {
    this.setFields();
    super.reset();
  }

  // sets the fields in the object to their default values
  setFields() {
    this.count = 0;                       // number of times next() has been called
    this.gap = this.array.length / 2;     // the space between elements being compared in the array
    this.insertion = null;                // current InsertionSort object
    this.left = 0;                        // current left index
  }
}

export {BubbleSort, BucketSort, InsertionSort, MergeSort, SelectionSort, QuickSort, ShellSort};
