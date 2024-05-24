import { WebSocketGateway, } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { BaseGateway } from './gateway';
import configuration from 'src/config/configuration';

@WebSocketGateway({ path: '/junior' })
export class JuniorEventsGateway extends BaseGateway {

  constructor() {
    const service = new EventsService();
    service.setGameId(configuration().game.juniorTournamentId)
    super(service)
  }
}
