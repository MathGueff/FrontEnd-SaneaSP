import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './image-select.component.html',
  styleUrl: './image-select.component.css'
})
export class ImageSelectComponent {
  src: any = null;
  @Input() public selectImages : File[] = [];
  @Output() public alertImageSelect = new EventEmitter<File[]>();

  protected addImageList(event: any){
    const files:FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if(this.selectImages.find((file)=> file.name === files[i].name)){
        continue;
      }
      this.selectImages.push(files[i])
    }
    this.alertImageSelect.emit(this.selectImages)
  }
}
