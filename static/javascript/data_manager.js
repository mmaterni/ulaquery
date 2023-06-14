"use strict"

  /*
 0: FORMA
 1: KEY
 2: LEMMA
 3: ETIMO
 4: LANG
 5: DATE
 6: POS
 7: FUNCT
 
 8: gender
 9: number
 10: case
 11: degree
 12: deterType
 13: MWEs
 14: pronType
 15: person
 16: verbForm
 17: mood
 18: tense
 19: voice
 20: property
 21: adpType
 22: advType
 23: advType2
 24: numType
 25: partType
 
 26: g
 27: p
 28: v
 
 29: LOC.1
 30: LOC.2
 31: LOC.3
 32: LOC.4
 33: DATE.0
 34: DATE.1
 35: DATE.2
  */


  // var dm_ = (function () {
  ; (function () {
    const DM = {
      dict_rows: [],
      dic_heads: [],
      where_vallues: [],
      load_dict: async function () {
        const url = `ula_data/data_export/dictionary.ula.csv`;
        try {
          const resp = await fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            cache: "default"
          });
          if (!resp.ok) {
            throw new Error(`Erroe:${resp.status} ${resp.statusText}`);
          }
          const data = await resp.text();
          const rows = data.trim().split("\n");
          this.dict_rows = rows.map((x) => x.trim().split("|"));
          this.dict_heads = this.dict_rows[0];
          this.dict_rows.shift();


          // AAA rimuove dallindice 60 alla fine
          // this.dict_rows.splice(60);

        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      set_dict_columns: function (row) {
        // const idx_sigl = row.findIndex((e, i) => i > 20 && e.length == 1);
        // const idx_loc_t = row.findIndex((e, i) => i > idx_sigl && e.startsWith("LOC"));
        // const idx_date_t = row.findIndex((e, i) => i > idx_loc_t && e.startsWith("DAT"));
        // const columns_fl = row.slice(0, 4);
        // const columns_pm = row.slice(6, 7).concat(row.slice(8, idx_sigl));
        // const columns_sigl = row.slice(idx_sigl, idx_loc_t);
        // const columns_loc_t = row.slice(idx_loc_t, idx_date_t);
        // const columns_date_t = row.slice(idx_date_t);
        // console.log("fl", columns_fl);
        // console.log("pm", columns_pm);
        // console.log("sigl", columns_sigl);
        // console.log("loc_t", columns_loc_t);
        // console.log("date_t", columns_date_t);
        // console.log(row);
      },
      findIndices: () => {
        const rl = this.dict_rows.length;
        const indices = [];
        for (let i = 0; i < rl; i++) {
          const row = this.dict_rows[i];
          let ok = true;
          for (const [j, vs] of this.where_values)
            if (!vs.includes(row[j])) {
              ok = false;
              break;
            }
          if (ok) indices.push(i);
        }
        return indices;
      },
      findRows: function () {
        const idxs = this.findIndices();
        const rows = [];
        for (const i of idxs)
          rows.push(this.dict_rows[i]);
        return rows;
      },
      resetWhereValues: function () {
        this.where_values = [];
      },
      setWhereValues: function (vs) {
        // [[i,['a','',..]],..]
        //   values = [
        //     [6, ['masc', 'sing']],
        //     [0, ['p']],
        //     [3, ['x', 'y', 'z']]
        // ];
        this.where_values = vs;
      },
      pusWhereValues: function (i, ...args) {
        const vs = Array.from(args);
        const r = [i, vs];
        this.where_vallues.push(r)
      }
    };

    window.dm_ = DM;
  }).call(this);

/*
my=(function(){
 ...
 return{
  name1:nameInt1,
  name2:nameInt2,
  ...
 }
}).call(this);
   oppure
})();
uso:
my.name1(...);
my.name2(,,)
*/