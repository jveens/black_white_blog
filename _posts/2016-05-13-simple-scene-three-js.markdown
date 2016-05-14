---
layout: post
title:  "Creating a Simple Scene with Three.js"
date:   2016-04-20 21:35:50 -0400
category: Javascript
---

Three.js is a super cool library that lets us create 3D objects and scenes in the browser. I’ve been really excited about this since I started in web development. There is just this catch though: Three.js can get real complicated, real fast. My goal here is to go over the basics, so that you can get started with three.js today (And build more cool stuff in the future!). 


### WHAT WE'LL BE BUILDING:
We're going to start out with three.js by building a simple scene. 
In this scene is going to be a wireframe sphere that spins:  

<canvas id="demo"></canvas>

To create this scene there are only 4 things we need:  

1. A Renderer (Canvas element)
2. A Scene
3. A Camera 
4. A mesh (Object to view)

I like to think of working in three.js as creating a movie. We need our actors (mesh objects), a camera to film with, and a scene where the action takes place. And then for a viewer to see what we’ve created, they need something to view it with. In real life this could be a television, theatre, or computer, but here we’re going to use an HTML `<canvas>` element. 

### LETS GET STARTED

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
// First we need our renderer
var renderer = new THREE.WebGLRenderer();

// Then we'll set it so that it takes up the entire viewport
renderer.setSize( window.innerWidth, window.innerHeight );

// Now let's add our renderer to our document
document.body.appendChild( renderer.domElement );
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
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
{% endhighlight%}

Now that our camera is set up, lets add our object.
An object needs the following:
1. Geometry
	This tells our object what shape it should take.
2. Material
	This tells our object what it should look like.
3. Mesh
	This puts our geometry and mesh together so we can add it to the scene. 


{% highlight javascript %}
var geometry = new THREE.SphereGeometry( 200, 15, 10 );
var material = new THREE.MeshBasicMaterial( { color: 0xDDA0DD, wireframe: true, wireframeLinewidth: 3 } );
var mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );
{% endhighlight %}


<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"></script>
<script>

	
	var camera, scene, ratio, renderer, width;
	var geometry, material, mesh;

	var init = function () {

		var my_canvas = document.getElementById('demo');

		if ( (window.innerWidth - 60) > 860 ) {
			width = 860;
		} else {
			width = window.innerWidth - 60;
		}

		console.log(width);

		ratio = width / ( window.innerHeight/2 );

		renderer = new THREE.WebGLRenderer( { canvas: my_canvas } );
		renderer.setSize( width, window.innerHeight/2 );
		renderer.setClearColor( 0x7FFFD4 );

		camera = new THREE.PerspectiveCamera( 75, width / (window.innerHeight/2), 1, 2000 );
		camera.position.z = 800;

		scene = new THREE.Scene();

		geometry = new THREE.SphereGeometry( 300, 15, 10 );
		material = new THREE.MeshBasicMaterial( { color: 0xDDA0DD, wireframe: true, wireframeLinewidth: 2 } );

		mesh = new THREE.Mesh( geometry, material );
		
		scene.add( mesh );
	}

	var animate = function () {

		requestAnimationFrame( animate );

		mesh.rotation.x = Date.now() * 0.0002;
		mesh.rotation.y = Date.now() * 0.001;

		renderer.render( scene, camera );

	}

	init();
	animate();

	function debounce(func, wait, immediate) {
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

	var canvasSize = debounce(function() {
		// All the taxing stuff you do

		if ( (window.innerWidth - 60) > 860 ) {
			width = 860;
		} else {
			width = window.innerWidth - 60;
		}

		
		camera.aspect= width / ( window.innerHeight/2 ) ;
		camera.updateProjectionMatrix();

		renderer.setSize( width, window.innerHeight/2 );

	}, 250);

	window.addEventListener('resize', canvasSize);
</script>



