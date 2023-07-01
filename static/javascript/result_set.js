"use strict"

// const top_filter = 35;

const result_set_top = 35;
const result_set_left = 5;
const result_set_z = 11;


var ResultSet = {
  id: "resultset_id",
  wind: null,
  open: async function () {
    const rows = D_M.allRsltRows();
    ResultSet.build(rows);
    ResultSet.show();
  },
  build: async function (rows) {
    const sp = "         ";
    const menu = `
<div class="menu_wnd" >
<ul>
<li>
<a class="tipb" href="javascript:ResultSet.scroll_top()">Top
<span class="tiptextb">Scroll Top</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:ResultSet.scroll_bottom()">Bottom
<span class="tiptextb">Scroll Bottom</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:ResultSet.scroll_left()">Left
<span class="tiptextb">Scroll Left</span>
</a>
</li>
<li>
<a class="tipb" href="javascript:ResultSet.scroll_right()">Right
<span class="tiptextb">Scroll Right</span>
</a>
</li>

<li>
<a class="cmd" href="#">Help
</a>
</li>
<li>${sp}</li>
<li><a href="javascript:ResultSet.hide()">X</a></li>
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
      let t = ev.target;
      while (t && t.tagName !== 'TR')
        t = t.parentNode;
      const td = t.querySelectorAll("td")[2];
      const formakey = td.innerHTML;
      Context.open(formakey);
    });
  },

};
