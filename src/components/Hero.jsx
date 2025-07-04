import React, { useEffect, useRef } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Code, Sparkles } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Initialize animated background
    initAnimatedBackground()
  }, [])

  const initAnimatedBackground = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: null, y: null, radius: 200 }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Particles array
    const particles = []
    const particleCount = 80
    const connectionDistance = 150

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: size,
        originalSize: size
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            // Repel particles from cursor
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            particle.x -= Math.cos(angle) * force * 3
            particle.y -= Math.sin(angle) * force * 3

            // Increase particle size near cursor
            particle.size = particle.originalSize * (1 + force * 0.8)
          } else {
            // Return to original size
            particle.size = particle.originalSize
          }
        } else {
          particle.size = particle.originalSize
        }

        // Get theme-appropriate colors
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const particleColor = isDark ? 'rgba(102, 126, 234, 0.8)' : 'rgba(102, 126, 234, 0.6)'
        const lineColor = isDark ? '102, 126, 234' : '102, 126, 234'

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Draw connection to mouse if close enough
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const mouseOpacity = (1 - distance / mouse.radius) * 0.8
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${mouseOpacity})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * (isDark ? 0.4 : 0.3)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      {/* Animated Network Background */}
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        style={{ pointerEvents: 'auto' }}
      />

      {/* Gradient Overlay */}
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Background Lines */}
      <div className="background-lines">
        <div className="bg-line bg-line-1"></div>
        <div className="bg-line bg-line-2"></div>
        <div className="bg-line bg-line-3"></div>
        <div className="bg-line bg-line-4"></div>
        <div className="bg-line-vertical bg-line-v1"></div>
        <div className="bg-line-vertical bg-line-v2"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="floating-element floating-1">
          <Code size={40} />
        </div>
        <div className="floating-element floating-2">
          <Sparkles size={30} />
        </div>
        <div className="floating-element floating-3">
          <div className="geometric-shape triangle"></div>
        </div>
        <div className="floating-element floating-4">
          <div className="geometric-shape circle"></div>
        </div>
        <div className="floating-element floating-5">
          <div className="geometric-shape square"></div>
        </div>
        <div className="floating-element floating-6">
          <div className="geometric-shape circle"></div>
        </div>
        <div className="floating-element floating-7">
          <div className="geometric-shape triangle"></div>
        </div>
        <div className="floating-element floating-8">
          <div className="geometric-shape square"></div>
        </div>
      </div>

      <div className="hero-container" ref={heroRef}>
        <div className="hero-content">

          <h1 className="hero-title">
            Hi, I'm <span className="highlight gradient-text">Aayush Saini</span>
          </h1>

          <h2 className="hero-subtitle">
            <span className="typing-text">Computer Science Student & Developer</span>
          </h2>

          <p className="hero-description">
            Passionate about creating innovative solutions through code.
            I love creating web applications, exploring new technologies,
            and solving problems.Right now, I’m looking for opportunities where I can learn, grow, and contribute.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={scrollToAbout}>
              <span>Learn More About Me</span>
              <div className="btn-shine"></div>
            </button>
            <button className="btn btn-secondary" onClick={scrollToProjects}>
              <span>View My Work</span>
              <div className="btn-shine"></div>
            </button>
          </div>

          <div className="hero-social-links">
            <a href="https://github.com/aayush992" className="hero-social" aria-label="GitHub">
              <Github size={20} />
              <span className="social-tooltip">Aayush Saini</span>
            </a>
            <a href="https://www.linkedin.com/in/aayush-saini-193921259/" className="hero-social" aria-label="LinkedIn">
              <Linkedin size={20} />
              <span className="social-tooltip">Aayush Saini</span>
            </a>
            <a href="mailto:aayushsaini915@gmail.com" className="hero-social" aria-label="Email">
              <Mail size={20} />
              <span className="social-tooltip">Aayush Saini</span>
            </a>
          </div>
        </div>
      </div>

      {/* <div className="scroll-indicator" onClick={scrollToAbout}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>  */}
    </section>
  )
}

export default Hero
