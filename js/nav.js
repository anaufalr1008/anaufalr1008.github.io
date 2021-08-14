document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status != 200) return;
  
          // Muat daftar tautan menu
          document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
            elm.innerHTML = xhttp.responseText;
          });
  
          // Daftarkan event listener untuk setiap tautan menu
          document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
            elm.addEventListener("click", function(event){
              // Tutup sidenav
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
  
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    }
    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
  
    function loadPage(page) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          const content = document.querySelector("#body-content");
          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
            if (page === "home"){
              content.innerHTML=xhttp.responseText;
              loadHome();
            }
            else if (page === "profil"){
              content.innerHTML=xhttp.responseText;
              loadProfile();
            }
            else if (page === "goa"){
              content.innerHTML=xhttp.responseText;
              loadProfile();
            }
            
          } else if (this.status == 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
          } else {
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
          }
        }
      };
      xhttp.open("GET", "pages/" + page + ".html", true);
      xhttp.send();
    }
  });

function loadHome() {
    loadSlider();
    loadParallax();
}
function loadProfile(){
  loadCarousel();
  loadParallax();
}
function loadSlider() {
    const slider = document.querySelectorAll('.slider')
    M.Slider.init(slider,{
    indicators: false,
    height: 500,
    transition: 600,
    interval:3000,
});

}

function loadCarousel() {
    const carousel = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(carousel,{
    fullWidth : true,
    indicators : true,
    })
}

function loadParallax() {
  const parallax = document.querySelectorAll('.parallax');
  const instances = M.Parallax.init(parallax,{
    responsiveThreshold:0
  })
}
