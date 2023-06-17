"use strict"

  /*
  POS|pos_name|msd_name|attrs
NOUN|noun|gender|Masc,Fem,Neut
NOUN|noun|number|Sing,Plur
NOUN|noun|case|Nom,Acc

PROPN|properNoun|gender|Masc,Fem,Neut
PROPN|properNoun|number|Sing,Plur
PROPN|properNoun|case|Nom,Acc

ADJ|adjective|gender|Masc,Fem,Neut
ADJ|adjective|number|Sing,Plur
ADJ|adjective|case|Nom,Acc
ADJ|adjective|degree|Pos,Cmp,Sup,Abs

DET|determiner|deterType|ArtDef,ArtIndef,Poss,Rel,Dem,Neg,Ind,Int,Exc
DET|determiner|gender|Masc,Fem,Neut
DET|determiner|number|Sing,Plur
DET|determiner|case|Nom,Acc
DET|determiner|MWEs|MWEs

PRON|pronoun|pronType|Prs,Poss,Rel,Dem,Neg,Ind,Int
PRON|pronoun|person|1,2,3
PRON|pronoun|gender|Masc,Fem,Neut
PRON|pronoun|number|Sing,Plur
PRON|pronoun|case|Nom,Acc
PRON|pronoun|MWEs|MWEs

VERB|verb|verbForm|Fin,Ind
VERB|verb|mood|Inf,Part,Ger,Ind,Imp,Cnd,Sub
VERB|verb|tense|Past,Pres,Fut,Imp
VERB|verb|voice|Act,Pass,Rfl
VERB|verb|property|Intr,Trans
VERB|verb|person|1,2,3
VERB|verb|number|Sing,Plur
VERB|verb|gender|Masc,Fem,Neut
VERB|verb|MWEs|MWEs

ADP|adposition|adpType|PrepS,PrepArt
ADP|adposition|MWEs|MWEs

ADV|adverb|advType|Man,Loc,Tim,Deg,Freq
ADV|adverb|advType2|Dem,Ind,Neg,Int,Tot
ADV|adverb|degree|Pos,Cmp,Sup,Abs
ADV|adverb|MWEs|MWEs

CCONJ|coordinating conjunction|MWEs|MWEs

SCONJ|subordinating conjunction|MWEs|MWEs

NUM|numeral|numType|Card,Ord

PART|particle|partType|Pos,Neg,Int,Exc,Verb

INTJ|interjection||


X|other||
-|del||

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
 27: h
 28: p
 29: v
 
30: LOC.1
 31: LOC.2
 32: LOC.3
 33: LOC.4
 
 35: DATE.0
 35: DATE.1
 36: DATE.2
  */


  // var D_M = (function () {
  ; (function () {
    const FORMA = 0,
      LEMMA = 1,
      ETIMO = 2,
      SIGL = 26,
      POS = 6,
      FUNCT = 7,
      LANG = 4,
      DATE = 5;
    const DM = {
      dict_rows: [],
      dic_heads: [],
      columns: [],
      map_columns: {},
      where_values: [],
      // idx_from_sigl: 0,
      // idx_to_sigl: 0,
      // idx_from_loc_t: 0,
      // idx_to_loc_t: 0,
      // idx_from_date_t: 0,
      // idx_to_dte_t: 0,
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
          this.columns = D_M.dict_heads.map(x => x.toLowerCase());
          this.map_columns = this.columns.reduce((acc, element, index) => {
            acc[element] = index;
            return acc;
          }, {});

          this.dict_rows.shift();
          this.setColumns();

          // AAA per i Tests rimuove dallindice 60 alla fine
          // this.dict_rows.splice(60);

        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      setColumns: function () {
        // const row = this.dict_heads;

        // posizine iniziale e finale di
        // sigle, loc_t.date_t
        // this.idx_from_sigl = row.findIndex((e, i) => i > 20 && e.length == 1);
        // this.idx_from_loc_t = row.findIndex((e, i) =>
        //   i > this.idx_from_sigl && e.startsWith("LOC"));
        // this.idx_to_sigl = this.idx_from_loc
        // this.idx_from_date_t = row.findIndex((e, i) =>
        //   i > this.idx_from_loc_t && e.startsWith("DAT"));
        // this.idx_to_loc_t = this.idx_from_date_t
        // this.idx_to_dte_t = row.length;

        // const cols_forma_lemma = row.slice(0, 4);
        // const cols_lang = row.slice(4, 5);
        // const cols_date = row.slice(5, 6);
        // const cols_funct = row.slice(7, 8);
        // const cols_pos_msd = row.slice(6, 7).concat(row.slice(8, this.idx_from_sigl));

        // console.log("form_lemma", cols_forma_lemma);
        // console.log("lang", cols_lang);
        // console.log("date", cols_date);
        // console.log("funct", cols_funct);
        // console.log("pps_msd", cols_pos_msd);
        // console.log("sigl", cols_sigl);
        // console.log("loc_t", cols_loc_t);
        // console.log("date_t", cols_date_t);
        // console.log(row);
      },
      xfindIndices: function () {
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
      findIndices: function () {
        const indices = [];
        const rl = this.dict_rows.length;
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
      addQueryCondition: function (column, values) {
        if (values.length == 1 && values[0] == '')
          values = [];
        const r = [column, values];
        this.where_values.push(r)
      },
      setQueryConditions: function () {

        const log = () => {
          const arr = Array.from(this.where_values);
          for (const r of arr)
            if (r[1].length > 0)
              console.log(r[0], r[1]);
        };

        this.where_values = [];


        // gestione opzioni inpput forma,lemma,etimo
        this.addQueryCondition(FORMA, [VS.forma]);
        this.addQueryCondition(LEMMA, [VS.lemma]);
        this.addQueryCondition(ETIMO, [VS.etimo]);

        //gestione sigle,locts e dats per colonno valore
        // si/no per colonna. / 
        let les = VS.sigl.sigls.length;
        let i0 = SIGL;
        for (let i = 0; i < les; i++)
          this.addQueryCondition(i + i0, [VS.sigl.sigls[i]]);

        let lel = VS.sigl.locts.length;
        let i1 = i0 + les;
        for (let i = 0; i < lel; i++)
          this.addQueryCondition(i + i1, [VS.sigl.locts[i]]);

        let led = VS.sigl.datets.length;
        let i2 = i1 + lel;
        for (let i = 0; i < led; i++)
          this.addQueryCondition(i + i2, [VS.sigl.datets[i]]);

        // gestionde delle colonne con valori mltipli 
        this.addQueryCondition(FUNCT, VS.funct.functs);
        this.addQueryCondition(LANG, VS.funct.langs);
        this.addQueryCondition(DATE, VS.funct.dates);

        // gestone filtro POS MSD attrs
        let pos_arr = [];
        for (let row of VS.msd_attrs) {
          const xy = row[0].split("_");
          const pos = xy[0];
          const msd = xy[1].toLowerCase();
          const attrs = row.slice(1);
          const col = this.map_columns[msd];
          this.addQueryCondition(col, attrs);
          if (pos_arr.indexOf(pos) < 0)
            pos_arr.push(pos);
        }
        this.addQueryCondition(POS, pos_arr);

        const arr = this.where_values.filter((r) => r[1].length > 0);
        // console.log(arr);
        this.where_values = arr;

        log();

      },

    };

    window.D_M = DM;
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