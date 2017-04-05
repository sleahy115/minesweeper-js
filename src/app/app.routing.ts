import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const appRoutes: Routes = [
  {
    path: 'leaderboard',
    component: LeaderBoardComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
