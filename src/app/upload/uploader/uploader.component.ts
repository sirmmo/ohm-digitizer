import { InfoboxComponent } from './../../shared/infobox/infobox.component';
import { OhmService } from './../../ohm.service';
import { map } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  id;

  saveable = false;
  uploaded = false;

  form = 'images';

  @ViewChild('up', {static: false}) fileUpload: ElementRef;
  files  = [];

  file;

  @ViewChild(InfoboxComponent) info: InfoboxComponent;

  forms: Map<string, string> = new Map<string, string>();

  images = 'png,jpg,jpeg,jp2,jp2000,gif,tif,tiff,geotiff'.split(',');
  data = 'csv,tsv,txt,xls,xlsx'.split(',');
  vectors = 'zip,gpkg,geojson,spatialite'.split(',');

  constructor(
    private ohm: OhmService
  ) { }

  ngOnInit(): void {
    this.images.map(x => {
      this.forms.set(x, 'images');
    });
    this.data.map(x => {
      this.forms.set(x, 'data');
    });
    this.vectors.map(x => {
      this.forms.set(x, 'vectors');
    });
  }

  selectFile() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click();
  }

  upFile() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;
    for (const file of fileUpload.files) {
      this.files.push({ data: file, inProgress: false, progress: 0 });
    }
    this.uploadFiles();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    const np = file.data.name.split('.');
    this.form = this.forms.get(np[np.length - 1]);
    this.ohm.upload(file.data.name).subscribe((data: any) => {
      this.file = file.data.name;
      this.ohm.uploadFile(file, data.url).then(datas => {
        this.id = data.id;
        this.ohm.createMetadata({id: this.id, form: this.form, file: this.file}).subscribe(_ => {
          this.uploaded = true;
          this.saveable = true;
        });
      });
    });
  }

  save() {
    this.info.save();
  }
}
