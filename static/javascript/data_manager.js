
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
 
34: DATE.0
35: DATE.1
36: DATE.2
*/

"use strict"


  // var D_M = (function () {
  ; (function () {

    const FORMA = 0, LEMMA = 1, ETIMO = 2, SIGL = 26,
      POS = 6, FUNCT = 7, LANG = 4, DATE = 5;

    const DM = {
      dict_rows: [],
      dict_heads: [],
      dict_map_columns: {},
      rslt_rows: [],
      rslt_heads: [],
      row_eof: "##",
      token_list: {},
      token_selected: [],
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
          const columns = this.dict_heads.map(x => x.toLowerCase());
          this.dict_map_columns = columns.reduce((acc, element, index) => {
            acc[element] = index;
            return acc;
          }, {});
          this.dict_rows.shift();
          // setta l'arry di righe del result set
          this.dictToResultSet();
        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      dictToResultSet: function () {
        const row = this.dict_heads;
        const i0_attrs = 8;
        const i0_sigls = row.findIndex((e, i) => i > 20 && e.length == 1);
        const i0_locts = row.findIndex((e, i) => i > i0_sigls && e.startsWith("LOC"));
        const i0_datets = row.findIndex((e, i) => i > i0_locts && e.startsWith("DAT"));

        // intestazione resultset
        this.rslt_heads = this.dict_heads.slice(0, i0_attrs);
        this.rslt_heads.push("MSD");
        this.rslt_heads.push("SIGL.");
        this.rslt_heads.push("LOC.");
        this.rslt_heads.push("DATE");

        const dict2rslt = (r) => {
          const r0 = r.slice(0, i0_attrs);
          let row = Array.from(r0);
          // attrs
          let arr = r.slice(i0_attrs, i0_sigls);
          let s = arr.filter(x => x !== '').join(',');
          row.push(s);
          // sigls
          arr = r.slice(i0_sigls, i0_locts);
          s = arr.filter(x => x !== '').join(',');
          row.push(s);
          // locts
          arr = r.slice(i0_locts, i0_datets);
          s = arr.filter(x => x !== '').join(',');
          row.push(s);
          // datets
          arr = r.slice(i0_datets);
          s = arr.filter(x => x !== '').join(',');
          row.push(s);
          return row;
        }
        this.rslt_rows = [];
        for (const row of this.dict_rows) {
          const r = dict2rslt(row);
          this.rslt_rows.push(r);
        }
      },
      findIndices: function (js) {

        const match = (ptrn, str) => {
          if (ptrn == "") return true;
          const esc = ptrn.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
          const rgx = esc.replace(/\\\*/g, ".*");
          const p = rgx.replace(/\\\?/g, ".");
          const regex = new RegExp(`^${p}$`);
          return regex.test(str);
        }

        const indices = [];
        const dle = this.dict_rows.length;
        for (let i = 0; i < dle; i++) {
          const row = this.dict_rows[i].map(x => x.toLowerCase());
          let ok = true;

          let s = js.forma[1];
          if (s != '') {
            const c = js.forma[0];
            const v = row[c];
            ok = match(s, v);
          }
          if (!ok) continue;

          s = js.lemma[1];
          if (s != '') {
            const c = js.lemma[0];
            const v = row[c];
            const ok = match(s, v);
          }
          if (!ok) continue;

          s = js.etimo[1];
          if (s != '') {
            const c = js.etimo[0];
            const v = row[c];
            ok = match(s, v);
          }
          if (!ok) continue;

          //SIGL
          for (const cs of js.sigls) {
            const c = cs[0];
            const s = cs[1];
            const v = row[c];
            if (s != '' && s != v) {
              ok = false;
              break;
            }
          }
          if (!ok) continue;

          for (const cs of js.locts) {
            const c = cs[0];
            const s = cs[1];
            const v = row[c];
            if (s != '' && s != v) {
              ok = false;
              break;
            }
          }
          if (!ok) continue;

          for (const cs of js.datets) {
            const c = cs[0];
            const s = cs[1];
            const v = row[c];
            if (s != '' && s != v) {
              ok = false;
              break;
            }
          }
          if (!ok) continue;

          let arr = js.functs[1];
          if (arr.length > 0) {
            const c = js.functs[0];
            const v = row[c];
            if (!arr.includes(v)) {
              ok = false;
            }
          }
          if (!ok) continue;

          arr = js.langs[1];
          if (arr.length > 0) {
            const c = js.langs[0];
            const v = row[c];
            if (!arr.includes(v)) {
              ok = false;
            }
          }
          if (!ok) continue;

          arr = js.dates[1];
          if (arr.length > 0) {
            const c = js.dates[0];
            const v = row[c];
            if (!arr.includes(v)) {
              ok = false;
            }
          }
          if (!ok) continue;


          arr = js.pos[1];
          if (arr.length > 0) {
            const c = js.pos[0];
            const v = row[c];
            if (!arr.includes(v)) {
              ok = false;
            }
          }
          if (!ok) continue;

          arr = js.msd_attrs;
          if (arr.length > 0)
            for (const css of arr) {
              const c = css[0];
              const ss = css[1];
              const v = row[c];
              if (!ss.includes(v)) {
                ok = false;
                break;
              }
            }
          if (!ok) continue;

          if (ok)
            indices.push(i);
        }

        return indices;
      },
      allRsltRows: function () {
        const le = this.dict_rows.length;
        const rows = [];
        for (let i = 0; i < le; i++)
          rows.push(this.rslt_rows[i]);
        return rows;
      },
      findRsltRows: function (js) {
        const idxs = this.findIndices(js);
        const rows = [];
        for (const i of idxs)
          rows.push(this.rslt_rows[i]);
        return rows;
      },
      findDictRows: function (js) {
        const idxs = this.findIndices(js);
        const rows = [];
        for (const i of idxs)
          rows.push(this.dict_rows[i]);
        return rows;
      },
      setQueryConditions: function () {
        const js = {
          "forma": [],//[col,str]
          "lemma": [],
          "etimo": [],

          "sigls": [],//[[col0,str0],[col1,str1], ..]
          "locts": [],
          "datets": [],

          "functs": [],//[col,[str0,str1,..] ]
          "langs": [],
          "dates": [],

          "pos": [], //[col,[str0,str1,..]]

          "msd_attrs": []  //[col0,[str0,str1,..],[col1,[s0,s1,..],..]]
        }
        // gestione opzioni inpput forma,lemma,etimo
        js.forma = [FORMA, VS.forma];
        js.lemma = [LEMMA, VS.lemma];
        js.etimo = [ETIMO, VS.etimo];

        // sigls
        let les = VS.sigl.sigls.length;
        let i0 = SIGL;
        let rs = [];
        for (let i = 0; i < les; i++) {
          const r = [i + i0, VS.sigl.sigls[i]];
          rs.push(r);
        }
        js.sigls = rs;

        // locts
        let lel = VS.sigl.locts.length;
        let i1 = i0 + les;
        rs = [];
        for (let i = 0; i < lel; i++) {
          const r = [i + i1, VS.sigl.locts[i]];
          rs.push(r);
        }
        js.locts = rs;

        // datets 
        let led = VS.sigl.datets.length;
        let i2 = i1 + lel;
        rs = [];
        for (let i = 0; i < led; i++) {
          const r = [i + i2, VS.sigl.datets[i]];
          rs.push(r);
        }
        js.datets = rs;

        // functs
        js.functs = [FUNCT, VS.funct.functs];

        // angs,dates
        js.langs = [LANG, VS.lang_date.langs];
        js.dates = [DATE, VS.lang_date.dates];

        // gestone filtro POS MSD attrs
        let pos_arr = [];
        rs = []
        for (let row of VS.msd_attrs) {
          row = row.map(x => x.toLowerCase());
          const xy = row[0].split("_");
          const pos = xy[0];
          const msd = xy[1].toLowerCase();
          const attrs = row.slice(1);
          const col = this.dict_map_columns[msd];
          const r = [col, attrs]
          rs.push(r);
          if (pos_arr.indexOf(pos) < 0)
            pos_arr.push(pos);
        }
        js.pos = [POS, pos_arr]
        js.msd_attrs = rs;

        let s = JSON.stringify(js).toLowerCase();
        return JSON.parse(s);
      },
      load_token_csv: async function (token_name) {
        const url = `ula_data/data_export/${token_name}`;
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
          // forma|key|sigla ritoena l'array delle
          return rows.map((item) => item.split("|")[1]);
        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      load_tokens: async function (token_name) {
        const url = `ula_data/data_export/token_list.txt`;
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
          const names = data.trim().split("\n");
          this.token_list = {};
          for (const name of names) {
            const arr = await this.load_token_csv(name);
            // eps19.g.ula.csv => eps0.g
            const key = name.split('.').slice(0, 2).join('.')
            this.token_list[key] = arr;
          }
        } catch (error) {
          alert(`Errror:${url}\n ${error}`);
          throw error;
        }
      },
      findContextIndices: function (formakey, token_name) {
        const arr = this.token_list[token_name];
        const index_selectedes = arr.reduce((indexes, value, index) => {
          if (value === formakey) {
            indexes.push(index);
          }
          return indexes;
        }, []);
        return index_selectedes;
      },
      findContextRows: function (formakey, token_name) {

        const leftIndexOf = function (arr, element, from) {
          for (let i = from; i >= 0; i--)
            if (arr[i] === element)
              return i;
          return -1;
        }
        const indexs = this.findContextIndices(formakey, token_name);
        const arr = D_M.token_list[token_name];
        const text_rows = [];
        for (const i of indexs) {
          const i0 = leftIndexOf(arr, "##", i) + 1;
          const ir = arr.indexOf("##", i);
          const row = arr.slice(i0, ir);
          row.unshift(`${i}`);
          text_rows.push(row);
          // const text_row=row.join("  ");
          // text_rows.push(text_row);
        }
        return text_rows;
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