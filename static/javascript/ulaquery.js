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

var hide_filter = function () {
  FormLemma.hide();
  Funct.hide();
  Sigl.hide();
  PosMsd.hide();
};

var show_filter = function () {
  FormLemma.show();
  Funct.show();
  Sigl.show();
  PosMsd.show();
};

var relocate_filter = function () {
  FormLemma.resetXY();
  Sigl.resetXY();
  Funct.resetXY();
  PosMsd.resetXY();
};

const menu = `
<div id="ulaquery_id" class="menu_bar">

<ul>

<li class="v">
  <a href="#">Filter</a>
  <ul class="v">
    <li class="h">
      <a class="tipr" href="javascript:show_filter()">Open
      <span class="tiptextr">Opoen Window FIlter</span></a>
    </li>
    <li class="h">
      <a class="tipr" ref="javascript:hide_filter()">Close
      <span class="tiptextr">Close Window sFiletr</span> </a>
    </li>
    <li class="h">
      <a class="tipr" ref="javascript:resetXY_filter()">Relocate
      <span class="tiptextr">Relocate Window Filetr</span> </a>
    </li>
  </ul>
</li>
  
<li class="v">
  <a href="#">Utils</a>
    <ul class="v">
      <li class="h">
        <a class="cmd tipr" cmd="show_store" href="#">Show Store
        <span class="tiptextr">Show LocalStore</span></a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="clear_store" href="#">Clean Store
        <span class="tiptextr">Clean LocalStore</span></a>
      </li>
    </ul>
</li>

<li class="v">
  <a class="cmd" cmd="help" href="#">Help</a>
</li>

<li class="v">
  <a class="tipb" href="javascript:cmd_log_toggle()">Log
  <span class="tiptextb">Toggle Log</span></a>
</li>

<li class="v">
    <a href="javascript:cmd_close()">close</a>
</li>

</ul>
</div>
`;

var UlaQuery = {
  id:"ulaquery_id",
  open: async function () {
    wait_start();
    await sleep(10);
    this.open2();

    await dm_.load_dict();

    // await DictForm.open();
    // await FormLemma.open();
    // await Sigl.open();
    // await Funct.open();
    // await PosMsd.open();
    UaLog.setXY(-3, 0).setZ(11).new();

    wait_stop();
  },
  open2: function () {
    let jt = UaJth();
    jt.append(menu);
    const html=jt.html();
    console.log(jt.text());
    document.getElementById("ulaquery_id").innerHTML = html;
    // this.bind_menu();
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