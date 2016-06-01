---
layout: post
title:  "Animating a three.js Mesh"
tagline: "Part 2 - three.js basics"
date:   2016-05-23 00:35:50 -0400
category: tutorial
comments: true
tags: [three.js, javascript]
disqus_identifier: viburnum-sane-niacin
---


This is Part 2 in getting up and running with three.js. In the last post we created a simple scene with just a white sphere on a black background. In this post we're going to add a simple animation to our sphere. We'll also change it's appearance so we can better see the animation.   

Visit <a href="/tutorial/2016/05/17/simple-scene-three-js.html">Part 1</a> if you want to see what we'll be creating or to start from the beginning. If you'd like to pick up where we left off just download the finished Part 1 files below. 

<p class="download-link">
<a href="/assets/2016/05/three_js/downloads/part1/part_1_end.html" download="three_js_part1_end.html">Download Part 1 files</a>
</p>

<figure>
	<canvas id="part1"></canvas>
	<figcaption>Our starting point - the finished result of Part 1</figcaption>
</figure>

In this example we're working with a Basic three.js material. Basic material does not reflect light - that's why our white sphere just looks like a flat circle. We can still change the color of our material by passing it a color, and give it some depth by setting wireframe to true. These values can either be passed when the material is created, or by calling setValue() on the material and passing it an object: 

{% highlight javascript %}
	material.setValues({
		color: 0xDDA0DD, 
		wireframe: true, 
		wireframeLinewidth: 2
	});
{% endhighlight %}

<figure>
	<canvas id="part2"></canvas>
	<figcaption>Basic Material with updated color and wireframe values.</figcaption>
</figure>

To animate the mesh, we'll use requestAnimationFrame to rotate our mesh on it's x and y axis. This function will call itself so it plays continuously. At the end of the function we will re-render the scene with the updated values: 

{% highlight javascript %}
animate = function() {

	requestAnimationFrame( animate );

	mesh.rotation.x = Date.now() * 0.0002;
	mesh.rotation.y = Date.now() * 0.001;

	renderer.render( scene, camera );

}
{% endhighlight %}

<figure>
	<canvas id="part3"></canvas>
	<figcaption>Spin, my little sphere. SPIN!</figcaption>
</figure>

Finally, update the background color to whatever you like by setting the renderer clear color.

{% highlight javascript %}
renderer.setClearColor( 0x7FFFD4 );
{% endhighlight%}

<figure>
	<canvas id="part4"></canvas>
	<figcaption>Finished - Our colorful little scene.</figcaption>
</figure>

<p class="download-link">
<a href="/assets/2016/05/three_js/downloads/part2/part_2_end.html" download="three_js_part2_end.html">Download Part 2 completed</a>
</p>

Any questions? Let me know below or tweet me! <a href="https://twitter.com/jennyveens">@jennyveens</a>


<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"></script>

