export class UserModel {

  constructor(public id: number,
              public username: string,
              public password: string,
              public repeatPassword: string,
              public firstname: string,
              public lastname: string,) {
  }

}
