(module
  (type (;0;) (func))
  (type (;1;) (func (result i32)))
  (func (;0;) (type 0)
    i32.const 0
    i32.const 0
    i32.load offset=1048600
    i32.const 1
    i32.add
    i32.store offset=1048600)
  (func (;1;) (type 1) (result i32)
    i32.const 0
    i32.load offset=1048600)
  (func (;2;) (type 1) (result i32)
    i32.const 1048600)
  (func (;3;) (type 1) (result i32)
    i32.const 1048576)
  (memory (;0;) 17)
  (global (;0;) (mut i32) (i32.const 1048576))
  (export "memory" (memory 0))
  (export "increment" (func 0))
  (export "get" (func 1))
  (export "getPointer" (func 2))
  (export "testfunc" (func 3))
  (data (;0;) (i32.const 1048576) "\08\00\10\00\0c\00\00\00wasm_counter\00"))
