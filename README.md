# Getting started with cssanimation.io
In this documantation we discussed about cssanimation.io's CSS version which professional-grade animation library for the modern web. If you want cssanimation.io's animation by [GreenSock](https://greensock.com/), Please [check our another documantation](https://github.com/yesiamrocks/cssanimation.io/tree/master/GreenSock%20Version), which will guide you about the GreenSock.

With cssanimation.io, all you have to do is to include the appropriate classes with your elements. The method of including the CSS version is outlined below:

To get started, from the outset you download the complete library and then


1. Include the `cssanimation.css` or `cssanimation.min.css` stylesheet into the head.
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>Document</title> 
    <link href="cssanimation.min.css" rel="stylesheet">
</head> 
<body> 

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
    <link rel="stylesheet" href="cssanimation.min.css">
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
    <title>Document</title> 
    <link rel="stylesheet" href="cssanimation.min.css">
</head> 
<body> 

   <h1 class="cssanimation leFadeIn sequence"> Example </h1>
   <h1 class="cssanimation leFadeIn random"> Example </h1>

   <script type="text/javascript" src="letteranimation.js">
</body>
</html>
```


4. You may also want to include the class `infinite` for an infinite loop.
``` html
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta charset="UTF-8">
    <title>Document</title> 
    <link rel="stylesheet" href="cssanimation.min.css">
    <script type="text/javascript" src="letteranimation.js">
</head> 
<body> 

   <h1 class="cssanimation fadeIn infinite"> Example </h1> 

</body>
</html>
```

## Having trouble?
If **cssanimation.io** isn't doing what you expect it to please post a mail to hello@cssanimation.io or create a [issue](https://github.com/yesiamrocks/cssanimation.io/issues)

## License
cssanimation.io is licensed under the [MIT Licenses](https://github.com/yesiamrocks/cssanimation.io/blob/master/LICENSE)
