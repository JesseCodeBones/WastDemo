let fs = require("fs");
const { exec } = require("child_process");
const { resolve } = require("path");
var path = require("path");
function parseArg(args) {
    // parse arguments to json object with simple way
    let argStr = "{";
    for (let arg of args) {
        arg += "\"";
        arg = "\"" + arg;
        arg = arg.replace("=", "\":\"");
        argStr += arg;
    }
    argStr += "}";
    return JSON.parse(argStr);
}

let config = parseArg(process.argv.slice(2));

async function clear() {
    if (fs.existsSync("target")) {
        return new Promise(resolve => {
            fs.rm("target", { recursive: true, force: true }, (err)=>{
                resolve("finished");
            });
        });
    } else {
        return;
    }

}

function prepare() {
    if (!fs.existsSync("target")) {
        fs.promises.mkdir(__dirname + "/target", { recursive: true });
    }
}

async function compile(filePath) {
    let fileName = path.basename(filePath);
    let cmd = `wat2wasm ${filePath} -o target/${fileName}.wasm`;
    return new Promise(resolve=>{
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`compile - stdout: ${stdout}`);
            resolve("finished");
        });
    });
}

async function run(filePath){
    let fileName = path.basename(filePath);
    if(fs.existsSync(`target/${fileName}.wasm`)) {
        let cmd = `node run.cjs path=target/${fileName}.wasm`;
        return new Promise(resolve=>{
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                console.log(`run wasm - stdout: ${stdout}`);
                resolve("finished");
            });
        });
    } else {
        return;
    }
    
}

async function build(){
    await clear();
    prepare();
    await compile(config.fileName);
    await run(config.fileName);
}

build();