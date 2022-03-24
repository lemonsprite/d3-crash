const data = [
    {width: 200, height: 100, fill: 'red'},
    {width: 100, height: 60, fill: 'white'},
    {width: 50, height: 30, fill: 'blue'},
]

const svg = d3.select('svg')

// Join data to rect
const rect = svg.selectAll('rect')
.data(data)

//  Add attr to rect already un dom
rect.attr('width', (d,i,n) => d.width)
.attr('height', d => d.height)
.attr('fill', d => d.fill)

// Generate rect depends on data
rect.enter()
.append('rect')
.attr('width', (d,i,n) => d.width)
.attr('height', d => d.height)
.attr('fill', d => d.fill)


// Arrow Function refer to window element
// Arrow Function refer to element that selected