$(document).ready(function(){
  $(window).scroll(function(){
      if(this.scrollY > 20){
          $('#main-nav').addClass("sticky");
      }else{
          $('#main-nav').removeClass("sticky");
      }
      
  })

  // togel/menu nevbar script
  $('.menu-btn').click(function(){
      $('#main-nav .menu').toggleClass("active");
      $('.menu-btn i').toggleClass("active");
  });

  $('.menu li a').click(function(){
      $('#main-nav .menu').toggleClass("active");
      $('.menu-btn i').toggleClass("active");
  });

  //   typing animation script 
     var typed = new Typed (".panku",{
      strings:["Full-Stack Web-Developer", "Node-js Backend Devloper"],
      typeSpeed:100,
      backSpeed:60,
      loop:true
     })


     var typed = new Typed (".panku2",{
      strings:["Full-Stack Web-Developer", "Node-js Backend Devloper"],
      typeSpeed:100,
      backSpeed:60,
      loop:true
     });

  // owl carousel script
  $('.carousel').owlCarousel({
       margin:20,
       loop:true,
       autoplayTimeOut:2000,
       autoplayHoverPause:true,
       responsive:{
          0:{
              items:1,
              nav:false
          },
          600:{
              items:2,
              nav:false
          },
          1000:{
              items:3,
              nav:false
          }
       }
  })

});

// resume section 

document.getElementById("resume-link-1").onclick = () => {
  window.open(
    "./Mohd Saif Khan-Resume.pdf"
  );
};

document.getElementById("resume-link-2").onclick = () => {
  window.open(
    "./Mohd Saif Khan-Resume.pdf"
  );
};