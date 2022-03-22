
const isColorTooLight = (color) => {
    // params -> color: string
    // Determine that the given color is too light or not
    // returns -> boolean
    let rgb = parseInt(color.substring(1), 16);
    let r = (rgb >> 16) & 0xff;  // red
    let g = (rgb >> 8) & 0xff;  // green
    let b = (rgb >> 0) & 0xff;  // blue

    let final = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return (final > 200) ? true : false
}

export default isColorTooLight;