import {CanDeactivate} from '@angular/router';
import {VoteComponent} from '../vote/vote.component';
import {Injectable} from '@angular/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<VoteComponent> {

  canDeactivate(component: VoteComponent): boolean {
    if (component.form.dirty || component.formChanged) {
      return confirm('Unsaved changes. Discard?');
    }
    return true;
  }
}
