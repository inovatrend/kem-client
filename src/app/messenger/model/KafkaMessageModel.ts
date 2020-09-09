export class KafkaMessageModel {

  constructor(public id: number,
              public message: string,
              public senderUsername: string,
              public senderUserId: number,
              public receiverUserId: number,
              ) {
  }
}
