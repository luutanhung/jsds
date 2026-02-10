<div align="center">

# 🚀 JSDS — JavaScript Data Structures & Algorithms

![Version](https://img.shields.io/github/package-json/v/luutanhung/jsds?style=for-the-badge)
![Contributors](https://img.shields.io/github/contributors/luutanhung/jsds?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/luutanhung/jsds?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/luutanhung/jsds?style=for-the-badge)

</div>

<p align="center">
  <img src="assets/thumbnail.jpg" alt="JavaScript Data Structures & Algorithms Thumbnail" width="400"/>
</p>

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 📘 About

JavaScript Data Structures & Algorithms (JSDS) is a comprehensive collection of classic data structures and algorithms implemented in JavaScript. This project serves as an educational resource for developers learning computer science fundamentals, interview preparation, and practical implementation of common programming patterns.

The implementations focus on readability, efficiency, and educational value, making it an ideal resource for students, professionals, and anyone interested in strengthening their understanding of fundamental computer science concepts.

## ✨ Features

- **Comprehensive Coverage**: Implementations of essential data structures and algorithms
- **Educational Focus**: Well-documented code with complexity analysis and examples
- **Modern JavaScript**: ES6+ features and clean coding practices
- **Thorough Testing**: Comprehensive test suites using Vitest
- **Performance Optimized**: Efficient implementations with detailed complexity analysis
- **Modular Design**: Organized structure for easy navigation and learning

## 🏗️ Project Structure

```
jsds/
├── data-structures/         # Data structure implementations
│   ├── heap/               # Heap implementations
│   ├── queue/              # Queue implementations  
│   ├── stack/              # Stack implementations
│   └── ...
├── searching/              # Search algorithms
│   ├── __tests__/          # Search algorithm tests
│   └── linear-search.js    # Linear search implementations
├── selecting/              # Selection algorithms
│   ├── __tests__/          # Selection algorithm tests
│   └── quick-select.js     # Quick select implementation
├── solutions/              # Algorithm problem solutions
│   └── array/              # Array-based problems
├── helpers/                # Utility functions
├── mechanics/              # Core utilities and patterns
├── __tests__/             # Global test configurations
├── assets/                 # Project assets (images, docs)
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

### Key Components:

- **Data Structures**: Trees, graphs, heaps, hash tables, linked lists, etc.
- **Searching Algorithms**: Binary search, linear search, interpolation search, etc.
- **Sorting Algorithms**: Quick sort, merge sort, bubble sort, etc.
- **Selection Algorithms**: Quick select, median of medians, etc.
- **Problem Solutions**: Real-world algorithmic problems and their solutions

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/luutanhung/jsds.git
cd jsds
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npx vitest path/to/test/file.spec.js
```

### Example Usage
```javascript
import { linearSearch } from './searching/linear-search';

const arr = [1, 3, 5, 7, 9];
const index = linearSearch(arr, 5); // Returns 2
```

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing, providing fast and reliable unit tests for all implementations. Each algorithm and data structure comes with comprehensive test suites covering:

- Edge cases
- Performance scenarios
- Error conditions
- Boundary conditions

To run the complete test suite:
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 📄 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](./LICENSE.md) file for details.

## 📬 Contact

**Luu Tan Hung**  
Fullstack Engineer • JavaScript/TypeScript • Node.js • React

[![Email](https://img.shields.io/badge/Email-luutanhung.dev%40gmail.com-blue?style=for-the-badge&logo=gmail)](mailto:luutanhung.dev@gmail.com)
[![Twitter](https://img.shields.io/badge/Twitter-@luu_tan_hung-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/luu_tan_hung)
[![GitHub](https://img.shields.io/badge/GitHub-luutanhung-181717?style=for-the-badge&logo=github)](https://github.com/luutanhung)


---

⭐ If you find this project helpful, please give it a star!
