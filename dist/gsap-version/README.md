# How to use cssanimation.io's GSAP version
This library is not only built for CSS, it supports [GreenSock](https://greensock.com/) as well. Greensock is the standard JavaScript Animation framework in the world. It can help you to animate your HTML elements.

This is absolutely easy to have your HTML elements animated by our  [GreenScok Version](https://codeload.github.com/yesiamrocks/cssanimation.io/zip/master) After include all the files  or use a CDN hosted version by jsDelivr. All CDN URLs below:

- **cssanimation.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **cssanimation.min.css:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/cssanimation.min.css
- **letteranimation.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.js
- **letteranimation.min.js:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/letteranimation.min.js
- **cssanimation greenSock version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.js
- **cssanimation greenSock min version:** https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js

And then just add your desired class name. So why worried? Include ‍and let’s get started with this library.

1. First, you download or grab the CDN URL of `TweenMax.js` plugin from [GreenSock](https://greensock.com/tweenmax) and include the `TweenMax.min.js` and `cssanimation-gsap.js` before the body tag like below:

``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
</head> 
<body> 

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js"></script> 
   <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js"></script>
</body>
</html>
```

2.  Now add the class `cssanimation` and class of animation name like `fadeI`n for fade in animation to the element that you want to animate. For list of animation class name check out the [home page](http://cssanimation.io/)

``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
</head> 
<body> 

   <h1 class="cssanimation fadeIn"> Example </h1> 

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script> 
   <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js"></script>
</body>
</html>
```

3. And if you want letter animation, Just add a letter animation class like `leFadeIn` for fade in letter animation. And now gsap version support only sequential animation. But no worries about random animation, We are working on it. Very soon you'll get the code.

``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>CSS Animation Library for Developers and Ninjas</title> 
</head> 
<body> 

   <h1 class="cssanimation leFadeIn"> Example </h1>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script> 
   <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/yesiamrocks/cssanimation.io@1.0.3/gsap-version/cssanimation-gsap.min.js"></script>
</body>
</html>
```


**It's that easy! 😀**

## Extremely light weight
Unlike all the other complicated vendors, our `cssanimation-gsap.js` is only 44kb with 224 animations, 33kb in the minified version and only 5kb when compressed.

**Extremely light weight!!! We know, Believe it!!!**

## Having trouble?
If **cssanimation.io** isn't doing what you expect it to please post a mail to hello@cssanimation.io or create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

## License
cssanimation.io is licensed under the [MIT Licenses](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)
