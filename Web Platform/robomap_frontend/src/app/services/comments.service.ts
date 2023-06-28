import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionService } from './session.service';
import { Comment } from '../models/api/comment';
import { CommentAdapter } from '../models/adapters/Neuraflow/comment-adapter';


@Injectable({
  providedIn: 'root'
})
export class CommentsService extends BaseHttpService<Comment>{

  constructor(http: HttpClient,
    private sessionService: SessionService) {
    super(http, 'comments', new CommentAdapter());
  }

  public list(query?: string): any {
    const params = new HttpParams();
    if (query != null) {
        params.set('query', query);
    }
    return super._list(params);
}


}
