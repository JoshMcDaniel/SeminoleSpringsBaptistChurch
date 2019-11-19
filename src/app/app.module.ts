import { VideoViewComponent } from './shared/video-view/video-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutSummaryComponent } from './about-summary/about-summary.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { SermonsSummaryComponent } from './sermons-summary/sermons-summary.component';
import { ContactSummaryComponent } from './contact-summary/contact-summary.component';
import { FormsModule } from '@angular/forms';
import { DoctrineComponent } from './doctrine/doctrine.component';
import { StaffComponent } from './about/staff/staff.component';
import { SafePipe } from './safe.pipe';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    AboutSummaryComponent,
    IntroductionComponent,
    CarouselComponent,
    SermonsSummaryComponent,
    ContactSummaryComponent,
    DoctrineComponent,
    StaffComponent,
    SafePipe,
    StickyHeaderComponent,
    VideoViewComponent
  ],
  entryComponents: [VideoViewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        // Lazily loaded to help limit the number of calls to the YouTube API.
        path: 'sermons',
        loadChildren: () => import('./sermons/sermons.module').then(m => m.SermonsModule)
      },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: '**', component: NotFoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
