/* filepath: c:\Users\Utilisateur\Documents\CV\assets\script.js */
/* =========================================
   1. LANDING PAGE ET TRANSITION
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  const landingPage = document.getElementById('landing-page');
  const enterBtn = document.getElementById('enter-btn');
  const particlesContainer = document.getElementById('code-particles');
  const cvShell = document.querySelector('.cv-shell');
  const bgLiquid = document.querySelector('.bg-liquid');

  // Au chargement, s'assurer que seule la landing page est visible
  if (landingPage) {
    landingPage.style.display = 'flex';
  }
  if (cvShell) {
    cvShell.style.display = 'none';
  }
  if (bgLiquid) {
    bgLiquid.style.display = 'none';
  }

  // Toutes les images du dossier img
  const techImages = [
    'assets/img/Goro_Goro_no_Mi.png',
    'assets/img/Mera_Mera_no_Mi.png',
    'assets/img/Pika_Pika_no_Mi.png',
    'assets/img/Suna_Suna_no_Mi.png',
    'assets/img/Gomu_Gomu_no_Mi.png',
    'assets/img/Mero_Mero_no_Mi.png',
    'assets/img/Bison.png',
    'assets/img/kuma.png',
    'assets/img/kaido.png',

    

    
  ];
  
  let particles = [];

  function createParticle() {
    const particle = document.createElement('span');
    particle.classList.add('code-particle');
    
    // Créer une image
    const img = document.createElement('img');
    img.src = techImages[Math.floor(Math.random() * techImages.length)];
    img.alt = 'Tech icon';
    particle.appendChild(img);
    
    // Position et propriétés initiales
    const startX = Math.random() * 100;
    particle.style.left = startX + 'vw';
    
    // Taille plus grande pour les fruits (40px à 70px au lieu de 25px à 45px)
    const size = Math.random() * 30 + 40; 
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    const duration = Math.random() * 6 + 8; 
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Données de la particule pour le tracking
    const particleData = {
      element: particle,
      originalX: startX,
      currentOffsetX: 0,
      currentOffsetY: 0,
      pushed: false,
      pushForce: { x: 0, y: 0 }
    };
    
    particles.push(particleData);
    
    // Ajouter les interactions
    addParticlePhysics(particleData);
    
    if (particlesContainer) {
      particlesContainer.appendChild(particle);
    }
  }

  function addParticlePhysics(particleData) {
    const particle = particleData.element;

    // Détecter le hover et appliquer la force
    particle.addEventListener('mouseenter', function(e) {
      if (!particleData.pushed) {
        const rect = particle.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculer la direction de poussée
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const directionX = mouseX - centerX;
        const directionY = mouseY - centerY;
        
        // Normaliser et appliquer la force
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);
        const forceMultiplier = 150; // Intensité de la poussée
        
        particleData.pushForce.x = (directionX / distance) * forceMultiplier;
        particleData.pushForce.y = (directionY / distance) * forceMultiplier;
        
        // Marquer comme poussée et appliquer la transformation
        particleData.pushed = true;
        particle.classList.add('pushed');
        
        // Appliquer la déviation immédiatement
        applyPushForce(particleData);
      }
    });

    // Quand la souris sort, laisser la particule continuer avec sa nouvelle trajectoire
    particle.addEventListener('mouseleave', function() {
      // Délai pour reprendre l'animation normale avec le nouvel offset
      setTimeout(() => {
        if (particleData.pushed) {
          particle.classList.remove('pushed');
          
          // Reprendre l'animation CSS mais avec le nouvel offset intégré
          const currentTransform = particle.style.transform;
          particle.style.animationPlayState = 'running';
          
          // La particule continue sa montée depuis sa nouvelle position
          particleData.pushed = false;
        }
      }, 100);
    });
  }

  function applyPushForce(particleData) {
    const particle = particleData.element;
    
    // Calculer le nouvel offset
    particleData.currentOffsetX += particleData.pushForce.x;
    particleData.currentOffsetY += particleData.pushForce.y;
    
    // Limiter le déplacement pour pas que ça sorte trop de l'écran
    particleData.currentOffsetX = Math.max(-200, Math.min(200, particleData.currentOffsetX));
    particleData.currentOffsetY = Math.max(-200, Math.min(200, particleData.currentOffsetY));
    
    // Appliquer la transformation avec un peu d'élasticité
    particle.style.transform = `translateX(${particleData.currentOffsetX}px) translateY(${particleData.currentOffsetY}px) scale(1.1)`;
    
    // Réduire progressivement la force (friction)
    particleData.pushForce.x *= 0.95;
    particleData.pushForce.y *= 0.95;
  }

  // Système de poussée continue au mouvement de souris
  let mouseX = 0, mouseY = 0;
  
  landingPage.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Appliquer une force de poussée douce à toutes les particules proches
    particles.forEach(particleData => {
      const particle = particleData.element;
      const rect = particle.getBoundingClientRect();
      
      if (rect.width > 0) { // Particule visible
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );
        
        // Zone d'influence de 80px autour de la souris
        if (distance < 80 && !particleData.pushed) {
          const angle = Math.atan2(centerY - mouseY, centerX - mouseX);
          const force = (80 - distance) / 80 * 3; // Force douce
          
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;
          
          particleData.currentOffsetX += pushX;
          particleData.currentOffsetY += pushY;
          
          particle.style.transform = `translateX(${particleData.currentOffsetX}px) translateY(${particleData.currentOffsetY}px)`;
        }
      }
    });
  });

  // Générer les particules
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {  // Réduit de 25 à 20 particules
      createParticle();
    }
  }

  // Gestion du clic sur le bouton INITIALISER LE CV
  if (enterBtn) {
    enterBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Bouton cliqué - Démarrage transition');
      
      enterBtn.disabled = true;
      
      if (landingPage) {
        landingPage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          landingPage.style.display = 'none';
          
          if (bgLiquid) {
            bgLiquid.style.display = 'block';
          }
          
          if (cvShell) {
            cvShell.style.display = 'block';
            cvShell.style.opacity = '0';
            cvShell.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              cvShell.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
              cvShell.style.opacity = '1';
              cvShell.style.transform = 'translateY(0)';
              
              setTimeout(() => {
                triggerRevealAnimations();
                startTypewriter();
              }, 300);
            }, 100);
          }
        }, 800);
      }
    });
  }
});

/* =========================================
   2. SCROLL REVEAL
   ========================================= */
function triggerRevealAnimations() {
  const elementsToReveal = document.querySelectorAll('.reveal');
  
  elementsToReveal.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('reveal-visible');
    }, index * 150);
  });
}

/* =========================================
   3. PARALLAXE SOURIS
   ========================================= */
document.addEventListener('mousemove', (e) => {
  const blobOne = document.querySelector('.bg-liquid__blob--one');
  const blobTwo = document.querySelector('.bg-liquid__blob--two');
  
  if (blobOne || blobTwo) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Blob 1
    const speed1 = -0.03;
    if (blobOne) {
      blobOne.style.transform = `translate(${mouseX * speed1}px, ${mouseY * speed1}px)`;
    }

    // Blob 2
    const speed2 = 0.02;
    if (blobTwo) {
      blobTwo.style.transform = `translate(${mouseX * speed2}px, ${mouseY * speed2}px)`;
    }
  }
});

/* =========================================
   4. MACHINE À ÉCRIRE
   ========================================= */
function startTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  
  if (typewriterElement) {
    const textToType = 'Développeur Web Junior';
    typewriterElement.textContent = '';
    let charIndex = 0;
    
    function type() {
      if (charIndex < textToType.length) {
        typewriterElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      }
    }
    
    setTimeout(type, 500);
  }
}