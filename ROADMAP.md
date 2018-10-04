# Roadmap to v1.0.0

- Supported usage
  - [ ] Atom
  - [ ] Sublime
  - [ ] CLI
  - [ ] Core (Node.js API)

- [x] Update the README #102

- [ ] Core
  - [ ] Standard Options & Languages
  - [ ] Add Option
    - Option has fields:
      - `key` (unique)
      - `description`
      - `default`
      - `type`
      - ...
  - [ ] Add Language
    - Language has fields:
      - `name` (unique)
      - `namespace` (unique)
      - `extensions`
      - `options`
  - [ ] Add Beautifier
    - Supported languages and options
    - Given `({ text, language, options, filePath, projectPath })`
    - Beautifiers run in their own processes
      - Beautifier queue limiting number of simultaneous processes
  - [ ] Add Configurer
    - Configurer will obtain values for the options
- [ ] CLI
  - [ ] Find beautifiers globally installed named `beautifier-${name}`
    - See https://github.com/yeoman/environment/blob/f9468481911c31673378b38e63872f57a1163f38/lib/resolver.js#L63
- [ ] Atom
  - [ ] Configurers
    - [ ] Atom Editor Settings
    - [ ]
  - [ ] External Beautifiers
    - [ ] Services (Consumer/Provider) API

- [ ] Sublime
  - Use CLI





Models:
- Options
- Languages
  - name
  - namespace
  - extensions
  - atomGrammars (for Atom)
  - sublimeSyntax (for Sublime)
- Beautifiers
  - hasMany Options
  - hasMany Languages


- [ ] Can update Beautifier independently
- [ ] Can update Language

Separate Options registry (centralized)

Separate Languages registry (centralized)

Separate Beautifiers (no registry, decentralized)
- Peer/Atom dependencies:
  -


Goal: NPM Global
```bash
npm install --global unibeautify
npm install --global beautifier-js-beautify
unibeautify --language JavaScript
```

Goal: Atom
```bash
apm install unibeautify
apm install beautifier-js-beautify
```
