(module
  (import "env" "print" (func $~lib/log (param i32)))
  (import "env" "consoleLogString" (func $~lib/logstr(param i32 i32)))
  (import "env" "memory" (memory 1))
  (data (i32.const 0) "not equal zero")
  (data (i32.const 14) "equal zero")

  (func (export "main")(param $rhs i32) (result i32)
    i32.const 1
    local.get $rhs
    i32.eqz
    if
        i32.const 14
        i32.const 10
        call $~lib/logstr
    else 
        i32.const 0
        i32.const 14
        call $~lib/logstr
    end
  )
)