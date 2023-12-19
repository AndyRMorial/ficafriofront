export const mapOrdem = (array, ordem, key) => {
    array.sort((a, b) => ordem.indexOf(a[key]) - ordem.indexOf(b[key]));
    return array;

}