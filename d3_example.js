// Source: https://beta.observablehq.com/@mbostock/psr-b1919-21
// From Mike Bostock

const d3 = require('d3')

let data = d3.text("https://gist.githubusercontent.com/borgar/31c1e476b8e92a11d7e9/raw/0fae97dab6830ecee185a63c1cee0008f6778ff6/pulsar.csv")
  .then(data => d3.csvParseRows(data, row => row.map(Number) ))
  .then(drawChart)

function drawChart(data) {

  let overlap = 16

  let height = 720,
    width = window.innerWidth

  let margin = ({top: 60, right: 10, bottom: 20, left: 10})

  let x = d3.scaleLinear()
      .domain([0, data[0].length - 1])
      .range([margin.left, width - margin.right])

  let y = d3.scalePoint()
      .domain(data.map((d, i) => i))
      .range([margin.top, height - margin.bottom])

  let z = d3.scaleLinear()
      .domain([
        d3.min(data, d => d3.min(d)),
        d3.max(data, d => d3.max(d))
      ])
      .range([0, -overlap * y.step()])

  let color = d3.scaleLinear()
      .domain([0, data[0].length - 1])
      // .range(['#fff', d3.schemeBlues[9][8]])
      .range(['#fff', '#fff'])

  let area = d3.area()
      .defined(d => !isNaN(d))
      .x((d, i) => x(i))
      .y0(0)
      .y1(z)

  let line = area.lineY1()

  let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x.copy().domain([0, 92])).ticks(width / 80))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:first-of-type text").append("tspan").attr("x", 10).text(" ms"))

  const svg = d3.select('#chartContainer')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const serie = svg.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${y(i) + 1})`);

  let i = 0

  serie.append("path")
      .attr("fill", () => color(i++))
      .attr("d", area);

  serie.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", line);

  svg.append("g")
      .call(xAxis);

  svg.node();
}
