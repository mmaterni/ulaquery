/* jshint esversion: 11 */
"use strict"
var DictForm = {
  id: "dict_form.id",
  tr_selected: null,
  wind: null,
  open: async function () {
    const menu = `
<div class="menu_wnd" >
<ul>
<li>
<a class="tipb" href="javascript:DictForm.scroll_top()">Top
<span class="tiptextb">Scroll Top</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:DictForm.scroll_bottom()">Bottom
<span class="tiptextb">Scroll Bottom</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:DictForm.scroll_left()">Left
<span class="tiptextb">Scroll Left</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:DictForm.scroll_right()">Right
<span class="tiptextb">Scroll Right</span>
</a>
</li>
<li>
<a class="cmd" href="#">Help
</a>
</li>
<li><a  href="javascript:DictForm.hide()">Close</a></li>
<li></li>
</ul>
</div>
<div class="dict_form">
`;
    let jt = UaJth();
    jt.append(menu);

    const forms_len = 8;
    const heads = dm_.dict_rows[0];
    const head_form = heads.slice(0, forms_len);
    const head_msd = heads.slice(forms_len);
    // elimina la prima riga
    dm_.dict_rows.shift();
    // head
    jt.append(`<table class='dict'><thead><tr>`);
    let h = (d) => `<th><span>${d}</span></th>`;
    jt.append(h, "N.");
    for (const x of head_form) jt.append(h, x.toUpperCase());
    for (const x of head_msd) jt.append(h, x.toUpperCase())
    jt.append(`</tr></thead><tbody>`);
    // rowa
    const le = dm_.dict_rows.length;
    const r0 = (d) => `<td>${d}</td>`;
    const r1 = (d) => `<td class="m">${d}</td>`;
    const ler = dm_.dict_rows[0].length;
    for (let i = 0; i < le; i++) {
      const row = dm_.dict_rows[i];
      jt.append("<tr>")
      jt.append(r0, i);
      for (let i = 0; i < forms_len; i++) jt.append(r0, row[i])
      for (let i = forms_len; i < ler; i++) jt.append(r1, row[i])
      jt.append("</tr>")
    }
    jt.append(`</tbody></table></div>`);

    const html = jt.html();
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.hide();
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
    const left = 5;
    const top = 50;
    this.wind.setXY(left, top, -1).show();
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  scroll_top: function () {
    // const e = document.getElementById("dict_table_id");
    const x = this.wind.w;
    const e = x.querySelector("div.dict_form");
    e.scrollTop = 0;
  },
  scroll_bottom: function () {
    const e = this.wind.w.querySelector("div.dict_form");
    e.scrollTop = e.scrollHeight;
  },
  scroll_left: function () {
    const e = this.wind.w.querySelector("div.dict_form");
    e.scrollLeft = 0;
  },
  scroll_right: function () {
    const e = this.wind.w.querySelector("div.dict_form");
    e.scrollLeft = e.scrollWidth;
    // const l= e.scrollLeft;
    // const r= e.scrollWidth;
    // console.log(l,r);
    // e.scrollLeft = 2200;
  },
  array2html: async function () {
    // const form_cols = ["n", "FORMA", "KEY", "LEMMA", "ETIMO", "LANG", "DATE", "POS", "FUNCT"];
    // const msd_cols = ["GENDER", "NUMBER", "CASE", "DEGREE", "DETERTYPE", "MWES", "PRONTYPE", "PERSON", "VERBFORM", "MOOD", "TENSE", "VOICE", "PROPERTY", "ADPTYPE", "ADVTYPE", "ADVTYPE2", "NUMTYPE", "PARTTYPE"];
    // const sigl_cols = ["G", "P", "V"];
    // const loc_cols = ["LOC.1", "LOC.2", "LOC.3", "LOC.4"];
    // const date_cols = ["DATE.0", "DATE.1", "DATE.2"];
    // await dm_.load_dict();
    const forms_len = 8;
    const heads = dm_.dict_rows[0];
    const head_form = heads.slice(0, forms_len);
    const head_msd = heads.slice(forms_len);
    // elimina la prima riga
    dm_.dict_rows.shift();
    // head
    let jt = UaJth();
    jt.append(`<table class='dict'><thead><tr>`);
    let h = (d) => `<th><span>${d}</span></th>`;
    jt.append(h, "N.");
    for (const x of head_form) jt.append(h, x.toUpperCase());
    for (const x of head_msd) jt.append(h, x.toUpperCase())
    jt.append(`</tr></thead><tbody>`);
    // rowa
    const le = dm_.dict_rows.length;
    const r0 = (d) => `<td>${d}</td>`;
    const r1 = (d) => `<td class="m">${d}</td>`;
    const ler = dm_.dict_rows[0].length;
    for (let i = 0; i < le; i++) {
      const row = dm_.dict_rows[i];
      jt.append("<tr>")
      jt.append(r0, i);
      for (let i = 0; i < forms_len; i++) jt.append(r0, row[i])
      for (let i = forms_len; i < ler; i++) jt.append(r1, row[i])
      jt.append("</tr>")
    }
    jt.append(`</tbody></table>`);
    document.getElementById("dict_table_id").innerHTML = jt.html();
    // console.log(jt.html());
    // gestione eventi sulla tabella
  },
  bind_menu: function () {
    const call = (ev) => {
      const t = ev.target;
      if (t.tagName == 'A') {
        const cmd = t.getAttribute("cmd");
        if (!!cmd) exe(cmd);
      }
    };
    const menu = document.getElementById(this.id);
    menu.addEventListener("click", call);
  }
};


