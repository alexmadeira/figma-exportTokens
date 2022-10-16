interface IRGBAProps{
    r:number
    g:number
    b:number
    a?:number
}

interface IColorTypes {
    hex:string,
    rgb:string
}

interface IFormatJSONProps {
    fullName: string
    colorStyles: IColorTypes
}

interface IExportJson{
    [category: string]: {
        [name: string]:IColorTypes
    }
}