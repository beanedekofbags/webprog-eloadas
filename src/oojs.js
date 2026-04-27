let imgs = new Array();
let sfx = new Array();

document.addEventListener("DOMContentLoaded", function() {
    
    imgs.push(new ModifiableImage("kep1", "./src/assets/img/pizza1.jpg", 300, 200));
    imgs.push(new ModifiableImage("kep2", "./src/assets/img/pizza2.jpg", 200, 200));
    new RotateButton();
    new BorderButton();
    
    const selectSfx = document.createElement("audio");
    selectSfx.src = "./src/assets/sfx/select.mp3";
    selectSfx.id = "select-sfx";
    selectSfx.volume = 0.2;
    
    const deselectSfx = document.createElement("audio");
    deselectSfx.src = "./src/assets/sfx/deselect.mp3";
    deselectSfx.id = "deselect-sfx";
    deselectSfx.volume = 0.2;
    
    sfx['select'] = selectSfx;
    sfx['deselect'] = deselectSfx;
    sfx.forEach(e => {
        document.body.appendChild(e);
    });
    
});

function playSfx(id) {
    sfx[id].currentTime = 0;
    sfx[id].play();
}

let selectedImgs = new Array();
class ModifiableImage {
    
    constructor(nev, src, x, y) {
        this.id = nev;
        console.log(this);
        this.container = document.getElementById("img-container");
        
        this.elem = document.createElement("img");
        this.elem.src = src;
        this.elem.addEventListener("click", this.onClick(this.id));
        
        this.container.appendChild(this.elem);
    }
    
    onClick(id) {
        return function eventHandler(e) {
            let img = e.target;
            if (selectedImgs.find(i => i == id) == null)
            {
                img.classList.add("selected");
                selectedImgs.push(id);
                playSfx('select');
            }
            else {
                img.classList.remove("selected");
                selectedImgs = selectedImgs.filter(i => i != id);
                playSfx('deselect');
            }
        }
    }
}
class ModifyButton {
    constructor(text) {
        this.container = document.getElementById("button-container");
        this.elem = document.createElement("button");
        if (text != null) this.elem.innerHTML = text;
        this.elem.addEventListener("click", this.onClick);
        this.container.appendChild(this.elem);
    }
    onClick() {}
    toggleEffect(effect) {
        //console.log(selectedImgs);
        let elems = imgs.filter(e =>
            selectedImgs.find(id => {
                //console.log(id+", "+e.id)
                return id == e.id;
            })
        );
        elems.forEach(e => {
            e.elem.classList.contains(effect) ? e.elem.classList.remove(effect) : e.elem.classList.add(effect);
        });
    }
}
class RotateButton extends ModifyButton{
    constructor() { super("FORGAT"); }
    onClick() { super.toggleEffect("rotate"); }
}
class BorderButton extends ModifyButton{
    constructor() { super("SARKOK LEKEREKÍTÉSE"); }
    onClick() { super.toggleEffect("border-round"); }
}