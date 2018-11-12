import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as showdown from 'showdown';
// const converter = new showdown.Converter();

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[markdown]' })
export class MarkdownDirective implements OnInit {

    @Input('markdown') markdown: string;
    private element: any;

    constructor(private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
     }

    ngOnInit() {
        //noinspection TypeScriptUnresolvedFunction
        const markup = new showdown.Converter().makeHtml(this.markdown);
        this.element.innerHTML = markup;
    }
}
