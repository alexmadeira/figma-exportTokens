const fillStyles = figma.getLocalPaintStyles();

console.clear()

const exportJson  = {} as IExportJson 


fillStyles.forEach(element => {
    const paints = element.paints;
    const fullName = element.name;

        if(paints[0].type === 'SOLID'){
            const rgba = {
                r:paints[0].color.r,
                g:paints[0].color.g,
                b:paints[0].color.b,
                a:paints[0].opacity
            }
            
            const hex = rgbToHex(rgba);
            const rgb = formatRGB(rgba);
            const colorStyles = {hex,rgb }

            formatJSON({fullName, colorStyles})
        }

    });
    
    function formatJSON ({fullName,colorStyles}:IFormatJSONProps){

        const nameSplited = fullName.split('/')

        if(exportJson[nameSplited[0]]){
            exportJson[nameSplited[0]] = { 
                ...exportJson[nameSplited[0]], 
                [nameSplited[1]]:colorStyles
            }
        } else {
            exportJson[nameSplited[0]] = {
                [nameSplited[1]]:colorStyles
            }
        }

        return
    }
    
    function formatRGB({r, g, b, a}:IRGBAProps):string {
        
        const red = Math.round(r * 255);
        const green = Math.round(g * 255);
        const blue = Math.round(b * 255);
        const alpha = a ? a.toFixed(2) : 1
        
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }
    
    function componentToHex(c:number) {
        var hex = Math.round(c*255).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex({r, g, b, a}:IRGBAProps):string {
        let hexa = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        if(a && a < 1){
            hexa = hexa + componentToHex(a)
        }
        return hexa 
    }
    
    console.log(JSON.stringify(exportJson))
    
    
    figma.notify("paginas criadas")
    figma.closePlugin();
