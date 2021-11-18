import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoodsModel, GoodsService, SubCateModel, SubCateService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-good-add',
  templateUrl: './good-add.component.html',
  styleUrls: ['./good-add.component.scss']
})
export class GoodAddComponent implements OnInit {
  basePath = 'uploads';
  goodForm: FormGroup;
  @Input() isEdit;
  @Input() data: GoodsModel;
  isLoading = false;
  selectedCate: string;
  cateList: Array<SubCateModel>;
  imgUrl: string;
  description: string;
  editor: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private storage: AngularFireStorage,
              private datePipe: DatePipe,
              private subCateService: SubCateService,
              private goodService: GoodsService) {
    this.goodForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]],
      price: [1, [Validators.required]],
      weight: [1, [Validators.required]],
      shelfLife: [1, [Validators.required]],
      storageConditions: [''],
      isHot: [false],
      isNew: [false],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.goodForm.get('name').setValue(this.data.name);
      this.goodForm.get('sort').setValue(this.data.sort);
      this.goodForm.get('price').setValue(this.data.price);
      this.goodForm.get('weight').setValue(this.data.weight);
      this.goodForm.get('shelfLife').setValue(this.data.shelfLife);
      this.goodForm.get('storageConditions').setValue(this.data.storageConditions);
      this.goodForm.get('isHot').setValue(this.data.isHot);
      this.goodForm.get('isNew').setValue(this.data.isNew);
      this.imgUrl = this.data.img;
      this.description = this.data.description;
    }
    this.subCateService.getList().subscribe(r => {
      this.cateList = r;
      if (this.data) {
        this.selectedCate = this.data.subCateId;
      }
    });
  }

  down(event) {
    this.imgUrl = event;
  }

  del(event) {
    if (event) {
      this.imgUrl = '';
    }
  }

  cancel() {
    this.modal.destroy(false);
  }

  onOk() {
    this.isLoading = true;
    const model = new GoodsModel();
    model.name = this.goodForm.controls.name.value;
    model.sort = +this.goodForm.controls.sort.value;
    model.price = +this.goodForm.controls.price.value;
    model.weight = +this.goodForm.controls.weight.value;
    model.shelfLife = +this.goodForm.controls.shelfLife.value;
    model.storageConditions = this.goodForm.controls.storageConditions.value;
    model.isHot = this.goodForm.controls.isHot.value;
    model.isNew = this.goodForm.controls.isNew.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    model.description = this.description;
    model.subCateId = this.selectedCate;
    model.img = this.imgUrl;
    model.cateName = this.cateList.find(c => c.id === this.selectedCate).name;
    if (this.isEdit) {
      model.id = this.data.id;
      this.goodService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.goodService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }

  editorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(this.imageHandler.bind(this));
    this.editor = quill;
  }

  imageHandler() {
    const img = document.createElement('input');
    img.setAttribute('type', 'file');
    img.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    img.classList.add('ql-image');
    img.addEventListener('change', () => {
      const file = img.files[0];
      const path = `${this.basePath}/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'image', url);
          });
        })
      ).subscribe();
    });
    img.click();
  }
}
