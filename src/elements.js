// canvas
export const frontCanvas = document.getElementById('vista-frontal')
export const sideCanvas = document.getElementById('vista-lateral')
export const topCanvas = document.getElementById('vista-superior')

export const frontCtx = frontCanvas.getContext('2d')
export const sideCtx = sideCanvas.getContext('2d')
export const topCtx = topCanvas.getContext('2d')

// controls
export const accelerationSlider = document.getElementById('voltaje-aceleracion')
export const verticalSlider = document.getElementById('voltaje-vertical')
export const horizontalSlider = document.getElementById('voltaje-horizontal')
export const persistenceSlider = document.getElementById('persistencia')
export const frequencySlider = document.getElementById('frequencyy')
export const frequencyXSlider = document.getElementById('frequencyx')
export const phaseSlider = document.getElementById('desfase')

// valores de sliders
export const accelerationValue = document.getElementById('valor-aceleracion')
export const verticalValue = document.getElementById('valor-vertical')
export const horizontalValue = document.getElementById('valor-horizontal')
export const persistenceValue = document.getElementById('valor-persistencia')
export const frequencyValue = document.getElementById('valor-frequencyy')
export const frequencyXValue = document.getElementById('valor-frequencyx')
export const phaseValue = document.getElementById('valor-desfase')

// modos
export const manualModeBtn = document.getElementById('manual-btn')
export const sinusoidalModeBtn = document.getElementById('sin-btn')
export const sinusoidalControls = document.getElementById('controles-sinusoidales')