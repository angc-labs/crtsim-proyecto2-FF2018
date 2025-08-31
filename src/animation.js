import { CONFIG } from './config.js';
import { simulation } from './sim.js';
import { calculateElectronPosition } from './posicion.js';
import { 
    drawFrontView, 
    drawFrontViewTraces, 
    drawFrontViewElectron, 
    drawLateralView 
} from './draw.js';
import {
    sideCanvas,
    sideCtx,
    topCanvas,
    topCtx
} from './elements.js';

// limpiar trazas pasadas
export function cleanOldTraces() {
    // actual - creacion > persistencia = BORRAR 
    const now = Date.now();
    simulation.traces = simulation.traces.filter(trace => {
        const age = (now - trace.time) / 1000;
        return age < simulation.persistence;
    });
}

function animate() {
    // update time
    simulation.time += CONFIG.TIME_STEP;
    simulation.electronPosition = calculateElectronPosition();
    
    // puntos anteriores
    simulation.traces.push({
        x: simulation.electronPosition.x,
        y: simulation.electronPosition.y,
        time: Date.now()
    });
    cleanOldTraces();
    
    // posición actual
    const pos = simulation.electronPosition;
    
    // vista frontal
    const frontViewData = drawFrontView();
    drawFrontViewTraces(
        simulation, 
        frontViewData.frontCtx, 
        frontViewData.centerX, 
        frontViewData.centerY, 
        frontViewData.scale
    );
    drawFrontViewElectron(
        pos, 
        frontViewData.frontCtx, 
        frontViewData.centerX, 
        frontViewData.centerY, 
        frontViewData.scale
    );
    
    // vista vertical
    drawLateralView(
        sideCanvas, 
        sideCtx, 
        CONFIG.COLORS.VERTICAL_PLATES, 
        pos.y
    );
    
    // vista horizontal 
    drawLateralView(
        topCanvas, 
        topCtx, 
        CONFIG.COLORS.HORIZONTAL_PLATES, 
        pos.x
    );
    
    // siguiente frame
    requestAnimationFrame(animate);
}

export function show() {
    animate();
}