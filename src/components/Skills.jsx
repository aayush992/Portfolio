import React, { useEffect, useRef, useState } from 'react'
import { Code, Database, Globe, Palette, Zap } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import './Skills.css'

const Skills = () => {
  const skillsRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('frontend')

  const skillCategories = {
    frontend: {
      icon: <Globe size={24} />,
      title: 'Frontend Development',
      skills: [
        { name: 'React', color: '#61DAFB', description: 'Component-based UI library', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript', color: '#F7DF1E', description: 'ES6+ modern JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', color: '#3178C6', description: 'Typed JavaScript superset', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'HTML5', color: '#E34F26', description: 'Semantic markup language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', color: '#1572B6', description: 'Modern styling with animations', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', color: '#06B6D4', description: 'Utility-first CSS framework', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
        { name: 'Next.js', color: '#000000', description: 'React production framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'Vite', color: '#646CFF', description: 'Fast build tool', logo: 'https://vitejs.dev/logo.svg' }
      ]
    },
    backend: {
      icon: <Database size={24} />,
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', color: '#339933', description: 'JavaScript runtime environment', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', color: '#000000', description: 'Web application framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB', color: '#47A248', description: 'NoSQL database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Python', color: '#3776AB', description: 'Versatile programming language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'MySQL', color: '#4479A1', description: 'Popular SQL database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Django', color: '#092E20', description: 'Python web framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'PostgreSQL', color: '#336791', description: 'Relational database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      ]
    },
    tools: {
      icon: <Code size={24} />,
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git', color: '#F05032', description: 'Version control system', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', color: '#181717', description: 'Code hosting platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'VS Code', color: '#007ACC', description: 'Code editor', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Docker', color: '#2496ED', description: 'Containerization platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Vercel', color: '#000000', description: 'Deployment platform', logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png' },
        { name: 'Netlify', color: '#00C7B7', description: 'Web hosting service', logo: 'https://www.netlify.com/v3/img/components/logomark.png' },
        { name: 'Streamlit', color: '#FF9900', description: 'Python web framework', logo: 'https://streamlit.io/images/brand/streamlit-mark-color.png' },
      ]
    },
    languages: {
      icon: <Code size={24} />,
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', color: '#F7DF1E', description: 'Primary language for web dev', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'C', color: '#239120', description: 'Procedural programming language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
        { name: 'C++', color: '#00599C', description: 'System programming', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'TypeScript', color: '#3178C6', description: 'Typed JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Python', color: '#3776AB', description: 'Backend and data science', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Java', color: '#ED8B00', description: 'Object-oriented programming', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'PHP', color: '#777BB4', description: 'Server-side scripting', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      ]
    }
  }

  const categories = [
    { id: 'languages', label: 'Languages', icon: <Code size={18} /> },
    { id: 'frontend', label: 'Frontend', icon: <Globe size={18} /> },
    { id: 'backend', label: 'Backend', icon: <Database size={18} /> },
    { id: 'tools', label: 'Tools & DevOps', icon: <Code size={18} /> },
    { id: 'all', label: 'All Skills', icon: <Code size={18} /> }
  ]

  const getAllSkills = () => {
    return Object.values(skillCategories).flatMap(category => category.skills)
  }

  const filteredSkills = activeCategory === 'all'
    ? getAllSkills()
    : skillCategories[activeCategory]?.skills || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Simple CSS animation trigger
            const elements = entry.target.querySelectorAll('.animate-on-scroll')
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animated')
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <AnimatedBackground
        particleCount={60}
        connectionDistance={130}
        speed={0.25}
        opacity={0.35}
      />
      <div className="skills-background">
        <div className="skills-orb orb-1"></div>
        <div className="skills-orb orb-2"></div>
        <div className="skills-orb orb-3"></div>
      </div>

      {/* Background Lines */}
      <div className="skills-lines">
        <div className="skills-bg-line skills-line-1"></div>
        <div className="skills-bg-line skills-line-2"></div>
        <div className="skills-bg-line skills-line-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="skills-floating">
        <div className="skills-float-element skills-float-1">
          <Code size={20} />
        </div>
        <div className="skills-float-element skills-float-2">
          <Database size={18} />
        </div>
        <div className="skills-float-element skills-float-3">
          <Palette size={16} />
        </div>
        <div className="skills-float-element skills-float-4">
          <Zap size={22} />
        </div>
      </div>

      <div className="container">
        <div className="skills-header">
          <h2 className="skills-title animate-on-scroll">
            Skills & Technologies
          </h2>
        </div>

        <div className="skills-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn animate-on-scroll ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="skills-content">
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div key={skill.name} className="skill-card animate-on-scroll">
                <div className="skill-header">
                  <div className="skill-info">
                    <div
                      className="skill-icon"
                      style={{ backgroundColor: skill.color + '20' }}
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        width={24}
                        height={24}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>
                  </div>
                  {skill.description && (
                    <p className="skill-description">{skill.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
