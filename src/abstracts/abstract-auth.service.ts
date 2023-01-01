export abstract class AbstractAuthService<T> {
  abstract validateUser(email: string, password: string): Promise<any>;
  abstract login(user: T): Promise<any>;
}
