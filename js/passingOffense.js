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

function run4() {

  var svg = d3.select("#passingOffense").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  var e = document.getElementById("passingOffenseCategory");
  var category = e.options[e.selectedIndex].value;

  d3.csv("/data/miscellaneous_data/passing_offense_2015.csv", type, function(error, data) {
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

    svg.selectAll(".bar_passingOffense")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar_passingOffense")
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
    else if (category == "Comp") d.frequency =+ d.Comp;
    else if (category == "Att") d.frequency =+ d.Att;
    else if (category == "Pct") d.frequency =+ d.Pct;
    else if (category == "Att/G") d.frequency =+ d.Att_Per_G;
    else if (category == "Yds") d.frequency =+ d.Yds;
    else if (category == "Avg") d.frequency =+ d.Avg;
    else if (category == "Yds/G") d.frequency =+ d.Yds_Per_G;
    else if (category == "TD") d.frequency =+ d.TD;
    else if (category == "Int") d.frequency =+ d.Int;
    else if (category == "1st") d.frequency =+ d.First;
    else if (category == "1st%") d.frequency =+ d.First_Perc;
    else if (category == "Lng") d.frequency =+ d.Lng;
    else if (category == "20+") d.frequency =+ d.Twenty_Plus;
    else if (category == "40+") d.frequency =+ d.Forty_Plus;
    else if (category == "Sck") d.frequency =+ d.Sck;
    else if (category == "Rate") d.frequency =+ d.Rate;

    return d;
  }

}

run4();

function run5(){

  var savedData = [];
  var count = 0;

  var e = document.getElementById("passingOffenseCategory");
  var category = e.options[e.selectedIndex].value;

  console.log(category);

  d3.csv("/data/miscellaneous_data/passing_offense_2015.csv", function(error, data) {

    data.forEach(function(d) {
      if (category == "Pts/G") d.frequency =+ d.Pts_Per_G;
      else if (category == "Tot Pts") d.frequency =+ d.Tot_Pts;
      else if (category == "Comp") d.frequency =+ d.Comp;
      else if (category == "Att") d.frequency =+ d.Att;
      else if (category == "Pct") d.frequency =+ d.Pct;
      else if (category == "Att/G") d.frequency =+ d.Att_Per_G;
      else if (category == "Yds") d.frequency =+ d.Yds;
      else if (category == "Avg") d.frequency =+ d.Avg;
      else if (category == "Yds/G") d.frequency =+ d.Yds_Per_G;
      else if (category == "TD") d.frequency =+ d.TD;
      else if (category == "Int") d.frequency =+ d.Int;
      else if (category == "1st") d.frequency =+ d.First;
      else if (category == "1st%") d.frequency =+ d.First_Perc;
      else if (category == "Lng") d.frequency =+ d.Lng;
      else if (category == "20+") d.frequency =+ d.Twenty_Plus;
      else if (category == "40+") d.frequency =+ d.Forty_Plus;
      else if (category == "Sck") d.frequency =+ d.Sck;
      else if (category == "Rate") d.frequency =+ d.Rate;

      savedData[count++] = d.frequency;
    });

    x.domain(data.map(function(d) { return d.Team; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    var svg = d3.select("#passingOffense").transition();
    count = 0;
    
    svg.selectAll(".bar_passingOffense")    
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