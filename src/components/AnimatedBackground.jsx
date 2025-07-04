import React, { useEffect, useRef } from 'react'

const AnimatedBackground = ({
  particleCount = 80,
  connectionDistance = 150,
  speed = 0.5,
  className = "",
  opacity = 0.6,
  cursorInteraction = true
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: null, y: null, radius: 150 }

    // Set canvas size to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse interaction - use global coordinates
    const handleMouseMove = (e) => {
      if (!cursorInteraction) return
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    // Add global mouse listeners for full page interaction
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Particles array
    const particles = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 1.5 + 0.5,
        originalSize: Math.random() * 1.5 + 0.5
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get theme-appropriate colors
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const particleColor = isDark ? `rgba(102, 126, 234, ${opacity})` : `rgba(102, 126, 234, ${opacity * 0.8})`
      const lineColor = '102, 126, 234'

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

        // Enhanced mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            // Stronger repulsion force
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)

            // More dramatic repulsion
            const repelForce = force * force * 4
            particle.x -= Math.cos(angle) * repelForce
            particle.y -= Math.sin(angle) * repelForce

            // Dramatic size increase and glow effect
            particle.size = particle.originalSize * (1 + force * 2)

            // Add velocity for more dynamic movement
            particle.vx += Math.cos(angle) * force * -0.1
            particle.vy += Math.sin(angle) * force * -0.1
          } else {
            // Gradually return to original size and velocity
            particle.size += (particle.originalSize - particle.size) * 0.1
            particle.vx *= 0.99
            particle.vy *= 0.99
          }
        } else {
          particle.size = particle.originalSize
        }

        // Draw particle with glow effect
        const glowSize = particle.size > particle.originalSize ? particle.size * 1.5 : particle.size

        // Outer glow
        if (particle.size > particle.originalSize) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
          const glowOpacity = (particle.size - particle.originalSize) / particle.originalSize * 0.3
          ctx.fillStyle = `rgba(102, 126, 234, ${glowOpacity})`
          ctx.fill()
        }

        // Main particle
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
            const mouseOpacity = (1 - distance / mouse.radius) * 0.6
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${mouseOpacity})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const lineOpacity = (1 - distance / connectionDistance) * (isDark ? opacity * 0.6 : opacity * 0.4)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity})`
            ctx.lineWidth = 0.8
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
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [particleCount, connectionDistance, speed, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`animated-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}

export default AnimatedBackground
