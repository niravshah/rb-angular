import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

  private currentPost: any;
  private currentPostId: any;


  constructor(private http: Http) {
  }

  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  getFundraiserById(id: String) {
    return this.http.get('/api/posts/' + id)
      .map(res => res.json());
  }

  createPost(post) {
    return this.http.post('/api/posts', post)
      .map(res => res.json());
  }

  getAllPostsForLoggedInUser(user: string, jwt: string) {
    // console.log(JSON.parse(user).email);

    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);

    const url = '/api/user/' + JSON.parse(user).sid + '/posts';
    return this.http.get(url, {headers: headers})
      .map(res => res.json());

  }

  patchPost(postId: string, post: string, jwt: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);
    const patchUrl = '/api/posts/' + postId;
    return this.http.patch(patchUrl, post, {headers: headers})
      .map(res => res.json());
  }

  patchAuthorDetails(postId: string, post: string, jwt: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + jwt);
    const patchUrl = '/api/posts/' + postId + '/author';
    return this.http.patch(patchUrl, post, {headers: headers})
      .map(res => res.json());
  }

  setCurrentPost(post) {
    this.currentPost = post;
    this.setCurrentPostId(post.sid);
  }

  getCurrentPost() {
    return this.currentPost;
  }

  setCurrentPostId(id) {
    this.currentPostId = id;
  }

  getCurrentPostId() {
    return this.currentPostId;
  }

  getPostActivity(postId) {
    return this.http.get('/api/posts/' + postId + '/activities')
      .map(res => res.json());
  }
}
