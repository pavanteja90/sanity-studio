import { MenuIcon } from '@sanity/icons'
import {defineField} from 'sanity'

export default {
  name: 'navbar',
  type: 'object',
  title: 'Navbar',
  icon: MenuIcon,
  description: 'Navbar for each breakpoint',
  fields: [
    defineField({
      name: 'desktopNavbar',
      title: 'Desktop',
      type: 'image',
      description: 'Navbar image to be displayed for desktop breakpoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tabletNavbar',
      title: 'Tablet',
      type: 'image',
      description: 'Navbar image to be displayed for tablet breakpoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileNavbar',
      title: 'Mobile',
      type: 'image',
      description: 'Navbar image to be displayed for mobile breakpoint',
      validation: (Rule) => Rule.required(),
    }),
  ],
}
