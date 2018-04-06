import {Component} from '@angular/core';
import {LoadingService} from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private sub$;
  loader: boolean;

  constructor(public loadingService: LoadingService){
    this.sub$ = this.loadingService.status.subscribe(
      res => {
        this.loader = res;
      }
    );
  }
}
