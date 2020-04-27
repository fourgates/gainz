import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewSetModalComponent } from './modules/home/components/new-set-modal/new-set-modal.component';
import { Exercise } from './modules/exercise/components/exercise/exercise.dt';
import { ExerciseService } from './services/exercise.service';
import { AuthService } from './modules/auth/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'gainz';
  username: ""
  constructor(public dialog: MatDialog, private exerciseService: ExerciseService, 
    private authService: AuthService, private messageService: MessageService){
    
  }
  ngOnInit(): void {
    let currentUser = localStorage.getItem('user');
    if(currentUser){
      this.username = JSON.parse(currentUser).email;
    }
  }

  createExercise(): void {
    const dialogRef = this.dialog.open(NewSetModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if(result === undefined){
        return;
      }
      let exercise: Exercise = {description: result.exerciseName};
      this.exerciseService.createExerciseType(exercise).subscribe(res=>{
        this.messageService.addMessage(result.exerciseName + " Has Been Created");
      });
    });
  }
  logout(){
    this.authService.logout();
  }
}
