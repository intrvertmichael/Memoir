import React from 'react'
import Button from './Button'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Buttons',
    argTypes: {
        onClick: { action: 'clicked' },
    }
}

const Template = (args) => <Button {...args} />

// created buttons

export const Transparent = Template.bind({})
Transparent.args = {
    label: 'Transparent Button',
    transparent : true
}

export const Non_Transparent = Template.bind({})
Non_Transparent.args = {
    label: 'Non-Transparent Button',
    transparent : false
}