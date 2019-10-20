import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactComponent } from './contact/contact.component';
import { SermonsComponent } from './sermons/sermons.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutSummaryComponent } from './about-summary/about-summary.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { SermonsSummaryComponent } from './sermons-summary/sermons-summary.component';
import { FooterComponent } from './footer/footer.component';
import { SocialIconsComponent } from './social-icons/social-icons.component';
import { ContactSummaryComponent } from './contact-summary/contact-summary.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    ContactComponent,
    SermonsComponent,
    AboutComponent,
    NotFoundComponent,
    AboutSummaryComponent,
    IntroductionComponent,
    CarouselComponent,
    SermonsSummaryComponent,
    FooterComponent,
    SocialIconsComponent,
    ContactSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
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
        path: 'sermons', component: SermonsComponent
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
  exports: [
    CarouselComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
