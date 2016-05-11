---
layout: post
title:  "How To: Reveal on Hover &lt;div&gt;"
date:   2015-02-02 21:35:50 -0400
category: Tutorial
tags: html, css
---

*This article originally posted on [Medium](https://medium.com/@jennyveens/how-to-reveal-on-hover-div-63e18a6158b8#.cxzwryuj0)*

View Demo here: [Reveal On Hover <div> (Codepen)](http://codepen.io/jennyveens/full/bNopLb/).

For a recent project I was tasked with the challenge of flexing my ‘absolute positioning’ muscle(s). I felt as though having some element floating on the screen (other then the `<nav>`) would muss up the design and make it obvious it didn’t belong...
I knew I wanted to include a ‘Reveal-On-Hover’ (ROH) `<div>` or two. Once I started exploring this effect, I found out it was created with absolutely positioned elements. BAM!, BAM !— Two birds, one stone.
Here’s a look at the finished effect (Check out the full code on CodePen):

<figure>
    <img src="{{ site.url }}/assets/2015/02/reveal-on-hover/hover-1.png" alt="The navbar with minimal styling">
    <figcaption>Initial state: Faded out background, greyed text.</figcaption>
</figure>

<figure>
    <img src="{{ site.url }}/assets/2015/02/reveal-on-hover/hover-2.png" alt="The navbar with minimal styling">
    <figcaption>Hover state (middle &lt;div&gt;): Coloured background and text.</figcaption>
</figure>

This effect is high-impact, and not that difficult to achieve. To accomplish it, we layer `<divs>` using z-index and some ::before pseudo-element wizardry.
Here is what you need to create your hover `<div>`:
A container `<div>`.
And then inside your container put an empty `<span>` enclosed by an `<a>` tag.
Also in the container `<div>` insert another `<div>` to hold the background.
And one last `<div>` to hold the text.

{% highlight html %}
<div class="container">
    <a class="divLink" href="#link"><span></span></a>
    <div class="background"></div>
    <div class="text">
        <p>Lorem ipsum dolor.</p>
    </div><!-- end of .text -->
</div><!-- end of .container -->
{% endhighlight %}

We want to arrange the elements of the container to make our ROH `<div>`. Starting from the top, this is what we need:
The link (if it gets stuck under another element, we can’t click it).
The text.
The background::before (this appears as the overlay on our background, we’ll turn the opacity from 90% to 10% create the reveal effect).
The background.
Now for the CSS:
Since our container `<div>` will be the basis for the position of all other elements, let’s go ahead and make it relative and set the width:

{% highlight css%}
.container {
   position: relative;
   width: 33.3333%;
   transition: all 0.5s;
}
{% endhighlight %}

Next up is the full-div link. We know we want it to take up the entire space of the div, so let’s use that `<span>` to make it happen:

{% highlight css %}
.divLink span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 20;
}
{% endhighlight %}

We want to pretty much repeat this on the `<div>` containing the background to ensure that the background also takes up the entire space of the `<div>`. Be sure to include background-size: cover; so that the image doesn’t look zoomed-in.
Also, this is the `<div>` we want on the bottom of our stack, so give it a low z-index. This is also where we want to make all the CSS transition magic happen, so let’s set that too:

{% highlight css %}
.background {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: 1;
    background-image: url(images/...);
    transition: background 0.5s;
}
{% endhighlight %}

Next, let’s include the overlay. We’ll do this with a ::before pseudo-element. The z-index has to be greater than that of the background, but less than that of the link:

{% highlight css %}
.background::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0; 
    width: 100%;
    background-color: rgba(0,0,0,0.8); 
    z-index: 10;  
}
{% endhighlight %}

Next, style your text `<div>` however you like. Be sure to set position: relative and the z-index between your ::before element and your link element. The text doesn’t have to be grey in the inital state, but mine will be:

{% highlight css %}
.text {
    color: silver;
    position: relative;
    padding: 20px;
    z-index: 15;
}
{% endhighlight %}

Finally, let’s add in the hover states. We want the background opacity to decrease, and the font color to change:

{% highlight css%}
.container:hover .background::before {
    background-color: rgba(0,0,0,0.2);
}
.container:hover .text {
    color: goldenRod;
}
{% endhighlight %}

That’s it!

Please let me know if you have any questions by leaving a comment below, or you can get me on Twitter [@jennyveens](https://twitter.com/jennyveens).

Check out the full code on [CodePen](http://codepen.io/jennyveens/full/bNopLb/).