<script>
	var PartOne = {};
	var width2;

	PartOne.camera;
	PartOne.scene;
	PartOne.renderer;
	PartOne.geometry;
	PartOne.material;
	PartOne.mesh;

	console.log(Date.now());

	PartOne.init = function () {

		var my_canvas = document.getElementById('part1');

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartOne.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		PartOne.renderer.setSize( width2, window.innerHeight/2 );
		PartOne.renderer.setClearColor( 0x000000 );

		PartOne.camera = new THREE.PerspectiveCamera( 75, width2 / (window.innerHeight/2), 1, 2000 );
		PartOne.camera.position.z = 800;

		PartOne.scene = new THREE.Scene();

		PartOne.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		PartOne.material = new THREE.MeshBasicMaterial();

		PartOne.mesh = new THREE.Mesh( PartOne.geometry, PartOne.material );
		
		PartOne.scene.add( PartOne.mesh );

		PartOne.renderer.render( PartOne.scene, PartOne.camera );
	}

	PartOne.init();
	// PartOne.animate();

	PartOne.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	PartOne.canvasSize = PartOne.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartOne.camera.aspect = width2 / ( window.innerHeight/2 ) ;
		PartOne.camera.updateProjectionMatrix();

		console.log('PartOne', PartOne.camera.aspect );

		PartOne.renderer.setSize( width2, window.innerHeight/2 );
		PartOne.renderer.render( PartOne.scene, PartOne.camera );

	}, 250);

	var PartTwo = {};

	PartTwo.camera;
	PartTwo.scene;
	PartTwo.renderer;
	PartTwo.geometry;
	PartTwo.material;
	PartTwo.mesh;

	PartTwo.init = function () {

		var my_canvas = document.getElementById('part2');

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartTwo.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		PartTwo.renderer.setSize( width2, window.innerHeight/2 );
		PartTwo.renderer.setClearColor( 0x000000 );

		PartTwo.camera = new THREE.PerspectiveCamera( 75, width2 / (window.innerHeight/2), 1, 2000 );
		PartTwo.camera.position.z = 800;

		PartTwo.scene = new THREE.Scene();

		PartTwo.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		PartTwo.material = new THREE.MeshBasicMaterial();

		PartTwo.material.setValues({
			color: 0xDDA0DD, 
			wireframe: true, 
			wireframeLinewidth: 2
		});

		PartTwo.mesh = new THREE.Mesh( PartTwo.geometry, PartTwo.material );
		
		PartTwo.scene.add( PartTwo.mesh );

		PartTwo.renderer.render( PartTwo.scene, PartTwo.camera );
	}

	PartTwo.init();
	// PartTwo.animate();

	PartTwo.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	PartTwo.canvasSize = PartTwo.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartTwo.camera.aspect = width2 / ( window.innerHeight/2 ) ;
		PartTwo.camera.updateProjectionMatrix();

		console.log('PartTwo', PartTwo.camera.aspect );

		PartTwo.renderer.setSize( width2, window.innerHeight/2 );
		PartTwo.renderer.render( PartTwo.scene, PartTwo.camera );

	}, 250);

	var PartThree = {};

	PartThree.camera;
	PartThree.scene;
	PartThree.renderer;
	PartThree.geometry;
	PartThree.material;
	PartThree.mesh;

	PartThree.init = function () {

		var my_canvas = document.getElementById('part3');

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartThree.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		PartThree.renderer.setSize( width2, window.innerHeight/2 );
		PartThree.renderer.setClearColor( 0x000000 );

		PartThree.camera = new THREE.PerspectiveCamera( 75, width2 / (window.innerHeight/2), 1, 2000 );
		PartThree.camera.position.z = 800;

		PartThree.scene = new THREE.Scene();

		PartThree.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		PartThree.material = new THREE.MeshBasicMaterial();

		PartThree.material.setValues({
			color: 0xDDA0DD, 
			wireframe: true, 
			wireframeLinewidth: 2
		});

		PartThree.mesh = new THREE.Mesh( PartThree.geometry, PartThree.material );
		
		PartThree.scene.add( PartThree.mesh );

		PartThree.renderer.render( PartThree.scene, PartThree.camera );
	}


	PartThree.animate = function() {

		requestAnimationFrame( PartThree.animate );

		PartThree.mesh.rotation.x = Date.now() * 0.0002;
		PartThree.mesh.rotation.y = Date.now() * 0.001;

		PartThree.renderer.render( PartThree.scene, PartThree.camera );

	}

	PartThree.init();
	PartThree.animate();

	PartThree.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	PartThree.canvasSize = PartThree.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartThree.camera.aspect = width2 / ( window.innerHeight/2 ) ;
		PartThree.camera.updateProjectionMatrix();

		console.log('PartThree', PartThree.camera.aspect );

		PartThree.renderer.setSize( width2, window.innerHeight/2 );
		PartThree.renderer.render( PartThree.scene, PartThree.camera );

	}, 250);

	var PartFour = {};
	var width2;

	PartFour.camera;
	PartFour.scene;
	PartFour.renderer;
	PartFour.geometry;
	PartFour.material;
	PartFour.mesh;

	console.log(Date.now());

	PartFour.init = function () {

		var my_canvas = document.getElementById('part4');

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartFour.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		PartFour.renderer.setSize( width2, window.innerHeight/2 );
		PartFour.renderer.setClearColor( 0x7FFFD4 );

		PartFour.camera = new THREE.PerspectiveCamera( 75, width2 / (window.innerHeight/2), 1, 2000 );
		PartFour.camera.position.z = 800;

		PartFour.scene = new THREE.Scene();

		PartFour.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		PartFour.material = new THREE.MeshBasicMaterial();

		PartFour.material.setValues({
			color: 0xDDA0DD, 
			wireframe: true, 
			wireframeLinewidth: 2
		});

		PartFour.mesh = new THREE.Mesh( PartFour.geometry, PartFour.material );
		
		PartFour.scene.add( PartFour.mesh );

		PartFour.renderer.render( PartFour.scene, PartFour.camera );
	}

	PartFour.animate = function() {

		requestAnimationFrame( PartFour.animate );

		PartFour.mesh.rotation.x = Date.now() * 0.0002;
		PartFour.mesh.rotation.y = Date.now() * 0.001;

		PartFour.renderer.render( PartFour.scene, PartFour.camera );

	}

	PartFour.init();
	PartFour.animate();

	PartFour.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	PartFour.canvasSize = PartFour.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 120) > 660 ) {
			width2 = 660;
		} else if (window.innerWidth < 400) {
			width2 = window.innerWidth - 60;
		} else {
			width2 = window.innerWidth - 120;
		}

		PartFour.camera.aspect = width2 / ( window.innerHeight/2 ) ;
		PartFour.camera.updateProjectionMatrix();

		console.log('PartFour', PartFour.camera.aspect );

		PartFour.renderer.setSize( width2, window.innerHeight/2 );
		PartFour.renderer.render( PartFour.scene, PartFour.camera );

	}, 250);

	window.addEventListener('resize', PartThree.canvasSize);

	window.addEventListener('resize', PartFour.canvasSize);

	window.addEventListener('resize', PartTwo.canvasSize);

	window.addEventListener('resize', PartOne.canvasSize);

</script>