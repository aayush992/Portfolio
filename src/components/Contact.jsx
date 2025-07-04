import React, { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Download, Linkedin, Github, Twitter, MessageCircle } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import './Contact.css'

const Contact = () => {
  const contactRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

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

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    }, 2000)
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/aayush_resume.pdf' // You would replace this with your actual resume file
    link.download = 'aayush_resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'aayushsaini915@gmail.com',
      link: 'mailto:aayushsaini915@gamil.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 7455007234',
      link: 'tel:+917455007234'
    }
  ]

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      url: 'https://github.com/aayush992',
      color: '#333'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aayush-saini-91527119b/',
      color: '#0077B5'
    }
  ]

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <AnimatedBackground
        particleCount={35}
        connectionDistance={100}
        speed={0.15}
        opacity={0.2}
        cursorInteraction={true}
      />
      <div className="contact-background">
        <div className="contact-orb orb-1"></div>
        <div className="contact-orb orb-2"></div>
        <div className="contact-orb orb-3"></div>
      </div>

      {/* Background Lines */}
      <div className="contact-lines">
        <div className="contact-bg-line contact-line-1"></div>
        <div className="contact-bg-line contact-line-2"></div>
      </div>

      {/* Floating Elements */}
      <div className="contact-floating">
        <div className="contact-float-element contact-float-1">
          <Mail size={18} />
        </div>
        <div className="contact-float-element contact-float-2">
          <MessageCircle size={16} />
        </div>
        <div className="contact-float-element contact-float-3">
          <Send size={20} />
        </div>
      </div>

      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title animate-on-scroll">
            Get In Touch
          </h2>
          <p className="contact-subtitle animate-on-scroll">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info animate-on-scroll">
            <h3>Let's Connect</h3>
            <p>
              Whether you have a project in mind, want to collaborate, or just want to say hello,
              I'd love to hear from you. Feel free to reach out.
            </p>

            <div className="contact-methods">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-method">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <span className="contact-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              className="resume-download-btn animate-on-scroll"
              onClick={handleResumeDownload}
            >
              <Download size={20} />
              <span>Download Resume</span>
            </button>
          </div>

          <div className="contact-form-container animate-on-scroll">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project or just say hello..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  <MessageCircle size={20} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
