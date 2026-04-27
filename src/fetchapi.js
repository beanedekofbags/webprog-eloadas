const api = "./src/fetchapi.php";
document.getElementById("registration").addEventListener("submit", saveOrder);
window.onload = function() {
    fetchOrders();
};

function fetchOrders() {
    
    document.getElementById("addedit").innerHTML = "Új rendelés";
    fetch(api, {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "action=read"
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText += " "+data.status;
            let rows = "";
            data.readData.forEach(order => {
                rows += `
                <div class="row">
                    <div class="cell">${order.az}</div>
                    <div class="cell">${order.pizzanev}</div>
                    <div class="cell">${order.darab}</div>
                    <div class="cell">${order.felvetel}</div>
                    <div class="cell">${order.kiszallitas}</div>
                    <div class="cell">
                        <button class="actionbutton" onclick='editOrder(${JSON.stringify(order)})'>Szerkeszt</button>
                        <button class="actionbutton" onclick='deleteOrder(${order.az})'>Töröl</button>
                    </div>
                </div>`;
            });
            document.getElementById("order-contents").innerHTML = rows;
        }
    );
}
function saveOrder(e) {
    e.preventDefault();
    
    const az = document.getElementById("az").value;
    const pizzanev = document.getElementById("pizzanev").value;
    const darab = document.getElementById("darab").value;
    const felvetel = document.getElementById("felvetel").value;
    const kiszallitas = document.getElementById("kiszallitas").value;
    const action = az ? "update" : "create";
    
    console.log(felvetel, kiszallitas);
    
    fetch(api, {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: "action="+action+"&az="+az+"&pizzanev="+pizzanev+"&darab="+darab+"&felvetel="+felvetel+"&kiszallitas="+kiszallitas
    })
    .then(res => res.json())
    .then(data => {
        e.target.reset();
        document.getElementById("message").innerText = data.status;
        document.getElementById("az").value = "";
        fetchOrders();
    });
}

function editOrder(order) {
    document.getElementById("message").innerText = "";
    document.getElementById("addedit").innerHTML = "Rendelés szerkesztése";
    document.getElementById("az").value = order.az;
    document.getElementById("pizzanev").value = order.pizzanev;
    document.getElementById("darab").value = order.darab;
    document.getElementById("felvetel").value = order.felvetel;
    document.getElementById("kiszallitas").value = order.kiszallitas;
}

function deleteOrder(az) {
    if (!confirm("Biztos hogy törli ezt a rendelést?")) return;
    
    fetch(api, {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body:"action=delete&az="+az
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.status;
        fetchOrders();
    });
}

