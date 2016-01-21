var week2 = 1;
var stats2 = [];
var e2 = document.getElementById("category2");
var cat2 = e2.options[e2.selectedIndex].value;
var temp2 = 0;
var count2 = 0;

function selectData2() {
	var passingStats = [];
	
	passingStats.push({week:50, name:"B. Bortles", cmp:0, att:0, yds:0, td:0, int:0, color:"#3f77c4"});
	passingStats.push({week:50, name:"B. Walters", cmp:0, att:0, yds:0, td:0, int:0, color:"#f4aa2f"});

	var newPassingStats = newWeeklyArray2(passingStats);

	return newPassingStats.map(function(d) {
		if(cat2=="cmp"){
			return {label:d.name, value:d.cmp, color:d.color};
		}
		else if(cat2=="att"){
			return {label:d.name, value:d.att, color:d.color};
		}
		else if(cat2=="yds"){
			return {label:d.name, value:d.yds, color:d.color};
		}
		else if(cat2=="td"){
			return {label:d.name, value:d.td, color:d.color};
		}
		else if(cat2=="int"){
			return {label:d.name, value:d.int, color:d.color};
		}
	});
}

function newWeeklyArray2(array) {
	var newWeeklyArray = array;
	if (week2 == 8) week2 = 9;
	for (var i = 0; i < newWeeklyArray.length; i++) {
		for (var j = temp2; j < (temp2 + newWeeklyArray.length); j++) {
			if (stats2[j] && newWeeklyArray[i].name == stats2[j].name && stats2[j].week == week2){
				count2++;
				newWeeklyArray[i].cmp = stats2[j].cmp;
				newWeeklyArray[i].att = stats2[j].att;
				newWeeklyArray[i].yds = stats2[j].yds;
				newWeeklyArray[i].td = stats2[j].td;
				newWeeklyArray[i].int = stats2[j].int;
				newWeeklyArray[i].week = week2;
				break;
			}
		}
	}
	if (week2 >= 17){
		temp2 = 0;
		count2 = 0;
	}
	else{
		temp2 = count2;
	}
	return newWeeklyArray;
}

function changeData2() {
	e2 = document.getElementById("category2");
	cat2 = e2.options[e2.selectedIndex].value;
	Donut3D.transition("passingDonut", selectData2(), 130, 100, 30, 0.4);
	document.getElementById("displayWeek2").innerHTML = "Week " + week2;
	if (week2 < 17) {
		week2++;
	}
	else {
		week2 = 1;
	}
}

d3.tsv("/data/jaguars/passing.txt", function(data) {
	stats2 = data;
	var svg = d3.select("#donut3d2").append("svg").attr("width",300).attr("height",285);
	svg.append("g").attr("id","passingDonut");
	Donut3D.draw("passingDonut", selectData2(), 150, 150, 130, 100, 30, 0.4);
	document.getElementById("displayWeek2").innerHTML = "Week " + week2;
	week2++;
});
