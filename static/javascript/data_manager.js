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


  // var d_M = (function () {
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
      setDictColumns: function (row) {
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
      findIndices: function () {
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
      resetQueryConditions: function () {
        this.where_values = [];
      },
      setQueryConditions: function (vs) {
        // [[i,['a','',..]],..]
        //   values = [
        //     [6, ['masc', 'sing']],
        //     [0, ['p']],
        //     [3, ['x', 'y', 'z']]
        // ];
        this.where_values = vs;
      },
      addQueryCondition: function (column,values) {
        const r = [column, values];
        this.where_values.push(r)
      }
      // xaddQueryCondition: function (i, ...args) {
      //   const vs = Array.from(args);
      //   const r = [i, vs];
      //   this.where_values.push(r)
      // }
    };

    window.d_M = DM;
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