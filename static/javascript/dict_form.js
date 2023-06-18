"use strict"



var DictForm = {
  id: "dict_form.id",
  tr_selected: null,
  wind: null,
  rows: [],
  open: function () {
    this.build(D_M.dict_rows);
    this.show();
  },
  build: async function (rows) {
    // collegamento con D_M per nomi colonne
    const heads = D_M.dict_heads;
    const sp = "         ";
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
<li>${sp}</li>
<li><a  href="javascript:DictForm.hide()">X</a></li>
<li></li>
</ul>
</div>
<div class="dict_form">
`;
    let jt = UaJth();
    jt.append(menu);
    const forms_len = 8;
    const head_form = heads.slice(0, forms_len);
    const heaD_Msd = heads.slice(forms_len);
    // console.log(heads);
    // console.log(head_form);
    // console.log(heaD_Msd);
    // elimina la prima riga
    // this.rows.shift();

    // head
    // FIXME jt.append(`<table class='dict'><thead><tr>`);
    jt.append(`<table><thead><tr>`);
    let h = (d) => `<th><span>${d}</span></th>`;
    jt.append(h, "N.");
    for (const x of head_form) jt.append(h, x.toUpperCase());
    for (const x of heaD_Msd) jt.append(h, x.toUpperCase())
    jt.append(`</tr></thead><tbody>`);

    // rowa
    const le = rows.length;
    const r0 = (d) => `<td>${d}</td>`;
    const r1 = (d) => `<td class="m">${d}</td>`;
    const ler = rows.length > 0 ? rows[0].length : 0;
    for (let i = 0; i < le; i++) {
      const row = rows[i];
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
  },
  show: async function (url) {
    if (!this.wind) return;
    wait_start();
    await sleep(10);
    this.wind.show();
    wait_stop();
  },
  hide: function () {
    if (!this.wind) return;
    this.wind.hide(this.id);
  },
  setXY: function () {
    const left = 5;
    const top = 50;
    this.wind.setXY(left, top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.show();
  },
  scroll_top: function () {
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
  }
};


