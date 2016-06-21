---
layout: post
title:  "Sass loops FTW"
date:   2016-06-19 00:00:00 -0400
category: tutorial
tags: [html/css, sass]
comments: true
disqus_identifier: lasso-group-ache
---

Lately I've been working on a project that has a fairly large color palette. The brand has 9 different colors and the main components for the site need to be available in every color. I was going through the sass files, and after lots and lots of scrolling, I decided that no, I can't do this. *There must be a better way.* 

And so I will no longer be individually declaring variants for each color class because: 

1. Too time consuming. 
2. NOT AT ALL D.R.Y. 

There was a lot of this: 

{% highlight scss %}

.btn-primary {
  // some styles here
  &.red {
    border: 1px solid $red;
    background-color: darken( $red, 10% );
  }
  &.blue {
    border: 1px solid $blue;
    background-color: darken( $blue, 10% );
  }
  &.green {
    border: 1px solid $green;
    background-color: darken( $green, 10% );
  }
  // and so on ...
}

{% endhighlight %}
<p class="caption">This might not look too bad, but now imagine 6 more color variants, hover styles, focus styles, active styles... !! Too much!</p>

Since we already had our colors stored as variables, I created another variable of all the colors, as well as their corresponding class name as a string:

{% highlight scss %}

$red  : #ff0000;
$blue : #0000ff;
$green: #00ff00;
// for all the colors....

$colors: ( 'red', $red ),
	 ( 'blue', $blue ),
	 ( 'green',$green );  // and all the other colors...

{% endhighlight%}

By keeping the class name and the color variable together with parentheses, we could easily loop through them and use string interpolation to give us the values that we want: 

{% highlight scss %}
.btn-primary {
  // base styles here

  @each $class, $color in $colors {
    &.#{$class} {
      border: 1px solid $color;
      background-color: darken( $color, 10% );
    }
  }
}
{% endhighlight %}
<p class="caption">If you're familiar with Ruby, then you've already experienced 'string interpolation'. Interpolation takes whatever variable you're using between the hashtag-curly-brackets ( #{ } ) and spits out the value.</p>

So in the above example we get the same compiled code as if we wrote out all those class names manually. And as an extra bonus, if any one of those colors changes, or one has to be added or removed, all we have to do is update our $colors variable!

That's it! The code we have to write is reduced, our files are more readable and more manageable. WIN!


