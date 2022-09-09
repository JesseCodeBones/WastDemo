import { WASI } from 'wasi';
import { readFile } from 'node:fs/promises';

const wasi = new WASI({
    args: process.argv,
    env: process.env,
    preopens: {
        '/sandbox': './workingDir',
    },
});
var sharedMemory = new WebAssembly.Memory({ initial: 1 });

const wasm = await WebAssembly.compile(
    await readFile(new URL('./build/debug.wasm', import.meta.url))
);

let wasiInstance;

WebAssembly.instantiate(wasm, {
    wasi_snapshot_preview1: wasi.wasiImport,
    "env": {
        memory: sharedMemory,
        abort(_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        },
        logString(ptr, l) {
            let buffer = Buffer.from(sharedMemory.buffer, ptr, l * 2);
            let val = buffer.toString('utf16le');
            console.log(val);
        }
    }
}).then(instance => {
    const { memory} = instance.exports;
    sharedMemory = memory;
    wasiInstance = instance;
    wasi.start(wasiInstance);
  });


