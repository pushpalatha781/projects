window.login = function(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

let user=userCredential.user

document.getElementById("loginBtn").style.display="none"

document.getElementById("userDisplay").innerText=user.displayName

closeLogin()

})

.catch(err=>{
alert(err.message)
})

}
