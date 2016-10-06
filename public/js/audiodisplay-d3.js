function drawBuffer( width, height, context, data ) {
    console.log(data);
    console.log('*******');
    console.log(data.length);
    console.log('888888888');
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "silver";
    context.clearRect(0,0,width,height);
    console.log(step);
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            var datum = data[(i*step)+j];
            // datum = array [ (1 * integer of (length/width) ) + 1 ]
            //
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        // drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}

function d3Buffer (data) {
  var output = document.getElementById("output");
  var dataFreq = analyserNode.getByteFrequencyData(freqByteData);
  console.log('****** dataFreq *******');
  console.log(dataFreq);
  console.log('******');


  // Variables
  var svgW = 1024;
  var svgH = 500;
  var padding = 15;

  var dataset = data;

  console.log('max: ', d3.max(dataset, function(d) {return d}));
  console.log('min: ', d3.min(dataset, function(d) {return d}));



  var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) { return d; })])
               .range([padding, svgW-padding]);

  var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) { return d;}), d3.max(dataset, function(d) { return d;})])
    .range([svgH-padding,padding]);

  var svg = d3.select("#output")
    .append("svg")
    .attr('width', svgW)
    .attr('height', svgH);

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
			     return i * (svgW / Math.floor(dataset.length)) })
    // Add divisor as the bar width

    .attr("y", function(d) {
      return svgH-yScale(d) })
    .attr("width", svgW / Math.floor(dataset.length))
    // Add divisor as the bar width

	  .attr("height", function(d) {
	   		  return yScale(d);})
	  .attr("fill", function(d) {
			return "rgb(0, 0, " + (Math.abs(d * 55)*255) + ")";});

}
// {
//     var SPACING = 3;
//     var BAR_WIDTH = 1;
//     var numBars = Math.round(canvasWidth / SPACING);
//     var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
//
//     analyserNode.getByteFrequencyData(freqByteData);
//
//     analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
//     analyserContext.lineCap = 'round';
//     var multiplier = analyserNode.frequencyBinCount / numBars;
//
//     // Draw rectangle for each frequency bin.
//     for (var i = 0; i < numBars; ++i) {
//         var magnitude = 0;
//         var offset = Math.floor( i * multiplier );
//         // gotta sum/average the block, or we miss narrow-bandwidth spikes
//         for (var j = 0; j< multiplier; j++)
//             magnitude += freqByteData[offset + j];
//         magnitude = magnitude / multiplier;
//         var magnitude2 = freqByteData[i * multiplier];
//         analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
//         analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
//     }
// }
