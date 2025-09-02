import { CONFIG } from './config.js';
import { simulation } from './sim.js';
import { frontCanvas, frontCtx } from './elements.js';

export function drawFrontView() {
    const width = frontCanvas.width;
    const height = frontCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 2;
    
    // refresh
    frontCtx.clearRect(0, 0, width, height);
    
    // marco
    frontCtx.strokeStyle = CONFIG.COLORS.SCREEN;
    frontCtx.lineWidth = CONFIG.CANVAS.LINE_WIDTH;
    frontCtx.beginPath();
    frontCtx.rect(
        centerX - scale * 0.95, 
        centerY - scale * 0.75, 
        scale * 1.9, 
        scale * 1.5
    );
    frontCtx.stroke();
    
    return { frontCtx, centerX, centerY, scale };
}

export function drawFrontViewTraces(simulation, frontCtx, centerX, centerY, scale) {
    // posiciones anteriores
    for (let i = 0; i < simulation.traces.length; i++) {
        const trace = simulation.traces[i];
        const age = (Date.now() - trace.time) / 1000;
        const alpha = Math.max(0, Math.abs(simulation.accelerationVoltage/5000) - (age / simulation.persistence));
        
        if (alpha > 0) {
            const x = centerX + trace.x * scale / CONFIG.MAX_DEFLECTION;
            const y = centerY - trace.y * scale / CONFIG.MAX_DEFLECTION;
            
            frontCtx.fillStyle = `rgba(0, 255, 150, ${alpha})`;
            frontCtx.beginPath();
            frontCtx.arc(
                x, 
                y, 
                CONFIG.CANVAS.TRACE_RADIUS, 
                0, 
                Math.PI * 2
            );
            frontCtx.fill();
        }
    }
}

export function drawFrontViewElectron(electronPosition, frontCtx, centerX, centerY, scale) {
    // posicion actual del electron
    const screenX = centerX + electronPosition.x * scale / CONFIG.MAX_DEFLECTION;
    const screenY = centerY - electronPosition.y * scale / CONFIG.MAX_DEFLECTION;
    
    frontCtx.fillStyle = `rgba(0, 255, 255, ${simulation.accelerationVoltage/5000})`;
    frontCtx.beginPath();
    frontCtx.arc(
        screenX, 
        screenY, 
        CONFIG.CANVAS.ELECTRON_RADIUS,
        0, 
        Math.PI * 2
    );
    frontCtx.fill();
}

export function drawLateralView(canvas, context, plateColor, position) {
    const width = canvas.width;
    const height = canvas.height;
    const scale = height / 2;
    const deflection = position * scale / CONFIG.MAX_DEFLECTION;
    
    // refresh
    context.clearRect(0, 0, width, height);
    
    context.strokeStyle = CONFIG.COLORS.ELECTRON_GUN;
    context.lineWidth = CONFIG.CANVAS.LINE_WIDTH;
    context.beginPath();
    context.rect(20, height/2 - 10, 40, 20);
    context.stroke();
    
    // placas conductoras
    const platesX = 150;
    context.fillStyle = plateColor;
    context.fillRect(platesX, height/2 - 40, 30, 30);
    context.fillRect(platesX, height/2 + 10, 30, 30);
    
    // linea central
    context.strokeStyle = CONFIG.COLORS.CENTER_LINE;
    context.setLineDash(CONFIG.CANVAS.DASH_PATTERN);
    context.beginPath();
    context.moveTo(0, height/2);
    context.lineTo(width, height/2);
    context.stroke();
    context.setLineDash([]);
    
    // pantalla
    context.strokeStyle = CONFIG.COLORS.SCREEN;
    context.beginPath();
    context.moveTo(width - 50, 20);
    context.lineTo(width - 50, height - 20);
    context.stroke();
    
    // curva hacia las placas
    context.strokeStyle = CONFIG.COLORS.ELECTRON_BEAM;
    context.lineWidth = CONFIG.CANVAS.LINE_WIDTH;
    const curveStartX = 100;

    context.beginPath();
    context.moveTo(60, height/2);
    context.quadraticCurveTo(
        curveStartX, height/2,
        platesX + 15, height/2
    );
    
    // curva despues de las placas
    context.quadraticCurveTo(
        platesX + 50, height/2,
        width - 50, height/2 - deflection
    );
    
    context.stroke();
    
    // particula
    context.fillStyle = CONFIG.COLORS.ELECTRON_DOT;
    context.beginPath();
    context.arc(
        width - 50, 
        height/2 - deflection, 
        CONFIG.CANVAS.ELECTRON_RADIUS, 
        0, 
        Math.PI * 2
    );
    context.fill();
}
