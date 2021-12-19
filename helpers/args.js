


const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;
    rest.forEach((t, i, array) => {
        if (t.charAt(0) === '-') {
            if (i === array.length - 1) {
                res[t.substring(1)] = true
            } else if (array[i + 1].charAt(0) !== '-') {
                res[t.substring(1)] = array[i + 1]
            } else {
                res[t.substring(1)] = true
            }
        }
    })
 return res

}

export {getArgs}


