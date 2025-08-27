// Typewriter Text Effect
// Creates animated typing effect for description text

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.isDeleting = false;
    this.messages = this.toRotate[this.loopNum].split('|').map(message => message.replace(/!br!/g, '<br/>'));
    this.messageIndex = 0;
    this.tick();
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        toRotate = toRotate.replace(/\n|\r\n/g, '\\n');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            var parsed = JSON.parse(toRotate);
            for (var j = 0; j < parsed.length; j++) {
                parsed[j] = parsed[j].replace(/\\n/g, '\n').replace(/\n/g, '!br!');
            }
            new TxtType(elements[i], parsed, period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

TxtType.prototype.tick = function() {
    var fullTxt = this.messages[this.messageIndex];

    if (this.isDeleting) {
        if (this.txt.endsWith('<br/>')) {
            this.txt = this.txt.substring(0, this.txt.lastIndexOf('<'));
        } else {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
    } else {
        if (fullTxt.substring(this.txt.length, this.txt.length + 5) === '<br/>') {
            this.txt += '<br/>';
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 4;
        if (this.txt === '') {
            this.isDeleting = false;
            if (++this.messageIndex >= this.messages.length) {
                this.messageIndex = 0;
                this.loopNum++;
                if (this.loopNum >= this.toRotate.length) {
                    this.loopNum = 0;
                }
                this.messages = this.toRotate[this.loopNum].split('|').map(message => message.replace(/!br!/g, '<br/>'));
            }
            delta = 500;
        }
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};