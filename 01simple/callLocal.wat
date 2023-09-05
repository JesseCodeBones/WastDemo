(module
  (func $add (param $a i32) (param $b i32) (result i32)
    (return
      (i32.add
        (local.get $a)
        (local.get $b)
      )
    )
  )
  (func $sub (param $a i32) (param $b i32) (result i32)
    (return
      (i32.sub
        (local.get $a)
        (local.get $b)
      )
    )
  )
  (func $_start (export "_start")
    (drop
      (call $add
        (i32.const 1)
        (i32.const 2)
      )
    )
    (drop
      (call $add
        (i32.const 3)
        (i32.const 4)
      )
    )
    (drop
      (call $sub
        (i32.const 6)
        (i32.const 5)
      )
    )
  )
)