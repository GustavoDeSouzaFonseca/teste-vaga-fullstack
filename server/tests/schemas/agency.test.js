import { describe, expect, it } from '@jest/globals';
import Agency from '../../src/schemas/Agency.js';

describe('Testando o modelo editora', () => {
  const agencyObject = {
    nrInst: 123,
    nrAgencia: 456,
  };

  it('Deve instanciar uma nova editora', async () => {
    const agency = await Agency.create(agencyObject);
    const agencyJson = await agency.toJson()
    expect(agencyJson).toEqual(expect.objectContaining(agencyObject));
  });
});
