import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ContactModalService {

  constructor(private http: Http) {
  }

  sendContactForm(fname, lname, email, mobile, query) {

    const url = '/api/contact';
    const body = {fname: fname, lname: lname, email: email, mobile: mobile, query: query};

    return this.http.post(url, body).map(response => {
      return response.json();
    });
  }

}
