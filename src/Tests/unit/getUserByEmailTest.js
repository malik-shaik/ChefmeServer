/* eslint-disable quotes */
/* eslint-disable no-undef */
const { getUserByEmail } = require('../../Database/Queries');

describe('==> Tests on getUserByEmail query module', () => {
  test('should throw an error if email is not given', async () => {
    await expect(getUserByEmail()).rejects.toThrow();
  });

  test('should throw an error if email is not found in database', async () => {
    const email = 'wrong@email.com';
    await expect(getUserByEmail(email)).resolves.toBeUndefined();
  });

  test('should return the user info if given email is correct', async () => {
    const email = 'chef@chefme.com';
    await expect(getUserByEmail(email)).resolves.not.toBeUndefined();
    await expect(getUserByEmail(email)).resolves.toHaveProperty('id');
    await expect(getUserByEmail(email)).resolves.toHaveProperty('firstname');
    await expect(getUserByEmail(email)).resolves.toHaveProperty('email');
  });
});
