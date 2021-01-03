/* eslint-disable quotes */
/* eslint-disable no-undef */
const { loginService } = require('../../API/Services/userServices');

describe('==> Tests on loginService module', () => {
  test('should throw an error if no data given', async () => {
    await expect(loginService()).rejects.toThrow(
      "Cannot read property 'email' of undefined"
    );
  });

  test('should throw an error if given data is incorrect', async () => {
    const data = { email: 'malik@email.com', password: 'pass123' };
    await expect(loginService(data)).rejects.toThrow('Invalid credentials.');
  });

  test('should return user data and token if the given data is correct', async () => {
    const data = { email: 'chef@chefme.com', password: 'chefme123' };
    await expect(loginService(data)).resolves.toHaveProperty('user');
    await expect(loginService(data)).resolves.toHaveProperty('token');
  });
});
