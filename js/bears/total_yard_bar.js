function run() {

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 1100 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
   
  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.4);
   
  var x1 = d3.scale.ordinal();
   
  var y = d3.scale.linear()
      .range([height, 0]);
   
  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");
   
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));
   
  var color = d3.scale.ordinal()
      .range(["#03202F", "#DD4814", "#BFBCBC","#FFFFFF"]);
   
  var svg = d3.select("#total_yard_chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  var yBegin;
   
  var innerColumns = {
    "column2" : ["Rushing","Passing"],
    "column3" : ["Opp. Rushing", "Opp. Passing"]
  }
   
  d3.csv("/data/bears/total_yards.txt", function(error, data) {
    var columnHeaders = d3.keys(data[0]).filter(function(key) { return key !== "Week"; });
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Week"; }));
    data.forEach(function(d) {
      var yColumn = new Array();
      d.columnDetails = columnHeaders.map(function(name) {
        for (ic in innerColumns) {
          if($.inArray(name, innerColumns[ic]) >= 0){
            if (!yColumn[ic]){
              yColumn[ic] = 0;
            }
            yBegin = yColumn[ic];
            yColumn[ic] += +d[name];
            return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
          }
        }
      });
      d.total = d3.max(d.columnDetails, function(d) { 
        return d.yEnd; 
      });
    });
   
    x0.domain(data.map(function(d) { return d.Week; }));
    x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);
   
    y.domain([0, d3.max(data, function(d) { 
      return d.total; 
    })]);

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
        .text("yards");
   
    var project_stackedbar = svg.selectAll(".project_stackedbar")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.Week) + ",0)"; });
   
    project_stackedbar.selectAll("rect")
        .data(function(d) { return d.columnDetails; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { 
          return x1(d.column);
           })
        .attr("y", function(d) { 
          return y(d.yEnd); 
        })
        .attr("height", function(d) { 
          return y(d.yBegin) - y(d.yEnd); 
        })
        .style("fill", function(d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(columnHeaders.slice())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   
    legend.append("rect")
        .attr("x", width - 18)
        .attr("y", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
   
    legend.append("text")
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
   
  });
}
run();
