<template>
  <div id="Note"></div>
</template>

<script setup>
import '../style.css'
import '../css/main.css'
import {marked} from "marked";
import 'github-markdown-css'
import hljs from 'highlight.js'
import "highlight.js/styles/github.css";
import imgUrl from '../assets/close.svg'
import {onMounted} from "vue";

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})

function NoteBook() {
  this.name = 'Default';
  this.taskList = [new Note()];
  this.status = false;
}


//list 为对象数组
function Note() {
  // this.title = '开始创作吧～';
  this.content = '# 🤯记录你的灵感瞬间～';
  this.author = '';
  this.createDate = new Date();
  this.changeDate = new Date();
  this.tag = '';
}

let noteBooks = [new NoteBook()]
let taskList = noteBooks[0].taskList;
let showPre = true;
let showLSide = false;
let showOpts = false;
let deleting = false;
let infoPosition;


// let title = document.getElementById("titleContent");

onMounted(()=>{
  document.querySelector("#Note").innerHTML = `
<div id="bar" onselectstart = "return false">
<div id="NoteBooks">NoteDAO</div>
<!--<button id="New">New</button> -->
</div>
<div id="container">
<div id="l_side">
</div>
<div id="main">
<div id="title"></div>
<div style="display: flex">
<div id="list"></div>
<div id="r_side">
    <div id="r_content"></div>
</div>
</div>
</div>

</div>
`
  document.getElementById("r_side").style.visibility = 'none'
  // title.innerText = taskList[0].title;
  noteBooks[0].taskList[0].content = '# 🤯记录你的灵感瞬间～\n' +
      '## 快速上手\n' +
      '### 点击左上角徽标呼出书架\n' +
      '1. 左击笔记本展开笔记 右侧<kbd>Ctrl</kbd>收起\n' +
      '2. 右击进入编辑(编辑状态下<kbd>Ctrl</kbd>+<kbd>Del</kbd>删除笔记本)\n' +
      '### 笔记区域\n' +
      '1. 编辑模式下点击单元格进入编辑、显示详细信息(预览模式下不可以编辑)\n' +
      '2. 预览模式下使用全局快捷键或者双击单元格进入编辑模式\n' +
      '3. 单元格右侧为操作区域，鼠标悬停此区域呼出(预览模式下不可呼出)\n' +
      '### 全局\n' +
      '1. <kbd>Ctrl</kbd> + <kbd>=</kbd> 快速新建笔记本\n' +
      '2. <kbd>Ctrl</kbd> + <kbd>/</kbd> 切换编辑/预览(markdown)\n' +
      '## [语法帮助](https://markdown.com.cn/)(👈点击前往)\n' +
      '## 部分效果预览\n' +
      '### 标题（Heading）\n' +
      '# H1\n' +
      '## H2\n' +
      '### H3\n' +
      '### 粗体（Bold）\n' +
      '**bold text**\n' +
      '### 斜体（Italic）\n' +
      '*italicized text*\n' +
      '### 删除线（Strikethrough）\n' +
      '~~The world is flat.~~\n' +
      '### 引用块（Blockquote）\n' +
      '> blockquote\n' +
      '### 有序列表（Ordered List）\n' +
      '1. First item\n' +
      '2. Second item\n' +
      '3. Third item\n' +
      '### 无序列表（Unordered List）\n' +
      '- First item\n' +
      '- Second item\n' +
      '- Third item\n' +
      '### 任务列表（Task List）\n' +
      '- [x] Write the press release\n' +
      '- [ ] Update the website\n' +
      '- [ ] Contact the media\n' +
      '### 代码块（Fenced Code Block）\n' +
      '``` java\n' +
      'public class HelloWorld {\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Hello World");\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '### 分隔线（Horizontal Rule）\n' +
      '***\n' +
      '### 链接（Link）\n' +
      '[Github](https://github.com/Astral-Cyber/NoteDAO)\n' +
      '### 图片（Image）\n' +
      '![Image](https://s1.ax1x.com/2022/10/07/x3vEM8.jpg)';
  createPre();
  console.log(noteBooks[0].taskList[0].content);
  document.getElementById("title").innerHTML = `<h2>NoteBook: ${noteBooks[0].name}</h2>`
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '/') {
      if (!showPre) {
        document.getElementById("r_side").style.flex = '0';
        document.getElementById("r_side").style.opacity = '0';
        document.getElementById("r_content").style.opacity = '0';
        //隐藏时清空内容
        document.getElementById("r_content").innerText = '';
        clearInterval(infoPosition);
        createPre();
        showPre = true;
      } else {
        create();
        showPre = false;
      }
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '=') {
      noteBooks.push(new NoteBook());
      if (showLSide)
        menu(true);
    }
  })
  infoPosition = setInterval(() => {
    console.log('fresh')
    let height = document.activeElement.parentElement.offsetTop;
    if (height)
      document.getElementById("r_side").style.marginTop = height - 96 + "px";
  }, 16);
  document.getElementById('l_side').oncontextmenu = function (event) {
    event.preventDefault();
  };
  document.querySelector("#NoteBooks").addEventListener('click', async () => {
    if (!showLSide) {
      showLSide = true;
      document.getElementById("l_side").style.flex = '1';

      document.getElementById("main").style.flex = '6'
      await sleep(750)
      document.getElementById("l_side").style.opacity = '1'
      menu(showLSide);
    } else {
      showLSide = false;
      document.getElementById("l_side").style.flex = '0';
      document.getElementById("l_side").style.opacity = '0'
      document.getElementById("main").style.flex = '6'
      // for (let book of noteBooks) {
      //     book.status = false;
      // }
      menu(showLSide)
    }
  })
  clearInterval(infoPosition);
})


