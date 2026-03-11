function openSignup(){
document.getElementById("signupModal").style.display="block"
}

function closeSignup(){
document.getElementById("signupModal").style.display="none"
}
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
window.signup = function(){

let username=document.getElementById("newUsername").value
let email=document.getElementById("newEmail").value
let password=document.getElementById("newPassword").value

createUserWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

let user=userCredential.user

updateProfile(user,{
displayName:username
})

alert("Account created")

closeSignup()

})

.catch(err=>{
alert(err.message)
})

}
