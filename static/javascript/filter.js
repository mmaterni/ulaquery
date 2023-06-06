/*
POS|pos_name|msd_name|attrs
NOUN|noun|gender|Masc,Fem,Neut
NOUN|noun|number|Sing,Plur
PROPN|properNoun|number|Sing,Plur
PROPN|properNoun|case|Nom,Acc
ADJ|adjective|gender|Masc,Fem,Neut
DET|determiner|deterType|ArtDef,ArtIndef,Poss,Rel,Dem,Neg,Ind,Int,Exc
DET|determiner|MWEs|MWEs
PRON|pronoun|MWEs|MWEs
VERB|verb|verbForm|Fin,Ind
VERB|verb|tense|Past,Pres,Fut,Imp
VERB|verb|voice|Act,Pass,Rfl
VERB|verb|property|Intr,Trans
VERB|verb|person|1,2,3
VERB|verb|number|Sing,Plur
VERB|verb|gender|Masc,Fem,Neut
VERB|verb|MWEs|MWEs
ADP|adposition|adpType|PrepS,PrepArt
INTJ|interjection||
X|other||
-|del||

var js = {
      "VERB": {
        "tense": ["Pots", "Pres", "Fut", "Imp"],
        "voice": ["Act", "Pass", "Rfl"]
      },
     "NOUN": {
        "gender": ["Masc.", "Femm.", "Neut."],
        "number": ["Sing.", "Plur."]
      }
      ........
    }   

*/



var Filter = {
  open: async function () {
    await PosMsd.open();
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
    let js = {};
    for (let row of rows) {
      const pos = row[0];
      if (!js[pos]) js[pos] = {};
      const msd = row[2]
      const attrs = row[3].split(',');
      js[pos][msd] = attrs;
    };
    // const s = JSON.stringify(js, null, 2);
    // console.log(s);
    const jt1 = UaJth();
    const jt0 = UaJth();
    jt0.append(`
    <div class="menu_wnd">
    <ul>
    <li><a>Uno</a></li>
    <li><a>Due</a></li>
    <li><a>Tre</a></li>
    </ul>
    </div>
    <div class="pos_msd">
    <ul class="pos">`);
    const ht0 = (pos, msds) => `
    <li>
      <div class="p">${pos}</div>
      <div class="m">${msds}</div>
    </li>`;
    // const ht1 = (x) => `<li><a>${x}</a></li>`;
    for (let pos in js) {
      if (["X", 'INTJ', '-'].includes(pos)) continue
      jt1.reset();
      for (let msd in js[pos]) {
        jt1.append("<ul>")
        jt1.append(`<li><span>${msd}</span></li>`)
        for (let x of js[pos][msd])
          jt1.append(`<li><a>${x}</a></li>`);
        // jt1.append(ht1, x);
        jt1.append("</ul>")
      }
      const h = jt1.html()
      jt0.append(ht0, pos, h)
    }
    jt0.append("</ul></div>")
    const html = jt0.html();
    // console.log(jt0.text());
    if (!this.wind) {
      this.wind = UaWindowAdm.create(this.id, "ulaquery_id");
      this.setXY();
      this.wind.drag();
    }
    this.wind.setHtml(html);
    // this.bind_pos();
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
    // let p = $("#lpmx_rows_head_id").offset();
    // let lp_wd = $("#lpmx_rows_head_id").width();
    // lp_wd = lp_wd > 500 ? lp_wd : 1099;
    // const left = lp_wd + p.left + 20;
    const left = 20;
    this.wind.setXY(left, 100, -1).show();
  },
  resetXY: function () {
    this.wind.reset();
    this.setXY();
  },
  // bind_pos: function () {
  //   $("#lpmx_pos_id").off("click");
  //   $("#lpmx_pos_id").on("click ", "table tr.data td", {}, function (e) {
  //     $("#lpmx_pos_id tr.data td").removeClass("select");
  //     $(this).addClass("select");
  //     PosMsd.pos_selected = this.innerHTML;
  //     PosMsd.show_msd(this);
  //     Msd.toggle();
  //   });
  //   $("#lpmx_pos_id").off("mouseenter");
  //   $("#lpmx_pos_id")
  //     .on("mouseenter", "tr.data td", {}, function (event) {
  //       event.preventDefault();
  //       if (Msd.is_active)
  //         return;
  //       PosMsd.show_msd(this);
  //       $("#lpmx_pos_id tr.data td").removeClass("select");
  //     });
  // }
};

