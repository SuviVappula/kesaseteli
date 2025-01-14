// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type, testing-library/await-async-query, security/detect-non-literal-fs-filename */
import {
  getErrorMessage,
  screenContext,
  withinContext,
} from '@frontend/shared/browser-tests/utils/testcafe.utils';
import TestController from 'testcafe';

import Company from '../../src/types/company';

export const getCompanyPageComponents = (t: TestController) => {
  const screen = screenContext(t);
  const within = withinContext(t);

  const withinCompanyPage = () => within(screen.getByRole('main'));

  const companyData = async (company: Company) => {
    const selectors = {
      companyData() {
        return withinCompanyPage().findByRole('heading', {
          name: company.name,
        });
      },
    };
    const expectations = {
      async isPresent() {
        await t
          .expect(selectors.companyData().exists)
          .ok(await getErrorMessage(t));
      },
      async isCompanyDataPresent() {
        await t
          .expect(
            withinCompanyPage().findByRole('heading', { name: company.name })
              .exists
          )
          .ok(await getErrorMessage(t));
        await t
          .expect(withinCompanyPage().findByText(company.business_id).exists)
          .ok(await getErrorMessage(t));
        await t
          .expect(withinCompanyPage().findByText(company.industry).exists)
          .ok(await getErrorMessage(t));
        await t
          .expect(withinCompanyPage().findByText(company.street_address).exists)
          .ok(await getErrorMessage(t));
        await t
          .expect(withinCompanyPage().findByText(company.postcode).exists)
          .ok(await getErrorMessage(t));
        await t
          .expect(withinCompanyPage().findByText(company.city).exists)
          .ok(await getErrorMessage(t));
      },
    };
    const actions = {};
    await expectations.isPresent();
    return {
      selectors,
      expectations,
      actions,
    };
  };
  return {
    companyData,
  };
};
