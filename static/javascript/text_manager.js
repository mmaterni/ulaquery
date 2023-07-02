"use strict"


var TextMgr = {
    text_list: [],
    token_list: {},
    token_selected: [],
    load: async function () {
        this.text_list = await D_M.load_text_list();
        for (const file_name of this.text_list) {
            const arr = await D_M.load_token_csv(file_name);
            // eps19.g.ula.csv => eps0.g
            const key = file_name.split('.').slice(0, 2).join('.')
            this.token_list[key] = arr;
        }
    }
}


var ContextMgr = {
    names: [],
    objs: {},
    left: 0,
    open: function (formakey) {

        let slcs = TextMgr.token_selected;
        if (slcs.length == 0) {
            SelectText.open();
        }
        this.left = 0;
        for (const s of slcs) {
            const name = s.replace('.', '_');
            this.names.push(name);
            const obj = this.create(name, this.left);
            this.left += 300;
            this.objs[name] = obj;
            obj.open(formakey);
        }
    },
    closeAll: function () {
        const vs = Object.values(this.objs);
        for (const obj of vs)
            obj.hide();
    },
    create: function (key, left = 0) {
        const context_z = 12;
        const obj = {
            id: `${key}context_id`,
            wind: null,
            context_rowsrows: [],
            open: function (formakey) {
                const token_name = "tr1.g";
                this.context_rows = D_M.findContextRows(formakey, token_name);
                this.build(formakey);
                this.show();
            },
            build: function (formakey) {
                const menu = `
  <div class="menu_wnd" >
  <ul>
  <li>
  <a class="tipb" cmd="closeAll" href="#">Close All
  <span class="tiptextb">AA</span>
  </a>
  </li> 
  <li><a href="#" cmd="close">X</a></li>
  </ul>
  </div>
  <div class="context">
  `;
                let jt = UaJth();
                jt.append(menu);
                let fh = (row_n, row_text) => `
        <div>
            <span class='n' >${row_n}</span>
            <span class='text'>${row_text}</span>
       </div>
        `;
                const lers = this.context_rows.length;
                for (let i = 0; i < lers; i++) {
                    let row = this.context_rows[i];
                    const n = row[0];
                    let text = row.slice(1).join(" ");
                    text = text.replace(formakey, `<span>${formakey}</span>`)
                    jt.append(fh, n, text);
                }
                jt.append(`</tbody></table></div>`);
                const html = jt.html();
                if (!this.wind) {
                    this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
                    this.setXY();
                    this.wind.drag();
                    this.wind.setZ(context_z);
                }
                this.wind.hide();
                this.wind.setHtml(html);
                this.bind();
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
                this.wind.setXY(30 + left, 79, -1);
            },
            resetXY: function () {
                this.wind.reset();
                this.setXY();
                this.show();
            },
            bind: function () {
                const m = this.wind.w.querySelector("div.menu_wnd");
                m.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    const t = ev.target;
                    const cmd = t.getAttribute("cmd");
                    switch (cmd) {
                        case "close":
                            this.hide();
                            break;
                        case "closeAll":
                            ContextMgr.closeAll();
                            break;
                        default:
                        // alert(cmd + ": command not found")
                    }
                });
                const a = this.wind.w.querySelector("div.context");
                a.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    // let t = ev.target;
                    // while (t && t.tagName !== 'TR')
                    //   t = t.parentNode;
                });
            },
        }
        return obj;
    }
}

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
        const rows = Object.keys(TextMgr.token_list);
        let jt = UaJth();
        jt.append(menu);
        jt.append("<div><ul>")
        jt.append(`<li class="h"><span>Select Text</span></li> `);
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
        TxtMgr.token_selected = [];
    },
    select: function () {
        let elems = this.wind.w.querySelectorAll("div.select_text li a");
        const arr = Array.from(elems);
        const lst = arr.filter(a => a.classList.contains("select")).map(a => a.innerHTML);
        TextMgr.token_selected = lst;
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
        const names = TextMgr.token_selected;
        const slcs = arr.filter(e => names.indexOf(e.innerHTML) > -1);
        for (let e of slcs) {
            e.classList.remove("select");
            e.classList.add("select");
        }
        this.select();
    }

};

