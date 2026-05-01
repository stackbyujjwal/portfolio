 // Toast dikhane ka custom function
      function showToast(message, type) {
        var toast = document.getElementById("toast");
        toast.innerText = message;
        toast.className = "toast show " + type;
        
        // 3 second baad toast hide ho jayega
        setTimeout(function() { 
          toast.className = toast.className.replace("show", ""); 
        }, 3000); 
      }

      function sendMail(event) {
        event.preventDefault(); 
  
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;
        
        // Button ko pakadna zaroori hai disable karne ke liye
        var submitBtn = document.querySelector('.contact__btn');
        
        // Basic validation
        if(!name || !email || !message) {
            showToast("Please fill out all the fields before sending.", "error");
            return;
        }
  
        // 🔴 BUTTON DISABLE AUR SENDING STATE
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "not-allowed";
        submitBtn.innerText = "Sending... ⏳";
        showToast("Sending message, please wait...", "info");

        var templateParams = {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message
        };
  
        emailjs.send('service_cjctc72', 'template_iumc6ws', templateParams, 'gDkk615toB2G853H4')
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // 🟢 SUCCESS STATE
            showToast("Message sent successfully! 🚀", "success");
            document.getElementById('contact-form').reset(); 
            
          }, function(error) {
            console.log('FAILED...', error);
            
            // 🔴 ERROR STATE
            showToast("Failed to send message. Please try again later.", "error");
          })
          .finally(function() {
            // 🔄 BUTTON KO WAPAS NORMAL KARNA (Chahe pass ho ya fail)
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            submitBtn.innerText = "Send Message";
          });
      }
