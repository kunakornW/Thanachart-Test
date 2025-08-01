interface iUtil {
    numberWithCommas: Function
}

const util = {} as iUtil;

util.numberWithCommas = (x : any) => {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

export default util;