class Node {
  constructor (value) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.greater = null;
    this.lesser = null;
  }
}

class FrankensteinList {
  head = null;
  tail = null;
  asc_head_ = null;
  desc_head_ = null;

  static sortAddLogic (value, obj, newNode) {
    if (value >= obj.desc_head_.value) {
      newNode.lesser = obj.desc_head_;
      obj.desc_head_.greater = newNode;
      obj.desc_head_ = newNode;
    } else if (value <= obj.asc_head_.value) {
      newNode.greater = obj.asc_head_;
      obj.asc_head_.lesser = newNode;
      obj.asc_head_ = newNode;
    } else {
      let tmpAsc = obj.asc_head_;
      while (value > tmpAsc.value) {
        tmpAsc = tmpAsc.greater;
      }
      newNode.greater = tmpAsc;
      newNode.lesser = tmpAsc.lesser;
      tmpAsc.lesser.greater = newNode;
      tmpAsc.lesser = newNode;
    }
  }

  static sortDellLogic (value, obj) {
    if (value == obj.desc_head_.value) {      
      obj.desc_head_.lesser.greater = null;
      obj.desc_head_ = obj.desc_head_.lesser;
    } else if (value == obj.asc_head_.value) {      
      obj.asc_head_.greater.lesser = null;
      obj.asc_head_ = obj.asc_head_.greater;
    } else {
      let tmpAsc = obj.asc_head_;
      while (value > tmpAsc.value) {
        tmpAsc = tmpAsc.greater;
      }
      tmpAsc.greater.lesser = tmpAsc.lesser;
      tmpAsc.lesser.greater = tmpAsc.greater;
    }
  }

  toString() {
    let tmp = this.head;
    if (tmp == null) {
      return "null";
    }
    let res = "";
    res += this.head.value;
    while (tmp.next != null) {
      tmp = tmp.next;
      res += ` -> ${tmp.value}`;
    }
    return res;
  }


  size () {
    let size = 1;
    let tmp = this.head;
    if (tmp == null) {
      return 0;
    }
    while (tmp.next != null) {
      tmp = tmp.next;
      ++size;
    }
    return size;
  }

