
function inviteall(username,startat){
    let url="";
    startat=startat;
    let i=startat;
    {
        const url1=location.pathname;
        url=url1.split("/");
        url.splice(0,1);
    }

    let token="";
    {
        let cookie=document.cookie;
        cookie=cookie.split(';');
        let cok=[[],[]];
        cookie.forEach(function(element){
            const elements=element.split("=");
            cok[0].push(elements[0]);
            cok[1].push(elements[1]);
        });
        token=cok[1][cok[0].indexOf(' scratchcsrftoken')];
    }
    const invite = async (i) => {
        let res = await fetch( `/site-api/users/curators-in/`+url[1]+`/invite_curator/?usernames=`+username[i], { headers: { "x-csrftoken": token, "x-requested-with": "XMLHttpRequest", }, method: "PUT", credentials: "include", } );
        if (res.status === 200) {
            console.log(username[i]+"を招待したぞ("+i+"人目)、お礼ぐらい言えボケが");
          } else{
            console.log(username[i]+"を招待できなかったヨ！");
          }
    };
    const interval=setInterval(intervalscript,100);
    function intervalscript(){
        invite(i);
        i++;
        if(i>=username.length||i>startat+300){
            clearInterval(interval);
        }
    }

    
}
//↑招待するやつ
//↓テキストファイルからフォロワーを読み込んで招待する
function gettxt(){

    const textbox_element = document.getElementsByTagName("body")[0];
    let result=0;
    const input = document.createElement('input');
    input.type="file", input.name="inputFile", input.id="inputFile", input.accept="text/plain";
    input.style.display="none";
    
    textbox_element.appendChild(input);
    document.getElementById('inputFile').addEventListener('change', function() {
        const file = new FileReader();
        file.onload = () => {
          result = file.result;
          result=result.split("\r\n");
          console.log(result);
          let startat=prompt("何人目から始めますか？");
          if(startat===""){
              startat=0;
          }
          startat=parseInt(startat);
          inviteall(result,startat);
        }
        file.readAsText(this.files[0]);
        input.remove();
        return result;
        
    });
    input.click();
    
}

gettxt();