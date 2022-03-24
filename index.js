// Select element
const svg = d3.select("svg");

d3.json("menu.json").then((data) => {

  // Linear Scale Declare
  const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

  // join data to rect
  const rects = svg.selectAll("rect").data(data);

  rects
    .attr("width", 50)
    .attr("height", (d) => y(d.orders))
    .attr("fill", (d) => "orange")
    .attr("x", (d, i) => i * 70);

  rects
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", (d) => y(d.orders))
    .attr("fill", (d) => "orange")
    .attr("x", (d, i) => i * 70);
});
