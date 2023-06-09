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

const menu = function () {
  const h = `
<div id="ulaquery_id" class="menu_bar">
<ul>
<li class="v">
  <a href="#">Filter</a>
  <ul class="v">
    <li class="h">
      <a class="tipr" onclick="FLT.show()" href="#">Open
      <span class="tiptextr">Opoen Window FIlter</span></a>
    </li>
    <li class="h">
      <a class="tipr" onclick="FLT.hide()" ref="#">Close
      <span class="tiptextr">Close Windows Filetr</span> </a>
    </li>
    <li class="h">
      <a class="tipr" onclick="FLT.resetXY()" ref="#" >Relocate
      <span class="tiptextr">Relocate Window Filetr</span> </a>
    </li>
  </ul>
</li>
  
<li class="v">
  <a href="#">Dictionary</a>
  <ul class="v">
    <li class="h">
      <a class="tipr" onclick="DictForm.show()" href="#">Open
      <span class="tiptextr">Opoen Window Dictionary</span></a>
    </li>
    <li class="h">
      <a class="tipr" onclick="DictForm.hide()" href="#" >Close
      <span class="tiptextr">Close Window Dictionary</span> </a>
    </li>
    <li class="h">
      <a class="tipr" onclick="DictForm.resetXY()" href="#">Relocate
      <span class="tiptextr">Relocate Window Dictionary</span> </a>
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
  <a class="tipb" onclick="cmd_log_toggle()" href="#">Log
  <span class="tiptextb">Toggle Log</span></a>
</li>

<li class="v">
    <a onclick="cmd_close()" href="#" >close</a>
</li>

</ul>
</div>
`;
  return h.replace(/\s+|\[rn]/g, " ");
}

var UlaQuery = {
  id: "ulaquery_id",
  open: async function () {
    wait_start();
    await sleep(100);
    await this.open_menu();

    await dm_.load_dict();
    await DictForm.open();

    await FormLemma.open();
    await Sigl.open();
    await Funct.open();
    await PosMsd.open();
    
    UaLog.setXY(-3, 0).setZ(11).new();
    wait_stop();
  },
  open_menu: async function () {
    const html = menu();
    document.getElementById("ulaquery_id").innerHTML = html;
  }
}