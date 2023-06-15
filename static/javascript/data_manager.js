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


  // var D_M = (function () {
  ; (function () {
    const DM = {
      dict_rows: [],
      dic_heads: [],
      where_vallues: [],
      idx_from_sigl: 0,
      idx_to_sigl: 0,
      idx_from_loc_t: 0,
      idx_to_loc_t: 0,
      idx_from_date_t: 0,
      idx_to_dte_t: 0,
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
          this.setColumns();

          // AAA rimuove dallindice 60 alla fine
          // this.dict_rows.splice(60);

        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      setColumns: function () {
        const row = this.dict_heads;

        // posizine iniziale e finale di
        // sigle, loc_t.date_t
        this.idx_from_sigl = row.findIndex((e, i) => i > 20 && e.length == 1);
        this.idx_from_loc_t = row.findIndex((e, i) =>
          i > this.idx_from_sigl && e.startsWith("LOC"));
        this.idx_to_sigl = this.idx_from_loc
        this.idx_from_date_t = row.findIndex((e, i) =>
          i > this.idx_from_loc_t && e.startsWith("DAT"));
        this.idx_to_loc_t = this.idx_from_date_t
        this.idx_to_dte_t = row.length;

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
      addQueryCondition: function (column, values) {
        const r = [column, values];
        this.where_values.push(r)
      }
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