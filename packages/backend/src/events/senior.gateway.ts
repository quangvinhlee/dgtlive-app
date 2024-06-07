import { WebSocketGateway } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { BaseGateway } from './gateway';
import configuration from 'src/config/configuration';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@WebSocketGateway({ path: '/senior' })
export class SeniorEventsGateway extends BaseGateway {
  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    const config = configuration();
    const service = new EventsService(cacheManager, {
      delayedMoves: config.game.delayMoves,
      delayedTimeInSec: config.game.delayTimeInSeconds,
    });
    service.setGameId(configuration().game.seniorTournamentId);
    service.hello();
    super(service);
  }
}
