# How to use cssanimation.io's GSAP version
Have a great news for you. Do you know anything about the GreenSock Animation Platform? [GreenSock](https://greensock.com/) is a JavaScript framework which makes it easy to animate HTML elements. And yes GreenSock is absolutely a JavaScript framework, it is not CSS. **So we’ve created another version of cssanimatio.io that animate HTML element by GreenSock**. 
That means you animate your HTML element by [GreenSock](https://greensock.com/) the animations that you saw on the home page. So, why worry about something else? Let's get started!!

****please follow the instruction below**

First, you download or grab the CDN URL of `TweenMax.js` plugin from [GreenSock](https://greensock.com/tweenmax) and download cssanimation.io's GSAP script `cssanimation-gsap.js` from [cssanimation.io](http://localhost/cssanimation/lib/cssanimation.zip)

1. Include the `TweenMax.min.js` and `cssanimation-gsap.js` before the body tag like below:
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>Document</title> 
</head> 
<body> 

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js"></script> 
   <script type="text/javascript" src="cssanimation-gsap.js"></script>
</body>
</html>
```

2. Now add the class `cssanimation` and class of animation name like `fadeIn` for fade in animation to the element that you want to animate. [For list of animation class name check out the [home page](http://cssanimation.io/) or check in codepen title red block section from below or click here ]
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>Document</title> 
</head> 
<body> 

   <h1 class="cssanimation fadeIn"> Example </h1> 

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script> 
   <script type="text/javascript" src="cssanimation-gsap.js">
</body>
</html>
```

3. And if you want letter animation, There are two versions here. One is the sequential and the other is random animation. Just add the file `letteranimation.js` before the body tag. Now add a letter animation class like `leFadeIn` for letter fade in animation then must be add `sequential` class for to get an animation in sequence or `random` class for animate randomly.
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>Document</title> 
</head> 
<body> 

   <h1 class="cssanimation leFadeIn sequence"> Example </h1>
   <h1 class="cssanimation leFadeIn random"> Example </h1>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script> 
   <script type="text/javascript" src="cssanimation-gsap.js">
</body>
</html>
```

**It's that easy! 😀**

## Having trouble?
If **cssanimation.io** isn't doing what you expect it to please post a mail to hello@cssanimation.io or create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

## License
cssanimation.io is licensed under the [MIT Licenses](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)
