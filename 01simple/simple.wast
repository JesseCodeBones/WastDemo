(module
(import "env" "print" (func $~lib/log (param i32)))
    (func $plusfourtytwo (param $p1 i32) (result i32)
        i32.const 42
        local.get $p1
        i32.add
    )
    (func $main (param $lhs i32) (param $rhs i32) (result i32)
        local.get $lhs
        call $plusfourtytwo
        local.get $rhs
        i32.add
        i32.const 42
        call $~lib/log
    )
    (export "main" (func $main))
)