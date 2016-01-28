(function(){

    var width = 960,
        height = 500,
        centered;

    var projection = d3.geo.albersUsa()
        .scale(1070)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#zoomablemap").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect-zoomablemap")
        .attr("class", "background-states")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    var g = svg.append("g");

    d3.json("/data/json/us.json", function(error, us) {
      if (error) throw error;

      g.append("g")
          .attr("id", "states")
        .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          .on("click", clicked);

      d3.csv("/data/miscellaneous_data/cities.csv", function(error, data) {
        g.selectAll("image").data([0])
           .data(data)
           .enter()
           .append("a")
           .attr("xlink:href", function(d) {return d.url})
           .append("image")
           .attr("width", "30")
           .attr("height", "30")
           .attr("x", function(d) {
            if(d.team=="Raiders"){return projection([d.lon, d.lat])[0]-5;}
            else if(d.team=="Forty-Niners"){return projection([d.lon, d.lat])[0]-25;}
            else if(d.team=="Giants"){return projection([d.lon, d.lat])[0]-5;}
            else if(d.team=="Jets"){return projection([d.lon, d.lat])[0]-30;}
            else if(d.team=="Ravens"){return projection([d.lon, d.lat])[0];}
            else if(d.team=="Redskins"){return projection([d.lon, d.lat])[0]-25;}
            else if(d.team=="Bengals"){return projection([d.lon, d.lat])[0]-10;}
            else {return projection([d.lon, d.lat])[0]-15;}
           })
           .attr("y", function(d) {
            if(d.team=="Ravens"){return projection([d.lon, d.lat])[1]-10;}
            else {return projection([d.lon, d.lat])[1]-15;}
           })
           .attr("xlink:href", function(d) {return d.logo})
        ;});

      g.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("id", "state-borders")
          .attr("d", path);
    });

    function clicked(d) {
      var x, y, k;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }

      g.selectAll("path")
          .classed("active", centered && function(d) { return d === centered; });

      g.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
    }

})();


