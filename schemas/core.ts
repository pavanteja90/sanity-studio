import {BlockContentIcon, ImageIcon, StringIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

const CoreSchemas = {
  richTextObject: defineField({
    name: 'richtextObject',
    title: 'Rich text component',
    type: 'object',
    icon: BlockContentIcon,
    fields: [
      {
        name: 'richText',
        type: 'array',
        of: [{type: 'block'}],
      },
    ],
  }),
  textObject: defineField({
    name: 'textObject',
    title: 'Text component',
    type: 'object',
    icon: StringIcon,
    fields: [
      {
        name: 'text',
        type: 'text',
      },
    ],
  }),
  headerObject: defineField({
    name: 'headerObject',
    title: 'Header component',
    type: 'object',
    icon: StringIcon,
    fields: [
      {
        name: 'level',
        title: 'Header Level',
        type: 'string',
        options: {
          list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'text',
        type: 'text',
        validation: (Rule) => Rule.required(),
      },
    ],
  }),
  imageObject: defineField({
    name: 'imageObject',
    title: 'Image component',
    type: 'object',
    icon: ImageIcon,
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        validation: (Rule) => Rule.required(),
      },
    ],
  }),
}

const buildCoreSchemaArrayMembers = (): ReturnType<typeof defineArrayMember>[] => {
  return [
    defineArrayMember(CoreSchemas.textObject),
    defineArrayMember(CoreSchemas.richTextObject),
    defineArrayMember(CoreSchemas.headerObject),
    defineArrayMember(CoreSchemas.imageObject),
  ]
}

export {CoreSchemas, buildCoreSchemaArrayMembers}
