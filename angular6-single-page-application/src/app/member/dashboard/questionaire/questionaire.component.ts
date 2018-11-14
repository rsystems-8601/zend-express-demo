import { Component, OnInit, PipeTransform, Pipe } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import * as $ from "jquery";
import { Options, LabelType } from "ng5-slider";
import { Router, ActivatedRoute } from "@angular/router";
import { PsnCookieService } from "../../../shared/services/psnCookieService";
import { DomSanitizer } from '@angular/platform-browser'

import { CacheFactory } from 'cachefactory';
const cacheFactory = new CacheFactory();
const cache = cacheFactory.createCache('my-cache');

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: "app-questionaire",
  templateUrl: "./questionaire.component.html",
  styleUrls: ["./questionaire.component.css"]
})
export class QuestionaireComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private activeRoute: ActivatedRoute,
    private cookieService: PsnCookieService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.finalMsg = "Congratulation! You response has been submitted successfully.";
    this.currentCategoryId = this.activeRoute.snapshot.params.id;
    this.userId = "";
    // this.getSetSubmittedQuestionAnswer();
    this.todayDate = new Date();
    this.getFirstQuestionaire();
	
  }

  public myQuestionaier = [];
  public surveyResult = [];
  public quesAnsModel = {};
  public todayDate;
  public responseToSave = [];
  public finalMsg;
  public userId;
  public mappings = [];
  public allQuestions = [];
  public leftQuestions = [];
  public currentCategoryId;
  public assessmentID = 1;// public assessmentID = 12;
  public setID = 0;
  public setCheckedID = 0;
  // public formattedResponse = [];

  // Highlighted Slider config
  setHighlighterSliderOptions(question) {
    var stepsOptions = [];
    question.answers.forEach(function (ans) {
      stepsOptions.push({ value: ans.score, legend: ans.option_text });
    });

    question.highlightedSliderOptions = {
      //showSelectionBar: true,
      // floor: 1,
      // ceil: 10,
      showTicksValues: true,
      stepsArray: stepsOptions,
      /*
      selectionBarGradient: {
           from: '#0069D9',
           to: 'green'
         },
         */
/*
      getSelectionBarColor: (value: number): string => {
        if (value <= 2) {
          return "blue";
        }
        if (value <= 3) {
           return "yellow";
         }
        if (value <= 4) {
          return "green";
        }        
        return "green";
      },
      */
      getPointerColor: (value: number): string => {
        return "blue";
      }
    };
  }

	  onclickMe(qid,aid){
	  //console.log(qid+'---'+aid);
	  
	  if(qid==aid){
		  document.getElementById('inlineRadioAns'+aid).click();	    
	  }	    
	  
 }
 
  setValueSliderOptions2(question) {
    // Value Slider config
    let stepOptionArray = [];
    let stepValue = 1;
    question.answers.forEach((ans, index) => {
      stepOptionArray.push({
        value: ans.score * 100,
        legend: ans.option_text
      });
    });

    question.valueSliderOptions = {
      // showTicksValues: true,
      // showTicks: true,
      floor: stepOptionArray[0].value,
      ceil: stepOptionArray[1].value,
      step: 0.01,
      precision: 1,
      translate: (value: number, label: LabelType): string => {
        console.log(label);
        switch (label) {
          case LabelType.Low:
            return stepOptionArray[0].legend;
          case LabelType.High:
            return stepOptionArray[1].legend;
          default:
            return value.toString();
        }
      },
      // stepsArray: stepOptionArray,
      getPointerColor: (value: number): string => {
         if (value == 1) {
           return "white";
         } else if (value == 2 || value == 6) {
           return "white";
         }
         return "white";
       }
    };
  }


  		  
	setValueSliderOptions(question) {
    // Value Slider config
    let stepOptionArray2 = [];
    let stepOptionArray = [];
    let stepValue = 0;
    question.answers.forEach((ans, index) => {
      stepOptionArray2.push({
        value: ans.score ,
        legend: ans.option_text
      });
    });

    question.valueSliderOptions = {
		// stepValue:0,
		// value:0,
      floor: stepOptionArray2[0].value,
      step: 0.01,
      precision: 1,
      ceil: stepOptionArray2[1].value,
      ceilLegend: stepOptionArray2[1].legend,
      floorLegend: stepOptionArray2[0].legend,
      showSelectionBar: true,
       selectionBarGradient: {
         from: '#31B4E8',
         to: '#54CA35'
      },
      getPointerColor: (value: number): string => {
        if (value == 1) {
          return "white";
        } else if (value == 2 || value == 6) {
          return "white";
        }
        return "white";
      }
    };
  }
  

  initQuestionaierModel(questionaiere) {
    questionaiere.forEach(ques => {
      if (ques.ques_type == "Anchor Slider") {
        this.quesAnsModel[ques.ques_id] = 1;
        this.setHighlighterSliderOptions(ques);
      } else if (ques.ques_type == "Smooth Slider") {
        this.quesAnsModel[ques.ques_id] = 1;
        this.setValueSliderOptions(ques);
      } else if (ques.ques_type == "Toggle") {
        // if(this.quesAnsModel[ques.ques_id]){
        //   this.quesAnsModel[ques.ques_id] = ;
        // }
        ques.toggleOptions = {
          checkedLabelText: ques.answers[0].option_text,
          uncheckedLabelText: ques.answers[1].option_text,
          lastSavedStatus: this.quesAnsModel[ques.ques_id] == ques.answers[0].option_id
        };
      } else {
        this.quesAnsModel[ques.ques_id] = this.quesAnsModel[ques.ques_id] ? "selected" : null;
      }
    });
    return questionaiere;
  }
  
  

  selectAns(questionId, answer) {
    document.getElementById("Smileys" + questionId + answer).style.border =
      "2px solid #b7d433";
    // document.getElementById("Smileys"+ questionId + answer).style.border =
    //   "2px solid #b7d433";
    this.quesAnsModel[questionId] = answer;
  }

  getNextQuestionaire() {
    //     let nextQuestionaier = [];
    //     let moreLeftQuestion = [];
    //     this.leftQuestions.forEach(question => {
    //       if (
    //         question.dep_question_id &&
    //         question.dep_option_id &&
    //         question.dep_option_id == this.quesAnsModel[question.dep_question_id]
    //       ) {
    //         nextQuestionaier.push(question);
    //       } else {
    //         moreLeftQuestion.push(question);
    //       }
    //     });
    //     this.leftQuestions = moreLeftQuestion;
    //     this.myQuestionaier = this.initQuestionaierModel(nextQuestionaier);
    // //    console.log(this.myQuestionaier);
    //     if (nextQuestionaier && nextQuestionaier.length == 0) {
    //       this.submitQuestionaire();
    //     }
    this.submitQuestionaire();
  }

  onToggleChange(event, ques) {
    if (event) {
      this.quesAnsModel[ques.ques_id] = ques.answers[0].option_id;
    } else {
      this.quesAnsModel[ques.ques_id] = ques.answers[1].option_id;
    }
  }

  submitQuestionaire() {
    let formattedResponse = [];
    this.myQuestionaier;
    this.quesAnsModel;

    for (let questionID in this.quesAnsModel) {
      let questionExists = this.myQuestionaier.find(function (item) {
        return item.ques_id == questionID;
      })
      if (!questionExists) {
        delete this.quesAnsModel[questionID];
      }
    }

    this.allQuestions.forEach(item => {
      if (this.quesAnsModel && this.quesAnsModel[item.ques_id]) {
        let answerResp = [];
        item.answers.forEach(ansChoice => {
          if (
            (item.ques_type == "Radio" ||
              item.ques_type == "Toggle" ||
              item.ques_type == "Smileys"
            ) &&
            ansChoice.option_id == this.quesAnsModel[item.ques_id]
          ) {
            answerResp.push({
              option_id: ansChoice.option_id,
              option_text: ansChoice.option_text,
              score: ansChoice.score
            });
          }
          else if (item.ques_type == "Smooth Slider") {
            let _that = this;
            if(answerResp && answerResp.length == 0) {
              answerResp.push({
                option_id: ansChoice.option_id,
                option_text: ansChoice.option_text,
                score: this.quesAnsModel[item.ques_id]
              });
            }
            // let filterdArray = item.answers.filter(function (myItem) {
            //   return myItem.score == _that.quesAnsModel[item.ques_id];
            // })
            // answerResp.length == 0 && answerResp.push(filterdArray[0]);
          }
          else if (item.ques_type == "Anchor Slider") {
            // answerResp.push({
            //   option_id: ansChoice.option_id,
            //   option_text: ansChoice.option_text,
            //   score: ansChoice.score
            // });
            let _that = this;
            let filterdArray = item.answers.filter(function (myItem) {
              return myItem.score == _that.quesAnsModel[item.ques_id];
            })
            answerResp.length == 0 && answerResp.push(filterdArray[0]);
          }
          else if (item.ques_type == "Text Box") {
            answerResp.push({
              option_id: ansChoice.option_id,
              option_text: this.quesAnsModel[item.ques_id]
            });
          }
        });

        formattedResponse.push({
          ques_id: item.ques_id,
          set_id: this.allQuestions[0].set_id,
          ques_question: item.ques_question,
          // category_id: item.categ_id,
          // language: "en",
          answers: answerResp
        });
      }
    });
    // let categoryId = this.allQuestions[0].category_id + 1;
    let setID = this.allQuestions[0].set_id;


    this.dashboardService
      .submitQuestionaire(formattedResponse, this.mappings, this.assessmentID, setID, this.userId)
      .subscribe(
      resp => {
        if (resp && resp["questions"] && Array.isArray(resp["questions"])) {
          this.allQuestions = resp["questions"];
          this.mappings = resp.mappings;
          this.finalMsg = this.mappings ? null : 'Congratulation! You response has been submitted successfully.';
          let categoryQuestions = [];
          this.allQuestions.forEach(item => {
            if (!item.dep_question_id) {
              categoryQuestions.push(item);
            } else {
              this.leftQuestions.push(item);
            }
          });
          this.myQuestionaier = this.initQuestionaierModel(categoryQuestions);
          console.log(this.myQuestionaier);
        }
        if (resp == "No Data Found") {
          this.finalMsg =
            "Congratulations! Your response has been submitted successfully.";
          this.myQuestionaier = [];
        }
        if (resp == "No Data Found") {
          this.finalMsg =
            "Congratulations! Your response has been submitted successfully.";
          this.myQuestionaier = [];
        }
        this.router.navigate([
          "/member/dashboard/questionaire/" + this.assessmentID
        ]);
      },
      err => {
        if (err == "d") {
          this.finalMsg =
            "Congratulation! You response has been submitted successfully.";
          this.myQuestionaier = [];
        }
      }
      );
  }



  getFirstQuestionaire() {
	let cachekey1= 'q23_'+this.assessmentID+'_'+ "-" + this.userId;	
	if(cache.get(cachekey1)  && cache.get(cachekey1)!=''){
		console.log("resp-cache");
		this.getFirstQuestionaireResult(cache.get(cachekey1));
	}else{	
		this.dashboardService.getMyQuestions(this.assessmentID, this.setID, this.userId).subscribe(resp => {
		  console.log("resp-dom");	  
		  cache.put(cachekey1, (resp));
		  this.getFirstQuestionaireResult(resp);      
		});
	}
  }
  
  getFirstQuestionaireResult(data){
	 if (data && data["questions"]) {
        this.allQuestions = data["questions"];
        this.userId = data.userid;
        this.mappings = data.mappings;
        let categoryQuestions = [];
        this.allQuestions.forEach(item => {
          if (!item.dep_question_id) {
            categoryQuestions.push(item);
          } else {
            this.leftQuestions.push(item);
          }
        });
        this.myQuestionaier = this.initQuestionaierModel(categoryQuestions);
        console.log(this.myQuestionaier);
      } 
  }

  getSetSubmittedQuestionAnswer() {
    this.dashboardService
      .getSubmittedResponse(this.userId, this.currentCategoryId)
      .subscribe(resp => {
        if (!(resp == "No Data Found") && resp && resp.questions) {
          resp.questions.forEach((ques) => {
            this.quesAnsModel[ques.ques_id] = ques.answers[0].option_id;
          });
        }
      });
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;

    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  getReport() {
    // this.dashboardService.getMyReport(this.userId).subscribe(resp => {
    //   console.log("resp");
    //   console.log(resp);
    //   if (resp) {
    //     var byteData = this.base64ToArrayBuffer(resp);
    //     var blob = new Blob([byteData], { type: "application/pdf" });
    //     var link = document.createElement("a");
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = "QuetionaireResponse.pdf";
    //     link.click();
    //   }
    // });

    $.ajax({
      url: "http://10.131.10.109/Report/" + this.userId,
      //url: "http://localhost/Api/Report/" + this.userId,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: (data, textStatus, xhr) => {
        var byteData = this.base64ToArrayBuffer(data);
        var blob = new Blob([byteData], { type: "application/pdf" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "QuetionaireResponse.pdf";
        link.click();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("Error in Operation");
      }
    });
  }
  
  
}


