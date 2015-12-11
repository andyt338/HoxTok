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

    d3.json("json/us.json", function(error, us) {
      if (error) throw error;

      g.append("g")
          .attr("id", "states")
        .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          .on("click", clicked);

      d3.csv("cities.csv", function(error, data) {
        g.selectAll("image").data([0])
           .data(data)
           .enter()
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
            else {return projection([d.lon, d.lat])[0]-15;}
           })
           .attr("y", function(d) {
            if(d.team=="Ravens"){return projection([d.lon, d.lat])[1]-10;}
            else {return projection([d.lon, d.lat])[1]-15;}
           })
           .attr("xlink:href", function(d) { 
            if(d.team=="Titans"){return "../images/titans.png";}
            else if (d.team=="Jaguars") {return "../images/jags.png";}
            else if (d.team=="Texans") {return "../images/texans.png";}
            else if (d.team=="Colts") {return "../images/colts.png";}
            else if (d.team=="Falcons") {return "../images/falcons.png";}
            else if (d.team=="Panthers") {return "../images/panthers.png";}
            else if (d.team=="Saints") {return "../images/saints.png";}
            else if (d.team=="Buccaneers") {return "../images/bucs.png";}
            else if (d.team=="Giants") {return "../images/giants.png";}
            else if (d.team=="Redskins") {return "../images/redskins.png";}
            else if (d.team=="Cowboys") {return "../images/cowboys.png";}
            else if (d.team=="Eagles") {return "../images/eagles.png";}
            else if (d.team=="Patriots") {return "../images/patriots.png";}
            else if (d.team=="Dolphins") {return "../images/dolphins.png";}
            else if (d.team=="Jets") {return "../images/jets.png";}
            else if (d.team=="Bills") {return "../images/bills.png";}
            else if (d.team=="Browns") {return "../images/browns.png";}
            else if (d.team=="Steelers") {return "../images/steelers.png";}
            else if (d.team=="Ravens") {return "../images/ravens.png";}
            else if (d.team=="Bengals") {return "../images/bengals.png";}
            else if (d.team=="Bears") {return "../images/bears.png";}
            else if (d.team=="Packers") {return "../images/packers.png";}
            else if (d.team=="Vikings") {return "../images/vikings.png";}
            else if (d.team=="Lions") {return "../images/lions.png";}
            else if (d.team=="Broncos") {return "../images/broncos.png";}
            else if (d.team=="Chiefs") {return "../images/chiefs.png";}
            else if (d.team=="Chargers") {return "../images/chargers.png";}
            else if (d.team=="Raiders") {return "../images/raiders.png";}
            else if (d.team=="Seahawks") {return "../images/hawks.png";}
            else if (d.team=="Cardinals") {return "../images/cardinals.png";}
            else if (d.team=="Rams") {return "../images/rams.png";}
            else if (d.team=="Forty-Niners") {return "../images/49ers.png";}
            })
        ;});


/*          d3.csv("nasacenters.csv", function(error, data) {
        // Draw images after drawing paths.
        imageGroup.selectAll("image").data([0])
           .data(data)
           .enter()
           .append("image")
            .attr("xlink:href", "nasalogo.png")
            .attr("width", "30")
            .attr("height", "30")
            .attr("x", function(d) {
                   return projection([d.lon, d.lat])[0]-15;
            })
            .attr("y", function(d) {
                   return projection([d.lon, d.lat])[1]-15;
            })*/





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


