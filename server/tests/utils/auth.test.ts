import jwt from 'jsonwebtoken';
import { generateToken } from '../../utils/tokenUtils';
import { config } from '../../utils/testConfig';

describe('generateToken', () => {
  it('should generate a valid token', () => {
    const signMock = jest.spyOn(jwt, 'sign');
    const expectedToken = 'mocked-token';

    const userId = 123;
    const secretKey = config.JWT_TEST_KEY;
    const expiresIn = '7 days';

    signMock.mockImplementation(() => expectedToken);

    const result = generateToken(userId);

    expect(signMock).toHaveBeenCalled();
    expect(result).toBe(expectedToken);

    signMock.mockRestore();
  });
});