//Menu区域
function menu(status) {
  let lSide = document.querySelector('#l_side');
  if (status) {
    let i = 0;
    lSide.innerHTML = "";
    for (let notebook of noteBooks) {
      lSide.insertAdjacentHTML('beforeend',
          `<div class="book" id="book${i}">
                      <h3>${notebook.name}</h3>
                      <img class="close" style="width: 10px" src="${imgUrl}"/>
                      </div>`)
      let book = document.getElementById(`book${i}`)
      let current = book.id.substring(4);
      if (notebook.status) {
        book.style.height = noteBooks[book.id.substring(4)].taskList.length * 31 + 20 + 'px';
        book.getElementsByTagName("img")[0].style.opacity = '1';
        book.getElementsByTagName("img")[0].style.visibility = 'visible';
        book.getElementsByTagName("img")[0].style.top = '2px';
      }
      for (let note of notebook.taskList) {
        document.getElementById(`book${i}`).insertAdjacentHTML('beforeend',
            `<dt class="note" id="note${i}">${note.content.toString().substring(0, 12).match(/(?<=\s)\S+$/) + "..."}</dt>`)
      }
      book.getElementsByTagName("h3")[0].addEventListener('click', () => {
        // if (!noteBooks[book.id.substring(4)].status) {
        let books = document.getElementsByClassName('book');
        for (let booksEle of books) {
          booksEle.style.borderBottom = '#d0d3d8 2px solid';
          booksEle.getElementsByTagName("h3")[0].style.backgroundColor = '';
        }
        book.style.borderBottom = '#747bff 2px solid';
        book.getElementsByTagName("img")[0].style.opacity = '1';
        book.getElementsByTagName("img")[0].style.visibility = 'visible';
        book.getElementsByTagName("img")[0].style.top = '2px';
        book.getElementsByTagName("h3")[0].style.backgroundColor = 'rgba(208, 211, 216, 0.43)'
        book.style.height = noteBooks[book.id.substring(4)].taskList.length * 31 + 20 + 'px';
        noteBooks[book.id.substring(4)].status = true;
        taskList = noteBooks[book.id.substring(4)].taskList;
        document.getElementById("title").innerHTML = `<h2>NoteBook: ${noteBooks[book.id.substring(4)].name}</h2>`
        if (showPre) {
          createPre();
          showPre = true;
        } else {
          create();
          showPre = false;
        }
        // } else {
        //     book.style.borderBottom = '#d0d3d8 1px solid';
        //     book.getElementsByTagName("h3")[0].style.backgroundColor = '';
        //     // book.style.height = '20px';
        //     noteBooks[book.id.substring(4)].status = false;
        //     taskList = noteBooks[book.id.substring(4)].taskList;
        //     document.getElementById("title").innerHTML = `<h2>NoteBook: ${noteBooks[book.id.substring(4)].name}</h2>`
        //     createPre();
        // }
      })
      book.getElementsByTagName("img")[0].addEventListener('click', (e) => {
        book.style.height = '20px';
        book.getElementsByTagName("img")[0].style.opacity = '0';
        book.getElementsByTagName("img")[0].style.visibility = 'hidden';
        book.getElementsByTagName("img")[0].style.top = '0px';
        notebook.status = false;
      })
      book.getElementsByTagName("h3")[0].addEventListener('mousedown', (e) => {
        if (e.button === 2)
          book.getElementsByTagName("h3")[0].setAttribute('contenteditable', true)
      })
      book.getElementsByTagName("h3")[0].addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          book.getElementsByTagName("h3")[0].blur()
        }
      })
      book.getElementsByTagName("h3")[0].addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Delete') {
          if (noteBooks.length !== 1) {
            deleting = true;
            noteBooks.splice(parseInt(current), 1);
            menu(true)
          } else {
            alert("再删就没有咯！")
          }
        }
      })
      book.getElementsByTagName("h3")[0].addEventListener('blur', () => {
        if (!deleting) {
          book.getElementsByTagName("h3")[0].setAttribute('contenteditable', false)
          noteBooks[book.id.substring(4)].name = book.getElementsByTagName("h3")[0].outerText
          document.getElementById("title").innerHTML = `<h2>NoteBook: ${noteBooks[book.id.substring(4)].name}</h2>`
        } else {
          book.getElementsByTagName("h3")[0].setAttribute('contenteditable', false)
          document.getElementById("title").innerHTML = `<h2>NoteBook: ${noteBooks[book.id.substring(4) - 1].name}</h2>`
          taskList = noteBooks[book.id.substring(4) - 1].taskList;
          createPre();
          showPre = true;
        }
      })
      i++;
    }
  } else {
    lSide.innerHTML = "";
  }
}


