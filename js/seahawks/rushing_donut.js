var week1 = 1;
var stats1 = [];
var e1 = document.getElementById("category1");
var cat1 = e1.options[e1.selectedIndex].value;
var temp1 = 0;
var count1 = 0;

function selectData1() {
	var rushingStats = [];
	
	rushingStats.push({week1:50, name:"T. Rawls", att:0, yds:0, td:0, lg:0, color:"#ef3c42"});
	rushingStats.push({week1:50, name:"M. Lynch", att:0, yds:0, td:0, lg:0, color:"#52c67f"});
	rushingStats.push({week1:50, name:"R. Wilson", att:0, yds:0, td:0, lg:0, color:"#dff429"});
	rushingStats.push({week1:50, name:"C. Michael", att:0, yds:0, td:0, lg:0, color:"#3f77c4"});
	rushingStats.push({week1:50, name:"F. Jackson", att:0, yds:0, td:0, lg:0, color:"#f4aa2f"});
	rushingStats.push({week1:50, name:"B. Brown", att:0, yds:0, td:0, lg:0, color:"#f25e40"});
	rushingStats.push({week1:50, name:"D. Coleman", att:0, yds:0, td:0, lg:0, color:"#fad435"});
	rushingStats.push({week1:50, name:"T. Jackson", att:0, yds:0, td:0, lg:0, color:"#79c725"});
	rushingStats.push({week1:50, name:"T. Lockett", att:0, yds:0, td:0, lg:0, color:"#ffff2d"});
	rushingStats.push({week1:50, name:"W. Tukuafu", att:0, yds:0, td:0, lg:0, color:"#f2823a"});
	rushingStats.push({week1:50, name:"K. Williams", att:0, yds:0, td:0, lg:0, color:"#a7d52a"});
	rushingStats.push({week:50, name:"D. Harris", att:0, yds:0, td:0, lg:0, color:"#7328b6"});
	rushingStats.push({week:50, name:"R. Smith", att:0, yds:0, td:0, lg:0, color:"#c32a94"});

	var newRushingStats = newWeeklyArray1(rushingStats);

	return newRushingStats.map(function(d) {
		if(cat1=="att"){
			return {label:d.name, value:d.att, color:d.color};
		}
		else if(cat1=="yds"){
			return {label:d.name, value:d.yds, color:d.color};
		}
		else if(cat1=="td"){
			return {label:d.name, value:d.td, color:d.color};
		}
		else if(cat1=="lg"){
			return {label:d.name, value:d.lg, color:d.color};
		}
	});
}

function newWeeklyArray1(array) {
	var newWeeklyArray = array;
	if (week1 == 9) week1 = 10;
	for (var i = 0; i < newWeeklyArray.length; i++) {
		for (var j = temp1; j < (temp1 + newWeeklyArray.length); j++) {
			if (stats1[j] && newWeeklyArray[i].name == stats1[j].name && stats1[j].week1 == week1){
				count1++;
				newWeeklyArray[i].att = stats1[j].att;
				newWeeklyArray[i].yds = stats1[j].yds;
				newWeeklyArray[i].td = stats1[j].td;
				newWeeklyArray[i].lg = stats1[j].lg;
				newWeeklyArray[i].week1 = week1;
				break;
			}
		}
	}
	if (week1 >= 17){
		temp1 = 0;
		count1 = 0;
	}
	else{
		temp1 = count1;
	}
	return newWeeklyArray;
}

function changeData1() {
	e1 = document.getElementById("category1");
	cat1 = e1.options[e1.selectedIndex].value;
	Donut3D.transition("rushingDonut", selectData1(), 130, 100, 30, 0.4);
	document.getElementById("displayWeek1").innerHTML = "Week " + week1;
	if (week1 < 17) {
		week1++;
	}
	else {
		week1 = 1;
	}
}

d3.tsv("/data/seahawks/rushing.txt", function(data) {
	stats1 = data;
	var svg = d3.select("#donut3d1").append("svg").attr("width",300).attr("height",285);
	svg.append("g").attr("id","rushingDonut");
	Donut3D.draw("rushingDonut", selectData1(), 150, 150, 130, 100, 30, 0.4);
	document.getElementById("displayWeek1").innerHTML = "Week " + week1;
	week1++;
});
