const fs = require('fs');

const wasmBuffer = fs.readFileSync('build/debug.wasm');
let wasmExample;
const imports = {
  "env": {
    memory: sharedMemory,
    abort(_msg, _file, line, column) {
      console.error("abort called at index.ts:" + line + ":" + column);
    },
    seed: function() {
      return 0xA5534817; // make tests deterministic
    },
    log(ptr) { console.log(getString(ptr)); },
    logi(i) { console.log(i); },
    "Date.now": function(){
      return new Date().getTime();
    },
    trace(...args) { console.log("trace", args); }
  }
};
function getString(ptr) {
  if (!ptr) return "null";
  var U32 = new Uint32Array(sharedMemory.buffer);
  var U16 = new Uint16Array(sharedMemory.buffer);
  var length = U32[(ptr - 4) >>> 2] >>> 1;
  var offset = ptr >>> 1;
  return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
}

var sharedMemory = new WebAssembly.Memory({ initial: 1 });

WebAssembly.instantiate(wasmBuffer, imports).then(wasmModule => {
  wasmExample = wasmModule;
  const { memory , main} = wasmModule.instance.exports;
  sharedMemory = memory;
  main();
  console.log("finished");
});

