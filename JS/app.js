//FIB(I) = FIB(I-1) + FIB(I-2)

const fib = [0 , 1]

for (let i = 2; i < 100; i++){
    fib[i] = fib[i-1] + fib[i-2]
    console.log(fib[i])
}

