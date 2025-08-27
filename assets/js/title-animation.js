// Dynamic Title Animation Script
// Animates the page title with typewriter effect

var rev = "fwd";

function titlebar(val) {
    var msg = "xAbdoAT";
    var speed = 200;
    var pos = val;
    var le = msg.length;
    
    if (rev == "fwd") {
        if (pos < le) {
            pos = pos + 1;
            scroll = msg.substr(0, pos);
            document.title = "   * " + scroll + " *";
            timer = window.setTimeout("titlebar(" + pos + ")", speed);
        } else {
            rev = "bwd";
            timer = window.setTimeout("titlebar(" + pos + ")", speed);
        }
    } else {
        if (pos > 0) {
            pos = pos - 1;
            var ale = le - pos;
            scrol = msg.substr(0, pos);
            document.title = "   * " + scrol + " *";
            timer = window.setTimeout("titlebar(" + pos + ")", speed);
        } else {
            rev = "fwd";
            timer = window.setTimeout("titlebar(" + pos + ")", speed);
        }
    }
}

// Initialize title animation
titlebar(1);