/* jshint esversion: 11 */
"use strict"

const html_dict_menu = `
<div id="dict_menu_id" class="menu_bar" >
<ul>
  <li class="v">
    <a class="tipb" cmd="scroll_top" href="#">Top
      <span class="tiptextb">Scroll Top</span>
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="scroll_bottom" href="#">Bottom
      <span class="tiptextb">Scroll Bottom</span>
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="scroll_left" href="#">Left
      <span class="tiptextb">Scroll Left</span>
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="scroll_right" href="#">Right
      <span class="tiptextb">Scroll Right</span>
    </a>
  </li>


  <li class="v tipb" >
    <a  cmd="select_text" href="#">Select Text </a>
    <span class="tiptextb">Load Selected Text</span>
   </li>
  
  <li class="v">
    <a href="#">Utils</a>
    <ul class="v">
      <li class="h">
        <a class="tipr" cmd="resetxy" href="#">Relocate
          <span class="tiptextr">Relocate all Windows</span>
        </a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="show_store" href="#">Show Store
        </a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="clear_store" href="#">Clean Store
          <span class="tiptextr">Clean LocalStore</span>
        </a>
      </li>
    </ul>
  </li>

  <li class="v">
    <a class="cmd" cmd="help" href="#">Help
    </a>
  </li>

  <li class="v">
    <a class="tipb" cmd="cmd_log" href="#">Log
      <span class="tiptextb">Toggle Log</span>
    </a>
  </li>

  <li class="v">
    <a cmd="close" href="#">close
    </a>
  </li>

  </ul>
</div>

<div id="dict_table_id" ></div>
`;

var DictForm = {
  tr_selected: null,
  exe: function (cmd) {
    switch (cmd) {
      // case "show_text":
      //   this.save_store();
      //   Ula.show_text();
      //   break;
      case "scroll_top":
        this.scroll_top();
        break;
      case "scroll_bottom":
        this.scroll_bottom();
        break;
      case "scroll_left":
        this.scroll_left();
        break;
      case "scroll_right":
        this.scroll_right();
        break;
      // case "save_data":
      //   if (confirm("Save Data ?"))
      //     this.save_data();
      //   break;
      // case "load_data":
      //   if (confirm("Load Data ?"))
      //     this.load_data();
      //   break;
      // case "check_text":
      //   this.check_text();
      //   break;
      // case "upd_corpus":
      //   if (!confirm("Save Data ?"))
      //     return;
      //   new Promise((resolve, reject) => {
      //     this.save_data();
      //     resolve();
      //     reject();
      //   }).then(() => {
      //     if (confirm("Update corpus ?")) {
      //       this.update_corpus();
      //       this.load_omagr();
      //     }
      //   });
      //   break;

      // case "upd_text":
      //   if (!confirm("Save Data ?"))
      //     return;
      //   new Promise((resolve, reject) => {
      //     this.save_data();
      //     resolve();
      //     reject();
      //   }).then(() => {
      //     if (confirm("Update text ?")) {
      //       this.update_text();
      //       this.load_data();
      //     }
      //   });
      //   break;

      // case "diff_text_corpus":
      //   if (!confirm("Save Data ?"))
      //     return;
      //   new Promise((resolve, reject) => {
      //     this.save_data();
      //     resolve();
      //     reject();
      //   }).then(() => {
      //     this.diff_text_corpus();
      //   });
      //   break;
      // case "help":
      //   Help.toggle("help1.html");
      //   break;
      // case "cmd_log":
      //   cmd_log_toggle();
      //   break;
      // case "resetxy":
      //   relocate();
      //   break;
      // case "show_store":
      //   DbFormLpmx.show_store();
      //   break;
      // case "clear_store":
      //   if (confirm("Clear Local Store ?"))
      //     DbFormLpmx.clear_store();
      //   break;
      case "close":
        cmd_close();
        break;
      // case "scroll":
      //   DictForm.scroll();
      //   break;
      default:
        alert("command not found.");
    }
  },

  open: async function () {
    let jt = UaJth();
    jt.append(html_dict_menu);
    document.getElementById("ulaquery_id").innerHTML = jt.html();
    this.bind_menu();
    this.dict_form2html()
  },
  scroll_top: function () {
    const e = document.getElementById("dict_table_id");
    e.scrollTop = 0;
  },
  scroll_bottom: function () {
    const e = document.getElementById("dict_table_id");
    e.scrollTop = e.scrollHeight;
  },
  scroll_left: function () {
    const e = document.getElementById("dict_table_id");
    e.scrollLeft = 0;
  },
  scroll_right: function () {
    const e = document.getElementById("dict_table_id");
    e.scrollLeft = e.scrollWidth;
  },
  dict_form2html: async function () {
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
    this.bind_rows();
  },
  bind_menu: function () {
    const call = (ev) => {
      const t = ev.target;
      if (t.tagName == 'A') {
        const cmd = t.getAttribute("cmd");
        if (!!cmd) this.exe(cmd);
      }
    };
    const menu = document.getElementById("dict_menu_id");
    menu.addEventListener("click", call);
  },
  bind_rows: function () {
  }
};


