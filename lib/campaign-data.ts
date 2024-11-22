export const campaignData = {
  "1": {
    id: 1,
    name: "Welcome Series",
    type: "workflow",
    status: "Active",
    subject: "Welcome to Our Platform! 👋",
    content: "Dear subscriber, \n\nWelcome to our platform! We're excited to have you on board...",
    recipients: 1250,
    sentDate: "Running",
    stats: {
      openRate: "45%",
      clickRate: "22.5%"
    },
    emails: [
      { id: "1", subject: "Welcome to Our Platform! 👋", waitDays: 0 },
      { id: "2", subject: "Getting Started Guide", waitDays: 2 },
      { id: "3", subject: "Discover Key Features", waitDays: 4 },
      { id: "4", subject: "Tips & Tricks for Success", waitDays: 7 }
    ]
  },
  "2": {
    id: 2,
    name: "Monthly Newsletter",
    type: "broadcast",
    status: "Scheduled",
    subject: "Your March 2024 Newsletter 📰",
    content: "Hello there! \n\nHere's what's new this month...",
    recipients: 5000,
    sentDate: "Mar 15, 2024",
    stats: {
      openRate: "0%",
      clickRate: "0%"
    }
  },
  "3": {
    id: 3,
    name: "Product Launch",
    type: "broadcast",
    status: "Draft",
    subject: "Introducing Our Latest Feature 🚀",
    content: "Hi {first_name}, \n\nWe're thrilled to announce our newest feature...",
    recipients: 10000,
    sentDate: "Not sent",
    stats: {
      openRate: "0%",
      clickRate: "0%"
    }
  },
  "4": {
    id: 4,
    name: "Customer Onboarding",
    type: "workflow",
    status: "Active",
    subject: "Welcome to Your Journey! 🌟",
    content: "Dear {first_name}, \n\nWe're excited to help you get started...",
    recipients: 850,
    sentDate: "Running",
    stats: {
      openRate: "50%",
      clickRate: "35%"
    },
    emails: [
      { id: "1", subject: "Welcome to Your Journey! 🌟", waitDays: 0 },
      { id: "2", subject: "First Steps to Success", waitDays: 1 },
      { id: "3", subject: "Exploring Core Features", waitDays: 3 },
      { id: "4", subject: "Advanced Tips & Tricks", waitDays: 5 },
      { id: "5", subject: "Mastering the Platform", waitDays: 7 },
      { id: "6", subject: "Your Success Story", waitDays: 14 }
    ]
  },
  "5": {
    id: 5,
    name: "Trial User Engagement",
    type: "workflow",
    status: "Active",
    subject: "Make the Most of Your Trial! ⭐",
    content: "Hi {first_name}, \n\nLet's make your trial period count...",
    recipients: 2100,
    sentDate: "Running",
    stats: {
      openRate: "70%",
      clickRate: "45%"
    },
    emails: [
      { id: "1", subject: "Make the Most of Your Trial! ⭐", waitDays: 0 },
      { id: "2", subject: "Quick Start Guide", waitDays: 1 },
      { id: "3", subject: "Hidden Features You'll Love", waitDays: 2 },
      { id: "4", subject: "Success Stories from Users", waitDays: 4 },
      { id: "5", subject: "Special Trial User Offer", waitDays: 7 }
    ]
  }
};