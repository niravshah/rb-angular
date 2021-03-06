import {Injectable} from '@angular/core';

@Injectable()
export class AnalyticsService {

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });

  }

  public setUser(USER_ID) {
    ga('set', 'userId', USER_ID);
    ga('set', 'dimension1', USER_ID);

  }
}
