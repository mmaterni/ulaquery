"use strict"

const top_filter = 40;

var VS = {

  forma: '',
  lemma: '',
  etimo: '',
  sigl: {
    sigls: [],
    locts: [],
    datets: []
  },
  funct: {
    functs: [],
    langs: [],
    dates: []
  },
  msd_attrs: [],
  select: function () {
    VS.forma = FormLemma.forma;
    VS.lemma = FormLemma.lemma;
    VS.etimo = FormLemma.etimo;

    VS.sigl.sigls = Sigl.sigls;
    VS.sigl.locts = Sigl.locts;
    VS.sigl.datets = Sigl.datets;

    VS.funct.functs = Funct.functs;
    VS.funct.langs = Funct.langs;
    VS.funct.dates = Funct.dates;

    VS.msd_attrs = PosMsd.msd_attrs;
  },
  unselect: function () {
    this.forma = '';
    this.lemma = '';
    this.etimo = '';

    this.sigl.sigls = [];
    this.sigl.locts = [];
    this.sigl.datets = [];

    this.funct.functs = [];
    this.funct.langs = [];
    this.funct.dates = [];

    this.msd_attrs = [];
  }
}

var FLT = {
  open: function () {
    FormLemma.open();
    Funct.open();
    Sigl.open();
    PosMsd.open();
    Where.open();
  },
  show: function () {
    FormLemma.show();
    Funct.show();
    Sigl.show();
    PosMsd.show();
    Where.show();
  },
  hide: function () {
    FormLemma.hide();
    Funct.hide();
    Sigl.hide();
    PosMsd.hide();
    Where.hide();
  },
  resetXY: function () {
    FormLemma.resetXY();
    Sigl.resetXY();
    Funct.resetXY();
    PosMsd.resetXY();
    Where.resetXY();
  },
  select: function () {
    FormLemma.select();
    Sigl.select();
    Funct.select();
    PosMsd.select();
    VS.select();
    Where.build();
    Where.show();
  },
  unselect: function () {
    FormLemma.unselect();
    Sigl.unselect();
    Funct.unselect();
    PosMsd.unselect();
    VS.unselect();
    Where.build();
    Where.show();
  },
  setWhere: function () {

    const log = function () {
      for (const r of d_M.where_values) {
        const vs = r[1].join(", ");
        console.log(r[0], vs);
      }
    };

    // console.log("setWheere");
    this.select();

    d_M.resetQueryConditions();

    d_M.addQueryCondition(0, [VS.forma]);
    d_M.addQueryCondition(1, [VS.lemma]);
    d_M.addQueryCondition(2, [VS.etimo]);

    // gestire le opzioni su colonna singola
    d_M.addQueryCondition(26, VS.sigl.sigls);
    d_M.addQueryCondition(27, VS.sigl.locts);
    d_M.addQueryCondition(28, VS.sigl.datets);

    d_M.addQueryCondition(7, VS.funct.functs);
    d_M.addQueryCondition(27, VS.funct.langs);
    d_M.addQueryCondition(28, VS.funct.dates);

    // d_M.addQueryCondition(28, VS.msd_attrs);

    // AAA trovare numero colonna da k
    for (let k in VS.msd_attrs) {
      const row = VS.msd_attrs[k];
      d_M.addQueryCondition(100, row);
      // console.log(k,row)
    }
    log();

  }
};

var Where = {
  id: 'Where_id',
  wind: null,
  isActive: false,
  build: function () {
    const jt = UaJth();
    jt.append(`
<div class="menu_wnd">
<ul>
<li></li>
<li><a onclick="Where.close()" href="#">X</a></li>  
</ul>
// </div>
`);
    jt.append('<div class="where"><ul>');

    const fh0 = (l, v) => `
    <li>
    <div class="l" >${l}</div>
    <div class="v"><div>${v}</div></div>
    </li>`;
    jt.append(fh0("Forma", VS.forma));
    jt.append(fh0("Lemma", VS.lemma));
    jt.append(fh0("Etimo", VS.etimo));

    const jr = UaJth();
    const rh = (arr) => {
      jr.reset();
      for (const x of arr)
        jr.append(`<div>${x}</div>`)
      return jr.html();
    };
    const fh = (l, v) => `
    <li>
    <div class="l" >${l}</div>
    <div class="v">${v}</div>
    </li>`;
    let h = rh(VS.sigl.sigls);
    jt.append(fh("Sigl", h));
    h = rh(VS.sigl.locts);
    jt.append(fh("Loc.", h));
    h = rh(VS.sigl.datets);
    jt.append(fh("Date", h));

    h = rh(VS.funct.functs);
    jt.append(fh("Funct", h));
    h = rh(VS.funct.langs);
    jt.append(fh("Loc.", h));
    h = rh(VS.funct.dates);
    jt.append(fh("Date", h));

    for (let k in VS.msd_attrs) {
      const row = VS.msd_attrs[k];
      const h = rh(row);
      jt.append(fh(k, h));
    }

    jt.append("</ul></div>")
    // console.log(jt.text());
    const html = jt.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.setHtml(html);
  },

  close: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
    this.isActive = false;
  },
  open: function () {
    if (!this.wind) return;
    this.wind.show();
    this.isActive = true;
  },
  show: function (url) {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 5;
    const top = top_filter + 420;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.open();
  }
};


