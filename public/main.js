class TypeWriter {
    constructor(element, words, period) {
        this.element = element;
        this.words = JSON.parse(words);
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        let i = this.loopNum % this.words.length;
        let fullTxt = this.words[i];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.element.innerHTML = this.txt;

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute("data-type");
        let period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TypeWriter(elements[i], toRotate, period);
        }
    }
});