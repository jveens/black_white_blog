---
layout: post
title:  "Sass loops FTW"
date:   2016-06-19 00:00:00 -0400
category: tutorial
tags: [html/css, sass]
---

Lately I've been working on a project that has a fairly large color pallette. The brand has 9 different colors and the main components for the site need to be available in every color.

Recently I was going through the sass files, looking for where I could make improvements, and decided that no, I will not be individually declaring variants for each color class because: 

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

Since we already had our colors stored as variables, I created another variable of all the colors, as well as their corresponding class name:

{% highlight scss %}

$red  : #ff0000;
$blue : #0000ff;
$green: #00ff00;
// for all the colors....

$colors: ( 'red', $red ),
	 ( 'blue', $blue ),
	 ( 'green',$green );  // and all the other colors...

{% endhighlight%}

This way the class name was kept together with the color variable and we could easily loop through them: 

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
<p class="caption">Sooooo much easier to read AND manage.</p>

Something interesting just happened here. If you're familiar with Ruby, then you've already experienced 'string interpolation'. Interpolation takes whatever variable you're using between the hashtag-curly-brackets ( #{ } ) and spits out the value. So in the above example we get the same results as if we wrote out all those class names manually. 

That's it! The code we have to write is reduced, and our files are much more readable now. 

Sass Loops FOR THE WIN!




<!-- You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
 -->