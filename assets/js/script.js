/* ========================================
   TARJETA DE PRESENTACIÓN INTERACTIVA
   ======================================== */

/**
 * Script principal para la tarjeta de presentación interactiva
 * Incluye efectos 3D, animaciones, interacciones y funcionalidades avanzadas
 * 
 * @author Marx Patricio Echeverria
 * @version 2.0
 * @description Tarjeta de presentación moderna con efectos visuales avanzados
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       VARIABLES GLOBALES
       ======================================== */
    
    // Elementos principales del DOM
    const profileCard = document.getElementById('profileCard');
    const followBtn = document.getElementById('followBtn');
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    /* ========================================
       EFECTOS VISUALES PRINCIPALES
       ======================================== */
    
    /**
     * Efecto de inclinación 3D mejorado
     * Crea una sensación de profundidad cuando el usuario mueve el mouse sobre la tarjeta
     * Utiliza transformaciones CSS 3D para simular un efecto de tarjeta física
     */
    function initTiltEffect() {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profileCard.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }
    
    // 3. Contador animado mejorado
    function animateCounter(element, target, duration = 3000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        element.textContent = '0';
        element.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.classList.remove('counting');
                element.classList.add('counted');
                
                // Efecto de celebración
                setTimeout(() => {
                    element.classList.remove('counted');
                }, 1000);
            }
            
            // Formatear número con efectos visuales
            if (target >= 1000) {
                element.textContent = Math.floor(current) + 'K';
            } else if (target >= 1) {
                element.textContent = current.toFixed(1) + 'K';
            } else {
                element.textContent = Math.floor(current);
            }
            
            // Efecto de pulso durante la animación
            if (current < target) {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 50);
            }
        }, 16);
    }
    
    // 4. Animación de estadísticas al scroll
    function initStatsAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            const target = parseFloat(stat.dataset.count);
                            animateCounter(stat, target);
                        }, index * 300);
                    });
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(document.querySelector('.stats-footer'));
    }
    
    // 5. Efecto de ripple en botones
    function createRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // 6. Funcionalidad del botón seguir
    function initFollowButton() {
        let isFollowing = false;
        
        followBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!isFollowing) {
                this.innerHTML = '<span class="btn-text">Siguiendo</span><span class="btn-icon">✓</span>';
                this.classList.add('following');
                isFollowing = true;
                
                // Efecto de confeti
                createConfetti();
            } else {
                this.innerHTML = '<span class="btn-text">Seguir</span><span class="btn-icon">+</span>';
                this.classList.remove('following');
                isFollowing = false;
            }
        });
    }
    
    // 7. Efecto de confeti
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#87CEEB', '#ff6b6b', '#4ecdc4'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // 8. Efecto de typing en la descripción
    function initTypingEffect() {
        const userDescription = document.querySelector('.user-description');
        if (!userDescription) return;
        
        const originalText = userDescription.textContent;
        
        userDescription.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                userDescription.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // 9. Efecto de hover en estadísticas
    function initStatsHover() {
        statItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.05)';
                item.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.zIndex = '1';
            });
            
            item.addEventListener('click', () => {
                // Efecto de click
                item.style.transform = 'translateY(-4px) scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-8px) scale(1.05)';
                }, 150);
            });
        });
    }
    
    // 10. Efecto de parallax en el fondo
    function initParallaxEffect() {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            document.body.style.backgroundPosition = 
                `${x * 50}px ${y * 50}px`;
        });
    }
    
    // 11. Animación de entrada escalonada
    function initStaggeredAnimation() {
        const elements = [
            '.profile-img',
            '.user-name',
            '.user-role',
            '.user-info',
            '.stats-footer',
            '.button-container'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // 12. Efecto de glassmorphism dinámico
    function initGlassmorphismEffect() {
        const card = profileCard;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            card.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // 13. Efectos interactivos para iconos tecnológicos laterales
    function initTechIconsInteractions() {
        const techIcons = document.querySelectorAll('.tech-icon');
        const floatingContainer = document.querySelector('.floating-tech-icons');
        
        techIcons.forEach(icon => {
            // Efecto de click con partículas
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                createTechParticles(this);
                showTechInfo(this.dataset.tech);
            });
            
            // Efecto de hover con resplandor
            icon.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
                createHoverGlow(this);
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
            });
        });
        
        // Control de velocidad de flotación con mouse
        floatingContainer.addEventListener('mouseenter', function() {
            document.querySelectorAll('.tech-side').forEach(side => {
                side.style.animationPlayState = 'paused';
            });
            document.querySelectorAll('.tech-icon').forEach(icon => {
                icon.style.animationPlayState = 'paused';
            });
        });
        
        floatingContainer.addEventListener('mouseleave', function() {
            document.querySelectorAll('.tech-side').forEach(side => {
                side.style.animationPlayState = 'running';
            });
            document.querySelectorAll('.tech-icon').forEach(icon => {
                icon.style.animationPlayState = 'running';
            });
        });
    }
    
    // 14. Crear partículas al hacer click en iconos
    function createTechParticles(icon) {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = getRandomColor();
            particle.style.borderRadius = '50%';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    // 15. Mostrar información de tecnología
    function showTechInfo(tech) {
        const techInfo = {
            html: 'HTML5 - Lenguaje de marcado para estructurar contenido web',
            css: 'CSS3 - Hojas de estilo para diseñar interfaces web',
            js: 'JavaScript - Lenguaje de programación para interactividad',
            react: 'React - Biblioteca para construir interfaces de usuario',
            nodejs: 'Node.js - Entorno de ejecución de JavaScript en servidor',
            git: 'Git - Sistema de control de versiones distribuido',
            python: 'Python - Lenguaje de programación versátil y potente',
            database: 'Database - Sistemas de gestión de bases de datos'
        };
        
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.background = 'rgba(0, 0, 0, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '1000';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        notification.textContent = techInfo[tech];
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        notification.animate([
            { transform: 'translateX(-50%) translateY(-20px)', opacity: 0 },
            { transform: 'translateX(-50%) translateY(0)', opacity: 1 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.animate([
                { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
                { transform: 'translateX(-50%) translateY(-20px)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in'
            }).onfinish = () => notification.remove();
        }, 3000);
    }
    
    // 16. Crear resplandor de hover
    function createHoverGlow(icon) {
        const glow = document.createElement('div');
        glow.style.position = 'absolute';
        glow.style.top = '-5px';
        glow.style.left = '-5px';
        glow.style.right = '-5px';
        glow.style.bottom = '-5px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.animation = 'glow-pulse 2s ease-in-out infinite';
        
        icon.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 2000);
    }
    
    // 17. Función para obtener colores aleatorios
    function getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#87CEEB', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 18. Efecto de atracción magnética
    function initMagneticEffect() {
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 30;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.3;
                    const moveY = y * force * 0.3;
                    
                    this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                }
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Inicializar todos los efectos
    function init() {
        initTiltEffect();
        initStatsAnimation();
        initFollowButton();
        initTypingEffect();
        initStatsHover();
        initParallaxEffect();
        initStaggeredAnimation();
        initGlassmorphismEffect();
        initTechIconsInteractions();
        initMagneticEffect();
        
        // Aplicar efecto ripple a todos los botones
        document.querySelectorAll('.follow-button, .message-button, .social-btn').forEach(createRippleEffect);
        
        // Agregar estilos CSS dinámicos
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .counting {
                animation: numberPulse 0.5s ease-in-out infinite alternate;
            }
            
            .counted {
                animation: celebrationPulse 1s ease-in-out;
            }
            
            @keyframes numberPulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            
            @keyframes celebrationPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .following {
                background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%) !important;
                animation: successGlow 2s ease-in-out infinite alternate;
            }
            
            @keyframes successGlow {
                0% { box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3); }
                100% { box-shadow: 0 15px 35px rgba(78, 205, 196, 0.5); }
            }
            
            @keyframes glow-pulse {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: scale(1); 
                }
                50% { 
                    opacity: 0.8; 
                    transform: scale(1.2); 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ejecutar inicialización
    init();
    
    // Efecto de resplandor en el título
    setInterval(() => {
        const userName = document.querySelector('.user-name');
        userName.style.textShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        setTimeout(() => {
            userName.style.textShadow = 'none';
        }, 2000);
    }, 5000);
    
    // 19. Información de GitHub en consola
    function initGitHubInfo() {
        console.log(`
🚀 === INFORMACIÓN DEL DESARROLLADOR ===
👤 Nombre: Marx Patricio Echeverria
📧 Email: marx.echeverria@gmail.com
📞 Teléfono: +593998787255
📍 Ubicación: Esmeraldas - Tonsuoa
🎂 Fecha de nacimiento: 02/12/1981

🔗 === ENLACES SOCIALES ===
🐙 GitHub: https://github.com/marxecheverria
💬 WhatsApp: https://wa.me/593998787255

💻 === TECNOLOGÍAS ===
• HTML5 - Lenguaje de marcado
• CSS3 - Hojas de estilo
• JavaScript - Programación
• React - Frontend Framework
• Node.js - Backend Runtime
• Git - Control de versiones
• Python - Lenguaje de programación
• Database - Gestión de datos

🎮 === COMANDOS DISPONIBLES ===
• showProfile() - Mostrar información del perfil
• showTech() - Mostrar tecnologías
• showContact() - Mostrar información de contacto
• toggleTheme() - Cambiar tema claro/oscuro
• animateIcons() - Activar animaciones de iconos
• showStats() - Mostrar estadísticas

💡 === CONSEJOS ===
• Usa F12 para abrir las herramientas de desarrollador
• Haz clic en los iconos tecnológicos para ver información
• El botón de tema cambia entre modo claro y oscuro
• Los iconos tienen efectos de neón al hacer hover
        `);
        
        // Hacer funciones disponibles globalmente
        window.showProfile = showProfile;
        window.showTech = showTech;
        window.showContact = showContact;
        window.toggleTheme = toggleTheme;
        window.animateIcons = animateIcons;
        window.showStats = showStats;
    }
    
    // Funciones disponibles en consola
    function showProfile() {
        console.log(`
👤 === PERFIL PROFESIONAL ===
Nombre: Marx Patricio Echeverria
Rol: Desarrollador Frontend
Especialidad: Interfaces de usuario hermosas y funcionales
Experiencia: Apasionado por crear experiencias digitales excepcionales
        `);
    }
    
    function showTech() {
        console.log(`
💻 === STACK TECNOLÓGICO ===
Frontend:
  • HTML5 - Estructura semántica
  • CSS3 - Estilos avanzados y animaciones
  • JavaScript - Interactividad y lógica
  • React - Componentes reutilizables

Backend:
  • Node.js - Servidor JavaScript
  • Python - Scripting y automatización

Herramientas:
  • Git - Control de versiones
  • Database - Gestión de datos
        `);
    }
    
    function showContact() {
        console.log(`
📞 === INFORMACIÓN DE CONTACTO ===
Email: marx.echeverria@gmail.com
Teléfono: +593998787255
WhatsApp: https://wa.me/593998787255
GitHub: https://github.com/marxecheverria
Ubicación: Esmeraldas - Tonsuoa, Ecuador
        `);
    }
    
    function toggleTheme() {
        const body = document.body;
        const themeBtn = document.getElementById('themeBtn');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeBtn.innerHTML = '<span class="theme-icon">🌙</span>';
            console.log('🌞 Modo claro activado');
        } else {
            body.classList.add('dark-theme');
            themeBtn.innerHTML = '<span class="theme-icon">☀️</span>';
            console.log('🌙 Modo oscuro activado');
        }
    }
    
    function animateIcons() {
        const icons = document.querySelectorAll('.tech-icon');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'iconFloat 6s ease-in-out infinite';
                }, 100);
            }, index * 200);
        });
        console.log('✨ Animaciones de iconos reiniciadas');
    }
    
    function showStats() {
        const stats = document.querySelectorAll('.stat-number');
        console.log(`
📊 === ESTADÍSTICAS ===
Mensajes: ${stats[0]?.textContent || '80'}
Seguidores: ${stats[1]?.textContent || '803'}
Siguiendo: ${stats[2]?.textContent || '1.4K'}
        `);
    }
    
    // Inicializar información de GitHub
    initGitHubInfo();
    
    console.log('🎉 Tarjeta de perfil interactiva cargada con éxito!');
});