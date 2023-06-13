"use strict"



  // var dm_ = (function () {
  ; (function () {
    const DM = {
      dict_rows: [],
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

          // AAA rimuove dallindice 60 alla fine
          // this.dict_rows.splice(60);

        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      set_dict_columns: function (row) {
        /*              ​
        0: "FORMA"                ​
        5: "DATE"
        ​
        6: "POS"                ​
        25: "partType"
        ​
        26: "g"
        28: "v"
        ​
        29: "LOC.1"
        32: "LOC.4"
        ​
        33: "DATE.0"
        35: "DATE.2\r"
        FORMA|KEY|LEMMA|ETIMO|  LANG|DATE|  POS|FUNCT|
        gender|number|case|degree|deterType|MWEs|pronType|person|verbForm|mood|tense|voice|property|adpType|advType|advType2|numType|partType|
        g|p|v|
        LOC.1|LOC.2|LOC.3|LOC.4|
        DATE.0|DATE.1|DATE.2       
        */
        // indice inizio delle sigle
        const idx_sigl = row.findIndex((e, i) => i > 20 && e.length == 1);
        // indice inizio LOC
        const idx_loc_t = row.findIndex((e, i) => i > idx_sigl && e.startsWith("LOC"));
        // indice inizio DATE
        const idx_date_t = row.findIndex((e, i) => i > idx_loc_t && e.startsWith("DAT"));

        // FORMA|KEY|LEMMA|ETIMO
        const columns_fl = row.slice(0, 4);
        //POS| gender|number|case|degree|deterType|MWEs|pronType|person|verbForm|mood|tense|voice|property|adpType|advType|advType2|numType|partType|
        const columns_pm = row.slice(6, 7).concat(row.slice(8, idx_sigl));
        // g|p|v|
        const columns_sigl = row.slice(idx_sigl, idx_loc_t);
        // LOC.1|LOC.2|LOC.3|LOC.4|
        const columns_loc_t = row.slice(idx_loc_t, idx_date_t);
        // g|p|v|
        const columns_date_t = row.slice(idx_date_t);

        // console.log("fl", columns_fl);
        // console.log("pm", columns_pm);
        // console.log("sigl", columns_sigl);
        // console.log("loc_t", columns_loc_t);
        // console.log("date_t", columns_date_t);
        // console.log(row);
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