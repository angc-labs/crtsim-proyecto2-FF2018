// canvas
const frontCanvas = document.getElementById('frontView');
const sideCanvas = document.getElementById('sideView');
const topCanvas = document.getElementById('topView');
            
const frontContext = frontCanvas.getContext('2d');
const sideContext = sideCanvas.getContext('2d');
const topContext = topCanvas.getContext('2d');
const maxDeflection = 0.15;


// Estado de la simulación
let simulation = {
    mode: 'manual',
    accelerationVoltage: 2000,
    verticalVoltage: 0,
    horizontalVoltage: 0,
    persistence: 3,
    frequency: 1,
    phase: 0,
    time: 0,
    traces: [],
    electronPosition: { x: 0, y: 0 }
};

function drawLateralView(canvas, context, color, position) {
    const width = canvas.width;
    const height = canvas.height;
    const scale = height / 2;        
    const deflection = position * scale / maxDeflection;
    
    // clear canvas
    context.clearRect(0, 0, width, height);
                
    // cañón de electrones
    context.strokeStyle = '#ffcc00';
    context.lineWidth = 2;
    context.beginPath();
    context.rect(20, height/2 - 10, 40, 20);
    context.stroke();
                
    // placas verticales
    const platesX = 100;
    context.fillStyle = color;
    context.fillRect(platesX, height/2 - 40, 30, 30);
    context.fillRect(platesX, height/2 + 10, 30, 30);
    
    // linea central
    context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    context.setLineDash([5, 5]);
    context.beginPath();
    context.moveTo(0, height/2);
    context.lineTo(width, height/2);
    context.stroke();
    context.setLineDash([]);
                
    // pantalla
    context.strokeStyle = '#ffcc00';
    context.beginPath();
    context.moveTo(width - 50, 20);
    context.lineTo(width - 50, height - 20);
    context.stroke();
                
    context.strokeStyle = '#00ffbb';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(60, height/2);
                
    // curva hacia las placas
    context.quadraticCurveTo(
        80, height/2,
        platesX + 15, height/2
    );
                
    // Curva después de las placas
    context.quadraticCurveTo(
        platesX + 50, height/2,
        width - 50, height/2 - deflection
    );
                
    context.stroke();
                
    // Dibujar electrón
    context.fillStyle = '#00ffbb';
    context.beginPath();
    context.arc(width - 50, height/2 - deflection, 5, 0, Math.PI * 2);
    context.fill();
}

function drawFrontView(initAlpha) {
    const width = frontCanvas.width;
    const height = frontCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 2.5;
    
    // Limpiar canvas
    frontContext.clearRect(0, 0, width, height);
                
    // Dibujar el marco de la pantalla
    frontContext.strokeStyle = '#ffcc00';
    frontContext.lineWidth = 2;
    frontContext.beginPath();
    frontContext.rect(centerX - scale, centerY - scale * 0.75, scale * 2, scale * 1.5);
    frontContext.stroke();
                
    // Dibujar trazas anteriores con desvanecimiento
    for (let i = 0; i < simulation.traces.length; i++) {
        const trace = simulation.traces[i];
        const age = (Date.now() - trace.time) / 1000;
        const alpha = Math.max(0, 1 - (age / simulation.persistence));
                    
        if (alpha > 0) {
            const x = centerX + trace.x * scale / maxDeflection;
            const y = centerY - trace.y * scale / maxDeflection;
                        
            frontContext.fillStyle = `rgba(0, 255, 150, ${initAlpha + alpha})`;
            frontContext.beginPath();
            frontContext.arc(x, y, 3, 0, Math.PI * 2);
            frontContext.fill();
        }
    }

    // Dibujar punto actual del electrón
    const pos = simulation.electronPosition;
    const screenX = centerX + pos.x * scale / maxDeflection;
    const screenY = centerY - pos.y * scale / maxDeflection;
                
    frontContext.fillStyle = `rgba(0, 255, 187, ${initAlpha})`;
    frontContext.beginPath();
    frontContext.arc(screenX, screenY, 5, 0, Math.PI * 2);
    frontContext.fill();
}

const pos = simulation.electronPosition;
drawLateralView(
    topCanvas, 
    topContext, 
    "rgba(255, 100, 100, 0.5)", 
    pos.y
)

drawLateralView(
    sideCanvas, 
    sideContext, 
    "rgba(100, 200, 255, 0.5)", 
    pos.x
)

drawFrontView(0.8)