// var Msd = {
//   id: 'lpmx_msd_id',
//   wind: null,
//   is_active: false,
//   msd_attrs: [],
//   show: function () {
//     if (!this.wind) return;
//     this.wind.show();
//   },
//   hide: function () {
//     if (!this.wind) return;
//     this.wind.hide(this.id);
//   },
//   resetXY: function () {
//     this.wind.reset();
//     this.setXY();
//   },
//   setXY: function () {
//     var p = $("#lpmx_rows_head_id").offset();
//     let left = $("#lpmx_rows_head_id").width() + p.left + 20;
//     let top = $("#lpmx_pos_id").height() + 30;
//     this.wind.setXY(left, top, -1).show();
//   },
//   open(pos_sign) {
//     let rows = PosMsdJson.get_msd_list(pos_sign);
//     let max_attr = 0;
//     for (let row of rows) {
//       let na = row.attrs.length;
//       max_attr = Math.max(max_attr, na);
//     }
//     let jt = UaJt();
//     let head = `
// <table>
// <thead>
// <tr>
// <th colspan="{max_attr}">
// <span class="a" >{pos_name}</span>
// <a href="#">Confirm</a>
// </th>
// </tr>
// </thead>
// <tbody class="nodrag">
// `;
//     let pos_name = PosMsdJson.get_poas_name(pos_sign);
//     let data = {
//       "pos_name": pos_name,
//       "pos_sign": pos_sign,
//       "max_attr": max_attr
//     };
//     jt.append(head, data);
//     let i = 0;
//     for (let row of rows) {
//       let data = {
//         "i": i,
//         "msd_name": row.msd_name
//       };
//       let tr = '<tr n="{i}" name="{msd_name}">';
//       jt.append(tr, data);
//       for (let attr of row.attrs) {
//         let data = { "attr": attr };
//         let td = '<td name="{attr}">{attr}</td>';
//         jt.append(td, data);
//       }
//       jt.append("</tr>");
//       i++;
//     }
//     jt.append('</tbody></table>');
//     let html = jt.html();
//     if (!this.wind) {
//       this.wind = UaWindowAdm.create(this.id, "lpmx_id");
//       this.setXY();
//       this.wind.drag();
//     }
//     this.wind.setHtml(html);
//     this.show();
//     this.bind_msd();
//   },
//   bind_msd: function () {
//     $("#lpmx_msd_id").off("click");
//     $("#lpmx_msd_id")
//       .on("click", "table thead tr th a", {}, function (e) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         Msd.set_pos_msd();
//       })
//       .on("click", "table tbody tr td", {}, function (e) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         let td = $(e.currentTarget);
//         let tr = td.parents('tr').first();
//         let msd_name = tr.attr("name");
//         let attr = td.attr("name");
//         Msd.set_attr(msd_name, attr);
//       });
//   },
//   toggle: function () {
//     if (this.is_active)
//       this.deactivate();
//     else
//       this.activate();
//   },
//   activate: function () {
//     this.is_active = true;
//     $("#lpmx_msd_id table thead tr").addClass("select");
//   },
//   deactivate: function () {
//     this.is_active = false;
//     $("#lpmx_msd_id table thead tr").removeClass("select");
//     Msd.msd_attrs = [];
//   },
//   set_pos_msd: function () {
//     if (!this.is_active)
//       return;
//     let pos = PosMsd.pos_selected;
//     const attrs = Msd.msd_attrs.filter((x) => !!x);
//     const h = attrs.join(',');
//     FormLpmx.set_pos_msd(pos, h);
//     this.deactivate();
//   },
//   set_attr: function (msd_name, attr) {
//     if (!this.is_active)
//       return;
//     let tr = document.querySelector("#lpmx_msd_id tbody tr[name=" + msd_name + "]");
//     let tr_row = tr.getAttribute('n');
//     tr_row = parseInt(tr_row);
//     let td = tr.querySelector("td[name='" + attr + "']");
//     let td_old = tr.querySelector("td.select");
//     if (!!td_old) {
//       td_old.classList.remove("select");
//       if (td == td_old) {
//         this.msd_attrs[tr_row] = null;
//         return;
//       }
//     }
//     td.classList.add("select");
//     this.msd_attrs[tr_row] = attr;
//   }
// };
