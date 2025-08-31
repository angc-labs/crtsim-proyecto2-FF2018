import { 
    controlsConfig,
    modeConfig
 } from './config.js';
import { show } from './animation.js';

function init() {
    try {
        // configurar eventos
        controlsConfig();
        modeConfig();
        
        // animación
        show();
    } catch (error) {}
}

init();
