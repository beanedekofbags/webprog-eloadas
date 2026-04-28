let selectedIndex = null;
let editingIndex = null;
let tomb = new Array();
let tableContents = new Array();

window.onload = () => {
    tomb.push({ nev: "apród", ar: 850 });
    tomb.push({ nev: "főnemes", ar: 950 });
    tomb.push({ nev: "király", ar: 1250 });
    tomb.push({ nev: "lovag", ar: 1150 });
    createFormElements();
    printArray();
};

function createFormElements() {
    const form = document.getElementById('registration');
    let isEditing = editingIndex != null;
    form.onsubmit = e => {
        e.preventDefault();
        isEditing ? updateRecord() : submitForm();
    }
    
    editingFields = isEditing ? { nev: tomb[editingIndex].nev, ar: tomb[editingIndex].ar } : { nev: "", ar: "" };
    let html = `
        <h1>${isEditing ? `\"${tomb[editingIndex].nev}\" szerkesztése` : "Új kategória felvétele"}</h1>
        
        <label for="nev" class="section">Kategórianév</label>
            <input type="text" value="${editingFields.nev}" name="nev" id="nev" placeholder="Írjon be egy nevet..." required/>
        <label for="ar" class="section">Ár</label>
            <input type="number" value="${editingFields.ar}" name="ar" id="ar" placeholder="Írjon be egy árat..."/>
    `;
    if (isEditing) {
        html += `
            <button type="submit">SZERKESZTÉS</button>
            <button type="button" onclick="resetForm()">VISSZA</button>
        `
    }
    else {
        html += `
            <button type="submit">ELKÜLD</button>
        `
    }
    form.innerHTML = html;
}
function startEditing(index) {
    editingIndex = index;
    createFormElements();
}
function submitForm() {
    let formData = readFormData();
    insertNewRecord(formData);
    resetForm();
}
function resetForm() {
    editingIndex = null;
    createFormElements();
    //document.getElementById("mezo").value = "";
}

function readFormData() {
    let formData = {};
    formData["nev"] = document.getElementById("nev").value;
    formData["ar"] = document.getElementById("ar").value;
    return formData;
}

function printArray(){
    let table = document.getElementById('pizza-table-contents');
    table.innerHTML = "";
    tableContents = new Array();
    for (i = 0; i < tomb.length; i++) {
        insertRow(table, i);
    }
}

function getRowElement(index) {
    
    const row = document.createElement("div");
    row.className = "row selectable-element";
    row.onclick = () => {
        if (selectedIndex != null) { 
            tableContents[selectedIndex].row.classList.remove("selected");
            tableContents[selectedIndex].editbar.classList.add("hidden");
            if (selectedIndex == index) {
                selectedIndex = null;
                return;
            }
        }
        selectedIndex = index;
        row.classList.add("selected");
        editbar.classList.remove("hidden");
    }
    
    row.innerHTML = `
        <div class="cell">${tomb[index].nev}</div>
        <div class="cell">${tomb[index].ar}</div>
    `;
    
    const editbar = document.createElement("div");
    editbar.className = "edit-bar hidden";
    editbar.innerHTML = `
        <button class="fillbutton" onclick="startEditing(${i})">SZERKESZTÉS</button>
        <button class="fillbutton" onclick="deleteRecord(${i})">TÖRLÉS</button>
    `
    
    return {row, editbar};
    
}
function insertRow(parent, i) {
    const container = document.createElement("div");
    
    const {row, editbar} = getRowElement(i);
    container.appendChild(row);
    container.appendChild(editbar);
    
    tableContents.push({row: row, editbar: editbar});
    parent.appendChild(container);
}

function insertNewRecord(data) {
    data.ar = data.ar == "" ? 0 : data.ar;
    tomb.push({ nev: data.nev, ar: data.ar });
    selectedIndex = null;
    printArray();
}
function updateRecord() {
    let formData = readFormData();
    tomb[editingIndex].nev=formData.nev;
    tomb[editingIndex].ar=formData.ar;
    selectedIndex = null;
    resetForm();
    printArray();
}
function deleteRecord(index) {
    if (confirm('Biztosan törölni szeretnéd?')) {
        tomb.splice(index, 1);
        selectedIndex = null;
        resetForm();
        printArray();
    }
}