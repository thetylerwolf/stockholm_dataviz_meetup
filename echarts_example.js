// Source: https://ecomfe.github.io/echarts-examples/public/index.html
// eCharts

const echarts = require('echarts')
require('zrender/lib/svg/svg')

var myChart = echarts.init(document.getElementById('chartContainer'), null, { renderer: 'svg' });

let options = generatePie()

// use configuration item and data specified to show chart
myChart.setOption(options);

function generateBar() {
    // specify chart configuration item and data
    return {
        title: {
            text: 'ECharts example'
        },
        tooltip: {},
        legend: {
            data:['Sales']
        },
        xAxis: {
            data: ['shirt','cardigan','chiffon shirt','pants','heels','socks']
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

}

function generatePie() {
    // specify chart configuration item and data
    return {
        legend: {
            orient: 'vertical',
            x: 'left',
        },
        series: [{
            name: 'Sales',
            type: 'pie',
            data: [{
                value: 5,
                name: 'shirt'},
            {
                value: 20,
                name: 'cardigan'},
            {
                value: 36,
                name: 'chiffon shirt'},
            {
                value: 10,
                name: 'pants'},
            {
                value: 10,
                name: 'heels'},
            {
                value: 20,
                name: 'socks'
            }],
            radius: [ '35%', '75%' ],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            }
        }]
    };

}