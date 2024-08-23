import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `http://${environment.env}:3002/v1/files/`;

  constructor(private http: HttpClient) {  }

  uploadImage(file: File | null) {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(this.apiUrl, formData);
  }
}
