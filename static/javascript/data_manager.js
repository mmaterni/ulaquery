const DIR_ULA_DATA = `/ula_data`;
const DIR_DATA_EXP = `${DIR_ULA_DATA}/data_export`;
const DICT_FORM_PATH = `${DIR_DATA_EXP}/dictionary.ula.csv`;

// let ALPHABETIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàèéìòù";
// let NUMERIC = "0123456789";
// var ULACHARSET = ALPHABETIC + NUMERIC;
// var UAPUNCTS = `,.;::?!^~()[]{}<>=+-*#@£&%/«»“‘’"\`'`;


var DataManager = {
  dict_form_rows: [],
  load_dict_form: async function () {
    const url = `${DICT_FORM_PATH}`;
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        cache: 'no-store'
      });
      if (!resp.ok) {
        throw new Error(`Erroe:${resp.status} ${resp.statusText}`);
      }
      const data = await resp.text();
      const rows = data.trim().split("\n");
      this.dict_form_rows = rows.map((x) => x.split("|"));
    } catch (error) {
      alert(`Errror:${url}\n ${error}`);
      throw error;
    }
  },
};
