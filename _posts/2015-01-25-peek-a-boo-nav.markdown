---
layout: post
title:  "How To: Peekaboo Nav Bar"
date:   2015-01-25 21:35:50 -0400
category: tutorial
tags: [html/css]
---

*This article originally posted on [Medium](https://medium.com/@jennyveens/how-to-peekaboo-nav-bar-6f795c17b3b7#.b5rn6lkk3)*

View Demo here: [Peekaboo Nav Bar (Codepen)](http://codepen.io/jennyveens/pen/GgEdpy).

This week at HackerYou we tackled HTML5 and CSS3.
As our first project, we were tasked with coding a one-page website from scratch. Having already completed a similar task before the course started, I wanted to incorporate some effects I’ve never used before. As soon as I saw THIS nav bar, I knew I wanted to make it my own.

Upon inspecting the nav bar element, I was found that they used a little trick here: They made a slice of the top of the image in fit into the nav bar that seamlessly blended with the header image. This image could then be applied as a nav bar background to be revealed when a nav link was hovered.
Not wanting to deal with precisely creating a slice of my header image (too much math!), I was determined to find another way. My first thought was this:

{% highlight css %}
nav {
  background: rgba(0,0,0,0.7);
}
nav ul li a:hover {
  background: none;
}
{% endhighlight %}

I quickly realized this wouldn’t work, as the background on a:hover would simply reveal the transparent black background on the nav.

In order to make this happen, I had to ensure that there were no backgrounds between the image I wanted to reveal and the nav elements that would show through on hover.
I started by splitting the nav into 2 sections: one for the Company name, and another for the actual nav bar. By floating these 2 elements side by side, I would give the illusion of a full-bleed nav. The nav li were then divided into 4 equal sections.

{% highlight css %}
nav {
  width: 55%;
  float:right;
}
.companyName {
  width:45%;
  float:left;
}
nav ul li {
  width: 25%;
  float: left;
}
{% endhighlight %}

Here’s a look at the nav before I edit down the padding on the Company name h2:

<figure>
	<img src="{{ site.url }}/assets/2015/01/peek-a-boo-nav/nav-bar-1.png" alt="The navbar with minimal styling">
	<figcaption>Here we can clearly see that our ‘nav bar’ is really made up of 2 separate elements.</figcaption>
</figure>

The then edited the padding on the .companyName, and jacked up the padding on the left side to make it look like margin: 0 auto was centering it on the page. Now it looks more like this:

<figure>
	<img src="{{ site.url }}/assets/2015/01/peek-a-boo-nav/nav-bar-2.png" alt="Navbar with centered left side, uneven right side.">
	<figcaption>Things are looking better - but it's a bit lopsided.</figcaption>
</figure>

Things are looking better — using padding to push in the h2 gives the appearance of centering on the page.
I wanted to push in the right side a bit as well, no one likes a lop-sided webpage!

{% highlight css %}
header nav ul li {
  border-right: 100px solid rgba(0,0,0,0.7);
}
{% endhighlight %}

Finished nav bar with a ‘margin: 0 auto’ appearance.

<figure>
	<img src="{{ site.url }}/assets/2015/01/peek-a-boo-nav/nav-bar-3.png" alt="The finished navbar!">
	<figcaption>The finished navbar!</figcaption>
</figure>

<figure>
	<img src="{{ site.url }}/assets/2015/01/peek-a-boo-nav/nav-bar-4.png" alt="Finished navbar with a demo hover.">
	<figcaption>Finished navbar with a transparent hovered link.</figcaption>
</figure>

Finished nav bar with a hovered link.
Ta-da! All done. 

Check out the full code here: [Peekaboo Nav Bar (Codepen)](http://codepen.io/jennyveens/pen/GgEdpy).

If you have any questions, get at me on twitter [@jennyveens](https://twitter.com/jennyveens).

Have a better way of achieving this effect? I’d love to see it! Please share it in the comments ☺