  append (value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.asc_head_ = newNode;
      this.desc_head_ = newNode;
      return;
    }
;
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    FrankensteinList.sortAddLogic(value, this, newNode);
  }

  preppend (value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.asc_head_ = newNode;
      this.desc_head_ = newNode;
      return;
    }
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;

    FrankensteinList.sortAddLogic(value, this, newNode);

  }

  removeById(index) {
    if (typeof index != "number" || Number.isNaN(index)) {
      throw new Error("The passed argument must be a number type with a non-NaN value.");
    }
    if (index < 0 || index > this.size() - 1 || this.head == null) {
      return;
    }    
    if (index == 0 && this.head == this.tail) {
      this.head = null;
      this.tail = null;
      this.asc_head_ = null;
      this.desc_head_ = null;
      return;
    }
    let delVal = null;
    if (index == 0 && this.head != null) {
      delVal = this.head.value;
      this.head.next.prev = null;
      this.head = this.head.next;
    } else if (index == this.size() - 1) {
      delVal = this.tail.value;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let tmp = this.head;
      let i = 0;

      while (i < index - 1) {
        tmp = tmp.next;
        ++i;
      }
      
      delVal = tmp.next.value;
      tmp.next.next.prev = tmp
      tmp.next = tmp.next.next;
    }
    FrankensteinList.sortDellLogic(delVal, this);
  }

  removeByValue (value) {
    if (!this.head) {
      return;
    }
    if (value == this.head.value && this.head == this.tail) {
      this.head = null;
      this.tail = null;
      this.asc_head_ = null;
      this.desc_head_ = null;
      return;
    }
    if (value == this.head.value) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (value == this.tail.value) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let tmp = this.head;
      let i = 0;
      let size = this.size();
      let flag = 1;
      while (i < size) {
        if (tmp.value == value) {
          flag = 0;
          break;
        }
        tmp = tmp.next;
        ++i;
      }
      if (flag) {
        return;
      }
      
      tmp.prev.next = tmp.next;
      tmp.next.prev = tmp.prev;
    }
    FrankensteinList.sortDellLogic(value, this);
  }

  searchByNext (value) {
    let tmp = this.head;
    let res = "";
    let flag = 0;
    let endScopeCount = 0;
    while (tmp != null) {
      if (tmp.value == value) {
        flag = 1;
      }
      if (flag) {
        res += `Node { value: ${tmp.value}, next: `;
        ++endScopeCount;
      }
      tmp = tmp.next;
    }
    if (!res) {
      return null;
    }

    res += `null `;
    while (endScopeCount > 0) {
      res += "} ";
      --endScopeCount;
    }
    return res;
  }

  searchByPrev (value) {
    let tmp = this.tail;
    let res = "";
    let flag = 0;
    let endScopeCount = 0;
    while (tmp != null) {
      if (tmp.value == value) {
        flag = 1;
      }
      if (flag) {
        res += `Node { value: ${tmp.value}, prev: `;
        ++endScopeCount;
      }
      tmp = tmp.prev;
    }
    if (!res) {
      return null;
    }

    res += `null `;
    while (endScopeCount > 0) {
      res += "} ";
      --endScopeCount;
    }
    return res;
  }

  searchByAscOrder (value) {
    let tmp = this.desc_head_;
    let res = "";
    let flag = 0;
    let endScopeCount = 0;
    while (tmp != null) {
      if (tmp.value == value) {
        flag = 1;
      }
      if (flag) {
        res += `Node { value: ${tmp.value}, lesser: `;
        ++endScopeCount;
      }
      tmp = tmp.lesser;
    }
    if (!res) {
      return null;
    }

    res += `null `;
    while (endScopeCount > 0) {
      res += "} ";
      --endScopeCount;
    }
    return res;
  }

  searchByDescOrder (value) {
    let tmp = this.asc_head_;
    let res = "";
    let flag = 0;
    let endScopeCount = 0;
    while (tmp != null) {
      if (tmp.value == value) {
        flag = 1;
      }
      if (flag) {
        res += `Node { value: ${tmp.value}, greater: `;
        ++endScopeCount;
      }
      tmp = tmp.greater;
    }
    if (!res) {
      return null;
    }

    res += `null `;
    while (endScopeCount > 0) {
      res += "} ";
      --endScopeCount;
    }
    return res;
  }

  toStringByAscOrder() {
    let tmp = this.asc_head_;
    if (tmp == null) {
      return "null";
    }
    let res = "";
    res += tmp.value;
    while (tmp.greater != null) {
  
      tmp = tmp.greater;
      res += ` -> ${tmp.value}`;
    }
    return res;
  }
  

  toStringByDescOrder() {
    let tmp = this.desc_head_;
    if (tmp == null) {
      return "null";
    }
    let res = "";
    res += tmp.value;
    while (tmp.lesser != null) {
      
      tmp = tmp.lesser;
      res += ` -> ${tmp.value}`;
    }
    return res;
  }

  insert (value, index) {
    if (typeof index != "number" || Number.isNaN(index)) {
      throw new Error("The passed argument must be a number type with a non-NaN value.");
    }

    if (index < 0 || index > this.size()) {
      return;
    }

    if (index == 0) {
      this.preppend(value);
    } else if (index == this.size()) {
      this.append(value);
    } else {
      let tmp = this.head;
      let i = 0;
      while (i < index - 1) {
        tmp = tmp.next;
        ++i;
      }
      
      let newNode = new Node(value);
      newNode.next = tmp.next;
      tmp.next.prev = newNode;
      tmp.next = newNode;
      newNode.prev = tmp;
      FrankensteinList.sortAddLogic(value, this, newNode);
    }
  }

  reverse () {
    let res = new FrankensteinList;
    for (let i = this.size() - 1; i >= 0; --i) {
      let tmp = this.head;
      for (let j = 0; j < i; ++j) {
        tmp = tmp.next;
      }
      res.append(tmp.value);
    }
    this.head = res.head;
  }

  isEmpty() {
    if (!this.head) {
      return true;
    }
    return false;
  }
}

let obj = new FrankensteinList();
obj.append(1);
obj.append(2);
obj.append(-3);
obj.append(7);
obj.append(9);
obj.append(1);
obj.append(1);
obj.preppend(-4);
obj.preppend(-4);
obj.insert(8, 3);
obj.insert(8, 3);
obj.removeById(0);
obj.removeById(8);
obj.removeById(obj.size() - 1);
obj.removeByValue(8)
obj.removeByValue(8)
obj.removeByValue(9)
obj.removeByValue(7)
obj.removeByValue(-4)
obj.removeByValue(2)
obj.removeByValue(1)
obj.removeByValue(-3)


console.log(obj.toString());
console.log(obj.toStringByAscOrder());
console.log(obj.toStringByDescOrder());


