import {Component, OnInit} from '@angular/core';
import {
  CateModel,
  CateRelationModel,
  CateRelationService,
  CateService,
  ModalService,
  PageDataService,
  SubCateModel,
  SubCateService
} from '../../shared';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-cate-relation',
  templateUrl: './cate-relation.component.html',
  styleUrls: ['./cate-relation.component.scss']
})
export class CateRelationComponent implements OnInit {
  cateList: Array<CateModel>;
  subCateList: Array<SubCateModel>;
  relationList: Array<CateRelationModel>;
  selectCate: string;
  isLoading = false;

  constructor(private pageService: PageDataService,
              private cateService: CateService,
              private subCateService: SubCateService,
              private relationService: CateRelationService,
              private modalService: ModalService) {
    this.pageService.getList([this.cateService.getList(), this.subCateService.getList(), this.relationService.getList()]).then(results => {
      this.cateList = results[0];
      this.subCateList = results[1];
      this.relationList = results[2];
      if (this.cateList.length > 0) {
        this.selectCate = this.cateList[0].id;
        this.setChecked(this.cateList[0].id);
      }
    });
  }

  ngOnInit() {

  }

  setChecked(id: string) {
    this.subCateList = this.subCateList.map(sub => {
      const relation = this.relationList.find(r => r.subCateId === sub.id && r.cateId === id);
      const subModel = new SubCateModel(sub);
      if (relation) {
        subModel.relationId = relation.id;
        subModel.checked = true;
      } else {
        subModel.checked = false;
      }
      return subModel;
    });
  }

  onSelect(id: string) {
    this.selectCate = id;
    this.relationService.getList().subscribe(r => {
      this.relationList = r;
      this.setChecked(id);
    });
  }

  onSave() {
    const checked = this.subCateList.some(sub => sub.checked);
    if (!checked) {
      this.modalService.warning('Please select sub category');
      return;
    }
    this.isLoading = true;
    const addArray = [];
    this.subCateList.map(sub => {
      if (sub.checked && !sub.relationId) {
        addArray.push(this.relationService.addModel({cateId: this.selectCate, subCateId: sub.id}));
      }
      if (!sub.checked && sub.relationId) {
        addArray.push(this.relationService.delete(sub.relationId));
      }
    });

    forkJoin(addArray).subscribe(() => {
      this.isLoading = false;
      this.modalService.success('add success!');
    });
  }
}
