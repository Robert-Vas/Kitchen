import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {UploadChangeParam, UploadXHRArgs} from 'ng-zorro-antd';

@Component({
  selector: 'app-dishes-add-video',
  templateUrl: './dishes-add-video.component.html',
  styleUrls: ['./dishes-add-video.component.scss']
})
export class DishesAddVideoComponent implements OnInit {
  @Input()  videoURL: string;
  @Output() updateVideoURL = new EventEmitter<string>();
  basePath = 'videos';
  fileList: Array<File>;
  
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  customReq = (item: UploadXHRArgs) => {
    const path = `${this.basePath}/${Date.now()}`;
    const task = this.storage.upload(path, item.file);
    return task.then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        item.onSuccess({}, item.file, {});
        this.videoURL = url;
        this.updateVideoURL.emit(this.videoURL); 
      })
      .catch((error) => {
        item.onError({}, item.file);
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      });
  };

  deleteVideo() {
    console.log("deleting video");
    const task = this.storage.storage.refFromURL(this.videoURL).delete();
    this.videoURL = '';
    this.updateVideoURL.emit(this.videoURL); 
  }

  handleChange(info: UploadChangeParam): void {
    if (info.file.status == 'done') {
      this.fileList = [];
    }
  }

}
