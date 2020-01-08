window.onload = function () {
  animateSequence();
  animateRandom();
  initTweenMax();
};

function animateSequence() {
  var a = document.getElementsByClassName('cssanimation');
  for (var i = 0; i < a.length; i++) {
    var $this = a[i];
    var letter = $this.innerHTML;
    letter = letter.trim();
    var str = '';
    var delay = 100;
    for (l = 0; l < letter.length; l++) {
      if (letter[l] != ' ') {
        str += '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[l] + '</span>';
        delay += 150;
      } else
        str += letter[l];
    }
    $this.innerHTML = str;
  }
}

function animateRandom() {
  var a = document.getElementsByClassName('random');
  for (var i = 0; i < a.length; i++) {
    var $this = a[i];
    var letter = $this.innerHTML;
    letter = letter.trim();
    var delay = 70;
    var delayArray = new Array;
    var randLetter = new Array;
    for (j = 0; j < letter.length; j++) {
      while (1) {
        var random = getRandomInt(0, (letter.length - 1));
        if (delayArray.indexOf(random) == -1)
          break;
      }
      delayArray[j] = random;
    }
    for (l = 0; l < delayArray.length; l++) {
      var str = '';
      var index = delayArray[l];
      if (letter[index] != ' ') {
        str = '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[index] + '</span>';
        randLetter[index] = str;
      } else
        randLetter[index] = letter[index];
      delay += 80;
    }
    randLetter = randLetter.join("");
    $this.innerHTML = randLetter;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



TweenMax.from(".moveFromLeft", 1, { x: "-100%" });

function initTweenMax() {
  // Striking Animation
  TweenMax.to(".hu__hu__", 1.5, { y: 30, yoyo: true, repeat: -1, ease: Sine.easeInOut });
  TweenMax.staggerTo(".snake span", 0.75, { y: 30, yoyo: true, repeat: -1, ease: Sine.easeInOut }, 0.2);
  TweenMax.to(".effect3d", 1.5, { textShadow: "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15)", ease: Sine.easeInOut });
  // .rainDrop (under construction) 
  TweenMax.staggerTo(".rainDrop span", 0.75, { y: 30, yoyo: true, repeat: -1, transformStyle: 'preserve3d', transform: "scaleX(1.3deg) scaleY(0.8deg)", ease: Sine.easeInOut }, 0.2);
  // .pepe (under construction) 
  // .leWaterWave (under construction) 
  // .lightning (under construction) 
  // .leJoltZoom (under construction) 
  // .typing (under construction) 
  // .electricity (under construction) 
  // .wipe (under construction) 
  // .open (under construction) 
  // .leMagnify (under construction) 
  // .leBeat (under construction) 
  // .pepe (under construction) 

  // Letter Fade In Animation
  TweenMax.staggerFrom(".leFadeIn span", 1, { autoAlpha: 0, ease: Power4.easeIn }, 0.2);
  TweenMax.staggerFrom(".leFadeInLeft span", 1, { x: "-80", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerFrom(".leFadeInRight span", 1, { x: "80", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerFrom(".leFadeInTop span", 1, { y: "-100%", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerFrom(".leFadeInBottom span", 1, { y: "100%", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);

  // Letter Fade Out Animation
  TweenMax.staggerTo(".leFadeOut span", 1, { autoAlpha: 0, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerTo(".leFadeOutLeft span", 1, { x: "-60", autoAlpha: 0, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerTo(".leFadeOutRight span", 1, { x: 60, autoAlpha: 0, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerTo(".leFadeOutTop span", 1, { y: "-100%", autoAlpha: 0, ease: Power4.easeOut }, 0.2);
  TweenMax.staggerTo(".leFadeOutBottom span", 1, { y: "100%", autoAlpha: 0, ease: Power4.easeOut }, 0.2);

  // Moving Back Animation
  // .leMovingBackFromRight (under construction) 
  // .leMovingBackFromLeft (under construction) 

  // Kick out Animation
  // .leKickOutBehind (under construction) 
  // .leKickOutFront (under construction) 

  // Letter Skate Animation
  TweenMax.staggerTo(".leSkateX span", 0.5, { scaleX: 0.4, ease: Sine.easeInOut, yoyo: true, repeat: -1 }, 0.2);
  TweenMax.staggerTo(".leSkateY span", 0.5, { scaleY: 0.4, ease: Sine.easeInOut, yoyo: true, repeat: -1 }, 0.2);
  // .leSkateXY (under construction) 
  var tl = new TimelineMax({ repeat: -1, repeatDelay: 0 });
  tl
    .staggerTo(".leSkateXY span", 0.5, { scaleX: 1, scaleY: 0.4, ease: Power2.easeOut }, 0.2)
    .staggerTo(".leSkateXY span", 0.5, { scaleX: 0.4, scaleY: 0.4, scaleZ: 1, ease: Power2.easeOut }, 0.2, '-=2.25')
    .staggerTo(".leSkateXY span", 0.5, { scaleX: 0.4, scaleY: 1, scaleZ: 1, ease: Power2.easeOut }, 0.2, '-=1.89')
    .staggerTo(".leSkateXY span", 0.5, { scaleX: 1, scaleY: 1, scaleZ: 1, ease: Power2.easeOut }, 0.2, '-=1.5');

  // Letter Scale Animation
  TweenMax.staggerFromTo(".scaleXIn span", 1, { autoAlpha: 0, rotationX: 90, perspective: 400, ease: Power3.easeInOut }, { autoAlpha: 1, rotationX: 0, ease: Power3.easeInOut }, 0.2);
  TweenMax.staggerFromTo(".scaleXOut span", 1, { autoAlpha: 1, rotationX: 0, perspective: 400, ease: Power2.easeOut }, { autoAlpha: 0, rotationX: 90, ease: Power2.easeOut }, 0.25);
  TweenMax.staggerFromTo(".scaleYIn span", 1, { autoAlpha: 0, rotationY: 90, perspective: 400, ease: Power3.easeInOut }, { autoAlpha: 1, rotationY: 0, ease: Power3.easeInOut }, 0.2);
  TweenMax.staggerFromTo(".scaleYOut span", 1, { autoAlpha: 1, rotationY: 0, perspective: 400, ease: Power2.easeOut }, { autoAlpha: 0, rotationY: 90, ease: Power2.easeOut }, 0.25);

  // Letter Jump Animation
  TweenMax.staggerTo(".leJump span", 0.8, { y: "-20", ease: Sine.easeOut, repeat: -1, repeatDelay: 0.15 }, 0.2);

  // Letter Fly Animation
  var tl = new TimelineMax({ delay: 0 });
  tl
    .staggerTo(".aboundTop span", 0.5, { y: -100, ease: Power2.easeOut }, 0.2)
    .staggerTo(".aboundTop span", 0.5, { y: 0, ease: Power2.easeIn }, 0.2, '-=2');
  var tl = new TimelineMax({ delay: 0 });
  tl
    .staggerTo(".aboundBottom span", 0.5, { y: 100, ease: Power2.easeOut }, 0.2)
    .staggerTo(".aboundBottom span", 0.5, { y: 0, ease: Power2.easeIn }, 0.2, '-=2');
  var tl = new TimelineMax({ delay: 0 });
  tl
    .staggerTo(".aboundLeft span", 0.5, { x: -100, ease: Power2.easeOut }, 0.2)
    .staggerTo(".aboundLeft span", 0.5, { x: 0, ease: Power2.easeIn }, 0.2, '-=2.5');
  var tl = new TimelineMax({ delay: 0 });
  tl
    .staggerTo(".aboundRight span", 0.5, { x: 100, ease: Power2.easeOut }, 0.2)
    .staggerTo(".aboundRight span", 0.5, { x: 0, ease: Power2.easeIn }, 0.2, '-=2.5');

  // Letter Fly In Animation
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".flyInTop span", 0.5, { x: 0, y: -800 }, { x: 40, y: 40, ease: Back.easeOut.config(1.4) }, 0.2)
    .staggerTo(".flyInTop span", 0.4, { x: 0, y: 0, delay: 0, ease: Power0.easeNone }, 0.2, '-=2.25');
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".flyInLeft span", 0.5, { autoAlpha: 0, x: -40, y: 0 }, { autoAlpha: 1, x: 40, y: 0, ease: Back.easeOut.config(1.4) }, 0.2)
    .staggerTo(".flyInLeft span", 0.5, { x: 0, y: 0, delay: 0, ease: Power0.easeNone }, 0.2, '-=2.25');
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".flyInRight span", 0.5, { autoAlpha: 0, x: 40, y: 0 }, { autoAlpha: 1, x: -40, y: 0, ease: Back.easeOut.config(1.4) }, 0.2)
    .staggerTo(".flyInRight span", 0.2, { x: 0, y: 0, delay: 0, ease: Power0.easeNone }, 0.2, '-=2.25');
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".flyInBottom span", 0.5, { x: 0, y: 800 }, { x: 10, y: -40, ease: Back.easeOut.config(1) }, 0.2)
    .staggerTo(".flyInBottom span", 0.4, { x: 0, y: 0, delay: 0, ease: Power0.easeNone }, 0.2, '-=2.25');

  // Letter Fly Out Animation
  var tl = new TimelineMax();
  tl
    .staggerTo(".flyOutTop span", 0.5, { x: 0, y: 40, ease: Power2.easeOut }, 0.2)
    .staggerTo(".flyOutTop span", 0.5, { x: 0, y: -800, ease: Back.easeOut.config(1.4) }, 0.2, '-=2');
  var tl = new TimelineMax();
  tl
    .staggerTo(".flyOutLeft span", 0.5, { x: 40, y: 0, ease: Power2.easeOut }, 0.2)
    .staggerTo(".flyOutLeft span", 0.5, { x: -1200, y: 0, ease: Back.easeOut.config(1.4) }, 0.2, '-=2');
  var tl = new TimelineMax();
  tl
    .staggerTo(".flyOutRight span", 0.5, { x: -40, y: 0, ease: Power2.easeOut }, 0.2)
    .staggerTo(".flyOutRight span", 0.5, { x: 1200, y: 0, ease: Back.easeOut.config(1.4) }, 0.2, '-=2');
  var tl = new TimelineMax();
  tl
    .staggerTo(".flyOutBottom span", 0.5, { x: 0, y: -40, ease: Power2.easeOut }, 0.2)
    .staggerTo(".flyOutBottom span", 0.5, { x: 0, y: 800, ease: Back.easeOut.config(1.4) }, 0.2, '-=2');

  // Letter Door Open & Close Animation
  var tl = new TimelineMax();
  tl.staggerFromTo(".leDoorCloseLeft span", 0.5, { autoAlpha: 0, rotationY: 90, perspective: 400, transformOrigin: "left", ease: Power0.easeNone }, { autoAlpha: 1, rotationY: 0, perspective: 400, transformOrigin: "left", ease: Power0.easeNone }, 0.2);
  var tl = new TimelineMax();
  tl.staggerFromTo(".leDoorCloseRight span", 0.5, { autoAlpha: 0, rotationY: -90, perspective: 400, transformOrigin: "right", ease: Power0.easeNone }, { autoAlpha: 1, rotationY: 0, perspective: 400, transformOrigin: "right", ease: Power0.easeNone }, 0.2);
  var tl = new TimelineMax();
  tl.staggerTo(".leDoorOpenLeft span", 0.5, { autoAlpha: 0, rotationY: -90, perspective: 400, transformOrigin: "right", ease: Power0.easeNone }, 0.2);
  var tl = new TimelineMax();
  tl.staggerTo(".leDoorOpenRight span", 0.5, { autoAlpha: 0, rotationY: 90, perspective: 400, transformOrigin: "left", ease: Power0.easeNone }, 0.2);

  // Letter Hang And Drop Animation
  // .leHangAndDropLeft (Under Construction) 
  // .leHangAndDropRight (Under Construction) 

  // Letter Shake
  // .leRencontre (Under Construction) 
  // .lePulseShake (Under Construction) 
  var tl = new TimelineMax({ delay: 1 });
  tl
    .staggerTo(".lePulseShake span", 0.2, { css: { scale: 1.2 }, repeat: -1, ease: Power0.easeNone }, 0.2)
    .staggerTo(".lePulseShake span", 0.2, { css: { scale: 1 }, repeat: -1, ease: Power0.easeNone }, 0.2, '-=2')
    .staggerTo(".lePulseShake span", 0.2, { css: { scale: 1.1 }, repeat: -1, ease: Power0.easeNone }, 0.2, '-=2')
    .staggerTo(".lePulseShake span", 0.2, { css: { scale: 1 }, repeat: -1, ease: Power0.easeNone }, 0.2, '-=2')
  // .leHorizontalShake (Under Construction) 
  // .leVerticalShake (Under Construction) 
  // .leMadMax (Under Construction) 
  // .leHorizontalTremble (Under Construction) 
  // .leVerticalTremble (Under Construction) 
  // .leCrazyCool (Under Construction) 
  // .leVibration (Under Construction) 

  // Letter Push Release
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".lePushReleaseFrom span", .5, { autoAlpha: 0, scaleY: 3, scaleX: 3, ease: Power3.easeOut }, { autoAlpha: 1, scaleY: .5, scaleX: .5, ease: Power2.easeOut }, .2)
    .staggerTo(".lePushReleaseFrom span", .5, { scaleY: 1, scaleX: 1, ease: Power2.easeOut }, .2, "-=2.2");
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".lePushReleaseFromLeft span", .5, { autoAlpha: 0, x: -100, ease: Power3.easeOut }, { autoAlpha: 1, x: 100, ease: Power2.easeOut }, .2)
    .staggerTo(".lePushReleaseFromLeft span", .5, { x: 0, ease: Power1.easeOut }, .2, "-=2.2");
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".lePushReleaseFromTop span", .5, { autoAlpha: 0, y: -100, ease: Power3.easeOut }, { autoAlpha: 1, y: 100, ease: Power2.easeOut }, .2)
    .staggerTo(".lePushReleaseFromTop span", .5, { y: 0, ease: Power1.easeOut }, .2, "-=2.2");
  var tl = new TimelineMax();
  tl
    .staggerFromTo(".lePushReleaseFromBottom span", .5, { autoAlpha: 0, y: 100, ease: Power3.easeOut }, { autoAlpha: 1, y: -100, ease: Power3.easeOut }, .2)
    .staggerTo(".lePushReleaseFromBottom span", .5, { y: 0, ease: Power2.easeOut }, .2, "-=2.25");
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePushReleaseTo span", .5, { autoAlpha: 1, scaleY: .5, scaleX: .5, ease: Power3.easeOut, delay: .5 }, .2)
    .staggerTo(".lePushReleaseTo span", .5, { autoAlpha: 0, scaleY: 5, scaleX: 5, ease: Power3.easeOut }, .2, "-=2.2");
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePushReleaseToTop span", .5, { autoAlpha: 1, y: 100, ease: Power2.easeOut }, .2)
    .staggerTo(".lePushReleaseToTop span", .5, { autoAlpha: 0, y: -100, ease: Power2.easeOut }, .2, "-=2.2");
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePushReleaseToBottom span", .5, { autoAlpha: 1, y: -100, ease: Power4.easeOut }, .2)
    .staggerTo(".lePushReleaseToBottom span", .5, { autoAlpha: 0, y: 100, ease: Power1.easeOut }, .2, "-=2.28");

  // Letter Flip
  var tl = new TimelineMax({ transformOrign: "0% 0%" });
  tl
    .staggerFrom(".leFlipInTop span", .2, { autoAlpha: 0, perspective: 600, rotationX: 0, ease: Power2.easeOut }, .2)
    .staggerTo(".leFlipInTop span", .5, { autoAlpha: 1, rotationX: 180, perspective: 600, ease: Power3.easeOut }, .2, "-=2.2")
    .staggerTo(".leFlipInTop span", .5, { rotationX: 0, perspective: 600, ease: Power3.easeOut }, .2, "-=2.3");
  // .leFlipOutTop (Under Construction) 
  // .leFlipInBottom (Under Construction) 
  // .leFlipOutBottom (Under Construction) 

  // Letter Elevate
  // .leElevateLeft (Under Construction) 
  // .leElevateRight (Under Construction) 

  // Letter Roll From
  TweenMax.staggerFrom(".leRollFromLeft span", 1, { autoAlpha: 0, x: -60, rotationY: 180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerFrom(".leRollFromRight span", 1, { autoAlpha: 0, x: 60, rotationY: -180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerFrom(".leRollFromTop span", 1, { autoAlpha: 0, y: -60, rotationX: 180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerFrom(".leRollFromBottom span", 1, { autoAlpha: 0, y: 60, rotationX: -180, perspective: 600, ease: Power2.easeOut }, 0.2);

  // Letter Roll To
  TweenMax.staggerTo(".leRollToLeft span", 1, { autoAlpha: 0, x: -60, rotationY: 180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(".leRollToRight span", 1, { autoAlpha: 0, x: 60, rotationY: -180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(".leRollToTop span", 1, { autoAlpha: 0, y: -60, rotationX: 180, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(".leRollToBottom span", 1, { autoAlpha: 0, y: 60, rotationX: -180, perspective: 600, ease: Power2.easeOut }, 0.2);

  // Letter Rotate In skate
  // .leRotateSkateInRight (Under Construction) 
  // .leRotateSkateInLeft (Under Construction) 
  // .leRotateSkateInTop (Under Construction) 
  // .leRotateSkateInBottom (Under Construction) 

  // Letter Rotate Out skate
  // .leRotateSkateOutRight (Under Construction) 
  // .leRotateSkateOutLeft (Under Construction) 
  // .leRotateSkateOutTop (Under Construction) 
  // .leRotateSkateOutBottom (Under Construction) 

  // Letter Rotation
  // .leRotateXZoomIn (Under Construction) 
  var tl = new TimelineMax({ perspective: 800, transformStyle: 'preserve3d' });
  tl
    .staggerFromTo(".leRotateXZoomIn span", .5, { autoAlpha: 0, transform: "rotateX(75deg) translate3d(0px,60px,100px)", ease: Power0.easeNone }, { autoAlpha: 1, transform: "rotateX(75deg) translate3d(0px,60px,50px)", ease: Power2.easeOut }, 0.2);
  //.staggerTo(".leRotateXZoomIn span", 1, {autoAlpha:1, transform:"rotateX(0deg) translate3d(0px,0px,0px)", ease: Power4.easeIn}, 0.2, '-=2.5');
  // .leRotateXZoomOut (Under Construction) 
  // .leRotateYZoomIn (Under Construction) 
  // .leRotateYZoomOut (Under Construction) 

  // Letter Rotate
  TweenMax.staggerFromTo(".leRotateIn span", 1, { autoAlpha: 0, rotation: -180, ease: Power0.easeNone }, { autoAlpha: 1, rotation: 0, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(".leRotateOut span", 1, { autoAlpha: 0, rotation: 180, ease: Power2.easeOut }, 0.2);
  var tl = new TimelineMax();
  tl.staggerFromTo(".leRotateInLeft span", 2, { autoAlpha: 0, rotation: '-180', x: -150, transformOrigin: '0% top', ease: Power0.easeNone }, { autoAlpha: 1, rotation: 0, x: 0, transformOrigin: '0% top', ease: Power2.easeOut }, 0.25);
  var tl = new TimelineMax();
  tl.staggerFromTo(".leRotateOutLeft span", 1, { autoAlpha: 1, rotation: 0, x: 0, transformOrigin: '0% bottom', ease: Power0.easeNone }, { autoAlpha: 0, rotation: '180', x: -150, transformOrigin: '0% bottom', ease: Power2.easeNone }, 0.25);
  var tl = new TimelineMax();
  tl.staggerFromTo(".leRotateInRight span", 1, { autoAlpha: 0, x: 150, rotation: '-180', transformOrigin: 'center top', ease: Power0.easeNone }, { autoAlpha: 1, x: 0, rotation: 0, transformOrigin: 'center top', ease: Power2.easeOut }, 0.25);
  var tl = new TimelineMax();
  tl.staggerFromTo(".leRotateOutRight span", 1, { autoAlpha: 1, x: 0, rotation: 0, transformOrigin: 'center top', ease: Power0.easeNone }, { autoAlpha: 0, x: 150, rotation: 180, transformOrigin: 'center top', ease: Power2.easeOut }, 0.25);

  // Letter Spin
  var tl = new TimelineMax();
  tl.staggerFrom(".leSpinInLeft span", 1, { autoAlpha: 0, rotation: 90, transformOrigin: 'left bottom', ease: Power2.easeOut }, 0.2);
  var tl = new TimelineMax();
  tl.staggerFrom(".leSpinInRight span", 1, { autoAlpha: 0, rotation: -90, transformOrigin: 'right bottom', ease: Power2.easeOut }, 0.2);
  var tl = new TimelineMax();
  tl.staggerTo(".leSpinOutLeft span", 1, { autoAlpha: 0, rotation: 90, transformOrigin: 'left bottom', ease: Power2.easeOut }, 0.2);
  var tl = new TimelineMax()
  tl.staggerTo(".leSpinOutRight span", 1, { autoAlpha: 0, rotation: -90, transformOrigin: 'right bottom', ease: Power2.easeOut }, 0.2);

  // Letter Blur In
  // .leBlurIn (Under Construction)
  // .leBlurInRight (Under Construction)
  // .leBlurInLeft (Under Construction)
  // .leBlurInTop (Under Construction)
  // .leBlurInBottom (Under Construction)

  // Letter Blur Out
  // .leBlurOut (Under Construction)
  // .leBlurOutRight (Under Construction)
  // .leBlurOutLeft (Under Construction)
  // .leBlurOutTop (Under Construction)
  // .leBlurOutBottom (Under Construction)

  // Letter Pop Up
  var tl = new TimelineMax()
  tl
    .staggerTo(".lePopUp span", .5, { scale: 1.5, delay: .5, ease: Power1.easeOut }, .2)
    .staggerTo(".lePopUp span", .5, { scale: 1, ease: Power1.easeOut }, .2, '-=2.2');
  var tl = new TimelineMax()
  tl
    .staggerTo(".lePopUpLeft span", .5, { x: -50, scale: 1.5, delay: .5, ease: Power1.easeOut }, .2)
    .staggerTo(".lePopUpLeft span", .5, { x: 0, scale: 1, ease: Power1.easeOut }, .2, '-=2.1');
  var tl = new TimelineMax()
  tl
    .staggerTo(".lePopUpRight span", .5, { x: 50, scale: 1.5, delay: .5, ease: Power1.easeOut }, .2)
    .staggerTo(".lePopUpRight span", .5, { x: 0, scale: 1, ease: Power1.easeOut }, .2, '-=2.1');

  // Letter Pop Out
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePopOut span", 0.5, { scale: 0.5, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".lePopOut span", 0.5, { scale: 1, ease: Power1.easeIn }, 0.2, '-=2.2');
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePopOutLeft span", 0.5, { x: -50, scale: 0.5, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".lePopOutLeft span", 0.5, { x: 0, scale: 1, ease: Power1.easeIn }, 0.2, '-=2.1');
  var tl = new TimelineMax();
  tl
    .staggerTo(".lePopOutRight span", 0.5, { x: 50, scale: 0.5, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".lePopOutRight span", 0.5, { x: 0, scale: 1, ease: Power1.easeIn }, 0.2, '-=2.1');

  // Letter Bouncing
  var tl = new TimelineMax();
  tl
    .staggerTo(".leBounceFromTop span", 0.2, { y: -80, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".leBounceFromTop span", 0.5, { y: 0, ease: Bounce.easeOut }, 0.2, '-=2.25');
  var tl = new TimelineMax()
  tl
    .staggerTo(".leBounceFromDown span", 0.2, { y: 80, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".leBounceFromDown span", 0.5, { y: 0, ease: Bounce.easeOut }, 0.2, '-=2.25');
  var tl = new TimelineMax()
  tl
    .staggerTo(".leBounceY span", 0.2, { scaleY: 2, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".leBounceY span", 0.5, { scaleY: 1, ease: Bounce.easeOut }, 0.2, '-=2.2');
  var tl = new TimelineMax()
  tl
    .staggerTo(".leBounceZoomIn span", 0.2, { scale: 1.9, delay: 0.5, ease: Power1.easeOut }, 0.2)
    .staggerTo(".leBounceZoomIn span", 0.5, { scale: 1, ease: Bounce.easeOut }, 0.2, '-=2.25');
  var tl = new TimelineMax()
  tl
    .staggerTo(".leBounceZoomOut span", 0.2, { scale: 0.5, delay: 0.5, ease: Power0.easeNone }, 0.2)
    .staggerTo(".leBounceZoomOut span", 0.5, { scale: 1, ease: Bounce.easeOut }, 0.2, '-=2.25');

  // Letter Perspective

  var tl = new TimelineMax({ perspective: 500 });
  tl
    .staggerTo(".lePerspectiveOutTop span", 0.5, { autoAlpha: 1, rotationX: 0, y: 0, z: 0, delay: 0.5, ease: Power0.easeNone }, 0.2)
    .staggerTo(".lePerspectiveOutTop span", 0.5, { autoAlpha: 0, rotationX: 90, y: -50, z: 50, ease: Power0.easeNone }, 0.2, '-=2.25');
  var tl = new TimelineMax({ perspective: 500 });
  tl
    .staggerTo(".lePerspectiveOutBottom span", 0.5, { autoAlpha: 1, rotationX: 0, y: 0, z: 0, delay: 0.5, ease: Power0.easeNone }, 0.2)
    .staggerTo(".lePerspectiveOutBottom span", 0.5, { autoAlpha: 0, rotationX: 90, y: 50, z: -50, ease: Power0.easeNone }, 0.2, '-=2.25');

  // Letter Zoom In
  TweenMax.staggerFrom(".leZoomIn span", 1, { scale: 10, autoAlpha: 0, perspective: 600, ease: Power1.easeOut }, 0.2);
  TweenMax.staggerFrom(".leZoomInLeft span", 1, { scale: 10, x: -800, autoAlpha: 0, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerFrom(".leZoomInRight span", 1, { scale: 10, x: 800, autoAlpha: 0, perspective: 600, ease: Power0.easeNone }, 0.2);
  TweenMax.staggerFrom(".leZoomInTop span", 1, { scale: 10, y: -700, autoAlpha: 0, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerFrom(".leZoomInBottom span", 1, { scale: 10, y: 700, autoAlpha: 0, perspective: 600, ease: Power2.easeOut }, 0.2);

  // Letter Zoom Out
  TweenMax.staggerTo(".leZoomOut span", 1, { scale: 10, autoAlpha: 0, perspective: 600, ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(".leZoomOutLeft span", 1, { scale: 10, x: '-1500%', autoAlpha: 0, ease: Sine.easeOut }, 0.2);
  TweenMax.staggerTo(".leZoomOutRight span", 1, { scale: 10, x: '1500%', autoAlpha: 0, ease: Sine.easeOut }, 0.2);
  TweenMax.staggerTo(".leZoomOutTop span", 1, { scale: 10, y: '-500%', autoAlpha: 0, ease: Sine.easeOut }, 0.2);
  TweenMax.staggerTo(".leZoomOutBottom span", 1, { scale: 10, y: '500%', autoAlpha: 0, ease: Sine.easeOut }, 0.2);

  // Letter Dance In
  // .leDanceInTop (Under Construction)
  TweenMax.staggerFrom(".leDanceInTop span", 2.5, { skewX: -15, autoAlpha: 0, transformOrigin: 'center top', delay: 0.2, ease: Elastic.easeOut.config(1, 0.1) }, 0.15);
  // .leDanceInMiddle (Under Construction)
  TweenMax.staggerFrom(".leDanceInMiddle span", 3, { skewX: -15, autoAlpha: 0, transformOrigin: 'center center', delay: 0.2, ease: Elastic.easeOut.config(1, 0.1) }, 0.15);
  // .leDanceInBottom (Under Construction)

  // Letter Dance Out
  // .leDanceOutTop (Under Construction)
  // .leDanceOutMiddle (Under Construction)
  // .leDanceOutBottom (Under Construction)

  // One After One Fade in
  // .leoaoFadeInTop (Under Construction)
  // .leoaoFadeInBottom (Under Construction)
  // .leoaoFadeOutop (Under Construction)
  // .leoaoFadeOutBottom (Under Construction)
  // .leoaoFlyInTop (Under Construction)
  // .leoaoFlyInBottom (Under Construction)
  // .leoaoFlyOutTop (Under Construction)
  // .leoaoFlyOutBottom (Under Construction)
  // .oaoRotateInTop (Under Construction)
  // .oaoRotateInBottom (Under Construction)
  // .oaoRotateOutTop (Under Construction)
  // .oaoRotateOutBottom (Under Construction)
  // .oaoRotateXInTop (Under Construction)
  // .oaoRotateXInBottom (Under Construction)
  // .oaoRotateXOutTop (Under Construction)
  // .oaoRotateXOutBottom (Under Construction)
  // .oaoRotateYInTop (Under Construction)
  // .oaoRotateYInBottom (Under Construction)
  // .oaoRotateYOutTop (Under Construction)
  // .oaoRotateYOutBottom (Under Construction)
}

// Fade In Animation
TweenMax.from(".fadeIn", 1, { alpha: 0 });
TweenMax.from(".fadeInLeft", 1, { alpha: 0, x: "-100%" });
TweenMax.from(".fadeInRight", 1, { alpha: 0, x: "100%" });
TweenMax.from(".fadeInTop", 1, { alpha: 0, y: "-100%" });
TweenMax.from(".fadeInBottom", 1, { alpha: 0, y: "100%" });

// Fade Out Animation
TweenMax.to(".fadeOut", 1, { alpha: 0 });
TweenMax.to(".fadeOutLeft", 1, { alpha: 0, x: "-100%" });
TweenMax.to(".fadeOutRight", 1, { alpha: 0, x: "100%" });
TweenMax.to(".fadeOutTop", 1, { alpha: 0, y: "-100%" });
TweenMax.to(".fadeOutBottom", 1, { alpha: 0, y: "100%" });

// Move From Animation
TweenMax.from(".moveFromLeft", 1, { x: "-100%" });
TweenMax.from(".moveFromRight", 1, { x: "100%" });
TweenMax.from(".moveFromTop", 1, { y: "-100%" });
TweenMax.from(".moveFromBottom", 1, { y: "100%" });

// Move To Animation
TweenMax.to(".moveToLeft", 1, { x: "-100%" });
TweenMax.to(".moveToRight", 1, { x: "100%" });
TweenMax.to(".moveToTop", 1, { y: "-100%" });
TweenMax.to(".moveToBottom", 1, { y: "100%" });

// Door Animation
TweenMax.fromTo(".doorCloseFromLeft", 1, { css: { perspective: 400, transformOrigin: "left", rotationY: 90 } }, { css: { perspective: 400, transformOrigin: "left", rotationY: 0 } });
TweenMax.fromTo(".doorOpenFromRight", 1, { css: { perspective: 400, transformOrigin: "left", rotationY: 0 } }, { css: { perspective: 400, transformOrigin: "left", rotationY: 90 } });
// .doorCloseFromRight (Under Construction)
// .doorOpenFromLeft (Under Construction)

// Heartbeat
heartbeatSlow = new TimelineMax({ repeat: -1 });
heartbeatSlow
  .to(".heartbeatSlow", 0.2, { css: { scale: 1.3 } })
  .to(".heartbeatSlow", 0.16, { css: { scale: 1.3 } })
  .to(".heartbeatSlow", 0.2, { css: { scale: 1 } })
heartbeatFast = new TimelineMax({ repeat: -1 });
heartbeatFast
  .to(".heartbeatFast", 0.2, { css: { scale: 1.5 } })
  .to(".heartbeatFast", 0.1, { css: { scale: 1 } })
  .to(".heartbeatFast", 0.2, { css: { scale: 1.5 } })
  .to(".heartbeatFast", 0.2, { css: { scale: 1 } })
  .to(".heartbeatFast", 0.2, { css: { scale: 1 } });

// Hang On
hangOnLeft = new TimelineMax();
hangOnLeft
  .to(".hangOnLeft", 0.4, { css: { transformOrigin: "left", rotation: 100 } })
  .to(".hangOnLeft", 0.2, { css: { transformOrigin: "left", rotation: 80 } })
  .to(".hangOnLeft", 0.2, { css: { transformOrigin: "left", rotation: 95 } })
  .to(".hangOnLeft", 0.2, { css: { transformOrigin: "left", rotation: 85 } })
  .to(".hangOnLeft", 0.1, { css: { transformOrigin: "left", rotation: 90 } });
hangOnRight = new TimelineMax();
hangOnRight
  .to(".hangOnRight", 0.4, { css: { transformOrigin: "right", rotation: -100 } })
  .to(".hangOnRight", 0.2, { css: { transformOrigin: "right", rotation: -80 } })
  .to(".hangOnRight", 0.2, { css: { transformOrigin: "right", rotation: -95 } })
  .to(".hangOnRight", 0.2, { css: { transformOrigin: "right", rotation: -85 } })
  .to(".hangOnRight", 0.1, { css: { transformOrigin: "right", rotation: -90 } });

// Hang And Drop
// .hangAndDropLeft (Under Construction)
// .hangAndDropRight (Under Construction)

// Shake
pulseShake = new TimelineMax({ delay: 1, repeat: -1, repeatDelay: 1 });
pulseShake
  .to(".pulseShake", 0.2, { css: { scale: 1 } })
  .to(".pulseShake", 0.02, { css: { scale: 1.4 } })
  .to(".pulseShake", 0.02, { css: { scale: 1 } })
  .to(".pulseShake", 0.02, { css: { scale: 1.3 } })
  .to(".pulseShake", 0.02, { css: { scale: 1 } });

// Horizontal Shake
TweenMax.to(".horizontalShake", 0.01, { x: "+=20", yoyo: true, repeat: -1 })
TweenMax.to(".horizontalShake", 0.01, { x: "-=20", yoyo: true, repeat: -1 });

// Vertical Shake
TweenMax.to(".verticalShake", 0.01, { y: "+=20", yoyo: true, repeat: -1 })
TweenMax.to(".verticalShake", 0.01, { y: "-=20", yoyo: true, repeat: -1 });

// Mad Max
TweenMax.to(".madMax", 0.01, { y: "+=10", css: { scale: 1.3 }, yoyo: true, repeat: -1 })
TweenMax.to(".madMax", 0.01, { y: "+=5", css: { scale: .5 }, yoyo: true, repeat: -1 })
TweenMax.to(".madMax", 0.01, { y: "-=15", css: { scale: 1.3 }, yoyo: true, repeat: -1 });

// Cool Horizontal Shake
TweenMax.to(".coolHorizontalShake", .1, { x: "+=20", yoyo: true, repeat: -1 });
TweenMax.to(".coolHorizontalShake", .1, { x: "-=20", yoyo: true, repeat: -1 });

// Cool Vertical Shake
TweenMax.to(".coolVerticalShake", 0.1, { y: "+=20", yoyo: true, repeat: -1 });
TweenMax.to(".coolVerticalShake", 0.1, { y: "-=20", yoyo: true, repeat: -1 });

// Quiet Mad
TweenMax.to(".quietMad", 0.1, { y: "+=5", yoyo: true, css: { scale: 1.2 }, repeat: -1 });
TweenMax.to(".quietMad", 0.1, { y: "-=3", css: { scale: .8 }, yoyo: true, repeat: -1 });
TweenMax.to(".quietMad", 0.1, { y: "-=5", yoyo: true, repeat: -1 });

// Vibration
TweenMax.to(".vibration", 0.15, { css: { scale: 1.2, skewY: "1deg", skewX: "-1deg" }, ease: Power0.easeNone, repeat: -1 });

// Push Release From
pushReleaseFrom = new TimelineMax();
pushReleaseFrom
  .fromTo(".pushReleaseFrom", 0.2, { autoAlpha: 0, scale: 3 }, { autoAlpha: 1, scale: 0.5 })
  .to(".pushReleaseFrom", 0.5, { autoAlpha: 1, scale: 1, ease: Power1.easeOut });
TweenMax.from(".pushReleaseFromLeft", 0.8, { autoAlpha: 0, x: "-100%", ease: Back.easeOut.config(3) });
TweenMax.from(".pushReleaseFromRight", 0.8, { autoAlpha: 0, x: "100%", ease: Back.easeOut.config(3) });
TweenMax.from(".pushReleaseFromTop", 0.8, { autoAlpha: 0, y: -200, ease: Back.easeOut.config(4) });
TweenMax.from(".pushReleaseFromBottom", 0.8, { autoAlpha: 0, y: 200, ease: Back.easeOut.config(4) });

// Push Release To
pushReleaseTo = new TimelineMax();
pushReleaseTo
  .to(".pushReleaseTo", 0.3, { autoAlpha: 1, scale: 0.5 })
  .to(".pushReleaseTo", 0.5, { autoAlpha: 0, scale: 5, ease: Power1.easeOut });
TweenMax.to(".pushReleaseToLeft", 0.85, { x: "-100%", ease: Back.easeIn.config(3) });
TweenMax.to(".pushReleaseToRight", 0.85, { x: "100%", ease: Back.easeIn.config(3) });
TweenMax.to(".pushReleaseToTop", 0.85, { y: -200, ease: Back.easeIn.config(4) });
TweenMax.to(".pushReleaseToBottom", 0.85, { y: 200, ease: Back.easeIn.config(4) });

// Flip X
flipX = new TimelineMax();
flipX.set(".flipX", { transformPerspective: 600, rotationX: 0 });
flipX
  .to(".flipX", 0.4, { rotationX: 180, ease: Power3.easeOut })
  .to(".flipX", 0.8, { rotationX: 0, ease: Power3.easeOut });
flipXzoomIn = new TimelineMax();
flipXzoomIn.set(".flipXzoomIn", { transformPerspective: 600, rotationX: 0, scale: 1 });
flipXzoomIn
  .to(".flipXzoomIn", 0.8, { rotationX: -180, scale: 1.8, ease: Power3.easeOut })
  .to(".flipXzoomIn", 0.8, { delay: 0.01, rotationX: 0, scale: 0.8, ease: Power3.easeOut })
  .to(".flipXzoomIn", 0.2, { rotationX: 0, scale: 1, ease: Power3.easeOut });
flipXzoomOut = new TimelineMax();
flipXzoomOut.set(".flipXzoomOut", { transformPerspective: 600, rotationX: 0, scale: 1 })
flipXzoomOut
  .to(".flipXzoomOut", 0.8, { rotationX: -180, scale: 0.8, ease: Power3.easeOut })
  .to(".flipXzoomOut", 0.8, { delay: 0.01, rotationX: 0, scale: 1.8, ease: Power3.easeOut })
  .to(".flipXzoomOut", 0.2, { rotationX: 0, scale: 1, ease: Power3.easeOut });

// Flip Y
flipY = new TimelineMax();
flipY.set(".flipY", { transformPerspective: 600 });
flipX
  .to(".flipY", 0.3, { rotationY: -180, ease: Power1.easeOut })
  .to(".flipY", 0.8, { rotationY: -360, ease: Power2.easeOut });
flipYzoomIn = new TimelineMax();
flipYzoomIn.set(".flipYzoomIn", { transformPerspective: 600, rotationY: 0, scale: 1 });
flipYzoomIn
  .to(".flipYzoomIn", 0.4, { rotationY: -180, scale: 1.8, ease: Power3.easeOut })
  .to(".flipYzoomIn", 0.8, { rotationY: 0, scale: 0.8, ease: Power3.easeOut })
  .to(".flipYzoomIn", 0.1, { rotationY: 0, scale: 1, ease: Power3.easeIn });
flipYzoomOut = new TimelineMax();
flipYzoomOut.set(".flipYzoomOut", { transformPerspective: 600, rotationY: 0, scale: 1 });
flipYzoomOut
  .to(".flipYzoomOut", 0.4, { rotationY: -180, scale: 0.8, ease: Back.easeOut })
  .to(".flipYzoomOut", 0.8, { rotationY: 0, scale: 1.8, ease: Back.easeOut })
  .to(".flipYzoomOut", 0.1, { scale: 1, ease: Back.easeIn });

// Skew
skewLeft = new TimelineMax();
skewLeft
  .to(".skewLeft", 0.7, { skewX: 30, ease: Power1.easeOut })
  .to(".skewLeft", 0.3, { skewX: 0, ease: Power2.easeOut });
skewRight = new TimelineMax();
skewRight
  .to(".skewRight", 0.7, { skewX: -30, ease: Power1.easeOut })
  .to(".skewRight", 0.3, { skewX: 0, ease: Power2.easeOut });
skewInLeft = new TimelineMax();
skewInLeft
  .fromTo(".skewInLeft", 0.7, { x: "-100%", skewX: -40, ease: Power0.easeOut }, { x: "0%", skewX: -30, ease: Power4.easeOut })
  .to(".skewInLeft", 0.3, { skewX: 0, ease: Power2.easeOut });
skewInRight = new TimelineMax();
skewInRight
  .fromTo(".skewInRight", 0.7, { x: "100%", skewX: 40, ease: Power0.easeOut }, { x: "0%", skewX: 30, ease: Power4.easeOut })
  .to(".skewInRight", 0.3, { skewX: 0, ease: Power0.easeOut });
skewOutLeft = new TimelineMax();
skewOutLeft
  .to(".skewOutLeft", 0.7, { x: 0, skewX: 40, ease: Power3.easeOut })
  .to(".skewOutLeft", 0.3, { x: "-100%", skewX: 30, ease: Power0.easeOut });
// .skewOutRight (Under Construction)
skewOutRight = new TimelineMax();
skewOutRight
  .to(".skewOutRight", 0.7, { x: 0, skewX: -40, ease: Power3.easeOut })
  .to(".skewOutRight", 0.3, { x: "100%", skewX: -30, ease: Power0.easeOut });

// Shock In
// .shockZoom (Under Construction)
// .shockInLeft (Under Construction)
// .shockInRight (Under Construction)
// .shockInTop (Under Construction)
// .shockInBottom (Under Construction)

// Pull Release
pullRelease = new TimelineMax();
pullRelease
  .to(".pullRelease", 0.18, { scale: 1.5, ease: Sine.easeOut })
  .to(".pullRelease", 0.7, { scale: 1, ease: Power1.easeOut });
pushRelease = new TimelineMax();
pushRelease
  .to(".pushRelease", 0.18, { scale: .5, ease: Power1.easeOut })
  .to(".pushRelease", 0.7, { scale: 1, ease: Sine.easeOut });

// Swing In
// .swingInLeft (Under Construction)
// .swingInRight (Under Construction)
// .swingInTop (Under Construction)
// .swingInBottom (Under Construction)

// Elevate
elevateLeft = new TimelineMax();
elevateLeft.set(".elevateLeft", { transformOrigin: "right" })
elevateLeft
  .from(".elevateLeft", 0.18, { y: "100%", rotation: "-20" })
  .to(".elevateLeft", 0.4, { y: 0, rotation: 20 })
  .to(".elevateLeft", 0.25, { rotation: 0 });
elevateRight = new TimelineMax();
elevateRight.set(".elevateRight", { transformOrigin: "left" })
elevateRight
  .from(".elevateRight", 0.18, { y: "100%", rotation: 20 })
  .to(".elevateRight", 0.4, { y: 0, rotation: "-20" })
  .to(".elevateRight", 0.25, { rotation: 0 });

//Roll From
TweenMax.from(".rollFromLeft", 1, { x: "-100%", autoAlpha: 0, rotationY: "180", perspective: 600, ease: Power2.easeOut });
TweenMax.from(".rollFromRight", 1, { x: "100%", autoAlpha: 0, rotationY: "-180", perspective: 600, ease: Power2.easeOut });
TweenMax.from(".rollFromTop", 1, { y: "-100%", autoAlpha: 0, rotationX: "180", perspective: 600, ease: Power2.easeOut });
TweenMax.from(".rollFromBottom", 1, { y: "100%", autoAlpha: 0, rotationX: "-180", perspective: 600, ease: Power2.easeOut });

//Roll To
TweenMax.to(".rollToLeft", 1, { x: "-100%", autoAlpha: 0, rotationY: "180", perspective: 600, ease: Power2.easeOut });
TweenMax.to(".rollToRight", 1, { x: "100%", autoAlpha: 0, rotationY: "-180", perspective: 600, ease: Power2.easeOut });
TweenMax.to(".rollToTop", 1, { y: "-100%", autoAlpha: 0, rotationX: "180", perspective: 600, ease: Power2.easeOut });
TweenMax.to(".rollToBottom", 1, { y: "100%", autoAlpha: 0, rotationX: "-180", perspective: 600, ease: Power2.easeOut });

//Rotation
TweenMax.fromTo(".rotate", 1, { rotation: "-360", ease: Power0.easeNone }, { rotation: "0", ease: Power0.easeNone });
// .rotateX (Under Construction)
TweenMax.to(".rotateX", 1, { rotationX: 90, perspective: 600, ease: Power1.easeOut });
// .rotateXIn (Under Construction)
TweenMax.fromTo(".rotateXIn", 1, { y: -100, z: -5000, scale: 0.4, autoAlpha: 0, rotationX: -75, perspective: 600 }, { y: 0, z: 0, scale: 1, autoAlpha: 1, rotationX: 0, perspective: 600, ease: Power2.easeOut });
// .rotateXOut (Under Construction)
TweenMax.to(".rotateXOut", 1, { y: -100, z: -5000, scale: 0.4, autoAlpha: 0, rotationX: -75, perspective: 600, ease: Power2.easeOut });
// .rotateY (Under Construction)
TweenMax.to(".rotateY", 1, { rotationY: 90, perspective: 600, ease: Sine.easeOut });
// .rotateYIn (Under Construction)
TweenMax.from(".rotateYIn", 1, { x: 100, z: -5000, scale: 0.8, autoAlpha: 0, rotationY: -90, perspective: 600, ease: Power2.easeOut });
// .rotateYOut (Under Construction)
TweenMax.to(".rotateYOut", 1, { y: -100, z: -5000, scale: 0.4, autoAlpha: 0, rotationY: -75, perspective: 600, ease: Power2.easeOut });

//Rotate In
TweenMax.fromTo(".rotateInLeft", 1, { x: "-100%", rotation: "0", ease: Power0.easeNone }, { x: "0%", rotation: "360", ease: Power1.easeOut });
TweenMax.fromTo(".rotateInRight", 1, { x: "100%", rotation: "0", ease: Power0.easeNone }, { x: "0%", rotation: "-360", ease: Power1.easeOut });
TweenMax.fromTo(".rotateInTop", 1, { y: "-500%", rotation: "0", ease: Power0.easeNone }, { y: "0%", rotation: "360", ease: Power1.easeOut });
TweenMax.fromTo(".rotateInBottom", 1, { y: "500%", rotation: "0", ease: Power0.easeNone }, { y: "0%", rotation: "-360", ease: Power1.easeOut });

//Rotate Out
TweenMax.fromTo(".rotateOutLeft", 1, { x: "0%", rotation: "360", ease: Power0.easeNone }, { x: "-100%", rotation: "0", ease: Power1.easeOut });
TweenMax.fromTo(".rotateOutRight", 1, { x: "0%", rotation: "-360", ease: Power0.easeNone }, { x: "100%", rotation: "0", ease: Power1.easeOut });
TweenMax.fromTo(".rotateOutTop", 1, { y: "0%", rotation: "360", ease: Power0.easeNone }, { y: "-500%", rotation: "0", ease: Power1.easeOut });
TweenMax.fromTo(".rotateOutBottom", 1, { y: "0%", rotation: "-360", ease: Power0.easeNone }, { y: "500%", rotation: "0", ease: Power1.easeOut });

//Spin To
TweenMax.fromTo(".spinToLeft", 1, { transformOrigin: "left bottom", rotation: 90, autoAlpha: 0 }, { transformOrigin: "left bottom", rotation: 0, autoAlpha: 1, ease: Power1.easeOut });
TweenMax.fromTo(".spinToRight", 1, { transformOrigin: "right bottom", rotation: -90, autoAlpha: 0 }, { transformOrigin: "right bottom", rotation: 0, autoAlpha: 1, ease: Power1.easeOut });
TweenMax.fromTo(".spinToTop", 1, { transformOrigin: "left bottom", rotation: -90, autoAlpha: 0 }, { transformOrigin: "left bottom", rotation: 0, autoAlpha: 1, ease: Power1.easeOut });
TweenMax.fromTo(".spinToBottom", 1, { transformOrigin: "right bottom", rotation: 90, autoAlpha: 0 }, { transformOrigin: "right bottom", rotation: 0, autoAlpha: 1, ease: Power1.easeOut });

//Spin From
TweenMax.to(".spinFromLeft", 1, { transformOrigin: "left bottom", rotation: 90, autoAlpha: 0, ease: Power1.easeOut });
TweenMax.to(".spinFromRight", 1, { transformOrigin: "right bottom", rotation: -90, autoAlpha: 0, ease: Power1.easeOut });
TweenMax.to(".spinFromTop", 1, { transformOrigin: "left bottom", rotation: -90, autoAlpha: 0, ease: Power1.easeOut });
TweenMax.to(".spinFromBottom", 1, { transformOrigin: "right bottom", rotation: 90, autoAlpha: 0, ease: Power1.easeOut });

//Blur In
TweenMax.to(".blurIn", 1, { textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none" });
TweenMax.fromTo(".blurInLeft", 1, { x: "100%", textShadow: "none", ease: Power0.easeNone }, { x: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurInRight", 1, { x: "-100%", textShadow: "none", ease: Power0.easeNone }, { x: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurInTop", 1, { y: "100%", textShadow: "none", ease: Power0.easeNone }, { y: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurInBottom", 1, { y: "-100%", textShadow: "none", ease: Power0.easeNone }, { y: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none", ease: Power2.easeOut });

//Blur Out
TweenMax.from(".blurOut", 1, { textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", color: "none" });
TweenMax.fromTo(".blurOutLeft", 1, { x: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", ease: Power0.easeNone }, { x: "100%", textShadow: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurOutRight", 1, { x: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", ease: Power0.easeNone }, { x: "-100%", textShadow: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurOutTop", 1, { y: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", ease: Power0.easeNone }, { y: "100%", textShadow: "none", ease: Power2.easeOut });
TweenMax.fromTo(".blurOutBottom", 1, { y: "0%", textShadow: "0 0 10px rgba(167, 81, 203, 0.6), 0 0 30px rgba(167, 81, 203, 0.4), 0 0 50px rgba(167, 81, 203, 0.3), 0 0 180px rgba(167, 81, 203, 0.3)", ease: Power0.easeNone }, { y: "-100%", textShadow: "none", ease: Power2.easeOut });

//Bounce
TweenMax.from(".bounceFromTop", 1.2, { y: "-100%", ease: Bounce.easeOut });
TweenMax.from(".bounceFromDown", 1.2, { y: "100%", ease: Bounce.easeOut });
TweenMax.from(".bounceX", 0.8, { scaleX: 2, ease: Bounce.easeOut });
TweenMax.from(".bounceY", 0.8, { scaleY: 2, ease: Bounce.easeOut });
TweenMax.from(".bounceZoomIn", 1, { scale: 1.6, ease: Bounce.easeOut });
TweenMax.from(".bounceZoomOut", 1, { scale: 0.3, ease: Bounce.easeOut });

//Bounce In
TweenMax.fromTo(".bounceInTop", 2, { y: -500, bezier: [{ x: 0, y: 0.9 }, { x: 0, y: 0.03 }, { x: 0, y: 0.69 }, { x: 0, y: 0.22 }], ease: Sine.easeIn }, { y: 0, ease: Bounce.easeOut });
TweenMax.fromTo(".bounceInBottom", 2, { y: 500, bezier: [{ x: 0, y: 0.9 }, { x: 0, y: 0.03 }, { x: 0, y: 0.69 }, { x: 0, y: 0.22 }], ease: Sine.easeIn }, { y: 0, ease: Bounce.easeOut });
TweenMax.fromTo(".bounceInLeft", 2, { x: "-100%", bezier: [{ x: 0.9, y: 0 }, { x: 0.03, y: 0 }, { x: 0.69, y: 0 }, { x: 0.22, y: 0 }], ease: Sine.easeIn }, { x: "0%", ease: Bounce.easeOut });
TweenMax.fromTo(".bounceInRight", 2, { x: "100%", bezier: [{ x: 0.9, y: 0 }, { x: 0.03, y: 0 }, { x: 0.69, y: 0 }, { x: 0.22, y: 0 }], ease: Sine.easeIn }, { x: "0%", ease: Bounce.easeOut });

//Bounce Out 
TweenMax.to(".bounceOutTop", 2, { y: -500, bezier: [{ x: 0, y: 0.9 }, { x: 0, y: 0.03 }, { x: 0, y: 0.69 }, { x: 0, y: 0.22 }], ease: Bounce.easeIn });
TweenMax.to(".bounceOutBottom", 2, { y: 500, bezier: [{ x: 0, y: 0.9 }, { x: 0, y: 0.03 }, { x: 0, y: 0.69 }, { x: 0, y: 0.22 }], ease: Bounce.easeIn });
TweenMax.to(".bounceOutLeft", 2, { x: "-100%", bezier: [{ x: 0.9, y: 0 }, { x: 0.03, y: 0 }, { x: 0.69, y: 0 }, { x: 0.22, y: 0 }], ease: Bounce.easeIn });
TweenMax.to(".bounceOutRight", 2, { x: "100%", bezier: [{ x: 0.9, y: 0 }, { x: 0.03, y: 0 }, { x: 0.69, y: 0 }, { x: 0.22, y: 0 }], ease: Bounce.easeIn });

// Perspective
TweenMax.set(".perspectiveToTop", { transformPerspective: 500, transformStyle: "preserve-3d" })
TweenMax.to(".perspectiveToTop", 1.8, { autoAlpha: 0, y: -80, z: -50, rotationX: 90, ease: Sine.easeIn });
TweenMax.set(".perspectiveToBottom", { transformPerspective: 500, transformStyle: "preserve-3d" })
TweenMax.to(".perspectiveToBottom", 1.8, { autoAlpha: 0, y: 80, z: 50, rotationX: 90, ease: Sine.easeIn });

// Zoom In
TweenMax.from(".zoomIn", 1, { autoAlpha: 0, scale: 10, ease: Power2.easeOut });
TweenMax.from(".zoomInLeft", 1.5, { autoAlpha: 0, scale: 8, x: "-500%", ease: Power2.easeOut });
TweenMax.from(".zoomInRight", 1.5, { autoAlpha: 0, scale: 10, x: "500%", ease: Power2.easeOut });
TweenMax.from(".zoomInTop", 1.5, { autoAlpha: 0, scale: 10, y: "-500%", ease: Power2.easeOut });
TweenMax.from(".zoomInBottom", 1.5, { autoAlpha: 0, scale: 10, y: "500%", ease: Power2.easeOut });

// Zoom Out
TweenMax.to(".zoomOut", 1.5, { autoAlpha: 0, scale: 10, ease: Power2.easeOut });
TweenMax.to(".zoomOutLeft", 1.5, { autoAlpha: 0, scale: 8, x: "-400%", ease: Power2.easeOut });
TweenMax.to(".zoomOutRight", 1.5, { autoAlpha: 0, scale: 8, x: "400%", ease: Power2.easeOut });
TweenMax.to(".zoomOutTop", 1.5, { autoAlpha: 0, scale: 10, y: "-500%", ease: Power2.easeOut });
TweenMax.to(".zoomOutBottom", 1.5, { autoAlpha: 0, scale: 10, y: "500%", ease: Power2.easeOut });

// Dance Top
// .danceTop (Under Construction)
//TweenMax.from(".danceTop", 1, {css: {perspective: 400, transformOrigin: "top", skewX:90}, ease: Elastic.easeOut.config(1, 0.2)});
// .danceMiddle (Under Construction)
TweenMax.from(".danceMiddle", 2, { skewX: 30, ease: Elastic.easeOut.config(1, 0.2) });
// .danceBottom (Under Construction)