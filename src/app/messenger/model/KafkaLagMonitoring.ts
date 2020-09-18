export class KafkaLagMonitoring {
  constructor(public lag: string,
              public topicName: string
  ) {
  }
}
