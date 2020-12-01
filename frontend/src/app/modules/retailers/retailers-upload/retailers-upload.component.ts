import { Component, OnInit } from '@angular/core';
import { RetailersService } from '../../../service/retailers/retailers.service';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressHttp } from 'angular-progress-http';
import { ConfigService } from '../../../service/config.service';
import { RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-retailers-upload',
  templateUrl: './retailers-upload.component.html',
  styleUrls: ['./retailers-upload.component.scss']
})
export class RetailersUploadComponent implements OnInit {

  public isUploaded = false;
  public percentage = 0;
  public fileName: string;

  constructor(
    private retailersService: RetailersService,
    private toastrService: ToastrService,
    private httpProgress: ProgressHttp,
    private config: ConfigService,
    private authService: AuthService) { }

  public ngOnInit() {
    this.fileName = '';
  }

  public fileChange(event): void {
    this.isUploaded = true;
    this.percentage = 0;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('multipartFile', file, file.name);
      this.fileName = file.name;


      const options: RequestOptions = new RequestOptions({ headers: this.setHeaders() });
      this.httpProgress
        .withUploadProgressListener(
        progress => {
          this.percentage = progress.percentage - 20;
        })
        .post(this.config.retailerUpload, formData, options)
        .subscribe((response) => {
          this.percentage = this.percentage + 20;
          this.toastrService.success('File uploaded successful', file.name);
        },
        error => {
          this.toastrService.error('Upload Error. File could not be uploaded for some reason');
          this.isUploaded = false;
        });
    }
  }

  private setHeaders(): Headers {
    const token = JSON.parse(this.authService.getToken()).token;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (token) {
      headers.set('Authorization', 'Bearer ' + token)
    }
    return headers;
  }
}
