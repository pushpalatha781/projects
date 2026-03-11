import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function openSignup(){
document.getElementById("signupModal").style.display="block"
}

function closeSignup(){
document.getElementById("signupModal").style.display="none"
}
function openLogin(){
document.getElementById("loginModal").style.display="block"
}

function closeLogin(){
document.getElementById("loginModal").style.display="none"
}

document.getElementById("resumeForm").addEventListener("submit", async function(e){

e.preventDefault()

let file = document.getElementById("resumeFile").files[0]

let formData = new FormData()

formData.append("resume", file)

let response = await fetch("http://127.0.0.1:5000/upload_resume", {
method: "POST",
body: formData
})

let data = await response.json()

let output=""

data.forEach(job=>{

output+=`
<div style="border:1px solid #ccc;padding:15px;margin:10px">
<h3>${job.title}</h3>
<p><b>Company:</b> ${job.company_name}</p>
<p><b>Location:</b> ${job.location}</p>
<p><b>Suitability Score:</b> ${job.suitability_score}%</p>
</div>
`

})

document.getElementById("jobResults").innerHTML=output

})


const firebaseConfig = {
apiKey: "AIzaSyDQzZMUgdTjKF-sHBxG_lyYi9nUdITgqno",
authDomain: "careerconnect-2b1cd.firebaseapp.com",
projectId: "careerconnect-2b1cd",
storageBucket: "careerconnect-2b1cd.firebasestorage.app",
messagingSenderId: "368413879452",
appId: "1:368413879452:web:0cf4d492dc318bbb1e5159"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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

})

.catch(err=>{
alert(err.message)
})

}


window.login = function(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

let user=userCredential.user

document.getElementById("loginBtn").style.display="none"
document.getElementById("userDisplay").innerText=user.displayName

})

.catch(err=>{
alert(err.message)
})

}
