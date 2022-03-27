// set dimensions
let margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// parse date/time
let parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
let x = d3.scaleTime().range([0, width]);       // define the scale with range
let y = d3.scaleLinear().range([height, 0]);    // reverse the range for y-axis

// define the line
let valueline = d3.line()       // return the frame for the line, w/ x and y definition
	.x(d => d.date)
	.y(d => d.close);

// append svg to body, append a group to svg, and move group to top left margin
let svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data.csv").then(function (data){
	console.log(data)

	// format the data
	data.forEach(d => {
		d.date = parseTime(d.date); // reassign the date to itself
		d.close = +d.close; // convert string to int
	});

	// set domains for x and y ranges
	x.domain(d3.extent(data, d => d.date));
	y.domain([0, d3.max(data, d => d.close)]);

	// add valueline path !important¡
	svg.append("path")
		.data([data])   // put data in an array
		.attr("class", "line")
		.attr("d", valueline);

	// add x-axis
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))         // call the axisBottom, take in x scale

	// add y-axis
	svg.append("g")
		.call(d3.axisLeft(y))           // call axisLeft, take in y scale

})


