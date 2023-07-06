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
    const ws = UaWindowAdm.getForGroup("text");
    for (const wnd of ws) {
      wnd.hide();
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
<div class="menu_bar">
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

<li class="v"><a cmd="help" href="#" >Help</a></li>
<li class="v"><a cmd="test" href="#" >Test</a></li>
<li class="v"><a cmd"close" href="#" >close</a></li>

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
    this.build();
    this.bind();
    await D_M.load_dict();
    await D_M.load_tokens();
    await FormLemma.build();
    await Sigl.build();
    await Funct.build();
    await LangDate.build();
    await PosMsd.build();
    await TextMgr.createObjs();
    Where.build();
    // FLT.open();
    wait_stop();
  },
  build: function () {
    const html = menu();
    QUERY_ID.innerHTML = html;
  },
  bind: function () {
    const m = QUERY_ID.querySelector("div.menu_bar");
    m.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      const t = ev.target;
      const cmd = t.getAttribute("cmd");
      switch (cmd) {
        case "close":
          this.hide();
          break;
        case "help":
          this.help();
          break;
        case "test":
          test();
          break;
        default:
        // alert(cmd + ": command not found")
      }
    });
  },
  help: async function () {
    await Help.toggle("help1.html");
  }
}


var Help = {
  id: "help_id_",
  top: 70,
  left: 50,
  toggle: async function (url) {
    let w = UaWindowAdm.get(this.id);
    if (!w) {
      w = UaWindowAdm.create(this.id);
    }
    this.wnd = w;
    const resp = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      cache: 'default'
    });
    if (!resp.ok) {
      alert("ERROR Help()" + resp.status);
      return;
    }
    let text = await resp.text();
    let html = `
    <div class="help">
    <div class="top_bar">
    <a href="javascript:Help.close();">X</a>
    </div>
    <div class="text" >${text}</div>
    </div>
     `;
    w.setHtml(html);
    // w.addClassStyle("help");
    w.setXY(this.left, this.top).drag();
    w.toggle();
  },
  close: function () {
    this.wnd.close();
  }
};
