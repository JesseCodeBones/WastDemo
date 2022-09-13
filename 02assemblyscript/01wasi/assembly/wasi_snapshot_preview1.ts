export declare function fd_write(
    fd: u32,
    iov_array_ptr: usize,
    iov_array_length: u32,
    nwritten: usize,
): i32;

export declare function path_open(
    dirfd: u32,
    dirflags: u32,
    path_ptr: usize,
    path_len: u32,
    o_flags: u32,
    fs_rights_base: u64,
    fs_rights_inheriting: u64,
    fs_flags: u32,
    fd: u32
): i32;

export declare function fd_close(fd: u32): i32;
