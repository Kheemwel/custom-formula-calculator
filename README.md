# Custom Formula Calculator

A modern, interactive web application for creating, managing, and executing custom mathematical formulas. Built with [Solid.js](https://www.solidjs.com/) and styled with [Tailwind CSS](https://tailwindcss.com/).

![Node Version](https://img.shields.io/node/v/22)
![License](https://img.shields.io/badge/license-MIT-blue)
![Built with Solid.js](https://img.shields.io/badge/built%20with-Solid.js-4DB8FF)

## ✨ What It Does

Custom Formula Calculator is a web-based tool that allows you to:

- **Create custom formulas** with inputs, constants, and calculation expressions
- **Define mathematical expressions** using a comprehensive set of mathematical functions
- **Execute formulas instantly** with custom input values and see real-time results
- **Organize your formulas** with titles, descriptions, and input/output parameters with units
- **Import and export** your formula library as JSON for sharing and backup
- **Persist data locally** using browser localStorage for seamless experience

Perfect for engineers, scientists, accountants, and anyone who works with recurring calculations.

## 🚀 Key Features

- **Intuitive Formula Editor**: Create formulas with a clean, organized interface
- **Rich Math Support**: Access to trigonometric, logarithmic, and utility functions (sin, cos, sqrt, pow, min, max, etc.)
- **Input Management**: Define custom input parameters with display names and units
- **Constants Support**: Set up reusable constants in your formulas
- **Multiple Outputs**: Generate multiple calculated results from a single formula
- **Expression Helper**: Keyboard drawer with quick access to common mathematical operators and functions
- **Formula Library**: Browse, search, and manage all your saved formulas
- **Import/Export**: Save formulas to JSON files and import them back
- **Duplicate Formulas**: Quickly create variations of existing formulas
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Easy on the eyes with a modern dark interface

## 🏃 Getting Started

### Prerequisites

- **Node.js** version 22 or higher
- npm, pnpm, or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd custom-formula-calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

4. **Open in your browser** and start creating formulas!

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Examples

### Creating Your First Formula

1. Click the **"Create"** button (+ icon) on the home page
2. Enter a formula title and description
3. Add input parameters:
   - Define variable names (e.g., `length`, `width`)
   - Add display labels and units
4. (Optional) Add constants for reusable values
5. Define outputs with mathematical expressions:
   ```
   area = length * width
   ```
6. Click **"Save Formula"**

### Available Mathematical Functions

Your formulas can use these built-in functions:

**Trigonometric**: `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`

**Power & Root**: `sqrt()`, `pow()`, `abs()`

**Rounding**: `floor()`, `ceil()`, `round()`

**Min/Max**: `min()`, `max()`

**Logarithmic**: `log()`, `exp()`

**Constants**: `PI`, `E`

**Percentage**: `addPercent()`, `subtractPercent()`, `percentOf()`

### Example: Area Calculator Formula

**Setup**:
```
Title: Rectangle Area
Description: Calculate the area of a rectangle

Inputs:
- length (unit: m)
- width (unit: m)

Outputs:
- area = length * width (unit: m²)
```

**Run the formula**:
- Enter length: 5
- Enter width: 3
- Result: area = 15

### Importing/Exporting Formulas

**Export**: Click the "Export All" button to download your entire formula library as `formulas.json`

**Import**: Click the "Import JSON" button and select a previously exported `formulas.json` file

**Format**: Formulas are stored as JSON with the following structure:
```json
[
  {
    "id": "unique-id",
    "title": "Formula Name",
    "desc": "Optional description",
    "inputs": [
      { "name": "var1", "display": "Label", "val": 0, "unit": "unit" }
    ],
    "constants": [
      { "name": "PI", "val": 3.14159, "unit": "" }
    ],
    "outputs": [
      { "name": "result", "expr": "var1 * 2", "unit": "unit" }
    ]
  }
]
```

## 📦 Tech Stack

- **Framework**: [Solid.js](https://www.solidjs.com/) - Lightweight reactive JavaScript library
- **Routing**: [@solidjs/router](https://docs.solidjs.com/reference/router/overview) - Client-side routing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [DaisyUI](https://daisyui.com/) - Tailwind CSS component library
- **Icons**: [Lucide Solid](https://lucide.dev/guide/packages/lucide-solid) - Clean, consistent icons
- **Build Tool**: [Vinxi](https://vinxi.vercel.app/) - Modern bundler for Solid.js
- **Font**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Monospace font for code
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) - Static typing for JavaScript

## 🎯 Project Structure

```
custom-formula-calculator/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FormulaCard.tsx       # Formula list item card
│   │   ├── FormulaEditorForm.tsx # Formula creation/editing form
│   │   ├── Header.tsx            # Navigation header
│   │   └── KeyboardDrawer.tsx    # Expression helper drawer
│   ├── lib/
│   │   ├── store.ts         # Formula state management
│   │   ├── math.ts          # Formula evaluation engine
│   │   └── keyboard.ts      # Expression helper utilities
│   ├── routes/
│   │   ├── index.tsx        # Home page (formula list)
│   │   ├── editor/
│   │   │   ├── index.tsx    # Create new formula
│   │   │   └── [id].tsx     # Edit existing formula
│   │   ├── run/
│   │   │   └── [id].tsx     # Execute formula
│   │   └── [...404].tsx     # 404 page
│   ├── app.tsx              # Main app layout
│   ├── app.css              # Global styles
│   ├── types.ts             # TypeScript interfaces
│   ├── entry-client.tsx     # Client entry point
│   └── entry-server.tsx     # Server entry point
├── public/                  # Static assets
├── app.config.ts           # Solid Start configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🔧 Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server

### Code Style

The project uses:
- **TypeScript** for type safety
- **Functional components** with Solid.js reactive signals
- **Utility-first CSS** with Tailwind CSS
- **Relative imports** for better code organization

### Adding New Features

To add features:

1. Create components in `src/components/`
2. Add state management to `src/lib/store.ts` if needed
3. Create routes in `src/routes/` following the file-based routing convention
4. Update types in `src/types.ts` for new data structures

## 💾 Data Persistence

Your formulas are automatically saved to browser **localStorage** under the key `formulas`. This means:

- ✅ Formulas persist across browser sessions
- ✅ No server backend required
- ⚠️ Data is browser-specific (not shared across devices)
- ⚠️ Clearing browser data will delete saved formulas

**Tip**: Regularly export your formulas using the "Export All" button as a backup.

## 🐛 Common Issues & Solutions

**Formulas not saving?**
- Check that localStorage is enabled in your browser
- Try clearing browser cache and reload

**Formula calculation errors?**
- Verify all input variables are defined in your formula
- Check for typos in output expressions
- Ensure mathematical functions use correct syntax

**Having trouble with expressions?**
- Use the Expression Helper (keyboard drawer) for quick access to available functions
- Refer to the "Available Mathematical Functions" section above

## ❓ Getting Help

- **Documentation**: Review this README and examples above
- **Code Comments**: Source code includes detailed comments explaining logic
- **Issue Tracker**: Report bugs or feature requests via GitHub issues
- **Solid.js Docs**: Learn more at [https://docs.solidjs.com/](https://docs.solidjs.com/)

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork the repository** on GitHub
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** describing your changes

### Development Guidelines

- Follow the existing code style and structure
- Write meaningful commit messages
- Test your changes in development mode
- Update this README if adding new features or changing functionality
- Ensure TypeScript has no type errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Solid.js](https://www.solidjs.com/) - for incredible reactivity
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Font from [JetBrains](https://www.jetbrains.com/lp/mono/)

## 📞 Support

Have questions or need help? Feel free to:
- Open an issue on GitHub
- Check the documentation in this README
- Review the source code comments
- Refer to the [Solid.js documentation](https://docs.solidjs.com/)

---

