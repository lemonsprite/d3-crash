const update = (data) => {
    yAxisGroup.domain([0,d3.max(data, d=>d.orders])

    const rects = graph.selectAll('rect').data(data)

    rects.exit().remove();

    rects.attr()

    rects.enter().append('rect').attr()
}