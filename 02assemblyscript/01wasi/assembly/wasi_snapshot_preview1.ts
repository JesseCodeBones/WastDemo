export declare function fd_write(
    fd: u32,
    iov_array_ptr: usize,
    iov_array_length: u32,
    nwritten: usize,
): u16;

export declare function path_open(
    dirfd: u32,
    dirflags: u32,
    path_ptr: usize,
    path_len: u32,
    o_flags: u16,
    fs_rights_base: u64,
    fs_rights_inheriting: u64,
    fs_flags: u16,
    fdPtr: usize
): u16;

export declare function fd_close(fd: u32): u16;
