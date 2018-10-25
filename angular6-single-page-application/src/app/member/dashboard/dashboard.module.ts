import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Ng5SliderModule } from "ng5-slider";
import { UiSwitchModule } from "ngx-ui-switch";

// import { QuestionaireComponent } from './questionaire/questionaire.component';
import { DashboardComponent } from "./dashboard.component";
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { routing } from "./dashboard.routing";
import { DashboardService } from "./dashboard.service";
import { SafeHtmlPipe } from './questionaire/questionaire.component';

@NgModule({
  imports: [CommonModule, routing, FormsModule, Ng5SliderModule, UiSwitchModule],
  declarations: [DashboardComponent, QuestionaireComponent, SafeHtmlPipe],
  providers: [DashboardService]
})
export class DashboardModule {}
