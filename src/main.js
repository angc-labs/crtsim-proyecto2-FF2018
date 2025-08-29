const canvas = document.getElementById('vista-frontal')
const botonBorrar = document.getElementById('boton')

botonBorrar.onclick=clear
const demoCanvas = canvas.getContext('2d');

window.onload = function() {
    // variables para el circulo
    const r = 50
    const x = 200
    const y=50
    demoCanvas.beginPath();
    demoCanvas.moveTo(0, 0); 
    demoCanvas.lineTo(400, 0);
    demoCanvas.stroke();
    demoCanvas.fillStyle = 'blue'
    demoCanvas.moveTo(x+r,y)
    demoCanvas.arc(x, y, r, 0, 2 * Math.PI);
    demoCanvas.fill()
    demoCanvas.stroke();
    demoCanvas.closePath()
}

function clear (){
    demoCanvas.clearRect(0, 0, canvas.width, canvas.height);
}