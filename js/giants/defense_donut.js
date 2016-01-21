var week3 = 1;
var stats3 = [];
var e3 = document.getElementById("category3");
var cat3 = e3.options[e3.selectedIndex].value;
var temp3 = 0;
var count3 = 0;

function selectData3() {
	var defenseStats = [];
	
	defenseStats.push({week:50,name:"L. Collins",t:0,a:0,sck:0,int:0,ff:0,color:"#3f77c4"});
	defenseStats.push({week:50,name:"J. Casillas",t:0,a:0,sck:0,int:0,ff:0,color:"#f4aa2f"});
	defenseStats.push({week:50,name:"P. Amukamara",t:0,a:0,sck:0,int:0,ff:0,color:"#a58fd5"});
	defenseStats.push({week:50,name:"D. Rodgers-Cromartie",t:0,a:0,sck:0,int:0,ff:0,color:"#08b258"});
	defenseStats.push({week:50,name:"J. Brinkley",t:0,a:0,sck:0,int:0,ff:0,color:"#460687"});
	defenseStats.push({week:50,name:"C. Dahl",t:0,a:0,sck:0,int:0,ff:0,color:"#8057b8"});
	defenseStats.push({week:50,name:"B. Meriweather",t:0,a:0,sck:0,int:0,ff:0,color:"#ec7b7a"});
	defenseStats.push({week:50,name:"T. Wade",t:0,a:0,sck:0,int:0,ff:0,color:"#746f83"});
	defenseStats.push({week:50,name:"U. Unga",t:0,a:0,sck:0,int:0,ff:0,color:"#377275"});
	defenseStats.push({week:50,name:"D. Kennard",t:0,a:0,sck:0,int:0,ff:0,color:"#64d399"});
	defenseStats.push({week:50,name:"K. Wynn",t:0,a:0,sck:0,int:0,ff:0,color:"#88649f"});
	defenseStats.push({week:50,name:"R. Ayers",t:0,a:0,sck:0,int:0,ff:0,color:"#ee5894"});
	defenseStats.push({week:50,name:"J. Thomas",t:0,a:0,sck:0,int:0,ff:0,color:"#f491cf"});
	defenseStats.push({week:50,name:"J. Hosley",t:0,a:0,sck:0,int:0,ff:0,color:"#343fdb"});
	defenseStats.push({week:50,name:"T. McBride",t:0,a:0,sck:0,int:0,ff:0,color:"#2e9b37"});
	defenseStats.push({week:50,name:"J. Hankins",t:0,a:0,sck:0,int:0,ff:0,color:"#0a36c8"});
	defenseStats.push({week:50,name:"J. Pierre-Paul",t:0,a:0,sck:0,int:0,ff:0,color:"#293e67"});
	defenseStats.push({week:50,name:"J. Bromley",t:0,a:0,sck:0,int:0,ff:0,color:"#fb421d"});
	defenseStats.push({week:50,name:"M. Herzlich",t:0,a:0,sck:0,int:0,ff:0,color:"#3ba314"});
	defenseStats.push({week:50,name:"C. Jenkins",t:0,a:0,sck:0,int:0,ff:0,color:"#8aab20"});
	defenseStats.push({week:50,name:"G. Selvie",t:0,a:0,sck:0,int:0,ff:0,color:"#06bb4c"});
	defenseStats.push({week:50,name:"J. Beason",t:0,a:0,sck:0,int:0,ff:0,color:"#39b392"});
	defenseStats.push({week:50,name:"M. Kuhn",t:0,a:0,sck:0,int:0,ff:0,color:"#1bb959"});
	defenseStats.push({week:50,name:"C. Taylor",t:0,a:0,sck:0,int:0,ff:0,color:"#a98008"});
	defenseStats.push({week:50,name:"D. Harris",t:0,a:0,sck:0,int:0,ff:0,color:"#fef5ed"});
	defenseStats.push({week:50,name:"O. Darkwa",t:0,a:0,sck:0,int:0,ff:0,color:"#72cefb"});
	defenseStats.push({week:50,name:"N. Whitlock",t:0,a:0,sck:0,int:0,ff:0,color:"#93383c"});
	defenseStats.push({week:50,name:"Z. DeOssie",t:0,a:0,sck:0,int:0,ff:0,color:"#08ea51"});
	defenseStats.push({week:50,name:"M. Hughes",t:0,a:0,sck:0,int:0,ff:0,color:"#aab1e5"});
	defenseStats.push({week:50,name:"G. Davis",t:0,a:0,sck:0,int:0,ff:0,color:"#6094da"});
	defenseStats.push({week:50,name:"T. Jacobs",t:0,a:0,sck:0,int:0,ff:0,color:"#c5a9c4"});
	defenseStats.push({week:50,name:"O. Odighizuwa",t:0,a:0,sck:0,int:0,ff:0,color:"#26fb1e"});
	defenseStats.push({week:50,name:"A. Williams",t:0,a:0,sck:0,int:0,ff:0,color:"#611501"});
	defenseStats.push({week:50,name:"J. Pugh",t:0,a:0,sck:0,int:0,ff:0,color:"#5e9aee"});
	defenseStats.push({week:50,name:"B. Bars",t:0,a:0,sck:0,int:0,ff:0,color:"#e4201b"});
	defenseStats.push({week:50,name:"J. Morris",t:0,a:0,sck:0,int:0,ff:0,color:"#8053c4"});
	defenseStats.push({week:50,name:"B. Hart",t:0,a:0,sck:0,int:0,ff:0,color:"#c366f1"});
	defenseStats.push({week:50,name:"W. Tye",t:0,a:0,sck:0,int:0,ff:0,color:"#a53edd"});
	defenseStats.push({week:50,name:"B. Wing",t:0,a:0,sck:0,int:0,ff:0,color:"#f9a65d"});
	defenseStats.push({week:50,name:"O. Beckham",t:0,a:0,sck:0,int:0,ff:0,color:"#948791"});
	defenseStats.push({week:50,name:"S. Vereen",t:0,a:0,sck:0,int:0,ff:0,color:"#1bdc48"});
	defenseStats.push({week:50,name:"L. Donnell",t:0,a:0,sck:0,int:0,ff:0,color:"#2c23e3"});
	defenseStats.push({week:50,name:"J. Cunningham",t:0,a:0,sck:0,int:0,ff:0,color:"#cf2348"});
	defenseStats.push({week:50,name:"E. Flowers",t:0,a:0,sck:0,int:0,ff:0,color:"#fa1248"});
	defenseStats.push({week:50,name:"G. Schwartz",t:0,a:0,sck:0,int:0,ff:0,color:"#2cd122"});
	defenseStats.push({week:50,name:"L. McFadden",t:0,a:0,sck:0,int:0,ff:0,color:"#2ac248"});
	defenseStats.push({week:50,name:"J. Brown",t:0,a:0,sck:0,int:0,ff:0,color:"#2a3248"});

	var newDefenseStats = newWeeklyArray3(defenseStats);

	return newDefenseStats.map(function(d) {
		if(cat3=="t"){
			return {label:d.name, value:d.t, color:d.color};
		}
		else if(cat3=="a"){
			return {label:d.name, value:d.a, color:d.color};
		}
		else if(cat3=="sck"){
			return {label:d.name, value:d.sck, color:d.color};
		}
		else if(cat3=="int"){
			return {label:d.name, value:d.int, color:d.color};
		}
		else if(cat3=="ff"){
			return {label:d.name, value:d.ff, color:d.color};
		}
	});
}

