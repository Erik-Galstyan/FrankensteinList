# FrankensteinList

FrankensteinList is a custom implementation of a doubly-linked list in JavaScript that maintains both insertion order (using `next` and `prev` pointers) and sorted order (using `greater` and `lesser` pointers). This "Frankenstein" list allows you to add, insert, remove, and search for elements while automatically keeping a sorted view of the data.

## Features

- **Doubly-Linked List:** Maintains insertion order with `next` and `prev` pointers.
- **Sorted Order:** Keeps an internal sorted order using `greater` and `lesser` pointers.
- **Flexible Operations:** Methods to append, prepend, insert by index, remove by index/value, and search the list.
- **Multiple Views:** Retrieve the list as a normal (insertion) order string, ascending sorted order, or descending sorted order.
- **Reversal:** Reverse the list (by reassigning the `head` pointer).

## Installation

Simply include the `FrankensteinList.js` file in your project. If you are using a module bundler or Node.js, you can import it as follows:

```js
import FrankensteinList from './FrankensteinList';
// or for CommonJS:
// const FrankensteinList = require('./FrankensteinList');
```
## API Overview

#### Adding and Inserting

- append(value)
Adds value to the end of the list.
- preppend(value)
Adds value to the beginning of the list.
- insert(value, index)
Inserts value at the specified index.

#### Removing

- removeById(index)
Removes the node at the given index.
- removeByValue(value)
Removes the first node containing value.

#### Searching

- searchByNext(value)
Searches from the head (using next pointers) and returns a string representation from the found node onward.
- searchByPrev(value)
Searches from the tail (using prev pointers) and returns a string representation backward.
- searchByAscOrder(value)
Searches in ascending sorted order (using greater pointers).
- searchByDescOrder(value)
Searches in descending sorted order (using lesser pointers).

#### Other Methods
- toString()
Returns a string representation of the list in insertion order.
- toStringByAscOrder()
Returns a string representation of the list in ascending (sorted) order.
- toStringByDescOrder()
Returns a string representation of the list in descending (sorted) order.
- reverse()
Reverses the list (by reassigning the head pointer).
- isEmpty()
Returns true if the list is empty; otherwise, returns false.

#### Sorting Logic
Internally, FrankensteinList uses two static helper methods:
- sortAddLogic(value, obj, newNode)
Inserts a new node into the sorted structure by updating the greater and lesser pointers.
- sortDellLogic(value, obj)
Removes a node from the sorted structure and adjusts the pointers accordingly.

## Authors
- [Erik Galstyan](https://github.com/Erik-Galstyan)

