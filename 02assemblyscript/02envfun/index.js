import { instantiateSync } from "@assemblyscript/loader";
import fs from "fs";

const { instance: { exports } } = instantiateSync(fs.readFileSync("./build/debug.wasm"), {
    env: {
        log(ptr) { console.log(getString(ptr)); },
        logi(i) { console.log(i); },
        trace(...args) { console.log("trace", args); }
    }
});

function getString(ptr) {
    if (!ptr) return "null";
    var U32 = new Uint32Array(exports.memory.buffer);
    var U16 = new Uint16Array(exports.memory.buffer);
    var length = U32[(ptr - 4) >>> 2] >>> 1;
    var offset = ptr >>> 1;
    return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
}
const main = exports["main"];
main();