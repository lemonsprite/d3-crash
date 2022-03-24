// Select element
const svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// Create Margin
const m = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};

const graphWidth = 600 - m.left - m.right;
const graphHeight = 600 - m.top - m.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${m.left},${m.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

d3.json("menu.json").then((data) => {
  // Get minimum value in data
  // const min = d3.min(data, d => d.orders)
  // const max = d3.max(data, d => d.orders)
  // const extent = d3.extent(data, d => d.orders)

  // Linear Scale Declare
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    .range([graphHeight, 0]);

  // Band Scale Declare
  const x = d3
    .scaleBand()
    .domain(data.map((i) => i.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // join data to rect
  const rects = graph.selectAll("rect").data(data);

  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name));

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr('y', d => y(d.orders))

  // create and Calls Axs
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(8).tickFormat(d => d + ' orders')

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('fill', "pink")
    
});
