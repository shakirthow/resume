$( document ).ready(function() {
	console.log( "ready!" );
	rotateText()
	// plane()

	workExpMagic()

});


// set correct size for wipe child
// var resizeWipeChild = function () {
//     $("#pin .wipe h3").width($(window).width());
// };
// $(window).on("resize", resizeWipeChild);

// 		var controller;
// 	$(document).ready(function ($) {
// 	    // init controller
// 	    controller = new ScrollMagic();
//         resizeWipeChild(); //trigger once
// 	});




	// build tween




// 	 $(document).ready(function ($) {






function workExpMagic(){
	controller = new ScrollMagic();
	controller2 = new ScrollMagic();

	var scenePin = new ScrollScene({triggerElement: "#workExpMagicTrigger", duration: 300, pushFollowers: false})
	.setPin("#workExp")
	.addTo(controller);


	var preview = new TimelineMax()
	preview.add([TweenMax.to("#beachIntro", 1, {
		width: "100%"
	})])
	preview.add(TweenMax.to("#desertIntro", 1, {
		width: "100%"
	}))
	preview.add([TweenMax.to("#mountainIntro", 1, {
		width: "100%"
	})])
	preview.add(TweenMax.to("#valleyIntro", 1, {
		width: "100%"
	}))
	preview.add([TweenMax.to("#redwoodIntro", 1, {
		width: "100%"
	})])


	var sceneWipe = new ScrollScene({
		triggerElement: "#workExpMagicTrigger",
		duration: 300
	}).setTween(preview).setPin("#pin").addTo(controller2);


	// controller.addScene([ scenePin])
	scenePin.addIndicators();
	sceneWipe.addIndicators();

}






function plane(){
	var targetPos = $('#target').position()
	var namePos = $('#plane_start').offset()
	var offset = targetPos.top - namePos.top + 20
	$('#plane').css({top: -offset-100, left:50, position:'absolute'});

	var flightpath = {
		entry : {
			curviness: 1.25,
			autoRotate: true,
			values: [
			{x: 100,	y: -20},
			{x: 300,	y: 10}
			// {x: namePos.left, y:-offset},
		 // 	{x: 300,	y: 10}
		 ]
		},
		looping : {
			curviness: 1.25,
			autoRotate: true,
			values: [
			{x: 510,	y: 60},
			{x: 620,	y: -60},
			{x: 500,	y: -100},
			{x: 380,	y: 20},
			{x: 500,	y: 60},
			{x: 580,	y: 20},
			{x: 620,	y: 15}
			]
		},
		leave : {
			curviness: 1.25,
			autoRotate: true,
			values: [
			{x: 660,	y: 20},
			{x: 800,	y: 130},
			{x: $(window).width() + 300,	y: -100},
			]
		}
	};
	// init controller
	var controller = new ScrollMagic();

	// create tween
	var tween = new TimelineMax()
	.add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
	.add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
	.add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

	// build scene
	var scene = new ScrollScene({triggerElement: "#trigger", duration: 500, offset: 100})
	.setPin("#target")
	.setTween(tween)
	.addTo(controller);

	// show indicators (requires debug extension)
	scene.addIndicators();
}







function rotateText(){
	var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

		var that = this;
		var delta = 300 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

	window.onload = function() {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i=0; i<elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-rotate');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			}
		}
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
}