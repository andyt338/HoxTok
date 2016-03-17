var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span>" + d.Team + ": </span> <span style='color:red'>" + d.frequency + "</span>";
  })

function run() {

  var svg = d3.select("#totalOffense").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  var e = document.getElementById("totalOffenseCategory");
  var category = e.options[e.selectedIndex].value;

  d3.csv("/data/miscellaneous_data/total_offense_2015.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.Team; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("fill", "white")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
          .style("text-anchor", "end")
          .attr("dx", "-1em")
          .attr("dy", "-.2em")
          .attr("transform", function(d) {
              return "rotate(-65)" 
          });

    svg.append("g")
        .attr("class", "y axis")
        .attr("fill", "white")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "white")
        .text("Frequency");

    svg.selectAll(".bar_totalOffense")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar_totalOffense")
        .attr("x", function(d) { return x(d.Team); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

  });

  function type(d) {
    if (category == "Pts/G") d.frequency =+ d.Pts_Per_G;
    else if (category == "Tot Pts") d.frequency =+ d.Tot_Pts;
    else if (category == "Scrm Plys") d.frequency =+ d.Scrm_Plys;
    else if (category == "Yds/G") d.frequency =+ d.Yds_Per_G;
    else if (category == "Yds/P") d.frequency =+ d.Yds_Per_P;
    else if (category == "1st/G") d.frequency =+ d.First_Per_G;
    else if (category == "3rd Md") d.frequency =+ d.Third_Md;
    else if (category == "3rd Att") d.frequency =+ d.Third_Att;
    else if (category == "3rd Pct") d.frequency =+ d.Third_Pct;
    else if (category == "4th Md") d.frequency =+ d.Fourth_Md;
    else if (category == "4th Att") d.frequency =+ d.Fourth_Att;
    else if (category == "4th Pct") d.frequency =+ d.Fourth_Pct;
    else if (category == "Pen") d.frequency =+ d.Pen;
    else if (category == "Pen Yds") d.frequency =+ d.Pen_Yds;
    else if (category == "ToP/G") d.frequency =+ d.ToP_Per_G;
    else if (category == "FUM") d.frequency =+ d.FUM;
    else if (category == "Lost") d.frequency =+ d.Lost;
    else if (category == "TO") d.frequency =+ d.TO;

    return d;
  }

}

run();

function run1(){

  var savedData = [];
  var count = 0;

  var e = document.getElementById("totalOffenseCategory");
  var category = e.options[e.selectedIndex].value;

  console.log(category);

  d3.csv("/data/miscellaneous_data/total_offense_2015.csv", function(error, data) {

    data.forEach(function(d) {
      if (category == "Pts/G") d.frequency =+ d.Pts_Per_G;
      else if (category == "Tot Pts") d.frequency =+ d.Tot_Pts;
      else if (category == "Scrm Plys") d.frequency =+ d.Scrm_Plys;
      else if (category == "Yds/G") d.frequency =+ d.Yds_Per_G;
      else if (category == "Yds/P") d.frequency =+ d.Yds_Per_P;
      else if (category == "1st/G") d.frequency =+ d.First_Per_G;
      else if (category == "3rd Md") d.frequency =+ d.Third_Md;
      else if (category == "3rd Att") d.frequency =+ d.Third_Att;
      else if (category == "3rd Pct") d.frequency =+ d.Third_Pct;
      else if (category == "4th Md") d.frequency =+ d.Fourth_Md;
      else if (category == "4th Att") d.frequency =+ d.Fourth_Att;
      else if (category == "4th Pct") d.frequency =+ d.Fourth_Pct;
      else if (category == "Pen") d.frequency =+ d.Pen;
      else if (category == "Pen Yds") d.frequency =+ d.Pen_Yds;
      else if (category == "ToP/G") d.frequency =+ d.ToP_Per_G;
      else if (category == "FUM") d.frequency =+ d.FUM;
      else if (category == "Lost") d.frequency =+ d.Lost;
      else if (category == "TO") d.frequency =+ d.TO;

      savedData[count++] = d.frequency;
    });

    function determineDomain() {
      if (category == "TO") {y.domain([-25, d3.max(data, function(d) { return d.frequency; })]);}
      else {y.domain([0, d3.max(data, function(d) { return d.frequency; })]);}
    }

    x.domain(data.map(function(d) { return d.Team; }));
    determineDomain();
    var svg = d3.select("#totalOffense").transition();
    count = 0;
    
    svg.selectAll(".bar_totalOffense")    
      .attr("x", function(d) { return x(d.Team); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { 
          d.frequency =+ savedData[count++];
          return y(d.frequency);
        })
      .attr("height", function(d) {
          return height - y(d.frequency); 
      });
            
    svg.select(".y.axis")
        .duration(750)
        .call(yAxis);
  });

}