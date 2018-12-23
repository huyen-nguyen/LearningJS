var data = [
    {name: "Locke",    val:  4},
    {name: "Reyes",    val:  8},
    {name: "Ford",     val: 15},
    {name: "Jarrah",   val: 16},
    {name: "Shephard", val: 23},
    {name: "Kwon",     val: 42}
];


var width = 420,
    barHeight = 25;

var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {return d.val; })])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", function(d) { return x(d.val); })
    .attr("height", barHeight - 2
    );

bar.append("text")
    .attr("x", function(d) { return x(d.val) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".3em")
    .text(function(d) { return d.name; });

d3.select('#slider1').call(d3.slider());

d3.select('#slider2').call(d3.slider().value( [ 10, 25 ] ));
d3.select('#slider3').call(d3.slider().axis(true).value( [ 10, 25 ] ).on("slide", function(evt, value) {
    d3.select('#slider3textmin').text(value[ 0 ]);
    d3.select('#slider3textmax').text(value[ 1 ]);
}));
d3.select('#slider4').call(d3.slider().on("slide", function(evt, value) {
    d3.select('#slider4text').text(value);
}));
d3.select('#slider5').call(d3.slider().axis(true));
var axis = d3.svg.axis().orient("top").ticks(4);
d3.select('#slider6').call(d3.slider().axis(axis));
d3.select('#slider7').call(d3.slider().axis(true).min(2000).max(2100).step(5));
d3.select('#slider8').call(d3.slider().value(50).orientation("vertical"));
d3.select('#slider9').call(d3.slider().value( [10, 30] ).orientation("vertical"));
d3.select('#slider10').call(d3.slider().scale(d3.time.scale().domain([new Date(1984,1,1), new Date(2014,1,1)])).axis(d3.svg.axis()));
d3.select('#slider11').call(d3.slider().scale(d3.time.scale().domain([new Date(1984,1,1), new Date(2014,1,1)])).axis(d3.svg.axis()).snap(true).value(new Date(2000,1,1)));
essai = d3.slider().scale(d3.scale.ordinal().domain(["Gecko", "Webkit", "Blink", "Trident"]).rangePoints([0, 1], 0.5)).axis(d3.svg.axis()).snap(true).value("Gecko");
d3.select('#slider12').call(essai);
