(module 
    (import "js" "mem" (memory 16))
    (func $setAllPixels
        (local $addr i32)
        i32.const 0
        set_local $addr
        loop
            get_local $addr
            i32.const 0xff880088
            i32.store

            get_local $addr
            i32.const 4
            i32.add
            set_local $addr
            
            get_local $addr
            i32.const 0x100000
            i32.lt_u
            br_if 0
        end)
    (func $pset (param $x i32) (param $y i32) (param $color i32)
        (local $addr i32)
        get_local $x
        i32.const 4
        i32.mul
        get_local $y
        i32.const 0x1000
        i32.mul
        i32.add
        set_local $addr
        get_local $addr
        get_local $color
        i32.store
    )
    (export "pset" (func $pset))

    (export "run" (func $setAllPixels))
)

