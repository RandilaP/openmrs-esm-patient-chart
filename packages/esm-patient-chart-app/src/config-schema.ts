import { Type } from '@openmrs/esm-framework';

export const esmPatientChartSchema = {
  visitDiagnosisConceptUuid: {
    _default: '159947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    _type: Type.ConceptUuid,
  },
  notesConceptUuids: {
    _type: Type.Array,
    _default: ['162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'],
  },
  offlineVisitTypeUuid: {
    _type: Type.UUID,
    _description: 'The UUID of the visit type to be used for the automatically created offline visits.',
    _default: 'a22733fa-3501-4020-a520-da024eeff088',
  },
  showRecommendedVisitTypeTab: {
    _type: Type.Boolean,
    _description: 'Whether start visit form should display recommended visit type tab. Requires `visitTypeResourceUrl`',
    _default: false,
  },
  visitTypeResourceUrl: {
    _type: Type.String,
    _default: '/etl-latest/etl/patient/',
    _description: 'Custom URL to load resources required for showing recommended visit types',
  },
  disableEmptyTabs: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Disable notes/tests/medications/encounters tabs when empty',
  },
  showAllEncountersTab: {
    _type: Type.Boolean,
    _description: 'Shows the All Encounters Tab of Patient Visits section in Patient Chart',
    _default: false,
  },
  startVisitLabel: {
    _type: Type.String,
    _description: 'Custom label to use on the start visit actions',
    _default: '',
  },
  endVisitLabel: {
    _type: Type.String,
    _description: 'Custom label to use on the end visit actions',
    _default: '',
  },
  visitAttributeTypes: {
    _type: Type.Array,
    _description: 'List of visit attribute types shown when filling the visit form',
    _elements: {
      uuid: {
        _type: Type.UUID,
        _description: 'UUID of the visit attribute type',
      },
      required: {
        _type: Type.Boolean,
        _description: 'Whether the attribute type field is required or not',
        _default: false,
      },
      displayInThePatientBanner: {
        _type: Type.Boolean,
        _description: "Whether we should show this visit attribute's value in the patient banner",
        _default: true,
      },
    },
    _default: [
      {
        uuid: '57ea0cbb-064f-4d09-8cf4-e8228700491c',
        required: false,
        displayInThePatientBanner: true,
      },
      {
        uuid: 'aac48226-d143-4274-80e0-264db4e368ee',
        required: false,
        displayInThePatientBanner: true,
      },
    ],
  },
  showServiceQueueFields: {
    _type: Type.Boolean,
    _description: 'Whether start visit form should display service queue fields`',
    _default: false,
  },
  visitQueueNumberAttributeUuid: {
    _type: Type.ConceptUuid,
    _description: 'The UUID of the visit attribute that contains the visit queue number.',
    _default: 'c61ce16f-272a-41e7-9924-4c555d0932c5',
  },
  defaultFacilityUrl: {
    _type: Type.String,
    _default: '',
    _description: 'Custom URL to load default facility if it is not in the session',
  },
  showUpcomingAppointments: {
    _type: Type.Boolean,
    _description: 'Whether start visit form should display upcoming appointments',
    _default: false,
  },
  logo: {
    src: {
      _type: Type.String,
      _default: null,
      _description: 'A path or URL to an image. Defaults to the OpenMRS SVG sprite.',
    },
    alt: {
      _type: Type.String,
      _default: 'Logo',
      _description: 'Alt text, shown on hover',
    },
    name: {
      _type: Type.String,
      _default: null,
      _description: 'The organization name displayed when image is absent',
    },
  },
};

export interface ChartConfig {
  offlineVisitTypeUuid: string;
  visitTypeResourceUrl: string;
  showRecommendedVisitTypeTab: boolean;
  visitAttributeTypes: Array<{
    uuid: string;
    required: boolean;
    displayInThePatientBanner: boolean;
  }>;
  showServiceQueueFields: boolean;
  visitQueueNumberAttributeUuid: string;
  defaultFacilityUrl: string;
  showUpcomingAppointments: boolean;
  logo: {
    src: string;
    alt: string;
    name: string;
  };
}

export const configSchema = {
  contactAttributeType: {
    _type: Type.UUID,
    _description:
      'The Uuids of person attribute-type that captures contact information `e.g Next of kin contact details`',
    _default: [],
  },
};

export interface ConfigObject {
  contactAttributeType: Array<string>;
}