var FormLemma = {
  id: 'form_lemma_id',
  wind: null,
  forma: '',
  lemma: '',
  etimo: '',
  isActive: false,
  build: async function () {
    const jt = UaJth();
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="FormLemma.unselect()" href="#">Unselect
       <span class="tiptextb">Reset Fields Selected</span>
     </a>
    </li>
    <li><a  onclick="FormLemma.close()" href="#">X</a></li>  
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
    this.bind();
  },
  close: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
    this.isActive = false;
  },
  open: function () {
    if (!this.wind) return;
    this.wind.show();
    this.isActive = true;
  },
  show: function (url) {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 4;
    const top = top_filter;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.open();
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll(`div.form_lemma input`);
    for (let a of attrs) {
      a.value = '';
    }
    FLT.select();
  },
  select: function () {
    let fle = this.wind.w.querySelector("div.form_lemma");
    this.forma = fle.querySelector('input[name="forma"]').value;
    this.lemma = fle.querySelector('input[name="lemma"]').value;
    this.etimo = fle.querySelector('input[name="etimo"]').value;
  },
  bind: function () {
    const attrs = this.wind.w.querySelectorAll("div.form_lemma input");

    const call = () => {
      FLT.select();
    };

    for (let a of attrs) {
      a.addEventListener("change", (ev) => {
        call();
      });
      // a.addEventListener("blur", (ev) => {
      a.addEventListener("mouseleave", (ev) => {
        call();
      });
    }

  }
};


var Sigl = {
  id: 'sigl_id',
  wind: null,
  sigls: [],
  locts: [],
  datets: [],
  isActive: false,
  load: async function (url) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        cache: "default"
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
  build: async function () {
    const jt = UaJth();
    const rows = await this.load(`static/cfg/exp_loc_dat.csv`);
    const sgs = [];
    const lcs = [];
    const dts = [];
    for (const row of rows) {
      sgs.push(row[0]);
      lcs.push(row[2]);
      dts.push(row[3]);
    }
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="Sigl.unselect()" href="#">Unselect
       <span class="tiptextb">Unselect Field Selected</span>
     </a>
    </li>
    <li><a onclick="Sigl.close()" href="#">X</a></li>  
    </ul>
    </div>
    <div class="sigl">`);
    jt.append("<div><ul>")
    jt.append(`<li class="s"><span>Sigl.</span></li> `);
    for (let row of sgs)
      jt.append(`<li class="s"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="l"><span>Loc.T.</span></li> `);
    for (let row of lcs)
      jt.append(`<li class="l"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="d"><span>Date T.</span></li> `);
    for (let row of dts)
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
  },

  close: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
    this.isActive = false;
  },
  open: function () {
    if (!this.wind) return;
    this.wind.show();
    this.isActive = true;
  },
  show: function (url) {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 5;
    const top = top_filter + 150;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.open();
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
        FLT.select();
      });
    }
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.sigl li a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
    FLT.select();
  },
  select: function () {
    const fn = (ats) => {
      const arr = Array.from(ats);
      const lst = arr.filter(a => a.classList.contains("select")).map(a => a.innerHTML);
      return lst;
    };
    // sigle settate
    let attrs = this.wind.w.querySelectorAll("div.sigl li.s a");
    this.sigls = fn(attrs);
    // localit+ testo settate 
    attrs = this.wind.w.querySelectorAll("div.sigl li.l a");
    this.locts = fn(attrs);
    // date testo settate
    attrs = this.wind.w.querySelectorAll("div.sigl li.d a");
    this.datets = fn(attrs);
  }
};


var Funct = {
  id: 'funct_id',
  wind: null,
  functs: [],
  langs: [],
  dates: [],
  isActive: false,
  load: async function (url) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        cache: "default"
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
  build: async function () {
    const jt = UaJth();
    const fs = await this.load(`static/cfg/funct.csv`);
    const ls = await this.load(`static/cfg/lang.csv`);
    const ds = await this.load(`static/cfg/ldata.csv`);
    jt.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="Funct.unselect()" href="#">Unselect
       <span class="tiptextb">Unselect Fields Selected</span>  </a>
    </li>
    <li><a onclick="Funct.close()"  href="#">X</a></li>  
    </ul>
    </div>
    <div class="funct">`);

    jt.append("<div><ul>")
    jt.append(`<li class="f"><span>Func</span></li> `);
    for (let row of fs)
      jt.append(`<li class="f"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="l"><span>Lang</span></li> `);
    for (let row of ls)
      jt.append(`<li class="l"><a>${row}</a></li> `);
    jt.append(`</ul></div>`);

    jt.append("<div><ul>")
    jt.append(`<li class="d"><span>Date</span></li> `);
    for (let row of ds)
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
  },
  close: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
    this.isActive = false;
  },
  open: function () {
    if (!this.wind) return;
    this.wind.show();
    this.isActive = true;
  },
  show: function (url) {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 300;;
    const top = top_filter;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.open();
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
        FLT.select();
      });
    }
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.funct li a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
    FLT.select();
  },
  select: function () {
    const fn = (ats) => {
      const arr = Array.from(ats);
      const lst = arr.filter(a => a.classList.contains("select")).map(a => a.innerHTML);
      return lst;
    };
    // fuct settate
    let attrs = this.wind.w.querySelectorAll("div.funct li.f a");
    this.functs = fn(attrs);
    // locali settate 
    attrs = this.wind.w.querySelectorAll("div.funct li.l a");
    this.langs = fn(attrs);
    // date  settate
    attrs = this.wind.w.querySelectorAll("div.funct li.d a");
    this.dates = fn(attrs);
  }
};

