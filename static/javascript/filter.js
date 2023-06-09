const top_filter = 50;

var FormLemma = {
  id: 'form_lemma_id',
  wind: null,
  open: async function () {
    const jt = UaJth();
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="FormLemma.unselect()" href="#">Reset
       <span class="tiptextb">Reset All Field Selected</span>
     </a>
    </li>
    <li><a>Due</a></li>
    <li><a  onclick="FormLemma.hide()" href="#">Close</a></li>  
    </ul>
    </div>
    
<div class="form_lemma">
<ul>
<li>
  <div class="l">Forma</div>:
  <div  class="i"> <input type="text" value="" name="forma" size="6" > </div>
</li>
<li>
  <div class="l">Lemma</div>:
  <div class="i"> <input type="text" value="" name="lemma" size="6" > </div>
</li>
<li>
  <div class="l">Etimo</div>:
  <div class="i"> <input type="text" value="" name="etimo" size="6" > </div> 
</li>
</ul>
</div>
       `);
    const html = jt.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.setHtml(html);
    // this.show();
  },
  show: function (url) {
    if (!this.wind) return;
    this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 4;
    const top = top_filter;
    this.wind.setXY(left, top, -1).show();
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll(`div.form_lemma input`);
    for (let a of attrs) {
      a.value = '';
    }
  }
};


var Sigl = {
  id: 'sigl_id',
  wind: null,
  load: async function (url) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
      });
      if (!resp.ok) {
        throw new Error(`Erroe:${resp.status} ${resp.statusText}`);
      }
      const data = await resp.text();
      const rows = data.trim().split("\n");
      return rows.map((x) => x.trim().split("|"));
    } catch (error) {
      alert(`Errror:${url}\n ${error}`);
      throw error;
    }
  },
  open: async function () {
    const jt = UaJth();
    const rows = await this.load(`cfg/exp_loc_dat.csv`);
    // g|LOC.1|grenoble|XII
    // h|LOC.2|tour|XII
    // p|LOC.3|paris|XIII
    // v|LOC.4|venezia|XIV
    const sigls = [];
    const locts = [];
    const datets = [];
    for (row of rows) {
      sigls.push(row[0]);
      locts.push(row[2]);
      datets.push(row[3]);
    }
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="Sigl.unselect()" href="#">Reset
       <span class="tiptextb">Reset All Field Selected</span>
     </a>
    </li>
    <li><a>Due</a></li>
    <li><a onclick="Sigl.hide()"  href="#">Close</a></li>  
    </ul>
    </div>
    <div class="sigl">`);
    jt.append("<div><ul>")
    jt.append(`<li class="s"><span>Sigl.</span></li> `);
    for (let row of sigls)
      jt.append(`<li class="s"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="l"><span>Loc.T.</span></li> `);
    for (let row of locts)
      jt.append(`<li class="l"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="d"><span>Date T.</span></li> `);
    for (let row of datets)
      jt.append(`<li class="d"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("</div>")
    const html = jt.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.setHtml(html);
    this.bind();
    // this.show();
  },
  show: function (url) {
    if (!this.wind) return;
    this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
  },
  setXY: function () {
    let e = document.getElementById(FormLemma.id);
    const left = 5;
    const top = e.offsetTop + e.offsetHeight + 10;
    this.wind.setXY(left, top, -1).show();
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  bind: function () {
    const attrs = this.wind.w.querySelectorAll("div.sigl li a");
    for (let a of attrs) {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const t = ev.target;
        if (t.classList.contains("select"))
          t.classList.remove("select");
        else
          t.classList.add("select");
      });
    }
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.sigl li a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
  }
};


var Funct = {
  id: 'funct_id',
  wind: null,
  load: async function (url) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
      });
      if (!resp.ok) {
        throw new Error(`Erroe:${resp.status} ${resp.statusText}`);
      }
      const data = await resp.text();
      const rows = data.trim().split("\n");
      return rows.filter((x) => x != '-');
    } catch (error) {
      alert(`Errror:${url}\n ${error}`);
      throw error;
    }
  },
  open: async function () {
    const jt = UaJth();
    const funcs = await this.load(`cfg/funct.csv`);
    const langs = await this.load(`cfg/lang.csv`);
    const ldatas = await this.load(`cfg/ldata.csv`);
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="Funct.unselect()" href="#">Reset
       <span class="tiptextb">Reset All Field Selected</span>
     </a>
    </li>
    <li><a>Due</a></li>
    <li><a onclick="Funct.hide()"  href="#">Close</a></li>  
    </ul>
    </div>
    <div class="funct">`);

    jt.append("<div><ul>")
    jt.append(`<li class="f"><span>Func</span></li> `);
    for (let row of funcs)
      jt.append(`<li class="f"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="l"><span>Lang</span></li> `);
    for (let row of langs)
      jt.append(`<li class="l"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="d"><span>Date</span></li> `);
    for (let row of ldatas)
      jt.append(`<li class="d"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("</div>")
    const html = jt.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.setHtml(html);
    this.bind();
    // this.show();
  },
  show: function (url) {
    if (!this.wind) return;
    this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
  },
  setXY: function () {
    let e = document.getElementById(Sigl.id);
    const left = e.offsetWidth + 10;
    const top = top_filter;
    this.wind.setXY(left, top, -1).show();

  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  bind: function () {
    const attrs = this.wind.w.querySelectorAll("div.funct li a");
    for (let a of attrs) {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const t = ev.target;
        // const t = ev.currentTarget;
        if (t.classList.contains("select"))
          t.classList.remove("select");
        else
          t.classList.add("select");
      });
    }
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.funct li a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
  },
};

var PosMsd = {
  id: 'pos_msd_id',
  wind: null,
  load: async function () {
    const url = `cfg/pos_msd.csv`;
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
      });
      if (!resp.ok) {
        throw new Error(`Erroe:${resp.status} ${resp.statusText}`);
      }
      const data = await resp.text();
      const rows = data.trim().split("\n");
      return rows.map((x) => x.split("|"));
    } catch (error) {
      alert(`Errror:${url}\n ${error}`);
      throw error;
    }
  },
  open: async function () {
    const rows = await this.load();
    // elimina la riga di intestazione
    rows.shift()
    const jt1 = UaJth();
    const jt0 = UaJth();
    jt0.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" cmd="unselect" href="#">Reset
       <span class="tiptextb">Reset All Field Selected</span>
     </a>
    </li>

    <li><a>Due</a></li>

    <li><a cmd="hide"  href="#">Close</a></li>
    
    </ul>
    </div>
    <div class="pos_msd">
    <ul class="pos">`);
    let pos = 'XX';
    for (let row of rows) {
      if (row[3].trim() == '') continue;
      const attrs = row[3].split(',');
      const msd = row[2]
      jt1.reset();
      jt1.append(`<li><div><ul>`)
      if (row[0] != pos) {
        pos = row[0];
        jt1.append(`<li class="p"><span>${pos}</span></li>`);
      }
      else
        jt1.append(`<li class="e"></li>`);
      jt1.append(`<li class="m"><span>${msd}</span></li>`);
      for (let x of attrs)
        jt1.append(`<li class="a"><a>${x}</a></li>`);
      jt1.append(`</ul></div></li>`)
      const h = jt1.html()
      jt0.append(`${h}`);
    }
    jt0.append("</ul></div>")
    const html = jt0.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
      // this.wind.setStyle({ cursor: 'move' });
    }
    this.wind.setHtml(html);
    this.bind_menu();
    this.bind_pos_msd();
    // this.show();
  },
  show: function (url) {
    if (!this.wind) return;
    this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
  },
  setXY: function () {
    let e = document.getElementById(Funct.id);
    const left = e.offsetLeft + e.offsetWidth + 10;
    const top = top_filter;
    // const left = 200;
    // const top = 50;
    this.wind.setXY(left, top, -1).show();
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.pos_msd li.a a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
  },
  bind_menu: function () {
    const call = (ev) => {
      const t = ev.target;
      if (t.tagName.toUpperCase() == 'A') {
        const cmd = t.getAttribute("cmd");
        if (!!cmd) this[cmd]();
      }
    };
    menu = this.wind.w.querySelector("div.menu_wnd");
    menu.addEventListener("click", call);
  },
  bind_pos_msd: function () {
    const attrs = this.wind.w.querySelectorAll("div.pos_msd li.a a");
    for (let a of attrs) {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        // const t = ev.target;
        const t = ev.currentTarget;
        if (t.classList.contains("select"))
          t.classList.remove("select");
        else
          t.classList.add("select");
      });
    }
  }
};
