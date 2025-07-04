import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import './Projects.css'

const Projects = () => {
  const projectsRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const projectData = [
    {
      id: 1,
      title: "FYOF: Find Your Own Food",
      description: "A full-stack food ordering platform built for learning. This project simulates a real-world e-commerce flow with user authentication, payments, and admin tools—built using MERN stack and Stripe.",
      image: "/projects/fyof.png", 
      technologies: ["HTML","CSS","JS", "Node.js", "MongoDB", "Express", "Stripe"],
      category: "fullstack",
      liveUrl: "https://eclectic-truffle-7182a2.netlify.app/",
      githubUrl: "https://github.com/aayush992/Food_management",
      featured: true
    },
    {
      id: 2,
      title: "CodeWizard",
      description: "An interactive compiler playground for students and learners. Designed to help users visualize and understand compiler design through a simple web interface, with real-time simulation and code execution.",
      image: "/projects/CodeWizard.png",
      technologies: ["HTML","CSS", "JavaScript",  "Railway", "C", "Docker"],
      category: "frontend",
      liveUrl: "https://codewizard-production.up.railway.app/",
      githubUrl: "https://github.com/aayush992/CodeWizard",
      featured: true
    },
    {
      id: 3,
      title: "File Compressor",
      description: "A File Compressor site which uses Huffmann Coding technique to perform lossless compression/decompression of textfiles made using Javascript, HTML/CSS and Bootstrap.",
      image: "/projects/FileCompressor.png", 
      technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
      category: "frontend",
      liveUrl: "https://aayush992.github.io/file-compressor/",
      githubUrl: "https://github.com/aayush992/file-compressor",
      featured: false
    },
    {
      id: 4,
      title: "Post Generator",
      description: "An AI-powered application to generate engaging LinkedIn posts with various features and customization options.",
      image: "/projects/PostGenerator.png", 
      technologies: ["Python", "Streamlit", "OpenAI API"],
      category: "backend",
      liveUrl: "https://post-generator-123.streamlit.app/",
      githubUrl: "https://github.com/aayush992/Post-Generator",
      featured: false
    },
    {
      id: 5,
      title: "Crop Disease Prediction",
      description: "Developed with Python, Flask, and OpenCV, this project predicts plant diseases and provides suggestions, helping farmers make better decisions.",
      image: "/projects/CropPrediction.png",
      technologies: ["HTML", "CSS", "Python", "Flask"],
      category: "mobile",
      liveUrl: "https://fitness-app-demo.com",
      githubUrl: "https://github.com/aayush992/Crop_disease_prediction",
      featured: true
    },
    {
      id: 6,
      title: "Mini-Compiler",
      description: "A simplified compiler implementation featuring lexical analysis, parsing, and x86 assembly code generation.",
      image: "/projects/mini_compiler.png",
      technologies: ["Flex", "Bison", "C", "TAC"],
      category: "mobile",
      liveUrl: "https://fitness-app-demo.com",
      githubUrl: "https://github.com/aayush992/mini_compiler",
      featured: true
    },
    {
      id: 7,
      title: "Encryption Method",
      description: "A text encryption method implemented using XOR. This project provides a secure way to encrypt and decrypt text messages.",
      image: "/projects/encryption.png",
      technologies: ["Python"],
      category: "mobile",
      liveUrl: "https://fitness-app-demo.com",
      githubUrl: "https://github.com/aayush992/text-encryption",
      featured: true
    },
    {
      id: 8,
      title: "LSB Stagenography",
      description: "This project implements LSB (Least Significant Bit) Steganography, a technique used to hide secret messages within images.",
      image: "/projects/LSB.png",
      technologies: ["Python", "NUMPY", "PIL", "Matplotlib"],
      category: "mobile",
      liveUrl: "https://fitness-app-demo.com",
      githubUrl: "https://github.com/aayush992/lsb_steganography",
      featured: true
    },
    {
      id: 9,
      title: "NLP to SQL",
      description: "",
      image: "/projects/NLP.png",
      technologies: ["Python", "Ollama", "Mistrel"],
      category: "frontend",
      liveUrl: "https://portfolio-demo.com",
      githubUrl: "https://github.com/aayush992/NLP_to_SQL",
      featured: false
    }
  ]

  // Slideshow configuration - Show three projects at a time, move one at a time
  const projectsPerSlide = 3
  const totalSlides = projectData.length - projectsPerSlide + 1

  // Navigation functions - Move one project at a time
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  // Get current slide projects - sliding window of 3 projects
  const getCurrentSlideProjects = () => {
    const startIndex = currentSlide
    const endIndex = startIndex + projectsPerSlide
    return projectData.slice(startIndex, endIndex)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll')
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animated')
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <AnimatedBackground
        particleCount={45}
        connectionDistance={110}
        speed={0.2}
        opacity={0.25}
        cursorInteraction={true}
      />
      <div className="projects-background">
        <div className="projects-orb orb-1"></div>
        <div className="projects-orb orb-2"></div>
        <div className="projects-orb orb-3"></div>
      </div>

      {/* Background Lines */}
      <div className="projects-lines">
        <div className="projects-bg-line projects-line-1"></div>
        <div className="projects-bg-line projects-line-2"></div>
        <div className="projects-bg-line projects-line-3"></div>
        <div className="projects-diagonal projects-diag-1"></div>
        <div className="projects-diagonal projects-diag-2"></div>
      </div>

      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title animate-on-scroll">
            My Projects
          </h2>
          <p className="projects-subtitle animate-on-scroll">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className="projects-slideshow">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                className="slide-nav slide-nav-prev"
                onClick={prevSlide}
                aria-label="Previous projects"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="slide-nav slide-nav-next"
                onClick={nextSlide}
                aria-label="Next projects"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Projects Grid */}
          <div className="projects-grid">
            {getCurrentSlideProjects().map((project, index) => (
              <div
                key={project.id}
                className={`project-card animate-on-scroll ${project.featured ? 'featured' : ''}`}
              >
                <div className="project-image">
                  <img
                    src={project.image || '/projects/placeholder.jpg'}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250/667eea/ffffff?text=' + encodeURIComponent(project.title)
                    }}
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View Source Code"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="slide-indicators">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`slide-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
