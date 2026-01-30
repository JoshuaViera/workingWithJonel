# Contributing to Dragon Ball Power-Up Diner

## Git Workflow

### Branch Strategy
```
main (production)
└── dev (integration)
    ├── yourname/feature-name
    └── jonel/feature-name
```

### Starting a New Feature

1. Make sure you're on `dev` and it's up to date:
```bash
git checkout dev
git pull origin dev
```

2. Create your feature branch:
```bash
git checkout -b yourname/feature-description
```

3. Work on your feature, committing regularly:
```bash
git add .
git commit -m "feat: add character card component"
```

### Committing Changes

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `test:` - Adding tests
- `chore:` - Build/config changes

Examples:
```bash
git commit -m "feat: add power level counter animation"
git commit -m "fix: resolve localStorage save bug"
git commit -m "style: format CharacterCard component"
```

### Submitting Your Work

1. Push your feature branch:
```bash
git push origin yourname/feature-name
```

2. Create a Pull Request on GitHub:
   - Base: `dev`
   - Compare: `yourname/feature-name`
   - Add clear description of changes
   - Request review from your partner

3. Wait for code review and address feedback

4. Once approved, merge to `dev`

### Code Review Checklist

**For Reviewers:**
- [ ] Code follows project structure
- [ ] No console.logs left in code
- [ ] Components have meaningful names
- [ ] CSS is scoped (using modules)
- [ ] No hardcoded values (use constants)
- [ ] Code is readable and commented
- [ ] No obvious bugs

**For Authors:**
- [ ] Tested locally
- [ ] No ESLint errors
- [ ] Formatted with Prettier
- [ ] Updated relevant documentation

## Development Guidelines

### Component Structure
```jsx
// Good component structure
import styles from './CharacterCard.module.css';

/**
 * CharacterCard displays a single Dragon Ball character
 * @param {Object} props
 * @param {Object} props.character - Character data object
 * @param {Function} props.onFeed - Callback when character is fed
 */
function CharacterCard({ character, onFeed }) {
  // Component logic here
  
  return (
    <div className={styles.card}>
      {/* JSX here */}
    </div>
  );
}

export default CharacterCard;
```

### CSS Modules Naming
```css
/* CharacterCard.module.css */
.card { }
.cardHeader { }
.powerLevel { }
```

### File Naming Conventions

- Components: PascalCase (`CharacterCard.jsx`)
- Utils/Hooks: camelCase (`usePowerUp.js`)
- CSS Modules: PascalCase + `.module.css` (`CharacterCard.module.css`)
- Constants: camelCase (`constants.js`)

## Getting Help

- **Stuck?** Ask your partner or check the PRD
- **Bug?** Create a GitHub issue
- **Question?** Comment on the relevant PR

## Daily Workflow

1. **Morning:** Pull latest from `dev`
2. **Work:** Commit frequently to your feature branch
3. **End of day:** Push your branch, create PR if ready
4. **Review:** Check your partner's PRs and provide feedback