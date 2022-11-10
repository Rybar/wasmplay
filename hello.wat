(;
    Filename: hello.wat
    This is a block comment
;)
(module
    (func $add (param $p1 i32) (param $p2 i32) (result i32)
        ;; push parameter $p1 on the stack
        local.get $p1
        ;; push parameter $p2 on the stack
        local.get $p2
        ;;Pop the top two values from the stack, add them, and push the result back on the stack
        i32.add
        ;;The top of the stack is the return value
    )
    (export "add" (func $add))
)