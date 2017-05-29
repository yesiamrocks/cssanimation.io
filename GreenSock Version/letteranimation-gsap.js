window.onload = function () {
    splitText();
    initTweenMax();
};

function splitText() {
    var a = document.getElementsByClassName('cssanimation');
    for (var i = 0; i < a.length; i++) {
        var $this = a[i];
        var letter = $this.innerHTML;
        letter = letter.trim();
        var str = '';
        var delay = 100;
        for (l = 0; l < letter.length; l++) {
            if (letter[l] != ' ') {
                str += '<span>' + letter[l] + '</span>';
                delay += 150;
            }
            else
                str += letter[l];
        }
        $this.innerHTML = str;
    }
}