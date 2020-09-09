export class UserModel {

  constructor(public userId: number,
              public username: string,
              public password: string,
              public repeatPassword: string,
              public firstname: string,
              public lastname: string,) {
  }

}
