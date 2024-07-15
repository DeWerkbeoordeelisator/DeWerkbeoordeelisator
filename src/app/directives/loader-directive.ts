import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: "[proofmeLoader]"
})

export class LoaderDirective {

    @Input() proofmeLoader: boolean;

    constructor(
        private element: ElementRef
    ) { }

    ngOnChanges(): void {
        if (this.proofmeLoader) {
            this.applyLoaderClass();
        } else {
            this.removeLoaderClass();
        }
    }

    private applyLoaderClass(): void {
        // Get the smallest value from the parent element width and height
        const smallestValueFromParent = Math.min(this.element.nativeElement.clientWidth, this.element.nativeElement.clientHeight);

        // Set the loader size to 80% of the smallest value from the parent element
        const loaderSize = smallestValueFromParent * 0.8;
        this.element.nativeElement.style.setProperty("--loaderSize", `${loaderSize}px`);

        // Get the color from the parent element to set the loader color
        const color = window.getComputedStyle(this.element.nativeElement).color;
        this.element.nativeElement.style.setProperty("--loaderColor", color);

        // Get the text color from the parent element to set the loader background color
        const backgroundColor = window.getComputedStyle(this.element.nativeElement).backgroundColor;
        this.element.nativeElement.style.setProperty("--loaderBackgroundColor", backgroundColor);

        // Add the loader class
        this.element.nativeElement.classList.add("proofme-button-loader");
    }

    private removeLoaderClass(): void {
        this.element.nativeElement.classList.remove("proofme-button-loader");
    }
}
