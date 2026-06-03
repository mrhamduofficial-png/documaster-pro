'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  Code, Sparkles, Copy, Check, Loader2, RefreshCw,
  Terminal, FileCode
} from 'lucide-react'

const languages = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
  { id: 'sql', name: 'SQL', icon: '🗃️' },
  { id: 'react', name: 'React', icon: '⚛️' },
]

// Code templates for different languages and scenarios
const codeTemplates: Record<string, Record<string, string>> = {
  python: {
    'function': `# Python Function Example
def process_data(data: list, filter_value: str = None) -> list:
    """
    Process a list of data items with optional filtering.
    
    Args:
        data: List of items to process
        filter_value: Optional filter string
    
    Returns:
        Processed list of items
    """
    if not data:
        return []
    
    result = []
    for item in data:
        # Apply filter if provided
        if filter_value and filter_value not in str(item):
            continue
        result.append(item)
    
    return result

# Example usage
if __name__ == "__main__":
    sample_data = ["apple", "banana", "cherry", "date"]
    filtered = process_data(sample_data, "a")
    print(f"Filtered results: {filtered}")`,

    'class': `# Python Class Example
from datetime import datetime
from typing import Optional, List

class User:
    """A class representing a user in the system."""
    
    def __init__(self, name: str, email: str):
        self.id = id(self)
        self.name = name
        self.email = email
        self.created_at = datetime.now()
        self.is_active = True
    
    def greet(self) -> str:
        """Return a greeting message."""
        return f"Hello, I'm {self.name}!"
    
    def deactivate(self) -> None:
        """Deactivate the user account."""
        self.is_active = False
    
    def __str__(self) -> str:
        status = "active" if self.is_active else "inactive"
        return f"User({self.name}, {self.email}, {status})"
    
    @classmethod
    def create_guest(cls) -> 'User':
        """Create a guest user."""
        return cls("Guest", "guest@example.com")

# Example usage
if __name__ == "__main__":
    user = User("John Doe", "john@example.com")
    print(user.greet())
    print(user)`,

    'api': `# Python FastAPI Example
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="My API")

# Data model
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float

# In-memory storage
items: List[Item] = []

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

@app.get("/items", response_model=List[Item])
async def get_items():
    return items

@app.post("/items", response_model=Item)
async def create_item(item: Item):
    item.id = len(items) + 1
    items.append(item)
    return item

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")`,

    'default': `# Python Code
# Generated based on your description

def main():
    """Main function to run the program."""
    print("Hello, World!")
    
    # Your code logic here
    data = {
        "name": "Example",
        "value": 42,
        "items": ["a", "b", "c"]
    }
    
    # Process data
    for key, value in data.items():
        print(f"{key}: {value}")
    
    return data

if __name__ == "__main__":
    result = main()
    print(f"Result: {result}")`
  },

  javascript: {
    'function': `// JavaScript Function Examples
function calculateTotal(items, taxRate = 0.1) {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  // Calculate tax
  const tax = subtotal * taxRate;
  
  // Return total with breakdown
  return {
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: (subtotal + tax).toFixed(2)
  };
}

// Arrow function version
const formatCurrency = (amount) => \`$\${parseFloat(amount).toFixed(2)}\`;

// Async function example
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

// Example usage
const items = [
  { name: 'Apple', price: 1.50, quantity: 3 },
  { name: 'Banana', price: 0.75, quantity: 5 }
];
console.log(calculateTotal(items));`,

    'array': `// JavaScript Array Operations
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map - transform each element
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter - keep elements matching condition
const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

// Reduce - combine into single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Find - get first matching element
const firstOver5 = numbers.find(n => n > 5);
console.log('First over 5:', firstOver5);

// Some/Every - check conditions
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);
console.log('Has even:', hasEven, 'All positive:', allPositive);

// Sort - arrange elements
const sorted = [...numbers].sort((a, b) => b - a);
console.log('Sorted desc:', sorted);`,

    'class': `// JavaScript Class Example
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discount = 0;
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    return this;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    return this;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    return subtotal - (subtotal * this.discount);
  }

  applyDiscount(percent) {
    this.discount = Math.min(percent / 100, 1);
    return this;
  }

  clear() {
    this.items = [];
    this.discount = 0;
    return this;
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 999 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 29 }, 2);
cart.applyDiscount(10);
console.log('Total:', cart.getTotal());`,

    'default': `// JavaScript Code
// Generated based on your description

function main() {
  console.log("Hello, World!");
  
  // Example data
  const data = {
    name: "Example",
    value: 42,
    items: ["apple", "banana", "cherry"]
  };
  
  // Process data
  data.items.forEach((item, index) => {
    console.log(\`Item \${index + 1}: \${item}\`);
  });
  
  return data;
}

// Run the main function
const result = main();
console.log("Result:", result);`
  },

  typescript: {
    'interface': `// TypeScript Interface & Type Examples
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

type UserRole = 'admin' | 'user' | 'guest';

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Class implementing interface
class UserService {
  private users: User[] = [];

  async getUser(id: number): Promise<ApiResponse<User | null>> {
    const user = this.users.find(u => u.id === id);
    return {
      success: !!user,
      data: user || null,
      error: user ? undefined : 'User not found'
    };
  }

  async createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<ApiResponse<User>> {
    const user: User = {
      ...data,
      id: Date.now(),
      createdAt: new Date()
    };
    this.users.push(user);
    return { success: true, data: user };
  }
}

// Usage
const service = new UserService();
service.createUser({ name: 'John', email: 'john@example.com', isActive: true });`,

    'default': `// TypeScript Code
// Generated based on your description

interface Config {
  debug: boolean;
  apiUrl: string;
  timeout: number;
}

interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function processData<T>(input: T, config: Config): Promise<Result<T>> {
  try {
    if (config.debug) {
      console.log("Processing:", input);
    }
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return { success: true, data: input };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Example usage
const config: Config = {
  debug: true,
  apiUrl: "https://api.example.com",
  timeout: 5000
};

processData({ id: 1, name: "Test" }, config)
  .then(result => console.log(result));`
  },

  java: {
    'class': `// Java Class Example
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

public class User {
    private Long id;
    private String name;
    private String email;
    private boolean active;
    private LocalDateTime createdAt;
    
    // Constructor
    public User(String name, String email) {
        this.id = System.currentTimeMillis();
        this.name = name;
        this.email = email;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public boolean isActive() { return active; }
    
    // Setters
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setActive(boolean active) { this.active = active; }
    
    @Override
    public String toString() {
        return String.format("User{id=%d, name='%s', email='%s'}", id, name, email);
    }
    
    public static void main(String[] args) {
        User user = new User("John Doe", "john@example.com");
        System.out.println(user);
        System.out.println("Welcome, " + user.getName() + "!");
    }
}`,

    'default': `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Example code
        String message = "Code generated successfully!";
        System.out.println(message);
        
        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
    }
}`
  },

  html: {
    'template': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        header {
            background: #2563eb;
            color: white;
            padding: 1rem 2rem;
        }
        main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .hero {
            text-align: center;
            padding: 4rem 0;
        }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
        }
        footer {
            background: #1e293b;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 4rem;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <strong>MySite</strong>
        </nav>
    </header>
    <main>
        <section class="hero">
            <h1>Welcome to My Website</h1>
            <p>A simple, clean HTML template.</p>
            <a href="#" class="btn">Get Started</a>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,

    'form': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea, select {
            width: 100%; padding: 10px; border: 1px solid #ddd;
            border-radius: 5px; font-size: 16px;
        }
        button {
            background: #2563eb; color: white; padding: 12px 24px;
            border: none; border-radius: 5px; cursor: pointer; font-size: 16px;
        }
        button:hover { background: #1d4ed8; }
    </style>
</head>
<body>
    <h1>Contact Us</h1>
    <form action="/submit" method="POST">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,

    'default': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Your content goes here.</p>
</body>
</html>`
  },

  css: {
    'flexbox': `/* Flexbox Layout Examples */

.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.flex-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.flex-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.center-all {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}`,

    'grid': `/* CSS Grid Layout Examples */

.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}`,

    'default': `/* CSS Styles */

:root {
    --primary: #2563eb;
    --secondary: #64748b;
    --background: #ffffff;
    --text: #1e293b;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background: var(--background);
}

.btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: #1d4ed8;
}`
  },

  sql: {
    'create': `-- SQL Create Table Example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

    'query': `-- SQL Query Examples

-- Select with joins
SELECT 
    u.id,
    u.username,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.is_active = true
GROUP BY u.id, u.username
ORDER BY total_spent DESC
LIMIT 10;

-- Insert
INSERT INTO users (username, email, password_hash)
VALUES ('johndoe', 'john@example.com', 'hashed_password')
RETURNING id, username;

-- Update
UPDATE users
SET is_active = false
WHERE last_login < NOW() - INTERVAL '90 days';`,

    'default': `-- SQL Query
SELECT * FROM table_name
WHERE condition = 'value'
ORDER BY column_name
LIMIT 10;`
  },

  react: {
    'component': `// React Component with Hooks
import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
  initialValue?: number;
}

export default function Counter({ title, initialValue = 0 }: Props) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-4xl font-bold text-center mb-4">{count}</div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={() => setCount(initialValue)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}`,

    'default': `// React Component
import React, { useState } from 'react';

export default function MyComponent() {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Component</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter something..."
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}`
  }
};

