

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
    this.show();
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
    const top = 50;
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
    this.show();
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
    const or = e.offsetWidth;
    const ot = e.offsetTop;
    const left = or + 10;
    const top = ot;;
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
