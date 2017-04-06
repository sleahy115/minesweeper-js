import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';

const appRoutes: Routes = [
  {
    path: 'leaderboard',
    component: LeaderBoardComponent
  },
  {
    path: '',
    component: MinesweeperComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
