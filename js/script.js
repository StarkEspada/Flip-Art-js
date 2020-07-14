var paint = document.querySelector(".paint");
var plusImage = document.querySelector(".plus-image");
var playAnimation = document.querySelector(".play-animation");
var clean = document.querySelector(".clean");
var boxPaint = document.querySelector(".box-paint");
var containerField = document.querySelector(".container-field");
var containerImage = document.querySelector(".container-image");
var lineWidth = document.querySelector(".line-width")
var boxInput = document.querySelector(".box-input")
var inputLineWidth = document.querySelector(".input-line-width")
var saveSize = document.querySelector(".save-size")
var palette = document.querySelector(".palette");
var eraser = document.querySelector(".eraser")



var dataImage = []
var slaiderNumber = -1300
var a = 0
var countSlaider = 1;
var conutAnimation = 0;
var paletteOnOff = false
var ctx = boxPaint.getContext("2d");


boxInput.style.display = "none"
containerImage.style.display = "none"

lineWidth.addEventListener("click", function(){
	boxInput.style.display = "inline-block"

})

saveSize.addEventListener("click", function(){
	valueInput = inputLineWidth.value
	ctx.lineWidth = valueInput
})

palette.addEventListener("input", function(){
	paletteOnOff = true
	idPalette = palette.value
	ctx.strokeStyle = idPalette
})

eraser.addEventListener("click", function(){
	draw()
	ctx.strokeStyle = "white"
})

function draw(){
		boxPaint.onmousedown = function(event){
			ctx.beginPath()
		boxPaint.onmousemove = function(event) {
			var coordinateX = event.offsetX;
			var coordinateY = event.offsetY
			ctx.lineTo(coordinateX, coordinateY)
			ctx.stroke()
		}
		boxPaint.onmouseup = function(){
			boxPaint.onmousemove = null;
		}
	}
}
draw()

clean.addEventListener("click", function(){
	ctx.strokeStyle = "black"
	event.preventDefault()
	ctx.beginPath()
	ctx.clearRect(0, 0, 1700, 1700)
	
})


plusImage.addEventListener("click", function(){
	var dataURL = boxPaint.toDataURL();
	dataImage.push(dataURL)
 	var link = document.createElement("a");
  	document.body.appendChild(link);
  	link.href = dataURL;
 	link.download = "my-image-name.png";
 	link.click();
 	document.body.removeChild(link)

 	ctx.strokeStyle = "black"
	event.preventDefault()
	ctx.beginPath()
	ctx.clearRect(0, 0, 1700, 1700)

	containerField.style.backgroundImage = "url(" + dataURL + ")"

})


playAnimation.addEventListener("click", function(){
	containerImage.style.display = "block"
	containerField.style.display = "none"

	var element = document.createElement("div")
 	element.classList.add("box-image")
 	containerImage.appendChild(element)

	for(var i = 0; i < dataImage.length; i++){
		conutAnimation++
			var image = document.createElement("img")
 			image.setAttribute("src", dataImage[i])
 			element.appendChild(image)
 			image.style.width = 100 + "%"
 			image.style.height = 100 + "%"
 	}

 	function slaider(){
		a = a + slaiderNumber 
		element.style.marginTop = a + "px"
	}

 	var timerId = setInterval(slaider, 200)

 	function stopSlaider(){
 		countSlaider++
 		if(countSlaider === conutAnimation){
 			clearInterval(timerId)
 		}
 	}
 	setInterval(stopSlaider, 200)

})
