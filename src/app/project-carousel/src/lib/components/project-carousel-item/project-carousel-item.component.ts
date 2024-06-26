import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectItem } from '../../models/ProjectItem';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'zs-project-carousel-item',
    templateUrl: './project-carousel-item.component.html',
    styleUrls: ['./project-carousel-item.component.scss']
})

/**
 * Project Carousel Item Component
 */
export class ProjectCarouselItemComponent implements OnInit, OnDestroy {
    @Input() project!: ProjectItem;
    @Input() absoluteIndex: number = 0;
    public previewedIndex: number = 0;
    public relativeIndex: number = 0;
    public isPreviewed: boolean = false;
    private subscriptions: Subscription[] = [];

    /**
     * Constructor
     * 
     * @param {ProjectsService} projectsService Projects Service
     */
    constructor(private projectsService: ProjectsService) { }

    /**
     * ngOnInit
     */
    public ngOnInit() {
        this.subscribeToPreviewedIndex();
    }

    /**
     * ngOnDestroy
     */
    public ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /**
     * Gets the image to preview for the project item.
     */
    public getPreviewImage() {
        return this.project?.images?.[0];
    }

    /**
     * Subscribe to the currently previewed index.
     */
    private subscribeToPreviewedIndex(): void {
        this.subscriptions.push(
            this.projectsService.currentIndex$.subscribe(index => {
                this.previewedIndex = index;
                this.relativeIndex = this.projectsService.getRelativeIndex(this.absoluteIndex);
                this.isPreviewed = this.relativeIndex === 0;
            })
        );
    }
}
