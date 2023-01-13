import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-view-project',
    templateUrl: 'view-project.component.html',
})
export class ViewProjectComponent implements OnInit {
    id!: number
    baseUrl: string = 'api/Project'
    project: any
    @ViewChild('htmlToPdf') private elementRef!: ElementRef;

    constructor(private activatedRoute: ActivatedRoute,
                private http: HttpClient) {
    }

    async ngOnInit(): Promise<void> {
        await this.getProject()
    }

    async getProject() {
        this.getIdFromRoute()
        this.project = await firstValueFrom(this.http.get<any>(`${this.baseUrl}/${this.id}`))
    }

    getIdFromRoute() {
        this.activatedRoute.params.subscribe({
            next: value => this.id = value['id']
        })
    }

    downloadPdf() {
        const element = this.elementRef.nativeElement;
        let copyPdfSection = element.cloneNode(true);

        const html = htmlToPdfmake(copyPdfSection.innerHTML);
        const documentDefinition = {
            content: html
        };
        pdfMake.createPdf(documentDefinition).download();
    }

}
