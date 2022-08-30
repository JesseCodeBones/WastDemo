(module
  (import "env" "print" (func $~lib/log (param i32)))
  (import "env" "printString" (func $~lib/logstr(param i32)))
  (import "env" "memory" (memory 1))
  (data (i32.const 0) "not equal zero\00")
  (data (i32.const 15) "equal zero\00")

  (func (export "main")(param $rhs i32) (result i32)
    i32.const 1
    local.get $rhs
    i32.eqz
    if
        i32.const 15
        call $~lib/logstr
    else 
        i32.const 0
        call $~lib/logstr
    end
  )
)