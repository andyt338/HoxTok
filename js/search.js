var dat0;
var dat1 = [];

$(document).ready(function() {

  d3.text('/data/miscellaneous_data/season2015.csv', function(data){
    dat0 = d3.csv.parseRows(data);
    dat0 = dat0.filter(function(el, index) {
      return index % 2 === 0;
    });
  
    for (var i=0; i < dat0.length; i++){
      dat1[i] = dat0[i][0];
    }
/*    for (var i=0; i < dat0.length; i++){
      dat1[i] = dat1[i].slice(0, 2) + " " + dat1[i].slice(2);
    }*/
    dat1[0] = " ";

    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
        cb(matches);
      };
    };

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'dat1',
      source: substringMatcher(dat1)
    });


  })

});

function searchPlayer() {

  var x = document.getElementById("player").value;
  for (var i=0; i<dat1.length; i++){
    if (dat1[i] == x)
    {

      var string;

      if (dat0[i][4] == "QB"){
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" + "CMP: " + ((dat0[i][30]/dat0[i][29])*100).toFixed(1) + "%" + " YDS: " + dat0[i][35] + " TD: " + dat0[i][32] + " INT: " + dat0[i][31];
      }
      else if (dat0[i][4] == "RB"){
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" + " CAR: " + dat0[i][53] + " YDS: " + dat0[i][59] + " YPC: " + (dat0[i][59]/dat0[i][53]).toFixed(1) + " TD: " + dat0[i][56] + "<br />" + " REC: " + dat0[i][48] + " YDS: " + dat0[i][52] + " YPR: " + (dat0[i][52]/dat0[i][48]).toFixed(1) + " TD: " + dat0[i][49];
      }
      else if (dat0[i][4] == "WR" || dat0[i][4] == "TE"){
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" + " REC: " + dat0[i][48] + " YDS: " + dat0[i][52] + " YPR: " + (dat0[i][52]/dat0[i][48]).toFixed(1) + " TD: " + dat0[i][49];
      }
      else if (dat0[i][4] == "K"){
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" + " FG: " +  dat0[i][16] + "/" + dat0[i][15] +  ", " + ((dat0[i][16]/dat0[i][15])*100).toFixed(1) + "%" + " XP: " +  dat0[i][21] + "/" + dat0[i][19] +  ", "+ ((dat0[i][21]/dat0[i][19])*100).toFixed(1) + "%";
      }
      else if (dat0[i][4] == "P"){
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" + /*" PUNT AVG: " + dat0[i][36] + " PUNT I20: " + dat0[i][37] + " PUNT LNG: " + dat0[i][38]*/ "no stats available";
      }
      else{
        string = dat1[i] + " " + dat0[i][3] + " " + dat0[i][4] + "<br />" +  " TKL: " + dat0[i][9] + " AST: " + dat0[i][5] + " SCK: " + dat0[i][8]  + " INT: " + dat0[i][7] + " FF: " + dat0[i][6];
      }

/*         = dat0[i][0] + " " + dat0[i][3] + " " + dat0[i][4] + " AST: " + dat0[i][5] + " FFUM: " + dat0[i][6] + " INT: " + dat0[i][7] + " SCK: " + dat0[i][8] + " TKL: " + dat0[i][9] + " FUMBLES LOST: " + dat0[i][10] + " FUMBLES RCV: " + dat0[i][11] + " FUMBLES TOT: " + dat0[i][12] + " FUMBLES TRCV: " + dat0[i][13] + " FUMBLE YDS: " + dat0[i][14] + " FGA: " + dat0[i][15] + " FGM: " + dat0[i][16] + " FG YDS: " + dat0[i][17] + " FG TOT PTS: " + dat0[i][18] + " XPA: " + dat0[i][19] + " XPB: " + dat0[i][20] + " XP MADE: " + dat0[i][21] + " XP MISSED: " + dat0[i][22] + " XP TOT: " + dat0[i][23] + " KR AVG: " + dat0[i][24] + " KR LNG: " + dat0[i][25] + " KR LNG TD: " + dat0[i][26] + " KR RET: " + dat0[i][27] + " KR TD: " + dat0[i][28] + " ATT: " + dat0[i][29] + " CMP: " + dat0[i][30] + " INT: " + dat0[i][31] + " PASS TD: " + dat0[i][32] + " PASS TWO PT ATT: " + dat0[i][33] + " PASS TWO PT MADE: " + dat0[i][34] + " PASS YDS: " + dat0[i][35] + " PUNT AVG: " + dat0[i][36] + " PUNT I20: " + dat0[i][37] + " PUNT LNG: " + dat0[i][38] + " PUNT PTS: " + dat0[i][39] + " PUNT YDS: " + dat0[i][40] + " PR AVG: " + dat0[i][41] + " PR LNG: " + dat0[i][42] + " KR LNG TD: " + dat0[i][43] + " PR RET: " + dat0[i][44] + " PR TD: " + dat0[i][45] + " REC LNG: " + dat0[i][46] + " REC LNG TD: " + dat0[i][47] + " REC REC: " + dat0[i][48] + " REC TD: " + dat0[i][49] + " REC TWO PT ATT: " + dat0[i][50] + " REC TWO PT MADE: " + dat0[i][51] + " REC YDS: " + dat0[i][52] + " RUSH ATT: " + dat0[i][53] + " RUSH LNG: " + dat0[i][54] + " RUSH LNG TD: " + dat0[i][55] + " RUSH TD: " + dat0[i][56] + " RUSH TWO PT ATT: " + dat0[i][57] + " RUSH TWO PT MADE: " + dat0[i][58] + " RUSH YDS: " + dat0[i][59];
*/
      document.getElementById("displayData").innerHTML = "<br />" + string;

    }
  }

}