import jwt from 'jsonwebtoken';
import jwtKey from '@m/config/keys';

async function getUser(headerToken) {
  const token = headerToken.split(' ')[1];

  try {
    const payload = await jwt.verify(token, jwtKey);
    return payload;
  } catch (e) {}
}

export { getUser };
