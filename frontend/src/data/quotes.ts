const quotes = [
  {
    content: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    company: "Xerox PARC",
  },
  {
    content:
      "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    company: "Microsoft",
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
    company: "eBookIt.com",
  },
  {
    content: "Don't be evil.",
    author: "Google's Unofficial Motto",
    company: "Google",
  },
  {
    content:
      "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg",
    company: "Facebook",
  },
  {
    content:
      "If you double the number of experiments you do per year, you're going to double your inventiveness.",
    author: "Jeff Bezos",
    company: "Amazon",
  },
  {
    content: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content: "Work hard, have fun, make history.",
    author: "Jeff Bezos",
    company: "Amazon",
  },
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content:
      "The Internet is becoming the town square for the global village of tomorrow.",
    author: "Bill Gates",
    company: "Microsoft",
  },
  {
    content: "It’s not about ideas. It’s about making ideas happen.",
    author: "Scott Belsky",
    company: "Behance",
  },
  {
    content: "Great companies are built on great products.",
    author: "Elon Musk",
    company: "Tesla, SpaceX",
  },
  {
    content:
      "You don’t need to have a 100-person company to develop that idea.",
    author: "Larry Page",
    company: "Google",
  },
  {
    content:
      "Quality is more important than quantity. One home run is much better than two doubles.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content:
      "Chase the vision, not the money; the money will end up following you.",
    author: "Tony Hsieh",
    company: "Zappos",
  },
  {
    content:
      "In the end, a vision without the ability to execute it is probably a hallucination.",
    author: "Steve Case",
    company: "AOL",
  },
  {
    content:
      "Life is too short to do mediocre work and it is definitely too short to build shitty things.",
    author: "Stewart Butterfield",
    company: "Slack",
  },
  {
    content:
      "If you really look closely, most overnight successes took a long time.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content:
      "Make every detail perfect and limit the number of details to perfect.",
    author: "Jack Dorsey",
    company: "Twitter, Square",
  },
  {
    content: "Data beats emotions.",
    author: "Sean Rad",
    company: "Tinder",
  },
  {
    content:
      "A company shouldn’t get addicted to being shiny because shiny doesn’t last.",
    author: "Jeff Bezos",
    company: "Amazon",
  },
  {
    content:
      "It’s not about money. It’s about the people you have, and how you’re led.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content:
      "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.",
    author: "Biz Stone",
    company: "Twitter",
  },
  {
    content:
      "If you are not embarrassed by the first version of your product, you’ve launched too late.",
    author: "Reid Hoffman",
    company: "LinkedIn",
  },
  {
    content: "Any product that needs a manual to work is broken.",
    author: "Elon Musk",
    company: "Tesla, SpaceX",
  },
  {
    content: "I skate to where the puck is going to be, not where it has been.",
    author: "Wayne Gretzky",
    company: "Quoted by Steve Jobs",
  },
  {
    content: "In God we trust, all others bring data.",
    author: "W. Edwards Deming",
    company: "Quality Management Pioneer",
  },
  {
    content: "The customer is the final inspector.",
    author: "Steve Jobs",
    company: "Apple",
  },
  {
    content: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    company: "Quoted by Apple",
  },
  {
    content: "What would you do if you weren’t afraid?",
    author: "Sheryl Sandberg",
    company: "Facebook",
  },
  {
    content:
      "Risk more than others think is safe. Dream more than others think is practical.",
    author: "Howard Schultz",
    company: "Starbucks",
  },
  {
    content:
      "Perseverance is not a long race; it is many short races one after the other.",
    author: "Walter Elliot",
    company: "Author",
  },
  {
    content:
      "The question isn’t who is going to let me; it’s who is going to stop me.",
    author: "Ayn Rand",
    company: "Philosophy Writer",
  },
  {
    content: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
    company: "Hockey Hall of Fame",
  },
  {
    content:
      "The secret of change is to focus all your energy not on fighting the old, but on building the new.",
    author: "Socrates",
    company: "Philosophy Pioneer",
  },
  {
    content: "Fall seven times and stand up eight.",
    author: "Japanese Proverb",
    company: "Cultural Wisdom",
  },
  {
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    company: "Disney",
  },
  {
    content: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    company: "Third U.S. President",
  },
  {
    content: "The best revenge is massive success.",
    author: "Frank Sinatra",
    company: "Music Icon",
  },
  {
    content:
      "Do not be embarrassed by your failures, learn from them and start again.",
    author: "Richard Branson",
    company: "Virgin Group",
  },
  {
    content:
      "Whether you think you can, or you think you can’t – you’re right.",
    author: "Henry Ford",
    company: "Ford Motor Company",
  },
  {
    content:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    company: "Author and Philosopher",
  },
  {
    content: "Don’t be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    company: "Standard Oil",
  },
  {
    content: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale",
    company: "Healthcare Pioneer",
  },
  {
    content:
      "Business opportunities are like buses; there’s always another one coming.",
    author: "Richard Branson",
    company: "Virgin Group",
  },
  {
    content:
      "The customer support I received was exceptional. The support team went above and beyond to address my concerns",
    author: "Julies Winfield",
    company: "CEO | Acme corp",
  },
];

export default quotes;
