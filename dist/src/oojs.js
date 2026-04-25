document.addEventListener("DOMContentLoaded", function() {
    var image1 = new kep("kep1","assets/pizza1.jpg",300,200);
    var image1 = new kep("kep2","assets/pizza2.jpg",200,200);
    var gomb1 = new forgat("forgat");
    var gomb1 = new sarok("sarok kerekítése");
    this.hang1 = document.createElement("audio");
    this.hang1.src = "assets/slap-sound-effect.mp3";
    this.hang1.id = "hang1";
    this.hang1.volume = 0.2;
    document.body.appendChild(this.hang1);
    this.hang2 = document.createElement("audio");
    this.hang2.src = "assets/spongebob-sad-sound.mp3";
    this.hang2.id = "hang2";
    this.hang2.volume = 0.2;
    document.body.appendChild(this.hang2);
});
var selected = "";
class kep{
    constructor(nev, src, x, y) {
        this.kepek = document.getElementById("kepek");
        this.elem = document.createElement("img");
        this.elem.id = nev;
        this.elem.src = src;
        this.elem.width = x;
        this.elem.height = y;
        this.elem.addEventListener("click", this.onClick)
        this.kepek.appendChild(this.elem);
    }
    onClick()
    {
        if(!this.classList.contains("selected") && selected == "")
        {
            this.classList.add("selected");
            this.selected = true;
            selected = this.id;
            document.getElementById("hang1").play();
        }else if (selected == this.id) {
            this.classList.remove("selected");
            this.selected = false;
            selected = "";
            document.getElementById("hang2").play();
        }
        console.log(selected);
    }
}
class gombok{
    constructor(felirat) {
        this.gombok = document.getElementById("gombok");
        this.elem = document.createElement("button");
        this.elem.innerHTML = felirat;
        this.elem.addEventListener("click", this.onClick)
        this.gombok.appendChild(this.elem);
    }
    onClick()
    {
        var elem = document.getElementById(selected);
        return elem;
    }
}
class forgat extends gombok{
    onClick()
        {
            if (selected != "") {
                var elem = super.onClick();
                console.log(elem.id);
                if (elem.classList.contains("selected")) {
                    elem.classList.contains("forgat") ? elem.classList.remove("forgat") : elem.classList.add("forgat");
                }
            }
        }
}
class sarok extends gombok{
    onClick()
        {
            if (selected != "") {
                var elem = super.onClick();
                console.log(elem.id);
                if (elem.classList.contains("selected")) {
                    elem.classList.contains("borderr") ? elem.classList.remove("borderr") : elem.classList.add("borderr");
                }
            }
        }
}