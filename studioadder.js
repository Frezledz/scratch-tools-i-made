const addtostudio =  async(studioid,projectid,Method)=>{
    const token = (await(await fetch("/session",{headers:{"x-requested-with": "XMLHttpRequest"}})).json()).user.token;
    const add =  await fetch(`https://api.scratch.mit.edu/studios/${studioid}/project/${projectid}`,{headers:{"x-token":token,"x-requested-with": "XMLHttpRequest"},method:Method});
    if(add.status === 200){
        console.log(`プロジェクト${projectid}をスタジオ${studioid}に追加した。`);
    } else {
        console.log(`プロジェクト${projectid}をスタジオ${studioid}に追加できなかった。`);
    }
}

const fun = function(){
    let newElement = document.createElement("input");
    newElement.setAttribute("type","file");
    newElement.style.display="none";
    document.body.appendChild(newElement);
    newElement.click();
    let reader = new FileReader();
    let data;
    const studio = (location.pathname).split("/")[2];
    newElement.addEventListener("change", ()=>{
        for(file of newElement.files){
            reader.readAsText(file, 'UTF-8');
            reader.onload = async()=> {
                data = reader.result;
                data= data.split(",");
                for(let i=0;i<data.length;i++){
                    await addtostudio(studio,data[i],"DELETE");
                }
            };
        }
    })
}
fun();