const DIR_ULA_DATA = `/ula_data`;
const DIR_DATA_EXP = `${DIR_ULA_DATA}/DIR_DATA_EXP`;
const DICT_FORM_PATH = `${DIR_DATA_EXP}/dictionary.ula.csv`;

// let ALPHABETIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàèéìòù";
// let NUMERIC = "0123456789";
// var ULACHARSET = ALPHABETIC + NUMERIC;
var UAPUNCTS = `,.;::?!^~()[]{}<>=+-*#@£&%/«»“‘’"\`'`;

// key nome dati
const KEY_DATA_FORM = "ula_form";
const KEY_DATA_TOKEN = "ula_token";

var DataManager = {
  text_name: null,
  token_file: null,
  form_file: null,
  token_lst: null,
  form_lst: [],
  omogr_json: {},
  // lunghezza righe di testo e terminatore di riga
  len_row: 80,
  row_eof: "##",
  rows_js: [],
  get_text_name: function () {
    const store_text_name = localStorage.getItem(KEY_TEXT_NAME);
    const text_name = store_text_name || "";
    return text_name;
  },
  set_text_name: function (text_name) {
    this.text_name = text_name;
    this.token_file = `${text_name}.token.csv`;
    this.form_file = `${text_name}.form.csv`;
  },
  get_sigla: function (text_name) {
    const s = text_name.split('.');
    if (s.length != 2) {
      return null;
    }
    return s[1];
  },
  load_text_list: async function () {
    const url = URL_TEXT_LIST;
    let rows = [];
    const resp = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      cache: 'no-store'
    });
    if (resp.ok) {
      const csv_data = await resp.text();
      rows = csv_data.trim().split("\n");
    }
    else {
      alert(`${url} Not Found. `);
      rows = [];
    }
    return rows;
  },
  save_data: function () {
    const t = get_time();
    this.save_csv(this.form_lst, this.form_file);
    this.save_csv(this.token_lst, this.token_file);
    cmd_log("Save Data   " + t);
    this.set_store();
  },
  save_csv: function (rows, file_name) {
    const rs = rows.map((x) => x.join("|"));
    const data = rs.join("\n");
    const url = `/write${DIR_DATA_EXP}/${file_name}`;
    fetch(url, {
      method: "POST",
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data
    }).then((resp) => {
      if (!resp.ok)
        throw new Error('HTTP error, status=' + resp.status);
      return resp.json();
    }).then((json) => {
    }).catch((error) => {
      alert(`ERROR post()\n${url}\n${error}`);
    });
  },
  load_data: async function () {
    this.clear_store();
    const t = get_time();
    cmd_log("Load Data  " + t);
    if (!this.text_name)
      return false;
    this.form_lst = await this.load_csv(this.form_file);
    if (this.form_lst.length == 0)
      return false;
    this.token_lst = await this.load_csv(this.token_file);
    this.omogr_json = await this.load_omogr_json();
    this.sort_form_lst();
    this.set_store();
    return true;
  },
  load_csv: async function (file_name) {
    const url = `${DIR_DATA_EXP}/${file_name}`;
    let csv_data = "";
    const resp = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      cache: 'no-store'
    });
    if (resp.ok)
      csv_data = await resp.text();
    if (!csv_data || csv_data.trim().length == 0) {
      const msg = `${file_name} Not Found.`;
      alert(msg);
      csv_data = "|||||||";
    }
    const rows = csv_data.trim().split("\n");
    return rows.map((x) => x.split("|"));
  },
  //contesto con limite di token a destra e sinistra
  build_context: (cnt_size, i) => {
    let lft = Math.max(i - cnt_size, 0);
    let rgt = Math.min(i + cnt_size + 1, le);
    let row = DataManager.token_lst.slice(lft, rgt);
    for (let i = 0; i < row.length; i++)
      row[i].push(lft + i);
    return row;
  },
  build_context_line: (i) => {
    let j = i;
    while (j > -1 && this.token_lst[j][0] !== '##')
      j--;
    const lft = Math.max(++j, 0);
    let le = this.token_lst.length;
    j = i;
    while (j < le && this.token_lst[j][0] !== '##')
      j++;
    const rgt = Math.min(j, le);
    let row = this.token_lst.slice(lft, rgt);
    for (let i = 0; i < row.length; i++)
      row[i].push(lft + i);
    return row;
  },
  sort_form_lst: function () {
    let sortFn = function (a, b) {
      if (a[1] == b[1]) return 0;
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
    };
    this.form_lst.sort(sortFn);
  }
};

