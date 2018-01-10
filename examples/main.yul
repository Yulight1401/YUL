# 123 #
let a <- -2
let b <- 1
let c <- '123'
fun M1 (d) {
    let a <- 0
    fun M2 (b) {
        fun m3 () {}
        a <- c
    }
}
while (a > -3) {
    a--
}
# (b > 1) ? {
a++
b--
} (a > 0) ? {
a + b
} #
