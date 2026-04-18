var selectedIndex = null;
var tomb = new Array();

tomb.push({"nev":"apród","ar":"850"});
tomb.push({"nev":"főnemes","ar":"950"});
tomb.push({"nev":"király","ar":"1250"});
tomb.push({"nev":"lovag","ar":"1150"});
printArray();

function printArray(){
    var table = document.getElementById("tablelist").getElementsByTagName('tbody')[0];
    table.innerHTML="";
    var newRow;
    for (i = 0; i < tomb.length; i++) {
        newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = tomb[i].nev;

        cell2 = newRow.insertCell(1);
        cell2.innerHTML = tomb[i].ar;

        /*cell? = newRow.insertCell(3);
        cell?.innerHTML = tomb[i].mezo;*/

        cell3 = newRow.insertCell(2);
        cell3.innerHTML = '<a onClick="onEdit('+i+')" class="modify">Módosít</a>' + '<a onClick="onDelete('+i+')" class="delete">Töröl</a>';
    }
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex==null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["nev"] = document.getElementById("nev").value;
    formData["ar"] = document.getElementById("ar").value;
    return formData;
}

function insertNewRecord(data) {
    tomb.push({"nev":data.nev,"ar":data.ar});
    printArray();
}

function resetForm() {
    document.getElementById("nev").value = "";
    document.getElementById("ar").value = "";
    //document.getElementById("mezo").value = "";
    selectedIndex=null;
}

function onEdit(index) {
    document.getElementById("nev").value = tomb[index].nev;
    document.getElementById("ar").value = tomb[index].ar;
    //document.getElementById("mezo").value = tomb[index].mezo;
    selectedIndex=index;
}

function updateRecord(formData) {
    tomb[selectedIndex].nev=formData.nev;
    tomb[selectedIndex].ar=formData.ar;
    //tomb[selectedIndex].mezo=formData.mezo;
    printArray();
}

function onDelete(index) {
    if (confirm('Biztos hogy törölni szeretnéd?')) {
        tomb.splice(index, 1);
        resetForm();
        printArray();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("nev").value == "") {
        isValid = false;
        document.getElementById("nevValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nevValidationError").classList.contains("hide"))
            document.getElementById("nevValidationError").classList.add("hide");
    }
    return isValid;
}