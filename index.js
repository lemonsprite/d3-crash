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

// scales
const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);
const y = d3.scaleLinear().range([graphHeight, 0]);

// create and Calls Axs
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(8)
  .tickFormat((d) => d + " orders");

// Update Xaxis Text
xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(-40)")
  .attr("text-anchor", "end")
  .attr("fill", "pink");

// Algoritma Update Chart / Realtime Chart
const update = (data) => {
  // 1. Update Scale & Domain
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((i) => i.name));

  // 2. Join data to element
  const rects = graph.selectAll("rect").data(data);

  // 3. Remove unwanted shape
  rects.exit().remove();

  // 4. Update current shape in DOM
  rects
    .attr("width", x.bandwidth)
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .transition().duration(500)
      .attr("height", (d) => graphHeight - y(d.orders))
      .attr("y", (d) => y(d.orders));

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", graphHeight)
    .transition().duration(500)
      .attr("y", (d) => y(d.orders))
      .attr("height", (d) => graphHeight - y(d.orders));

  // Call axis
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};
var data = [];
db.collection("dishes").onSnapshot((res) => {
  res.docChanges().forEach((d) => {
    console.log(d);
    const doc = { ...d.doc.data(), id: d.doc.id };

    switch (d.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        const i = data.findIndex((x) => x.id == doc.id);
        data[x] = doc;
        break;
      case "removed":
        data = data.filter((x) => x.id !== doc.id);
        break;

      default:
        break;
    }
  });

  update(data);
});