function generateCode(description: string, language: string): string {
  const lowerDesc = description.toLowerCase();
  const templates = codeTemplates[language] || codeTemplates.javascript;
  
  // Check for keyword matches
  for (const [keyword, code] of Object.entries(templates)) {
    if (keyword !== 'default' && lowerDesc.includes(keyword)) {
      return code;
    }
  }
  
  // Return default template for the language
  return templates.default || '// Code generated based on your description';
}

export default function CodeGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('python')
  const [copied, setCopied] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    setGeneratedCode('')
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const code = generateCode(prompt, language)
    setGeneratedCode(code)
    setLoading(false)
  }

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode)
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Code Generator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Code Generator</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Generate code snippets in multiple programming languages instantly
            </p>
          </div>

          {/* Tool Interface */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Select Language</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      language === lang.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-xl block mb-1">{lang.icon}</span>
                    <span className="text-xs font-medium text-slate-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Describe what you want to code</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., function, class, api, array, form, grid, flexbox, component..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Code...
                </>
              ) : (
                <>
                  <Code className="w-5 h-5" />
                  Generate Code
                </>
              )}
            </button>
          </div>

          {/* Output */}
          {(generatedCode || loading) && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Generated Code</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                    {languages.find(l => l.id === language)?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!generatedCode}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-slate-900 overflow-x-auto max-h-[500px] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating code...
                  </div>
                ) : (
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Try These Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {['function', 'class', 'api', 'array', 'interface', 'template', 'form', 'grid', 'flexbox', 'component', 'create', 'query'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setPrompt(keyword)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors capitalize"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
