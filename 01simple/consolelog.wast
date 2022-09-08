(module
  (import "env" "print" (func $~lib/log (param i32)))
  (import "env" "consoleLogString" (func $~lib/logstr(param i32 i32)))
  (import "env" "memory" (memory 1))
  (data (i32.const 0) "ÀÀ")
  (func (export "main")
    i32.const 0
    i32.const 4
    call $~lib/logstr))
