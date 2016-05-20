---
layout: post
title:  "Creating a scene in three.js"
tagline: "three.js basics - Part 1"
date:   2016-05-17 00:35:50 -0400
category: javascript
comments: false
tags: [three.js]
disqus_identifier: contain-prove-wireworm
---

<p class="text-center download-link">
<a href="/assets/2016/05/three_js/downloads/part1/part_1_start.html" download="three_js_part1_start.html">Download the starter files</a>
</p>

Three.js is a super cool library that lets us create 3D objects and scenes in the browser. I’ve been really excited about using it since I started working in web development. My goal here is to go over the basics, so that you can get started with three.js today (And build more cool stuff in the future!). 

### WHAT WE'LL BE BUILDING:
We're going to start out with three.js by building a simple scene. 
In this scene is going to be a wireframe sphere that spins:  

<figure>
	<canvas id="demo"></canvas>
	<figcaption><a target="_blank" href="/assets/2016/05/three_js/demos/three_js_simple_scene_demo.html">View fullscreen</a></figcaption>
</figure>

I've split up this tutorial to make it a bit easier to follow:

- <strong>Part 1 will be about creating a scene and placing the object in the scene</strong>
- <strong>Part 2 will be about styling and animating the scene</strong>

### LETS GET STARTED

To create this scene there are only 4 things we need:  

1. A Renderer (Canvas element)
2. A Scene
3. A Camera 
4. A mesh (Object to view)

I like to think of working in three.js as creating a movie. We need our actors (mesh objects), a camera to film with, and a scene where the action takes place. And then for a viewer to see what we’ve created, they need something to view it with. In real life this could be a television, theatre, or computer, but here we’re going to use an HTML `<canvas>` element. 


To start, let’s create our markup. We need a regular HTML document, with a canvas element. And we need to include [three.js](http://threejs.org). You can either download the files [here](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene), or include it with a cdn: 

{% highlight javascript%}
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"></script>
{% endhighlight %}

As of writing this, three.js is in version 76, you can grab the most up to date version [here](https://cdnjs.com/libraries/three.js/). 

Markup: 

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple three.js scene</title>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"></script>
  <script></script>
</body>
</html>
{% endhighlight %}

We're going to put our JavaScript in the empty script tag. And don't add in a canvas element quite yet! We'll be creating it with our JavaScript: 

{% highlight javascript %}
// First let's define the variables we'll need: 
var camera, scene, renderer;
var geometry, material, mesh;
{% endhighlight %}

In order to initialize our scene, we must first create the things we need, we'll do this by creating our renderer, camera, scene, and mesh inside of an init() function:

{% highlight javascript %}
var init = function() {
	// Create a new Renderer element (this will be our canvas)
	renderer = new THREE.WebGLRenderer();

	// Then we'll set it so that it takes up the entire viewport
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Now let's add our renderer to our document
	document.body.appendChild( renderer.domElement );	
}
{% endhighlight %}

Once our renderer is in place, we can create our scene and camera. The camera accepts 4 arguments:

1. The Field of view
2. The aspect ratio
	Determines how our camera will play on our renderer. Usually this will be the width/height so the image is not squished. 
3. Near clipping plane
	How far away will we start viewing the scene.
4. Far clipping place
	How far away will we stop viewing the scene. 

{% highlight javascript %}
// Inside init();
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
{% endhighlight%}

Unless we specify it, the postition of our objects will be placed at (0,0,0) - That's (x,y,z). Let's position our camera to ensure it's outside of our object (Very difficult to view our object when our camera is inside!):

{% highlight javascript %}
// Inside init();
// Set the position of the camera to be 800 on the z-axis
camera.position.set(0,0,800);
{% endhighlight %}

Now that our camera is set up, lets add our object.
An object needs the following:

1. Geometry - This tells our object what shape it should take.
2. Material - What our shape should look like.
3. Mesh - This combines our geometry and mesh so we can add it to the scene. 


{% highlight javascript %}
// Inside init()
geometry = new THREE.SphereGeometry( 200, 15, 10 );
material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 3 } );
mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );
{% endhighlight %}

Finally, we need to render the scene: 

{% highlight javascript %}
var renderOnPage = function() {
	renderer.render( scene, camera );
}
{% endhighlight%}

Now that we have our functions in place, we just need to call them. 

