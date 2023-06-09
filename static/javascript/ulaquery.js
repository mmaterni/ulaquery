"use strict"

var cmd_close = function () {
  if (confirm("Chiudi Applicazione ?")) window.close();
};

var cmd_log_toggle = function () {
  UaLog.toggle();
};

var cmd_log = function (...args) {
  UaLog.log(...args);
};

var cmd_log_show = (...args) => {
  UaLog.log_show(...args);
};

function wait_start() {
  const b = document.querySelector('body');
  if (!!b)
    b.classList.add("wait");
};

function wait_stop() {
  document.querySelector("body").classList.remove("wait");
};

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  });
};

var show_windows = function () {
  FormLemma.show();
  Funct.show();
  Sigl.show();
  PosMsd.show();
};

var resetXY_windows = function () {
  FormLemma.resetXY();
  Sigl.resetXY();
  Funct.resetXY();
  PosMsd.resetXY();
};

function exe(cmd) {
  switch (cmd) {
    case "scroll_top":
      DictForm.scroll_top();
      break;
    case "scroll_bottom":
      DictForm.scroll_bottom();
      break;
    case "scroll_left":
      DictForm.scroll_left();
      break;
    case "scroll_right":
      DictForm.scroll_right();
      break;
    case "show_windows":
      show_windows();
      break;
    case "cmd_log":
      cmd_log_toggle();
      break;
    case "resetxy":
      resetXY_windows();
      break;
    case "close":
      cmd_close();
      break;
    default:
      alert("command not found.");
  }
}


const menu = `
<div class="ulaquery">
<div class="menu_bar" >
<ul>
 <li class="v">
  <a href="#">Scroll</a>
   <ul class="v">
    <li class="h">
      <a class="tipr" cmd="scroll_top" href="#">Top
        <span class="tiptextr">Scroll Top</span>
      </a>
    </li>
    <li class="h">
      <a class="tipr" cmd="scroll_bottom" href="#">Bottom
        <span class="tiptextr">Scroll Bottom</span>
      </a>
    </li>
    <li class="h">
      <a class="tipr" cmd="scroll_left" href="#">Left
        <span class="tiptextr">Scroll Left</span>
      </a>
    </li>
    <li class="h">
      <a class="tipr" cmd="scroll_right" href="#">Right
        <span class="tiptextr">Scroll Right</span>
      </a>
    </li>
  </ul>
  <li class="v tipb" >
    <a  cmd="show_windows" href="#">Open Filter </a>
    <span class="tiptextb">Load Selected Text</span>
   </li>
  <li class="v">
    <a href="#">Utils</a>
    <ul class="v">
      <li class="h">
        <a class="tipr" cmd="resetxy" href="#">Relocate
          <span class="tiptextr">Relocate all Windows</span>
        </a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="show_store" href="#">Show Store
        </a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="clear_store" href="#">Clean Store
          <span class="tiptextr">Clean LocalStore</span>
        </a>
      </li>
    </ul>
  </li>
  <li class="v">
    <a class="cmd" cmd="help" href="#">Help
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="cmd_log" href="#">Log
      <span class="tiptextb">Toggle Log</span>
    </a>
  </li>
  <li class="v">
    <a cmd="close" href="#">close
    </a>
  </li>
  </ul>
</div>
</div>
`;

var UlaQuery = {
  id:"ulaquery_id",
  open: async function () {
    wait_start();
    await sleep(10);
    this.open2();
    await dm_.load_dict();
    await DictForm.open();
    // await FormLemma.open();
    // await Sigl.open();
    // await Funct.open();
    // await PosMsd.open();
    // UaLog.setXY(-300, 0).setZ(11).new().log_show();
    wait_stop();
  },
  open2: function () {
    let jt = UaJth();
    jt.append(menu);
    document.getElementById("ulaquery_id").innerHTML = jt.html();
    this.bind_menu();
  },
  bind_menu: function () {
    const call = (ev) => {
      const t = ev.target;
      if (t.tagName == 'A') {
        const cmd = t.getAttribute("cmd");
        if (!!cmd) exe(cmd);
      }
    };
    const menu = document.getElementById(this.id);
    menu.addEventListener("click", call);
  }
}