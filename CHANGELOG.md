# Getting started with cssanimation.io 
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)

> In modern web concept, cssanimation.io is the best controlling animation library for CSS and [GreenSock](https://greensock.com/),  Moving forward with this library, you need to have a basic idea on HTML and CSS3. We believe you have that. If you are pretty confused, just refreshing your idea from [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) to go along more easily.

This library is too easy to install and implement. Anything you can be done with our relevant animation class name. So [Download](https://codeload.github.com/yesiamrocks/cssanimation.io/zip/master) and let’s get started with this library.

**_We also offer to you [GreenSock](https://greensock.com/) animation, just fly over [here](https://cssanimation.io/how-to-use.html) to get the guideline._**

To get started, from the outset you download the complete library or use a CDN hosted version by jsDelivr. All CDN URLs below:
- **cssanimation.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **cssanimation.min.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **letteranimation.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.js
- **letteranimation.min.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js
- **cssanimation greenSock version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.js
- **cssanimation greenSock min version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js


## Usage

1. Include the `cssanimation.css` or `cssanimation.min.css` stylesheet into the head 

``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
    <link href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css" rel="stylesheet">
</head> 
<body> 

</body>
</html>
```

2. Now add the class `cssanimation` and class of animation name like `fadeIn` for fade in animation to the element that you want to animate. For list of animation class name check out the [home page](http://cssanimation.io/)
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
    <link href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css" rel="stylesheet">
</head> 
<body> 

   <h1 class="cssanimation fadeIn"> Example </h1> 

</body>
</html>
```

3. And if you want letter animation, There are two versions here. One is the sequential and the other is random animation. Just add the file `letteranimation.js` before the body tag. Now add a letter animation class like `leFadeIn` for letter fade in animation then must be add `sequential` class for to get an animation in sequence or `random` class for animate randomly.
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
    <link href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css" rel="stylesheet">
</head> 
<body> 

   <h1 class="cssanimation leFadeIn sequence"> Example </h1>
   <h1 class="cssanimation leFadeIn random"> Example </h1>

   <script type="text/javascript" src=" https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js"></script>
</body>
</html>
```


4. You may also want to include the class `infinite` for an infinite loop.
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
    <link href="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css" rel="stylesheet">
</head> 
<body> 

   <h1 class="cssanimation fadeIn infinite"> Example </h1> 

   <script type="text/javascript" src=" https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js"></script>
</body>
</html>
```
## Extremely light weight
Unlike all the other complicated vendors, our `cssanimation.css` **is only 84kb with 300 animations, 165kb in the minified version with all prefix and only 10kb when compressed.
And the letteranimation.js only 3kb, with 1kb in the minified version and only 0.6kb when compressed.**

**Hard to believe it!!! We know, Believe it!!!**

## Having trouble?
If **cssanimation.io** isn't doing what you expect it to please post a mail to hello@cssanimation.io or create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

## License
cssanimation.io is licensed under the [MIT Licenses](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)
