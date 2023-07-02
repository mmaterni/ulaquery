"use strict"


var TextMgr = {
    token_list: {},
    token_selected: [],
    load: async function () {
        const token_paths = await D_M.load_text_list();
        for (const file_path of token_paths) {
            const arr = await D_M.load_token_csv(file_path);
            // eps19.g.ula.csv => eps0_g elimina il punto nel nome file
            const token_name = file_path.split('.').slice(0, 2).join('_');
            this.token_list[token_name] = arr;
        }
    }
}


var ContextMgr = {
    names: [],
    objs: {},
    open: function (formakey) {
        let slcs = TextMgr.token_selected;
        if (slcs.length == 0) {
            SelectText.open();
        }
        let left = 0;
        const names = Object.keys(this.objs);
        for (const name of slcs) {
            if (names.indexOf(name) < 0) {
                this.names.push(name);
                const obj = this.create(name, left);
                this.objs[name] = obj;
            }
            left += 300;
            const obj = this.objs[name];
            obj.open(formakey);
        }
    },
    closeAll: function () {
        const objs = Object.values(this.objs);
        for (const obj of objs)
            obj.hide();
    },
    relocateAll: function () {
        let names = TextMgr.token_selected;
        for (const name of names)
            this.objs[name].resetXY();
    },
    create: function (name, left) {
        const context_z = 12;

        const obj = {
            id: `${name}context_id`,
            name: name,
            wind: null,
            context_rowsrows: [],
            open: function (formakey) {
                this.context_rows = D_M.findContextRows(formakey, this.name);
                this.build(formakey);
                this.show();
            },
            build: function (formakey) {
                const menu = `
  <div class="menu_wnd" >
  <ul>
  <li><a class="tipb" cmd="unselect" href="#">Unselect
  <span class="tiptextb">Close and Unselect Context</span> </a>
  </li> 

  <li><a class="tipb" cmd="relocateAll" href="#">Relocate
  <span class="tiptextb">Relocate All Context</span>  </a>
  </li> 

  <li><a class="tipb" cmd="closeAll" href="#">Close
  <span class="tiptextb">Close All Context</span>  </a>
  </li> 

  <li><a href="#" cmd="close">X</a></li> </ul>
  </div>
  <div class="context">
  `;
                let jt = UaJth();
                jt.append(menu);
                jt.append(`<div class='h'>${name}</div> `);
                let fh = (row_n, row_text) => `
<div class='rows'>
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
                //AAA this.wind.hide(this.id);
                this.wind.hide(this.id);
            },
            setXY: function () {
                this.wind.setXY(30 + left, 70, -1);
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
                        case "unselect":
                            SelectText.unselectOfName(this.name);
                            break;
                        case "relocateAll":
                            ContextMgr.relocateAll();
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
    z: 20,
    open: async function () {
        this.build();
        // this.show();
        this.wind.toggle();
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
        const tojen_names = Object.keys(TextMgr.token_list);
        let jt = UaJth();
        jt.append(menu);
        jt.append("<div><ul>")
        jt.append(`<li class="h"><span>Select Text</span></li> `);
        for (let row of tojen_names)
            jt.append(`<li class="a"><a>${row}</a></li> `);
        jt.append(`</ul></div>`);
        const html = jt.html();
        if (!this.wind) {
            this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
            this.setXY();
            this.wind.drag();
            this.wind.setZ(this.z);
        }
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
        // AAA this.wind.hide(this.id);
        this.wind.hide();
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
    unselectOfName: function (name) {
        const i = TextMgr.token_selected.indexOf(name);
        TextMgr.token_selected.splice(i, 1);
        const obj = ContextMgr.objs[name];
        obj.hide();
        this.selectDefault();
        this.open();
    },
    unselect: function () {
        const attrs = this.wind.w.querySelectorAll("div.select_text li a");
        for (let a of attrs)
            a.classList.remove("select");
        TextMgr.token_selected = [];
        ContextMgr.closeAll();
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
        for (const e of arr)
            e.classList.remove("select");
        const names = TextMgr.token_selected;
        const slcs = arr.filter(e => names.indexOf(e.innerHTML) > -1);
        for (let e of slcs)
            e.classList.add("select");
        this.select();
    }

};

