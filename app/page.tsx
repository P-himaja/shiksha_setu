"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Brain,
  Users,
  Zap,
  Globe,
  Mic,
  Upload,
  Target,
  TrendingUp,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  MessageSquare,
  FileText,
  BarChart3,
  Sparkles,
  MicOff,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/ui/navigation"
import { ProfilePage } from "@/components/ui/profile-page"

type PageType = "home" | "contact" | "profile"

// Contact Page Component
const ContactPage = ({ setCurrentPage }: { setCurrentPage: (page: PageType) => void }) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation currentPage="contact" setCurrentPage={setCurrentPage} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <MessageSquare className="w-4 h-4 mr-1" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about ShikshaSetu? We're here to help you on your learning journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us more about your question or feedback..."
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-gray-600">support@shikshasetu.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600">+91 1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-gray-600">123 Education Hub, New Delhi, India</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Support Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 9AM-6PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How does the AI tutoring work?</h4>
                  <p className="text-sm text-gray-600">
                    Our AI analyzes your textbook content and creates personalized learning experiences with practical
                    applications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Is ShikshaSetu free to use?</h4>
                  <p className="text-sm text-gray-600">
                    We offer a free tier with basic features. Premium plans unlock advanced AI capabilities and
                    unlimited access.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Which languages are supported?</h4>
                  <p className="text-sm text-gray-600">
                    We support 15+ languages including Hindi, English, Tamil, Bengali, and more regional languages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main ShikshaSetu Component
