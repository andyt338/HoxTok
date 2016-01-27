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

  var svg = d3.select("#sortablebarchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var e = document.getElementById("category4");
  var e1 = document.getElementById("category5");
  var category = e.options[e.selectedIndex].value;
  var player = e1.options[e1.selectedIndex].value;

  d3.tsv("/data/steelers/receiving.txt", function(error, data) {

    data.forEach(function(d) {
      if (d.name==player) {
        if (category == "rec") d.frequency =+ d.rec;
        else if (category == "yds") d.frequency =+ d.yds;
        else if (category == "td") d.frequency =+ d.td;
        else if (category == "lg") d.frequency =+ d.lg;
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

    d3.select("input").on("change", change);

    var sortTimeout = setTimeout(function() {
      d3.select("input").property("checked", false).each(change);
    }, 2000);

    function change() {
      clearTimeout(sortTimeout);

      var x0 = x.domain(data.sort(this.checked
          ? function(a, b) { return b.frequency - a.frequency; }
          : function(a, b) { return a.week - b.week; })
          .map(function(d) { return d.week; }))
          .copy();

      svg.selectAll(".bar")
          .sort(function(a, b) { return x0(a.week) - x0(b.week); });

      var transition = svg.transition().duration(750),
          delay = function(d, i) { return i * 10; };

      transition.selectAll(".bar")
          .delay(delay)
          .attr("x", function(d) { return x0(d.week); });

      transition.select(".x.axis")
          .call(xAxis)
        .selectAll("g")
          .delay(delay);
    }
  });
}

run();

function updateData() {

  var savedData = [];
  var count = 0;

  var e = document.getElementById("category4");
  var e1 = document.getElementById("category5");
  var category = e.options[e.selectedIndex].value;
  var player = e1.options[e1.selectedIndex].value;

  d3.tsv("/data/steelers/receiving.txt", function(error, data) {

    data.forEach(function(d) {
      if (d.name==player) {
        if (category == "rec") {
          d.frequency =+ d.rec;
          savedData[count++] = d.frequency;
        }
        else if (category == "yds") {
          d.frequency =+ d.yds; 
          savedData[count++] = d.frequency;
        }
        else if (category == "td") {
          d.frequency =+ d.td;
          savedData[count++] = d.frequency;
        }
        else if (category == "lg") {
          d.frequency =+ d.lg;
          savedData[count++] = d.frequency;
        }
      }
      else 
        d.frequency = 0;
    });

    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    var svg = d3.select("#sortablebarchart").transition();
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


