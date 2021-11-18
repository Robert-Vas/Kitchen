import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ConfigModel, ModalService} from '../../shared';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {
  basePath = 'uploads';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  @Output() down = new EventEmitter<string>();
  @Output() del = new EventEmitter<boolean>();
  @Input() previewUrl: string;
  fileName: string;

  constructor(private storage: AngularFireStorage,
              private sanitizer: DomSanitizer,
              private modalService: ModalService) {
  }

  ngOnInit() {
    if (this.previewUrl) {
      this.fileName = this.previewUrl.match(/[\w\.\$]+(?=png|jpg|gif)\w+/g)[0];
      this.fileName = this.fileName.substring(2);
    }
  }

  uploadFile(event) {
    if (ConfigModel.isTest) {
      this.modalService.error(ConfigModel.testInfo);
    } else {
      const file = event.target.files[0];
      this.fileName = `${new Date().getTime()}_${file.name}`;
      const path = `${this.basePath}/${this.fileName}`;
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.previewUrl = url;
            this.down.emit(url);
          });
        })
      ).subscribe();
    }
  }


  previewImg(file: any): SafeUrl {
    const url = window.URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onDel() {
    if (ConfigModel.isTest) {
      this.modalService.error(ConfigModel.testInfo);
    } else {
      const path = `${this.basePath}/${this.fileName}`;
      this.storage.ref(path).delete().subscribe(() => {
        this.previewUrl = null;
        this.del.emit(true);
      }, error => {
        this.modalService.error(error.message);
        this.del.emit(false);
      });
    }
  }

}
