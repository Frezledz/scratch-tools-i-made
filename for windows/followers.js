function getfollower(){
    const getuser=document.getElementsByClassName("box-head")[0];
    const username=getuser.getElementsByTagName("a")[1];
    const urname=username.innerText;
    username.style.display="none";
    const data=getuser.innerText;
    const followercount=data.replace(/[^0-9]/g, '');
    username.removeAttribute("style");
    console.log(urname);
    console.log(followercount);



    let texts=[];
    function getusername(parseit){
        let string="";
        for(let i=0;i<parseit.length;i++){
            string=string+parseit[i].username+"\r\n";
        }
        return string;
    }


    for(let i=0;i<Math.ceil(followercount/40);i++){
        let request = new XMLHttpRequest();
        request.open('GET', "https://api.scratch.mit.edu/users/"+urname+"/followers/?offset="+i+"&limit=40", true);
        request.onload = function () {
            let data=this.response;
            let parseit=JSON.parse(data);
            texts.push(getusername(parseit));
        }
        request.send();
        
        
    }
    let frame=setInterval(countUp, 1000);
    function countUp(){
        if(texts.length===Math.ceil(followercount/40)){
            let text="";
            for(let i=0;i<texts.length;i++){
                text=text+texts[i];
            }
            
            const link=new Blob([text],{type:"text/plain"});
            const url = URL.createObjectURL(link);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.download = urname+"'s followers.txt";
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            clearInterval(frame);
        }else{
            console.log("loading...")
        }
    }
    

};
getfollower();