var PosMsd = {
  id: 'pos_msd_id',
  isActive: false,
  wind: null,
  msd_attrs: {},
  load: async function () {
    const url = `static/cfg/pos_msd.csv`;
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        cache: "default"
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
  build: async function () {
    const rows = await this.load();
    // elimina la riga di intestazione
    rows.shift()
    const jt1 = UaJth();
    const jt0 = UaJth();
    jt0.append(`
    <div class="menu_wnd">
    <ul>
    <li>
    <a class="tipb" onclick="PosMsd.unselect()" href="#">nselect
       <span class="tiptextb">Unselect Fields Selected</span>
     </a>
    </li>
    <li><a onclick="PosMsd.close()"  href="#">X</a></li>  
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
    }
    this.wind.setHtml(html);
    this.bind();
  },
  close: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
    this.isActive = false;
  },
  open: function () {
    if (!this.wind) return;
    this.wind.show();
    this.isActive = true;
  },
  show: function (url) {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.show();
  },
  hide: function () {
    if (!this.wind) return;
    if (this.isActive)
      this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 600;
    const top = top_filter;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.open();
  },
  bind: function () {
    const attrs = this.wind.w.querySelectorAll("div.pos_msd li.a a");
    for (let a of attrs) {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const t = ev.currentTarget;
        if (t.classList.contains("select"))
          t.classList.remove("select");
        else
          t.classList.add("select");
        FLT.select();
      });
    }
  },
  select: function () {
    const rows = [];
    const lims = Array.from(this.wind.w.querySelectorAll("div.pos_msd li.m"));
    let pos = '';
    for (const m of lims) {
      const pr = m.parentElement;
      const p = pr.querySelector("li.p span");
      if (!!p) pos = p.innerHTML;
      const msd = m.querySelector("span").innerHTML;
      const lias = Array.from(pr.querySelectorAll("li.a a.select"));
      const row = [];
      for (const la of lias) {
        const h = la.innerHTML;
        row.push(h)
      }
      if (row.length > 0) {
        const pm = `${pos.toLowerCase()}_${msd}`;
        rows.push([pm].concat(row));
      }
    }
    this.msd_attrs = {};
    for (let row of rows)
      this.msd_attrs[row[0]] = row.slice(1);
  },
  unselect: function () {
    const attrs = this.wind.w.querySelectorAll("div.pos_msd li.a a");
    for (let a of attrs) {
      a.classList.remove("select");
    }
    FLT.select();
  }
};
