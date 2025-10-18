const std = @import("std");

const msg: []const u8 = "wasm_counter";
var count: i32 = 0;

export fn increment() void {
    count += 1;
}

export fn get() i32 {
    return count;
}

export fn getPointer() *i32 {
    return &count;
}

export fn dummyFunc() *const []const u8 {
    return &msg;
}
