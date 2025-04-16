// Funciones principales para el sitio web de Foo Fighters

document.addEventListener("DOMContentLoaded", () => {
    // Menú móvil
    const mobileMenuBtn = document.getElementById("mobile-menu-toggle")
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        document.getElementById("main-nav").classList.toggle("active")
      })
    }
  
    // Animación de elementos al hacer scroll
    const fadeElements = document.querySelectorAll(".fade-in")
  
    function checkFade() {
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.classList.add("visible")
        }
      })
    }
  
    // Verificar al cargar la página
    checkFade()
  
    // Verificar al hacer scroll
    window.addEventListener("scroll", checkFade)
  
    // Funcionalidad para la galería de imágenes (si existe)
    const galleryImages = document.querySelectorAll(".gallery-image")
    if (galleryImages.length > 0) {
      galleryImages.forEach((image) => {
        image.addEventListener("click", function () {
          const fullImage = this.getAttribute("data-full")
          if (fullImage) {
            openLightbox(fullImage, this.alt)
          }
        })
      })
    }
  
    // Función para abrir lightbox
    function openLightbox(src, alt) {
      const lightbox = document.createElement("div")
      lightbox.classList.add("lightbox")
  
      lightbox.innerHTML = `
              <div class="lightbox-content">
                  <span class="close-lightbox">&times;</span>
                  <img src="${src}" alt="${alt || "Imagen ampliada"}">
                  <div class="lightbox-caption">${alt || ""}</div>
              </div>
          `
  
      document.body.appendChild(lightbox)
  
      // Prevenir scroll del body
      document.body.style.overflow = "hidden"
  
      // Cerrar lightbox
      lightbox.querySelector(".close-lightbox").addEventListener("click", () => {
        document.body.removeChild(lightbox)
        document.body.style.overflow = ""
      })
  
      // Cerrar al hacer clic fuera de la imagen
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox)
          document.body.style.overflow = ""
        }
      })
    }
  
    // Reproducción de audio (si existe)
    const audioPlayers = document.querySelectorAll(".audio-player")
    if (audioPlayers.length > 0) {
      audioPlayers.forEach((player) => {
        const audio = player.querySelector("audio")
        const playBtn = player.querySelector(".play-btn")
        const progress = player.querySelector(".progress")
        const currentTime = player.querySelector(".current-time")
        const duration = player.querySelector(".duration")
  
        if (playBtn && audio) {
          playBtn.addEventListener("click", function () {
            if (audio.paused) {
              audio.play()
              this.innerHTML = '<i class="fas fa-pause"></i>'
            } else {
              audio.pause()
              this.innerHTML = '<i class="fas fa-play"></i>'
            }
          })
        }
  
        if (audio && progress && currentTime && duration) {
          audio.addEventListener("timeupdate", () => {
            const percent = (audio.currentTime / audio.duration) * 100
            progress.style.width = percent + "%"
  
            const mins = Math.floor(audio.currentTime / 60)
            const secs = Math.floor(audio.currentTime % 60)
            currentTime.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs
          })
  
          audio.addEventListener("loadedmetadata", () => {
            const mins = Math.floor(audio.duration / 60)
            const secs = Math.floor(audio.duration % 60)
            duration.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs
          })
        }
      })
    }
  })
  