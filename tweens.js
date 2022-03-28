// Contoh penggunaan tween secara umu m

const widthTween = (t) => {

    let i = d3.interpolate(0, x.bandwidth);

    return function(x) {
        return i(x)
    }
}