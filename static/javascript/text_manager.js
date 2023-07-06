"use strict"

var TextMgr = {
    names: [],
    objs: {},
    createObjs: async function () {
        const names = Object.keys(D_M.token_list);
        let left = 0;
        for (const name of names) {
            const obj = this.new(name, left, 30);
            this.objs[name] = obj;
            this.names.push(name);
            left += 300;
        }
    },
    open: function (name) {
        alert('opern');
        const obj = this.objs[name];
        obj.open();
    },
    openSelected: function () {
        const names = Object.keys(D_M.token_list);
        let slcs = D_M.token_selected;
        if (slcs.length == 0) {
            SelectText.open();
        }
        for (const name of names) {
            const obj = this.objs[name];
            if (slcs.indexOf(name) > -1)
                obj.open();
            else
                obj.hide()
        }
    },
    closeAll: function () {
        const objs = Object.values(this.objs);
        for (const obj of objs)
            obj.hide();
    },
    relocateAll: function () {
        let names = D_M.token_selected;
        for (const name of names)
            this.objs[name].resetXY();
    },
    // ///////////////////////////
    new: function (name, left, top) {
        return {
            id: `${name}text_id`,
            name: name,
            wind: null,
            text_rows: [],
            z: 12,
            open: function () {
                this.text_rows = D_M.token_list[this.name];
                this.build();
                this.show();
            },
            build: function () {
                const menu = `
<div class="menu_wnd" >
<ul>

<li><a class="tipb arrow" cmd="top" href="#" >&#9650;
<span class="tiptextb">Scroll Top</span></a>
</li>

<li><a class="tipb arrow" cmd="bottom" href="#" >&#9660;
<span class="tiptextb">Scroll Bottom</span></a>
</li>

<li><a class="tipb" cmd="unselect" href="#">Unselect
<span class="tiptextb">Close and Unselect Text</span> </a>
</li> 

<li><a href="#" cmd="close">X</a></li> </ul>
</div>
<div class="text">
  `;
                let jt = UaJth();
                jt.append(menu);
                jt.append(`<div class='h'>${name}</div> `);
                let fh = (row_n, row_text) => `
<div class='row'>
   <span class='n' >${row_n}</span>
   <span class='text'>${row_text}</span>
</div>
`;
                const lers = this.text_rows.length;
                for (let i = 0; i < lers; i++) {
                    let row = this.text_rows[i];
                    const n = i;
                    let text = row.join(" ");
                    jt.append(fh, n, text);
                }
                jt.append(`</tbody></table></div>`);
                const html = jt.html();
                if (!this.wind) {
                    this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
                    this.setXY();
                    this.wind.addGroup("text");
                    this.wind.drag();
                    this.wind.setZ(this.z);
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
                this.wind.hide();
            },
            setXY: function () {
                this.wind.setXY(10 + left, 30 + top, -1);
            },
            resetXY: function () {
                this.wind.reset();
                this.setXY();
                this.show();
            },
            scroll_top: function () {
                const e = this.wind.w.querySelector("div.text");
                e.scrollTop = 0;
            },
            scroll_bottom: function () {
                const e = this.wind.w.querySelector("div.text");
                e.scrollTop = e.scrollHeight;
            },
            unselect: function () {
                const i = D_M.token_selected.indexOf(name);
                D_M.token_selected.splice(i, 1);
                this.hide();
                SelectText.reset();
                SelectText.update();
            },
            hover: function () {
                const winds = UaWindowAdm.getForGroup("text");
                for (const wind of winds)
                    wind.w.classList.remove("z-index-hover");
                this.wind.w.classList.toggle("z-index-hover");
            },
            getRowsOfFormakey: function (formakeys) {
                const rows = [];
                for (const fk of formakeys) {
                    const idx = D_M.findIndnxFormakey(fk);
                    let r = [];
                    if (idx > -1) {
                        r = D_M.dict_rsl_rows[idx];
                    } else {
                        xlog(fk);
                    }
                    rows.push(r);
                }
                FormRows.open(rows);
            },
            bind: function () {
                // pone la window sopra a tutte le altre
                this.wind.w.addEventListener("dblclick", (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    this.hover();
                });
                // prende fli indici delle righei dict/resultet 
                // corrispondenti alle formakesy  della riga di testo
                const pr = this.wind.w.querySelector("div.text");
                pr.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    const tg = ev.target;
                    const pr = tg.parentNode;
                    const e = pr.querySelector("span.text");
                    const text = e.innerHTML;
                    const formakeys = text.split(" ");
                    this.getRowsOfFormakey(formakeys);

                    const slcs = this.wind.w.querySelectorAll("div.text div.select");
                    for (const e of slcs)
                        e.classList.remove('select');
                    pr.classList.add("select");

                });
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
                        case "top":
                            this.scroll_top();
                            break;
                        case "bottom":
                            this.scroll_bottom();
                            break;
                        case "unselect":
                            this.unselect();
                            break;
                        default:
                        // alert(cmd + ": command not found")
                    }
                });
            }
        }
    }
}

