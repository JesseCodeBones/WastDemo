let wasmPath = "";
for (let arg in process.argv) {
    if (process.argv[arg].startsWith("path")) {
        wasmPath = process.argv[arg].split("=")[1];
    }
}
const fs = require('fs');
const wasmBuffer = fs.readFileSync(wasmPath);
const imports = {};
imports.env = imports.env || {};
var memory = new WebAssembly.Memory({initial:1});
Object.assign(imports.env, {
    print: function (msg) {
        console.log(msg);
    },
    memory: memory,
    consoleLogString(offset, length) {
        var bytes = new Uint8Array(memory.buffer, offset, length);
        var string = new TextDecoder('utf8').decode(bytes);
        console.log(string);
    }
});

WebAssembly.instantiate(wasmBuffer, imports).then(wasmModule => {
    const { main } = wasmModule.instance.exports;
    main(1);
});