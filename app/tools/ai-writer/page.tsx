'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  PenTool, Sparkles, Copy, Check, Loader2, 
  FileText, Mail, MessageSquare, Briefcase, RefreshCw
} from 'lucide-react'

const writingTypes = [
  { id: 'blog', name: 'Blog Post', icon: FileText, prompt: 'Write a blog post about' },
  { id: 'email', name: 'Email', icon: Mail, prompt: 'Write a professional email about' },
  { id: 'social', name: 'Social Media', icon: MessageSquare, prompt: 'Write a social media post about' },
  { id: 'business', name: 'Business Copy', icon: Briefcase, prompt: 'Write business copy about' },
]

const tones = ['Professional', 'Casual', 'Friendly', 'Formal', 'Persuasive', 'Informative']

// Template-based content generation
function generateContent(topic: string, type: string, tone: string): string {
  const topicCapitalized = topic.charAt(0).toUpperCase() + topic.slice(1)
  
  const templates: Record<string, Record<string, string>> = {
    blog: {
      Professional: `# ${topicCapitalized}: A Comprehensive Guide

## Introduction

In today's fast-paced world, understanding ${topic} has become more important than ever. This comprehensive guide will walk you through everything you need to know about ${topic}, from the basics to advanced concepts.

## Why ${topicCapitalized} Matters

${topicCapitalized} plays a crucial role in our daily lives. Whether you're a beginner or an expert, there's always something new to learn about this fascinating subject.

### Key Benefits:
- Improved efficiency and productivity
- Better understanding of core concepts
- Enhanced decision-making capabilities
- Long-term value and growth potential

## Getting Started with ${topicCapitalized}

The first step to mastering ${topic} is to understand its fundamental principles. Here's what you need to know:

1. **Start with the basics** - Build a strong foundation
2. **Practice regularly** - Consistency is key
3. **Stay updated** - The field is constantly evolving
4. **Connect with experts** - Learn from those who've succeeded

## Best Practices

When working with ${topic}, consider these proven strategies:

- Set clear goals and objectives
- Measure your progress regularly
- Adapt and improve your approach
- Share knowledge with others

## Conclusion

${topicCapitalized} offers incredible opportunities for growth and success. By following the guidelines in this post, you'll be well on your way to mastering this essential skill.

---
*What's your experience with ${topic}? Share your thoughts in the comments below!*`,

      Casual: `Hey there! 👋

So you want to learn about ${topic}? You've come to the right place!

Let me break it down for you in simple terms...

**What's the deal with ${topicCapitalized}?**

Honestly, ${topic} is pretty awesome once you get the hang of it. I remember when I first started exploring this topic - it seemed overwhelming at first, but trust me, it gets easier!

**Here's what I've learned:**

• Start small and work your way up
• Don't be afraid to make mistakes
• The community is super helpful
• There's always something new to discover

**My Top Tips:**

1. Just dive in and experiment
2. Find resources that match your learning style
3. Practice, practice, practice
4. Have fun with it!

The cool thing about ${topic} is that there's no "wrong" way to approach it. Everyone's journey is different, and that's totally okay.

**What's Next?**

Ready to level up your ${topic} game? Start by picking one small thing to focus on this week. You'll be surprised how much progress you can make!

Catch you later! ✌️`,

      Friendly: `Hi friend! Let's talk about ${topic}!

I'm so excited to share this with you because ${topic} is something I'm really passionate about. Whether you're just getting started or looking to learn more, I think you'll find this helpful.

**Why I Love ${topicCapitalized}**

There's something special about ${topic} that draws people in. Maybe it's the endless possibilities, or maybe it's the sense of accomplishment you get when things click into place.

**Here's What You Should Know:**

First things first - don't worry if it seems complicated at the beginning. We've all been there! The important thing is to take it one step at a time.

Some friendly advice:
- Be patient with yourself
- Celebrate small wins
- Ask questions when you're stuck
- Remember why you started

**Let's Do This Together!**

I believe in you! ${topicCapitalized} might seem challenging, but with the right mindset and a bit of persistence, you'll do great.

Feel free to reach out if you have any questions. I'm always happy to help!

Warmly,
Your friendly guide 💙`,

      Formal: `# Executive Summary: ${topicCapitalized}

## Abstract

This document provides a comprehensive analysis of ${topic}, examining its significance, applications, and future implications in the current landscape.

## 1. Introduction

${topicCapitalized} represents a significant area of focus for professionals and organizations seeking to optimize their operations and achieve strategic objectives.

## 2. Background and Context

The importance of ${topic} has grown substantially in recent years, driven by technological advancements and evolving market demands.

### 2.1 Historical Development
The evolution of ${topic} can be traced through several key phases of development and innovation.

### 2.2 Current State of Affairs
Present-day applications of ${topic} demonstrate its versatility and essential nature in professional environments.

## 3. Analysis

### 3.1 Key Components
- Strategic framework development
- Implementation methodologies
- Performance measurement criteria
- Quality assurance protocols

### 3.2 Best Practices
Organizations implementing ${topic} should consider the following approaches:
1. Comprehensive planning and assessment
2. Stakeholder engagement and communication
3. Continuous monitoring and evaluation
4. Iterative improvement processes

## 4. Recommendations

Based on our analysis, we recommend the following course of action for organizations seeking to leverage ${topic}:

1. Conduct thorough needs assessment
2. Develop clear implementation roadmap
3. Allocate appropriate resources
4. Establish measurement frameworks

## 5. Conclusion

${topicCapitalized} presents significant opportunities for organizations prepared to invest in understanding and implementation. Success requires commitment, resources, and strategic vision.`,

      Persuasive: `# Why You Need to Pay Attention to ${topicCapitalized} Right Now

**The truth is:** ${topic} is changing everything, and those who understand it are already ahead.

## Here's What's at Stake

Every day, countless people miss opportunities because they haven't taken the time to understand ${topic}. Don't be one of them.

**Consider this:**
- Early adopters are seeing remarkable results
- The gap between those who know and those who don't is growing
- Now is the perfect time to get started

## The Evidence Is Clear

${topicCapitalized} isn't just a trend - it's a fundamental shift in how things work. Those who embrace it are:

✓ More efficient in their work
✓ Better positioned for success
✓ Ahead of their competition
✓ Ready for what's next

## What's Holding You Back?

Maybe you think ${topic} is too complex. Maybe you're waiting for the "right time." But here's the reality: the best time to start was yesterday. The second best time is now.

## Take Action Today

You have two choices:
1. Continue as you are and hope for the best
2. Embrace ${topic} and take control of your future

The decision is yours, but remember - in a world that's constantly evolving, standing still means falling behind.

**Ready to make a change?** Start your journey with ${topic} today. Your future self will thank you.`,

      Informative: `# Understanding ${topicCapitalized}: A Complete Overview

## What is ${topicCapitalized}?

${topicCapitalized} refers to a comprehensive approach that encompasses various elements and methodologies designed to achieve specific outcomes. This guide provides essential information about ${topic} for anyone seeking to expand their knowledge.

## Key Concepts

### Definition
${topicCapitalized} can be defined as a systematic approach to understanding and implementing practices related to this field.

### Core Components
1. **Fundamental Principles** - The basic building blocks
2. **Methodologies** - Approaches to implementation
3. **Tools and Resources** - What you need to succeed
4. **Metrics and Evaluation** - How to measure success

## Historical Context

${topicCapitalized} has evolved significantly over time. Understanding this history provides valuable context for current practices and future developments.

## Current Applications

Today, ${topic} is applied in numerous contexts:
- Personal development
- Professional settings
- Educational environments
- Research and innovation

## Getting Started

For those new to ${topic}, here's a structured approach:

**Step 1:** Familiarize yourself with basic terminology
**Step 2:** Identify reliable resources for learning
**Step 3:** Start with foundational concepts
**Step 4:** Practice and apply what you learn
**Step 5:** Seek feedback and continue improving

## Resources for Further Learning

- Academic publications and research papers
- Online courses and tutorials
- Professional communities and forums
- Books and reference materials

## Summary

${topicCapitalized} offers valuable knowledge and skills that can be applied in various contexts. By understanding its core principles and applications, you can effectively leverage this knowledge for personal and professional growth.`
    },
    email: {
      Professional: `Subject: Regarding ${topicCapitalized}

Dear [Recipient],

I hope this email finds you well. I am writing to discuss ${topic} and its relevance to our ongoing initiatives.

After careful consideration, I believe that ${topic} presents a significant opportunity for our organization. The potential benefits include improved efficiency, enhanced outcomes, and long-term strategic value.

Key points for your consideration:
• Current market trends indicate growing importance of ${topic}
• Our competitors are already investing in this area
• Early action could provide competitive advantages
• The ROI potential is substantial

I would welcome the opportunity to discuss this matter further at your earliest convenience. Please let me know if you have any questions or would like to schedule a meeting to explore this topic in greater detail.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Title]
[Contact Information]`,

      Casual: `Hey!

Quick note about ${topic} - thought you might find this interesting!

So I've been looking into ${topic} lately, and honestly, there's some cool stuff happening. Figured I'd share since I know you're into this kind of thing.

The highlights:
- It's easier to get started than you might think
- There are some great resources out there
- The results people are seeing are pretty impressive

Want to chat about it sometime? I'd love to hear your thoughts!

Let me know when you're free!

Cheers,
[Your Name]`,

      Friendly: `Hi there!

Hope you're having a great day! I wanted to reach out about ${topic} - I think you'll find this really interesting!

I've been exploring ${topic} recently, and I'm genuinely excited about what I've discovered. It has so much potential, and I immediately thought of you!

Here's what caught my attention:
- The possibilities are endless
- It's actually quite accessible once you dive in
- The community is incredibly supportive

I'd love to hear your perspective on this. Maybe we could grab coffee sometime and chat about it?

Looking forward to hearing from you!

Warmly,
[Your Name]`,

      Formal: `Subject: Formal Inquiry Regarding ${topicCapitalized}

Dear Sir/Madam,

I am writing to formally inquire about ${topic} and its potential applications within our professional context.

As you may be aware, ${topic} has gained considerable attention in recent months due to its demonstrated value in various sectors. Given these developments, I believe it would be prudent to explore how we might integrate relevant aspects into our current operations.

I respectfully request the following:
1. Comprehensive documentation regarding ${topic}
2. An opportunity to discuss potential implementation strategies
3. Access to relevant case studies or precedents
4. Scheduling of a formal review meeting

Please advise on your availability for a meeting at your earliest convenience. I am prepared to provide additional information as required.

Thank you for your attention to this matter.

Yours faithfully,
[Your Full Name]
[Position/Title]
[Organization]
[Date]`,

      Persuasive: `Subject: Don't Miss This Opportunity - ${topicCapitalized}

Hi [Name],

I need to share something important with you about ${topic}.

You know how we've been looking for ways to improve our results? Well, I've found something that could be exactly what we need.

Here's the thing about ${topic}:
→ It's already helping others achieve incredible results
→ The timing couldn't be better
→ The investment is minimal compared to the potential returns

I know you're busy, but this really deserves 10 minutes of your time. The opportunity won't be around forever, and I'd hate for us to miss out.

Can we schedule a quick call this week? I promise it'll be worth it.

Looking forward to your response,
[Your Name]

P.S. I've seen the numbers, and they're impressive. Let's talk!`,

      Informative: `Subject: Information Regarding ${topicCapitalized}

Dear [Recipient],

I am reaching out to provide you with information about ${topic} that may be relevant to your interests.

Overview:
${topicCapitalized} encompasses a range of concepts and practices that have demonstrated value in various applications.

Key Information:
1. Background: ${topicCapitalized} has developed significantly over recent years
2. Applications: Multiple use cases have been identified and validated
3. Benefits: Research indicates substantial potential advantages
4. Resources: Various learning materials are available

Relevant Details:
- Implementation typically requires moderate initial investment
- Results are generally measurable within defined timeframes
- Support and resources are widely available
- Best practices have been well documented

Please find attached additional documentation for your reference. Should you require further information or have any questions, please do not hesitate to contact me.

Best regards,
[Your Name]
[Contact Information]`
    },
    social: {
      Professional: `🎯 Let's talk about ${topic}

In today's competitive landscape, understanding ${topic} isn't just an advantage - it's essential.

Here are 3 key insights:

1️⃣ Strategy matters more than ever
2️⃣ Early adopters are seeing real results  
3️⃣ The time to act is now

What's your take on ${topic}? I'd love to hear your perspective in the comments.

#${topic.replace(/\s+/g, '')} #Professional #Growth #Insights`,

      Casual: `okay but can we talk about ${topic} for a sec? 👀

been diving deep into this lately and WOW

the things i've learned... 🤯

anyone else exploring ${topic}? drop your thoughts below! 

#${topic.replace(/\s+/g, '')} #Learning #Explore`,

      Friendly: `Hey friends! 💙

I've been learning about ${topic} and wanted to share some thoughts with you all!

It's been such an interesting journey, and I'm grateful for this community that makes learning so much fun.

What have you discovered about ${topic}? Let's chat in the comments! 

#${topic.replace(/\s+/g, '')} #Community #Learning #Together`,

      Formal: `Pleased to share insights on ${topicCapitalized}.

This subject represents a significant area of focus for professionals seeking to enhance their knowledge and capabilities.

Key observations:
• Substantial growth in relevance
• Increasing professional applications
• Notable return on investment

I welcome your professional perspectives on this matter.

#${topic.replace(/\s+/g, '')} #ProfessionalDevelopment #Industry`,

      Persuasive: `🚀 ${topicCapitalized} is changing everything

And most people are missing out.

Here's what the top performers know about ${topic}:
✓ It's not as complicated as you think
✓ The results speak for themselves
✓ Starting now gives you an edge

Don't be left behind. Start exploring ${topic} today.

Who's ready to level up? 🙋‍♀️

#${topic.replace(/\s+/g, '')} #Success #Growth #Action`,

      Informative: `📚 Quick facts about ${topicCapitalized}

Here's what you should know:

📌 Definition: A comprehensive approach to achieving specific outcomes
📌 Applications: Used across various fields and industries
📌 Benefits: Improved efficiency and measurable results
📌 Getting Started: Multiple resources available for beginners

Want to learn more? Save this post for reference!

#${topic.replace(/\s+/g, '')} #Education #Facts #KnowledgeSharing`
    },
    business: {
      Professional: `# ${topicCapitalized}: Driving Business Success

## Value Proposition

${topicCapitalized} represents a strategic opportunity for businesses seeking competitive advantage in today's market.

### Key Benefits:
- **Increased Efficiency**: Streamline operations and reduce costs
- **Enhanced Performance**: Achieve measurable improvements
- **Competitive Edge**: Stay ahead of market trends
- **Sustainable Growth**: Build long-term value

### Why Choose ${topicCapitalized}?

Organizations implementing ${topic} strategies report significant improvements in their key performance indicators. Our approach combines industry best practices with innovative solutions.

### Next Steps

Contact us today to discover how ${topic} can transform your business operations.

*Results. Innovation. Excellence.*`,

      Casual: `Hey there! 

Looking for something to boost your business? Let me tell you about ${topic}...

It's pretty simple: ${topic} helps you work smarter, not harder. And who doesn't want that, right?

Here's the deal:
→ Save time on the stuff that matters
→ Get better results without the extra stress
→ Actually enjoy watching your business grow

Sound good? Let's chat!`,

      Friendly: `Hi there! 👋

Let's have a friendly chat about how ${topic} can help your business thrive!

I know running a business can be overwhelming sometimes, but here's the good news - ${topic} is designed to make things easier, not more complicated.

What you can expect:
💡 Simple solutions to complex problems
💡 Support every step of the way
💡 Real results you can measure

We're here to help you succeed. Reach out anytime - we'd love to hear from you!`,

      Formal: `# ${topicCapitalized}: A Business Solution

## Executive Overview

This document outlines the business applications of ${topic} and its potential to deliver substantial value to organizations.

## Strategic Value

${topicCapitalized} addresses key business challenges:
1. Operational efficiency
2. Cost optimization
3. Performance enhancement
4. Market competitiveness

## Implementation Framework

Our structured approach ensures successful implementation:
- Phase 1: Assessment and Planning
- Phase 2: Development and Testing
- Phase 3: Deployment and Integration
- Phase 4: Monitoring and Optimization

## Contact Information

For formal inquiries regarding ${topic} solutions, please contact our business development team.`,

      Persuasive: `# Stop Leaving Money on the Table

Your competitors are already using ${topic}. Are you?

## The Hard Truth

Every day without ${topic} costs your business:
❌ Lost opportunities
❌ Wasted resources
❌ Falling behind competitors

## The Solution

${topicCapitalized} delivers:
✅ Immediate improvements
✅ Measurable ROI
✅ Sustainable advantage

## Limited Time Offer

Act now and receive a complimentary consultation worth $500.

**Don't wait. Your success depends on it.**

[Get Started Today]`,

      Informative: `# ${topicCapitalized}: Business Information Guide

## Overview

${topicCapitalized} provides businesses with tools and strategies for improved performance and growth.

## Features

- **Analysis Tools**: Comprehensive data insights
- **Implementation Support**: Expert guidance
- **Performance Tracking**: Measurable metrics
- **Ongoing Optimization**: Continuous improvement

## Applications

${topicCapitalized} is applicable across various business functions:
1. Operations management
2. Customer relations
3. Marketing and sales
4. Strategic planning

## Getting Started

To learn more about implementing ${topic} in your business, please contact our information team for detailed documentation and resources.`
    }
  }

  return templates[type]?.[tone] || templates.blog.Professional
}

