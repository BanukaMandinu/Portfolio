import {
  AiIcon,
  PhoneBrrIcon,
  ConcurrentScenarioIcon,
  LanguagesIcon,
  CinemaIcon,
  TraditionIcon,
  ShoppingCartIcon,
  CreditCalcIcon,
  QaIcon,
} from '@/components/icons';

export const projects = [
  {
    id: 'project-bdd-test-generator',
    title: 'BDD Test Generator',
    Icon: QaIcon,
    repoUrl: 'https://github.com/BanukaMandinu/BDD-Test-Generator-',
    repoLabel: 'View BDD Test Generator repository on GitHub',
    description:
      'Desktop tool that converts live web pages or plain-text requirements into production-ready Gherkin/Cucumber test scenarios, with a review UI for editing, coverage tracking, and export to .feature files or Excel.',
    tags: ['Playwright', 'Gherkin / BDD', 'Node.js', 'Electron'],
  },
  {
    id: 'project-sketchmri',
    title: 'SketchMRI',
    Icon: AiIcon,
    repoUrl: 'https://github.com/BanukaMandinu/SketchMRI',
    repoLabel: 'View SketchMRI repository on GitHub',
    description:
      'Deep learning medical imaging research synthesizing and reconstructing high-fidelity brain MRI scans from conceptual sketches using Generative Adversarial Networks (GANs) and Diffusion Models.',
    tags: ['Computer Vision', 'GANs', 'Diffusion Models', 'PyTorch', 'Python'],
  },
  {
    id: 'project-phonebrr',
    title: 'Phone Brr',
    Icon: PhoneBrrIcon,
    repoUrl: 'https://github.com/BanukaMandinu/Phone-Brr',
    repoLabel: 'View Phone-Brr repository on GitHub',
    description:
      'Experimental platform that adds haptic feedback to video by converting audio frequencies into tactile vibrations in real time, built on the Web Audio API.',
    tags: ['Web Audio API', 'Haptics', 'JavaScript', 'HTML5 / CSS3'],
  },
  {
    id: 'project-concurrent-scenario',
    title: 'Concurrent Transaction Simulator',
    Icon: ConcurrentScenarioIcon,
    repoUrl: 'https://github.com/BanukaMandinu/ConcurrentProgramming_Scenario_2',
    repoLabel: 'View Concurrent Scenario 2 on GitHub',
    description:
      'High-throughput real-time booking and transaction simulation utilizing multithreading, mutex locking, synchronized resources, and thread pool architectures in Java.',
    tags: ['Java', 'Multi-threading', 'Concurrency', 'Locks & Semaphores'],
  },
  {
    id: 'project-concurrency-suite',
    title: 'Concurrent Programming Engine',
    Icon: LanguagesIcon,
    repoUrl: 'https://github.com/BanukaMandinu/Concurrent-Programming',
    repoLabel: 'View Concurrent Programming on GitHub',
    description:
      'Advanced concurrent system solving race conditions, preventing deadlocks, and optimizing producer-consumer scheduling algorithms with thread safety.',
    tags: ['Java', 'Thread Safety', 'Deadlock Prevention', 'Algorithms'],
  },
  {
    id: 'project-cinema',
    title: 'Cinema Booking System',
    Icon: CinemaIcon,
    repoUrl: 'https://github.com/BanukaMandinu/Cinema-Booking-system',
    repoLabel: 'View Cinema Booking System on GitHub',
    description:
      'Interactive cinema seat reservation platform with dynamic seating matrices, seat tier pricing, automated billing calculations, and reservation management.',
    tags: ['Java', 'OOP', 'Data Structures', 'System Design'],
  },
  {
    id: 'project-tradition',
    title: 'Sri Lankan Cultural Portal',
    Icon: TraditionIcon,
    repoUrl: 'https://github.com/BanukaMandinu/website-for-sri-lankan-tradition-',
    repoLabel: 'View Sri Lankan Tradition Website on GitHub',
    description:
      'A rich cultural exploration web portal showcasing Sri Lankan heritage, traditional folk arts, historical architecture, and cultural festivals with responsive modern UI.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
  },
  {
    id: 'project-shoppingcart',
    title: 'Shopping Cart & Inventory Manager',
    Icon: ShoppingCartIcon,
    repoUrl: 'https://github.com/BanukaMandinu/Shoppingcart-Manager',
    repoLabel: 'View Shopping Cart Manager on GitHub',
    description:
      'Object-oriented desktop application featuring product stock management, user cart sessions, category filtering, and itemized invoice receipt generation.',
    tags: ['Java', 'Java Swing GUI', 'OOP Architecture', 'Inventory System'],
  },
  {
    id: 'project-creditcalc',
    title: 'Credit & Loan Calculator',
    Icon: CreditCalcIcon,
    repoUrl: 'https://github.com/BanukaMandinu/credit-calculator',
    repoLabel: 'View Credit Calculator on GitHub',
    description:
      'Financial algorithm application computing loan interest rates, monthly amortization schedules, and customized repayment schedules with precision.',
    tags: ['Python', 'Financial Algorithms', 'CLI / GUI', 'Data Modeling'],
  },
];
