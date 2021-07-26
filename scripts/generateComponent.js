const fs = require('fs');
const { component, story, test } = require('./templates/component.template.js');

// grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name.');

const dir = `./src/components/${name}/`;

// throw an error if the file already exists
if (fs.existsSync(dir)) throw new Error('A component with that name already exists.');

// create the folder
fs.mkdirSync(dir, { recursive: true });

function writeFileErrorHandler(err) {
    if (err) throw err;
}

let componentName = name.indexOf('/') > -1 ? name.split('/').pop() : name;

// component.tsx
fs.writeFile(`${dir}/index.tsx`, component(componentName), writeFileErrorHandler);
// storybook.jsx
fs.writeFile(`${dir}/${componentName}.stories.tsx`, story(componentName), writeFileErrorHandler);
// test.tsx
fs.writeFile(`${dir}/${componentName}.test.tsx`, test(componentName), writeFileErrorHandler);