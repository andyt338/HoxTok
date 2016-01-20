var week = 1;
var stats = [];
var e = document.getElementById("category");
var cat = e.options[e.selectedIndex].value;
var temp = 0;
var count = 0;

function selectData() {
	var receivingStats = [];

	receivingStats.push({week:50, name:"R. Cobb", rec:0, yds:0, td:0, lg:0, color:"#ef3c42"});
	receivingStats.push({week:50, name:"R. Rodgers", rec:0, yds:0, td:0, lg:0, color:"#52c67f"});
	receivingStats.push({week:50, name:"J. Jones", rec:0, yds:0, td:0, lg:0, color:"#dff429"});
	receivingStats.push({week:50, name:"D. Adams", rec:0, yds:0, td:0, lg:0, color:"#3f77c4"});
	receivingStats.push({week:50, name:"J. Starks", rec:0, yds:0, td:0, lg:0, color:"#f4aa2f"});
	receivingStats.push({week:50, name:"E. Lacy", rec:0, yds:0, td:0, lg:0, color:"#f25e40"});
	receivingStats.push({week:50, name:"T. Montgomery", rec:0, yds:0, td:0, lg:0, color:"#fad435"});
	receivingStats.push({week:50, name:"J. Perillo", rec:0, yds:0, td:0, lg:0, color:"#79c725"});
	receivingStats.push({week:50, name:"J. Abbrederis", rec:0, yds:0, td:0, lg:0, color:"#ffff2d"});
	receivingStats.push({week:50, name:"J. Kuhn", rec:0, yds:0, td:0, lg:0, color:"#f2823a"});
	receivingStats.push({week:50, name:"A. Quarless", rec:0, yds:0, td:0, lg:0, color:"#a7d52a"});
	receivingStats.push({week:50, name:"J. Janis", rec:0, yds:0, td:0, lg:0, color:"#7328b6"});
	receivingStats.push({week:50, name:"A. Ripkowski", rec:0, yds:0, td:0, lg:0, color:"#f6c137"});

	var newReceivingStats = newWeeklyArray(receivingStats);

	return newReceivingStats.map(function(d) {
		if(cat=="rec"){
			return {label:d.name, value:d.rec, color:d.color};
		}
		else if(cat=="yds"){
			return {label:d.name, value:d.yds, color:d.color};
		}
		else if(cat=="td"){
			return {label:d.name, value:d.td, color:d.color};
		}
		else if(cat=="lg"){
			return {label:d.name, value:d.lg, color:d.color};
		}
	});
}

function newWeeklyArray(array) {
	var newWeeklyArray = array;
	if (week == 7) week = 8;
	for (var i = 0; i < newWeeklyArray.length; i++) {
		for (var j = temp; j < (temp + newWeeklyArray.length); j++) {
			if (stats[j] && newWeeklyArray[i].name == stats[j].name && stats[j].week == week){
				count++;
				newWeeklyArray[i].rec = stats[j].rec;
				newWeeklyArray[i].yds = stats[j].yds;
				newWeeklyArray[i].td = stats[j].td;
				newWeeklyArray[i].lg = stats[j].lg;
				newWeeklyArray[i].week = week;
				break;
			}
		}
	}
	if (week >= 17){
		temp = 0;
		count = 0;
	}
	else{
		temp = count;
	}
	return newWeeklyArray;
}

function changeData() {
	e = document.getElementById("category");
	cat = e.options[e.selectedIndex].value;
	Donut3D.transition("receivingDonut", selectData(), 130, 100, 30, 0.4);
	document.getElementById("displayWeek").innerHTML = "Week " + week;
	if (week < 17) {
		week++;
	}
	else {
		week = 1;
	}
}

d3.tsv("/data/packers/receiving.txt", function(data) {
	stats = data;
	var svg = d3.select("#donut3d").append("svg").attr("width",300).attr("height",285);
	svg.append("g").attr("id","receivingDonut");
	Donut3D.draw("receivingDonut", selectData(), 150, 150, 130, 100, 30, 0.4);
	document.getElementById("displayWeek").innerHTML = "Week " + week;
	week++;
});