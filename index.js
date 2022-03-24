// Select element
const svg = d3.select("svg");

d3.json("planets.json").then((data) => {
  const circle = svg.selectAll("circle").data(data);

  // add attr to circle
  circle
    .attr("cy", 400)
    .attr("cx", (d) => d.distance)
    .attr("r", (d) => d.radius)
    .attr("fill", (d) => d.fill);

  circle
    .enter()
    .append("circle")
    .attr("cy", 200)
    .attr("cx", (d) => d.distance)
    .attr("r", (d) => d.radius)
    .attr("fill", (d) => d.fill);
});