export default function ShikshaSetu() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [uploadedFile, setUploadedFile] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [userQuestion, setUserQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [recognition, setRecognition] = useState<any>(null)

  const handleFileUpload = () => {
    setUploadedFile("Mathematics Chapter 5: Percentages")
    setTimeout(() => {
      setGeneratedContent(
        "🛒 Real-world Application: Grocery Shopping Discounts\n\n• Calculate 15% discount on ₹800 grocery bill\n• Compare prices with different percentage offers\n• Practice tip calculation at restaurants\n\n🎯 Daily Challenge: Find 3 percentage uses in your daily life!",
      )
    }, 1500)
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setUserQuestion("Listening...")
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setUserQuestion(transcript)
        generateAIResponse(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
        setUserQuestion("Sorry, I couldn't hear you. Please try again.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
      setRecognition(recognition)
    } else {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.")
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsListening(false)
  }

  const generateAIResponse = (question: string) => {
    setTimeout(() => {
      let response = ""
      if (question.toLowerCase().includes("math") || question.toLowerCase().includes("calculate")) {
        response =
          "Let me help you with this math problem! For calculations, I recommend breaking it down into smaller steps. What specific calculation are you working on?"
      } else if (question.toLowerCase().includes("science") || question.toLowerCase().includes("physics")) {
        response =
          "Great science question! Let me explain this concept with a simple example. Science is all about understanding how things work around us."
      } else if (question.toLowerCase().includes("history")) {
        response =
          "History helps us understand the past to make sense of the present. What specific historical topic would you like to explore?"
      } else if (question.toLowerCase().includes("english") || question.toLowerCase().includes("grammar")) {
        response =
          "English can be tricky, but I'm here to help! Let's work through this step by step. What specific grammar or writing concept are you struggling with?"
      } else {
        response = `I heard your question: "${question}". This is a great question! Let me help you understand this concept better. Can you provide more details about what specifically you'd like to know?`
      }

      setAiResponse(response)
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.rate = 0.8
        utterance.pitch = 1
        window.speechSynthesis.speak(utterance)
      }
    }, 1000)
  }

  // Render different pages based on current page state
  if (currentPage === "contact") {
    return <ContactPage setCurrentPage={setCurrentPage} />
  }

  if (currentPage === "profile") {
    return <ProfilePage setCurrentPage={setCurrentPage} />
  }

  // Original home page content with updated navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered Learning Revolution
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Learning
              </span>{" "}
              Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your studies with AI that creates practical applications, solves your doubts instantly, and
              makes learning engaging and accessible in your preferred language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/agents">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "50K+", label: "Students Learning", icon: Users },
              { number: "1M+", label: "Questions Solved", icon: MessageSquare },
              { number: "15+", label: "Languages Supported", icon: Globe },
              { number: "95%", label: "Improvement Rate", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience ShikshaSetu</h2>
            <p className="text-xl text-gray-600">See how our AI transforms your learning experience</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Smart Practice Agent
                </CardTitle>
                <CardDescription>Upload your textbook chapter and get instant practical applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                  {!uploadedFile ? (
                    <div>
                      <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <Button onClick={handleFileUpload} variant="outline" className="border-blue-200 bg-transparent">
                        Upload Chapter
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">Try with sample: Math Chapter 5</p>
                    </div>
                  ) : (
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{uploadedFile}</span>
                      </div>
                      {generatedContent && (
                        <div className="bg-blue-50 p-4 rounded-lg mt-4">
                          <pre className="text-sm whitespace-pre-wrap">{generatedContent}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-green-600" />
                  Voice-Enabled Doubt Solving
                </CardTitle>
                <CardDescription>Ask any question in your preferred language and get instant help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userQuestion && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Your Question:</span>
                      </div>
                      <p className="text-sm">{userQuestion}</p>
                    </div>
                  )}
                  {aiResponse && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">AI Response:</span>
                      </div>
                      <p className="text-sm">{aiResponse}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      className={`flex-1 ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Ask Question
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Click the microphone and ask any question about math, science, history, or any subject!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Student Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Study Material Generator
                </CardTitle>
                <CardDescription>Get personalized study materials and summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Generated for You:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Simplified explanations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Practice questions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Quick revision notes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Memory techniques
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Generate Study Materials</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  Progress Tracker
                </CardTitle>
                <CardDescription>Track your learning progress and identify improvement areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Your Progress:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mathematics</span>
                        <span className="text-green-600">85% mastery</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Science</span>
                        <span className="text-blue-600">78% mastery</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>English</span>
                        <span className="text-yellow-600">65% mastery</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">View Detailed Progress</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-gray-600">Powerful features designed specifically for students</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Smart Practice Agent",
                description:
                  "AI generates practical applications from any textbook content, making abstract concepts tangible and relevant to your daily life.",
                color: "blue",
              },
              {
                icon: Target,
                title: "Upload Educational PDFs like textbooks or notes.",
                description:
                  "Our system reads and processes the content into smart knowledge chunks using RAG (Retrieval-Augmented Generation), making it searchable and ready for AI-powered doubt solving and lesson planning.",
                color: "green",
              },
              {
                icon: Lightbulb,
                title: "Study Material Generator",
                description:
                  "Teachers can enter a topic and get a tailored lesson plan with learning objectives, key points, and suggested activities—powered by the uploaded content.",
                color: "purple",
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                description:
                  "Voice-enabled doubt solving in 15+ languages including Hindi, English, Tamil, Bengali, and more.",
                color: "orange",
              },
              {
                icon: Zap,
                title: "Offline Learning",
                description: "Download content and continue learning even without internet connectivity.",
                color: "red",
              },
              {
                icon: BarChart3,
                title: "Progress Analytics",
                description:
                  "Track your learning journey with detailed insights and personalized improvement suggestions.",
                color: "indigo",
              },
            ].map((feature, index) => (
              <Card key={index} className={`border-${feature.color}-200 hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Students Love ShikshaSetu</h2>
            <p className="text-xl text-gray-600">Hear from students who transformed their learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Sharma",
                role: "Class 12 Student",
                content:
                  "ShikshaSetu helped me understand calculus by showing how it applies to animation and game design. Now math feels relevant to my future career!",
                rating: 5,
              },
              {
                name: "Priya Patel",
                role: "Class 10 Student",
                content:
                  "Being able to ask questions in Gujarati and get explanations has made learning so much easier. The voice feature is amazing!",
                rating: 5,
              },
              {
                name: "Rahul Kumar",
                role: "Engineering Student",
                content:
                  "The practice questions generated from my textbooks are exactly what I need for exam prep. It's like having a personal tutor 24/7!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Affordable Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your learning needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "₹0",
                description: "Perfect to get started",
                features: [
                  "5 AI-generated applications per day",
                  "Basic voice doubt solving",
                  "Simple progress tracking",
                  "Community support",
                ],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Student Pro",
                price: "₹199",
                period: "/month",
                description: "For serious learners",
                features: [
                  "Unlimited AI applications",
                  "Advanced voice doubt solving",
                  "Detailed progress analytics",
                  "Offline content download",
                  "Priority support",
                ],
                cta: "Upgrade Now",
                popular: true,
              },
              {
                name: "Student Premium",
                price: "₹499",
                period: "/month",
                description: "Complete learning solution",
                features: [
                  "Everything in Student Pro",
                  "1-on-1 AI tutoring sessions",
                  "Custom study plans",
                  "Exam preparation modules",
                  "24/7 dedicated support",
                ],
                cta: "Go Premium",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    {plan.period && <span className="text-lg text-gray-600">{plan.period}</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already using ShikshaSetu to make learning more engaging and effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Free
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              onClick={() => setCurrentPage("contact")}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Ask a Question
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ShikshaSetu</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your personal AI learning companion, making quality education accessible to every student.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Student Community
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShikshaSetu. All rights reserved. Empowering students through AI-powered learning.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
