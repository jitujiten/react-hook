
var btn=document.getElementById("submit");


btn.addEventListener("click",display)

 function display(e){
   

var email=document.getElementById("email").value;
var name=document.getElementById("name").value


var obj={
    email,
    name 
}
var objtostr=JSON.stringify(obj);
localStorage.setItem(obj.email,objtostr)
}





  
for(var i=0;i<localStorage.length;i++){

    var keys=localStorage.key(i);
    var data=localStorage.getItem(keys);
    
    var lemmail=JSON.parse(data).email;
    var lname=JSON.parse(data).name;

    
    var li=`<li id="${lemmail}">${lname}--${lemmail}<button onClick="deleting('${lemmail}')">delete</button><button onClick="editing('${lemmail}')">edit</button></li>`
    
    var target=document.getElementById("ul");
    
    target.innerHTML=target.innerHTML+li;
    
     }
    
    

    
 