var ContextMgr = {
    names: [],
    objs: {},
    open: function (formakey) {
        let slcs = D_M.token_selected;
        if (slcs.length == 0) {
            SelectText.open();
        }
        let left = 0;
        let top = 0;
        const names = Object.keys(this.objs);
        for (const name of slcs) {
            if (names.indexOf(name) < 0) {
                this.names.push(name);
                const obj = this.create(name, left, top);
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
        let names = D_M.token_selected;
        for (const name of names)
            this.objs[name].resetXY();
    },
    // //////////////////////////
    create: function (name, left, top) {
        const context_z = 12;

        const obj = {
            id: `${name}context_id`,
            name: name,
            wind: null,
            context_rows: [],
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
                    this.wind.addGroup("context");
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
                this.wind.hide();
            },
            setXY: function () {
                this.wind.setXY(30 + left, 50 + top, -1);
            },
            resetXY: function () {
                this.wind.reset();
                this.setXY();
                this.show();
            },
            unselect: function () {
                const i = D_M.token_selected.indexOf(name);
                D_M.token_selected.splice(i, 1);
                this.hide();
                SelectText.reset();
                SelectText.update();
            },
            hover: function () {
                const names = D_M.token_selected;
                for (const name of names) {
                    if (name == this.name) continue;
                    const obj = ContextMgr.objs[name];
                    obj.wind.w.classList.remove("z-index-hover");
                }
                this.wind.w.classList.toggle("z-index-hover");
            },
            bind: function () {
                const t = this.wind.w.querySelector("div.context");
                t.addEventListener("dblclick", (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                    this.hover();
                });
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
                        case "unselect":
                            this.unselect();
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
        this.show();
    },
    toggle: async function () {
        this.build();
        this.wind.toggle();
    },
    build: async function () {
        const menu = `
  <div class="menu_wnd" >
  <ul>
  <li>
  <a class="tipb" href="javascript:SelectText.selectAll()">Select
  <span class="tiptextb">Select All Texts</span> </a>
  </li>
  <li>
  <a class="tipb" href="javascript:SelectText.unselect()">Unselect
  <span class="tiptextb">Unselect All Texts Selecteds</span>  </a>
  </li>
  <li><a href="javascript:SelectText.hide()">X</a></li>
  </ul>
  </div>
  <div class="select_text">
  `;
        const token_names = Object.keys(D_M.token_list);
        let jt = UaJth();
        jt.append(menu);
        jt.append("<div><ul>")
        jt.append(`<li class="h"><span>Select Text</span></li> `);
        for (let row of token_names)
            jt.append(`<li class="a"><a>${row}</a></li> `);
        jt.append(`</ul></div>`);
        const html = jt.html();
        if (!this.wind) {
            this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
            this.setXY();
            this.wind.addGroup("select_text");
            this.wind.addGroup("text");
            this.wind.drag();
            this.wind.setZ(this.z);
        }
        this.wind.setHtml(html);
        this.bind();
        this.reset();
    },
    show: function (url) {
        if (!this.wind) return;
        this.wind.show();
    },
    hide: function () {
        if (!this.wind) return;
        this.wind.hide();
    },
    update: function () {
        if (!this.wind) return;
        if (this.wind.isVisible)
            this.wind.show();
    },
    setXY: function () {
        this.wind.setXY(280, 30, -1);
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
        const i = D_M.token_selected.indexOf(name);
        D_M.token_selected.splice(i, 1);
        const obj = ContextMgr.objs[name];
        obj.hide();
        this.reset();
        this.open();
    },
    unselect: function () {
        const attrs = this.wind.w.querySelectorAll("div.select_text li a");
        for (let a of attrs)
            a.classList.remove("select");
        D_M.token_selected = [];
        ContextMgr.closeAll();
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
    reset: function () {
        const elms = this.wind.w.querySelectorAll("div.select_text li a");
        const arr = Array.from(elms);
        for (const e of arr)
            e.classList.remove("select");
        const names = D_M.token_selected;
        const slcs = arr.filter(e => names.indexOf(e.innerHTML) > -1);
        for (let e of slcs)
            e.classList.add("select");
        this.select();
    }
};

