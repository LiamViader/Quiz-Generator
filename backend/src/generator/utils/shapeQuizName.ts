export function shapeQuizName(name:string):string{ // treu espais de principi i final, converteix a majuscules el primer caracter i si es un string buit, li posa de nom untitled
    if (name.trim() !== '' && /^[a-z]/.test(name.trim())) {
        return name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
    } else if (name.trim() === '') {
        return "Untitled";
    }
}