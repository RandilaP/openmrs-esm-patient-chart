import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { openmrsFetch, getConfig } from '@openmrs/esm-framework';
import { renderWithSwr, waitForLoadingToFinish } from '../../../../../tools/test-helpers';
import { visitOverviewDetailMockData } from '../../../../../__mocks__/visits.mock';
import { mockPatient } from '../../../../../__mocks__/patient.mock';
import VisitDetailOverview from './visit-detail-overview.component';

const testProps = {
  patientUuid: mockPatient.id,
};

const mockOpenmrsFetch = openmrsFetch as jest.Mock;
const mockGetConfig = getConfig as jest.Mock;

jest.mock('@openmrs/esm-framework', () => {
  const originalModule = jest.requireActual('@openmrs/esm-framework');

  return {
    ...originalModule,
    getVisitsForPatient: jest.fn(),
    createErrorHandler: jest.fn(),
    useLayoutType: jest.fn(),
    ExtensionSlot: jest.fn().mockImplementation((ext) => ext.extensionSlotName),
  };
});

describe('VisitDetailOverview', () => {
  it('renders an empty state view if encounters data is unavailable', async () => {
    mockOpenmrsFetch.mockReturnValueOnce({ data: { results: [] } });
    mockGetConfig.mockResolvedValue({ htmlFormEntryForms: [] });

    renderVisitDetailOverview();

    await waitForLoadingToFinish();

    expect(screen.getByRole('heading', { name: /visits/i })).toBeInTheDocument();
    expect(screen.getAllByTitle(/Empty data illustration/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/There are no visits to display for this patient/i)[0]).toBeInTheDocument();
  });

  it('renders an error state view if there was a problem fetching encounter data', async () => {
    const error = {
      message: 'Unauthorized',
      response: {
        status: 401,
        statusText: 'Unauthorized',
      },
    };

    mockOpenmrsFetch.mockRejectedValueOnce(error);

    renderVisitDetailOverview();

    await waitForLoadingToFinish();

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /visits/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Error 401: Unauthorized/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Sorry, there was a problem displaying this information/i)[0]).toBeInTheDocument();
  });

  it(`renders a summary of the patient's visits and encounters when data is available`, async () => {
    const user = userEvent.setup();

    mockOpenmrsFetch.mockReturnValueOnce(visitOverviewDetailMockData);
    mockGetConfig.mockResolvedValue({ htmlFormEntryForms: [] });

    renderVisitDetailOverview();

    await waitForLoadingToFinish();

    const allVisitsTab = screen.getByRole('tab', { name: /all encounters/i });
    const visitSummariesTab = screen.getByRole('tab', { name: /visit summaries/i });

    expect(visitSummariesTab).toBeInTheDocument();
    expect(allVisitsTab).toBeInTheDocument();
    expect(visitSummariesTab).toHaveAttribute('aria-selected', 'true');
    expect(allVisitsTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /notes/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tests/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /medications/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^encounters$/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /ech/i })).toBeInTheDocument();
    expect(screen.getByText(/^diagnoses$/i)).toBeInTheDocument();
    expect(screen.getByText(/no diagnoses found/i)).toBeInTheDocument();
    expect(screen.getByText(/no notes found/i)).toBeInTheDocument();
    expect(screen.getByText(/no medications found/i)).toBeInTheDocument();

    await waitFor(() => user.click(allVisitsTab));

    expect(allVisitsTab).toHaveAttribute('aria-selected', 'true');
    expect(visitSummariesTab).toHaveAttribute('aria-selected', 'false');
  });
});

function renderVisitDetailOverview() {
  renderWithSwr(<VisitDetailOverview {...testProps} />);
}
