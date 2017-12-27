# 123 #
let a <- -2;
let b <- 1;
let c <- '123';
let M1 <- fun (let d) {
    let a <- 0
    let M2 <- fun (b) {
        let m3 <- fun () {}
        a <- c
    }
};
# (b > 1) ? {
a++;
b--;
} (a > 0) ? {
a + b;
}; #
