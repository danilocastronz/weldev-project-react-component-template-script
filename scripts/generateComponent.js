const fs = require('fs');
const { component, story, test } = require('./templates/component.template.js');

function writeFileErrorHandler(err) {
    if (err) throw err;
}

// convert string to pascal case
function formatComponentName(s) {
    let upperPathItems = s.split('/').map(item => item.replace(/\w\S*/g,
        (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    ));
    return upperPathItems.join('/');
}

// grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name.');

// format component name to pascal case and no spaces
const componentPath = formatComponentName(name).replace(/\s/g, '');
const componentName = componentPath.indexOf('/') > -1 ? componentPath.split('/').pop() : componentPath;

const dir = `./src/components/${componentPath}/`;

// throw an error if the file already exists
if (fs.existsSync(dir)) throw new Error('A component with that name already exists.');

// create folder recursively
fs.mkdirSync(dir, { recursive: true });

// _create react component
fs.writeFile(`${dir}/index.tsx`, component(componentName), writeFileErrorHandler);

// _create storybook stories
fs.writeFile(`${dir}/${componentName}.stories.tsx`, story(componentName), writeFileErrorHandler);

// _create ui unit tests
fs.writeFile(`${dir}/${componentName}.test.tsx`, test(componentName), writeFileErrorHandler);

console.log(`SUCCESS: Component ${componentName} created successfully at ${dir}`);