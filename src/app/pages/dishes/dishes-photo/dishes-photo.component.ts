import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {AngularFireStorage} from '@angular/fire/storage';
import {DishesPhotoModel, DishesPhotoService} from '../../../shared';
import {combineLatest} from 'rxjs';

export class File {
  uid: string;
  name: string;
  status: string;
  url: string;
  thumbUrl: string;
}

@Component({
  selector: 'app-dishes-photo',
  templateUrl: './dishes-photo.component.html',
  styleUrls: ['./dishes-photo.component.scss']
})
export class DishesPhotoComponent implements OnInit {
  basePath = 'uploads';
  @Input() id: string;
  fileList: Array<File>;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string;
  previewVisible = false;
  photoList: Array<DishesPhotoModel>;

  constructor(private modal: NzModalRef,
              private storage: AngularFireStorage,
              private photoService: DishesPhotoService) {

  }

  ngOnInit() {
    this.photoService.getListByParam('dishesId', this.id).subscribe(result => {
      this.photoList = result;
      if (this.photoList && this.photoList.length > 0) {
        this.photoList.map(p => {
          this.fileList = [];
          this.fileList.push({uid: p.id, name: p.imgName, status: 'done', url: p.img, thumbUrl: ''});
        });
      } else {
        this.fileList = [];
        console.log(this.fileList);
      }
    });

  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  onClose() {
    this.modal.close(true);
  }

  private deleteFileStorage(path: string) {
    this.storage.ref(path).delete().subscribe();
  }

  customRemove = (file: UploadFile) => {
    const index = this.fileList.findIndex(f => f.name === file.name);
    this.fileList.splice(index, 1);
    const path = `${this.basePath}/${file.name}`;
    combineLatest([this.photoService.delete(file.uid), this.storage.ref(path).delete()]).subscribe(r => {
      console.log('img delete');
    });
  };

  customReq = (item: UploadXHRArgs) => {
    const fileName = item.file.name;
    const path = `${this.basePath}/${fileName}`;
    const task = this.storage.upload(path, item.file);
    return task.then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        this.photoService.addModel({dishesId: this.id, imgName: fileName, img: url}).then(r => {
          const index = this.fileList.findIndex(f => f.name === fileName);
          if (index > -1) {
            this.fileList[index].uid = r.id;
          }
        });
        item.onSuccess({}, item.file, {});
      })
      .catch((error) => {
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
}
