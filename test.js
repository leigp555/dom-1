window.dom = {
  //创建一个标签并插入node中并展示出来
  create(node, tagName) {
    let a = document.createElement("template");
    a.innerHTML = tagName.trim();
    node.appendChild(a.content.firstChild);
  },
  //创建一个元素，留存在内存中
  create1(tagName) {
    let a = document.createElement("template");
    a.innerHTML = tagName.trim();
    return a.content.firstChild;
  },
  //往后加一个兄弟元素
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //往前加一个兄弟元素
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //用于新增一个子元素
  append(parent, child) {
    parent.appendChild(child);
  },

  //用于新增父元素
  wrap(node, tagName) {
    let c = node.parentNode;
    let a = document.createElement("template");
    a.innerHTML = tagName;
    let b = a.content.firstChild;
    console.log(b);
    c.appendChild(b);
    b.appendChild(node);
  },
  //删除
  remove(node) {
    let array = [];
    b = node.cloneNode(true);
    for (let i = 0; i < b.children.length; i++) {
      array.push(b.childNodes[i]);
    }

    node.parentNode.removeChild(node);
    return array;
  },

  remove1(node) {
    node.remove();
  },

  //修改属性值
  attr(node, name, value) {
    if (arguments.length === 3) {
      return node.setAttribute(name, value);
    }
    console.log(node.getAttribute(name));
    if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //   修改文本内容
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    }

    if (arguments.length === 1) {
      return node.innerText;
    }
  },
  //   修改HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    }
    if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //修改样式
  style(node, name, value) {
    //node color red
    if (arguments.length === 3) {
      node.style[name] = value;
    }

    if (arguments.length === 2) {
      if (typeof name === "string") {
        //node color
        return node.style[name];
      }
      if (name instanceof Object) {
        let object = name;
        for (key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  //添加class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    //删除className
    remove(node, className) {
      node.classList.remove(className);
    },
    //是否有这个class
    hasClassName(node, className) {
      return node.classList.contains(className);
    },
  },
  //点击事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //查元素
  //   find(selector) {
  //     return document.querySelectorAll(selector);
  //   },
  find(selector, node) {
    return (node || document).querySelectorAll(selector);
  },

  //查元素的父元素
  parent(node) {
    return node.parentNode;
  },
  //查找子元素
  children(node) {
    return node.children;
  },
  //查找兄弟姐妹
  siblings(node) {
    let a = [];
    let b = node.parentNode.children;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === node) {
        return a;
      } else if (b[i] !== node) {
        a.push(b[i]);
      }
    }
  },
  //查找下一个节点
  next(node) {
    let x = node.nextSibling;
    if (x) {
      if (x.nodeType === 3) {
        return (x = x.nextSibling);
      }
    } else {
      return node;
    }
  },
  //   next(node) {
  //     let x = node.nextSibling;
  //     while (x && (x.nodeType === 3)) {
  //       x = x.nextSibling;
  //     }
  //     return x;
  //   },
  //查找上一个节点
  previous(node) {
    let x = node.previousSibling;
    if (x && x.nodeType === 3) {
      x = x.previousSibling;

      return x;
    }
  },
  // each每一项操作/查看每一项
  each(node, name, value) {
    let a = dom.children(dom.find(node)[0]);

    if (arguments.length === 3) {
      for (let i = 0; i < a.length; i++) {
        dom.style(a[i], name, value);
      }
    } else if (arguments.length === 1) {
      let xx = [];
      for (let i = 0; i < a.length; i++) {
        xx.push(a[i]);
      }
      return xx;
    }
  },
  //查找排行
  index(node) {
    let list = dom.children(node.parentNode);
    let i = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i + 1;
  },
};
