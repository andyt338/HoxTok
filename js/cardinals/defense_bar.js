var margin = {top: 53, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 285 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

function run() {

  var svg = d3.select("#sortablebarchart3").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var e = document.getElementById("category10");
  var e1 = document.getElementById("category11");
  var category = e.options[e.selectedIndex].value;
  var player = e1.options[e1.selectedIndex].value;

  d3.tsv("/data/cardinals/defense.txt", function(error, data) {

    data.forEach(function(d) {
      if (d.name==player) {
        if (category == "t") d.frequency =+ d.t;
        else if (category == "a") d.frequency =+ d.a;
        else if (category == "sck") d.frequency =+ d.sck;
        else if (category == "int") d.frequency =+ d.int;
        else if (category == "ff") d.frequency =+ d.ff;
      }
      else 
        d.frequency = 0;
    });

    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("fill", "white")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("x", 20)
        .attr("y", 15)
        .attr("dx", ".71em")
        .attr("fill", "white")
        .style("text-anchor", "end")
        .text("week");

    svg.append("g")
        .attr("class", "y axis")
        .attr("fill", "white")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.week); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });

  });
}

run();

function updateData3() {

  var savedData = [];
  var count = 0;

  var e = document.getElementById("category10");
  var e1 = document.getElementById("category11");
  var category = e.options[e.selectedIndex].value;
  var player = e1.options[e1.selectedIndex].value;

  d3.tsv("/data/cardinals/defense.txt", function(error, data) {

    data.forEach(function(d) {
      if (d.name==player) {
        if (category == "t") {
          d.frequency =+ d.t;
          savedData[count++] = d.frequency;
        }
        else if (category == "a") {
          d.frequency =+ d.a; 
          savedData[count++] = d.frequency;
        }
        else if (category == "sck") {
          d.frequency =+ d.sck;
          savedData[count++] = d.frequency;
        }
        else if (category == "int") {
          d.frequency =+ d.int;
          savedData[count++] = d.frequency;
        }
        else if (category == "ff") {
          d.frequency =+ d.ff;
          savedData[count++] = d.frequency;
        }
      }
      else 
        d.frequency = 0;
    });

    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    var svg = d3.select("#sortablebarchart3").transition();
    count = 0;

    svg.selectAll(".bar")
      .attr("x", function(d) { return x(d.week); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { 
          if(d.name==player){
            d.frequency =+ savedData[count++];
            return y(d.frequency);
          } 
        })
      .attr("height", function(d) {
        if(d.name==player){
          return height - y(d.frequency); 
        }
      });
            
    svg.select(".x.axis")
        .duration(750)
        .call(xAxis);
    svg.select(".y.axis")
        .duration(750)
        .call(yAxis);

  });
}


