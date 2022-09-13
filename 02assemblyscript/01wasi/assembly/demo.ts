import { fd_write, path_open, fd_close } from "./wasi_snapshot_preview1"
import { logString } from "./env"
var content = "hello world\n"; // the content which will be written in the target test file.
var contentUtf8 = String.UTF8.encode(content);
class Iov {
    iov_base: usize = 0;
    iov_length: i32 = 0;
}

export function _start(): void {
    // print to console
    var iovInstance = new Iov();
    iovInstance.iov_base = changetype<usize>(contentUtf8);
    iovInstance.iov_length = contentUtf8.byteLength;
    let str: string = "";
    let rcstr = "";
    let rc = fd_write(1, changetype<usize>(iovInstance), 1, changetype<usize>(str));
    //log rc
    rcstr += "console write rc = " + rc.toString();
    logString(changetype<usize>(rcstr), rcstr.length);

    //open path
    let pathstr = "./test.txt";
    var path = String.UTF8.encode(pathstr);
    let fdPtr = __alloc(sizeof<i32>()); // alloc a position for fd.
    rc = path_open(3, // sandbox fd is 3 in UVWASI
        3,
        changetype<usize>(path),
        path.byteLength,
        1 | 8,
        1024 | 64 | 32 | 4, // needed permission options
        1024 | 64 | 32 | 4,
        16,
        fdPtr);
    rcstr = "new FD is:" + i32.load(fdPtr).toString() + ", with ptr=" + fdPtr.toString();
    logString(changetype<usize>(rcstr), rcstr.length);
    rcstr = "path_open return code is:" + rc.toString();
    logString(changetype<usize>(rcstr), rcstr.length);

    let writeSize = __alloc(sizeof<i32>());
    rc = fd_write(i32.load(fdPtr),
        changetype<usize>(iovInstance),
        1,
        changetype<usize>(writeSize));
    rcstr = "fd_write return code is:" + rc.toString();
    logString(changetype<usize>(rcstr), rcstr.length);
    // close fd and clean memory after execution
    rc = fd_close(i32.load(fdPtr));
    rcstr = "fd_close return code is:" + rc.toString();
    logString(changetype<usize>(rcstr), rcstr.length);
    __free(fdPtr);
}
