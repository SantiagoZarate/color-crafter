# Input

{
primary: hsla(30deg, 40%, 50%),
border: hsla(20deg, 10%, 70%),
}

# Output

```css
@layer base {
  :root {
    --primary: 30deg 40% 50%;
    --border: 20deg 10% 70%;
  }

  [data-theme="light"] {
    --primary: 30deg 40% 50%;
    --border: 20deg 10% 70%;
  }
}
```

```javascript
export default{
  // Tailwind.config.js
  extend {
    colors {
      primary : "hsl(var(--primary)/ <alpha/value>)",
      border : "hsl(var(--border)/ <alpha/value>)",
    }
  }
}

```

```typescript
interface Colors {
  primary : string
}

const buildCssConfig(values : Colors[]){
  const myCssConfig = `
  @layer base{
    :root {
      ${
        Object
      }
    }
  }
  `
}
```
