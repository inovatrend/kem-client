export class KafkaLagMonitoring {
  constructor(public id: number,
              public lag: number,
              public topicName: string
  ) {
  }
}
