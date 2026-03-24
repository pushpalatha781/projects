import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.openSignup = function(){
document.getElementById("signupModal").style.display="block"
}

window.closeSignup = function(){
document.getElementById("signupModal").style.display="none"
}

window.openLogin = function(){
document.getElementById("loginModal").style.display="block"
}

window.closeLogin = function(){
document.getElementById("loginModal").style.display="none"
}

document.getElementById("resumeForm").addEventListener("submit", async function(e){

e.preventDefault()

let file = document.getElementById("resumeFile").files[0]

if(!file){
alert("Please upload a resume first")
return
}

let formData = new FormData()
formData.append("resume", file)

try{

let response = await fetch("https://careerconnect-backend-nriz.onrender.com/upload_resume",{
method:"POST",
body:formData
})

// check if backend returned error
if(!response.ok){
throw new Error("Server returned error: " + response.status)
}

let data = await response.json()

console.log("Backend response:", data)

if(data.length === 0){
document.getElementById("jobResults").innerHTML =
"<p>No matching jobs found.</p>"
return
}

let output=""
data.forEach((job,index)=>{

output+=`
<div class="job-card">

<h3>${job.title}</h3>

<p><b>Company:</b> ${job.company_name}</p>

<p><b>Location:</b> ${job.location}</p>

<p><b>Suitability:</b> ${job.suitability_level}</p>

<button class="apply-btn" onclick="toggleDetails(${index})">
View Details
</button>

<div class="job-details" id="details-${index}" style="display:none">

<p><b>Missing Skills:</b></p>

<ul>
${job.missing_skills.map(skill =>
`<li onclick="showCourses('${skill}')" style="cursor:pointer;color:blue">
${skill}
</li>`).join("")}
</ul>

<p><b>Missing Skills %:</b> ${job.missing_percent}%</p>

</div>

</div>
`
})

document.getElementById("jobResults").innerHTML=output

}catch(error){

console.error("Connection error:", error)

alert("Error connecting to server")

}

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
window.toggleDetails=function(index){

let section=document.getElementById(`details-${index}`)

if(section.style.display==="none"){
section.style.display="block"
}else{
section.style.display="none"
}

}
// ================= COURSE DATA =================
const courseLinks = {

"python": {
free:[
"https://freecodecamp.org",
"https://w3schools.com/python/",
"https://docs.python.org",
"https://kaggle.com/learn",
"https://realpython.com"
],
paid:[
"https://udemy.com",
"https://coursera.org",
"https://edx.org",
"https://pluralsight.com",
"https://linkedin.com/learning"
]
},

"sql": {
free:[
"https://w3schools.com/sql/",
"https://sqltutorial.org/",
"https://freecodecamp.org",
"https://mode.com/sql-tutorial/",
"https://codecademy.com"
],
paid:[
"https://udemy.com",
"https://coursera.org",
"https://pluralsight.com",
"https://udacity.com",
"https://linkedin.com/learning"
]
},

"machine learning": {
free:[
"https://developers.google.com/machine-learning",
"https://kaggle.com/learn",
"https://fast.ai/",
"https://edx.org",
"https://coursera.org"
],
paid:[
"https://udemy.com",
"https://coursera.org",
"https://udacity.com",
"https://pluralsight.com",
"https://linkedin.com/learning"
]
},

"excel": {
free:[
"https://excel-easy.com",
"https://support.microsoft.com/excel",
"https://youtube.com",
"https://freecodecamp.org",
"https://goskills.com"
],
paid:[
"https://udemy.com",
"https://coursera.org",
"https://pluralsight.com",
"https://udacity.com",
"https://linkedin.com/learning"
]
}

};function showCourses(skill){

let data = courseLinks[skill.toLowerCase()]

if(!data){
alert("No courses found")
return
}

let container = document.getElementById("jobResults")

container.innerHTML = `
<div class="job-card" style="min-width:400px">

<h3>${skill.toUpperCase()} Courses</h3>

<p><b>Free Courses:</b></p>
${data.free.map(link=>`<a href="${link}" target="_blank">${link}</a>`).join("")}

<p><b>Paid Courses:</b></p>
${data.paid.map(link=>`<a href="${link}" target="_blank">${link}</a>`).join("")}

<br>
<button onclick="location.reload()">⬅ Back</button>

</div>
`
}
