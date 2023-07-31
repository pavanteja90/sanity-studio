import {SanityDocument, defineConfig, isDev, userHasRole} from 'sanity'
import Iframe from 'sanity-plugin-iframe-pane'
import {visionTool} from '@sanity/vision'
import {StructureBuilder, deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
  sanityTutorialsWidget,
} from '@sanity/dashboard'
import {workflow} from 'sanity-plugin-workflow'
import {CommentIcon} from '@sanity/icons'
import Preview from './Preview/Preview'

const devOnlyPlugins = [getStartedPlugin()]

// Customize this function to show the correct URL based on the current document
function getPreviewUrl(doc: any) {
  return doc?.slug?.current
    ? `http://localhost:3000/${doc.slug.current}`
    : window.location.host
}

export default defineConfig({
  name: 'default',
  title: 'orange-lion',

  projectId: 'jtjt5tyd',
  dataset: 'production',

  plugins: [
    deskTool({
      name: 'ratings',
      title: 'Ratings',
      icon: CommentIcon,
      structure: (S) => S.documentTypeList('ratings'),
      defaultDocumentNode: (S: StructureBuilder) =>
        S.document().views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              fetch: true,
              url: (doc: SanityDocument) => getPreviewUrl(doc)
            })
            .title('Preview'),
        ]),

      // structure: (S, context) => {
      //   console.log(context)
      //   if (context.currentUser && !userHasRole(context.currentUser, 'administrator')) {
      //     return S.documentTypeList('ratings')
      //   }
      //   return S.documentTypeList('pet')
      // },
    }),
    visionTool(),
    ...(isDev ? devOnlyPlugins : []),
    dashboardTool({widgets: [sanityTutorialsWidget(), projectInfoWidget(), projectUsersWidget()]}),
    workflow({
      // Required, list of document type names
      // schemaTypes: ['article', 'product'],
      schemaTypes: ['ratings'],
      // Optional, see below
      states: [
        {
          // Required configuration
          id: 'backlog',
          title: 'Backlog',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'primary',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: false,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: false,
          // Defines which States a document can be moved to from this one
          transitions: ['in-progress'],
        },
        {
          // Required configuration
          id: 'in-progress',
          title: 'In Progress',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'primary',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: false,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: false,
          // Defines which States a document can be moved to from this one
          transitions: ['backlog', 'in-review'],
        },
        {
          // Required configuration
          id: 'in-review',
          title: 'In Review',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'warning',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: false,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: false,
          // Defines which States a document can be moved to from this one
          transitions: ['changes-requested', 'approved'],
        },
        {
          // Required configuration
          id: 'changes-requested',
          title: 'Changes requested',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'danger',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: true,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: false,
          // Defines which States a document can be moved to from this one
          transitions: ['in-review'],
        },
        {
          // Required configuration
          id: 'approved',
          title: 'Approved',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'success',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: true,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: true,
          // Defines which States a document can be moved to from this one
          transitions: ['published'],
        },
        {
          // Required configuration
          id: 'published',
          title: 'Published live',
          // Optional settings:
          // Used for the color of the Document Badge
          color: 'success',
          // Will limit document actions and drag-and-drop for only users with these Role
          roles: ['publisher', 'administrator'],
          // Requires the user to be "assigned" in order to update to this State
          requireAssignment: true,
          // Requires the document to be valid before being promoted out of this State
          // Warning: With many documents in the Kanban view this can negatively impact performance
          requireValidation: true,
          // Defines which States a document can be moved to from this one
          transitions: ['published'],
        },
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