{% highlight javascript %}
init();
renderOnPage();
{% endhighlight %}

You should see something very similar to what is displayed below: 

<figure>
	<canvas id="part1"></canvas>
	<figcaption>End result of Part 1</figcaption>
</figure>

If you don't see a white sphere on a black background, feel free to <a href="/assets/2016/05/three_js/downloads/part1/part_1_end.html" download="three_js_part1_end.html">download the finished file</a> so you can find out what went wrong. 

This might not look like much, but it's a great start to putting together the pieces of three.js. In the next part, I'll show you how to style the sphere, and how to make it spin!

<!-- ON TO PART 2 -->


<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"></script>
<script>

	// var camera, scene, ratio, renderer, width;
	// var geometry, material, mesh;

	var Demo = {};

	Demo.camera;
	Demo.scene;
	Demo.renderer;
	Demo.width;
	Demo.geometry;
	Demo.material;
	Demo.mesh;

	Demo.init = function () {

		var my_canvas = document.getElementById('demo');

		if ( (window.innerWidth - 60) > 680 ) {
			width = 680;
		} else {
			width = window.innerWidth - 60;
		}

		Demo.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		Demo.renderer.setSize( width, window.innerHeight/2 );
		Demo.renderer.setClearColor( 0x7FFFD4 );

		Demo.camera = new THREE.PerspectiveCamera( 75, width / (window.innerHeight/2), 1, 2000 );
		Demo.camera.position.z = 800;

		Demo.scene = new THREE.Scene();

		Demo.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		Demo.material = new THREE.MeshBasicMaterial( { color: 0xDDA0DD, wireframe: true, wireframeLinewidth: 2 } );

		Demo.mesh = new THREE.Mesh( Demo.geometry, Demo.material );
		
		Demo.scene.add( Demo.mesh );
	}

	Demo.animate = function() {

		requestAnimationFrame( Demo.animate );

		Demo.mesh.rotation.x = Date.now() * 0.0002;
		Demo.mesh.rotation.y = Date.now() * 0.001;

		Demo.renderer.render( Demo.scene, Demo.camera );

	}

	Demo.init();
	Demo.animate();

	Demo.debounce = function(func, wait, immediate) {
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

	Demo.canvasSize = Demo.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 60) > 680 ) {
			width = 680;
		} else {
			width = window.innerWidth - 60;
		}

		
		camera.aspect= width / ( window.innerHeight/2 ) ;
		camera.updateProjectionMatrix();

		renderer.setSize( width, window.innerHeight/2 );

	}, 250);

	var Part1 = {};

	Part1.camera;
	Part1.scene;
	Part1.renderer;
	Part1.width;
	Part1.geometry;
	Part1.material;
	Part1.mesh;


	Part1.init = function () {

		var my_canvas = document.getElementById('part1');

		if ( (window.innerWidth - 60) > 680 ) {
			width = 680;
		} else {
			width = window.innerWidth - 60;
		}

		console.log(width);

		Part1.ratio = width / ( window.innerHeight/2 );

		Part1.renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		Part1.renderer.setSize( width, window.innerHeight/2 );
		Part1.renderer.setClearColor( 0x000000 );

		Part1.camera = new THREE.PerspectiveCamera( 75, width / (window.innerHeight/2), 1, 2000 );
		Part1.camera.position.z = 800;

		Part1.scene = new THREE.Scene();

		Part1.geometry = new THREE.SphereGeometry( 300, 15, 10 );
		Part1.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

		Part1.mesh = new THREE.Mesh( Part1.geometry, Part1.material );
		
		Part1.scene.add( Part1.mesh );
	}



	Part1.renderOnPage = function () {

		Part1.renderer.render( Part1.scene, Part1.camera );

	}

	Part1.init();
	Part1.renderOnPage();

	Part1.debounce = function(func, wait, immediate) {
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

	Part1.canvasSize = Part1.debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 60) > 680 ) {
			width = 680;
		} else {
			width = window.innerWidth - 60;
		}

		
		Part1.camera.aspect= width / ( window.innerHeight/2 ) ;
		Part1.camera.updateProjectionMatrix();

		Part1.renderer.setSize( width, window.innerHeight/2 );

	}, 250);

	window.addEventListener('resize', Demo.canvasSize);
	window.addEventListener('resize', Part1.canvasSize);
</script>


