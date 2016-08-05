# Unibeautify

> One Beautifier to rule them all, One Beautifier to clean them, One Beautifier to bring them all and in the darkness sheen them

## Why
- Single beautifier abstracting multiple beautifiers for multiple languages
- Unified beautifier configuration options

## Install

```bash
$ npm install --save unibeautify
```

## Usage

```javascript
import unibeautify from 'unibeautify';

unibeautify.registerLanguage(language);
unibeautify.registerBeautifier(beautifier);

unibeautify.beautify(text, language.name, options, context)
.then((result) => console.log(result))
.catch((error) => console.error(error));
```
