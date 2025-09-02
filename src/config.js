import { simulation } from './sim.js';
import {
    accelerationSlider,
    verticalSlider,
    horizontalSlider,
    persistenceSlider,
    frequencySlider,
    frequencyXSlider,
    phaseSlider,
    accelerationValue,
    verticalValue,
    horizontalValue,
    persistenceValue,
    frequencyValue,
    frequencyXValue,
    phaseValue,
    manualModeBtn,
    sinusoidalModeBtn,
    sinusoidalControls
} from './elements.js';

export const CONFIG = {
    MAX_DEFLECTION: 0.15,
    TIME_STEP: 0.002,
    COLORS: {
        ELECTRON_GUN: '#ffcc00',
        ELECTRON_BEAM: '#00ffbb',
        ELECTRON_DOT: '#00ffbb',
        SCREEN: '#ffcc00',
        CENTER_LINE: 'rgba(255, 255, 255, 0.3)',
        VERTICAL_PLATES: 'rgba(100, 200, 255, 0.3)',
        HORIZONTAL_PLATES: 'rgba(255, 100, 100, 0.3)',
        TRACE: 'rgba(0, 255, 150, 1)',
    },
    CANVAS: {
        LINE_WIDTH: 2,
        ELECTRON_RADIUS: 5,
        TRACE_RADIUS: 3,
        GLOW_RADIUS: 2,
        DASH_PATTERN: [5, 5]
    },
    UI: {
        SINUSOIDAL_AMPLITUDE: 80
    }
};

function updateMode(mode) {
    if (mode === 'manual') {
        sinusoidalControls.style.opacity = '0.5';
        manualModeBtn.style.background = '#0874fc';
        sinusoidalModeBtn.style.background = '#08438bff';
    } else {
        sinusoidalControls.style.opacity = '1';
        manualModeBtn.style.background = '#08438bff';
        sinusoidalModeBtn.style.background = '#0874fc';
    }
}

// configuración de controles
export function controlsConfig() {
    accelerationSlider.addEventListener('input', function() {
        simulation.accelerationVoltage = parseInt(this.value);
        accelerationValue.textContent = this.value;
    });
    
    verticalSlider.addEventListener('input', function() {
        simulation.verticalVoltage = parseInt(this.value);
        verticalValue.textContent = this.value;
    });
    
    horizontalSlider.addEventListener('input', function() {
        simulation.horizontalVoltage = parseInt(this.value);
        horizontalValue.textContent = this.value;
    });
    
    persistenceSlider.addEventListener('input', function() {
        simulation.persistence = parseInt(this.value);
        persistenceValue.textContent = this.value;
    });
    
    frequencySlider.addEventListener('input', function() {
        simulation.frequencyy = parseFloat(this.value);
        frequencyValue.textContent = this.value;
    });

    frequencyXSlider.addEventListener('input', function() {
        simulation.frequencyx = parseFloat(this.value);
        frequencyXValue.textContent = this.value;
    });
    
    phaseSlider.addEventListener('input', function() {
        simulation.phase = parseFloat(this.value);
        phaseValue.textContent = this.value;
    });

    manualModeBtn.addEventListener('click', function() {
        simulation.mode = 'manual';
        updateMode('manual');
    });

    sinusoidalModeBtn.addEventListener('click', function() {
        simulation.mode = 'sinusoidal';
        updateMode('sinusoidal');
    });
}

// inicializar modo con 'manual'
export function modeConfig() {
    updateMode('manual');
}

