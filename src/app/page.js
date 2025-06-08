"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Code, Mail, MessageSquare, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const aboutY = useTransform(scrollYProgress, [0.15, 0.3], [50, 0])
  const servicesY = useTransform(scrollYProgress, [0.35, 0.5], [50, 0])
  const portfolioY = useTransform(scrollYProgress, [0.55, 0.7], [50, 0])
  const contactY = useTransform(scrollYProgress, [0.75, 0.9], [50, 0])

  // Handle intersection observer to determine active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [heroRef.current, aboutRef.current, servicesRef.current, portfolioRef.current, contactRef.current]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {["hero", "about", "services", "portfolio", "contact"].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section ? "bg-slate-800 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        style={{ y: heroY }}
        className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-block">
            <motion.div
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              RPQuest
            </motion.div>
          </div>
          <h1 className="text-xl md:text-2xl text-slate-600 mb-8 font-light">
            Your Dev Partner for Shopify & the Modern Web
          </h1>
          <Button
            onClick={() => scrollToSection("contact")}
            className="rounded-full px-8 py-6 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white"
          >
            {"Let's Work Together"}
          </Button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <ArrowDown className="animate-bounce text-slate-400" onClick={() => scrollToSection("about")} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        style={{ y: aboutY }}
        className="min-h-screen flex items-center justify-center px-6 py-20 bg-white/50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                {
                  "Hi, I'm Romain Pena, a freelance web developer passionate about creating beautiful, functional websites and e-commerce solutions."
                }
              </p>
              <p className="text-slate-600 leading-relaxed">
                With expertise in Shopify development and modern web technologies, I help businesses establish a strong
                online presence that converts visitors into customers.
              </p>
              <p className="text-slate-600 leading-relaxed">
                {
                  "I'm currently looking for projects involving e-commerce development, custom web applications, and performance optimization."
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-xl">
              <h3 className="text-xl font-medium mb-4 text-slate-700">Skills & Expertise</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">Shopify</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">React</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">Next.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">JavaScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">UI/UX Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">API Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  <span className="text-slate-600">Performance</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        ref={servicesRef}
        style={{ y: servicesY }}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-800 text-center">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Shopify Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="text-slate-700" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-slate-800">Shopify Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Custom Shopify store development, theme customization, app integration, and optimization for conversions
                and performance.
              </p>
            </motion.div>

            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Code className="text-slate-700" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-slate-800">Web Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Modern, responsive websites built with React, Next.js, and Tailwind CSS. Focus on performance,
                accessibility, and user experience.
              </p>
            </motion.div>

            {/* Consulting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="text-slate-700" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3 text-slate-800">Consulting</h3>
              <p className="text-slate-600 leading-relaxed">
                Technical advice, e-commerce strategy, performance audits, and guidance on improving your web presence
                and digital customer experience.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        id="portfolio"
        ref={portfolioRef}
        style={{ y: portfolioY }}
        className="min-h-screen flex items-center justify-center px-6 py-20 bg-white/50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">Portfolio</h2>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-12 shadow-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-medium text-slate-700">Coming Soon</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                My portfolio is currently being updated with recent projects. In the meantime, feel free to check out my
                GitHub or contact me directly.
              </p>
              <div className="pt-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <span className="underline underline-offset-4">Visit GitHub</span>
                </Link>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-slate-200 rounded-full opacity-30"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        ref={contactRef}
        style={{ y: contactY }}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                {
                  "Interested in working together? Have questions about my services? I'd love to hear from you. Fill out the form or reach out directly."
                }
              </p>
              <div className="flex items-center gap-3">
                <Mail className="text-slate-700" size={20} />
                <a
                  href="mailto:romainpena@gmail.com"
                  className="text-slate-700 hover:text-slate-900 transition-colors underline underline-offset-4"
                >
                  romainpena@gmail.com
                </a>
              </div>
              <div className="pt-4">
                <p className="text-slate-500 text-sm">I typically respond within 24-48 hours.</p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <Input type="text" placeholder="Name" className="bg-white border-slate-200 focus:border-slate-500" />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white border-slate-200 focus:border-slate-500"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Subject"
                    className="bg-white border-slate-200 focus:border-slate-500"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    className="bg-white border-slate-200 focus:border-slate-500 min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} RPQuest | Romain Pena</p>
        </div>
      </footer>
    </div>
  )
}
