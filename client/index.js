// EXPERIMENTING
var config = {
  approval: {
    dateFormat: '%b %d',
    selectorId: '#approval-rating-graphic',
    data: 'data/approval2.tsv',
    yDomain: [20,80],
    trumpLabelDate: 'Feb 15',
    trumpLabelDateMove: 0,
    trumpLabelY: 45
  },
  sp500: {
    dateFormat: '%b %d',
    selectorId: '#sp500-graphic',
    data: 'data/sp500.tsv',
    yDomain: [80,120],
    trumpLabelDate: 'Feb 15',
    trumpLabelDateMove: 0,
    trumpLabelY: 108
  },
  consumer: {
    dateFormat: '%b %Y',
    selectorId: '#consumer-sentiment-graphic',
    data: 'data/consumer-sentiment.tsv',
    yDomain: [50,105],
    trumpLabelDate: 'Feb 2017',
    trumpLabelDateMove: -35,
    trumpLabelY: 99
  },
  dollar: {
    dateFormat: '%b %d',
    selectorId: '#dollar-graphic',
    data: 'data/dxy.tsv',
    yDomain: [80,120],
    trumpLabelDate: 'Jan 27',
    trumpLabelDateMove: -35,
    trumpLabelY: 102
  }
}

import * as d3 from 'd3';
import debounce from 'lodash.debounce';

var windowWidth = null;


var options = {};

function drawCharts(){

    if(window.innerWidth != windowWidth || windowWidth === null){
      drawLineChart (config.approval);   
        drawLineChart (config.sp500);
        drawLineChart (config.consumer);
        drawLineChart (config.dollar);
        windowWidth = window.innerWidth;
    }

}


drawCharts()

  window.addEventListener('resize', debounce(drawCharts, 100));

// ///OLD
// window.addEventListener('resize', () => {
//       debounce(drawLineChart (config.approval),   
//         drawLineChart (config.sp500),
//         drawLineChart (config.consumer),
//         drawLineChart (config.dollar), 100);
// });


function drawLineChart(config){
//APPROVAL CHART
  var days,
      dateKeys,
      dateParse = d3.timeParse(config.dateFormat),
      lineMargin = {top: 20, right: 30, bottom: 30, left: 50},
      lineWidth = d3.select(config.selectorId).node().offsetWidth - lineMargin.left - lineMargin.right,
      lineHeight = 250 - lineMargin.top - lineMargin.bottom;

  document.querySelector(config.selectorId).innerHTML = "";

  var approvalSvg = d3.select(config.selectorId).append("svg")
      .attr("width", lineWidth + lineMargin.left + lineMargin.right)
      .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)

  var g = approvalSvg.append("g").attr("transform", "translate(" + lineMargin.left + "," + lineMargin.top + ")");

  var xApproval = d3.scaleTime()
      .range([0, lineWidth]);

  var yApproval = d3.scaleLinear()
      .range([lineHeight, 0]);

  var approvalVoronoi = d3.voronoi()
      .x(function(d) { return xApproval(d.date); })
      .y(function(d) { return yApproval(d.value); })
      .extent([[-lineMargin.left, -lineMargin.top], [lineWidth + lineMargin.right, lineHeight + lineMargin.bottom]]);

  var approvalLine = d3.line()
    .defined(d => d.value)
      .x(function(d) {
        return xApproval(d.date);
      })
      .y(function(d) {
        if (d.value && d.value !== '') {
          return yApproval(+d.value);
        }
      });

  d3.tsv(config.data, type, function(error, configData) {
    if (error) throw error;

    xApproval.domain(d3.extent(days));
    yApproval.domain(config.yDomain)

    g.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + lineHeight + ")")
        .call(d3.axisBottom(xApproval).ticks(5));

    g.append("g")
        .attr("class", "y-axis axis")
        .call(d3.axisLeft(yApproval).ticks(3))

    g.append("g")
        .attr("class", "voronoi-lines")
      .selectAll("path")
      .data(configData)
      .enter().append("path")
        .attr("d", function(d) {
          d.line = this;
          return approvalLine(d.values.filter(d => d.value));
        })
        .attr("stroke", function(d){if(d.name == "Donald Trump"){return "#a5526a"}})
        .attr("stroke-width", function(d){if(d.name == "Donald Trump"){return 2}});;

    var trumpLabel = g.append('text')
      .attr('class', 'trumpLabel')
       .attr('x', (xApproval(dateParse(config.trumpLabelDate)) + config.trumpLabelDateMove))
       .attr('y', yApproval(config.trumpLabelY))
      .text("Donald Trump")


    var approvalFocus = g.append("g")
        .attr("transform", "translate(-100,-100)")
        .attr("class", "focus");

    approvalFocus.append("circle")
        .attr("r", 3.5);

    approvalFocus.append("text")
        .attr("y", -10);

    var approvalVoronoiGroup = g.append("g")
        .attr("class", "voronoi");

    approvalVoronoiGroup.selectAll("path")
      .data(approvalVoronoi.polygons(d3.merge(configData.map(function(d) { return d.values; }))))
      .enter().append("path")
        .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    function mouseover(d) {
      d3.select(d.data.president.line).classed("voronoi-hover", true);
      d.data.president.line.parentNode.appendChild(d.data.president.line);
      approvalFocus.attr("transform", "translate(" + xApproval(d.data.date) + "," + yApproval(d.data.value) + ")");
      approvalFocus.select("text").text(d.data.president.name);
      trumpLabel.style("visibility","hidden");
    }

    function mouseout(d) {
      d3.select(d.data.president.line).classed("voronoi-hover", false);
      approvalFocus.attr("transform", "translate(-100,-100)");
      trumpLabel.style("visibility","visible");
    }

  });

  function type(d, i, columns) {
    if (!days) {
      dateKeys = columns.slice(1);
      days = dateKeys.map(dateParse);
    }

    var c = {
      name: d.date.replace(/ $/i, ""),
      name: d.date,
      values: null,
    };

    c.values = dateKeys.map(function(k, i) {
      if (d[k] != null){
        return { president: c, date: days[i], value: d[k] || null};
      }
    });
    return c;
  }

}