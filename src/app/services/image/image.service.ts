import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:3000/v1/files/';

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
