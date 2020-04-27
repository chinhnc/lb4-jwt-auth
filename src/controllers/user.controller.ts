import { post, requestBody, HttpErrors } from '@loopback/rest';
import { User } from '../models';
import { UserRepository, UserRoleRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { Credentials, JWT_SECRET, GoogleCredentials } from '../auth';
import { promisify } from 'util';
import { secured, SecuredType } from '../auth';
import { getAccessTokenFromCode, getUserProfile } from '../helpers/google-auth.helper';

const { sign } = require('jsonwebtoken');
const signAsync = promisify(sign);

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository) private userRoleRepository: UserRoleRepository,
  ) { }

  @secured()
  @post('/users')
  async createUser(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    if (!credentials.email || !credentials.password) throw new HttpErrors.BadRequest('Missing Email or Password');
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    const isPasswordMatched = user.password === credentials.password;
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = { email: credentials.email };
    const token = await signAsync(tokenObject, JWT_SECRET);

    return {
      token,
      user
    };
  }

  @post('/auth/google')
  async loginByGoogleCode(@requestBody() credentials: GoogleCredentials) {
    if (!credentials.code) throw new HttpErrors.BadRequest('Missing Google Code');

    try {
      const accessToken = await getAccessTokenFromCode(credentials.code);
      const userProfile = await getUserProfile(accessToken);

      console.log(userProfile);

      if (userProfile.hd != 'afterfit.co.jp') {
        throw new HttpErrors.Unauthorized('Invalid email.');
      }

      let user = await this.userRepository.findOne({ where: { email: userProfile.email } });
      if (!user) {
        user = await this.userRepository.create({ name: userProfile.name, email: userProfile.email, password: "123456", auth_provider: 'google', auth_id: userProfile.id })
      }

      const tokenObject = { email: userProfile.email };
      const token = await signAsync(tokenObject, JWT_SECRET);

      return { token, user };
    } catch (error) {
      return { error };
      // if (error.response.data.error === 'invalid_grant') throw new HttpErrors.BadRequest('Invalid google code');
    }
  }
}
