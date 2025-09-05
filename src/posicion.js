import { CONFIG } from './config.js';
import { simulation } from './sim.js';

// posicion actual del electron en pantalla
export function calculateElectronPosition() {
    // manual
    let verticalVoltage = simulation.verticalVoltage;
    let horizontalVoltage = simulation.horizontalVoltage;
    
    // sinusoidal Asin(wt + o)
    if (simulation.mode === 'sinusoidal') {
        const t = simulation.time;
        const wy = 2 * Math.PI * simulation.frequencyy;
        const wx = 2 * Math.PI * simulation.frequencyx;
        const o = simulation.phase;
        if (simulation.frequencyx === simulation.frequencyy) {
            verticalVoltage = CONFIG.UI.SINUSOIDAL_AMPLITUDE * Math.sin(wy * t);
            horizontalVoltage = CONFIG.UI.SINUSOIDAL_AMPLITUDE * Math.sin(wx * t + o);
        } else {
            verticalVoltage = CONFIG.UI.SINUSOIDAL_AMPLITUDE * Math.sin(wy * t + o);
            horizontalVoltage = CONFIG.UI.SINUSOIDAL_AMPLITUDE * Math.sin(wx * t + o);
        }
    }
    
    // calculo de posicion
    const x = (horizontalVoltage / 100) * CONFIG.MAX_DEFLECTION;
    const y = (verticalVoltage / 100) * CONFIG.MAX_DEFLECTION;
    
    return { x, y };
}