import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import * as showdown from 'showdown';
// const converter = new showdown.Converter();

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[markdown]' })
export class MarkdownDirective implements OnChanges {

    // tslint:disable-next-line:no-input-rename
    @Input('markdown') markdown: string;
    private element: any;

    constructor(private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
     }

    ngOnChanges() {
        //noinspection TypeScriptUnresolvedFunction
        const markup = new showdown.Converter().makeHtml(this.markdown);
        this.element.innerHTML = markup;
    }
}
