import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { leaderBoardComponent } from './leader-board/leader-board.component';

const appRoutes: Routes = [
  {
    path: 'leaderboard',
    component: leaderBoardComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
