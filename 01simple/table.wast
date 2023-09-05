(module
    (table $table1 2 funcref)
    (func $f1 (result i32)
    i32.const 42)
    (func $f2 (result i32)
    i32.const 13)
    (type $none_=>_i32 (func (result i32)))
    (elem (i32.const 0) $f1 $f2)
    (func (export "main") (param $i i32) (result i32)
        (table.set $table1
            (i32.const 1)
            (ref.func $f1)
        )
        local.get $i
        call_indirect $table1 (type $none_=>_i32)
    )
)