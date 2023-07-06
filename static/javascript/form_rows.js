"use strict"

const form_rows_top = 35;
const form_rows_left = 50;
const form_rows_z = 22;

var FormRows = {
  id: "formrows_id",
  wind: null,
  open: function (rows) {
    // const rows = D_M.dict_rsl_rows;s
    this.build(rows);
    this.show();
  },
  build: function (rows) {
    const sp = "         ";
    const menu = `
<div class="menu_wnd" >
<ul>
<li>
<a class="tipb arrow" href="javascript:FormRows.scroll_top()">&#9650;
<span class="tiptextb">Scroll Top</span>
</a>
</li>
<li>
<a class="tipb arrow" href="javascript:FormRows.scroll_bottom()">&#9660;
<span class="tiptextb">Scroll Bottom</span>
</a>
</li>
<li>
<a class="tipb arrow" href="javascript:FormRows.scroll_left()">&#9664;
<span class="tiptextb">Scroll Left</span>
</a>
</li>
<li>
<a class="tipb arrow" href="javascript:FormRows.scroll_right()">&#9654;
<span class="tiptextb">Scroll Right</span>
</a>
</li>

<li>
<a class="cmd" href="#">?
</a>
</li>
<li>${sp}</li>
<li><a href="javascript:FormRows.hide()">X</a></li>
<li></li>
</ul>
</div>
<div class="form_rows">
`;
    let jt = UaJth();
    jt.append(menu);

    // head
    const heads = D_M.dict_rsl_heads;
    jt.append(`<table><thead><tr>`);
    let h = (d) => `<th><span>${d}</span></th>`;
    jt.append(h, "N.");
    for (const x of heads) jt.append(h, x.toUpperCase());
    jt.append(`</tr></thead><tbody>`);

    const rh = (d) => `<td>${d}</td>`;
    const lers = rows.length;
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
      this.wind.setZ(form_rows_z);
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
    this.wind.setXY(form_rows_left, form_rows_top, -1);
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
    this.show();
  },
  hover: function () {
    // const winds = UaWindowAdm.getForGroup("text");
    // for (const wind of winds)
    //     wind.w.classList.remove("z-index-hover");
    this.wind.w.classList.toggle("z-index-hover");
},
  bind: function () {
    const a = this.wind.w.querySelector("div.form_rows");
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      this.hover();
    });
  }
};

