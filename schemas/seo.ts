import {defineField} from 'sanity'

export default {
  name: 'seo',
  type: 'object',
  title: 'SEO',
  description: 'Parameters used for search engine optimisation',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Keywords',
      type: 'string',
    }),
    defineField({
      name: 'seoImage',
      title: 'Image',
      type: 'image',
    }),
  ],
}
