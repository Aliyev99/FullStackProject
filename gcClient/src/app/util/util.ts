export function GetProductType(){
    const type = window.location.pathname.split('/')[2];
    const firstLetter = type.charAt(0);
    return type.replace(firstLetter, firstLetter.toUpperCase());
}

export function AddComma(index: number, length: number){
    if (index < length - 1) return ', ';
}

export function GetPath(){
    let path = window.location.pathname.split('/')[2];
    path = path.substring(0, path.length - 1)
    return path.replace(path.charAt(0), path.charAt(0).toUpperCase());
}