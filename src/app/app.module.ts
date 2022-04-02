import { BusySpinnerComponent } from './busy-spinner/busy-spinner.component';
import { BusySpinnerModule } from './busy-spinner/busy-spinner.module';
import { VideoViewComponent } from './shared/video-view/video-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import { EventsComponent } from './events/events.component';
import { EventsSummaryComponent } from './events-summary/events-summary.component';
import { ContactSimpleComponent } from './contact-simple/contact-simple.component';
import { OnlineGivingComponent } from './online-giving/online-giving.component';
import { OnlineGivingSummaryComponent } from './online-giving-summary/online-giving-summary.component';

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
    StickyHeaderComponent,
    VideoViewComponent,
    EventsComponent,
    EventsSummaryComponent,
    ContactSimpleComponent,
    OnlineGivingComponent,
    OnlineGivingSummaryComponent,
  ],
  entryComponents: [
    VideoViewComponent,
    BusySpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    BusySpinnerModule,
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
        path: 'events', component: EventsComponent
      },
      {
        path: 'contact', component: ContactSimpleComponent
      },
      {
        path: 'events', component: EventsComponent
      },
      {
        path: 'online-giving', component: OnlineGivingComponent
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
