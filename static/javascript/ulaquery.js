"use strict"

/*
<span class="arrow-up">&#8593;</span>
<span class="arrow-down">&#8595;</span>
<span class="arrow-right">&#8594;</span>
<span class="arrow-left">&#8592;</span>

triangle-up      
&#9650;

triangle-down    
&#9660;

triangle-right    
&#9654;

triangle-left     
&#9664;


*/


var xlog = console.log;

function test() {
  // alert("test");
  xlog("test")
  try {
    const ws = UaWindowAdm.getForGoup("text");
    for (const wnd of ws) {
      const id = wnd.getId()
      xlog(id);
      xlog(wnd.groups);
    }
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
<a class="tipr" onclick="FLT.show()" href="#">Show
<span class="tiptextr">Opoen Window Filter Active</span></a>
</li>
<li class="h">
<a class="tipr" onclick="FLT.hide()" ref="#">Hide
<span class="tiptextr">Close Windows Filetr</span> </a>
</li>
<li class="h">
<a class="tipr" onclick="FLT.unselect()" href="#">UnSelect
<span class="tiptextr">UnSelect All Slect Options Active</span></a>
</li>
</ul>
</li>
  
<li class="v">
<a class="tipb" onclick="Where.testQuery()" ref="#" >Test Query
<span class="tiptextb">Display Number of Results</span> </a>
</li>

<li class="v">
<a class="tipb" onclick="SelectText.toggle()" ref="#" >Slect Text
<span class="tiptextb">Slect Text For SHow in Context</span> </a>
</li>

<li class="v">
<a href="#">Context</a>
<ul class="v">
<li class="h""><a class="tipr" onclick="ContextMgr.relocateAll() href="#" >Relocate
<span class="tiptextr">Relocat and Open All Context Selected</span></a>
</li>
<li class="h""><a class="tipr" onclick="ContextMgr.closeAll()" href="#" >Close All
<span class="tiptextr">Close All Context</span></a>
</li>
</ul>
</li>

<li class="v">
<a href="#">ReusltSet</a>
<ul class="v">
<li class="h"><a class="tipr" onclick="FLT.queryRslt()" href="#" >Slection
<span class="tiptextr">Show Selected ResultSet</span> </a>
</li>
<li class="h"><a class="tipr" onclick="ResultSet.open()" href="#">All
<span class="tiptextr">Show All ResultSet</span></a>
</li>
</ul>
</li>

<li class="v">
<a href="#">Dictionary</a>
<ul class="v">
<li class="h"><a class="tipr" onclick="FLT.queryDict()" href="#">Slection
<span class="tiptextr">Show Selected Dictionary</span></a>
</li>
<li class="h"><a class="tipr" onclick="DictForm.open()" href="#">All 
<span class="tiptextr">Show All Dictionary</span></a>
</li>
</ul>
</li>
<li class="v">

<a href="#">Text</a>
<ul class="v">
<li class="h""><a class="tipr" href="javascript:TextMgr.openSelected()">Open
<span class="tiptextr">Open All Text Selected</span></a>
</li>
<li class="h""><a class="tipr" href="javascript:TextMgr.relocateAll()">Relocate
<span class="tiptextr">Relocat and Open All Text Selected</span></a>
</li>
<li class="h""><a class="tipr" href="javascript:TextMgr.closeAll()">Close 
<span class="tiptextr">Close All Text</span></a>
</li>
</ul>
</li>

<li class="v"><a class="cmd" cmd="help" href="#">Help</a></li>
<li class="v"><a onclick="test()" href="#" >Test</a></li>
<li class="v"><a onclick="cmd_close()" href="#" >close</a></li>

</ul>
</div>
`;
  return h.replace(/\s+|\[rn]/g, " ");
}
let QUERY_ID = null;

var UlaQuery = {
  id: "ulaquery_id",
  open: async function () {
    wait_start();

    QUERY_ID = document.getElementById("ulaquery_id");
    await sleep(100);
    await D_M.load_dict();
    await D_M.load_tokens();
    await this.builD_Menu();
    await FormLemma.build();
    await Sigl.build();
    await Funct.build();
    await LangDate.build();
    await PosMsd.build();
    Where.build();
    // UaLog.setXY(-3, 0).setZ(999).new();

    // FLT.open();

    wait_stop();

  },
  builD_Menu: async function () {
    const html = menu();
    document.getElementById("ulaquery_id").innerHTML = html;
  }
}