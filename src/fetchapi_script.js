const api = "src/fetchapi.php";
document.getElementById("OrderForm").addEventListener("submit", saveOrder);
window.onload = function() {
    fetchOrders();
};
function fetchOrders() {
    document.getElementById("addedit").innerHTML = "Új rendelés";
    fetch(api,{
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "action=read"
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText += " "+data.status;
            let rows = "";
            data.readData.forEach(Order => {
                rows += `
                <tr>
                    <td>${Order.az}</td>
                    <td>${Order.pizzanev}</td>
                    <td>${Order.darab}</td>
                    <td>${Order.felvetel}</td>
                    <td>${Order.kiszallitas}</td>
                    <td>
                        <button onclick='editOrder(${JSON.stringify(Order)})'>Szerkeszt</button>
                        <button onclick='deleteOrder(${Order.az})'>Töröl</button>
                    </td>
                </tr>`;
            });
            document.getElementById("OrderTable").innerHTML = rows;
        });
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

function editOrder(Order) {
    document.getElementById("message").innerText = "";
    document.getElementById("addedit").innerHTML = "Rendelés szerkesztése";
    document.getElementById("az").value = Order.az;
    document.getElementById("pizzanev").value = Order.pizzanev;
    document.getElementById("darab").value = Order.darab;
    document.getElementById("felvetel").value = Order.felvetel;
    document.getElementById("kiszallitas").value = Order.kiszallitas;
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