//Note区域

function create() {
  document.querySelector("#list").innerHTML = "";
  let i = 0;
  for (let taskListElement of taskList) {
    document.getElementById("list").insertAdjacentHTML('beforeend',
        '<div class="item"><dt class="content" id="' + i + '" contenteditable="true" style="white-space: pre-wrap;"></dt>' +
        '<a class="react" id="react' + i + '"></a>' +
        '<div class="options" id="option' + i + '">' +
        '<button class="btm up" id="up' + i + '">Up</button>' +
        '<button class="btm down" id="down' + i + '">Down</button>' +
        '<button class="btm addUp" id="addUp' + i + '">Up+</button>' +
        '<button class="btm addDown" id="addDown' + i + '">Down+</button>' +
        '<button class="btm delete" id="delete' + i + '">Delete</button>' +
        '</div>' +
        '</div>');
    let item = document.getElementById(i);
    let react = document.getElementById("react" + i);
    let de = document.getElementById("delete" + i);
    let up = document.getElementById("up" + i);
    let down = document.getElementById("down" + i);
    let addUp = document.getElementById("addUp" + i);
    let addDown = document.getElementById("addDown" + i);
    //*************************************************按钮事件
    de.addEventListener('click', () => {
      if (taskList.length !== 1) {
        taskList.splice(parseInt(item.id), 1);
        create();
        if (showLSide)
          menu(true);
      } else {
        alert("再删就没有咯！")
      }
    })
    up.addEventListener('click', () => {
      let current = parseInt(item.id);
      if (current - 1 >= 0) {
        let temp;
        temp = taskList[current];
        taskList[current] = taskList[current - 1];
        taskList[current - 1] = temp;
        create();
      } else {
        window.alert("已经是第一个啦！");
      }
    })
    down.addEventListener('click', () => {
      let current = parseInt(item.id);
      if (current + 2 <= taskList.length) {
        let temp;
        temp = taskList[current];
        taskList[current] = taskList[current + 1];
        taskList[current + 1] = temp;
        create();
      } else {
        window.alert("已经是最后一个啦！");
      }
    })
    addUp.addEventListener('click', () => {
      let current = parseInt(item.id);
      let newNote = new Note();
      // newNote.createDate = new Date();
      taskList.splice(current, 0, newNote)
      create();
      if (showLSide)
        menu(true);
      // for (let book of noteBooks) {
      //     book.status = false;
      // }
    })
    addDown.addEventListener('click', () => {
      console.log("add")
      let current = parseInt(item.id);
      let newNote = new Note();
      // newNote.createDate = new Date();
      taskList.splice(current + 1, 0, newNote)
      create();
      if (showLSide)
        menu(true);
      // for (let book of noteBooks) {
      //     book.status = false;
      // }
    })
    //*************************************************内容区
    item.innerText = taskListElement.content;
    item.addEventListener('blur', async () => {
      if (!showOpts) {
        document.getElementById("r_side").style.flex = '0';
        document.getElementById("r_side").style.opacity = '0';
        document.getElementById("r_content").style.opacity = '0';
        //隐藏时清空内容
        document.getElementById("r_content").innerText = '';
        clearInterval(infoPosition);
      }
      let current = parseInt(item.id);
      taskList[current].changeDate = new Date();
      taskList[current].content = item.outerText;
      if (showLSide) {
        // for (let book of noteBooks) {
        //     book.status = false;
        // }
        menu(true);
      }
    })
    item.addEventListener('click', async () => {
      let current = parseInt(item.id);
      document.getElementById("r_side").style.opacity = '1';
      document.getElementById("r_side").style.flex = '1';

      infoPosition = setInterval(() => {
        console.log('fresh')
        let height = document.activeElement.parentElement.offsetTop;
        if (height)
          document.getElementById("r_side").style.marginTop = height - 96 + "px";
      }, 100);

      document.getElementById("r_content").innerText = 'Number: ' + item.id + '\n'
          + 'Create: ' + '\n' + DateFormat(taskList[current].createDate) + '\n'
          + 'Change: ' + '\n' + DateFormat(taskList[current].changeDate);
      document.getElementById("r_content").style.opacity = '1';

    })
    item.addEventListener('mouseover', () => {
      showOpts = true;
    })
    item.addEventListener('mouseout', () => {
      showOpts = false;
    })
    //**************************************************操作区
    react.addEventListener('mouseover', () => {
      let option = document.getElementById("option" + item.id);
      option.addEventListener('mouseover', () => {
        option.style.right = '4px';
        showOpts = true;
      })
      showOpts = true;
      option.style.right = '4px';
    })
    react.addEventListener('mouseout', () => {
      let option = document.getElementById("option" + item.id);
      option.addEventListener('mouseout', () => {
        option.style.right = '-60px';
        showOpts = false;
      })
      showOpts = false;
      option.style.right = '-60px';
    })
    i++;
  }
}

