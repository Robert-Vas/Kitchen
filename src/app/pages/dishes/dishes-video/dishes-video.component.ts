import { Component, OnInit, Input } from '@angular/core';
import {NzModalRef, UploadXHRArgs} from 'ng-zorro-antd';
import { AngularFireStorage } from '@angular/fire/storage';
import { DishesService } from 'src/app/shared/services/firebase-api/dishes.service';
import { DishesModel } from 'src/app/shared';
import { UploadChangeParam } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-dishes-video',
  templateUrl: './dishes-video.component.html',
  styleUrls: ['./dishes-video.component.scss']
})
export class DishesVideoComponent implements OnInit {
  basePath = 'videos';
  @Input() id: string;
  dish: DishesModel;
  fileList: Array<File>;

  constructor(
    private modal: NzModalRef,
    private storage: AngularFireStorage,
    private dishesService: DishesService
  ) { }

  ngOnInit() {
    this.getDish();
  }

  customReq = (item: UploadXHRArgs) => {
    const path = `${this.basePath}/${Date.now()}`;
    const task = this.storage.upload(path, item.file);
    return task.then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        item.onSuccess({}, item.file, {});
        this.dish.video = url;
        this.dishesService.update(this.dish);
        
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

  private getDish() {
    this.dishesService.getModel(this.id).subscribe(result => {
      this.dish = result;
    });
  }

  deleteVideo() {
    const task = this.storage.storage.refFromURL(this.dish.video).delete();
    this.dish.video = '';
    this.dishesService.update(this.dish).then(() => { 
    });  
  }

  handleChange(info: UploadChangeParam): void {
    if (info.file.status == 'done') {
      this.fileList = [];
    }
  }

  onClose() {
    this.modal.close(true);
  }

}
