exports.component = name => `import React, { useState } from 'react';

export interface ${name}Props {
  id?: number;
  name?: string;
}

export const ${name} = ({id, name}: ${name}Props) => {
  const [value, setValue] = useState(0);
  return <button key={id} onClick={() => setValue(value + 1)}>{name + ' - ' + value}</button>;
};
`;

// component.stories.tsx
exports.story = name => `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {${name}} from './';

export default {
  title: 'Homepage/${name}',
  component: ${name},
} as ComponentMeta<typeof ${name}>;

const Template: ComponentStory<typeof ${name}> = (args) => <${name} {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: '${name}',
};
`;

// component.test.tsx
exports.test = name => `import React from 'react';
import { render, screen } from '@testing-library/react';

// component
import { Default } from './${name}.stories';

describe('${name} Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Default {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('it should be rendered', () => {
    render(<Default {...Default.args} />);
    const content = screen.getByText('${name} - 0');
    expect(content).toBeTruthy();
  });
});
`;