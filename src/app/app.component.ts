import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from "ngx-device-detector";
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    constructor(
        private deviceDetectorService: DeviceDetectorService,
    ) { }

    ngOnInit(): void {
        this.determineFontSize(window.innerWidth);
        window.addEventListener("resize", () => this.determineFontSize(window.innerWidth));
    }

    determineFontSize(width: number): void {
        const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
        // Base fontsize & width for desktop.
        // Normally baseFontSize would be 16 but we collectively decided a while ago that for the my-page and dashboard its 14.
        let baseFontSize = environment.rootFontSize;
        let fullWidth = 1920;

        // We need to use a different width and on mobile a different font-size.
        // There simply just is not a way to have a formula according to desktop width (1920)
        // That also works for Tablets and mobile devices. Unless we introduce a random multiplier like we did before.
        if (this.deviceDetectorService.isMobile()) {
            const defaultMobileLandscapeWidth = 915;
            const defaultMobilePortraitWidth = 412;

            // We lower the fontsize a little on mobile
            // and take the width of one of the most used mobile resolutions.
            // This way if we use a 360 width mobile phone in portrait mode:
            // fontSize = 360 / 412 * 12 resulting in a font-size of 10.4. Instead of
            // fontSize = 360 / 1920 * 12 resulting in a font-size of 2.25.
            if (orientation === "landscape") {
                fullWidth = defaultMobileLandscapeWidth
                baseFontSize = 13;
            } else {
                fullWidth = defaultMobilePortraitWidth
                baseFontSize = 12;
            }
        } else if (this.deviceDetectorService.isTablet()) {
            const defaultTabletLandscapeWidth = 1280;
            const defaultTabletPortraitWidth = 768;

            // For tablet's we do not change the baseFontSize.
            // Only the orientation width.
            if (orientation === "landscape") {
                fullWidth = defaultTabletLandscapeWidth
            } else {
                fullWidth = defaultTabletPortraitWidth
            }
        }

        const outerAspectRatio = window.outerWidth / window.outerHeight;
        const maxAspectRatio = 2;
        let fontSize = baseFontSize;
        // We do not want to scale further than a max of 2 aspectRatio.
        // This is to prevent ultra wide screens having a way too large font-size resulting in components mashing up or unnecessary scrolling.
        if (!(outerAspectRatio > maxAspectRatio && width > fullWidth && this.deviceDetectorService.isDesktop())) {
            fontSize = (width / fullWidth * baseFontSize);
        }
        document.documentElement.style.setProperty("font-size", `${fontSize.toFixed(3)}px`);
    }
}
