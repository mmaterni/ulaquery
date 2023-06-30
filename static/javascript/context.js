"use strict"

var Context = {
    id: "context_id",
    wind: null,
    open: async function () {
        const rows = D_M.allRsltRows();
        Context.build(rows);
        Context.show();
    },
    build: async function (rows) {
        const sp = "         ";
        const menu = `
  <div class="menu_wnd" >
  <ul>
  <li>
  <a class="tipb" href="javascript:Context.scroll_top()">Top
  <span class="tiptextb">Scroll Top</span>
  </a>
  </li>
  
  <li>${sp}</li>
  <li><a href="javascript:Context.hide()">X</a></li>
  <li></li>
  </ul>
  </div>
  <div class="resultset">
  `;
        let jt = UaJth();
        jt.append(menu);

        // head
        const heads = D_M.rslt_heads;
        jt.append(`<table><thead><tr>`);
        let h = (d) => `<th><span>${d}</span></th>`;
        jt.append(h, "N.");
        for (const x of heads) jt.append(h, x.toUpperCase());
        jt.append(`</tr></thead><tbody>`);

        // rowa
        const lers = rows.length;
        const rh = (d) => `<td>${d}</td>`;
        for (let i = 0; i < lers; i++) {
            const row = rows[i];
            jt.append("<tr>")
            jt.append(rh, i);
            for (const f of row)
                jt.append(rh, f);
            jt.append("</tr>")
        }
        jt.append(`</tbody></table></div>`);

        const html = jt.html();
        if (!this.wind) {
            this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
            this.setXY();
            this.wind.drag();
            this.wind.setZ(result_set_z);
        }
        this.wind.hide();
        this.wind.setHtml(html);
        this.bind();
    },
    show: async function (url) {
        if (!this.wind) return;
        wait_start();
        await sleep(1);
        this.wind.show();
        wait_stop();
    },
    hide: function () {
        if (!this.wind) return;
        this.wind.hide(this.id);
        if (FLT.visible) {
            FLT.show();
        }
    },
    setXY: function () {
        this.wind.setXY(result_set_left, result_set_top, -1);
    },
    resetXY: function () {
        this.wind.reset();
        this.setXY();
        this.show();
    },
    scroll_top: function () {
        const x = this.wind.w;
        const e = x.querySelector("div.resultset");
        e.scrollTop = 0;
    },
    scroll_bottom: function () {
        const e = this.wind.w.querySelector("div.resultset");
        e.scrollTop = e.scrollHeight;
    },
    scroll_left: function () {
        const e = this.wind.w.querySelector("div.resultset");
        e.scrollLeft = 0;
    },
    scroll_right: function () {
        const e = this.wind.w.querySelector("div.resultset");
        e.scrollLeft = e.scrollWidth;
    },
    bind: function () {
        const a = this.wind.w.querySelector("div.resultset");
        a.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            // let t = ev.target;
            // while (t && t.tagName !== 'TR')
            //   t = t.parentNode;
            // const td = t.querySelectorAll("td")[2];
            // const formakey = td.innerHTML;
            // const idxs = D_M.findTokenIndices(formakey);
            // // console.log(idxs);
        });
    },

};


var SelectText = {
    id: "select_text_id",
    wind: null,
    text_list: [],
    open: async function () {
        this.build();
        this.show();
    },
    build: async function () {
        const menu = `
  <div class="menu_wnd" >
  <ul>
  <li>
  <a class="tipb" href="javascript:SelectText.unselect()">Unselect
  <span class="tiptextb">Unselect All Texts Selecteds</span>
  </a>
  </li>
  <li>
  <a class="tipb" href="javascript:SelectText.selectAll()">Select
  <span class="tiptextb">Select All Texts</span>
  </a>
  </li>
  <li><a href="javascript:SelectText.hide()">X</a></li>
  </ul>
  </div>
  <div class="select_text">
  `;
        const rows = Object.keys(D_M.token_list);
        let jt = UaJth();
        jt.append(menu);
        jt.append("<div><ul>")
        jt.append(`<li><span>Select Text</span></li> `);
        for (let row of rows)
            jt.append(`<li class="a"><a>${row}</a></li> `);
        jt.append(`</ul></div>`);
        const html = jt.html();
        if (!this.wind) {
            this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
            this.setXY();
            this.wind.drag();
            this.wind.setZ(11);
        }
        // this.wind.hide();
        this.wind.setHtml(html);
        this.bind();
        this.selectDefault();
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
        this.wind.setCenterY(50, -1);
    },
    resetXY: function () {
        this.wind.reset();
        this.setXY();
        this.show();
    },
    bind: function () {
        const a = this.wind.w.querySelector("div.select_text");
        a.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            let t = ev.target;
            if (t.classList.contains("select"))
                t.classList.remove("select");
            else
                t.classList.add("select");
            this.select();
        });
    },
    unselect: function () {
        const attrs = this.wind.w.querySelectorAll("div.select_text li a");
        for (let a of attrs)
            a.classList.remove("select");
        D_M.token_selected = [];
    },
    select: function () {
        let elems = this.wind.w.querySelectorAll("div.select_text li a");
        const arr = Array.from(elems);
        const lst = arr.filter(a => a.classList.contains("select")).map(a => a.innerHTML);
        D_M.token_selected = lst;
    },
    selectAll: function () {
        const attrs = this.wind.w.querySelectorAll("div.select_text li a");
        for (let a of attrs) {
            a.classList.remove("select");
            a.classList.add("select");
        }
        this.select();
    },
    selectDefault: function () {
        const elms = this.wind.w.querySelectorAll("div.select_text li a");
        const arr = Array.from(elms);
        const names = D_M.token_selected;
        const slcs = arr.filter(e => names.indexOf(e.innerHTML) > -1);
        for (let e of slcs) {
            e.classList.remove("select");
            e.classList.add("select");
        }
        this.select();
    }

};

