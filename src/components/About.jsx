import React, { useEffect, useRef } from 'react'
import { User, GraduationCap, Code2, Heart, MapPin, Calendar } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import './About.css'

const About = () => {
  const aboutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simple fade-in animation using CSS classes
            const elements = entry.target.querySelectorAll('.animate-on-scroll')
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animated')
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about" ref={aboutRef}>
      <AnimatedBackground
        particleCount={40}
        connectionDistance={100}
        speed={0.2}
        opacity={0.3}
      />
      <div className="about-background">
        <div className="about-orb orb-1"></div>
        <div className="about-orb orb-2"></div>
        <div className="about-orb orb-3"></div>
      </div>

      {/* Background Lines */}
      <div className="about-lines">
        <div className="about-bg-line about-line-1"></div>
        <div className="about-bg-line about-line-2"></div>
        <div className="about-bg-line about-line-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="about-floating">
        <div className="about-float-element about-float-1">
          <div className="about-geometric about-triangle"></div>
        </div>
        <div className="about-float-element about-float-2">
          <div className="about-geometric about-circle"></div>
        </div>
        <div className="about-float-element about-float-3">
          <div className="about-geometric about-square"></div>
        </div>
      </div>

      <div className="container">
        <div className="about-header">
          <h2 className="about-title animate-on-scroll">
            About Me
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-card main-card animate-on-scroll">
              <div className="card-icon">
                <User size={24} />
              </div>
              <h3>Who I Am</h3>
              <p>
                I’m a final-year Computer Science student driven by curiosity and a love for 
                turning ideas into digital solutions. What started as an interest in technology
                has grown into a focused effort to build meaningful applications, improve my 
                skills, and prepare myself for real-world impact in the tech industry.
              </p>
            </div>

            <div className="about-grid">
              <div className="about-card animate-on-scroll">
                <div className="card-icon">
                  <GraduationCap size={20} />
                </div>
                <h4>Education</h4>
                <p>Computer Science Student</p>
                <span className="card-detail">Currently pursuing my Bachelors degree at GEHU Dehradun</span>
              </div>

              <div className="about-card animate-on-scroll">
                <div className="card-icon">
                  <Code2 size={20} />
                </div>
                <h4>Focus Areas</h4>
                <p>Full-Stack Development</p>
                <span className="card-detail">Also exploring AI/ML and Natural Language Processing</span>
              </div>

              <div className="about-card animate-on-scroll">
                <div className="card-icon">
                  <Heart size={20} />
                </div>
                <h4>Driven by Curiosity</h4>
                <p>Problem Solving</p>
                <span className="card-detail">Turning ideas into creative and efficient solutions through code.</span>
              </div>

              <div className="about-card animate-on-scroll">
                <div className="card-icon">
                  <MapPin size={20} />
                </div>
                <h4>Location</h4>
                <p>Dehardun,India</p>
                <span className="card-detail">Open to remote work</span>
              </div>
            </div>
          </div>

          {/* Stats 

          <div className="about-stats">
            <div className="stat-card animate-on-scroll">
              <div className="stat-number" data-count="50">50</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-number" data-count="3">3</div>
              <div className="stat-label">Years Learning</div>
            </div>
            <div className="stat-card animate-on-scroll">
              <div className="stat-number" data-count="10">10</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default About
