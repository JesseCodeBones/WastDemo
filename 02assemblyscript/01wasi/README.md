# Simple Demo for Nodejs WASI with AssemblyScript

## Demo effect
WASM generated by ASC, will call the WASI from nodejs and write "hello world" to `workingDir/test.txt` file.

## Run command  
1. `npm install`  
2. `npm run runWasi`

## further information
1. ASC string default format is UTF16 which is using uint16 as basic char length.
2. this repo, I used `path_open`, `fd_write` API, for further APIs, please refer to 
[uvwasi head file](https://github.com/nodejs/uvwasi/blob/main/include/uvwasi.h). sometimes the API need variable it self, sometime it need the ptr, please read carefully about the API before implementation. 
3. Basic type of ASC like i32, will not have certain positon from LinearMemory, so we sometime need to `__alloc` one then we can get its position, donot foget `__free` it among its lifecycle.
