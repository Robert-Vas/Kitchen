import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {DishesModel,
  DishesService,
  CategoriesModel,
  CategoriesService,
  AllergensModel,
  AllergensService,
  IngredientsModel,
  IngredientsService,
  DishTypesModel,
  DishTypesService,
  NutritionFieldsModel,
  NutritionFieldsService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';
import {DatePipe} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-dishes-add',
  templateUrl: './dishes-add.component.html',
  styleUrls: ['./dishes-add.component.scss']
})
export class DishesAddComponent implements OnInit {
  basePath = 'uploads';
  dishesForm: FormGroup;
  @Input() isEdit;
  @Input() data: DishesModel;
  isLoading = false;
  selectedDishType = '';
  selectedCategories: string[] = [];
  selectedIngredients: string[] = [];
  selectedAllergens: string[] = [];
  nutritionFields = {};
  categoryList: Array<CategoriesModel>;
  ingredientList: Array<IngredientsModel>;
  dishTypeList: Array<DishTypesModel>;
  nutritionFieldsList: Array<NutritionFieldsModel>;
  allergensList: Array<AllergensModel>;
  imgUrl: string;
  description: string;
  editor: any;
  videoURL = '';

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private storage: AngularFireStorage,
              private datePipe: DatePipe,
              private categoriesService: CategoriesService,
              private ingredientsService: IngredientsService,
              private dishTypesService: DishTypesService,
              private nutritionFieldsService: NutritionFieldsService,
              private allergensService: AllergensService,
              private dishesService: DishesService) {
    this.dishesForm = this.fb.group({
      name_en: ['', [Validators.required, Validators.minLength(3)]],
      name_sp: ['', [Validators.minLength(3)]],
      desc_en: ['', [Validators.required, Validators.minLength(3)]],
      desc_sp: ['', [Validators.minLength(3)]],
      procedure_en: ['', [Validators.required, Validators.minLength(3)]],
      procedure_sp: ['', [Validators.minLength(3)]],
      price: [1, [Validators.required]],
      prep_minutes: [15, [Validators.required]],
      is_vegan: [false, [Validators.required]]
    });
  }

  ngOnInit() {

    if (this.data) {
      this.dishesForm.get('name_en').setValue(this.data.name_en);
      this.dishesForm.get('name_sp').setValue(this.data.name_sp);
      this.dishesForm.get('desc_en').setValue(this.data.desc_en);
      this.dishesForm.get('desc_sp').setValue(this.data.desc_sp);
      this.dishesForm.get('procedure_en').setValue(this.data.procedure_en);
      this.dishesForm.get('procedure_sp').setValue(this.data.procedure_sp);
      this.dishesForm.get('is_vegan').setValue(this.data.is_vegan);
      this.dishesForm.get('price').setValue(this.data.price);
      this.dishesForm.get('prep_minutes').setValue(this.data.prep_minutes);
      this.selectedCategories = this.data.category_ids;
      this.selectedIngredients = this.data.ingredient_ids;
      this.selectedAllergens = this.data.allergen_ids;
      this.nutritionFields = this.data.nutrition_fields;
      this.description = this.data.name_en;
      this.imgUrl = this.data.img;
    }

    this.allergensService.getList().subscribe(r => {
      this.allergensList = r;
    });

    this.categoriesService.getList().subscribe(r => {
      this.categoryList = r;
    });

    this.ingredientsService.getList().subscribe(r => {
      this.ingredientList = r;
    });

    this.nutritionFieldsService.getList().subscribe(r => {
      this.nutritionFieldsList = r;
      for (const list of r) {
        this.dishesForm.addControl(list.id, new FormControl(0, Validators.required));
        if (this.data) {
          if (list.id in this.nutritionFields) {
            this.dishesForm.get(list.id).setValue(this.nutritionFields[list.id]);
          }
        }
      }
    });

    this.dishTypesService.getList().subscribe(r => {
      this.dishTypeList = r;
      this.selectedDishType = this.dishTypeList[0].id;
      if (this.data && this.data.dish_type_id) {
        this.selectedDishType = this.data.dish_type_id;
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
    const model = new DishesModel();
    model.name_en = this.dishesForm.controls.name_en.value;
    model.name_sp = this.dishesForm.controls.name_sp.value;
    model.desc_en = this.dishesForm.controls.desc_en.value;
    model.desc_sp = this.dishesForm.controls.desc_sp.value;
    model.procedure_en = this.dishesForm.controls.procedure_en.value;
    model.procedure_sp = this.dishesForm.controls.procedure_sp.value;
    model.is_vegan = this.dishesForm.controls.is_vegan.value;
    model.price = +this.dishesForm.controls.price.value;
    model.prep_minutes = +this.dishesForm.controls.prep_minutes.value;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    model.img = this.imgUrl;
    model.dish_type_id = this.dishTypeList.find(c => c.id === this.selectedDishType).id;
    model.ingredient_ids = this.selectedIngredients;
    model.category_ids = this.selectedCategories;
    model.allergen_ids = this.selectedAllergens;
    model.video = this.videoURL;

    for (const list of this.nutritionFieldsList) {
        this.nutritionFields[list.id] = parseFloat(this.dishesForm.controls[list.id].value);
    }

    model.nutrition_fields = this.nutritionFields;

    if (this.isEdit) {
      model.id = this.data.id;
      this.dishesService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.dishesService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }
/*
  editorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler(this.imageHandler.bind(this));
    this.editor = quill;
  }
*/

formatterDollar = (value: number) => value ? `$ ${value.toFixed(2)}` : 0;
parserDollar = (value: string) => value.replace('$ ', '');

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
