"use strict"

function test() {
  alert("test");
  try {
    console.log(XX);
    alert(XX);
  }
  catch (errore) {
    alert(errore);
  }
}

function cmd_close() {
  if (confirm("Chiudi Applicazione ?")) window.close();
};

function cmd_log_toggle() {
  UaLog.toggle();
};

function cmd_log(...args) {
  UaLog.log(...args);
};

function cmd_log_show(...args) {
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

<li class="v"><a href="#">Filter</a>
<ul class="v">

<li class="h">
<a class="tipr" onclick="FLT.resetXY()" href="#">Open
<span class="tiptextr">Opoen Window FIlter</span></a>
</li>
<li class="h">
<a class="tipr" onclick="FLT.hide()" ref="#">Hide
<span class="tiptextr">Close Windows Filetr</span> </a>
</li>
<li class="h">
<a class="tipr" onclick="FLT.show()" href="#">Show
<span class="tiptextr">Opoen Window Filter Active</span></a>
</li>

</ul>
</li>
  
<li class="v">
<a class="tipb" onclick="FLT.unselect()" ref="#" >Unselect
<span class="tiptextb">Unselect All Fileds</span> </a>
</li>

<li class="v">
<a class="tipb" onclick="FLT.queryRslt()" ref="#" >Query
<span class="tiptextb">Open Query ResultSet</span> </a>
</li>

<li class="v">
<a href="#">Dictionary</a>
<ul class="v">

<li class="h"><a class="tipr" onclick="DictForm.open()" href="#">Open
<span class="tiptextr">Opoen All Dictionary</span></a></li>

<li class="h"><a class="tipr" onclick="FLT.queryDict()" ref="#" >Select
<span class="tiptextr">Open Selected Dictionary</span> </a></li>

<li class="h"><a class="tipr" onclick="DictForm.hide()" href="#" >Hide
<span class="tiptextr">Close Window Dictionary</span> </a></li>

<li class="h"><a class="tipr" onclick="DictForm.resetXY()" href="#">Relocate
<span class="tiptextr">Relocate Window Dictionary</span> </a></li>

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

<li class="v"><a class="cmd" cmd="help" href="#">Help</a></li>

<li class="v"><a class="tipb" onclick="cmd_log_toggle()" href="#">Log
<span class="tiptextb">Toggle Log</span></a></li>

<li class="v"><a onclick="test()" href="#" >?</a></li>
<li class="v"><a onclick="cmd_close()" href="#" >close</a></li>

</ul>
</div>
`;
  return h.replace(/\s+|\[rn]/g, " ");
}
let TEXT_ID = null;
let QUERY_ID = null;

var UlaQuery = {
  id: "ulaquery_id",
  open: async function () {
    wait_start();
    
    QUERY_ID = document.getElementById("ulaquery_id");
    TEXT_ID = document.getElementById("text_id");
    TEXT_ID.style.display = 'none';

    await sleep(100);
    await D_M.load_dict();
    await this.builD_Menu();
    // await DictForm.build_all();
    await FormLemma.build();
    await Sigl.build();
    await Funct.build();
    await LangDate.build();
    await PosMsd.build();
    Where.build();
    UaLog.setXY(-3, 0).setZ(999).new();

    // AAA
    // FLT.open();

    wait_stop();
  },
  builD_Menu: async function () {
    const html = menu();
    document.getElementById("ulaquery_id").innerHTML = html;
  }
}