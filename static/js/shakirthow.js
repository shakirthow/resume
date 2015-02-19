$( document ).ready(function() {
	console.log( "ready!" );
	rotateText()
	// plane()
	introAnimation()
	workExp()

});




function introAnimation(){
	var controller = new ScrollMagic();
	var sceneOptions = {duration: 300, offset: -100}
	
	var textAni = new ScrollScene(sceneOptions)
	.triggerHook("onCenter")
	.triggerElement($('#thankyou'))
	.setTween(TweenMax.staggerTo($('#thankyou').children("span"), 0.0001, {"font-weight":"700", color:'#c0392b', "font-size":100}, 0.2))

	var downloadAni = new ScrollScene(sceneOptions)
	.triggerHook("onCenter",{pushFollowers: false})
	.triggerElement($('#downloadB'))
	.setTween(TweenMax.from($('#downloadB'), 1, {scale: 0, ease: Back.easeOut}));


	controller.addScene([ textAni, downloadAni])
	// downloadAni.addIndicators();
	// textAni.addIndicators();
	
}


function workExp(){
	// var w = $('#work').text().split("");
	// $this = $('#work');
 //    $('#work').empty();
 //    $.each(w, function (i, el) {
 //    $this.append("<span>" + el + "</span>");
 //    });
 //    var exp = $('#exp').text().split("");
	// $this = $('#exp');
 //    $('#exp').empty();
 //    $.each(exp, function (i, el) {
 //    $this.append("<span>" + el + "</span>");
 //    });


    var controller = new ScrollMagic();
	var sceneOptions = {duration: 200, offset: -100}
	
	// var textAniW = new ScrollScene(sceneOptions)
	// .triggerHook("onCenter")
	// .triggerElement($('#work'))
	// .setTween(TweenMax.staggerTo($('#work').children("span"), 0.0001, {"font-weight":"700", color:'#2980b9', "font-size":70}, 0.2))

	// var textAniE = new ScrollScene(sceneOptions)
	// .triggerHook("onCenter")
	// .triggerElement($('#work'))
	// .setTween(TweenMax.staggerTo($('#exp').children("span"), 0.0001, {"font-weight":"700", color:'#333', "font-size":40}, 0.2))


	var pinWorkEx = new ScrollScene({triggerElement: "#workExTrigger", duration: 2100, offset: 110})
								.setPin("#workTitle",{pushFollowers: false})
								.addTo(controller);


	controller.addScene([pinWorkEx])
	// textAniW.addIndicators();
	// textAniE.addIndicators();
	pinWorkEx.addIndicators();



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
	var scene = new ScrollScene({triggerElement: "#planeTrigger", duration: 5000, offset: 500})
	.setPin("#target",{pushFollowers: false})
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