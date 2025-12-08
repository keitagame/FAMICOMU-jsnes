// nes-audio-worklet.js
class NESProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferL = [];
    this.bufferR = [];

    this.port.onmessage = (event) => {
      const { left, right } = event.data;
      this.bufferL.push(left);
      this.bufferR.push(right);
    };
  }

  process(inputs, outputs) {
    const output = outputs[0];
    const left = output[0];
    const right = output[1];

    for (let i = 0; i < left.length; i++) {
      left[i] = this.bufferL.length ? this.bufferL.shift() : 0;
      right[i] = this.bufferR.length ? this.bufferR.shift() : 0;
    }
    return true;
  }
}

registerProcessor('nes-processor', NESProcessor);
