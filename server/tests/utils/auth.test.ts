import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../utils/tokenUtils';
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

describe('verifyToken', () => {
  const mockToken = 'your-mock-token';
  const mockDecodedToken = { userId: 123 };

  it('should verify and return the decoded token', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => mockDecodedToken);

    const result = verifyToken(mockToken);

    expect(jwt.verify).toHaveBeenCalledWith(
      'your-mock-token',
      expect.any(String)
    );
    expect(result).toEqual(mockDecodedToken);
  });

  it('should throw an error if the token is invalid', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid token');
    });

    expect(() => {
      verifyToken(mockToken);
    }).toThrow('invalid token');
  });
});