function createPre() {
  document.querySelector("#list").innerHTML = ""
  let i = 0;
  for (let taskListElement of taskList) {
    document.getElementById("list").insertAdjacentHTML('beforeend',
        '<div class="item">' +
        '<dt class="markdown-body" id="' + i + '">' + marked(taskListElement.content) + '</dt>' +
        '</div>');
    let item = document.getElementById(i);
    item.addEventListener('click', () => {
      let items = document.getElementsByClassName("markdown-body")
      for (let item1 of items) {
        item1.style.border = ''
      }
      item.style.border = '#747cff 2px solid'
    })
    item.addEventListener('dblclick', () => {
      if (!showPre) {
        document.getElementById("r_side").style.flex = '0';
        document.getElementById("r_side").style.opacity = '0';
        document.getElementById("r_content").style.opacity = '0';
        //隐藏时清空内容
        document.getElementById("r_content").innerText = '';
        clearInterval(infoPosition);
        createPre();
        showPre = true;
      } else {
        create();
        showPre = false;
      }
    })
    item.addEventListener('mouseover', (e) => {
      if (item.style.backgroundColor === '')
        item.style.backgroundColor = 'rgb(245,245,245)'
    })
    item.addEventListener('mouseout', (e) => {
      if (item.style.backgroundColor === 'rgb(245, 245, 245)')
        item.style.backgroundColor = ''
    })
    i++;
  }
}

// document.querySelector("#New").addEventListener('click', () => {
//     let newNote = new Note();
//     newNote.createDate = new Date();
//     taskList.push(newNote)
//     console.log(taskList)
//     create();
//     showPre = false;
// })

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function DateFormat(date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  if (month.length === 1)
    month = '0' + month;
  let day = date.getDate().toString();
  if (day.length === 1)
    day = '0' + day;
  let hour = date.getHours().toString();
  if (hour.length === 1)
    hour = '0' + hour;
  let min = date.getMinutes().toString();
  if (min.length === 1)
    min = '0' + min;
  return `${year}/${month}/${day} ${hour}:${min}`;
}
</script>

<style scoped>

</style>