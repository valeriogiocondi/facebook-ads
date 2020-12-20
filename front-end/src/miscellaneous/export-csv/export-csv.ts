let exportCsv = (filename: string, payload: any) => {
    
    var a = document.createElement("a");
    a.href = payload;
    a.download = filename;
    a.click();
}

export default exportCsv;