function newWeeklyArray3(array) {
	var newWeeklyArray = array;
	if (week3 == 11) week3 = 12;
	for (var i = 0; i < newWeeklyArray.length; i++) {
		for (var j = temp3; j < (temp3 + newWeeklyArray.length); j++) {
			if (stats3[j] && newWeeklyArray[i].name == stats3[j].name && stats3[j].week == week3){
				count3++;
				newWeeklyArray[i].t = stats3[j].t;
				newWeeklyArray[i].a = stats3[j].a;
				newWeeklyArray[i].sck = stats3[j].sck;
				newWeeklyArray[i].int = stats3[j].int;
				newWeeklyArray[i].ff = stats3[j].ff;
				newWeeklyArray[i].week = week3;
				break;
			}
		}
	}
	if (week3 >= 17){
		temp3 = 0;
		count3 = 0;
	}
	else{
		temp3 = count3;
	}
	return newWeeklyArray;
}

function changeData3() {
	e3 = document.getElementById("category3");
	cat3 = e3.options[e3.selectedIndex].value;
	Donut3D.transition("defenseDonut", selectData3(), 130, 100, 30, 0.4);
	document.getElementById("displayWeek3").innerHTML = "Week " + week3;
	if (week3 < 17) {
		week3++;
	}
	else {
		week3 = 1;
	}
}

d3.tsv("/data/giants/defense.txt", function(data) {
	stats3 = data;
	var svg = d3.select("#donut3d3").append("svg").attr("width",300).attr("height",285);
	svg.append("g").attr("id","defenseDonut");
	Donut3D.draw("defenseDonut", selectData3(), 150, 150, 130, 100, 30, 0.4);
	document.getElementById("displayWeek3").innerHTML = "Week " + week3;
	week3++;
});
