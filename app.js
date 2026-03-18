const metas = [
{nombre:"Viaje ✈️", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"},
{nombre:"Casa 🏠", img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994"},
{nombre:"Carro 🚗", img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70"},
{nombre:"Estudio 🎓", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1"},
{nombre:"Negocio 💼", img:"https://images.unsplash.com/photo-1556745757-8d76bdb6984b"},
{nombre:"Tecnología 💻", img:"https://images.unsplash.com/photo-1518770660439-4636190af475"},
{nombre:"Emergencia 🆘", img:"https://images.unsplash.com/photo-1584438784894-089d6a62b8fa"},
{nombre:"Inversión 📈", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f"},
{nombre:"Boda 💍", img:"https://images.unsplash.com/photo-1519741497674-611481863552"},
{nombre:"Hijos 👶", img:"https://images.unsplash.com/photo-1519681393784-d120267933ba"},
{nombre:"Mascota 🐶", img:"https://images.unsplash.com/photo-1517849845537-4d257902454a"},
{nombre:"Salud 🏥", img:"https://images.unsplash.com/photo-1580281657527-47f249e9f20a"},
{nombre:"Deudas 💳", img:"https://images.unsplash.com/photo-1601597111158-2fceff292cdc"},
{nombre:"Lujo 🛍️", img:"https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"},
{nombre:"Otro 🌟", img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
];

const select = document.getElementById("meta");

metas.forEach((m,i)=>{
    let option = document.createElement("option");
    option.value = i;
    option.textContent = m.nombre;
    select.appendChild(option);
});

let chart;

function calcular(){
    let ingresos = +document.getElementById('ingresos').value;
    let fijos = +document.getElementById('fijos').value;
    let variables = +document.getElementById('variables').value;
    let costo = +document.getElementById('costo').value;

    let ahorro = ingresos - (fijos + variables);

    if(ahorro <= 0){
        alert("⚠️ No tienes capacidad de ahorro");
        return;
    }

    let meses = Math.ceil(costo / ahorro);

    let recomendacion = "";
    if(ahorro/ingresos < 0.2){
        recomendacion = "⚠️ Intenta ahorrar más del 20%";
    } else {
        recomendacion = "✅ Buen nivel de ahorro";
    }

    document.getElementById('resultado').innerHTML = `
    💰 Ahorro mensual: $${ahorro.toLocaleString()} COP<br>
    ⏳ Meses para meta: ${meses}<br>
    🤖 ${recomendacion}
    `;

    animar(costo);
    graficar(meses, ahorro);

    let meta = metas[select.value];
    document.getElementById("imagenMeta").src = meta.img;
}

function animar(meta){
    let el = document.getElementById('contador');
    let val = 0;

    let i = setInterval(()=>{
        val += meta/40;

        if(val >= meta){
            val = meta;
            clearInterval(i);
        }

        el.innerHTML = `💸 $${Math.floor(val).toLocaleString()} COP`;
    },50);
}

function graficar(meses, ahorro){
    let datos = [];
    let total = 0;

    for(let i=1;i<=meses;i++){
        total += ahorro;
        datos.push(total);
    }

    if(chart) chart.destroy();

    chart = new Chart(document.getElementById('grafico'),{
        type:'line',
        data:{
            labels: datos.map((_,i)=>"Mes "+(i+1)),
            datasets:[{
                label:'Ahorro acumulado',
                data: datos
            }]
        }
    });
}

function descargarPDF(){
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.setFont("helvetica","bold");
    doc.text("PLAN FINANCIERO IA", 20, 20);

    doc.setFont("helvetica","normal");
    doc.text(document.getElementById('resultado').innerText, 20, 40);

    doc.save("plan_financiero.pdf");
}
