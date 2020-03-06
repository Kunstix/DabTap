// ============== TRIGGER ANIMATIONS ==============

function onKeyDown(event) {

    if (keyData[event.key]) {
        keyData[event.key].sound.play();
        keyData[event.key].anim();
    }
}

// ============== GENERAL ONFRAME ==============

var animatedObjects = [];
function onFrame(event) {
    animatedObjects.forEach(function (objData, index) {
        objData.onFrame(event);
        if (objData.done()) {
            if (objData.onRemove) {
                objData.onRemove();
            }
            objData.drawnObj.remove();
            animatedObjects.splice(index, 1);
        }
    });
};

// ============ ANIMATIONS ==============

var anims = (function () {
    function _generateRndPoint() {
        var maxPoint = new Point(view.size.width, view.size.height);
        var rndPoint = Point.random();
        return maxPoint * rndPoint;
    }

    return {
        drawCircle: function () {
            var circle = new Path.Circle(_generateRndPoint(), 500);
            circle.fillColor = Color.random();

            var objectData = {
                drawnObj: circle,
                onFrame: function (event) {
                    this.drawnObj.scale(0.9);
                    this.drawnObj.fillColor.hue += 1;
                },
                done: function () {
                    return this.drawnObj.area <= 0;
                },
            };
            animatedObjects.push(objectData);
        },

        drawScalingDisappearingSquare: function () {
            var square = new Path.Rectangle({
                point: view.center,
                size: [75, 75],
                fillColor: Color.random()
            });
            var objectData = {
                drawnObj: square,
                onFrame: function (event) {
                    this.drawnObj.rotate(4);
                    this.drawnObj.scale(1.07);
                    this.drawnObj.fillColor.hue += 1;
                    this.drawnObj.fillColor.alpha -= 0.02;
                    var vector = this.destination - this.drawnObj.position;
                    this.drawnObj.position += vector / 20;
                },
                destination: (Point.random()) * view.size,
                done: function () {
                    return this.drawnObj.area >= (view.size.width * view.size.height * 5);
                }
            };
            animatedObjects.push(objectData);
        },

        drawOverlappingCircle: function () {
            var rndPoint = _generateRndPoint();

            // generate colored Circle
            var fixedRadius = 350;
            var coloredCircle = new Path.Circle({
                center: rndPoint,
                radius: fixedRadius,
                fillColor: Color.random()
            });

            // generate rndm point around the original circle with distance radius
            var angle = Math.random() * Math.PI * 2;
            var x = Math.cos(angle) * (fixedRadius * 2);
            var y = Math.sin(angle) * (fixedRadius * 2);
            var point = new Point(x + rndPoint.x, y + rndPoint.y);

            // generate circle with backgroundcolor
            var bgcircle = new Path.Circle({
                center: point,
                radius: fixedRadius + 1,
                fillColor: 'black'
            });

            var objectData = {
                drawnObj: bgcircle,
                onFrame: function (event) {
                    var vector = rndPoint - bgcircle.position;
                    this.drawnObj.position += vector / 20;
                },
                done: function () {
                    return this.drawnObj.position.isClose(rndPoint, 3);
                },
                onRemove: function () {
                    coloredCircle.remove();
                }
            };
            animatedObjects.push(objectData);
        }
    };
})();


var keyData = {
    a: {
        sound: new Howl({
            src: ['sounds/bubbles.mp3'],
        }),
        anim: anims.drawCircle
    },
    s: {
        sound: new Howl({
            src: ['sounds/clay.mp3'],
        }),
        anim: anims.drawScalingDisappearingSquare
    },
    d: {
        sound: new Howl({
            src: ['sounds/confetti.mp3'],
        }),
        anim: anims.drawOverlappingCircle
    },
    f: {
        sound: new Howl({
            src: ['sounds/corona.mp3'],
        }),
        anim: anims.drawCircle
    },
    g: {
        sound: new Howl({
            src: ['sounds/dotted-spiral.mp3'],
        }),
        anim: anims.drawCircle
    },
    h: {
        sound: new Howl({
            src: ['sounds/flash-1.mp3'],
        }),
        anim: anims.drawCircle
    },
    j: {
        sound: new Howl({
            src: ['sounds/flash-2.mp3'],
        }),
        anim: anims.drawCircle
    },
    k: {
        sound: new Howl({
            src: ['sounds/flash-3.mp3'],
        }),
        anim: anims.drawCircle
    },
    l: {
        sound: new Howl({
            src: ['sounds/glimmer.mp3'],
        }),
        anim: anims.drawCircle
    },
    y: {
        sound: new Howl({
            src: ['sounds/moon.mp3'],
        }),
        anim: anims.drawCircle
    },
    x: {
        sound: new Howl({
            src: ['sounds/pinwheel.mp3'],
        }),
        anim: anims.drawCircle
    },
    c: {
        sound: new Howl({
            src: ['sounds/piston-1.mp3'],
        }),
        anim: anims.drawCircle
    },
    v: {
        sound: new Howl({
            src: ['sounds/piston-2.mp3'],
        }),
        anim: anims.drawCircle
    },
    b: {
        sound: new Howl({
            src: ['sounds/piston-3.mp3'],
        }),
        anim: anims.drawCircle
    },
    n: {
        sound: new Howl({
            src: ['sounds/prism-1.mp3'],
        }),
        anim: anims.drawCircle
    },
    m: {
        sound: new Howl({
            src: ['sounds/prism-2.mp3'],
        }),
        anim: anims.drawCircle
    },
    q: {
        sound: new Howl({
            src: ['sounds/prism-3.mp3'],
        }),
        anim: anims.drawCircle
    },
    w: {
        sound: new Howl({
            src: ['sounds/splits.mp3'],
        }),
        anim: anims.drawCircle
    },
    e: {
        sound: new Howl({
            src: ['sounds/squiggle.mp3'],
        }),
        anim: anims.drawCircle
    },
    r: {
        sound: new Howl({
            src: ['sounds/strike.mp3'],
        }),
        anim: anims.drawCircle
    },
    t: {
        sound: new Howl({
            src: ['sounds/suspension.mp3'],
        }),
        anim: anims.drawCircle
    },
    z: {
        sound: new Howl({
            src: ['sounds/timer.mp3'],
        }),
        anim: anims.drawCircle
    },
    u: {
        sound: new Howl({
            src: ['sounds/ufo.mp3'],
        }),
        anim: anims.drawCircle
    },
    i: {
        sound: new Howl({
            src: ['sounds/veil.mp3'],
        }),
        anim: anims.drawCircle
    },
    o: {
        sound: new Howl({
            src: ['sounds/wipe.mp3'],
        }),
        anim: anims.drawCircle
    },
    p: {
        sound: new Howl({
            src: ['sounds/zig-zag.mp3'],
        }),
        anim: anims.drawCircle
    }
}