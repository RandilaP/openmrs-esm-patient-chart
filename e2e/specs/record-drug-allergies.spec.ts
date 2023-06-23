import { test } from '../core';
import { PatientAllergiesPage } from '../pages';
import { expect } from '@playwright/test';
import { generateRandomPatient, deletePatient, Patient } from '../commands';

let patient: Patient;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
});

test('Add drug allergy to patient', async ({ page, api }) => {
  const allergiesPage = new PatientAllergiesPage(page);

  await test.step('When I visit the patient allergies page', async () => {
    await allergiesPage.goto(patient.uuid);
  });

  await test.step('And I click the Record allergy intolerance button', async () => {
    await allergiesPage.page.getByText('Record allergy').click();
  });

  await test.step('Then I clicked a drug allergen option', async () => {
    await allergiesPage.page.getByText('ACE inhibitors').click();
  });

  await test.step('Then I clicked a reaction option', async () => {
    await allergiesPage.page.getByText('Mental status change').click();
  });

  await test.step('Then I clicked a severity option', async () => {
    await allergiesPage.page.getByText('Mild').click();
  });

  await test.step('Then I fill the comment section', async () => {
    await allergiesPage.page.locator('#comments').fill('Test comment');
  });

  await test.step('Then I submit the form', async () => {
    await allergiesPage.page.getByText('Save').click();
  });

  await test.step('And I see the Allergy Saved message', async () => {
    await expect(allergiesPage.page.getByText('saved')).toBeVisible();
  });

  await test.step('And I see the data of the allergy that I saved', async () => {
    await expect(allergiesPage.tableRow().getByText('ACE inhibitors')).toBeVisible();
    await expect(allergiesPage.tableRow().getByText('Mental status change')).toBeVisible();
    await expect(allergiesPage.tableRow().getByText('LOW')).toBeVisible();
    await expect(allergiesPage.tableRow().getByText('Test comment')).toBeVisible();
  });
});

test.afterEach(async ({ api }) => {
  await deletePatient(api, patient.uuid);
});
