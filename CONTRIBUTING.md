# 🤝 Contributing to Social Media Dashboard

We love your input! We want to make contributing to Social Media Dashboard as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 📋 Pull Request Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/social-media-dashboard.git
   cd social-media-dashboard
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Make Your Changes**
   - Write your code
   - Add tests if applicable
   - Update documentation

5. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**
   - Provide a clear description of changes
   - Link any related issues
   - Include screenshots if applicable

## 📝 Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that do not affect the meaning of the code
- `refactor:` - A code change that neither fixes a bug nor adds a feature
- `perf:` - A code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "docs: update API documentation"
```

## 🏗️ Project Structure

Understanding the project structure will help you contribute effectively:

```
dashboard/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── sections/          # Dashboard sections
│   │   └── ...                # Other components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
├── public/                    # Static assets
└── tests/                     # Test files
```

## 🎯 Areas for Contribution

### 🐛 Bug Fixes
- Check the [issues page](https://github.com/social-media-dashboard/dashboard/issues) for bug reports
- Look for issues labeled `bug` or `good first issue`
- Provide clear reproduction steps in your PR

### ✨ New Features
- Check existing feature requests in issues
- Discuss major features in issues before implementing
- Ensure features align with project goals

### 📚 Documentation
- Improve existing documentation
- Add code examples
- Translate documentation
- Create tutorials or guides

### 🧪 Testing
- Add unit tests for components
- Write integration tests
- Improve test coverage
- Add accessibility tests

### 🎨 Design & UX
- Improve responsive design
- Enhance accessibility
- Optimize animations
- Suggest UI/UX improvements

## 🧪 Testing Guidelines

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test -- ComponentName.test.tsx
```

### Writing Tests
We use Jest and React Testing Library for testing:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage
- Aim for 80%+ test coverage
- Focus on critical user paths
- Test error states and edge cases
- Include accessibility tests

## 🎨 Style Guide

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type usage
- Use strict mode settings

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// ❌ Bad
interface ButtonProps {
  variant: any;
  size: string;
  children: any;
}
```

### React Components
- Use functional components with hooks
- Implement proper prop interfaces
- Use descriptive component names
- Follow single responsibility principle

```typescript
// ✅ Good
interface UserProfileCardProps {
  user: User;
  onEdit: (userId: string) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {
  // Component implementation
};

// ❌ Bad
const Card = ({ data, callback }: any) => {
  // Component implementation
};
```

### CSS/Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use semantic class names
- Maintain consistent spacing

```tsx
// ✅ Good
<div className="
  flex flex-col gap-4
  p-4 rounded-lg shadow-sm
  bg-white dark:bg-gray-800
  sm:flex-row sm:gap-6 sm:p-6
">

// ❌ Bad
<div className="flex p-4 bg-white rounded">
```

### File Naming
- Use PascalCase for components: `UserProfile.tsx`
- Use camelCase for utilities: `formatDate.ts`
- Use kebab-case for docs: `deployment-guide.md`
- Use descriptive names that indicate purpose

## 🚀 Performance Guidelines

### React Performance
- Use `React.memo` for expensive components
- Implement `useCallback` for stable references
- Use `useMemo` for expensive calculations
- Avoid inline objects and functions in JSX

```typescript
// ✅ Good
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return heavyComputation(data);
  }, [data]);

  return <div>{processedData}</div>;
});

// ❌ Bad
const ExpensiveComponent = ({ data }) => {
  const processedData = heavyComputation(data); // Runs on every render
  return <div>{processedData}</div>;
};
```

### Bundle Size
- Import only what you need
- Use dynamic imports for heavy components
- Monitor bundle size with webpack-bundle-analyzer
- Optimize images and assets

## ♿ Accessibility Guidelines

### WCAG Compliance
- Aim for WCAG 2.1 AA compliance
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Maintain proper color contrast

```tsx
// ✅ Good
<button
  aria-label="Close modal"
  onClick={onClose}
  className="focus:ring-2 focus:ring-blue-500"
>
  <X aria-hidden="true" />
</button>

// ❌ Bad
<div onClick={onClose}>
  <X />
</div>
```

### Testing Accessibility
```bash
# Install accessibility testing tools
npm install --save-dev @testing-library/jest-dom
npm install --save-dev jest-axe

# Run accessibility tests
npm run test:a11y
```

## 🐛 Bug Reports

When filing an issue, please provide:

### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows 11, macOS 12.6]
- Browser: [e.g. Chrome 115, Firefox 116]
- Version: [e.g. v1.2.3]
- Device: [e.g. iPhone 14, Desktop]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 🏷️ Issue Labels

We use the following labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested
- `wontfix` - This will not be worked on
- `duplicate` - This issue or pull request already exists
- `priority:high` - High priority issue
- `priority:medium` - Medium priority issue
- `priority:low` - Low priority issue

## 🔒 Security

### Reporting Security Issues
If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email security@socialmedia-dashboard.com
3. Include detailed steps to reproduce
4. Allow time for assessment and fix

### Security Guidelines
- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for configuration
- Validate all user inputs
- Follow secure coding practices
- Keep dependencies updated

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation
- Social media mentions for major features

## 📞 Getting Help

- **Documentation**: Check the [docs](./docs/) directory
- **Discussions**: Use [GitHub Discussions](https://github.com/social-media-dashboard/dashboard/discussions)
- **Discord**: Join our [Discord community](https://discord.gg/socialmedia-dashboard)
- **Email**: contact@socialmedia-dashboard.com

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Use of sexualized language or imagery
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at conduct@socialmedia-dashboard.com.

## 📅 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes (backward compatible)

### Release Schedule
- **Patch releases**: As needed for critical bugs
- **Minor releases**: Monthly feature releases
- **Major releases**: Quarterly with breaking changes

Thank you for contributing to Social Media Dashboard! 🚀
