import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Nottery } from '../index';

const Template: StoryFn<typeof Nottery> = (args) => <Nottery {...args} />;
export const Lottery: StoryObj<typeof Nottery> = Template.bind({});
export default {
  title: 'Lottery React',
  component: Nottery,
  argTypes: {},
} as Meta<typeof Nottery>;

Lottery.args = {};
