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



TweenMax.from(".moveFromLeft", 1, {x:"-100%"});

function initTweenMax() {
    // Letter Fade In
    TweenMax.staggerFrom(".leFadeIn span", 1, { autoAlpha: 0, ease: Power4.easeIn }, 0.2);

    TweenMax.staggerFrom(".leFadeInLeft span", 1, { x: "-80", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerFrom(".leFadeInRight span", 1, { x: "80", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerFrom(".leFadeInTop span", 1, { y: "-100%", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerFrom(".leFadeInBottom span", 1, { y: "100%", autoAlpha: 0, delay: 0.3, ease: Power4.easeOut }, 0.2);

    // Letter Fade Out
    TweenMax.staggerTo(".leFadeOut span", 1, { autoAlpha: 0, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerTo(".leFadeOutLeft span", 1, { x: "-60", autoAlpha: 0, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerTo(".leFadeOutRight span", 1, { x: 60, autoAlpha: 0, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerTo(".leFadeOutTop span", 1, { y: "-100%", autoAlpha: 0, ease: Power4.easeOut }, 0.2);

    TweenMax.staggerTo(".leFadeOutBottom span", 1, { y: "100%", autoAlpha: 0, ease: Power4.easeOut }, 0.2);

    // ----------------------------------------------------- //
    // Letter Skate
    // ----------------------------------------------------- //
    TweenMax.staggerTo(".skateX span", 0.5, { scaleX: 0.4, ease: Sine.easeInOut, yoyo: true, repeat: -1 }, 0.2);

    TweenMax.staggerTo(".skateY span", 0.5, { scaleY: 0.4, ease: Sine.easeInOut, yoyo: true, repeat: -1 }, 0.2);

    // tl = new TimelineMax();
    // tl
    // .staggerTo(".skateXY span", 0.5, {scaleX:1, scaleY:0.4, repeat:-1, repeatDelay:0, ease: Power0.easeNone}, 0.2)
    // .staggerTo(".skateXY span", 0.5, {scaleX:0.4, scaleY:0.4, scaleZ:1, repeat:-1, repeatDelay:0, ease: Power0.easeNone}, 0.2)
    // .staggerTo(".skateXY span", 0.5, {scaleX:0.4, scaleY:1, scaleZ:1, repeat:-1, repeatDelay:0, ease: Power0.easeNone}, 0.2);

    // ----------------------------------------------------- //
    // Letter Scale
    // ----------------------------------------------------- //
    TweenMax.staggerFromTo(
        ".scaleXIn span",
        1, {
            autoAlpha: 0,
            rotationX: 90,
            perspective: 400,
            ease: Power3.easeInOut
        }, {
            autoAlpha: 1,
            rotationX: 0,
            ease: Power3.easeInOut
        },
        0.2
    );

    TweenMax.staggerFromTo(
        ".scaleXOut span",
        1, {
            autoAlpha: 1,
            rotationX: 0,
            perspective: 400,
            ease: Power2.easeOut
        }, {
            autoAlpha: 0,
            rotationX: 90,
            ease: Power2.easeOut
        },
        0.25
    );

    TweenMax.staggerFromTo(
        ".scaleYIn span",
        1, {
            autoAlpha: 0,
            rotationY: 90,
            perspective: 400,
            ease: Power3.easeInOut
        }, {
            autoAlpha: 1,
            rotationY: 0,
            ease: Power3.easeInOut
        },
        0.2
    );

    TweenMax.staggerFromTo(
        ".scaleYOut span",
        1, {
            autoAlpha: 1,
            rotationY: 0,
            perspective: 400,
            ease: Power2.easeOut
        }, {
            autoAlpha: 0,
            rotationY: 90,
            ease: Power2.easeOut
        },
        0.25
    );

    //--------------------------------------------------------------//
    // Letter Jump
    //--------------------------------------------------------------//
    TweenMax.staggerTo(".leJump span", 1, { y: "-20", ease: Power4.easeInOut, repeat: -1, repeatDelay: 0.2 }, 0.2);

    //--------------------------------------------------------------//
    // Letter Fly
    //--------------------------------------------------------------//
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

    //--------------------------------------------------------------//
    // Letter Fly In
    //--------------------------------------------------------------//
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

    //--------------------------------------------------------------//
    // Letter Fly Out
    //--------------------------------------------------------------//
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

    //--------------------------------------------------------------//
    // Letter Door Open & Close
    //--------------------------------------------------------------//
    var tl = new TimelineMax();
    tl.staggerFromTo(
        ".leDoorCloseLeft span",
        0.5, {
            autoAlpha: 0,
            rotationY: 90,
            perspective: 400,
            transformOrigin: "left",
            ease: Power0.easeNone
        }, {
            autoAlpha: 1,
            rotationY: 0,
            perspective: 400,
            transformOrigin: "left",
            ease: Power0.easeNone
        },
        0.2
    );

    var tl = new TimelineMax();
    tl.staggerFromTo(
        ".leDoorCloseRight span",
        0.5, {
            autoAlpha: 0,
            rotationY: -90,
            perspective: 400,
            transformOrigin: "right",
            ease: Power0.easeNone
        }, {
            autoAlpha: 1,
            rotationY: 0,
            perspective: 400,
            transformOrigin: "right",
            ease: Power0.easeNone
        },
        0.2
    );

    var tl = new TimelineMax();
    tl.staggerTo(
        ".leDoorOpenLeft span",
        0.5, {
            autoAlpha: 0,
            rotationY: -90,
            perspective: 400,
            transformOrigin: "right",
            ease: Power0.easeNone
        },
        0.2
    );

    var tl = new TimelineMax();
    tl.staggerTo(
        ".leDoorOpenRight span",
        0.5, {
            autoAlpha: 0,
            rotationY: 90,
            perspective: 400,
            transformOrigin: "left",
            ease: Power0.easeNone
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Shake
    //--------------------------------------------------------------//
    var tl = new TimelineMax({ delay: 1 });
    tl
    // .staggerTo(".lePulseShake span", 0.2, {css:{scale:1.2}, repeat:-1, ease: Power0.easeNone}, 0.2)
    // .staggerTo(".lePulseShake span", 0.2, {css:{scale:1}, repeat:-1, ease: Power0.easeNone}, 0.2, '-=3')
    // .staggerTo(".lePulseShake span", 0.2, {css:{scale:1.1}, repeat:-1, ease: Power0.easeNone}, 0.2, '-=3')
    // .staggerTo(".lePulseShake span", 0.2, {css:{scale:1}, repeat:-1, ease: Power0.easeNone}, 0.2, '-=3')

    //--------------------------------------------------------------//
    // Letter Push Release
    //--------------------------------------------------------------//
    var tl = new TimelineMax();
    tl
        .staggerFromTo(
            ".lePushReleaseFrom span",
            0.5, {
                autoAlpha: 0,
                scaleY: 3,
                scaleX: 3,
                ease: Power3.easeOut
            }, {
                autoAlpha: 1,
                scaleY: 0.5,
                scaleX: 0.5,
                ease: Power2.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseFrom span",
            0.5, {
                scaleY: 1,
                scaleX: 1,
                ease: Power2.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax();
    tl
        .staggerFromTo(
            ".lePushReleaseFromLeft span",
            0.5, {
                autoAlpha: 0,
                x: -100,
                ease: Power3.easeOut
            }, {
                autoAlpha: 1,
                x: 100,
                ease: Power2.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseFromLeft span",
            0.5, {
                x: 0,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax();
    tl
        .staggerFromTo(
            ".lePushReleaseFromTop span",
            0.5, {
                autoAlpha: 0,
                y: -100,
                ease: Power3.easeOut
            }, {
                autoAlpha: 1,
                y: 100,
                ease: Power2.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseFromTop span",
            0.5, {
                y: 0,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax();
    tl
        .staggerFromTo(
            ".lePushReleaseFromBottom span",
            0.5, {
                autoAlpha: 0,
                y: 100,
                ease: Power3.easeOut
            }, {
                autoAlpha: 1,
                y: -100,
                ease: Power3.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseFromBottom span",
            0.5, {
                y: 0,
                ease: Power2.easeOut
            },
            0.2,
            '-=2.25'
        );

    var tl = new TimelineMax();
    tl
        .staggerTo(
            ".lePushReleaseTo span",
            0.5, {
                autoAlpha: 1,
                scaleY: 0.5,
                scaleX: 0.5,
                ease: Power3.easeOut,
                delay: 0.5
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseTo span",
            0.5, {
                autoAlpha: 0,
                scaleY: 5,
                scaleX: 5,
                ease: Power3.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax();
    tl
        .staggerTo(
            ".lePushReleaseToTop span",
            0.5, {
                autoAlpha: 1,
                y: 100,
                ease: Power2.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseToTop span",
            0.5, {
                autoAlpha: 0,
                y: -100,
                ease: Power2.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax();
    tl
        .staggerTo(
            ".lePushReleaseToBottom span",
            0.5, {
                autoAlpha: 1,
                y: -100,
                ease: Power4.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePushReleaseToBottom span",
            0.5, {
                autoAlpha: 0,
                y: 100,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.28'
        );

    //--------------------------------------------------------------//
    // Letter Flip
    //--------------------------------------------------------------//
    var tl = new TimelineMax({ transformOrign: "0% 0%" });

    tl
        .staggerFrom(
            ".leFlipIn span",
            0.2, {
                autoAlpha: 0,
                perspective: 600,
                rotationX: 0,
                ease: Power2.easeOut
            },
            0.2
        )
        .staggerTo(
            ".leFlipIn span",
            0.5, {
                autoAlpha: 1,
                rotationX: 180,
                perspective: 600,
                ease: Power3.easeOut
            },
            0.2,
            '-=2.2'
        )
        .staggerTo(
            ".leFlipIn span",
            0.5, {
                rotationX: 0,
                perspective: 600,
                ease: Power3.easeOut
            },
            0.2,
            '-=2.3'
        );

    //--------------------------------------------------------------//
    // Letter Roll From
    //--------------------------------------------------------------//
    TweenMax.staggerFrom(
        ".leRollFromLeft span",
        1, {
            autoAlpha: 0,
            x: -60,
            rotationY: 180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leRollFromRight span",
        1, {
            autoAlpha: 0,
            x: 60,
            rotationY: -180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leRollFromTop span",
        1, {
            autoAlpha: 0,
            y: -60,
            rotationX: 180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leRollFromBottom span",
        1, {
            autoAlpha: 0,
            y: 60,
            rotationX: -180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Roll To
    //--------------------------------------------------------------//
    TweenMax.staggerTo(
        ".leRollToLeft span",
        1, {
            autoAlpha: 0,
            x: -60,
            rotationY: 180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerTo(
        ".leRollToRight span",
        1, {
            autoAlpha: 0,
            x: 60,
            rotationY: -180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerTo(
        ".leRollToTop span",
        1, {
            autoAlpha: 0,
            y: -60,
            rotationX: 180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerTo(
        ".leRollToBottom span",
        1, {
            autoAlpha: 0,
            y: 60,
            rotationX: -180,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Rotation
    //--------------------------------------------------------------//
    // var tl = new TimelineMax({perspective:600});
    TweenMax
        .staggerFromTo(
            ".leRotationXIn span",
            2, {
                autoAlpha: 0,
                y: -60,
                z: '-200%',
                rotationX: 75,
                ease: Power1.easeOut
            }, {
                autoAlpha: 1,
                y: 0,
                z: '0%',
                rotationX: 0,
                ease: Power1.easeOut
            },
            0.25
        );
    // .staggerTo(
    //     ".leRotationXIn span", 
    //     0.5, 
    //     {
    //         autoAlpha:1,
    //         x:0,
    //         y:0, 
    //         z:0, 
    //         rotationX:0, 
    //         perspective:600, 
    //         ease: Power0.easeNone
    //     }, 
    //     0.2, 
    //     '-=2.5'
    // );

    //--------------------------------------------------------------//
    // Letter Rotate
    //--------------------------------------------------------------//

    TweenMax
        .staggerFromTo(
            ".leRotateIn span",
            1, {
                autoAlpha: 0,
                rotation: -180,
                ease: Power0.easeNone
            }, {
                autoAlpha: 1,
                rotation: 0,
                ease: Power2.easeOut
            },
            0.2
        );

    TweenMax
        .staggerTo(
            ".leRotateOut span",
            1, {
                autoAlpha: 0,
                rotation: 180,
                ease: Power2.easeOut
            },
            0.2
        );

    var tl = new TimelineMax()
    tl.staggerFromTo(
        ".leRotateInLeft span",
        2, {
            autoAlpha: 0,
            rotation: '-180',
            x: -150,
            transformOrigin: '0% top',
            ease: Power0.easeNone
        }, {
            autoAlpha: 1,
            rotation: 0,
            x: 0,
            transformOrigin: '0% top',
            ease: Power2.easeOut
        },
        0.25
    );

    var tl = new TimelineMax()
    tl.staggerFromTo(
        ".leRotateOutLeft span",
        1, {
            autoAlpha: 1,
            rotation: 0,
            x: 0,
            transformOrigin: '0% bottom',
            ease: Power0.easeNone
        }, {
            autoAlpha: 0,
            rotation: '180',
            x: -150,
            transformOrigin: '0% bottom',
            ease: Power2.easeNone
        },
        0.25
    );

    var tl = new TimelineMax()
    tl.staggerFromTo(
        ".leRotateInRight span",
        1, {
            autoAlpha: 0,
            x: 150,
            rotation: '-180',
            transformOrigin: 'center top',
            ease: Power0.easeNone
        }, {
            autoAlpha: 1,
            x: 0,
            rotation: 0,
            transformOrigin: 'center top',
            ease: Power2.easeOut
        },
        0.25
    );

    var tl = new TimelineMax()
    tl.staggerFromTo(
        ".leRotateOutRight span",
        1, {
            autoAlpha: 1,
            x: 0,
            rotation: 0,
            transformOrigin: 'center top',
            ease: Power0.easeNone
        }, {
            autoAlpha: 0,
            x: 150,
            rotation: 180,
            transformOrigin: 'center top',
            ease: Power2.easeOut
        },
        0.25
    );

    //--------------------------------------------------------------//
    // Letter Spin
    //--------------------------------------------------------------//
    var tl = new TimelineMax()
    tl.staggerFrom(
        ".leSpinInLeft span",
        1, {
            autoAlpha: 0,
            rotation: 90,
            transformOrigin: 'left bottom',
            ease: Power2.easeOut
        },
        0.2
    );

    var tl = new TimelineMax()
    tl.staggerFrom(
        ".leSpinInRight span",
        1, {
            autoAlpha: 0,
            rotation: -90,
            transformOrigin: 'right bottom',
            ease: Power2.easeOut
        },
        0.2
    );

    var tl = new TimelineMax()
    tl.staggerTo(
        ".leSpinOutLeft span",
        1, {
            autoAlpha: 0,
            rotation: 90,
            transformOrigin: 'left bottom',
            ease: Power2.easeOut
        },
        0.2
    );

    var tl = new TimelineMax()
    tl.staggerTo(
        ".leSpinOutRight span",
        1, {
            autoAlpha: 0,
            rotation: -90,
            transformOrigin: 'right bottom',
            ease: Power2.easeOut
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Pop Up
    //--------------------------------------------------------------//
    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopUp span",
            0.5, {
                scale: 1.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopUp span",
            0.5, {
                scale: 1,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopUpLeft span",
            0.5, {
                x: -50,
                scale: 1.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopUpLeft span",
            0.5, {
                x: 0,
                scale: 1,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.1'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopUpRight span",
            0.5, {
                x: 50,
                scale: 1.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopUpRight span",
            0.5, {
                x: 0,
                scale: 1,
                ease: Power1.easeOut
            },
            0.2,
            '-=2.1'
        );

    //--------------------------------------------------------------//
    // Letter Pop Out
    //--------------------------------------------------------------//
    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopOut span",
            0.5, {
                scale: 0.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopOut span",
            0.5, {
                scale: 1,
                ease: Power1.easeIn
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopOutLeft span",
            0.5, {
                x: -50,
                scale: 0.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopOutLeft span",
            0.5, {
                x: 0,
                scale: 1,
                ease: Power1.easeIn
            },
            0.2,
            '-=2.1'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".lePopOutRight span",
            0.5, {
                x: 50,
                scale: 0.5,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".lePopOutRight span",
            0.5, {
                x: 0,
                scale: 1,
                ease: Power1.easeIn
            },
            0.2,
            '-=2.1'
        );

    //--------------------------------------------------------------//
    // Letter Bouncing
    //--------------------------------------------------------------//
    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".leBounceFromTop span",
            0.2, {
                y: -80,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".leBounceFromTop span",
            0.5, {
                y: 0,
                ease: Bounce.easeOut
            },
            0.2,
            '-=2.25'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".leBounceFromDown span",
            0.2, {
                y: 80,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".leBounceFromDown span",
            0.5, {
                y: 0,
                ease: Bounce.easeOut
            },
            0.2,
            '-=2.25'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".leBounceY span",
            0.2, {
                scaleY: 2,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".leBounceY span",
            0.5, {
                scaleY: 1,
                ease: Bounce.easeOut
            },
            0.2,
            '-=2.2'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".leBounceZoomIn span",
            0.2, {
                scale: 1.9,
                delay: 0.5,
                ease: Power1.easeOut
            },
            0.2
        )
        .staggerTo(
            ".leBounceZoomIn span",
            0.5, {
                scale: 1,
                ease: Bounce.easeOut
            },
            0.2,
            '-=2.25'
        );

    var tl = new TimelineMax()
    tl
        .staggerTo(
            ".leBounceZoomOut span",
            0.2, {
                scale: 0.5,
                delay: 0.5,
                ease: Power0.easeNone
            },
            0.2
        )
        .staggerTo(
            ".leBounceZoomOut span",
            0.5, {
                scale: 1,
                ease: Bounce.easeOut
            },
            0.2,
            '-=2.25'
        );

    //--------------------------------------------------------------//
    // Letter Perspective
    //--------------------------------------------------------------//

    var tl = new TimelineMax({ perspective: 500 })
    tl
        .staggerTo(
            ".lePerspectiveOutTop span",
            0.5, {
                autoAlpha: 1,
                rotationX: 0,
                y: 0,
                z: 0,
                delay: 0.5,
                ease: Power0.easeNone
            },
            0.2
        )
        .staggerTo(
            ".lePerspectiveOutTop span",
            0.5, {
                autoAlpha: 0,
                rotationX: 90,
                y: -50,
                z: 50,
                ease: Power0.easeNone
            },
            0.2,
            '-=2.25'
        );

    var tl = new TimelineMax({ perspective: 500 })
    tl
        .staggerTo(
            ".lePerspectiveOutBottom span",
            0.5, {
                autoAlpha: 1,
                rotationX: 0,
                y: 0,
                z: 0,
                delay: 0.5,
                ease: Power0.easeNone
            },
            0.2
        )
        .staggerTo(
            ".lePerspectiveOutBottom span",
            0.5, {
                autoAlpha: 0,
                rotationX: 90,
                y: 50,
                z: -50,
                ease: Power0.easeNone
            },
            0.2,
            '-=2.25'
        );

    //--------------------------------------------------------------//
    // Letter Zoom In
    //--------------------------------------------------------------//
    TweenMax.staggerFrom(
        ".leZoomIn span",
        1, {
            scale: 10,
            autoAlpha: 0,
            perspective: 600,
            ease: Power1.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leZoomInLeft span",
        1, {
            scale: 10,
            x: -800,
            autoAlpha: 0,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leZoomInRight span",
        1, {
            scale: 10,
            x: 800,
            autoAlpha: 0,
            perspective: 600,
            ease: Power0.easeNone
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leZoomInTop span",
        1, {
            scale: 10,
            y: -700,
            autoAlpha: 0,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerFrom(
        ".leZoomInBottom span",
        1, {
            scale: 10,
            y: 700,
            autoAlpha: 0,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Zoom Out
    //--------------------------------------------------------------//
    TweenMax.staggerTo(
        ".leZoomOut span",
        1, {
            scale: 10,
            autoAlpha: 0,
            perspective: 600,
            ease: Power2.easeOut
        },
        0.2
    );

    TweenMax.staggerTo ( ".leZoomOutLeft span", 1, { scale: 10, x: '-1000px', autoAlpha: 0, ease: Sine.easeOut }, 0.1 );

    TweenMax.staggerTo(
        ".leZoomOutRight span",
        1, {
            scale: 10,
            x: '1500%',
            autoAlpha: 0,
            ease: Sine.easeOut
        },
        0.2
    );

    TweenMax.staggerTo(
        ".leZoomOutTop span",
        1, {
            scale: 10,
            y: '-500%',
            autoAlpha: 0,
            //perspective: 400, 
            //transformOrigin:'left center', 
            ease: Sine.easeOut
        },
        0.2
    );

    TweenMax.staggerTo(
        ".leZoomOutBottom span",
        1, {
            scale: 10,
            y: '500%',
            autoAlpha: 0,
            //perspective: 400, 
            //transformOrigin:'left center', 
            ease: Sine.easeOut
        },
        0.2
    );

    //--------------------------------------------------------------//
    // Letter Dance In
    //--------------------------------------------------------------//

    TweenMax.staggerFrom(
        ".leDanceInTop span",
        2.5, {
            skewX: -15,
            autoAlpha: 0,
            transformOrigin: 'center top',
            delay: 0.2,
            ease: Elastic.easeOut.config(1, 0.1)
        },
        0.15
    );

    TweenMax.staggerFrom(
        ".leDanceInMiddle span",
        3, {
            skewX: -15,
            autoAlpha: 0,
            transformOrigin: 'center center',
            delay: 0.2,
            ease: Elastic.easeOut.config(1, 0.1)
        },
        0.15
    );
}

// Fade In Animation
TweenMax.from(".fadeIn", 1, {alpha:0});
TweenMax.from(".fadeInLeft", 1, {alpha:0, x:"-100%"});
TweenMax.from(".fadeInRight", 1, {alpha:0, x:"100%"});
TweenMax.from(".fadeInTop", 1, {alpha:0, y:"-100%"});
TweenMax.from(".fadeInBottom", 1, {alpha:0, y:"100%"});

// Fade Out Animation
TweenMax.to(".fadeOut", 1, {alpha:0});
TweenMax.to(".fadeOutLeft", 1, {alpha:0, x:"-100%"});
TweenMax.to(".fadeOutRight", 1, {alpha:0, x:"100%"});
TweenMax.to(".fadeOutTop", 1, {alpha:0, y:"-100%"});
TweenMax.to(".fadeOutBottom", 1, {alpha:0, y:"100%"});

// Move From Animation
TweenMax.from(".moveFromLeft", 1, {x:"-100%"});
TweenMax.from(".moveFromRight", 1, {x:"100%"});
TweenMax.from(".moveFromTop", 1, {y:"-100%"});
TweenMax.from(".moveFromBottom", 1, {y:"100%"});

// Move To Animation
TweenMax.to(".moveToLeft", 1, {x:"-100%"});
TweenMax.to(".moveToRight", 1, {x:"100%"});
TweenMax.to(".moveToTop", 1, {y:"-100%"});
TweenMax.to(".moveToBottom", 1, {y:"100%"});

// Door Close From Left
TweenMax.fromTo(".doorCloseFromLeft", 1, {css: {perspective: 400, transformOrigin: "left", rotationY:90}}, {css: {perspective: 400, transformOrigin: "left", rotationY:0}})
TweenMax.fromTo(".doorOpenFromRight", 1, {css: {perspective: 400, transformOrigin: "left", rotationY:0}}, {css: {perspective: 400, transformOrigin: "left", rotationY:90}})

// Heartbeat
tlheartbeat = new TimelineMax({repeat:-1});
tlheartbeat
  .to(".heartbeat", 0.2, {css:{scale:1.3}})
  .to(".heartbeat", 0.16, {css:{scale:1.3}})
  .to(".heartbeat", 0.2, {css:{scale:1}})

// Heartbeat 2
tlheartbeat2 = new TimelineMax({repeat:-1});
tlheartbeat2
  .to(".tlheartbeat2", 0.2, {css:{scale:1.5}})
  .to(".tlheartbeat2", 0.1, {css:{scale:1}})
  .to(".tlheartbeat2", 0.2, {css:{scale:1.5}})
  .to(".tlheartbeat2", 0.2, {css:{scale:1}})
  .to(".tlheartbeat2", 0.2, {css:{scale:1}})

// Hang On Left
hangOnLeft = new TimelineMax();
hangOnLeft
  .to(".hangOnLeft", 0.4, {css:{transformOrigin: "left", rotation:100}})
  .to(".hangOnLeft", 0.2, {css:{transformOrigin: "left", rotation:80}})
  .to(".hangOnLeft", 0.2, {css:{transformOrigin: "left", rotation:95}})
  .to(".hangOnLeft", 0.2, {css:{transformOrigin: "left", rotation:85}})
  .to(".hangOnLeft", 0.1, {css:{transformOrigin: "left", rotation:90}})

// Hang On right
hangOnRight = new TimelineMax();
hangOnRight
  .to(".hangOnRight", 0.4, {css:{transformOrigin: "right", rotation:-100}})
  .to(".hangOnRight", 0.2, {css:{transformOrigin: "right", rotation:-80}})
  .to(".hangOnRight", 0.2, {css:{transformOrigin: "right", rotation:-95}})
  .to(".hangOnRight", 0.2, {css:{transformOrigin: "right", rotation:-85}})
  .to(".hangOnRight", 0.1, {css:{transformOrigin: "right", rotation:-90}})

// Pulse Shake
pulseShake = new TimelineMax({delay:1, repeat:-1, repeatDelay:1});
pulseShake
  .to(".pulseShake", 0.2, {css:{scale:1}})
  .to(".pulseShake", 0.02, {css:{scale:1.4}})
  .to(".pulseShake", 0.02, {css:{scale:1}})
  .to(".pulseShake", 0.02, {css:{scale:1.3}})
  .to(".pulseShake", 0.02, {css:{scale:1}})

// Horizontal Shake
TweenMax.to(".horizontalShake", 0.01, {x:"+=20", yoyo:true, repeat:-1});
TweenMax.to(".horizontalShake", 0.01, {x:"-=20", yoyo:true, repeat:-1});

// Vertical Shake
TweenMax.to(".verticalShake", 0.01, {y:"+=20", yoyo:true, repeat:-1});
TweenMax.to(".verticalShake", 0.01, {y:"-=20", yoyo:true, repeat:-1});

// Mad Max
TweenMax.to(".madMax", 0.01, {y:"+=10", css:{scale:1.3}, yoyo:true, repeat:-1});
TweenMax.to(".madMax", 0.01, {y:"+=5", css:{scale:.5}, yoyo:true, repeat:-1});
TweenMax.to(".madMax", 0.01, {y:"-=15", css:{scale:1.3}, yoyo:true, repeat:-1});

// Mad Max
TweenMax.to(".madMax", 0.01, {y:"+=10", css:{scale:1.3}, yoyo:true, repeat:-1});
TweenMax.to(".madMax", 0.01, {y:"+=5", css:{scale:.5}, yoyo:true, repeat:-1});
TweenMax.to(".madMax", 0.01, {y:"-=15", css:{scale:1.3}, yoyo:true, repeat:-1});

// Cool Horizontal Shake
TweenMax.to(".coolHorizontalShake", .1, {x:"+=20", yoyo:true, repeat:-1});
TweenMax.to(".coolHorizontalShake", .1, {x:"-=20", yoyo:true, repeat:-1});

// Cool Vertical Shake
TweenMax.to(".coolVerticalShake", 0.1, {y:"+=20", yoyo:true, repeat:-1});
TweenMax.to(".coolVerticalShake", 0.1, {y:"-=20", yoyo:true, repeat:-1});
