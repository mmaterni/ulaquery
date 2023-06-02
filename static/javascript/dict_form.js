/* jshint esversion: 11 */

const html_dict_menu = `
<div id="dict_menu_id" class="menu_bar" >
<ul>
  <li class="v">
    <a class="tipb" href="#" cmd="show_text">Text
      <span class="tiptextb">Display Lines of Text</span>
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="save_data" href="#">Save
      <span class="tiptextb">Save the Data on the Server</span>
    </a>
  </li>
  <li class="v">
    <a class="tipb" cmd="load_data" href="#">Load
      <span class="tiptextb">Read Data from Server</span>
    </a>
  </li>

  <li class="v">
    <a href="#">Corpus</a>
    <ul class="v">   
      <li class="h">
          <a class="tipr" cmd="check_text" href="#">Check Text
            <span class="tiptextr">Check Homographs and Forms without Tokens</span>
          </a>
      </li>
      <li class="h">
          <a class="cmd tipr" cmd="diff_text_corpus" href="#">Compare Corpus
            <span class="tiptextr">Compare the Text on the server with the Corpus</span>
          </a>
      </li>
      <li class="h">
          <a class="cmd tipr" cmd="upd_corpus" href="#">Update Corpus
            <span class="tiptextr">Update Corpus with the Text</span>
          </a>
      </li>
      <li class="h">
        <a class="cmd tipr" cmd="upd_text" href="#">Update Text
            <span class="tiptextr">Update Text with the Corpus</span>
          </a>
        </li>     
    </ul>
  </li>

  <li class="v tipb" >
    <a class="title" cmd="select_text" href="#">Select Text </a>
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
`;

const html_dict_head = `
<div id='dict_head_id'>
<table>
<tr>
  <td class="n" ><span class="tipb">C
    <span class="tiptextb">Open Context of Form</span>
  </span></td>
  <td class="fr">form</td>
  <td class="find">
    <a class="cmd tipb" cmd="scroll" href="#">find
      <span class="tiptextb">Goes to the position<br/> of the selected word</span>
    </a>
    <input type="text" value="" size="2" >
  </td>
  <td class="l">lemma</td>
  <td class="e">etimo</td>
  <td class="ph">lang</td>
  <td class="p">POS</td>
  <td class="fn">funct</td>
  <td class="m">MSD</td>
</tr> 
</table>
</div>

<div id='dict_rows_id'></div>;
`;


//forma, lemma, etimo, lang, POS, funct, MSD
const html_dict_rows = `
<tr n="{i}">
  <td class="n" name="n">{i}</td>
  <td class="fr" name="fr" >{fr}</td>
  <td class="{disp}" name="fk">{fk}</td>
  <td class="l" name="l"><input type="text" value="{l}" size="4" ></td>
  <td class="e" name="e"><input type="text" value="{e}" size="4" ></td>
  <td class="ph">{ph}</td>
  <td class="p">{p}</td>
  <td class="fn">{fn}</td>
  <td class="m">{m}</td>
</tr> 
`;

dorm_cols = ["FORMA", "KEY", "LEMMA", "ETIMO", "LANG", "DATE", "POS", "FUNCT"];
msd_cols = ["GENDER", "NUMBER", "CASE", "DEGREE", "DETERTYPE", "MWES", "PRONTYPE", "PERSON", "VERBFORM", "MOOD", "TENSE", "VOICE", "PROPERTY", "ADPTYPE", "ADVTYPE", "ADVTYPE2", "NUMTYPE", "PARTTYPE"];

sigl_cols = ["G", "P", "V"];
loc_cols = ["LOC.1", "LOC.2", "LOC.3", "LOC.4"];
date_cols = ["DATE.0", "DATE.1", "DATE.2"];

var DictForm = {
  id: "dict_form_id",
  tr_selected: null,
  exe: function (cmd) {
    switch (cmd) {
      // case "show_text":
      //   this.save_store();
      //   Ula.show_text();
      //   break;
      // case "select_text":
      //   this.select_text();
      //   break;
      // case "save_data":
      //   if (confirm("Save Data ?"))
      //     this.save_data();
      //   break;
      case "load_data":
        if (confirm("Load Data ?"))
          this.load_data();
        break;
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
    document.getElementById(this.id).innerHTML = html_dict_menu;
    // this.bind_menu();
    // this.form_lst2html();
  },
  // load_data: async function () {
  //   const ok = await DbFormLpmx.load_data();
  //   if (!ok) {
  //     return false;
  //   }
  //   this.form_lst2html();
  //   FormText.data2html();
  //   return true;
  // },
  // form_lst2html: function () {
  //   const lfe = DbFormLpmx.form_lst.length;
  //   if (lfe == 0)
  //     return;
  //   let jt = UaJt();
  //   jt.append("<table>");
  //   for (let i = 0; i < lfe; i++) {
  //     const r = DbFormLpmx.form_lst[i];
  //     const disp = r[0] == r[1] ? "f" : "k";
  //     const d = {
  //       i: i,
  //       fr: r[0],
  //       disp: disp,
  //       fk: r[1],
  //       l: r[2],
  //       e: r[3],
  //       ph: r[4],
  //       p: r[5],
  //       fn: r[6],
  //       m: r[7]
  //     };
  //     jt.append(html_dict_rows, d);
  //   }
  //   jt.append("</table>");
  //   const html = jt.html();
  //   $("#dict_rows_id").html(html);
  //   //setta la classe bl per le form che hanno omografi nel corpus
  //   const fr_lst = document.querySelectorAll("#dict_rows_id tr td.fr");
  //   const omogr_js = DbFormLpmx.omogr_json;
  //   const omogr_ks = Object.keys(omogr_js);
  //   const omogr_lst = Array.from(fr_lst).filter(e => omogr_ks.includes(e.innerHTML));
  //   for (let td of omogr_lst) {
  //     let tr = td.parentElement;
  //     tr.classList.add("bl");
  //   }
  //   //sett la clase emp per le form che non hanno tokens 
  //   const fk_lst = document.querySelectorAll("#dict_rows_id tr td[name='fk']");
  //   let tks = DbFormLpmx.token_lst.map(e => e[1]);
  //   let fks = DbFormLpmx.form_lst.map(e => e[1]);
  //   let fkes = fks.filter((e) => !tks.includes(e));
  //   const empty_lst = Array.from(fk_lst).filter(e => fkes.includes(e.innerHTML));
  //   for (let td of empty_lst) {
  //     let tr = td.parentElement;
  //     tr.classList.add("empty");
  //   }
  //   this.bind_rows();
  // },
  bind_menu: function () {
    const menu = document.getElementById("dict_menu_id");
    const call = (ev) => {
      const t = ev.target;
      if (t.tagName == 'A') {
        const cmd = t.getAttribute("cmd");
        if (!!cmd) {
          this.exe(cmd);
        }
      }
    };
    menu.addEventListener("click", call);
    const head = document.getElementById("dict_head_id");
    head.addEventListener("keyup", (ev) => {
      const t = ev.target;
      if (t.tagName == "INPUT") {
        const key = ev.which || ev.keyCode || 0;
        if (ev.ctrlKey) {
          if (key == 88) {
            ev.target.value = "";
            ev.preventDefault();
          }
          ev.stopImmediatePropagation();
          return;
        }
        if (key == "13") {
          this.scroll();
          ev.preventDefault();
        }
      }
    });
  }
};