export default function AIWriterPage() {
  const [topic, setTopic] = useState('')
  const [writingType, setWritingType] = useState('blog')
  const [tone, setTone] = useState('Professional')
  const [copied, setCopied] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return
    
    setLoading(true)
    setGeneratedText('')
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const content = generateContent(topic, writingType, tone)
    setGeneratedText(content)
    setLoading(false)
  }

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Writing Assistant</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Generate high-quality content for blogs, emails, social media, and more instantly
            </p>
          </div>

          {/* Tool Interface */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            {/* Writing Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">What do you want to write?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {writingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setWritingType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      writingType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      writingType === type.id ? 'text-blue-600' : 'text-slate-400'
                    }`} />
                    <span className="text-sm font-medium text-slate-700">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Topic or Description</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic (e.g., 'digital marketing', 'healthy eating', 'productivity tips')"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none"
              />
            </div>

            {/* Tone Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      tone === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5" />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Output */}
          {(generatedText || loading) && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Generated Content</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !topic.trim()}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!generatedText}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-xl max-h-[500px] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating your content...
                    </div>
                  ) : generatedText}
                </div>
              </div>
            </div>
          )}

          {/* How to Use */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use AI Writing Assistant</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Choose Type', desc: 'Select blog post, email, social media, or business copy' },
                { step: '2', title: 'Enter Topic', desc: 'Type your topic like "digital marketing" or "fitness tips"' },
                { step: '3', title: 'Get Content', desc: 'Click generate and copy your professionally written content' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
